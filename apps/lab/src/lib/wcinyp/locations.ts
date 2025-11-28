import type { WcinypPhoneGroup } from "@/lib/wcinyp/phones";

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

export type WcinypWeekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type WcinypHoursRange = {
    days: WcinypWeekday[];
    /**
     * 24-hour time in HH:MM, e.g. "07:30".
     */
    open: string;
    /**
     * 24-hour time in HH:MM, e.g. "20:00".
     */
    close: string;
};

export type WcinypHoursOfOperation = {
    timezone: "America/New_York";
    ranges: WcinypHoursRange[];
    // TODO: Integrate WCINYP holiday calendar so specific holidays
    // can override or restrict hours per site (some sites open,
    // some closed, some limited hours based on leadership decisions).
};

export type WcinypContrastHoursStatus = "text" | "tbd" | "n/a";

export type WcinypContrastHours = {
    status: WcinypContrastHoursStatus;
    /**
     * Optional freeform description when status is "text"
     * (e.g. Spiral's 4–5:30pm no-contrast gap).
     */
    value?: string;
    // TODO: In the future, model contrast hours with structured
    // per-day windows similar to hoursOfOperation.
};

export type WcinypLocationNoteField =
    | "contact"
    | "hoursOfOperation"
    | "contrastHours"
    | "staff"
    | "general";

export type WcinypLocationNote = {
    id: string;
    text: string;
    relatedFields?: WcinypLocationNoteField[];
};

export type WcinypLocationContact = {
    phone?: WcinypPhoneGroup;
    fax?: WcinypPhoneGroup;
    notes?: string;
};

export type WcinypLocation = {
    id: string;
    slug: string;
    shortCode: string;
    akaShortCode?: string;
    // TODO: Align id/slug/shortCode/akaShortCode into a clearer set
    // of identifiers and display codes for locations.
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
    contact?: WcinypLocationContact;
    hoursOfOperation?: WcinypHoursOfOperation;
    contrastHours?: WcinypContrastHours;
    hasSpecialist: boolean;
    managerStaffId?: string;
    specialistStaffId?: string;
    locationNotes?: WcinypLocationNote[];
};

