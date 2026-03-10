
export interface Case {
  id: string;
  season: number;
  episode: string;
  patient: string;
  diagnosis: string;
  description?: string;
  verified?: boolean;
}

export const cases: Case[] = [
  // Season 1
  { id: "s1e1", season: 1, episode: "Pilot", patient: "Rebecca Adler", diagnosis: "Neurocysticercosis", verified: true },
  { id: "s1e2", season: 1, episode: "Paternity", patient: "Dan", diagnosis: "Subacute sclerosing panencephalitis", verified: true },
  { id: "s1e3", season: 1, episode: "Occam's Razor", patient: "Brandon Merrell", diagnosis: "Colchicine poisoning", verified: true },
  { id: "s1e4", season: 1, episode: "Maternity", patient: "Baby Girl Hartig", diagnosis: "Echovirus 11", verified: true },
  { id: "s1e5", season: 1, episode: "Damned If You Do", patient: "Augustine", diagnosis: "Copper allergy", verified: true },
  { id: "s1e6", season: 1, episode: "The Socratic Method", patient: "Lucy Palmeiro", diagnosis: "Vitamin K deficiency & Wilson's disease", verified: true },
  { id: "s1e7", season: 1, episode: "Fidelity", patient: "Elise Snow", diagnosis: "African trypanosomiasis", verified: true },
  { id: "s1e8", season: 1, episode: "Poison", patient: "Matt Davis", diagnosis: "Organophosphate poisoning", verified: true },
  { id: "s1e9", season: 1, episode: "DNR", patient: "John Henry Giles", diagnosis: "Arteriovenous malformation", verified: true },
  { id: "s1e10", season: 1, episode: "Histories", patient: "Victoria Madsen", diagnosis: "Rabies", verified: true },

  // Season 2
  { id: "s2e1", season: 2, episode: "Acceptance", patient: "Clarence", diagnosis: "Pheochromocytoma", verified: true },
  { id: "s2e2", season: 2, episode: "Autopsy", patient: "Andie", diagnosis: "Brain tumor (Cancerous adenoma)", verified: true },
  { id: "s2e3", season: 2, episode: "Humpty Dumpty", patient: "Alfredo", diagnosis: "Psittacosis", verified: true },
  { id: "s2e4", season: 2, episode: "TB or Not TB", patient: "Sebastian Charles", diagnosis: "Nesidioblastoma", verified: true },
  { id: "s2e5", season: 2, episode: "Daddy's Boy", patient: "Carnell Hall", diagnosis: "Radiation sickness", verified: true },
  { id: "s2e6", season: 2, episode: "Spin", patient: "Jeff Forrester", diagnosis: "Myasthenia gravis & Thymoma", verified: true },
  { id: "s2e7", season: 2, episode: "Hunting", patient: "Kalvin Ryan", diagnosis: "Echinococcosis", verified: true },
  { id: "s2e8", season: 2, episode: "The Mistake", patient: "Kayla McGinley", diagnosis: "Behcet's disease", verified: true },
  { id: "s2e9", season: 2, episode: "Deception", patient: "Anica Jovanovich", diagnosis: "Clostridium perfringens & Münchausen syndrome", verified: true },
  { id: "s2e10", season: 2, episode: "Failure to Communicate", patient: "Fletcher Stone", diagnosis: "Malaria", verified: true },

  // Season 3
  { id: "s3e1", season: 3, episode: "Meaning", patient: "Richard McNeil", diagnosis: "Addison's Disease", verified: true },
  { id: "s3e2", season: 3, episode: "Cane & Able", patient: "Clancy Green", diagnosis: "Chimerism", verified: true },
  { id: "s3e3", season: 3, episode: "Informed Consent", patient: "Ezra Powell", diagnosis: "Amyloidosis", verified: true },
  { id: "s3e4", season: 3, episode: "Lines in the Sand", patient: "Adam Kelvey", diagnosis: "Baylisascaris", verified: true },
  { id: "s3e5", season: 3, episode: "Fools for Love", patient: "Tracy", diagnosis: "Hereditary Angioedema", verified: true },
  { id: "s3e6", season: 3, episode: "Que Será Será", patient: "George", diagnosis: "Small-cell carcinoma", verified: true },
  { id: "s3e7", season: 3, episode: "Son of Coma Guy", patient: "Kyle Wozniak", diagnosis: "MERRF syndrome", verified: true },
  { id: "s3e8", season: 3, episode: "Whac-A-Mole", patient: "Jack Walters", diagnosis: "Chronic granulomatous disease", verified: true },
  { id: "s3e9", season: 3, episode: "Finding Judas", patient: "Alice Hartman", diagnosis: "Erythropoietic protoporphyria", verified: true },
  { id: "s3e10", season: 3, episode: "Merry Little Christmas", patient: "Abigail Ralphean", diagnosis: "Langerhans cell histiocytosis", verified: true },
  { id: "s3e14", season: 3, episode: "Insensitive", patient: "Hannah Morganthal", diagnosis: "CIPA", verified: true },

  // Season 4
  { id: "s4e1", season: 4, episode: "Alone", patient: "Liz Masters", diagnosis: "Medicine interaction (delirium tremens)", verified: true },
  { id: "s4e2", season: 4, episode: "The Right Stuff", patient: "Greta Cooper", diagnosis: "Von Hippel-Lindau syndrome", verified: true },
  { id: "s4e3", season: 4, episode: "97 Seconds", patient: "Thomas Stark", diagnosis: "Strongyloides", verified: true },
  { id: "s4e4", season: 4, episode: "Guardian Angels", patient: "Irene", diagnosis: "Ergot poisoning", verified: true },
  { id: "s4e5", season: 4, episode: "Mirror Mirror", patient: "Robert Elliot", diagnosis: "Eperythrozoon", verified: true },
  { id: "s4e6", season: 4, episode: "Whatever It Takes", patient: "Casey Alfonso", diagnosis: "Heat stroke & Thallium poisoning", verified: true },
  { id: "s4e7", season: 4, episode: "Ugly", patient: "Kenny", diagnosis: "Lyme disease", verified: true },
  { id: "s4e8", season: 4, episode: "You Don't Want to Know", patient: "Flynn", diagnosis: "Lupus", verified: true },
  { id: "s4e9", season: 4, episode: "Games", patient: "Jimmy Quidd", diagnosis: "Measles", verified: true },
  { id: "s4e10", season: 4, episode: "It's a Wonderful Lie", patient: "Maggie", diagnosis: "Breast Cancer", verified: true },

  // Season 5
  { id: "s5e1", season: 5, episode: "Dying Changes Everything", patient: "Lou", diagnosis: "Leprosy", verified: true },
  { id: "s5e2", season: 5, episode: "Not Cancer", patient: "Apple", diagnosis: "Cancerous stem cells", verified: true },
  { id: "s5e3", season: 5, episode: "Adverse Events", patient: "Brandon", diagnosis: "Food Boli Bezoar", verified: true },
  { id: "s5e4", season: 5, episode: "Birthmarks", patient: "Nicole", diagnosis: "Iron pin in brain", verified: true },
  { id: "s5e5", season: 5, episode: "Lucky Thirteen", patient: "Spencer", diagnosis: "Sjögren's syndrome", verified: true },
  { id: "s5e6", season: 5, episode: "Joy", patient: "Jerry Harmon", diagnosis: "Familial Mediterranean fever", verified: true },
  { id: "s5e7", season: 5, episode: "The Itch", patient: "Stewart Nozick", diagnosis: "Lead poisoning", verified: true },
  { id: "s5e8", season: 5, episode: "Emancipation", patient: "Sophia Isabel Velez", diagnosis: "Acute promyelocytic leukemia", verified: true },
  { id: "s5e9", season: 5, episode: "Last Resort", patient: "Jason", diagnosis: "Melioidosis", verified: true },
  { id: "s5e10", season: 5, episode: "Let Them Eat Cake", patient: "Emmy", diagnosis: "Hereditary coproporphyria", verified: true },

  // Season 6
  { id: "s6e1", season: 6, episode: "Epic Fail", patient: "Vince Pearson", diagnosis: "Fabry disease", verified: true },
  { id: "s6e2", season: 6, episode: "The Tyrant", patient: "President Dibala", diagnosis: "Blastomycosis", verified: true },
  { id: "s6e3", season: 6, episode: "Instant Karma", patient: "Jack Randall", diagnosis: "Antiphospholipid syndrome", verified: true },
  { id: "s6e4", season: 6, episode: "Brave Heart", patient: "Donny Compson", diagnosis: "Brain stem aneurysm", verified: true },
  { id: "s6e5", season: 6, episode: "Known Unknowns", patient: "Jordan", diagnosis: "Vibrio vulnificus & Hemochromatosis", verified: true },
  { id: "s6e6", season: 6, episode: "Teamwork", patient: "Hank Hardwick", diagnosis: "Crohn's disease", verified: true },
  { id: "s6e7", season: 6, episode: "Ignorance is Bliss", patient: "James Sidas", diagnosis: "Thrombotic thrombocytopenic purpura", verified: true },
  { id: "s6e8", season: 6, episode: "Wilson", patient: "Tucker", diagnosis: "Leukemia", verified: true },
  { id: "s6e9", season: 6, episode: "The Down Low", patient: "Mickey", diagnosis: "Hughes-Stovin syndrome", verified: true },
  { id: "s6e10", season: 6, episode: "Remorse", patient: "Valerie", diagnosis: "Wilson's disease", verified: true },

  // Season 7
  { id: "s7e1", season: 7, episode: "Now What?", patient: "Richardson", diagnosis: "Food poisoning", verified: true },
  { id: "s7e2", season: 7, episode: "Selfish", patient: "Della", diagnosis: "Sickle cell trait", verified: true },
  { id: "s7e3", season: 7, episode: "Unwritten", patient: "Alice Tanner", diagnosis: "Syringomyelia", verified: true },
  { id: "s7e4", season: 7, episode: "Massage Therapy", patient: "Margaret McPherson", diagnosis: "Risperidone toxicity", verified: true },
  { id: "s7e5", season: 7, episode: "Unplanned Parenthood", patient: "Abbey", diagnosis: "Pulmonary embolism", verified: true },
  { id: "s7e6", season: 7, episode: "Office Politics", patient: "Joe Dugan", diagnosis: "Hepatitis C", verified: true },
  { id: "s7e7", season: 7, episode: "A Pox on Our House", patient: "Julie", diagnosis: "Rickettsialpox", verified: true },
  { id: "s7e8", season: 7, episode: "Small Sacrifices", patient: "Ramon Silva", diagnosis: "Multiple sclerosis & Malnutrition", verified: true },
  { id: "s7e9", season: 7, episode: "Larger than Life", patient: "Jack", diagnosis: "Varicella", verified: true },
  { id: "s7e10", season: 7, episode: "Carrot or Stick", patient: "Landon Parks", diagnosis: "Variegate porphyria", verified: true },

  // Season 8
  { id: "s8e1", season: 8, episode: "Twenty Vicodin", patient: "Nick", diagnosis: "Mastocytosis", verified: true },
  { id: "s8e2", season: 8, episode: "Transplant", patient: "Stevie Weathers", diagnosis: "Eosinophilic pneumonitis", verified: true },
  { id: "s8e3", season: 8, episode: "Charity Case", patient: "Benjamin Byrd", diagnosis: "Plummer's disease", verified: true },
  { id: "s8e4", season: 8, episode: "Risky Business", patient: "Thad Barton", diagnosis: "Rheumatoid arthritis", verified: true },
];

export const topInterestingCases = [
  cases[0], // Pilot
  cases[20], // Meaning
  cases[38], // You Don't Want to Know (Lupus)
  cases[51], // Epic Fail
  cases[67], // A Pox on Our House
];
