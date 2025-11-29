export type WcinypProviderStatus = "active" | "retired" | "departed" | "unresolved";

export type WcinypProviderEntityType = "clinic" | "individual";

export type WcinypProviderVerificationStatus = "verified" | "unverified";

export type WcinypProvider = {
    id: string;
    entityType: WcinypProviderEntityType;
    /**
     * Display name for the clinic or provider.
     */
    name: string;
    /**
     * Whether this entry has been formally reviewed and verified.
     * When omitted, the provider should be treated as unverified.
     *
     * TODO: When we add a dedicated provider edit sheet in the lab app,
     * this flag should only be set via an explicit "verification" step
     * in that workflow (not silent form saves). The verification action
     * itself should be auditable with:
     * - the editor's identity,
     * - a timestamp,
     * - and a short freeform comment about what was verified or updated.
     *
     * The edit sheet should support appending a new verification comment
     * without exposing or modifying prior comments. For full history,
     * link out to a read-only "view history" timeline (e.g. a vertical
     * timeline view) that shows past verification events and comments.
     */
    verificationStatus?: WcinypProviderVerificationStatus;
    /**
     * For clinics or programs, the key clinicians associated with this entry.
     */
    clinicians?: string[];
    /**
     * Optional specialty or service line description.
     */
    specialties?: string;
    /**
     * For individuals, a primary clinic, program, or service line.
     */
    affiliation?: string;
    /**
     * Simple freeform tags for filtering or visual grouping.
     * Examples: "Internal", "External", "PTHS", "Cardiology".
     */
    tags?: string[];
    status?: WcinypProviderStatus;
    /**
     * Operational notes for scheduling, techs, and front desk staff.
     * Supports newlines to mirror manual-style guidance.
     */
    notes: string;
};

