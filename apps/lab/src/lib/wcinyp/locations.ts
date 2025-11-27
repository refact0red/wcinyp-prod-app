export type WcinypRegion =
    | "Upper East Side"
    | "Midtown"
    | "Upper West Side"
    | "Lower Manhattan"
    | "Long Island City";

export type WcinypBorough = "Manhattan" | "Queens";

export type WcinypLocationAddress = {
    line1: string;
    line2?: string;
    crossStreets?: string;
};

export type WcinypLocationImage = {
    src: string;
    alt: string;
};

export type WcinypLocationMaps = {
    placeUrl: string;
    lat: number;
    lng: number;
};

export type WcinypLocation = {
    id: string;
    slug: string;
    shortCode: string;
    name: string;
    region: WcinypRegion;
    borough: WcinypBorough;
    address: WcinypLocationAddress;
    city: string;
    state: string;
    zip?: string;
    modalities: string[];
    maps: WcinypLocationMaps;
    image: WcinypLocationImage;
};

export const wcinypLocations: WcinypLocation[] = [
    {
        id: "weill-greenberg-center",
        slug: "weill-greenberg-center",
        shortCode: "WGC",
        name: "Weill Greenberg Center",
        region: "Upper East Side",
        borough: "Manhattan",
        address: {
            line1: "1305 York Ave, 3rd Fl",
            line2: "(Corner of 70th St)",
        },
        city: "New York",
        state: "NY",
        zip: "10021",
        modalities: ["MRI", "PET/CT", "PET/MRI", "X-ray", "Bone Density"],
        maps: {
            placeUrl:
                "https://www.google.com/maps/place/Weill+Cornell+Imaging+at+NewYork-Presbyterian/@40.7656066,-73.9553663,16z/data=!3m2!4b1!5s0x89c258c28300f92f:0x98caab33b7319027!4m6!3m5!1s0x89c258c3fae07c13:0xeb6bdd4f382dda97!8m2!3d40.7656066!4d-73.9553663!16s%2Fg%2F1trpm378?entry=ttu&g_ep=EgoyMDI1MDEyMi4wIKXMDSoASAFQAw%3D%3D",
            lat: 40.7656066,
            lng: -73.9553663,
        },
        image: {
            src: "/images/locations/weill-greenberg-center.jpg",
            alt: "Weill Cornell Imaging at NewYork-Presbyterian, Weill Greenberg Center",
        },
    },
    {
        id: "david-h-koch-center",
        slug: "david-h-koch-center",
        shortCode: "DHK",
        name: "David H. Koch Center",
        region: "Upper East Side",
        borough: "Manhattan",
        address: {
            line1: "1283 York Ave, 7th Fl",
            line2: "(Corner of 68th St)",
        },
        city: "New York",
        state: "NY",
        modalities: [
            "CT",
            "MRI",
            "PET/CT",
            "PET/MRI",
            "Ultrasound",
            "X-ray",
            "Image-Guided Breast Biopsy",
        ],
        maps: {
            placeUrl:
                "https://www.google.com/maps/place/Weill+Cornell+Imaging+at+NewYork-Presbyterian+%7C+David+H.+Koch+Center/@40.7648862,-73.9557336,17z/data=!3m1!4b1!4m6!3m5!1s0x89c259518a3d3c6b:0x1cd66e22b434a365!8m2!3d40.7648862!4d-73.9557336!16s%2Fg%2F11v5yd6f2x?hl=en&entry=ttu&g_ep=EgoyMDI1MDUwNy4wIKXMDSoASAFQAw%3D%3D",
            lat: 40.7648862,
            lng: -73.9557336,
        },
        image: {
            src: "/images/locations/david-h-koch-center.jpg",
            alt: "David H. Koch Center",
        },
    },
    {
        id: "starr-pavillion",
        slug: "starr-pavillion",
        shortCode: "STARR",
        name: "Starr Pavillion",
        region: "Upper East Side",
        borough: "Manhattan",
        address: {
            line1: "520 East 70th St",
            line2: "Ground Fl",
            crossStreets: "(Between York Ave & the East River)",
        },
        city: "New York",
        state: "NY",
        modalities: ["CT", "US", "X-ray", "Fluoroscopy"],
        maps: {
            placeUrl:
                "https://www.google.com/maps/place/Weill+Cornell+Imaging+at+NewYork-Presbyterian/@40.764821,-73.953756,17z/data=!3m2!4b1!5s0x89c26008e1f0fb33:0xc56f88e705174ce3!4m6!3m5!1s0x89c25973e3c28d93:0xfbb6e271e3c211c4!8m2!3d40.764821!4d-73.953756!16s%2Fg%2F11j24g7rnp?entry=ttu&g_ep=EgoyMDI1MDEyMi4wIKXMDSoASAFQAw%3D%3D",
            lat: 40.764821,
            lng: -73.953756,
        },
        image: {
            src: "/images/locations/starr-pavillion.png",
            alt: "Starr Pavillion",
        },
    },
    {
        id: "iris-cantor-womens-health-center",
        slug: "iris-cantor-womens-health-center",
        shortCode: "ICWHC",
        name: "Iris Cantor Women’s Health Center",
        region: "Midtown",
        borough: "Manhattan",
        address: {
            line1: "425 East 61st St, 9th Fl",
            line2: "(Between York & 1st Ave)",
        },
        city: "New York",
        state: "NY",
        modalities: [
            "CT",
            "US",
            "X-ray",
            "Mammography",
            "Image-Guided Breast Intervention & Biopsy",
        ],
        maps: {
            placeUrl:
                "https://www.google.com/maps/place/Weill+Cornell+Imaging+at+NewYork-Presbyterian/@40.7605686,-73.9591669,17z/data=!3m2!4b1!5s0x89c258e7c6a7d603:0x2a12bf5f9a0c36fd!4m6!3m5!1s0x89c258dd5e446aad:0x1070f364c2702b9a!8m2!3d40.7605686!4d-73.9591669!16s%2Fg%2F1tfkx6t3?entry=ttu&g_ep=EgoyMDI1MDEyMi4wIKXMDSoASAFQAw%3D%3D",
            lat: 40.7605686,
            lng: -73.9591669,
        },
        image: {
            src: "/images/locations/iris-cantor-womens-health-center.jpg",
            alt: "Iris Cantor Women’s Health Center",
        },
    },
    {
        id: "midtown-east",
        slug: "midtown-east",
        shortCode: "ME",
        name: "Midtown East",
        region: "Midtown",
        borough: "Manhattan",
        address: {
            line1: "416 East 55th St, Ground Fl",
            line2: "(Between Sutton Place & 1st Ave)",
        },
        city: "New York",
        state: "NY",
        modalities: ["MRI"],
        maps: {
            placeUrl:
                "https://www.google.com/maps/place/Weill+Cornell+Imaging+at+NewYork-Presbyterian/@40.7562601,-73.9629144,17z/data=!4m6!3m5!1s0x89c259d76b27e453:0x2e3edf083e60c76!8m2!3d40.7562601!4d-73.9629144!16s%2Fg%2F11fnp43jmv?entry=ttu&g_ep=EgoyMDI1MDEyMi4wIKXMDSoASAFQAw%3D%3D",
            lat: 40.7562601,
            lng: -73.9629144,
        },
        image: {
            src: "/images/locations/midtown-east.jpg",
            alt: "Weill Cornell Imaging at NewYork-Presbyterian Midtown East lobby",
        },
    },
    {
        id: "hudson-yards",
        slug: "hudson-yards",
        shortCode: "HY",
        name: "Hudson Yards",
        region: "Midtown",
        borough: "Manhattan",
        address: {
            line1: "504 West 35th Street, 2nd Fl",
            line2: "(Corner of 10th Ave)",
        },
        city: "New York",
        state: "NY",
        modalities: ["MRI", "CT", "X-Ray", "EOS"],
        maps: {
            placeUrl:
                "https://www.google.com/maps/place/Weill+Cornell+Imaging+at+NewYork-Presbyterian/@40.7528272,-74.0156091,14z/data=!4m6!3m5!1s0x89c259d3b3dee39b:0xe52e8c958d8e8ff4!8m2!3d40.7552515!4d-73.9991184!16s%2Fg%2F11lzs5dwyl?entry=ttu&g_ep=EgoyMDI1MDUwNy4wIKXMDSoASAFQAw%3D%3D",
            lat: 40.7552515,
            lng: -73.9991184,
        },
        image: {
            src: "/images/locations/hudson-yards.jpg",
            alt: "Patient lobby of 504 West 35th Street location",
        },
    },
    {
        id: "upper-west-side",
        slug: "upper-west-side",
        shortCode: "UWS",
        name: "Upper West Side",
        region: "Upper West Side",
        borough: "Manhattan",
        address: {
            line1: "2315 Broadway, 4th Fl",
            line2: "(Between 83rd and 84th St)",
        },
        city: "New York",
        state: "NY",
        modalities: ["CT", "MRI", "US", "X-ray", "Bone Density"],
        maps: {
            placeUrl:
                "https://www.google.com/maps/place/Weill+Cornell+Imaging+at+NewYork-Presbyterian/@40.7870473,-73.9803248,17z/data=!3m2!4b1!5s0x89c258868e4dcba9:0x567c9f73f622b6bc!4m5!3m4!1s0x89c258868fc32fdf:0xf14c7abd456dbf5e!8m2!3d40.7870473!4d-73.9781361",
            lat: 40.7870473,
            lng: -73.9781361,
        },
        image: {
            src: "/images/locations/upper-west-side.jpg",
            alt: "2315 Broadway, 4th Floor",
        },
    },
    {
        id: "lower-manhattan",
        slug: "lower-manhattan",
        shortCode: "LM",
        name: "Lower Manhattan",
        region: "Lower Manhattan",
        borough: "Manhattan",
        address: {
            line1: "53 Beekman St, Ground Fl",
            line2: "(Between William & Gold St)",
        },
        city: "New York",
        state: "NY",
        modalities: [
            "CT",
            "MRI",
            "US",
            "X-ray",
            "Mammography",
            "Bone Density",
            "Image-Guided Breast Biopsy",
        ],
        maps: {
            placeUrl:
                "https://www.google.com/maps/place/Weill+Cornell+Imaging+at+NewYork-Presbyterian/@40.7098768,-74.007364,17z/data=!3m2!4b1!5s0x89c2f441531a7c29:0xa8cb843db48128b0!4m5!3m4!1s0x89c25b00f50ac015:0x1cac67f41831e13!8m2!3d40.7098768!4d-74.0051753",
            lat: 40.7098768,
            lng: -74.0051753,
        },
        image: {
            src: "/images/locations/lower-manhattan.jpg",
            alt: "53 Beekman St, Ground Floor",
        },
    },
    {
        id: "long-island-city",
        slug: "long-island-city",
        shortCode: "LIC",
        name: "Long Island City",
        region: "Long Island City",
        borough: "Queens",
        address: {
            line1: "28-25 Jackson Ave, 2nd Fl",
            line2: "(Between Queens Plaza South & 42nd Road)",
        },
        city: "Long Island City",
        state: "NY",
        modalities: [
            "CT",
            "MRI",
            "X-ray",
            "US",
            "Mammography",
            "Image-Guided Breast Biopsy",
        ],
        maps: {
            placeUrl:
                "https://www.google.com/maps/place/Weill+Cornell+Imaging+at+NewYork-Presbyterian/@40.7487315,-73.9382352,17z/data=!3m2!4b1!5s0x89c258d94fc71519:0xea41e6dccba76b84!4m6!3m5!1s0x89c259e1f3691b13:0xdc3aea4488d050c2!8m2!3d40.7487315!4d-73.9382352!16s%2Fg%2F11sqzyvjf8?entry=ttu",
            lat: 40.7487315,
            lng: -73.9382352,
        },
        image: {
            src: "/images/locations/long-island-city.jpg",
            alt: "Long island city",
        },
    },
];
