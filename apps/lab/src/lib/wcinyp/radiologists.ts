export type WcinypRadiologistSpecialty =
  | "Abdominal Imaging"
  | "Breast Imaging"
  | "Cardiac Imaging"
  | "Chair"
  | "Chest Imaging"
  | "Emergency Imaging"
  | "Lung Cancer Screening"
  | "Musculoskeletal Imaging"
  | "Neuroradiology"
  | "Neurologic (Brain), Head and Neck Imaging"
  | "Nuclear & Molecular Imaging"
  | "Pediatric Imaging";

export type WcinypRadiologistHeadshot = {
  src: string;
  alt: string;
};

export type WcinypRadiologist = {
  id: string;
  name: string;
  profileUrl: string;
  headshot: WcinypRadiologistHeadshot;
  specialties: WcinypRadiologistSpecialty[];
  /**
   * Whether this radiologist has a true individual headshot
   * (as opposed to a generic placeholder). Defaults to true.
   */
  hasHeadshot?: boolean;
  // TODO: Associate this record with the radiologist's CWID,
  // derived from their med.cornell.edu / weillcornell.org handle.
  // TODO: Expand this model to include residents and fellows, optional
  // reading room / coverage links, and a mapping to the breast imaging
  // PDF that lists 2-digit breast radiologist codes used for order
  // changes under rad approval (including associating those codes to
  // breast rads). We may also add a back-side view / details state
  // for these cards in the radiologist directory.
};

