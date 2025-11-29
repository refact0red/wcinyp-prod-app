/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const rootDir = process.cwd();
const radiologistsFile = path.join(rootDir, "src", "lib", "wcinyp", "radiologists.ts");

const outputDir = path.join(rootDir, "public", "images", "radiologists");

function parseRadiologists(fileContents) {
  const matches = [];
  const regex =
    /{\s*id:\s*"([^"]+)"[\s\S]*?headshot:\s*{\s*[\s\S]*?src:\s*"([^"]+)"/g;

  let match;
  while ((match = regex.exec(fileContents)) !== null) {
    const id = match[1];
    const url = match[2];
    matches.push({ id, url });
  }

  return matches;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getExtension(urlString) {
  try {
    const url = new URL(urlString);
    const pathname = url.pathname;
    const match = pathname.match(/\.([a-zA-Z0-9]+)$/);
    if (match) {
      return `.${match[1].toLowerCase()}`;
    }
  } catch {
    // Ignore
  }
  return ".jpg";
}

function downloadFile(urlString, destPath) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlString);
    const client = url.protocol === "http:" ? http : https;

    const headers = {};

    if (url.hostname === "directory.weill.cornell.edu") {
      headers["User-Agent"] =
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";
      headers["Referer"] = "https://directory.weill.cornell.edu/";
      headers["Accept"] = "image/avif,image/webp,image/apng,image/*,*/*;q=0.8";
    }

    const request = client.get(url, { headers }, (response) => {
      if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle simple redirects
        downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${urlString}`));
        return;
      }

      const fileStream = fs.createWriteStream(destPath);
      response.pipe(fileStream);
      fileStream.on("finish", () => {
        fileStream.close(() => resolve(destPath));
      });
    });

    request.on("error", (error) => {
      reject(error);
    });
  });
}

async function main() {
  console.log("Reading radiologists from", radiologistsFile);
  const contents = fs.readFileSync(radiologistsFile, "utf8");
  const list = parseRadiologists(contents);

  console.log(`Found ${list.length} radiologists with headshots.`);

  ensureDir(outputDir);

  for (const item of list) {
    const ext = getExtension(item.url);
    const filename = `${item.id}${ext}`;
    const destPath = path.join(outputDir, filename);

    if (fs.existsSync(destPath)) {
      console.log(`Skipping ${item.id} (already exists).`);
      continue;
    }

    console.log(`Downloading ${item.id} -> ${filename}`);
    try {
      await downloadFile(item.url, destPath);
    } catch (error) {
      console.error(`Failed to download ${item.id} from ${item.url}:`, error.message);
    }
  }

  console.log("Done downloading radiologist headshots.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