export const wcinypLocations: WcinypLocation[] = [
    {
        id: "weill-greenberg-center",
        slug: "weill-greenberg-center",
        shortCode: "WGC",
        akaShortCode: "WGC",
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
        modalities: ["MRI", "PET/CT", "PET/MRI", "X-ray", "DEXA"],
        contact: {
            phone: {
                primary: { digits: "6469623330" },
            },
            fax: {
                primary: { digits: "6469620471" },
            },
        },
        hoursOfOperation: {
            timezone: "America/New_York",
            ranges: [
                { days: ["Mon", "Tue", "Wed", "Thu", "Fri"], open: "07:30", close: "22:00" },
                { days: ["Sat", "Sun"], open: "07:30", close: "20:00" },
            ],
        },
        contrastHours: {
            status: "n/a",
        },
        hasSpecialist: true,
        managerStaffId: "pm-wgc-brooke-cascella",
        specialistStaffId: "ps-wgc-colleen-doherty",
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
        akaShortCode: "DHK",
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
            "US",
            "X-ray",
            "Breast Biopsy",
        ],
        contact: {
            phone: {
                primary: { digits: "6466970488" },
            },
            fax: {
                primary: { digits: "6466970701" },
            },
        },
        hoursOfOperation: {
            timezone: "America/New_York",
            ranges: [
                { days: ["Mon", "Tue", "Wed", "Thu", "Fri"], open: "08:00", close: "22:00" },
                { days: ["Sat"], open: "08:00", close: "20:00" },
            ],
        },
        contrastHours: {
            status: "n/a",
        },
        hasSpecialist: true,
        managerStaffId: "pm-dhk-maris-theodoropoulos",
        specialistStaffId: "ps-dhk-saliha-ismail",
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
        akaShortCode: "STARR",
        name: "Starr Pavillion",
        region: "Upper East Side",
        borough: "Manhattan",
        address: {
            line1: "520 East 70th St, Ground Fl",
            line2: "(Between York Ave & the East River)",
        },
        city: "New York",
        state: "NY",
        modalities: ["CT", "US", "X-ray", "Fluoro"],
        contact: {
            phone: {
                primary: { digits: "2127466093" },
            },
            fax: {
                primary: { digits: "2127468849" },
            },
        },
        hoursOfOperation: {
            timezone: "America/New_York",
            ranges: [
                { days: ["Mon", "Tue", "Wed", "Thu", "Fri"], open: "08:00", close: "22:00" },
                { days: ["Sat", "Sun"], open: "09:00", close: "16:00" },
            ],
        },
        contrastHours: {
            status: "n/a",
        },
        hasSpecialist: true,
        managerStaffId: "pm-starr-jessica-sgroi",
        specialistStaffId: "ps-starr-gladys-portillo-cabrera",
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
        akaShortCode: "61ST",
        name: "Iris Cantor Women’s Health Center",
        region: "Midtown",
        borough: "Manhattan",
        address: {
            line1: "425 East 61st St, 9th Fl",
            line2: "(Between York & 1st Ave)",
        },
        city: "New York",
        state: "NY",
        modalities: ["CT", "US", "X-ray", "Mammo", "Breast Biopsy"],
        contact: {
            phone: {
                primary: { digits: "6469620122" },
            },
            fax: {
                primary: { digits: "2128210671" },
            },
        },
        hoursOfOperation: {
            timezone: "America/New_York",
            ranges: [
                { days: ["Mon", "Tue", "Wed", "Thu", "Fri"], open: "07:30", close: "19:30" },
                { days: ["Sat"], open: "07:30", close: "19:00" },
                { days: ["Sun"], open: "07:30", close: "19:30" },
            ],
        },
        contrastHours: {
            status: "n/a",
        },
        hasSpecialist: true,
        managerStaffId: "pm-icwhc-varsha-persuad",
        specialistStaffId: "ps-icwhc-alessia-russo",
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
        akaShortCode: "55TH",
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
        contact: {
            phone: {
                primary: { digits: "6469627001" },
                extensions: ["7030"],
            },
            fax: {
                primary: { digits: "2124211844" },
            },
        },
        hoursOfOperation: {
            timezone: "America/New_York",
            ranges: [{ days: ["Mon", "Tue", "Wed", "Thu", "Fri"], open: "08:00", close: "18:00" }],
        },
        contrastHours: {
            status: "text",
            value: "Contrast available 08:00–16:00.",
        },
        hasSpecialist: true,
        managerStaffId: "pm-dhk-maris-theodoropoulos",
        specialistStaffId: "ps-dhk-saliha-ismail",
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
        akaShortCode: "SPIRAL",
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
        contact: {
            phone: {
                primary: { digits: "2122973906" },
            },
            fax: {
                primary: { digits: "6469674319" },
            },
        },
        hoursOfOperation: {
            timezone: "America/New_York",
            ranges: [{ days: ["Mon", "Tue", "Wed", "Thu", "Fri"], open: "07:30", close: "20:00" }],
        },
        contrastHours: {
            status: "text",
            value: "No contrast from 16:00–17:30; contrast available during other open hours.",
        },
        hasSpecialist: false,
        managerStaffId: "pm-hudson-yards-jason-martin-williams",
        locationNotes: [
            {
                id: "spiral-shared-calendar",
                text: "Spiral shares days with Columbia Radiology and is only open on specific weekdays; future calendar integration will refine which days are WCINYP-run.",
                relatedFields: ["hoursOfOperation", "general"],
            },
            {
                id: "spiral-contrast-gap",
                text: "Contrast coverage is not available between 4:00pm and 5:30pm; contrasted exams must be scheduled outside this gap.",
                relatedFields: ["contrastHours"],
            },
        ],
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
        akaShortCode: "BROADWAY",
        name: "Upper West Side",
        region: "Upper West Side",
        borough: "Manhattan",
        address: {
            line1: "2315 Broadway, 4th Fl",
            line2: "(Between 83rd and 84th St)",
        },
        city: "New York",
        state: "NY",
        modalities: ["CT", "MRI", "US", "X-ray", "DEXA"],
        contact: {
            phone: {
                primary: { digits: "6469629161" },
            },
            fax: {
                primary: { digits: "6469620163" },
            },
        },
        hoursOfOperation: {
            timezone: "America/New_York",
            ranges: [
                { days: ["Mon", "Tue", "Wed", "Thu", "Fri"], open: "07:30", close: "20:00" },
                { days: ["Sat", "Sun"], open: "08:00", close: "20:00" },
            ],
        },
        contrastHours: {
            status: "tbd",
        },
        hasSpecialist: true,
        managerStaffId: "pm-uws-alisha-wahab",
        specialistStaffId: "ps-uws-michelle-balint",
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
        akaShortCode: "BEEKMAN",
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
            "Mammo",
            "DEXA",
            "Breast Biopsy",
        ],
        contact: {
            phone: {
                primary: { digits: "6469629729" },
                extensions: ["9288", "9289"],
            },
            fax: {
                primary: { digits: "6469620729" },
                // TODO: Confirm if 6469620163 should remain as an additional fax line for Beekman.
                others: [{ digits: "6469620163" }],
            },
        },
        hoursOfOperation: {
            timezone: "America/New_York",
            ranges: [
                { days: ["Mon", "Tue", "Wed", "Thu", "Fri"], open: "07:30", close: "20:00" },
                { days: ["Sat"], open: "07:30", close: "19:00" },
            ],
        },
        contrastHours: {
            status: "tbd",
        },
        hasSpecialist: true,
        managerStaffId: "pm-lm-shereen-yearwood",
        specialistStaffId: "ps-lm-celine-ramirez",
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
        akaShortCode: "LIC",
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
            "Mammo",
            "Breast Biopsy",
        ],
        contact: {
            phone: {
                primary: { digits: "6469624704" },
            },
            fax: {
                primary: { digits: "6469674096" },
            },
        },
        hoursOfOperation: {
            timezone: "America/New_York",
            ranges: [{ days: ["Mon", "Tue", "Wed", "Thu", "Fri"], open: "07:30", close: "20:00" }],
        },
        contrastHours: {
            status: "tbd",
        },
        hasSpecialist: true,
        managerStaffId: "pm-lic-cristina-valentine",
        specialistStaffId: "ps-lic-veronia-kamel",
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
