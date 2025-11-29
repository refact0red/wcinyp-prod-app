import type { WcinypPhoneGroup } from "@/lib/wcinyp/phones";

export type WcinypStaffRole = "Practice Manager" | "Practice Specialist" | "Senior Patient Coordinator";

export type WcinypStaffStatus = "active" | "inactive";

export type WcinypStaffMember = {
    id: string;
    name: string;
    role: WcinypStaffRole;
    email?: string;
    officePhone?: WcinypPhoneGroup;
    mobilePhone?: WcinypPhoneGroup;
    /**
     * Primary WCINYP imaging location where this staff member is based.
     */
    primaryLocationId: string;
    /**
     * Additional locations where this staff member regularly covers or rotates.
     */
    secondaryLocationIds?: string[];
    status: WcinypStaffStatus;
};

// TODO: Expand this dataset to include SPCs and other admin staff.
// During account registration we should capture title/role and link
// only certain roles (Practice Manager, SPCs, Specialists) to locations.
// DHK and 55th should be modeled as an explicit dual-site relationship,
// while Spiral coverage should reflect that staff may have a main site
// elsewhere and cover Spiral on specific days.

export const wcinypStaff: WcinypStaffMember[] = [
    // Long Island City (LIC)
    {
        id: "pm-lic-cristina-valentine",
        name: "Cristina Valentine",
        role: "Practice Manager",
        email: "chb2044@med.cornell.edu",
        officePhone: {
            primary: { digits: "6469624880" },
        },
        primaryLocationId: "long-island-city",
        status: "active",
    },
    {
        id: "ps-lic-veronia-kamel",
        name: "Veronia Kamel",
        role: "Practice Specialist",
        email: "vek4002@med.cornell.edu",
        officePhone: {
            primary: { digits: "6469624704" },
        },
        primaryLocationId: "long-island-city",
        status: "active",
    },

    // Lower Manhattan (Beekman)
    {
        id: "pm-lm-shereen-yearwood",
        name: "Shereen Yearwood",
        role: "Practice Manager",
        email: "shy2006@med.cornell.edu",
        officePhone: {
            primary: { digits: "6469629269" },
        },
        mobilePhone: {
            primary: { digits: "9175830728" },
        },
        primaryLocationId: "lower-manhattan",
        status: "active",
    },
    {
        id: "ps-lm-celine-ramirez",
        name: "Celine Ramirez",
        role: "Practice Specialist",
        email: "cer4001@med.cornell.edu",
        primaryLocationId: "lower-manhattan",
        status: "active",
    },

    // Hudson Yards (Spiral)
    {
        id: "pm-hudson-yards-jason-martin-williams",
        name: "Jason Martin-Williams",
        role: "Practice Manager",
        officePhone: {
            primary: { digits: "2122973015" },
        },
        primaryLocationId: "hudson-yards",
        status: "active",
    },

    // Iris Cantor / 61st
    {
        id: "pm-icwhc-varsha-persuad",
        name: "Varsha Persuad",
        role: "Practice Manager",
        email: "vap2004@med.cornell.edu",
        officePhone: {
            primary: { digits: "6469629649" },
        },
        mobilePhone: {
            primary: { digits: "3476400805" },
        },
        primaryLocationId: "iris-cantor-womens-health-center",
        status: "active",
    },
    {
        id: "ps-icwhc-alessia-russo",
        name: "Alessia Russo",
        role: "Practice Specialist",
        email: "alr4023@med.cornell.edu",
        primaryLocationId: "iris-cantor-womens-health-center",
        status: "active",
    },

    // David H. Koch Center (DHK) – shared with 55th
    {
        id: "pm-dhk-maris-theodoropoulos",
        name: "Maris Theodoropoulos",
        role: "Practice Manager",
        email: "mlm2009@med.cornell.edu",
        officePhone: {
            primary: { digits: "6466970488" },
        },
        mobilePhone: {
            primary: { digits: "2072320956" },
        },
        primaryLocationId: "david-h-koch-center",
        secondaryLocationIds: ["midtown-east"],
        status: "active",
    },
    {
        id: "ps-dhk-saliha-ismail",
        name: "Saliha Ismail",
        role: "Practice Specialist",
        email: "sai4007@med.cornell.edu",
        primaryLocationId: "david-h-koch-center",
        secondaryLocationIds: ["midtown-east"],
        status: "active",
    },

    // Starr
    {
        id: "pm-starr-jessica-sgroi",
        name: "Jessica Sgroi",
        role: "Practice Manager",
        email: "jes4005@med.cornell.edu",
        officePhone: {
            primary: { digits: "2127467141" },
        },
        primaryLocationId: "starr-pavillion",
        status: "active",
    },
    {
        id: "ps-starr-gladys-portillo-cabrera",
        name: "Gladys Portillo-Cabrera",
        role: "Practice Specialist",
        email: "glp4001@med.cornell.edu",
        officePhone: {
            primary: { digits: "2127466093" },
        },
        primaryLocationId: "starr-pavillion",
        status: "active",
    },

    // Weill Greenberg Center (WGC)
    {
        id: "pm-wgc-brooke-cascella",
        name: "Brooke Cascella",
        role: "Practice Manager",
        email: "brc9160@med.cornell.edu",
        officePhone: {
            primary: { digits: "6469627016" },
        },
        mobilePhone: {
            primary: { digits: "2072323552" },
        },
        primaryLocationId: "weill-greenberg-center",
        status: "active",
    },
    {
        id: "ps-wgc-colleen-doherty",
        name: "Colleen Doherty",
        role: "Practice Specialist",
        officePhone: {
            primary: { digits: "6469623331" },
        },
        primaryLocationId: "weill-greenberg-center",
        status: "active",
    },

    // Upper West Side (Broadway)
    {
        id: "pm-uws-alisha-wahab",
        name: "Alisha Wahab",
        role: "Practice Manager",
        email: "alw4011@med.cornell.edu",
        officePhone: {
            primary: { digits: "6469629174" },
        },
        primaryLocationId: "upper-west-side",
        status: "active",
    },
    {
        id: "ps-uws-michelle-balint",
        name: "Michelle Balint",
        role: "Practice Specialist",
        email: "mmb4002@med.cornell.edu",
        primaryLocationId: "upper-west-side",
        status: "active",
    },
];