export const wcinypRadiologists: WcinypRadiologist[] = [
  {
    id: "matthew-agee-md",
    name: "Matthew Allan Agee, M.D.",
    profileUrl: "https://weillcornell.org/matthew-agee-md",
    headshot: {
      src: "/images/radiologists/matthew-agee-md.jpg",
      alt: "Matthew Allan Agee, M.D.",
    },
    specialties: ["Nuclear & Molecular Imaging"],
  },
  {
    id: "jeffrey-blake-alpert-md",
    name: "Jeffrey Blake Alpert, M.D.",
    profileUrl: "https://weillcornell.org/jeffrey-blake-alpert-md",
    headshot: {
      src: "/images/radiologists/jeffrey-blake-alpert-md.jpg",
      alt: "Jeffrey Blake Alpert, M.D.",
    },
    specialties: ["Cardiac Imaging"],
  },
  {
    id: "earleo",
    name: "Elizabeth K. Arleo, M.D., FACR",
    profileUrl: "https://weillcornell.org/earleo",
    headshot: {
      src: "/images/radiologists/earleo.jpg",
      alt: "Elizabeth K. Arleo, M.D., FACR",
    },
    specialties: ["Breast Imaging", "Abdominal Imaging"],
  },
  {
    id: "aasrani",
    name: "Ashwin V. Asrani, M.B., B.S.",
    profileUrl: "https://weillcornell.org/aasrani",
    headshot: {
      src: "/images/radiologists/aasrani.jpg",
      alt: "Ashwin V. Asrani, M.B., B.S.",
    },
    specialties: ["Emergency Imaging", "Musculoskeletal Imaging"],
  },
  {
    id: "michael-baad-md",
    name: "Michael Baad, M.D.",
    profileUrl: "https://weillcornell.org/michael-baad-md",
    headshot: {
      src: "/images/radiologists/michael-baad-md.jpg",
      alt: "Michael Baad, M.D.",
    },
    specialties: ["Pediatric Imaging"],
  },
  {
    id: "kbababgemi",
    name: "Kemi Babagbemi, M.D., FACR",
    profileUrl: "https://weillcornell.org/kbabagbemi",
    headshot: {
      src: "/images/radiologists/kbababgemi.jpg",
      alt: "Kemi Babagbemi, M.D., FACR",
    },
    specialties: ["Abdominal Imaging", "Breast Imaging"],
  },
  {
    id: "emily-babiss-md",
    name: "Emily Babiss, M.D.",
    profileUrl: "https://weillcornell.org/emily-babiss-md",
    headshot: {
      src: "/images/radiologists/emily-babiss-md.png",
      alt: "Emily Babiss, M.D.",
    },
    specialties: ["Breast Imaging"],
    // TODO: Dr. Babiss's source image is too narrow, causing a visible white
    // border on the right in our 3:4 crop. Re-export or pad the asset so it
    // fills the frame cleanly.
  },
  {
    id: "avani-baral-md",
    name: "Avani Baral, M.D.",
    profileUrl: "https://weillcornell.org/avani-baral-md",
    headshot: {
      src: "/images/radiologists/avani-baral-md.jpg",
      alt: "Avani Baral, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "rbartolotta",
    name: "Roger J. Bartolotta, M.D.",
    profileUrl: "https://weillcornell.org/rbartolotta",
    headshot: {
      src: "/images/radiologists/rbartolotta.jpg",
      alt: "Roger J. Bartolotta, M.D.",
    },
    specialties: ["Musculoskeletal Imaging"],
  },
  {
    id: "lmbelfi",
    name: "Lily M. Belfi, M.D.",
    profileUrl: "https://weillcornell.org/lmbelfi",
    headshot: {
      src: "/images/radiologists/lmbelfi.jpg",
      alt: "Lily M. Belfi, M.D.",
    },
    specialties: ["Musculoskeletal Imaging", "Emergency Imaging"],
  },
  {
    id: "elizabeth-bellew-md",
    name: "Elizabeth Bellew, M.D.",
    profileUrl: "https://weillcornell.org/elizabeth-bellew-md",
    headshot: {
      src: "/images/radiologists/elizabeth-bellew-md.jpg",
      alt: "Elizabeth Bellew, M.D.",
    },
    specialties: ["Abdominal Imaging", "Breast Imaging"],
  },
  {
    id: "carlos-benitez-md",
    name: "Carlos Benitez, M.D.",
    profileUrl: "https://weillcornell.org/carlos-benitez-md",
    headshot: {
      src: "/images/radiologists/carlos-benitez-md.jpg",
      alt: "Carlos Benitez, M.D.",
    },
    specialties: ["Musculoskeletal Imaging"],
  },
  {
    id: "carolyn-boltin-md",
    name: "Carolyn Boltin, M.D.",
    profileUrl: "https://weillcornell.org/carolyn-boltin-md",
    headshot: {
      src: "/images/radiologists/carolyn-boltin-md.jpg",
      alt: "Carolyn Boltin, M.D.",
    },
    specialties: ["Emergency Imaging", "Musculoskeletal Imaging"],
  },
  {
    id: "dboyajian",
    name: "David A. Boyajian, M.D.",
    profileUrl: "https://weillcornell.org/dboyajian",
    headshot: {
      src: "/images/radiologists/dboyajian.jpg",
      alt: "David A. Boyajian, M.D.",
    },
    specialties: ["Abdominal Imaging", "Emergency Imaging", "Musculoskeletal Imaging"],
  },
  {
    id: "michelle-s-bradbury-md",
    name: "Michelle S. Bradbury, M.D.",
    profileUrl: "https://weillcornell.org/michelle-s-bradbury-md",
    headshot: {
      src: "/images/radiologists/michelle-s-bradbury-md.jpg",
      alt: "Michelle S. Bradbury, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "emily-brady-md",
    name: "Emily Brady, M.D.",
    profileUrl: "https://weillcornell.org/emily-brady-md",
    headshot: {
      src: "/images/radiologists/emily-brady-md.jpg",
      alt: "Emily Brady, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "geraldine-brusca-augello-do",
    name: "Geraldine Brusca-Augello, D.O.",
    profileUrl: "https://weillcornell.org/geraldine-brusca-augello-do",
    headshot: {
      src: "/images/radiologists/geraldine-brusca-augello-do.jpg",
      alt: "Geraldine Brusca-Augello, D.O.",
    },
    specialties: ["Chest Imaging"],
  },
  {
    id: "sandra-huicochea-castellanos-md",
    name: "Sandra Huicochea Castellanos, M.D.",
    profileUrl: "https://weillcornell.org/sandra-huicochea-castellanos-md",
    headshot: {
      src: "/images/radiologists/sandra-huicochea-castellanos-md.jpg",
      alt: "Sandra Huicochea Castellanos, M.D.",
    },
    specialties: ["Nuclear & Molecular Imaging"],
  },
  {
    id: "manjil-chatterji-md",
    name: "Manjil Chatterji, M.D.",
    profileUrl: "https://weillcornell.org/manjil-chatterji-md",
    headshot: {
      src: "/images/radiologists/manjil-chatterji-md.jpg",
      alt: "Manjil Chatterji, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "johnsonchen",
    name: "Johnson Chen, M.D.",
    profileUrl: "https://weillcornell.org/johnsonchen",
    headshot: {
      src: "/images/radiologists/johnsonchen.jpg",
      alt: "Johnson Chen, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "gcchiang",
    name: "Gloria C. Chiang, M.D.",
    profileUrl: "https://weillcornell.org/gcchiang",
    headshot: {
      src: "/images/radiologists/gcchiang.jpg",
      alt: "Gloria C. Chiang, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "blake-christianson-md",
    name: "Blake Christianson, M.D.",
    profileUrl: "https://weillcornell.org/blake-christianson-md",
    headshot: {
      src: "/images/radiologists/blake-christianson-md.jpg",
      alt: "Blake Christianson, M.D.",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "kristen-coffey-md",
    name: "Kristen Coffey, M.D.",
    profileUrl: "https://weillcornell.org/kristen-coffey-md",
    headshot: {
      src: "/images/radiologists/kristen-coffey-md.jpg",
      alt: "Kristen Coffey, M.D.",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "sara-cohen-md",
    name: "Sara Cohen, M.D.",
    profileUrl: "https://weillcornell.org/sara-cohen-md",
    headshot: {
      src: "/images/radiologists/sara-cohen-md.jpg",
      alt: "Sara Cohen, M.D.",
    },
    specialties: ["Pediatric Imaging"],
  },
  {
    id: "lee-kathleen-collins-md",
    name: "Lee Kathleen Collins, M.D.",
    profileUrl: "https://weillcornell.org/lee-kathleen-collins-md",
    headshot: {
      src: "/images/radiologists/lee-kathleen-collins-md.png",
      alt: "Lee Kathleen Collins, M.D.",
    },
    specialties: ["Pediatric Imaging"],
  },
  {
    id: "jcomunale",
    name: "Joseph Comunale, M.D.",
    profileUrl: "https://weillcornell.org/jcomunale",
    headshot: {
      src: "/images/radiologists/jcomunale.jpg",
      alt: "Joseph Comunale, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "sconnolly",
    name: "Shanon M. Connolly, M.D.",
    profileUrl: "https://weillcornell.org/sconnolly",
    headshot: {
      src: "/images/radiologists/sconnolly.jpg",
      alt: "Shanon M. Connolly, M.D.",
    },
    specialties: ["Abdominal Imaging", "Breast Imaging", "Emergency Imaging"],
  },
  {
    id: "marina-julia-corines-md",
    name: "Marina Julia Corines, M.D.",
    profileUrl: "https://weillcornell.org/marina-julia-corines-md",
    headshot: {
      src: "/images/radiologists/marina-julia-corines-md.jpg",
      alt: "Marina Julia Corines, M.D.",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "kathryn-dean-md",
    name: "Kathryn Dean, M.D.",
    profileUrl: "https://weillcornell.org/kathryn-dean-md",
    headshot: {
      src: "/images/radiologists/kathryn-dean-md.jpg",
      alt: "Kathryn Dean, M.D.",
    },
    specialties: ["Emergency Imaging", "Musculoskeletal Imaging", "Neuroradiology"],
  },
  {
    id: "michael-destefano-md",
    name: "Michael DeStefano, M.D.",
    profileUrl: "https://weillcornell.org/michael-destefano-md",
    headshot: {
      src: "/images/radiologists/michael-destefano-md.jpg",
      alt: "Michael DeStefano, M.D.",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "kdodelzon",
    name: "Katerina Dodelzon, M.D.",
    profileUrl: "https://weillcornell.org/kdodelzon",
    headshot: {
      src: "/images/radiologists/kdodelzon.jpg",
      alt: "Katerina Dodelzon, M.D.",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "micheledrotman",
    name: "Michele B. Drotman, M.D., FACR",
    profileUrl: "https://weillcornell.org/micheledrotman",
    headshot: {
      src: "/images/radiologists/micheledrotman.jpg",
      alt: "Michele B. Drotman, M.D., FACR",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "silvina-dutruel-md",
    name: "Silvina Dutruel, M.D.",
    profileUrl: "https://weillcornell.org/silvina-dutruel-md",
    headshot: {
      src: "/images/radiologists/silvina-dutruel-md.jpg",
      alt: "Silvina Dutruel, M.D.",
    },
    specialties: ["Nuclear & Molecular Imaging"],
  },
  {
    id: "edward-j-ebani-md",
    name: "Edward J. Ebani, M.D.",
    profileUrl: "https://weillcornell.org/edward-j-ebani-md",
    headshot: {
      src: "/images/radiologists/edward-j-ebani-md.jpg",
      alt: "Edward J. Ebani, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "david-paul-edasery-md",
    name: "David Paul Edasery, M.D.",
    profileUrl: "https://weillcornell.org/david-paul-edasery-md",
    headshot: {
      src: "/images/radiologists/david-paul-edasery-md.jpg",
      alt: "David Paul Edasery, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "cseisen",
    name: "Carolyn Sharyn Eisen, M.D., FACR",
    profileUrl: "https://weillcornell.org/cseisen",
    headshot: {
      src: "/images/radiologists/cseisen.jpg",
      alt: "Carolyn Sharyn Eisen, M.D., FACR",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "lauren-asnis-ernbergmd-10354",
    name: "Lauren Asnis Ernberg, M.D.",
    profileUrl: "https://weillcornell.org/lauren-asnis-ernbergmd-10354",
    headshot: {
      src: "/images/radiologists/lauren-asnis-ernbergmd-10354.jpg",
      alt: "Lauren Asnis Ernberg, M.D.",
    },
    specialties: ["Musculoskeletal Imaging"],
  },
  {
    id: "joanna-escalon-md",
    name: "Joanna Escalon, M.D.",
    profileUrl: "https://weillcornell.org/joanna-escalon-md",
    headshot: {
      src: "/images/radiologists/joanna-escalon-md.jpg",
      alt: "Joanna Escalon, M.D.",
    },
    specialties: ["Cardiac Imaging", "Chest Imaging"],
  },
  {
    id: "alexander-gavlin-md",
    name: "Alexander Gavlin, M.D.",
    profileUrl: "https://weillcornell.org/alexander-gavlin-md",
    headshot: {
      src: "/images/radiologists/alexander-gavlin-md.png",
      alt: "Alexander Gavlin, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "francis-g-girvin-md",
    name: "Francis Girvin, M.D.",
    profileUrl: "https://weillcornell.org/francis-g-girvin-md",
    headshot: {
      src: "/images/radiologists/francis-g-girvin-md.jpg",
      alt: "Francis Girvin, M.D.",
    },
    specialties: ["Cardiac Imaging", "Chest Imaging"],
  },
  {
    id: "jill-gluskin-md",
    name: "Jill Gluskin, M.D.",
    profileUrl: "https://weillcornell.org/jill-gluskin-md",
    headshot: {
      src: "/images/radiologists/jill-gluskin-md.jpg",
      alt: "Jill Gluskin, M.D.",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "riya-goyal-md",
    name: "Riya Goyal, M.D.",
    profileUrl: "https://weillcornell.org/riya-goyal-md",
    headshot: {
      src: "/images/radiologists/riya-goyal-md.jpg",
      alt: "Riya Goyal, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "dgreen",
    name: "Daniel Benjamin Green, M.D.",
    profileUrl: "https://weillcornell.org/dgreen",
    headshot: {
      src: "/images/radiologists/dgreen.png",
      alt: "Daniel Benjamin Green, M.D.",
    },
    specialties: ["Chest Imaging", "Cardiac Imaging"],
  },
  {
    id: "maria-grigovich-md",
    name: "Maria Grigovich, M.D.",
    profileUrl: "https://weillcornell.org/maria-grigovich-md",
    headshot: {
      src: "/images/radiologists/maria-grigovich-md.jpg",
      alt: "Maria Grigovich, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "lauren-groner-do",
    name: "Lauren Groner, D.O.",
    profileUrl: "https://weillcornell.org/lauren-groner-do",
    headshot: {
      src: "/images/radiologists/lauren-groner-do.jpg",
      alt: "Lauren Groner, D.O.",
    },
    specialties: ["Cardiac Imaging", "Chest Imaging"],
  },
  {
    id: "ngumpeni",
    name: "Naveen Gumpeni, M.D.",
    profileUrl: "https://weillcornell.org/ngumpeni",
    headshot: {
      src: "/images/radiologists/ngumpeni.jpg",
      alt: "Naveen Gumpeni, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "preethi-guniganti-md",
    name: "Preethi Guniganti, M.D.",
    profileUrl: "https://weillcornell.org/preethi-guniganti-md",
    headshot: {
      src: "/images/radiologists/preethi-guniganti-md.jpg",
      alt: "Preethi Guniganti, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "deeptigupta",
    name: "Deepti Gupta, M.D.",
    profileUrl: "https://weillcornell.org/deeptigupta",
    headshot: {
      src: "/images/radiologists/deeptigupta.jpg",
      alt: "Deepti Gupta, M.D.",
    },
    specialties: ["Abdominal Imaging", "Breast Imaging"],
  },
  {
    id: "maria-hanna-md",
    name: "Maria Hanna, M.D.",
    profileUrl: "https://weillcornell.org/maria-hanna-md",
    headshot: {
      src: "/images/radiologists/maria-hanna-md.jpg",
      alt: "Maria Hanna, M.D.",
    },
    specialties: ["Emergency Imaging", "Neuroradiology"],
  },
  {
    id: "adina-haramati-md",
    name: "Adina Haramati, M.D.",
    profileUrl: "https://weillcornell.org/adina-haramati-md",
    headshot: {
      src: "/images/radiologists/adina-haramati-md.jpg",
      alt: "Adina Haramati, M.D.",
    },
    specialties: ["Cardiac Imaging", "Chest Imaging"],
  },
  {
    id: "mehartman",
    name: "Maya Elise Hartman, M.D.",
    profileUrl: "https://weillcornell.org/mehartman",
    headshot: {
      src: "/images/radiologists/mehartman.jpg",
      alt: "Maya Elise Hartman, M.D.",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "elizabeth-m-hecht-md",
    name: "Elizabeth Hecht, M.D.",
    profileUrl: "https://weillcornell.org/elizabeth-m-hecht-md",
    headshot: {
      src: "/images/radiologists/elizabeth-m-hecht-md.png",
      alt: "Elizabeth Hecht, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "khentel",
    name: "Keith Hentel, M.D., M.S., FACR",
    profileUrl: "https://weillcornell.org/khentel",
    headshot: {
      src: "/images/radiologists/khentel.jpg",
      alt: "Keith Hentel, M.D., M.S., FACR",
    },
    specialties: ["Emergency Imaging", "Musculoskeletal Imaging"],
  },
  {
    id: "hmhochberg",
    name: "Hilary M. Hochberg Shohet, M.D.",
    profileUrl: "https://weillcornell.org/hmhochberg",
    headshot: {
      src: "/images/radiologists/hmhochberg.jpg",
      alt: "Hilary M. Hochberg Shohet, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "jana-ivanidze-md",
    name: "Jana Ivanidze, M.D., Ph.D.",
    profileUrl: "https://weillcornell.org/jana-ivanidze-md",
    headshot: {
      src: "/images/radiologists/jana-ivanidze-md.jpg",
      alt: "Jana Ivanidze, M.D., Ph.D.",
    },
    specialties: ["Neuroradiology", "Nuclear & Molecular Imaging"],
  },
  {
    id: "delma-jarrett-md",
    name: "Delma Jarrett, M.D.",
    profileUrl: "https://weillcornell.org/delma-jarrett-md",
    headshot: {
      src: "/images/radiologists/delma-jarrett-md.jpg",
      alt: "Delma Jarrett, M.D.",
    },
    specialties: ["Pediatric Imaging"],
  },
  {
    id: "brian-joo-md",
    name: "Brian Joo, M.D.",
    profileUrl: "https://weillcornell.org/brian-joo-md",
    headshot: {
      src: "/images/radiologists/brian-joo-md.jpg",
      alt: "Brian Joo, M.D.",
    },
    specialties: ["Abdominal Imaging", "Breast Imaging"],
  },
  {
    id: "angela-kanna-md",
    name: "Angela Kanna, M.D.",
    profileUrl: "https://weillcornell.org/angela-kanna-md",
    headshot: {
      src: "/images/radiologists/angela-kanna-md.jpg",
      alt: "Angela Kanna, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "jkatzen",
    name: "Janine Katzen, M.D.",
    profileUrl: "https://weillcornell.org/jkatzen",
    headshot: {
      src: "/images/radiologists/jkatzen.jpg",
      alt: "Janine Katzen, M.D.",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "j-jacob-kazam-md",
    name: "J. Jacob Kazam, M.D.",
    profileUrl: "https://weillcornell.org/j-jacob-kazam-md",
    headshot: {
      src: "/images/radiologists/j-jacob-kazam-md.jpg",
      alt: "J. Jacob Kazam, M.D.",
    },
    specialties: ["Musculoskeletal Imaging", "Emergency Imaging"],
  },
  {
    id: "askierans",
    name: "Andrea Siobhan Kierans, M.D.",
    profileUrl: "https://weillcornell.org/askierans",
    headshot: {
      src: "/images/radiologists/askierans.jpg",
      alt: "Andrea Siobhan Kierans, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "andrew-kim-md",
    name: "Andrew Kim, M.D.",
    profileUrl: "https://weillcornell.org/andrew-kim-md",
    headshot: {
      src: "/images/radiologists/andrew-kim-md.jpg",
      alt: "Andrew Kim, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "jiwonkim",
    name: "Jiwon Kim, M.D.",
    profileUrl: "https://weillcornell.org/jiwonkim",
    headshot: {
      src: "/images/radiologists/jiwonkim.jpg",
      alt: "Jiwon Kim, M.D.",
    },
    specialties: ["Cardiac Imaging"],
  },
  {
    id: "arzukovanlikaya",
    name: "Arzu Kovanlikaya, M.D.",
    profileUrl: "https://weillcornell.org/arzukovanlikaya",
    headshot: {
      src: "/images/radiologists/arzukovanlikaya.jpg",
      alt: "Arzu Kovanlikaya, M.D.",
    },
    specialties: ["Pediatric Imaging"],
  },
  {
    id: "andrew-scott-kuhn-md",
    name: "Andrew Scott Kuhn, M.D.",
    profileUrl: "https://weillcornell.org/andrew-scott-kuhn-md",
    headshot: {
      src: "/images/radiologists/andrew-scott-kuhn-md.jpg",
      alt: "Andrew Scott Kuhn, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "jlantos",
    name: "Joshua Lantos, M.D.",
    profileUrl: "https://weillcornell.org/jlantos",
    headshot: {
      src: "/images/radiologists/jlantos.jpg",
      alt: "Joshua Lantos, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "larry-latson-jr-md-ms",
    name: "Larry Latson, Jr., M.D., M.S.",
    profileUrl: "https://weillcornell.org/larry-latson-jr-md-ms",
    headshot: {
      src: "/images/radiologists/larry-latson-jr-md-ms.jpg",
      alt: "Larry Latson, Jr., M.D., M.S.",
    },
    specialties: ["Cardiac Imaging"],
  },
  {
    id: "olga-laur-md",
    name: "Olga Laur, M.D.",
    profileUrl: "https://weillcornell.org/olga-laur-md",
    headshot: {
      src: "/images/radiologists/olga-laur-md.jpg",
      alt: "Olga Laur, M.D.",
    },
    specialties: ["Musculoskeletal Imaging"],
  },
  {
    id: "erik-lawrence-md",
    name: "Erik Lawrence, M.D.",
    profileUrl: "https://weillcornell.org/erik-lawrence-md",
    headshot: {
      src: "/images/radiologists/placeholder.jpg",
      alt: "Erik Lawrence, M.D.",
    },
    specialties: ["Abdominal Imaging"],
    hasHeadshot: false,
  },
  {
    id: "mike-h-lee-md",
    name: "Mike H. Lee, M.D.",
    profileUrl: "https://weillcornell.org/mike-h-lee-md",
    headshot: {
      src: "/images/radiologists/placeholder.jpg",
      alt: "Mike H. Lee, M.D.",
    },
    specialties: ["Abdominal Imaging"],
    hasHeadshot: false,
  },
  {
    id: "kristen-leeman-md",
    name: "Kristen Leeman, M.D.",
    profileUrl: "https://weillcornell.org/kristen-leeman-md",
    headshot: {
      src: "/images/radiologists/kristen-leeman-md.jpg",
      alt: "Kristen Leeman, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "alegasto",
    name: "Alan C. Legasto, M.D.",
    profileUrl: "https://weillcornell.org/alegasto",
    headshot: {
      src: "/images/radiologists/alegasto.jpg",
      alt: "Alan C. Legasto, M.D.",
    },
    specialties: ["Chest Imaging", "Cardiac Imaging"],
  },
  {
    id: "alevy",
    name: "Allison D. Levy, M.D.",
    profileUrl: "https://weillcornell.org/alevy",
    headshot: {
      src: "/images/radiologists/alevy.jpg",
      alt: "Allison D. Levy, M.D.",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "elin",
    name: "Eaton Lin, M.D.",
    profileUrl: "https://weillcornell.org/elin",
    headshot: {
      src: "/images/radiologists/elin.jpg",
      alt: "Eaton Lin, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "grace-lo-md",
    name: "Grace Lo, M.D.",
    profileUrl: "https://weillcornell.org/grace-lo-md",
    headshot: {
      src: "/images/radiologists/grace-lo-md.jpg",
      alt: "Grace Lo, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "jacob-mandel-md",
    name: "Jacob Mandel, M.D.",
    profileUrl: "https://weillcornell.org/jacob-mandel-md",
    headshot: {
      src: "/images/radiologists/jacob-mandel-md.jpg",
      alt: "Jacob Mandel, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "rmarcus",
    name: "Rachel Marcus, M.D.",
    profileUrl: "https://weillcornell.org/rmarcus",
    headshot: {
      src: "/images/radiologists/rmarcus.jpg",
      alt: "Rachel Marcus, M.D.",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "daniel-margolis-md",
    name: "Daniel Margolis, M.D.",
    profileUrl: "https://weillcornell.org/daniel-margolis-md",
    headshot: {
      src: "/images/radiologists/daniel-margolis-md.jpg",
      alt: "Daniel Margolis, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "jason-matakas-md",
    name: "Jason Matakas, MD",
    profileUrl: "https://weillcornell.org/jason-matakas-md",
    headshot: {
      src: "/images/radiologists/jason-matakas-md.jpg",
      alt: "Jason Matakas, MD",
    },
    specialties: ["Musculoskeletal Imaging"],
  },
  {
    id: "fernanda-mazzariol-md",
    name: "Fernanda Mazzariol, M.D.",
    profileUrl: "https://weillcornell.org/fernanda-mazzariol-md",
    headshot: {
      src: "/images/radiologists/fernanda-mazzariol-md.png",
      alt: "Fernanda Mazzariol, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "gbmcginty",
    name: "Geraldine B. McGinty, M.D.",
    profileUrl: "https://weillcornell.org/gbmcginty",
    headshot: {
      src: "/images/radiologists/gbmcginty.jpg",
      alt: "Geraldine B. McGinty, M.D.",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "eralda-mema-md",
    name: "Eralda Mema, M.D.",
    profileUrl: "https://weillcornell.org/eralda-mema-md",
    headshot: {
      src: "/images/radiologists/eralda-mema-md.jpg",
      alt: "Eralda Mema, M.D.",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "rjmin",
    name: "Robert J. Min, M.D.",
    profileUrl: "https://weillcornell.org/rjmin",
    headshot: {
      src: "/images/radiologists/rjmin.jpg",
      alt: "Robert J. Min, M.D.",
    },
    specialties: ["Chair"],
  },
  {
    id: "shlomo-minkowitz-md",
    name: "Shlomo Minkowitz, M.D.",
    profileUrl: "https://weillcornell.org/shlomo-minkowitz-md",
    headshot: {
      src: "/images/radiologists/shlomo-minkowitz-md.jpg",
      alt: "Shlomo Minkowitz, M.D.",
    },
    specialties: ["Emergency Imaging", "Musculoskeletal Imaging", "Neuroradiology"],
  },
  {
    id: "laura-naccarato-md",
    name: "Laura Naccarato, M.D.",
    profileUrl: "https://weillcornell.org/laura-naccarato-md",
    headshot: {
      src: "/images/radiologists/placeholder.jpg",
      alt: "Laura Naccarato, M.D.",
    },
    specialties: ["Cardiac Imaging", "Chest Imaging", "Musculoskeletal Imaging"],
    hasHeadshot: false,
  },
  {
    id: "alexis-virginia-nees-md",
    name: "Alexis Virginia Nees, M.D.",
    profileUrl: "https://weillcornell.org/alexis-virginia-nees-md",
    headshot: {
      src: "/images/radiologists/alexis-virginia-nees-md.jpg",
      alt: "Alexis Virginia Nees, M.D.",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "sarah-oh-md",
    name: "Sarah Oh, M.D.",
    profileUrl: "https://weillcornell.org/sarah-oh-md",
    headshot: {
      src: "/images/radiologists/sarah-oh-md.jpg",
      alt: "Sarah Oh, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "joseph-r-osborne-md-phd",
    name: "Joseph R. Osborne, M.D., Ph.D., FACR",
    profileUrl: "https://weillcornell.org/joseph-r-osborne-md-phd",
    headshot: {
      src: "/images/radiologists/joseph-r-osborne-md-phd.jpg",
      alt: "Joseph R. Osborne, M.D., Ph.D., FACR",
    },
    specialties: ["Nuclear & Molecular Imaging"],
  },
  {
    id: "elisabeth-o-dwyer-mbbch",
    name: "Elisabeth O\u2019Dwyer, MBBCH",
    profileUrl: "https://weillcornell.org/elisabeth-o-dwyer-mbbch",
    headshot: {
      src: "/images/radiologists/elisabeth-o-dwyer-mbbch.jpg",
      alt: "Elisabeth O\u2019Dwyer, MBBCH",
    },
    specialties: ["Abdominal Imaging", "Nuclear & Molecular Imaging"],
  },
  {
    id: "jessica-l-patel-md",
    name: "Jessica L. Patel, M.D.",
    profileUrl: "https://weillcornell.org/jessica-l-patel-md",
    headshot: {
      src: "/images/radiologists/jessica-l-patel-md.jpg",
      alt: "Jessica L. Patel, M.D.",
    },
    specialties: ["Abdominal Imaging", "Cardiac Imaging", "Chest Imaging"],
  },
  {
    id: "alexander-phan-md",
    name: "Alexander Phan, M.D.",
    profileUrl: "https://weillcornell.org/alexander-phan-md",
    headshot: {
      src: "/images/radiologists/alexander-phan-md.jpg",
      alt: "Alexander Phan, M.D.",
    },
    specialties: ["Cardiac Imaging", "Chest Imaging"],
  },
  {
    id: "cdouglasphillips",
    name: "C. Douglas Phillips, M.D., FACR",
    profileUrl: "https://weillcornell.org/cdouglasphillips",
    headshot: {
      src: "/images/radiologists/cdouglasphillips.jpg",
      alt: "C. Douglas Phillips, M.D., FACR",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "christy-pomeranz-md",
    name: "Christy Pomeranz, M.D.",
    profileUrl: "https://weillcornell.org/christy-pomeranz-md",
    headshot: {
      src: "/images/radiologists/christy-pomeranz-md.png",
      alt: "Christy Pomeranz, M.D.",
    },
    specialties: ["Pediatric Imaging"],
  },
  {
    id: "mrprince",
    name: "Martin R. Prince, M.D., Ph.D.",
    profileUrl: "https://weillcornell.org/mrprince",
    headshot: {
      src: "/images/radiologists/mrprince.jpg",
      alt: "Martin R. Prince, M.D., Ph.D.",
    },
    specialties: ["Abdominal Imaging", "Cardiac Imaging"],
  },
  {
    id: "bpua",
    name: "Bradley B. Pua, M.D.",
    profileUrl: "https://weillcornell.org/bpua",
    headshot: {
      src: "/images/radiologists/bpua.jpg",
      alt: "Bradley B. Pua, M.D.",
    },
    specialties: ["Lung Cancer Screening", "Chest Imaging"],
  },
  {
    id: "mreichman",
    name: "Melissa B. Reichman, M.D.",
    profileUrl: "https://weillcornell.org/mreichman",
    headshot: {
      src: "/images/radiologists/mreichman.jpg",
      alt: "Melissa B. Reichman, M.D.",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "andrew-renaldo-md",
    name: "Andrew Renaldo, M.D.",
    profileUrl: "https://weillcornell.org/andrew-renaldo-md",
    headshot: {
      src: "/images/radiologists/andrew-renaldo-md.jpg",
      alt: "Andrew Renaldo, M.D.",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "michelle-roytman-md",
    name: "Michelle Roytman, M.D.",
    profileUrl: "https://weillcornell.org/michelle-roytman-md",
    headshot: {
      src: "/images/radiologists/michelle-roytman-md.jpg",
      alt: "Michelle Roytman, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "gayle-salama-md",
    name: "Gayle Rudofsky Salama, M.D.",
    profileUrl: "https://weillcornell.org/gayle-salama-md",
    headshot: {
      src: "/images/radiologists/gayle-salama-md.jpg",
      alt: "Gayle Rudofsky Salama, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "rwschloss",
    name: "Robert William Schloss, M.D.",
    profileUrl: "https://weillcornell.org/rwschloss",
    headshot: {
      src: "/images/radiologists/rwschloss.jpg",
      alt: "Robert William Schloss, M.D.",
    },
    specialties: ["Emergency Imaging"],
  },
  {
    id: "alison-schonberger-md",
    name: "Alison Schonberger, M.D.",
    profileUrl: "https://weillcornell.org/alison-schonberger-md",
    headshot: {
      src: "/images/radiologists/alison-schonberger-md.jpg",
      alt: "Alison Schonberger, M.D.",
    },
    specialties: ["Musculoskeletal Imaging"],
  },
  {
    id: "aschweitzer",
    name: "Andrew D. Schweitzer, M.D.",
    profileUrl: "https://weillcornell.org/aschweitzer",
    headshot: {
      src: "/images/radiologists/aschweitzer.jpg",
      alt: "Andrew D. Schweitzer, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "nakul-sheth-md",
    name: "Nakul Sheth, M.D.",
    profileUrl: "https://weillcornell.org/nakul-sheth-md",
    headshot: {
      src: "/images/radiologists/nakul-sheth-md.jpg",
      alt: "Nakul Sheth, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "gshih",
    name: "George Shih, M.D., FACR",
    profileUrl: "https://weillcornell.org/gshih",
    headshot: {
      src: "/images/radiologists/gshih.jpg",
      alt: "George Shih, M.D., FACR",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "adam-siegel-md",
    name: "Adam Siegel, M.D.",
    profileUrl: "https://weillcornell.org/adam-siegel-md",
    headshot: {
      src: "/images/radiologists/adam-siegel-md.jpg",
      alt: "Adam Siegel, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "katherine-simon-md",
    name: "Katherine Simon, M.D.",
    profileUrl: "https://weillcornell.org/katherine-simon-md",
    headshot: {
      src: "/images/radiologists/katherine-simon-md.jpg",
      alt: "Katherine Simon, M.D.",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "anna-starikov-md",
    name: "Anna Starikov, M.D.",
    profileUrl: "https://weillcornell.org/anna-starikov-md",
    headshot: {
      src: "/images/radiologists/anna-starikov-md.jpg",
      alt: "Anna Starikov, M.D.",
    },
    specialties: ["Breast Imaging"],
  },
  {
    id: "sharon-roszler-md",
    name: "Sharon Roszler Steinberger, M.D.",
    profileUrl: "https://weillcornell.org/sharon-roszler-md",
    headshot: {
      src: "/images/radiologists/sharon-roszler-md.jpg",
      alt: "Sharon Roszler Steinberger, M.D.",
    },
    specialties: ["Cardiac Imaging", "Chest Imaging"],
  },
  {
    id: "travis-stradford-md",
    name: "Travis Stradford, M.D.",
    profileUrl: "https://weillcornell.org/travis-stradford-md",
    headshot: {
      src: "/images/radiologists/travis-stradford-md.jpg",
      alt: "Travis Stradford, M.D.",
    },
    specialties: ["Emergency Imaging", "Neuroradiology"],
  },
  {
    id: "sara-strauss-md",
    name: "Sara Strauss, M.D.",
    profileUrl: "https://weillcornell.org/sara-strauss-md",
    headshot: {
      src: "/images/radiologists/sara-strauss-md.jpg",
      alt: "Sara Strauss, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "csy",
    name: "Calvin Sy, M.D.",
    profileUrl: "https://weillcornell.org/csy",
    headshot: {
      src: "/images/radiologists/csy.jpg",
      alt: "Calvin Sy, M.D.",
    },
    specialties: ["Emergency Imaging"],
  },
  {
    id: "rntroiano",
    name: "Robert Nicholas Troiano, M.D.",
    profileUrl: "https://weillcornell.org/rntroiano",
    headshot: {
      src: "/images/radiologists/rntroiano.jpg",
      alt: "Robert Nicholas Troiano, M.D.",
    },
    specialties: ["Breast Imaging", "Abdominal Imaging"],
  },
  {
    id: "qatruong",
    name: "Quynh A. Truong, M.D., M.P.H",
    profileUrl: "https://weillcornell.org/qatruong",
    headshot: {
      src: "/images/radiologists/qatruong.jpg",
      alt: "Quynh A. Truong, M.D., M.P.H",
    },
    specialties: ["Cardiac Imaging"],
  },
  {
    id: "amar-vora-md",
    name: "Amar Vora, M.D.",
    profileUrl: "https://weillcornell.org/amar-vora-md",
    headshot: {
      src: "/images/radiologists/amar-vora-md.jpg",
      alt: "Amar Vora, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "rebecca-wax-md",
    name: "Rebecca Wax, M.D.",
    profileUrl: "https://weillcornell.org/rebecca-wax-md",
    headshot: {
      src: "/images/radiologists/rebecca-wax-md.jpg",
      alt: "Rebecca Wax, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "nwehrli",
    name: "Natasha Wehrli, M.D.",
    profileUrl: "https://weillcornell.org/nwehrli",
    headshot: {
      src: "/images/radiologists/nwehrli.jpg",
      alt: "Natasha Wehrli, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "elizabeth-weidman-md",
    name: "Elizabeth Weidman, M.D.",
    profileUrl: "https://weillcornell.org/elizabeth-weidman-md",
    headshot: {
      src: "/images/radiologists/elizabeth-weidman-md.jpg",
      alt: "Elizabeth Weidman, M.D.",
    },
    specialties: ["Neuroradiology"],
  },
  {
    id: "jweinsaft",
    name: "Jonathan W. Weinsaft, M.D.",
    profileUrl: "https://weillcornell.org/jweinsaft",
    headshot: {
      src: "/images/radiologists/jweinsaft.jpg",
      alt: "Jonathan W. Weinsaft, M.D.",
    },
    specialties: ["Cardiac Imaging"],
  },
  {
    id: "helen-xumd-md",
    name: "Helen Xu, M.D.",
    profileUrl: "https://weillcornell.org/helen-xumd-md",
    headshot: {
      src: "/images/radiologists/helen-xumd-md.jpg",
      alt: "Helen Xu, M.D.",
    },
    specialties: ["Abdominal Imaging"],
  },
  {
    id: "syhu",
    name: "Stephen Yhu, M.D.",
    profileUrl: "https://weillcornell.org/syhu",
    headshot: {
      src: "/images/radiologists/syhu.jpg",
      alt: "Stephen Yhu, M.D.",
    },
    specialties: ["Emergency Imaging"],
  },
  {
    id: "robert-s-zhang-md",
    name: "Robert S. Zhang, M.D.",
    profileUrl: "https://weillcornell.org/robert-s-zhang-md",
    headshot: {
      src: "/images/radiologists/robert-s-zhang-md.jpg",
      alt: "Robert S. Zhang, M.D.",
    },
    specialties: ["Cardiac Imaging"],
  },
];
