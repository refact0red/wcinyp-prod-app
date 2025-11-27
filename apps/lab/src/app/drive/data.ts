export type DriveItemStatus = "Synced" | "In Review" | "Draft";

export type DriveItemType = "Document" | "Presentation" | "Spreadsheet" | "Image" | "Folder";

export type DriveItem = {
    id: number;
    name: string;
    type: DriveItemType;
    status: DriveItemStatus;
    updated: string;
    size: string;
    shared: boolean;
};

export const driveItems: DriveItem[] = [
    {
        id: 1,
        name: "Capture briefing",
        type: "Document",
        status: "Synced",
        updated: "2024-08-04T12:30:00Z",
        size: "1.2 MB",
        shared: true,
    },
    {
        id: 2,
        name: "Proposal outline",
        type: "Document",
        status: "In Review",
        updated: "2024-08-02T14:10:00Z",
        size: "840 KB",
        shared: false,
    },
    {
        id: 3,
        name: "Staffing model",
        type: "Spreadsheet",
        status: "Draft",
        updated: "2024-07-29T09:00:00Z",
        size: "2.4 MB",
        shared: true,
    },
    {
        id: 4,
        name: "Technical appendix",
        type: "Presentation",
        status: "Synced",
        updated: "2024-07-28T18:00:00Z",
        size: "3.8 MB",
        shared: false,
    },
    {
        id: 5,
        name: "Design mocks",
        type: "Image",
        status: "In Review",
        updated: "2024-07-25T11:00:00Z",
        size: "24.1 MB",
        shared: true,
    },
    {
        id: 6,
        name: "Contracts",
        type: "Folder",
        status: "Synced",
        updated: "2024-07-21T16:00:00Z",
        size: "—",
        shared: true,
    },
    {
        id: 7,
        name: "Compliance checklist",
        type: "Spreadsheet",
        status: "Draft",
        updated: "2024-07-20T15:30:00Z",
        size: "980 KB",
        shared: false,
    },
    {
        id: 8,
        name: "Kickoff deck",
        type: "Presentation",
        status: "Synced",
        updated: "2024-07-18T08:00:00Z",
        size: "5.1 MB",
        shared: true,
    },
];