export const wcinypProviders: WcinypProvider[] = [
    {
        id: "brain-tumor-center",
        entityType: "clinic",
        name: "Brain Tumor Center",
        verificationStatus: "unverified",
        clinicians: ["Howard Fine, MD", "Rajiv Magge, MD", "Eunji Yim, MD"],
        tags: ["Internal program"],
        notes: [
            "Approved to use signed order by Lauren Costello FNP / Kris Antoinette Abiola NP (BTC NPs).",
            "Does not place or cosign orders in EPIC (Dr. Magge will occasionally sign his own orders).",
            "If NP places signed order for MR brain but scheduled appointment is for tumor adv, we can still use MR brain order (approved by Bernie).",
            "When calling office for missing scripts please consolidate requests to minimize calls (they refer many patients).",
        ].join("\n"),
    },
    {
        id: "weill-cornell-community-clinic",
        entityType: "clinic",
        name: "Weill Cornell Community Clinic",
        verificationStatus: "unverified",
        clinicians: ["Cecilia Nicol, MD", "Pamela Charney, MD"],
        specialties: "Internal Medicine",
        tags: ["Internal clinic", "WCCC"],
        notes: [
            "Providers cannot cosign orders in Epic due to billing issues.",
            "They will normally scan an order into Media and decline the cosign request.",
            'They decline the cosign and leave a comment visible from Declined Cosign Report: "Patient is seen by the WCCC student-run free clinic — order is in Media tab."',
        ].join("\n"),
    },
    {
        id: "anna-kisselbach-np",
        entityType: "individual",
        name: "Anna Kisselbach, NP",
        verificationStatus: "unverified",
        affiliation: "Neurosurgery",
        tags: ["Shunts"],
        notes: [
            "For referred patients with shunts where it is unclear if re-programming is required after MRI, send safety or reprogramming questions to Will / Nelson / Bernie.",
            "Do not call NP Kisselbach's office or patients directly to verify shunt type. These questions can confuse patients and should be answerable by lead techs when reviewing charts.",
            "If shunt is confirmed to require re-programming, verify the patient has an appointment to reprogram within 24 hours after MRI on CC.",
        ].join("\n"),
    },
    {
        id: "brian-apatoff-md",
        entityType: "individual",
        name: "Brian Apatoff, MD",
        verificationStatus: "unverified",
        specialties: "Psychiatry & Neurology",
        tags: ["PTHS", "3T preferred"],
        notes: [
            "Patients are always PTHS — contact to confirm PTHS and obtain a copy.",
            "Only reach out to his office to obtain a verbal as a last resort at time of service or if the patient confirms they do not have an RX.",
            "All scans ordered must be done on 3T (exceptions only for MRI safety restrictions or protocols for 1.5T only).",
            "Office has a direct cell contact on file.",
        ].join("\n"),
    },
    {
        id: "michael-amoashiy-md",
        entityType: "individual",
        name: "Michael Amoashiy, MD",
        verificationStatus: "unverified",
        specialties: "Neurology",
        notes: [
            "Patients are given a copy of their script.",
            "Always obtain a copy of the RX before the appointment.",
        ].join("\n"),
    },
    {
        id: "frank-petito-md",
        entityType: "individual",
        name: "Frank Petito, MD",
        verificationStatus: "unverified",
        specialties: "Neurology",
        notes: [
            "Scripts are faxed to x0122 and/or scanned into Media.",
            "Epic chat Tonya Barbee or Cinthia Pedernera to have RX placed.",
        ].join("\n"),
    },
    {
        id: "anne-moore-md",
        entityType: "individual",
        name: "Anne Moore, MD",
        verificationStatus: "unverified",
        specialties: "Hematology / Medical Oncology",
        notes: [
            "Alyson Goldenberg, NP is the best point of contact in Epic and places signed orders for OP.",
            "Dr. Moore rarely responds to Epic chats.",
        ].join("\n"),
    },
    {
        id: "michael-lieberman-md",
        entityType: "individual",
        name: "Michael D. Lieberman, MD",
        verificationStatus: "unverified",
        specialties: "Surgical Oncology",
        notes: [
            "Orders are always in Media and can be added to Media upon request.",
            'RN Hope Baker will place order and use the modifier "Per protocol: no cosign required" — edit the order to send a cosign request or Dr. Lieberman will not be able to sign.',
            "Shirly Correa uploads signed RX in Media (signature is closer to Ordering Information / NPI in the right corner).",
        ].join("\n"),
    },
    {
        id: "david-blumenthal-md",
        entityType: "individual",
        name: "David S. Blumenthal, MD",
        verificationStatus: "unverified",
        specialties: "Cardiovascular Disease",
        notes: ["Office emails RX to pre-registration."].join("\n"),
    },
    {
        id: "cary-gunther-md",
        entityType: "individual",
        name: "Cary S. Gunther, MD",
        verificationStatus: "unverified",
        notes: [
            "Office has stated they provide RX directly to patients.",
            "Patients should generally be PTHS.",
        ].join("\n"),
    },
    {
        id: "wendy-ziecheck-md",
        entityType: "individual",
        name: "Wendy Sue Ziecheck, MD",
        verificationStatus: "unverified",
        notes: ["Office has stated all patients are PTHS."].join("\n"),
    },
    {
        id: "sabina-grochowski-md",
        entityType: "individual",
        name: "Sabina Theresa Grochowski, MD",
        verificationStatus: "unverified",
        notes: [
            "Office has stated they do not keep copies of RX once provided to patients; patients should generally be PTHS.",
        ].join("\n"),
    },
    {
        id: "lawrence-inra-md",
        entityType: "individual",
        name: "Lawrence Inra, MD",
        verificationStatus: "unverified",
        specialties: "Cardiovascular Disease",
        notes: [
            "Scripts are faxed to x0122 or sent to the pre-registration email (usually from inra.officestaff@407heart.com).",
            "Before calling the office for an RX, check the pre-registration email for the script.",
        ].join("\n"),
    },
    {
        id: "david-kutler-md",
        entityType: "individual",
        name: "David I. Kutler, MD, FACS",
        verificationStatus: "unverified",
        specialties: "ENT / Otolaryngology",
        notes: ["Christine C. Roque (SPC, x15355) is a good point of contact."].join("\n"),
    },
    {
        id: "elizabeta-popa-md",
        entityType: "individual",
        name: "Elizabeta C. Popa, MD",
        verificationStatus: "unverified",
        notes: ["Contact Matthew P. Whalen, PA via Epic chat for any questions or change orders."].join("\n"),
    },
    {
        id: "meredith-lash-dardia-md",
        entityType: "individual",
        name: "Meredith F. Lash-Dardia, MD",
        verificationStatus: "unverified",
        notes: [
            'Do not send cosign requests to this provider; she prefers to review the patient before any imaging is done.',
        ].join("\n"),
    },
    {
        id: "srinivas-kesanakurthy-md",
        entityType: "individual",
        name: "Srinivas Kesanakurthy, MD",
        verificationStatus: "unverified",
        specialties: "Cardiovascular Disease",
        notes: [
            "Do not contact this office directly for RX.",
            "Scripts are sent to the pre-registration email (usually by Yasuri Jimenez).",
            "Scripts may be scanned into Media under several pages of clinical notes.",
            "If RX cannot be found, then reach out to Nita Saliaga in Marketing.",
            'Approved to use "C-MRI" as a cardiac RX from this provider (per Dr. Keith Hentel).',
            "Additional notes about exams ordered from this provider are documented in the WCINYP manual.",
        ].join("\n"),
    },
    {
        id: "anna-nordvig-md",
        entityType: "individual",
        name: "Anna S. Nordvig, MD",
        verificationStatus: "unverified",
        specialties: "Psychiatry & Neurology",
        notes: [
            "Often associated with orders that include ASL sequences.",
            "Check MR brain order comments — she will explicitly write if the exam must be done at Beekman due to ASL sequences.",
            'Often indicated solely by answering "yes" to the ordering question "Would you like to include ASL sequences?".',
        ].join("\n"),
    },
    {
        id: "sonja-blum-md-phd",
        entityType: "individual",
        name: "Sonja Blum, MD, PhD",
        verificationStatus: "unverified",
        specialties: "Psychiatry & Neurology",
        notes: [
            "Tends to request ASL sequences.",
            "Check MR brain order comments — she may explicitly write if the exam must be done at Beekman due to ASL sequences.",
        ].join("\n"),
    },
    {
        id: "so-young-kim-md",
        entityType: "individual",
        name: "So-Young Kim, MD",
        verificationStatus: "unverified",
        notes: [
            "Will indicate location preference for where patients must complete DEXA for comparisons (written on the Epic order).",
            "WCINYP must honor the location preference; escalate issues to Brooke or Colleen.",
        ].join("\n"),
    },
    {
        id: "rosemary-soave-md",
        entityType: "individual",
        name: "Rosemary Soave, MD",
        verificationStatus: "unverified",
        notes: [
            "Provider confirmed the number in Epic is her personal number and she does not have an office.",
            "Prefers Epic chat rather than phone calls.",
        ].join("\n"),
    },
    {
        id: "nicholas-colangelo-np",
        entityType: "individual",
        name: "Nicholas Colangelo, NP",
        verificationStatus: "unverified",
        notes: [
            "Call 212-227-8401 and leave a message with the nursing station; provider will see messages and return the call.",
            "Prefers approximately a week in advance notice to respond due to tight schedule (ext. 151).",
        ].join("\n"),
    },
    {
        id: "alexander-swistel-md",
        entityType: "individual",
        name: "Alexander Julian Swistel, MD",
        verificationStatus: "unverified",
        status: "retired",
        tags: ["Retired"],
        notes: [
            "Retired.",
            "For patients already on the schedule, orders should be updated to Dr. Magdalena Plasilova with new cosign messaging.",
            "For new patients trying to schedule with Dr. Swistel, inform them of the change to Dr. Plasilova and advise they may call the practice with any questions.",
        ].join("\n"),
    },
    {
        id: "grace-kong-md",
        entityType: "individual",
        name: "Grace Kong, MD",
        verificationStatus: "unverified",
        specialties: "Pediatric Cardiology",
        status: "departed",
        tags: ["Departed WCM", "Pediatrics"],
        notes: [
            "Departed WCM.",
            "WCINYP no longer sees pediatric cardiac patients without prior approvals.",
        ].join("\n"),
    },
    {
        id: "jonathan-knisely-md",
        entityType: "individual",
        name: "Jonathan Knisely, MD",
        verificationStatus: "unverified",
        status: "departed",
        tags: ["Departed WCM"],
        notes: [
            "Can contact Morrisha Edmondson from clinical staff for verbals.",
            "As of 3/27/25, office indicated Dr. Knisely no longer works at WCM.",
            "Orders can be updated to Emily Yellen, NP.",
        ].join("\n"),
    },
    {
        id: "jacqueline-lamothe-np",
        entityType: "individual",
        name: "Jacqueline Lamothe, NP",
        verificationStatus: "unverified",
        status: "unresolved",
        notes: [
            "Need to verify whether this NP assists with shunts.",
        ].join("\n"),
    },
    {
        id: "thomas-lallas-md",
        entityType: "individual",
        name: "Thomas A. Lallas, MD",
        verificationStatus: "unverified",
        status: "unresolved",
        notes: ["Office is not open on Fridays."].join("\n"),
    },
    {
        id: "anna-asloyan-md",
        entityType: "individual",
        name: "Anna Asloyan, MD",
        verificationStatus: "unverified",
        status: "unresolved",
        notes: [
            'If you see an RX from her that says "L-S" it means MR lumbar spine; no need to call to confirm that it is not an MR lumbosacral plexus.',
            'Per Bernie, an RX must explicitly say "plexus" to be considered an MR lumbosacral plexus.',
        ].join("\n"),
    },
    {
        id: "julie-vasile-md",
        entityType: "individual",
        name: "Julie Vasile, MD, FACS",
        verificationStatus: "unverified",
        status: "unresolved",
        notes: [
            "Scripts are faxed to x0122 or sent to the pre-registration email (usually sent by Anny Benzo).",
            "Writes extensive notes on how to perform exams and requests for images.",
            "May request techs call her at (516) 279-0823.",
        ].join("\n"),
    },
    {
        id: "scott-tagawa-md",
        entityType: "individual",
        name: "Scott T. Tagawa, MD",
        verificationStatus: "unverified",
        status: "unresolved",
        notes: ["Prefers Ga68-PSMA for PET/CT (prostate) exams instead of F18-PSMA."].join("\n"),
    },
    {
        id: "samuel-selesnick-md",
        entityType: "individual",
        name: "Samuel H. Selesnick, MD",
        verificationStatus: "unverified",
        specialties: "ENT / Otolaryngology",
        status: "unresolved",
        notes: [
            "Tends to fax orders to x0122.",
            "Will occasionally also place orders in Epic and cosign.",
        ].join("\n"),
    },
    {
        id: "thomas-nash-md",
        entityType: "individual",
        name: "Thomas Nash, MD",
        verificationStatus: "unverified",
        specialties: "Infectious Disease",
        status: "unresolved",
        notes: ["Additional guidance needed (notes not yet documented)."].join("\n"),
    },
    {
        id: "richard-mueller-md",
        entityType: "individual",
        name: "Richard Mueller, MD",
        verificationStatus: "unverified",
        specialties: "Cardiovascular Disease",
        status: "unresolved",
        notes: [
            "Review scripts to verify the correct ordering provider.",
            "RX may list another ordering provider; the correct ordering provider box will be checked off.",
            "Update the referring provider in Epic accordingly.",
        ].join("\n"),
    },
    {
        id: "colleen-mccarthy-md",
        entityType: "individual",
        name: "Colleen M. McCarthy, MD",
        verificationStatus: "unverified",
        status: "unresolved",
        notes: [
            "Ordering provider for MRA PFA Abd/Pel only — no lower extremities — for breast reconstruction (DIEP mapping).",
            "Office admin may be short-tempered when asked to verify the correct order selected and may check off an incorrect box.",
        ].join("\n"),
    },
    {
        id: "alex-racco-do",
        entityType: "individual",
        name: "Alex Racco, DO",
        verificationStatus: "unverified",
        status: "unresolved",
        notes: [
            "Office has indicated they provide only a copy of the RX directly to the patient and do not retain an original.",
        ].join("\n"),
    },
    {
        id: "halina-white-md",
        entityType: "individual",
        name: "Halina White, MD",
        verificationStatus: "unverified",
        specialties: "Neurology (WCM)",
        status: "unresolved",
        notes: [
            "WCM Neurology.",
            "If office is closed, her cell phone is 646-639-2561.",
        ].join("\n"),
    },
    {
        id: "jonathan-kligman-md",
        entityType: "individual",
        name: "Jonathan Kligman, MD",
        verificationStatus: "unverified",
        status: "unresolved",
        notes: [
            "Office is very responsive.",
            "Can email or fax RX directly and is able to email RX on request (use option 3).",
        ].join("\n"),
    },
];
