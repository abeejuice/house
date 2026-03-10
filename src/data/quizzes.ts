
export interface QuizOption {
  text: string;
  type: 'correct' | 'distractor' | 'misconception' | 'wrong';
  explanation: string;
}

export interface QuizQuestion {
  question: string;
  bloomLevel: string;
  options: QuizOption[];
}

export const staticQuizzes: Record<string, QuizQuestion[]> = {
  "s1e1": [ // Neurocysticercosis
    {
      question: "What is the primary route of infection for Neurocysticercosis in humans?",
      bloomLevel: "Recall",
      options: [
        { text: "Ingestion of Taenia solium eggs via fecal-oral route", type: "correct", explanation: "Cysticercosis is caused by ingesting eggs shed in the feces of a human tapeworm carrier." },
        { text: "Ingestion of undercooked pork containing cysticerci", type: "distractor", explanation: "This causes intestinal taeniasis (the tapeworm), not cysticercosis (the tissue infection)." },
        { text: "Direct contact with infected pigs in a farm setting", type: "misconception", explanation: "While pigs are part of the cycle, the infection comes from human feces containing eggs." },
        { text: "Inhalation of fungal spores from contaminated soil", type: "wrong", explanation: "This is a parasitic infection, not a fungal one." }
      ]
    },
    {
      question: "Why are corticosteroids typically administered alongside antiparasitic drugs in Neurocysticercosis?",
      bloomLevel: "Understanding",
      options: [
        { text: "To mitigate the inflammatory response triggered by dying larvae", type: "correct", explanation: "The death of the parasite releases antigens that cause significant brain swelling." },
        { text: "To directly kill the parasites by disrupting their cell membranes", type: "distractor", explanation: "Steroids are anti-inflammatory, not antiparasitic." },
        { text: "To prevent the patient from developing a drug allergy", type: "misconception", explanation: "The concern is the localized brain inflammation, not a systemic allergy." },
        { text: "To increase the permeability of the blood-brain barrier", type: "wrong", explanation: "Steroids actually help stabilize and decrease barrier permeability." }
      ]
    },
    {
      question: "A patient presents with a single calcified lesion on CT and a history of one seizure. What is the most appropriate next step?",
      bloomLevel: "Application",
      options: [
        { text: "Antiepileptic therapy and clinical observation", type: "correct", explanation: "Calcified lesions represent dead parasites; antiparasitic drugs are not effective or needed." },
        { text: "Immediate neurosurgical resection of the lesion", type: "distractor", explanation: "Surgery is rarely indicated for simple parenchymal calcifications." },
        { text: "High-dose Praziquantel to ensure the lesion is destroyed", type: "misconception", explanation: "Praziquantel only works on viable cysts, not calcified remains." },
        { text: "Broad-spectrum antifungal therapy", type: "wrong", explanation: "This is a parasitic disease, not fungal." }
      ]
    },
    {
      question: "On an MRI, a 'hole with a dot' appearance is noted within a cystic lesion. What does the 'dot' represent?",
      bloomLevel: "Analysis",
      options: [
        { text: "The scolex (head) of the parasite", type: "correct", explanation: "The presence of the scolex is pathognomonic for cysticercosis." },
        { text: "A localized area of micro-hemorrhage", type: "distractor", explanation: "Hemorrhage would appear differently on various MRI sequences." },
        { text: "A calcified blood vessel within the cyst", type: "misconception", explanation: "The dot is the parasite's head, not a vessel." },
        { text: "A pocket of air trapped in the neural tissue", type: "wrong", explanation: "Air (pneumocephalus) has a distinct signal void on MRI." }
      ]
    },
    {
      question: "Why might a patient who strictly avoids pork still be diagnosed with Neurocysticercosis?",
      bloomLevel: "Intuition",
      options: [
        { text: "They ingested eggs from a human carrier, not the meat itself", type: "correct", explanation: "You get cysticercosis from people, not directly from eating pork." },
        { text: "The parasite can be transmitted through undercooked beef", type: "distractor", explanation: "Taenia saginata (beef tapeworm) does not typically cause cysticercosis in humans." },
        { text: "The parasite can be absorbed through the skin while walking barefoot", type: "misconception", explanation: "This describes hookworms, not Taenia solium." },
        { text: "It is a hereditary condition triggered by dietary stress", type: "wrong", explanation: "It is strictly an acquired infectious disease." }
      ]
    }
  ],
  "s3e1": [ // Addison's Disease
    {
      question: "Which electrolyte pattern is most characteristic of primary adrenal insufficiency (Addison's)?",
      bloomLevel: "Recall",
      options: [
        { text: "Hyponatremia and Hyperkalemia", type: "correct", explanation: "Lack of aldosterone leads to sodium wasting and potassium retention." },
        { text: "Hypernatremia and Hypokalemia", type: "distractor", explanation: "This is seen in Conn's syndrome (hyperaldosteronism)." },
        { text: "Hypercalcemia and Hypermagnesemia", type: "misconception", explanation: "While calcium can rise slightly, Na/K changes are the hallmark." },
        { text: "Elevated blood glucose levels", type: "wrong", explanation: "Addison's usually causes hypoglycemia due to lack of cortisol." }
      ]
    },
    {
      question: "What is the physiological mechanism behind the skin hyperpigmentation in Addison's disease?",
      bloomLevel: "Understanding",
      options: [
        { text: "Excess ACTH production shares a precursor with Melanocyte-Stimulating Hormone (MSH)", type: "correct", explanation: "POMC is the precursor for both ACTH and MSH." },
        { text: "The failing adrenal glands release a dark pigment into the blood", type: "distractor", explanation: "The glands are atrophic and not producing pigment." },
        { text: "Chronic dehydration causes the skin to thin and darken", type: "misconception", explanation: "Hyperpigmentation is a hormonal effect, not a hydration one." },
        { text: "It is a side effect of the body's attempt to produce more adrenaline", type: "wrong", explanation: "Adrenaline (epinephrine) does not cause skin darkening." }
      ]
    },
    {
      question: "A patient in suspected 'Adrenal Crisis' presents with hypotension. What is the immediate treatment priority?",
      bloomLevel: "Application",
      options: [
        { text: "Aggressive IV fluid resuscitation and IV Hydrocortisone", type: "correct", explanation: "Volume and glucocorticoid replacement are life-saving." },
        { text: "Oral Fludrocortisone and potassium supplements", type: "distractor", explanation: "Oral meds are too slow; potassium is already high in Addison's." },
        { text: "Immediate insulin injection to manage blood sugar", type: "misconception", explanation: "Patients are usually hypoglycemic; insulin would be dangerous." },
        { text: "Cold water immersion to reduce core temperature", type: "wrong", explanation: "Crisis often involves fever, but cooling isn't the priority over steroids." }
      ]
    },
    {
      question: "A morning cortisol test is low. An ACTH stimulation test is performed, and cortisol remains low. What does this confirm?",
      bloomLevel: "Analysis",
      options: [
        { text: "Primary Adrenal Insufficiency", type: "correct", explanation: "The gland failed to respond to the stimulating hormone." },
        { text: "Secondary Adrenal Insufficiency", type: "distractor", explanation: "In secondary, the gland would eventually respond to ACTH." },
        { text: "Cushing's Syndrome", type: "misconception", explanation: "Cushing's is excess cortisol, not deficiency." },
        { text: "The test was performed too early in the day", type: "wrong", explanation: "Morning is actually the best time for cortisol testing." }
      ]
    },
    {
      question: "Why is Addison's disease often missed in its early stages?",
      bloomLevel: "Intuition",
      options: [
        { text: "Symptoms like fatigue and weight loss are non-specific", type: "correct", explanation: "It mimics many common, less serious conditions." },
        { text: "It only affects patients with rare genetic backgrounds", type: "distractor", explanation: "It can be autoimmune or infectious (TB) and affect anyone." },
        { text: "The body compensates by using thyroid hormones instead", type: "misconception", explanation: "Thyroid hormones cannot replace glucocorticoid functions." },
        { text: "It only manifests during periods of extreme physical exercise", type: "wrong", explanation: "It is a chronic deficiency that exists at rest too." }
      ]
    }
  ],
  "s6e1": [ // Fabry Disease
    {
      question: "Fabry disease is caused by a deficiency in which enzyme?",
      bloomLevel: "Recall",
      options: [
        { text: "Alpha-galactosidase A", type: "correct", explanation: "This leads to the accumulation of Gb3 in various tissues." },
        { text: "Glucocerebrosidase", type: "distractor", explanation: "This is deficient in Gaucher disease." },
        { text: "Hexosaminidase A", type: "misconception", explanation: "This is deficient in Tay-Sachs disease." },
        { text: "Phenylalanine hydroxylase", type: "wrong", explanation: "This is deficient in PKU." }
      ]
    },
    {
      question: "What is the primary inheritance pattern of Fabry disease?",
      bloomLevel: "Understanding",
      options: [
        { text: "X-linked recessive", type: "correct", explanation: "The gene is on the X chromosome, primarily affecting males." },
        { text: "Autosomal dominant", type: "distractor", explanation: "It is not autosomal; it's linked to the sex chromosomes." },
        { text: "Mitochondrial inheritance", type: "misconception", explanation: "It is a nuclear gene, not mitochondrial." },
        { text: "Autosomal recessive", type: "wrong", explanation: "While many storage diseases are AR, Fabry is X-linked." }
      ]
    },
    {
      question: "A young boy presents with burning pain in his hands and feet (acroparesthesia) triggered by heat. What is the most likely diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "Fabry Disease", type: "correct", explanation: "Acroparesthesia and hypohidrosis are classic early signs." },
        { text: "Juvenile Rheumatoid Arthritis", type: "distractor", explanation: "JRA usually involves joint swelling, not just neuropathic pain." },
        { text: "Growing Pains", type: "misconception", explanation: "Growing pains don't typically cause burning neuropathic sensations." },
        { text: "Type 1 Diabetes Mellitus", type: "wrong", explanation: "Neuropathy in diabetes takes years to develop." }
      ]
    },
    {
      question: "Which skin finding is a hallmark of Fabry disease?",
      bloomLevel: "Analysis",
      options: [
        { text: "Angiokeratomas (small, dark red spots)", type: "correct", explanation: "These are often found in the 'bathing suit' area." },
        { text: "Butterfly rash on the face", type: "distractor", explanation: "This is characteristic of Lupus." },
        { text: "Cafe-au-lait spots", type: "misconception", explanation: "These are associated with Neurofibromatosis." },
        { text: "Target lesions", type: "wrong", explanation: "These are seen in Erythema Multiforme." }
      ]
    },
    {
      question: "Why might a Fabry patient stop sweating (hypohidrosis)?",
      bloomLevel: "Intuition",
      options: [
        { text: "Gb3 deposits damage the sweat glands and nerves", type: "correct", explanation: "Accumulation of lipids disrupts cellular function." },
        { text: "The body is trying to conserve water for the kidneys", type: "distractor", explanation: "It's a structural failure, not a conservation mechanism." },
        { text: "They have developed an allergy to their own sweat", type: "misconception", explanation: "This is not a known feature of Fabry." },
        { text: "The brain's temperature control center is destroyed", type: "wrong", explanation: "The damage is peripheral, at the gland level." }
      ]
    }
  ],
  "s7e7": [ // Rickettsialpox
    {
      question: "What is the primary vector for Rickettsialpox?",
      bloomLevel: "Recall",
      options: [
        { text: "The house mouse mite (Liponyssoides sanguineus)", type: "correct", explanation: "It is transmitted from mice to humans via mites." },
        { text: "The Ixodes tick", type: "distractor", explanation: "Ticks transmit Lyme disease and Rocky Mountain Spotted Fever." },
        { text: "The Anopheles mosquito", type: "misconception", explanation: "Mosquitoes transmit malaria, not rickettsia." },
        { text: "Contaminated water sources", type: "wrong", explanation: "This is a vector-borne disease, not water-borne." }
      ]
    },
    {
      question: "What is the characteristic skin finding at the site of the mite bite in Rickettsialpox?",
      bloomLevel: "Understanding",
      options: [
        { text: "A firm, black eschar (scab)", type: "correct", explanation: "The eschar forms before the systemic rash appears." },
        { text: "A circular 'bullseye' rash", type: "distractor", explanation: "This is Erythema Migrans, seen in Lyme disease." },
        { text: "Multiple fluid-filled blisters", type: "misconception", explanation: "Blisters come later in the generalized rash, not the bite site." },
        { text: "A painless white ulcer", type: "wrong", explanation: "The eschar is typically dark and crusty." }
      ]
    },
    {
      question: "A patient in an urban apartment complex presents with fever and a rash that looks like chickenpox. What is a key differentiator for Rickettsialpox?",
      bloomLevel: "Application",
      options: [
        { text: "The presence of an initial eschar and urban mouse exposure", type: "correct", explanation: "Chickenpox doesn't have an eschar." },
        { text: "The rash only appears on the palms and soles", type: "distractor", explanation: "This would suggest Syphilis or RMSF." },
        { text: "The patient has a history of recent travel to a farm", type: "misconception", explanation: "Rickettsialpox is specifically an urban disease." },
        { text: "The rash is extremely itchy (pruritic)", type: "wrong", explanation: "Chickenpox is itchy; Rickettsialpox is usually not." }
      ]
    },
    {
      question: "Which antibiotic is the treatment of choice for Rickettsialpox?",
      bloomLevel: "Analysis",
      options: [
        { text: "Doxycycline", type: "correct", explanation: "Tetracyclines are the standard treatment for rickettsial infections." },
        { text: "Penicillin G", type: "distractor", explanation: "Rickettsia are intracellular and not sensitive to penicillin." },
        { text: "Ciprofloxacin", type: "misconception", explanation: "While it has some activity, Doxycycline is superior." },
        { text: "Acyclovir", type: "wrong", explanation: "This is an antiviral, ineffective against bacteria." }
      ]
    },
    {
      question: "Why was Rickettsialpox once confused with Smallpox in New York City?",
      bloomLevel: "Intuition",
      options: [
        { text: "The generalized papulovesicular rash looks similar", type: "correct", explanation: "Both cause a 'pock' like rash." },
        { text: "They are both caused by the same family of viruses", type: "distractor", explanation: "Smallpox is a virus; Rickettsialpox is a bacterium." },
        { text: "Both diseases are always fatal if untreated", type: "misconception", explanation: "Rickettsialpox is mild and self-limiting; Smallpox is deadly." },
        { text: "They both cause the patient to lose their sense of smell", type: "wrong", explanation: "This is not a feature of either disease." }
      ]
    }
  ],
  "s1e3": [ // Colchicine poisoning
    {
      question: "Colchicine exerts its primary toxic effect by inhibiting which cellular process?",
      bloomLevel: "Recall",
      options: [
        { text: "Microtubule polymerization", type: "correct", explanation: "Colchicine binds to tubulin, preventing the formation of microtubules necessary for mitosis." },
        { text: "Sodium-Potassium ATPase pump", type: "distractor", explanation: "This is the target of Digoxin, not Colchicine." },
        { text: "Protein synthesis at the 50S ribosome", type: "misconception", explanation: "This is the mechanism of macrolide antibiotics." },
        { text: "DNA gyrase activity", type: "wrong", explanation: "This is the target of fluoroquinolones." }
      ]
    },
    {
      question: "Why does Colchicine poisoning lead to multi-organ failure, particularly affecting the GI tract and bone marrow?",
      bloomLevel: "Understanding",
      options: [
        { text: "It targets tissues with high rates of cell turnover", type: "correct", explanation: "As a mitotic inhibitor, it most severely affects rapidly dividing cells." },
        { text: "It causes direct caustic burns to the mucosal lining", type: "distractor", explanation: "The damage is cellular/mitotic, not a chemical burn." },
        { text: "It triggers a massive release of systemic cytokines", type: "misconception", explanation: "While inflammation occurs, the primary defect is arrested cell division." },
        { text: "It blocks oxygen delivery by binding to hemoglobin", type: "wrong", explanation: "Colchicine does not affect hemoglobin oxygen affinity." }
      ]
    },
    {
      question: "A patient with a history of gout presents with severe vomiting, diarrhea, and subsequent leukopenia after an intentional overdose. What is the most critical phase of toxicity to monitor for next?",
      bloomLevel: "Application",
      options: [
        { text: "Multi-organ failure and cardiovascular collapse (24-72 hours)", type: "correct", explanation: "The second stage of colchicine poisoning is the most lethal." },
        { text: "Immediate anaphylactic shock", type: "distractor", explanation: "Colchicine toxicity is dose-dependent, not an allergic reaction." },
        { text: "Delayed onset of chronic renal failure (months later)", type: "misconception", explanation: "Toxicity is acute; chronic failure is not the primary concern." },
        { text: "Sudden onset of liver cirrhosis", type: "wrong", explanation: "Cirrhosis is a chronic process; acute liver injury may occur but not cirrhosis." }
      ]
    },
    {
      question: "Which laboratory finding is most indicative of the 'recovery phase' in a survivor of Colchicine poisoning?",
      bloomLevel: "Analysis",
      options: [
        { text: "Rebound leukocytosis and alopecia", type: "correct", explanation: "As the marrow recovers, white cell counts surge; hair loss occurs due to previous mitotic arrest." },
        { text: "Normalization of the PT/INR", type: "distractor", explanation: "This is non-specific and occurs in many recovering toxicities." },
        { text: "Sudden drop in serum creatinine", type: "misconception", explanation: "Creatinine normalizes slowly; it doesn't 'drop' as a sign of specific recovery." },
        { text: "Disappearance of the 'J-wave' on EKG", type: "wrong", explanation: "J-waves are associated with hypothermia, not colchicine." }
      ]
    },
    {
      question: "Colchicine is derived from which plant, often mistaken for wild onions or garlic?",
      bloomLevel: "Intuition",
      options: [
        { text: "Autumn Crocus (Colchicum autumnale)", type: "correct", explanation: "The plant contains high concentrations of the alkaloid." },
        { text: "Foxglove (Digitalis purpurea)", type: "distractor", explanation: "Foxglove is the source of Digoxin." },
        { text: "Deadly Nightshade (Atropa belladonna)", type: "misconception", explanation: "This is the source of Atropine." },
        { text: "Castor Bean (Ricinus communis)", type: "wrong", explanation: "This is the source of Ricin." }
      ]
    }
  ],
  "s1e4": [ // Echovirus 11
    {
      question: "Echovirus 11 belongs to which genus of viruses?",
      bloomLevel: "Recall",
      options: [
        { text: "Enterovirus", type: "correct", explanation: "Echoviruses are a major subgroup of the Enterovirus genus within Picornaviridae." },
        { text: "Rhinovirus", type: "distractor", explanation: "While also a Picornavirus, Rhinoviruses cause the common cold." },
        { text: "Rotavirus", type: "misconception", explanation: "Rotavirus is a Reovirus, causing severe diarrhea." },
        { text: "Adenovirus", type: "wrong", explanation: "Adenoviruses are DNA viruses; Echoviruses are RNA viruses." }
      ]
    },
    {
      question: "In neonates, Echovirus 11 is notorious for causing a syndrome that mimics which life-threatening condition?",
      bloomLevel: "Understanding",
      options: [
        { text: "Bacterial Sepsis", type: "correct", explanation: "Neonatal enteroviral infection often presents with fever, irritability, and multi-organ involvement." },
        { text: "Congenital Heart Disease", type: "distractor", explanation: "While myocarditis can occur, the overall presentation is septic-like." },
        { text: "Pyloric Stenosis", type: "misconception", explanation: "Pyloric stenosis is a mechanical obstruction, not an infectious syndrome." },
        { text: "Infantile Spasms", type: "wrong", explanation: "This is a seizure disorder, not a septic-like infection." }
      ]
    },
    {
      question: "During an outbreak of Echovirus 11 in a neonatal unit, which organ system failure is the most common cause of mortality?",
      bloomLevel: "Application",
      options: [
        { text: "Hepatic failure with coagulopathy", type: "correct", explanation: "Fulminant hepatitis is a hallmark of severe neonatal Echovirus 11." },
        { text: "Acute Renal Failure", type: "distractor", explanation: "Renal failure may occur but is usually secondary to liver/heart failure." },
        { text: "Pulmonary Hypoplasia", type: "misconception", explanation: "This is a developmental issue, not an infectious one." },
        { text: "Splenic Rupture", type: "wrong", explanation: "This is not a feature of Echovirus infection." }
      ]
    },
    {
      question: "CSF analysis in a patient with Echovirus meningitis typically shows which pattern?",
      bloomLevel: "Analysis",
      options: [
        { text: "Lymphocytic pleocytosis with normal glucose", type: "correct", explanation: "This is the classic 'viral' or 'aseptic' meningitis pattern." },
        { text: "Neutrophilic pleocytosis with low glucose", type: "distractor", explanation: "This pattern suggests bacterial meningitis." },
        { text: "High protein with xanthochromia", type: "misconception", explanation: "This suggests subarachnoid hemorrhage." },
        { text: "Presence of 'clue cells' in the fluid", type: "wrong", explanation: "Clue cells are found in vaginal swabs for bacterial vaginosis." }
      ]
    },
    {
      question: "The 'ECHO' in Echovirus is an acronym for which phrase?",
      bloomLevel: "Intuition",
      options: [
        { text: "Enteric Cytopathic Human Orphan", type: "correct", explanation: "They were called 'orphans' because they were initially not linked to any specific disease." },
        { text: "Enteric Colonizing Human Organism", type: "distractor", explanation: "A plausible but incorrect expansion of the acronym." },
        { text: "Extracellular Human Outbreak", type: "misconception", explanation: "Incorrect; the 'O' specifically stands for Orphan." },
        { text: "Every Child Has One", type: "wrong", explanation: "A humorous but medically incorrect mnemonic." }
      ]
    }
  ],
  "s1e5": [ // Copper allergy
    {
      question: "A systemic allergy to copper is classified as which type of hypersensitivity reaction?",
      bloomLevel: "Recall",
      options: [
        { text: "Type IV (Delayed-type)", type: "correct", explanation: "It is a T-cell mediated reaction to metal ions." },
        { text: "Type I (Immediate)", type: "distractor", explanation: "Type I is IgE-mediated (e.g., hives, anaphylaxis)." },
        { text: "Type II (Cytotoxic)", type: "misconception", explanation: "Type II involves antibodies binding to cell surface antigens." },
        { text: "Type III (Immune complex)", type: "wrong", explanation: "Type III involves deposition of antigen-antibody complexes." }
      ]
    },
    {
      question: "Why can a systemic copper allergy mimic a chronic infection like tuberculosis or endocarditis?",
      bloomLevel: "Understanding",
      options: [
        { text: "It triggers a systemic inflammatory response with fever and malaise", type: "correct", explanation: "The chronic T-cell activation releases cytokines that cause systemic symptoms." },
        { text: "The copper ions directly poison the white blood cells", type: "distractor", explanation: "It's an immune overreaction, not direct poisoning." },
        { text: "Copper promotes the growth of rare bacteria in the blood", type: "misconception", explanation: "Copper is actually antimicrobial; it doesn't promote growth." },
        { text: "It causes the formation of granulomas in the lungs", type: "wrong", explanation: "While Type IV reactions can form granulomas, copper allergy usually presents as dermatitis." }
      ]
    },
    {
      question: "A patient with a copper IUD develops a persistent, generalized rash and low-grade fever. What is the most definitive diagnostic test for metal allergy?",
      bloomLevel: "Application",
      options: [
        { text: "Patch testing", type: "correct", explanation: "Patch testing is the gold standard for identifying contact/systemic metal allergies." },
        { text: "Serum copper levels", type: "distractor", explanation: "Allergy is about sensitivity, not the amount of copper in the blood." },
        { text: "Skin prick testing", type: "misconception", explanation: "Prick testing is for Type I allergies, not Type IV." },
        { text: "24-hour urinary copper", type: "wrong", explanation: "This is used for Wilson's disease, not allergy." }
      ]
    },
    {
      question: "Which common household item or medical device is a frequent source of hidden copper exposure?",
      bloomLevel: "Analysis",
      options: [
        { text: "Dental amalgams and 'gold' crowns", type: "correct", explanation: "Many dental alloys contain copper to improve strength." },
        { text: "Stainless steel cutlery", type: "distractor", explanation: "Stainless steel is primarily iron, chromium, and nickel." },
        { text: "Titanium hip implants", type: "misconception", explanation: "Titanium is generally used because it is highly biocompatible and copper-free." },
        { text: "Plastic water bottles", type: "wrong", explanation: "Plastics do not contain copper." }
      ]
    },
    {
      question: "What is the classic 'green' skin discoloration associated with cheap copper jewelry actually caused by?",
      bloomLevel: "Intuition",
      options: [
        { text: "Oxidation of copper by skin acids and sweat", type: "correct", explanation: "Copper carbonates or chlorides form a green patina on the skin." },
        { text: "A localized allergic reaction to the metal", type: "distractor", explanation: "The green stain is chemical oxidation; the allergy is a red rash." },
        { text: "The body's attempt to absorb the copper through the pores", type: "misconception", explanation: "It's a surface chemical reaction, not biological absorption." },
        { text: "A fungal infection thriving on the metal surface", type: "wrong", explanation: "Copper is toxic to most fungi." }
      ]
    }
  ],
  "s1e7": [ // African trypanosomiasis
    {
      question: "Which organism is the causative agent of West African Sleeping Sickness?",
      bloomLevel: "Recall",
      options: [
        { text: "Trypanosoma brucei gambiense", type: "correct", explanation: "Gambiense causes the chronic West African form; Rhodesiense causes the acute East African form." },
        { text: "Trypanosoma cruzi", type: "distractor", explanation: "T. cruzi causes Chagas disease in the Americas." },
        { text: "Leishmania donovani", type: "misconception", explanation: "Leishmania causes Leishmaniasis (Kala-azar)." },
        { text: "Plasmodium falciparum", type: "wrong", explanation: "This is the most deadly species of Malaria." }
      ]
    },
    {
      question: "Why do patients with African Sleeping Sickness experience profound disruptions in their sleep-wake cycle?",
      bloomLevel: "Understanding",
      options: [
        { text: "The parasite invades the CNS and disrupts the hypothalamus", type: "correct", explanation: "Invasion of the brain leads to the characteristic 'sleeping' symptoms." },
        { text: "The parasite produces a toxin that acts as a potent sedative", type: "distractor", explanation: "The symptoms are due to inflammation and tissue damage, not a specific sedative toxin." },
        { text: "Chronic anemia leads to constant exhaustion", type: "misconception", explanation: "While anemia occurs, the sleep cycle inversion is a neurological feature." },
        { text: "The patient is staying awake at night to avoid fly bites", type: "wrong", explanation: "The sleep disturbance is a biological symptom of the disease." }
      ]
    },
    {
      question: "A traveler returning from a safari in Tanzania presents with a painful skin chancre and high fever. What is the most likely diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "East African Trypanosomiasis (T. b. rhodesiense)", type: "correct", explanation: "The East African form is more acute and often starts with a chancre." },
        { text: "Malaria", type: "distractor", explanation: "Malaria causes fever but not a localized skin chancre." },
        { text: "Dengue Fever", type: "misconception", explanation: "Dengue causes 'breakbone' pain and rash, but not a chancre." },
        { text: "African Tick Bite Fever", type: "wrong", explanation: "This causes an eschar, but the systemic symptoms are usually milder than Trypanosomiasis." }
      ]
    },
    {
      question: "What is 'Winterbottom's sign', and what does it indicate in a patient with suspected Trypanosomiasis?",
      bloomLevel: "Analysis",
      options: [
        { text: "Swelling of the posterior cervical lymph nodes", type: "correct", explanation: "This is a classic physical finding in the early stages of the disease." },
        { text: "A specific pattern of retinal hemorrhage", type: "distractor", explanation: "Ocular findings are not the primary diagnostic sign." },
        { text: "Splenomegaly that crosses the midline", type: "misconception", explanation: "While the spleen may enlarge, Winterbottom's refers to lymph nodes." },
        { text: "A positive Romberg test", type: "wrong", explanation: "Romberg tests for proprioception, not parasites." }
      ]
    },
    {
      question: "How does the Trypanosome parasite evade the host's immune system for months or years?",
      bloomLevel: "Intuition",
      options: [
        { text: "Antigenic variation of its Variant Surface Glycoproteins (VSG)", type: "correct", explanation: "The parasite constantly changes its 'coat' so the immune system can't catch up." },
        { text: "It hides inside red blood cells like Malaria", type: "distractor", explanation: "Trypanosomes are extracellular parasites in the blood." },
        { text: "It produces a thick capsule that prevents phagocytosis", type: "misconception", explanation: "The VSG coat is the primary mechanism, not a bacterial-style capsule." },
        { text: "It integrates its DNA into the host's genome", type: "wrong", explanation: "This is a feature of some viruses (like HIV), not protozoa." }
      ]
    }
  ],
  "s1e8": [ // Organophosphate poisoning
    {
      question: "Organophosphates exert their toxicity by irreversibly inhibiting which enzyme?",
      bloomLevel: "Recall",
      options: [
        { text: "Acetylcholinesterase", type: "correct", explanation: "This leads to an accumulation of acetylcholine at the synapse." },
        { text: "Monoamine oxidase", type: "distractor", explanation: "MAO breaks down dopamine and serotonin; its inhibitors are antidepressants." },
        { text: "Cytochrome P450", type: "misconception", explanation: "CYP450 is involved in drug metabolism, not synaptic transmission." },
        { text: "Carbonic anhydrase", type: "wrong", explanation: "This enzyme is involved in acid-base balance." }
      ]
    },
    {
      question: "What is the physiological cause of the 'SLUDGE' symptoms (Salivation, Lacrimation, Urination, etc.) in this poisoning?",
      bloomLevel: "Understanding",
      options: [
        { text: "Overstimulation of the parasympathetic nervous system", type: "correct", explanation: "Excess acetylcholine causes a 'cholinergic crisis'." },
        { text: "Direct irritation of the mucous membranes", type: "distractor", explanation: "The effect is systemic and neurological, not local irritation." },
        { text: "Paralysis of the sympathetic ganglia", type: "misconception", explanation: "It's an overactivation of the parasympathetic, not just a block of the sympathetic." },
        { text: "Failure of the kidneys to reabsorb water", type: "wrong", explanation: "The urination is due to bladder contraction, not kidney failure." }
      ]
    },
    {
      question: "A farmer is found unconscious in a field with pinpoint pupils and muscle fasciculations. What is the first pharmacological priority?",
      bloomLevel: "Application",
      options: [
        { text: "Atropine", type: "correct", explanation: "Atropine blocks the muscarinic effects (the 'SLUDGE') and is life-saving." },
        { text: "Pralidoxime (2-PAM)", type: "distractor", explanation: "2-PAM is needed to 'unstick' the enzyme, but Atropine is the immediate symptomatic priority." },
        { text: "Naloxone", type: "misconception", explanation: "Naloxone is for opioid overdose; pinpoint pupils are a shared sign, but the other symptoms differ." },
        { text: "Epinephrine", type: "wrong", explanation: "Epinephrine would worsen the tachycardia and agitation if present." }
      ]
    },
    {
      question: "Why is Pralidoxime (2-PAM) only effective if administered before 'aging' of the enzyme occurs?",
      bloomLevel: "Analysis",
      options: [
        { text: "The bond between the toxin and enzyme becomes chemically permanent", type: "correct", explanation: "Once the bond 'ages', it can no longer be broken by 2-PAM." },
        { text: "The toxin is eventually metabolized and leaves the body", type: "distractor", explanation: "The toxin stays bound; the problem is the bond strength." },
        { text: "The body produces new enzymes to replace the old ones", type: "misconception", explanation: "New enzyme production takes days; 2-PAM is for the existing ones." },
        { text: "The toxin moves from the blood into the fat cells", type: "wrong", explanation: "Aging refers to the enzyme-toxin complex, not the toxin's location." }
      ]
    },
    {
      question: "Which characteristic odor is often noted on the breath or clothing of a patient with organophosphate exposure?",
      bloomLevel: "Intuition",
      options: [
        { text: "Garlic", type: "correct", explanation: "Many organophosphate pesticides have a distinct garlic-like smell." },
        { text: "Bitter Almonds", type: "distractor", explanation: "This is the smell of Cyanide." },
        { text: "Fruity/Acetone", type: "misconception", explanation: "This is the smell of Diabetic Ketoacidosis." },
        { text: "Rotten Eggs", type: "wrong", explanation: "This is the smell of Hydrogen Sulfide." }
      ]
    }
  ],
  "s1e9": [ // Arteriovenous malformation
    {
      question: "What is the defining structural characteristic of an Arteriovenous Malformation (AVM)?",
      bloomLevel: "Recall",
      options: [
        { text: "Direct connection between arteries and veins without a capillary bed", type: "correct", explanation: "This 'nidus' allows high-pressure blood to flow directly into veins." },
        { text: "A localized ballooning of an arterial wall", type: "distractor", explanation: "This describes an aneurysm." },
        { text: "A cluster of abnormally dilated capillaries", type: "misconception", explanation: "This describes a cavernous malformation." },
        { text: "A single vein that has become abnormally large", type: "wrong", explanation: "This describes a venous angioma." }
      ]
    },
    {
      question: "Why are AVMs at high risk for spontaneous hemorrhage?",
      bloomLevel: "Understanding",
      options: [
        { text: "The thin-walled veins cannot handle the high-pressure arterial blood", type: "correct", explanation: "The venous side of the AVM is not built for arterial pressures." },
        { text: "The blood inside the AVM is highly acidic and eats through the vessel", type: "distractor", explanation: "The damage is mechanical/pressure-based, not chemical." },
        { text: "The AVM releases enzymes that dissolve the surrounding brain tissue", type: "misconception", explanation: "The AVM is a vascular defect, not a secretory tumor." },
        { text: "The patient's blood pressure is always higher than normal", type: "wrong", explanation: "AVMs can bleed even at normal blood pressures." }
      ]
    },
    {
      question: "A 25-year-old patient presents with a sudden 'thunderclap' headache and focal neurological deficits. CT shows an intraparenchymal hemorrhage. What is the most likely underlying vascular cause?",
      bloomLevel: "Application",
      options: [
        { text: "Arteriovenous Malformation (AVM)", type: "correct", explanation: "AVMs are a leading cause of non-traumatic brain bleeds in young adults." },
        { text: "Hypertensive hemorrhage", type: "distractor", explanation: "This is more common in older patients with chronic hypertension." },
        { text: "Amyloid angiopathy", type: "misconception", explanation: "This is a disease of the elderly." },
        { text: "Berry Aneurysm rupture", type: "wrong", explanation: "Aneurysms usually cause subarachnoid hemorrhage, not primarily intraparenchymal." }
      ]
    },
    {
      question: "The Spetzler-Martin scale is used to grade AVMs based on which three factors?",
      bloomLevel: "Analysis",
      options: [
        { text: "Size, eloquence of adjacent brain, and venous drainage pattern", type: "correct", explanation: "These factors determine the surgical risk of removing the AVM." },
        { text: "Age of patient, blood pressure, and smoking history", type: "distractor", explanation: "These are risk factors for stroke, not AVM grading." },
        { text: "Location in the body, depth of lesion, and type of artery", type: "misconception", explanation: "The scale is specific to brain AVMs and their surgical accessibility." },
        { text: "Number of previous bleeds, size, and patient gender", type: "wrong", explanation: "Gender and bleed history are not part of the Spetzler-Martin scale." }
      ]
    },
    {
      question: "In some cases, a physician can hear a 'whooshing' sound when placing a stethoscope over the skull of an AVM patient. What is this called?",
      bloomLevel: "Intuition",
      options: [
        { text: "Bruit", type: "correct", explanation: "The turbulent high-velocity blood flow through the AVM creates an audible sound." },
        { text: "Murmur", type: "distractor", explanation: "Murmurs are heard over the heart." },
        { text: "Stridor", type: "misconception", explanation: "Stridor is a high-pitched sound from the airway." },
        { text: "Crepitus", type: "wrong", explanation: "Crepitus is a crunching sound from joints or lungs." }
      ]
    }
  ],
  "s1e10": [ // Rabies
    {
      question: "What is the characteristic shape of the Rabies virus (Lyssavirus) under an electron microscope?",
      bloomLevel: "Recall",
      options: [
        { text: "Bullet-shaped", type: "correct", explanation: "The rhabdovirus family is known for this distinct morphology." },
        { text: "Spherical with spikes", type: "distractor", explanation: "This describes many viruses like Influenza or Coronaviruses." },
        { text: "Icosahedral", type: "misconception", explanation: "This is a common geometric shape for many viruses (e.g., Adenovirus)." },
        { text: "Thread-like (Filamentous)", type: "wrong", explanation: "This describes Filoviruses like Ebola." }
      ]
    },
    {
      question: "How does the Rabies virus travel from the site of an animal bite to the central nervous system?",
      bloomLevel: "Understanding",
      options: [
        { text: "Retrograde axonal transport via peripheral nerves", type: "correct", explanation: "The virus 'walks' back up the nerves to the brain." },
        { text: "Rapid spread through the lymphatic system", type: "distractor", explanation: "Rabies is neurotropic, not primarily lymphotropic." },
        { text: "Direct hematogenous (blood) spread", type: "misconception", explanation: "The virus is rarely found in the blood." },
        { text: "Migration through the cerebrospinal fluid", type: "wrong", explanation: "It reaches the CSF only after infecting the brain." }
      ]
    },
    {
      question: "A patient is bitten by a stray dog in a rabies-endemic area. What is the immediate protocol for post-exposure prophylaxis (PEP)?",
      bloomLevel: "Application",
      options: [
        { text: "Wound cleaning, Rabies Immune Globulin (RIG), and Rabies Vaccine", type: "correct", explanation: "PEP must include both passive (RIG) and active (vaccine) immunization." },
        { text: "Broad-spectrum antibiotics and a Tetanus shot only", type: "distractor", explanation: "This ignores the lethal threat of rabies." },
        { text: "Oral Acyclovir for 10 days", type: "misconception", explanation: "Acyclovir is for Herpes, not Rabies." },
        { text: "Observation of the patient for 10 days before treating", type: "wrong", explanation: "You observe the *animal* if possible, but treat the *patient* immediately if the animal is high-risk." }
      ]
    },
    {
      question: "What are 'Negri bodies', and where are they found in a rabies-infected host?",
      bloomLevel: "Analysis",
      options: [
        { text: "Eosinophilic cytoplasmic inclusions in neurons", type: "correct", explanation: "They are a classic histopathological finding in the brain (especially the hippocampus)." },
        { text: "Calcified nodules in the lungs", type: "distractor", explanation: "This would suggest old TB or fungal infection." },
        { text: "Viral particles found in the salivary glands", type: "misconception", explanation: "While the virus is in saliva, 'Negri bodies' specifically refers to the brain inclusions." },
        { text: "Dark spots on the skin at the bite site", type: "wrong", explanation: "Negri bodies are microscopic and internal." }
      ]
    },
    {
      question: "Why do rabies patients develop 'hydrophobia' (fear of water)?",
      bloomLevel: "Intuition",
      options: [
        { text: "Severe, painful spasms of the throat muscles when trying to swallow", type: "correct", explanation: "The brain's attempt to swallow triggers violent, agonizing contractions." },
        { text: "The virus causes a psychological delusion that water is poisonous", type: "distractor", explanation: "It's a physical reflex/spasm, not a purely psychological delusion." },
        { text: "The patient's skin becomes hypersensitive to moisture", type: "misconception", explanation: "The fear is about *drinking*, not skin contact." },
        { text: "Water neutralizes the virus, so the virus 'forces' the host to avoid it", type: "wrong", explanation: "A common myth, but not the biological mechanism." }
      ]
    }
  ],
  "s1e2": [ // Subacute sclerosing panencephalitis (SSPE)
    {
      question: "SSPE is a progressive neurological disorder caused by a persistent infection with which virus?",
      bloomLevel: "Recall",
      options: [
        { text: "Mutated Measles virus", type: "correct", explanation: "It is a rare, fatal complication of measles that occurs years after the initial infection." },
        { text: "Varicella-Zoster virus", type: "distractor", explanation: "Varicella causes chickenpox and shingles, not SSPE." },
        { text: "Epstein-Barr virus", type: "misconception", explanation: "EBV causes mononucleosis and certain lymphomas." },
        { text: "Herpes Simplex Virus 1", type: "wrong", explanation: "HSV-1 causes cold sores and occasionally encephalitis, but not SSPE." }
      ]
    },
    {
      question: "What is the characteristic EEG finding in patients with SSPE?",
      bloomLevel: "Understanding",
      options: [
        { text: "Periodic high-voltage slow-wave complexes", type: "correct", explanation: "These 'Radermecker complexes' are highly suggestive of SSPE." },
        { text: "3-Hz spike-and-wave discharges", type: "distractor", explanation: "This is characteristic of Absence seizures." },
        { text: "Generalized 14-and-6-Hz positive spikes", type: "misconception", explanation: "This is a non-specific finding often seen in healthy adolescents." },
        { text: "Flatline (isoelectric) activity", type: "wrong", explanation: "This indicates brain death, not a specific disease pattern." }
      ]
    },
    {
      question: "A patient with a history of childhood measles presents with cognitive decline and myoclonic jerks. What is the most definitive diagnostic test?",
      bloomLevel: "Application",
      options: [
        { text: "CSF analysis for elevated anti-measles antibody titers", type: "correct", explanation: "Intrathecal production of measles antibodies is the gold standard." },
        { text: "Brain biopsy for amyloid plaques", type: "distractor", explanation: "Amyloid plaques are for Alzheimer's, not SSPE." },
        { text: "Serum PCR for active viral replication", type: "misconception", explanation: "The virus is often defective and not replicating in a way that serum PCR easily detects." },
        { text: "Skull X-ray for calcifications", type: "wrong", explanation: "X-rays are not useful for diagnosing SSPE." }
      ]
    },
    {
      question: "Which clinical stage of SSPE is characterized by severe dementia, blindness, and extrapyramidal symptoms?",
      bloomLevel: "Analysis",
      options: [
        { text: "Stage 3", type: "correct", explanation: "Stage 3 involves progressive neurological deterioration and vegetative state." },
        { text: "Stage 1", type: "distractor", explanation: "Stage 1 is subtle behavioral changes and cognitive decline." },
        { text: "Stage 2", type: "misconception", explanation: "Stage 2 is characterized by motor regression and myoclonus." },
        { text: "Stage 4", type: "wrong", explanation: "Stage 4 is the final stage of akinetic mutism and death." }
      ]
    },
    {
      question: "Why has the incidence of SSPE dramatically decreased in developed nations?",
      bloomLevel: "Intuition",
      options: [
        { text: "Widespread Measles vaccination (MMR)", type: "correct", explanation: "Preventing the primary measles infection eliminates the risk of SSPE." },
        { text: "Improved sanitation and hand-washing", type: "distractor", explanation: "Measles is highly contagious via respiratory droplets; sanitation helps but doesn't stop it like vaccines." },
        { text: "The virus has naturally evolved to be less lethal", type: "misconception", explanation: "There is no evidence the measles virus has become less dangerous." },
        { text: "Better antibiotics for childhood fevers", type: "wrong", explanation: "Measles is a virus; antibiotics have no effect on it." }
      ]
    }
  ],
  "s1e6": [ // Wilson's Disease
    {
      question: "Which protein is defective in Wilson's disease, leading to impaired biliary copper excretion?",
      bloomLevel: "Recall",
      options: [
        { text: "ATP7B", type: "correct", explanation: "ATP7B is a copper-transporting P-type ATPase located in the liver." },
        { text: "ATP7A", type: "distractor", explanation: "ATP7A is defective in Menkes disease, causing copper deficiency." },
        { text: "HFE", type: "misconception", explanation: "HFE is associated with Hemochromatosis (iron overload)." },
        { text: "Ceruloplasmin", type: "wrong", explanation: "Ceruloplasmin levels are low in Wilson's, but it's not the primary defect." }
      ]
    },
    {
      question: "Why do patients with Wilson's disease often present with neuropsychiatric symptoms?",
      bloomLevel: "Understanding",
      options: [
        { text: "Free copper deposits in the basal ganglia causing oxidative damage", type: "correct", explanation: "The basal ganglia are particularly sensitive to copper toxicity." },
        { text: "Copper blocks the reuptake of dopamine in the synapse", type: "distractor", explanation: "It's direct tissue damage, not a simple neurotransmitter block." },
        { text: "Chronic liver failure leads to ammonia-induced encephalopathy", type: "misconception", explanation: "While liver failure occurs, the primary neuro symptoms are from direct copper deposition." },
        { text: "Copper causes small-vessel vasculitis in the cerebral cortex", type: "wrong", explanation: "Wilson's is a storage disease, not a vasculitis." }
      ]
    },
    {
      question: "A patient with suspected Wilson's has a slit-lamp exam. What finding is pathognomonic?",
      bloomLevel: "Application",
      options: [
        { text: "Kayser-Fleischer rings", type: "correct", explanation: "Golden-brown deposits in the Descemet membrane of the cornea." },
        { text: "Lisch nodules", type: "distractor", explanation: "Lisch nodules are seen in Neurofibromatosis Type 1." },
        { text: "Brushfield spots", type: "misconception", explanation: "Brushfield spots are associated with Down syndrome." },
        { text: "Cherry-red spot on the macula", type: "wrong", explanation: "This is seen in Tay-Sachs or central retinal artery occlusion." }
      ]
    },
    {
      question: "Which laboratory finding is most consistent with a diagnosis of Wilson's disease?",
      bloomLevel: "Analysis",
      options: [
        { text: "Low serum ceruloplasmin and high 24-hour urinary copper", type: "correct", explanation: "Less copper is bound to ceruloplasmin, and more is excreted in urine." },
        { text: "High serum ceruloplasmin and high serum iron", type: "distractor", explanation: "Ceruloplasmin is typically low, not high." },
        { text: "Low serum copper and low urinary copper", type: "misconception", explanation: "Urinary copper is high due to the 'spillover' of free copper." },
        { text: "Elevated alkaline phosphatase and low bilirubin", type: "wrong", explanation: "Wilson's often causes a unique pattern of low ALP relative to high bilirubin in acute failure." }
      ]
    },
    {
      question: "Why might a 'Sunflower Cataract' be observed in a Wilson's patient?",
      bloomLevel: "Intuition",
      options: [
        { text: "Copper deposits in the anterior capsule of the lens", type: "correct", explanation: "It's a rare but classic ocular manifestation of copper overload." },
        { text: "The patient has developed secondary diabetes from pancreatic copper", type: "distractor", explanation: "Wilson's doesn't typically cause diabetes like Hemochromatosis." },
        { text: "It is a side effect of Penicillamine treatment", type: "misconception", explanation: "The cataract is a feature of the disease, not the treatment." },
        { text: "Chronic jaundice stains the lens yellow", type: "wrong", explanation: "Jaundice stains the sclera (icterus), not the lens itself." }
      ]
    }
  ],
  "s2e1": [ // Pheochromocytoma
    {
      question: "Pheochromocytomas primarily arise from which type of cells?",
      bloomLevel: "Recall",
      options: [
        { text: "Chromaffin cells of the adrenal medulla", type: "correct", explanation: "These cells are responsible for catecholamine production." },
        { text: "Cortical cells of the adrenal zona fasciculata", type: "distractor", explanation: "These produce cortisol, not catecholamines." },
        { text: "Parafollicular C-cells of the thyroid", type: "misconception", explanation: "These produce calcitonin (though they are involved in MEN2)." },
        { text: "Juxtaglomerular cells of the kidney", type: "wrong", explanation: "These produce renin." }
      ]
    },
    {
      question: "What is the physiological cause of the 'paroxysmal' nature of symptoms in Pheochromocytoma?",
      bloomLevel: "Understanding",
      options: [
        { text: "Episodic release of catecholamines triggered by pressure or stress", type: "correct", explanation: "Abrupt surges of adrenaline/noradrenaline cause the 'attacks'." },
        { text: "The tumor only produces hormones during the night", type: "distractor", explanation: "Attacks can happen anytime, often triggered by physical movement." },
        { text: "The body periodically clears the hormones through the liver", type: "misconception", explanation: "Symptoms are driven by release, not clearance rate." },
        { text: "It is a psychological reaction to the fear of the tumor", type: "wrong", explanation: "The symptoms are biochemically driven, not psychosomatic." }
      ]
    },
    {
      question: "Before surgical resection of a Pheochromocytoma, which medication MUST be started first?",
      bloomLevel: "Application",
      options: [
        { text: "Alpha-blockers (e.g., Phenoxybenzamine)", type: "correct", explanation: "Alpha-blockade must precede beta-blockade to prevent hypertensive crisis." },
        { text: "Beta-blockers (e.g., Propranolol)", type: "distractor", explanation: "Beta-blockade alone can cause unopposed alpha-stimulation." },
        { text: "High-dose IV fluids", type: "misconception", explanation: "While fluids are needed, alpha-blockade is the pharmacological priority." },
        { text: "Intravenous Insulin", type: "wrong", explanation: "Insulin is not part of the standard pre-op protocol for Pheo." }
      ]
    },
    {
      question: "Which diagnostic test has the highest sensitivity for detecting a Pheochromocytoma?",
      bloomLevel: "Analysis",
      options: [
        { text: "Plasma free metanephrines", type: "correct", explanation: "Metanephrines are continuously produced by the tumor, even between attacks." },
        { text: "Random serum adrenaline level", type: "distractor", explanation: "Adrenaline levels fluctuate too much to be reliable." },
        { text: "24-hour urinary VMA", type: "misconception", explanation: "VMA has lower sensitivity than metanephrines." },
        { text: "Abdominal Ultrasound", type: "wrong", explanation: "Imaging is for localization, not primary biochemical diagnosis." }
      ]
    },
    {
      question: "Why is Pheochromocytoma often called the '10% tumor'?",
      bloomLevel: "Intuition",
      options: [
        { text: "10% are bilateral, 10% are malignant, 10% are extra-adrenal", type: "correct", explanation: "This classic rule of thumb describes its clinical variability." },
        { text: "Only 10% of patients survive more than a year", type: "distractor", explanation: "Most are benign and curable with surgery." },
        { text: "It only affects 10% of the adrenal gland's volume", type: "misconception", explanation: "The rule refers to clinical characteristics, not volume." },
        { text: "10% of the population has a silent version of it", type: "wrong", explanation: "It is a very rare tumor." }
      ]
    }
  ],
  "s2e2": [ // Brain tumor (Cancerous adenoma)
    {
      question: "Pituitary adenomas most commonly arise from which part of the gland?",
      bloomLevel: "Recall",
      options: [
        { text: "Anterior pituitary (Adenohypophysis)", type: "correct", explanation: "This part produces hormones like GH, Prolactin, and ACTH." },
        { text: "Posterior pituitary (Neurohypophysis)", type: "distractor", explanation: "The posterior pituitary stores ADH and Oxytocin but rarely develops adenomas." },
        { text: "Hypothalamic stalk", type: "misconception", explanation: "While tumors can occur here, they are not 'pituitary adenomas'." },
        { text: "Pineal gland", type: "wrong", explanation: "The pineal gland is a separate structure in the brain." }
      ]
    },
    {
      question: "Why do large pituitary adenomas often cause bitemporal hemianopsia (loss of peripheral vision)?",
      bloomLevel: "Understanding",
      options: [
        { text: "Compression of the optic chiasm", type: "correct", explanation: "The tumor grows upward and presses on the crossing fibers of the optic nerves." },
        { text: "Direct invasion of the eyeball", type: "distractor", explanation: "Pituitary tumors are intracranial and do not invade the eyes directly." },
        { text: "Increased intracranial pressure causing papilledema", type: "misconception", explanation: "While ICP can rise, bitemporal hemianopsia is a specific compression sign." },
        { text: "Destruction of the primary visual cortex", type: "wrong", explanation: "The visual cortex is in the occipital lobe, far from the pituitary." }
      ]
    },
    {
      question: "A patient presents with galactorrhea, amenorrhea, and a headache. MRI shows a 1.5cm mass in the sella turcica. What is the first-line pharmacological treatment?",
      bloomLevel: "Application",
      options: [
        { text: "Dopamine agonists (e.g., Cabergoline)", type: "correct", explanation: "Dopamine inhibits prolactin release and can shrink prolactinomas." },
        { text: "Immediate transsphenoidal surgery", type: "distractor", explanation: "Surgery is usually reserved for non-responders or non-prolactinomas." },
        { text: "High-dose radiation therapy", type: "misconception", explanation: "Radiation is a third-line treatment for aggressive or refractory cases." },
        { text: "Levothyroxine replacement", type: "wrong", explanation: "This treats hypothyroidism, not a pituitary adenoma." }
      ]
    },
    {
      question: "Which anatomical structure houses the pituitary gland and is often eroded by an expanding adenoma?",
      bloomLevel: "Analysis",
      options: [
        { text: "Sella turcica", type: "correct", explanation: "A bony depression in the sphenoid bone." },
        { text: "Foramen magnum", type: "distractor", explanation: "This is the large opening at the base of the skull for the spinal cord." },
        { text: "Cribriform plate", type: "misconception", explanation: "This is part of the ethmoid bone involved in smell." },
        { text: "Cavernous sinus", type: "wrong", explanation: "The sinus is adjacent to the sella, but doesn't 'house' the gland." }
      ]
    },
    {
      question: "The term 'Sella Turcica' is derived from Latin meaning what?",
      bloomLevel: "Intuition",
      options: [
        { text: "Turkish Saddle", type: "correct", explanation: "The shape of the bone resembles a high-backed saddle used by Turks." },
        { text: "Secret Chamber", type: "distractor", explanation: "A poetic but incorrect translation." },
        { text: "Brain Cup", type: "misconception", explanation: "Incorrect; it refers specifically to a saddle." },
        { text: "Holy Seat", type: "wrong", explanation: "Incorrect; it has a secular, descriptive origin." }
      ]
    }
  ],
  "s2e3": [ // Psittacosis
    {
      question: "Psittacosis is caused by which obligate intracellular bacterium?",
      bloomLevel: "Recall",
      options: [
        { text: "Chlamydia psittaci", type: "correct", explanation: "It is a member of the Chlamydiaceae family." },
        { text: "Coxiella burnetii", type: "distractor", explanation: "This causes Q fever." },
        { text: "Mycoplasma pneumoniae", type: "misconception", explanation: "This causes 'walking' pneumonia but is not intracellular." },
        { text: "Legionella pneumophila", type: "wrong", explanation: "This causes Legionnaires' disease." }
      ]
    },
    {
      question: "How is Psittacosis typically transmitted to humans?",
      bloomLevel: "Understanding",
      options: [
        { text: "Inhalation of aerosolized bird droppings or respiratory secretions", type: "correct", explanation: "The bacteria are shed in the feces and nasal discharges of infected birds." },
        { text: "Consumption of undercooked poultry", type: "distractor", explanation: "It is a respiratory infection, not food-borne." },
        { text: "Bite from an infected parrot", type: "misconception", explanation: "While possible, aerosol inhalation is the primary route." },
        { text: "Direct skin contact with bird feathers", type: "wrong", explanation: "Inhalation is required for infection." }
      ]
    },
    {
      question: "A pet shop owner presents with high fever, severe headache, and a non-productive cough. Physical exam reveals splenomegaly. What is the most likely diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "Psittacosis", type: "correct", explanation: "The combination of atypical pneumonia and splenomegaly is a classic clue." },
        { text: "Influenza", type: "distractor", explanation: "Flu doesn't typically cause splenomegaly." },
        { text: "Streptococcal pneumonia", type: "misconception", explanation: "Strep causes productive cough and lobar consolidation." },
        { text: "Histoplasmosis", type: "wrong", explanation: "While it causes pneumonia, the bird exposure specifically points to Psittacosis." }
      ]
    },
    {
      question: "What are 'Horder's spots', sometimes seen in patients with Psittacosis?",
      bloomLevel: "Analysis",
      options: [
        { text: "Pink, maculopapular rash resembling rose spots", type: "correct", explanation: "These are rare but characteristic skin findings." },
        { text: "Small white spots on the oral mucosa", type: "distractor", explanation: "These are Koplik spots, seen in Measles." },
        { text: "Dark, necrotic ulcers on the fingers", type: "misconception", explanation: "This would suggest Tularemia or Plague." },
        { text: "Yellow deposits on the eyelids", type: "wrong", explanation: "These are xanthelasmas, associated with high cholesterol." }
      ]
    },
    {
      question: "Psittacosis is also commonly known by what other name?",
      bloomLevel: "Intuition",
      options: [
        { text: "Parrot Fever", type: "correct", explanation: "Psittacine birds (parrots, parakeets) are the most frequent source." },
        { text: "Bird Flu", type: "distractor", explanation: "Bird flu is caused by H5N1 or other influenza viruses." },
        { text: "Pigeon Lung", type: "misconception", explanation: "Pigeon lung is a hypersensitivity pneumonitis, not an infection." },
        { text: "Canary Cough", type: "wrong", explanation: "An invented name." }
      ]
    }
  ],
  "s2e4": [ // Nesidioblastoma
    {
      question: "Whipple's Triad, used to diagnose Insulinoma, consists of which three elements?",
      bloomLevel: "Recall",
      options: [
        { text: "Hypoglycemic symptoms, low blood glucose, and relief of symptoms with glucose", type: "correct", explanation: "This triad is the clinical cornerstone of diagnosis." },
        { text: "High insulin, high C-peptide, and high proinsulin", type: "distractor", explanation: "These are lab findings, not the clinical 'triad'." },
        { text: "Fasting, exercise, and confusion", type: "misconception", explanation: "These are triggers for symptoms, not the diagnostic triad." },
        { text: "Abdominal pain, jaundice, and weight loss", type: "wrong", explanation: "This is Courvoisier's sign/triad for pancreatic cancer." }
      ]
    },
    {
      question: "Why do patients with an Insulinoma often experience neuroglycopenic symptoms like confusion and seizures?",
      bloomLevel: "Understanding",
      options: [
        { text: "The brain depends almost exclusively on glucose for energy", type: "correct", explanation: "Low glucose leads to immediate brain dysfunction." },
        { text: "Insulin is directly toxic to neurons in high concentrations", type: "distractor", explanation: "The damage is from lack of fuel, not insulin toxicity." },
        { text: "The tumor produces a secondary neurotoxin", type: "misconception", explanation: "Symptoms are purely due to hypoglycemia." },
        { text: "Excess insulin causes brain swelling (edema)", type: "wrong", explanation: "Hypoglycemia doesn't cause edema; it causes metabolic failure." }
      ]
    },
    {
      question: "A patient with suspected Insulinoma has high serum insulin and high C-peptide levels. What does this indicate?",
      bloomLevel: "Application",
      options: [
        { text: "Endogenous insulin overproduction", type: "correct", explanation: "C-peptide is released in 1:1 ratio with endogenous insulin." },
        { text: "Exogenous insulin injection (factitious)", type: "distractor", explanation: "Exogenous insulin does not contain C-peptide." },
        { text: "Sulfonylurea abuse", type: "misconception", explanation: "Sulfonylureas also raise C-peptide; a drug screen is needed to differentiate." },
        { text: "Type 1 Diabetes", type: "wrong", explanation: "Type 1 involves low or absent insulin/C-peptide." }
      ]
    },
    {
      question: "Insulinomas are often described by the 'Rule of 10s'. Which of the following is NOT part of that rule?",
      bloomLevel: "Analysis",
      options: [
        { text: "10% are found in the liver", type: "correct", explanation: "The rule is: 10% malignant, 10% multiple, 10% associated with MEN1." },
        { text: "10% are malignant", type: "distractor", explanation: "This is part of the rule." },
        { text: "10% are multiple", type: "misconception", explanation: "This is part of the rule." },
        { text: "10% are associated with MEN1 syndrome", type: "wrong", explanation: "This is part of the rule." }
      ]
    },
    {
      question: "The term 'Nesidioblastoma' refers to the proliferation of which cells?",
      bloomLevel: "Intuition",
      options: [
        { text: "Islet cells from the pancreatic duct epithelium", type: "correct", explanation: "It refers to the 'nesidioblasts' or islet-forming cells." },
        { text: "Nerve cells within the pancreas", type: "distractor", explanation: "Incorrect; it's about islet cells." },
        { text: "Fat cells surrounding the pancreas", type: "misconception", explanation: "Incorrect; it's a neuroendocrine tumor." },
        { text: "Muscle cells of the pancreatic duct", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s2e5": [ // Radiation sickness
    {
      question: "Which unit is used to measure the amount of ionizing radiation absorbed by human tissue (dose equivalent)?",
      bloomLevel: "Recall",
      options: [
        { text: "Sievert (Sv)", type: "correct", explanation: "Sieverts account for the biological effect of different types of radiation." },
        { text: "Becquerel (Bq)", type: "distractor", explanation: "Becquerels measure the rate of radioactive decay (activity)." },
        { text: "Candela (cd)", type: "misconception", explanation: "Candelas measure luminous intensity (light)." },
        { text: "Newton (N)", type: "wrong", explanation: "Newtons measure force." }
      ]
    },
    {
      question: "Why is the hematopoietic system (bone marrow) the first to fail in moderate radiation exposure?",
      bloomLevel: "Understanding",
      options: [
        { text: "It contains rapidly dividing stem cells sensitive to DNA damage", type: "correct", explanation: "Radiation targets actively proliferating cells." },
        { text: "Bone marrow is physically closer to the skin surface", type: "distractor", explanation: "Radiation penetrates deeply; sensitivity is about cell turnover, not depth." },
        { text: "The blood acts as a conductor for radioactive particles", type: "misconception", explanation: "The blood carries cells, but the damage is to the marrow's DNA." },
        { text: "Radiation specifically binds to iron in hemoglobin", type: "wrong", explanation: "Radiation damages DNA, not hemoglobin iron." }
      ]
    },
    {
      question: "A victim of a laboratory accident presents with immediate nausea and vomiting. According to the 'Time to Emesis', what does this suggest about their prognosis?",
      bloomLevel: "Application",
      options: [
        { text: "A very high dose (>4-6 Gy) and a poor prognosis", type: "correct", explanation: "The faster the onset of vomiting, the higher the absorbed dose." },
        { text: "A low dose (<1 Gy) and an excellent prognosis", type: "distractor", explanation: "Low doses usually have delayed or no vomiting." },
        { text: "The patient is experiencing a psychological panic attack", type: "misconception", explanation: "While panic occurs, 'Time to Emesis' is a validated biological marker." },
        { text: "The patient has ingested a chemical toxin, not radiation", type: "wrong", explanation: "Radiation causes 'radiation-induced emesis' through CNS and GI triggers." }
      ]
    },
    {
      question: "Which laboratory parameter is the most reliable early indicator of the severity of radiation exposure?",
      bloomLevel: "Analysis",
      options: [
        { text: "Absolute Lymphocyte Count (ALC) at 48 hours", type: "correct", explanation: "A rapid drop in lymphocytes is highly predictive of the total dose." },
        { text: "Serum Creatinine", type: "distractor", explanation: "Kidneys are relatively radiation-resistant." },
        { text: "Blood Glucose", type: "misconception", explanation: "Glucose is not affected by acute radiation." },
        { text: "Platelet count at 2 hours", type: "wrong", explanation: "Platelets drop much later than lymphocytes." }
      ]
    },
    {
      question: "What is the 'Walking Ghost' phase in Acute Radiation Syndrome?",
      bloomLevel: "Intuition",
      options: [
        { text: "A period of apparent clinical improvement before final collapse", type: "correct", explanation: "The 'latent period' where the patient feels better while their cells are dying." },
        { text: "A state of delirium where the patient believes they are dead", type: "distractor", explanation: "This is Cotard's syndrome, not radiation sickness." },
        { text: "The pale appearance of the skin due to severe anemia", type: "misconception", explanation: "It refers to the clinical state, not just skin color." },
        { text: "A type of radiation that leaves no trace in the body", type: "wrong", explanation: "All ionizing radiation leaves biological traces." }
      ]
    }
  ],
  "s2e6": [ // Myasthenia gravis & Thymoma
    {
      question: "Myasthenia Gravis is caused by autoantibodies targeting which structure?",
      bloomLevel: "Recall",
      options: [
        { text: "Post-synaptic Acetylcholine (ACh) receptors", type: "correct", explanation: "Antibodies block or destroy the receptors at the neuromuscular junction." },
        { text: "Pre-synaptic Calcium channels", type: "distractor", explanation: "This is the target in Lambert-Eaton Myasthenic Syndrome." },
        { text: "Myelin sheath of peripheral nerves", type: "misconception", explanation: "This is the target in Guillain-Barré Syndrome." },
        { text: "Dopamine receptors in the substantia nigra", type: "wrong", explanation: "This is related to Parkinson's disease." }
      ]
    },
    {
      question: "Why do symptoms of Myasthenia Gravis typically worsen as the day progresses or with repetitive muscle use?",
      bloomLevel: "Understanding",
      options: [
        { text: "Depletion of available acetylcholine in the synaptic cleft", type: "correct", explanation: "Repetitive use exhausts the limited ACh supply that can reach the remaining receptors." },
        { text: "The body produces more antibodies in response to exercise", type: "distractor", explanation: "Antibody levels are relatively constant; it's a neurotransmitter issue." },
        { text: "Muscle fibers become physically torn from use", type: "misconception", explanation: "The defect is neurological/chemical, not structural muscle damage." },
        { text: "Lactic acid buildup blocks the receptors", type: "wrong", explanation: "Lactic acid causes fatigue, but not the specific MG weakness." }
      ]
    },
    {
      question: "A patient with drooping eyelids (ptosis) is given an injection of Edrophonium (Tensilon). Their ptosis immediately improves. What does this confirm?",
      bloomLevel: "Application",
      options: [
        { text: "A defect in neuromuscular transmission (likely MG)", type: "correct", explanation: "Tensilon is a short-acting acetylcholinesterase inhibitor that boosts ACh levels." },
        { text: "The patient has a brain tumor", type: "distractor", explanation: "Tensilon doesn't affect tumor-related symptoms." },
        { text: "The patient is faking their symptoms", type: "misconception", explanation: "The Tensilon test is an objective physiological response." },
        { text: "The patient has a Vitamin B12 deficiency", type: "wrong", explanation: "Tensilon has no effect on B12-related neuropathy." }
      ]
    },
    {
      question: "Which organ is frequently abnormal (hyperplastic or neoplastic) in patients with Myasthenia Gravis?",
      bloomLevel: "Analysis",
      options: [
        { text: "Thymus", type: "correct", explanation: "About 75% of MG patients have thymus abnormalities, including thymomas." },
        { text: "Thyroid", type: "distractor", explanation: "While autoimmune thyroid disease can co-occur, the Thymus is the primary link." },
        { text: "Adrenal gland", type: "misconception", explanation: "No direct link between MG and adrenal tumors." },
        { text: "Spleen", type: "wrong", explanation: "The spleen is involved in immunity but not specifically linked to MG pathogenesis like the thymus." }
      ]
    },
    {
      question: "The 'Ice Pack Test' is a simple bedside maneuver for MG. Why does cold improve the symptoms?",
      bloomLevel: "Intuition",
      options: [
        { text: "Cold inhibits the enzyme acetylcholinesterase", type: "correct", explanation: "Slowing down the breakdown of ACh allows it to stay in the cleft longer." },
        { text: "Cold numbs the pain of muscle contraction", type: "distractor", explanation: "MG is painless; the issue is weakness." },
        { text: "Cold causes the blood vessels to constrict, focusing antibodies", type: "misconception", explanation: "Vasoconstriction doesn't help; it's the enzyme inhibition that works." },
        { text: "Cold shocks the nerves into firing more rapidly", type: "wrong", explanation: "Cold actually slows nerve conduction, but helps the synapse." }
      ]
    }
  ],
  "s2e7": [ // Echinococcosis
    {
      question: "Which animal is the definitive host for Echinococcus granulosus, the tapeworm that causes Hydatid disease?",
      bloomLevel: "Recall",
      options: [
        { text: "Dogs", type: "correct", explanation: "Adult tapeworms live in the intestines of canines." },
        { text: "Sheep", type: "distractor", explanation: "Sheep are intermediate hosts (where the cysts form)." },
        { text: "Pigs", type: "misconception", explanation: "Pigs are hosts for Taenia solium, not Echinococcus." },
        { text: "Cats", type: "wrong", explanation: "Cats are not the primary definitive host for this species." }
      ]
    },
    {
      question: "Why is it considered dangerous to perform a needle aspiration of a suspected Hydatid cyst?",
      bloomLevel: "Understanding",
      options: [
        { text: "Leakage of cyst fluid can trigger fatal anaphylactic shock", type: "correct", explanation: "The fluid is highly antigenic to the human host." },
        { text: "The needle will cause the parasite to migrate to the brain", type: "distractor", explanation: "The parasite is trapped in the cyst; it doesn't 'migrate' upon puncture." },
        { text: "The cyst is under such high pressure it will explode", type: "misconception", explanation: "While under pressure, the danger is the immune reaction, not the 'explosion'." },
        { text: "The needle will become permanently stuck in the thick cyst wall", type: "wrong", explanation: "A mechanical impossibility." }
      ]
    },
    {
      question: "A shepherd from a rural area presents with right upper quadrant pain. Ultrasound shows a large, multiloculated 'daughter cyst' within the liver. What is the most likely diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "Echinococcosis (Hydatid Cyst)", type: "correct", explanation: "The 'daughter cyst' appearance is classic for Echinococcus." },
        { text: "Hepatocellular Carcinoma", type: "distractor", explanation: "Cancer usually appears as a solid mass, not a multiloculated cyst." },
        { text: "Amoebic Liver Abscess", type: "misconception", explanation: "Abscesses are usually single and contain 'anchovy paste' pus, not daughter cysts." },
        { text: "Simple Hepatic Cyst", type: "wrong", explanation: "Simple cysts are unilocular and don't have internal structures." }
      ]
    },
    {
      question: "What is the 'Water Lily Sign' on imaging of a Hydatid cyst?",
      bloomLevel: "Analysis",
      options: [
        { text: "Detached endocyst membranes floating in the cyst fluid", type: "correct", explanation: "This indicates a ruptured or collapsing cyst." },
        { text: "A specific pattern of calcification in the cyst wall", type: "distractor", explanation: "Calcification is common but is not the 'water lily' sign." },
        { text: "The way the cyst displaces the gallbladder", type: "misconception", explanation: "Incorrect; it refers to internal membranes." },
        { text: "A ring of inflammation surrounding the cyst", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "The 'sand' found inside a Hydatid cyst consists of what?",
      bloomLevel: "Intuition",
      options: [
        { text: "Brood capsules and protoscolices", type: "correct", explanation: "This 'hydatid sand' is the infectious material." },
        { text: "Actual grains of silica from the environment", type: "distractor", explanation: "It's biological material, not actual sand." },
        { text: "Calcified remains of dead parasites", type: "misconception", explanation: "Sand is present in viable, living cysts." },
        { text: "Waste products from the parasite's metabolism", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s2e8": [ // Behcet's disease
    {
      question: "Behcet's disease is classically defined by which clinical triad?",
      bloomLevel: "Recall",
      options: [
        { text: "Oral ulcers, Genital ulcers, and Uveitis", type: "correct", explanation: "This is the 'Triple Symptom Complex'." },
        { text: "Fever, Rash, and Joint pain", type: "distractor", explanation: "This is too non-specific and fits many diseases." },
        { text: "Hypertension, Proteinuria, and Edema", type: "misconception", explanation: "This is the triad for Preeclampsia." },
        { text: "Jaundice, RUQ pain, and Fever", type: "wrong", explanation: "This is Charcot's triad for cholangitis." }
      ]
    },
    {
      question: "What is the 'Pathergy Test' used in the diagnosis of Behcet's?",
      bloomLevel: "Understanding",
      options: [
        { text: "A skin prick that develops a papule or pustule within 48 hours", type: "correct", explanation: "It demonstrates the hyper-reactivity of the skin to minor trauma." },
        { text: "A blood test for specific anti-skin antibodies", type: "distractor", explanation: "Behcet's has no specific diagnostic antibody." },
        { text: "A test of the patient's reaction to bright light", type: "misconception", explanation: "While uveitis causes photophobia, this is not the 'pathergy' test." },
        { text: "A biopsy of the oral ulcers", type: "wrong", explanation: "Biopsy shows non-specific vasculitis, not a specific 'pathergy' response." }
      ]
    },
    {
      question: "A 30-year-old man of Mediterranean descent presents with recurrent, painful mouth sores and a red, painful eye. What genetic marker is most strongly associated with this condition?",
      bloomLevel: "Application",
      options: [
        { text: "HLA-B51", type: "correct", explanation: "This marker is highly prevalent in patients along the 'Silk Road'." },
        { text: "HLA-B27", type: "distractor", explanation: "HLA-B27 is associated with Ankylosing Spondylitis and Reiter's." },
        { text: "BRCA1", type: "misconception", explanation: "BRCA1 is associated with breast and ovarian cancer." },
        { text: "HLA-DR4", type: "wrong", explanation: "HLA-DR4 is associated with Rheumatoid Arthritis." }
      ]
    },
    {
      question: "Which type of blood vessel is primarily affected by the vasculitis in Behcet's disease?",
      bloomLevel: "Analysis",
      options: [
        { text: "All sizes of both arteries and veins", type: "correct", explanation: "Behcet's is unique in its ability to affect vessels of all sizes on both sides of the circulation." },
        { text: "Only large elastic arteries (like the aorta)", type: "distractor", explanation: "This describes Takayasu arteritis." },
        { text: "Only small capillaries in the skin", type: "misconception", explanation: "It is much more systemic than just small vessels." },
        { text: "Only the coronary arteries", type: "wrong", explanation: "This describes Kawasaki disease." }
      ]
    },
    {
      question: "Behcet's disease is often referred to as the 'Silk Road Disease' because of what?",
      bloomLevel: "Intuition",
      options: [
        { text: "Its highest prevalence is in populations along the ancient trade route", type: "correct", explanation: "From East Asia to the Mediterranean." },
        { text: "The skin ulcers have a smooth, silk-like appearance", type: "distractor", explanation: "The ulcers are painful and ragged, not silky." },
        { text: "It was first discovered in a silk merchant", type: "misconception", explanation: "It was named after Hulusi Behçet, a Turkish dermatologist." },
        { text: "The treatment involves wearing silk clothing to reduce irritation", type: "wrong", explanation: "A creative but incorrect guess." }
      ]
    }
  ],
  "s2e9": [ // Clostridium perfringens & Münchausen syndrome
    {
      question: "Clostridium perfringens is the most common cause of which life-threatening soft tissue infection?",
      bloomLevel: "Recall",
      options: [
        { text: "Gas Gangrene (Clostridial Myonecrosis)", type: "correct", explanation: "It produces gas and toxins that rapidly destroy muscle." },
        { text: "Necrotizing Fasciitis (Type 1)", type: "distractor", explanation: "This is usually polymicrobial or caused by Group A Strep." },
        { text: "Erysipelas", type: "misconception", explanation: "This is a superficial skin infection caused by Strep." },
        { text: "Toxic Shock Syndrome", type: "wrong", explanation: "This is caused by Staph or Strep toxins." }
      ]
    },
    {
      question: "What is the primary toxin produced by C. perfringens that causes cell membrane destruction?",
      bloomLevel: "Understanding",
      options: [
        { text: "Alpha Toxin (Lecithinase)", type: "correct", explanation: "It breaks down lecithin in cell membranes, causing massive tissue death." },
        { text: "Tetanospasmin", type: "distractor", explanation: "This is produced by C. tetani." },
        { text: "Botulinum toxin", type: "misconception", explanation: "This is produced by C. botulinum." },
        { text: "Enterotoxin B", type: "wrong", explanation: "This is produced by Staph aureus." }
      ]
    },
    {
      question: "A patient presents with a rapidly spreading wound infection. On palpation, a 'crackling' sensation (crepitus) is felt under the skin. What does this indicate?",
      bloomLevel: "Application",
      options: [
        { text: "Gas production by anaerobic bacteria", type: "correct", explanation: "C. perfringens ferments carbohydrates, producing gas in the tissues." },
        { text: "The patient has broken bones in the area", type: "distractor", explanation: "Crepitus in infection is gas; in trauma, it's bone fragments." },
        { text: "The skin is extremely dry and peeling", type: "misconception", explanation: "This is a deep tissue finding, not a surface one." },
        { text: "Air is leaking from a nearby lung injury", type: "wrong", explanation: "This would be subcutaneous emphysema, usually in the chest/neck." }
      ]
    },
    {
      question: "In the context of 'Münchausen Syndrome', why might a patient intentionally infect themselves with C. perfringens?",
      bloomLevel: "Analysis",
      options: [
        { text: "To assume the 'sick role' and gain medical attention", type: "correct", explanation: "This is a primary psychiatric drive in factitious disorders." },
        { text: "To commit suicide in a slow and painful way", type: "distractor", explanation: "The goal is attention/care, not necessarily death." },
        { text: "Because they believe the bacteria will cure a different disease", type: "misconception", explanation: "This would be a delusion, not Münchausen." },
        { text: "To sue the hospital for a 'surgical site infection'", type: "wrong", explanation: "This is malingering (for secondary gain), not Münchausen." }
      ]
    },
    {
      question: "Münchausen Syndrome is named after a fictionalized version of a real person. Who was he?",
      bloomLevel: "Intuition",
      options: [
        { text: "A German Baron known for telling tall tales", type: "correct", explanation: "Baron von Münchhausen was famous for his impossible stories." },
        { text: "A famous 19th-century surgeon", type: "distractor", explanation: "Incorrect; it's a literary reference." },
        { text: "The first patient ever diagnosed with the condition", type: "misconception", explanation: "Incorrect; the term was coined by Richard Asher in 1951." },
        { text: "A character in a Shakespearean play", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s2e10": [ // Malaria
    {
      question: "Which species of Plasmodium is responsible for the most severe and lethal form of Malaria?",
      bloomLevel: "Recall",
      options: [
        { text: "Plasmodium falciparum", type: "correct", explanation: "It causes microvascular sequestration and cerebral malaria." },
        { text: "Plasmodium vivax", type: "distractor", explanation: "Vivax is common but usually less lethal (though it can relapse)." },
        { text: "Plasmodium malariae", type: "misconception", explanation: "This causes a milder, chronic form." },
        { text: "Plasmodium ovale", type: "wrong", explanation: "Ovale is similar to vivax and less common." }
      ]
    },
    {
      question: "What physiological event triggers the characteristic paroxysmal fevers and chills in Malaria?",
      bloomLevel: "Understanding",
      options: [
        { text: "Synchronized rupture of red blood cells releasing merozoites", type: "correct", explanation: "The release of parasites and toxins triggers a massive immune response." },
        { text: "The parasite's migration into the liver", type: "distractor", explanation: "The liver phase (exoerythrocytic) is asymptomatic." },
        { text: "The mosquito bite itself injecting toxins", type: "misconception", explanation: "The bite is just the transmission; symptoms take days to develop." },
        { text: "The body's attempt to sweat out the parasite", type: "wrong", explanation: "Sweating is the 'cooling' phase after the fever peaks." }
      ]
    },
    {
      question: "A traveler returning from Nigeria presents with cyclical fevers every 48 hours. A blood smear shows 'ring forms' inside red blood cells. What is the gold standard for diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "Thick and thin blood smears", type: "correct", explanation: "Thick smears detect the parasite; thin smears identify the species." },
        { text: "Rapid Diagnostic Test (RDT) for antigens", type: "distractor", explanation: "RDTs are fast but less sensitive/specific than microscopy." },
        { text: "PCR for Plasmodium DNA", type: "misconception", explanation: "PCR is highly sensitive but often too slow/expensive for routine clinical use." },
        { text: "Liver biopsy", type: "wrong", explanation: "Biopsy is not used for malaria diagnosis." }
      ]
    },
    {
      question: "Why is P. falciparum uniquely dangerous compared to other Malaria species?",
      bloomLevel: "Analysis",
      options: [
        { text: "It causes infected RBCs to stick to capillary walls (sequestration)", type: "correct", explanation: "This leads to organ ischemia and cerebral malaria." },
        { text: "It can survive in the liver for years (hypnozoites)", type: "distractor", explanation: "This is a feature of P. vivax and P. ovale, not falciparum." },
        { text: "It is the only species that can be transmitted by mosquitoes", type: "misconception", explanation: "All human malaria is transmitted by Anopheles mosquitoes." },
        { text: "It produces a toxin that directly stops the heart", type: "wrong", explanation: "The damage is microvascular, not a direct cardiotoxin." }
      ]
    },
    {
      question: "The name 'Malaria' comes from the Italian 'mal aria', which means what?",
      bloomLevel: "Intuition",
      options: [
        { text: "Bad Air", type: "correct", explanation: "Before the discovery of parasites, it was thought to be caused by swamp vapors." },
        { text: "Sick Blood", type: "distractor", explanation: "A logical but incorrect translation." },
        { text: "Death Fly", type: "misconception", explanation: "Incorrect." },
        { text: "Hot Fever", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s3e2": [ // Chimerism
    {
      question: "In the context of genetics, what is a 'chimera'?",
      bloomLevel: "Recall",
      options: [
        { text: "An organism composed of cells from two or more different zygotes", type: "correct", explanation: "This usually occurs when two embryos fuse in early development." },
        { text: "An organism with a single mutation in every cell", type: "distractor", explanation: "This is a standard genetic mutation, not chimerism." },
        { text: "An organism that can change its DNA at will", type: "misconception", explanation: "DNA is stable; chimerism is about having different cell lines, not changing them." },
        { text: "A hybrid between two different species", type: "wrong", explanation: "This is a hybrid (like a mule), not a chimera." }
      ]
    },
    {
      question: "How can chimerism lead to a 'mismatch' in maternity or paternity testing?",
      bloomLevel: "Understanding",
      options: [
        { text: "The DNA in the blood may differ from the DNA in the germ cells (eggs/sperm)", type: "correct", explanation: "If the blood and gonads come from different original zygotes, the tests will conflict." },
        { text: "The child's DNA is a perfect copy of only one parent", type: "distractor", explanation: "This would be parthenogenesis, not chimerism." },
        { text: "The testing equipment is unable to read chimeric DNA", type: "misconception", explanation: "Equipment reads it fine; the result just doesn't match the expected parentage." },
        { text: "Chimeras do not have DNA in their blood", type: "wrong", explanation: "All nucleated cells have DNA." }
      ]
    },
    {
      question: "A patient requires a bone marrow transplant. After a successful engraftment, what type of chimerism does the patient now possess?",
      bloomLevel: "Application",
      options: [
        { text: "Microchimerism", type: "distractor", explanation: "Microchimerism refers to a very small number of foreign cells (like fetal cells in a mother)." },
        { text: "Iatrogenic chimerism", type: "correct", explanation: "This is chimerism induced by medical treatment (transplant)." },
        { text: "Tetragametic chimerism", type: "misconception", explanation: "This is the 'natural' fusion of four gametes (two embryos)." },
        { text: "Germline chimerism", type: "wrong", explanation: "This refers specifically to different DNA in the reproductive cells." }
      ]
    },
    {
      question: "Which of the following is a potential physical sign of tetragametic chimerism in humans?",
      bloomLevel: "Analysis",
      options: [
        { text: "Blaschko's lines or heterochromia (different colored eyes)", type: "correct", explanation: "Different cell lines can manifest as different pigmentation patterns." },
        { text: "Having two hearts", type: "distractor", explanation: "Chimerism is cellular, not organ duplication." },
        { text: "Growing extra limbs", type: "misconception", explanation: "This is usually related to conjoined twins or developmental errors, not simple chimerism." },
        { text: "The ability to breathe underwater", type: "wrong", explanation: "Purely fictional." }
      ]
    },
    {
      question: "The term 'Chimera' originates from Greek mythology. What was the original Chimera?",
      bloomLevel: "Intuition",
      options: [
        { text: "A fire-breathing creature with parts of a lion, goat, and snake", type: "correct", explanation: "A single body composed of multiple distinct animals." },
        { text: "A man with the head of a bull", type: "distractor", explanation: "This is the Minotaur." },
        { text: "A woman with snakes for hair", type: "misconception", explanation: "This is Medusa (a Gorgon)." },
        { text: "A horse with a single horn", type: "wrong", explanation: "This is a Unicorn." }
      ]
    }
  ],
  "s3e3": [ // Amyloidosis
    {
      question: "Amyloidosis is characterized by the extracellular deposition of what?",
      bloomLevel: "Recall",
      options: [
        { text: "Misfolded proteins in a beta-pleated sheet configuration", type: "correct", explanation: "These insoluble fibrils disrupt normal organ function." },
        { text: "Excessive calcium deposits", type: "distractor", explanation: "This is calcification." },
        { text: "Cholesterol plaques", type: "misconception", explanation: "This is atherosclerosis." },
        { text: "Iron-rich pigments", type: "wrong", explanation: "This is hemosiderosis." }
      ]
    },
    {
      question: "Why is 'Congo Red' staining used to identify amyloid in tissue samples?",
      bloomLevel: "Understanding",
      options: [
        { text: "Amyloid fibrils show apple-green birefringence under polarized light", type: "correct", explanation: "The dye binds to the beta-sheets and creates this unique optical property." },
        { text: "The dye turns blue in the presence of amyloid", type: "distractor", explanation: "It turns red/pink, and then green under polarized light." },
        { text: "Amyloid is the only substance that absorbs Congo Red", type: "misconception", explanation: "Other things can stain red, but only amyloid shows the green birefringence." },
        { text: "The dye dissolves the amyloid for easier viewing", type: "wrong", explanation: "It's a stain, not a solvent." }
      ]
    },
    {
      question: "A patient with long-standing Multiple Myeloma develops heart failure and macroglossia (enlarged tongue). Which type of amyloidosis is most likely?",
      bloomLevel: "Application",
      options: [
        { text: "AL (Light Chain) Amyloidosis", type: "correct", explanation: "Multiple myeloma produces excess light chains that form amyloid." },
        { text: "AA (Secondary) Amyloidosis", type: "distractor", explanation: "AA is associated with chronic inflammation (like RA or Crohn's)." },
        { text: "ATTR (Transthyretin) Amyloidosis", type: "misconception", explanation: "ATTR is often hereditary or age-related (senile)." },
        { text: "Aβ Amyloidosis", type: "wrong", explanation: "This is associated with Alzheimer's disease in the brain." }
      ]
    },
    {
      question: "Which organ is most commonly affected in AA (Secondary) Amyloidosis?",
      bloomLevel: "Analysis",
      options: [
        { text: "Kidneys", type: "correct", explanation: "Renal involvement (nephrotic syndrome) is the most frequent presentation of AA." },
        { text: "Brain", type: "distractor", explanation: "Systemic amyloidosis rarely crosses the blood-brain barrier." },
        { text: "Skin", type: "misconception", explanation: "While skin can be involved, it is not the primary site for AA." },
        { text: "Lungs", type: "wrong", explanation: "Pulmonary amyloidosis is relatively rare compared to renal." }
      ]
    },
    {
      question: "The term 'Amyloid' was coined by Rudolf Virchow, who mistakenly thought the substance was what?",
      bloomLevel: "Intuition",
      options: [
        { text: "Starch", type: "correct", explanation: "From the Greek 'amylon' (starch), because it stained similarly with iodine." },
        { text: "Fat", type: "distractor", explanation: "Incorrect." },
        { text: "Bone", type: "misconception", explanation: "Incorrect." },
        { text: "Muscle", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s3e4": [ // Baylisascaris
    {
      question: "Baylisascaris procyonis is a roundworm typically found in which definitive host?",
      bloomLevel: "Recall",
      options: [
        { text: "Raccoons", type: "correct", explanation: "It is commonly known as the raccoon roundworm." },
        { text: "Dogs", type: "distractor", explanation: "Dogs host Toxocara canis." },
        { text: "Cats", type: "misconception", explanation: "Cats host Toxocara cati." },
        { text: "Pigs", type: "wrong", explanation: "Pigs host Ascaris suum." }
      ]
    },
    {
      question: "Why is Baylisascaris infection particularly dangerous in humans (accidental intermediate hosts)?",
      bloomLevel: "Understanding",
      options: [
        { text: "The larvae continue to grow as they migrate through the brain and eyes", type: "correct", explanation: "Unlike other roundworms, Baylisascaris larvae are large and destructive." },
        { text: "The adult worms live in the human heart", type: "distractor", explanation: "Humans are intermediate hosts; the worms don't reach adulthood." },
        { text: "The parasite produces a neurotoxin that causes paralysis", type: "misconception", explanation: "Damage is mechanical (migration) and inflammatory, not toxic." },
        { text: "The eggs hatch into adult worms immediately upon ingestion", type: "wrong", explanation: "Eggs hatch into larvae, which then migrate." }
      ]
    },
    {
      question: "A toddler who frequently plays in a backyard with raccoon latrines presents with sudden onset of lethargy, ataxia, and loss of vision. What is the most likely diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "Neural Larva Migrans (Baylisascariasis)", type: "correct", explanation: "The exposure and severe CNS/ocular symptoms are highly suggestive." },
        { text: "Bacterial Meningitis", type: "distractor", explanation: "Meningitis usually presents with high fever and stiff neck, not progressive ataxia/vision loss." },
        { text: "Lead Poisoning", type: "misconception", explanation: "Lead causes cognitive decline but not acute vision loss or severe ataxia." },
        { text: "Cerebral Palsy", type: "wrong", explanation: "Cerebral palsy is a non-progressive developmental disorder." }
      ]
    },
    {
      question: "Which laboratory finding is commonly seen in systemic helminthic infections like Baylisascariasis?",
      bloomLevel: "Analysis",
      options: [
        { text: "Eosinophilia", type: "correct", explanation: "The immune system increases eosinophils to fight multicellular parasites." },
        { text: "Neutrophilia", type: "distractor", explanation: "This is more common in bacterial infections." },
        { text: "Lymphocytosis", type: "misconception", explanation: "This is more common in viral infections." },
        { text: "Thrombocytopenia", type: "wrong", explanation: "Low platelets are not a hallmark of helminthic infection." }
      ]
    },
    {
      question: "Why are Baylisascaris eggs extremely difficult to eliminate from the environment?",
      bloomLevel: "Intuition",
      options: [
        { text: "They have a thick, resistant shell that survives for years in soil", type: "correct", explanation: "They are resistant to most common disinfectants, including bleach." },
        { text: "They are invisible to the naked eye", type: "distractor", explanation: "While true, this doesn't explain their environmental persistence." },
        { text: "They can fly through the air on wind currents", type: "misconception", explanation: "They are heavy and stay in the soil/feces." },
        { text: "They are protected by the raccoons themselves", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s3e5": [ // Hereditary Angioedema
    {
      question: "Hereditary Angioedema (HAE) is most commonly caused by a deficiency or dysfunction of which protein?",
      bloomLevel: "Recall",
      options: [
        { text: "C1 esterase inhibitor (C1-INH)", type: "correct", explanation: "C1-INH regulates the complement, contact, and fibrinolytic systems." },
        { text: "Complement C3", type: "distractor", explanation: "C3 deficiency leads to recurrent bacterial infections." },
        { text: "Factor VIII", type: "misconception", explanation: "Factor VIII deficiency causes Hemophilia A." },
        { text: "Albumin", type: "wrong", explanation: "Low albumin causes generalized edema, not localized angioedema." }
      ]
    },
    {
      question: "What is the primary mediator of swelling in Hereditary Angioedema?",
      bloomLevel: "Understanding",
      options: [
        { text: "Bradykinin", type: "correct", explanation: "Lack of C1-INH leads to overproduction of bradykinin, which increases vascular permeability." },
        { text: "Histamine", type: "distractor", explanation: "Histamine is the mediator in allergic angioedema, but not HAE." },
        { text: "Serotonin", type: "misconception", explanation: "Serotonin is involved in mood and clotting, not HAE swelling." },
        { text: "Leukotrienes", type: "wrong", explanation: "Leukotrienes are involved in asthma and inflammation." }
      ]
    },
    {
      question: "A patient presents with recurrent episodes of abdominal pain and facial swelling. They note that antihistamines and steroids do not help. What is the most likely diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "Hereditary Angioedema", type: "correct", explanation: "The lack of response to allergy medications is a key diagnostic clue for bradykinin-mediated swelling." },
        { text: "Anaphylaxis", type: "distractor", explanation: "Anaphylaxis responds to epinephrine and antihistamines and usually has a rash." },
        { text: "Food Allergy", type: "misconception", explanation: "Allergies are histamine-mediated and usually involve hives (urticaria)." },
        { text: "Irritable Bowel Syndrome", type: "wrong", explanation: "IBS causes pain but not facial swelling." }
      ]
    },
    {
      question: "Why is the use of ACE inhibitors strictly contraindicated in patients with HAE?",
      bloomLevel: "Analysis",
      options: [
        { text: "ACE inhibitors prevent the breakdown of bradykinin", type: "correct", explanation: "This can trigger a life-threatening attack by further increasing bradykinin levels." },
        { text: "ACE inhibitors cause a direct allergic reaction", type: "distractor", explanation: "It's a biochemical interaction, not an allergy." },
        { text: "ACE inhibitors lower blood pressure too much in HAE patients", type: "misconception", explanation: "The danger is the swelling, not the blood pressure effect." },
        { text: "ACE inhibitors interfere with C1-INH replacement therapy", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Which of the following is a characteristic feature of HAE swelling that distinguishes it from allergic swelling?",
      bloomLevel: "Intuition",
      options: [
        { text: "Absence of urticaria (hives) and itching", type: "correct", explanation: "HAE is non-pruritic and does not involve wheals." },
        { text: "The swelling is always blue in color", type: "distractor", explanation: "Swelling is usually skin-colored or slightly pale." },
        { text: "The swelling only happens on the left side of the body", type: "misconception", explanation: "Incorrect." },
        { text: "The swelling disappears within minutes", type: "wrong", explanation: "HAE swelling typically lasts 2-5 days." }
      ]
    }
  ],
  "s3e6": [ // Small-cell carcinoma
    {
      question: "Small-cell lung carcinoma (SCLC) is strongly associated with which risk factor?",
      bloomLevel: "Recall",
      options: [
        { text: "Cigarette smoking", type: "correct", explanation: "Over 95% of SCLC patients have a significant smoking history." },
        { text: "Asbestos exposure", type: "distractor", explanation: "Asbestos is more linked to mesothelioma and adenocarcinoma." },
        { text: "Radon gas", type: "misconception", explanation: "Radon is the second leading cause of lung cancer but is less specific for SCLC than smoking." },
        { text: "Tuberculosis", type: "wrong", explanation: "TB is not a primary risk factor for SCLC." }
      ]
    },
    {
      question: "Why is SCLC often associated with paraneoplastic syndromes like SIADH or Cushing's?",
      bloomLevel: "Understanding",
      options: [
        { text: "The tumor cells are derived from neuroendocrine cells and can secrete hormones", type: "correct", explanation: "SCLC is a high-grade neuroendocrine tumor." },
        { text: "The tumor invades the pituitary gland directly", type: "distractor", explanation: "The hormones are produced by the lung tumor itself (ectopic production)." },
        { text: "The chemotherapy used to treat SCLC causes hormone imbalances", type: "misconception", explanation: "The syndromes often appear *before* treatment starts." },
        { text: "The patient's immune system attacks their own endocrine glands", type: "wrong", explanation: "While some paraneoplastic syndromes are immune-mediated (like Lambert-Eaton), SIADH/Cushing's are usually ectopic hormone production." }
      ]
    },
    {
      question: "A heavy smoker presents with a central lung mass and a sodium level of 120 mEq/L. What is the most likely paraneoplastic explanation?",
      bloomLevel: "Application",
      options: [
        { text: "SIADH (Syndrome of Inappropriate Antidiuretic Hormone)", type: "correct", explanation: "Ectopic ADH production leads to water retention and hyponatremia." },
        { text: "Diabetes Insipidus", type: "distractor", explanation: "DI causes high sodium (hypernatremia) due to water loss." },
        { text: "Hypercalcemia of malignancy", type: "misconception", explanation: "This is more common in squamous cell carcinoma (PTHrP production)." },
        { text: "Addison's Disease", type: "wrong", explanation: "Addison's causes low sodium but is due to adrenal failure, not a lung tumor." }
      ]
    },
    {
      question: "What is the 'Lambert-Eaton Myasthenic Syndrome' (LEMS) often seen in SCLC?",
      bloomLevel: "Analysis",
      options: [
        { text: "Antibodies against pre-synaptic voltage-gated calcium channels", type: "correct", explanation: "This leads to muscle weakness that *improves* with use." },
        { text: "Antibodies against post-synaptic acetylcholine receptors", type: "distractor", explanation: "This describes Myasthenia Gravis." },
        { text: "Direct invasion of the spinal cord by the tumor", type: "misconception", explanation: "LEMS is an autoimmune paraneoplastic process." },
        { text: "A side effect of radiation therapy to the chest", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "SCLC is often referred to as 'Oat Cell Carcinoma' because of what?",
      bloomLevel: "Intuition",
      options: [
        { text: "The flattened, oval shape of the cells under a microscope", type: "correct", explanation: "They resemble grains of oats." },
        { text: "The tumor primarily affects people who eat a lot of oats", type: "distractor", explanation: "Incorrect." },
        { text: "The tumor feels like oatmeal when palpated", type: "misconception", explanation: "Incorrect." },
        { text: "The cells produce a substance that smells like oats", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s3e7": [ // MERRF syndrome
    {
      question: "MERRF syndrome is a disorder of which cellular organelle?",
      bloomLevel: "Recall",
      options: [
        { text: "Mitochondria", type: "correct", explanation: "MERRF stands for Myoclonic Epilepsy with Ragged Red Fibers." },
        { text: "Lysosomes", type: "distractor", explanation: "Lysosomal disorders include Gaucher or Tay-Sachs." },
        { text: "Endoplasmic Reticulum", type: "misconception", explanation: "Incorrect." },
        { text: "Nucleus", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the inheritance pattern of MERRF syndrome?",
      bloomLevel: "Understanding",
      options: [
        { text: "Maternal inheritance", type: "correct", explanation: "Mitochondrial DNA is passed exclusively from the mother to all her children." },
        { text: "Autosomal Dominant", type: "distractor", explanation: "Incorrect." },
        { text: "X-linked Recessive", type: "misconception", explanation: "Incorrect." },
        { text: "Paternal inheritance", type: "wrong", explanation: "Sperm do not contribute mitochondria to the zygote." }
      ]
    },
    {
      question: "A patient presents with myoclonus, ataxia, and generalized seizures. A muscle biopsy is performed. What characteristic finding is expected?",
      bloomLevel: "Application",
      options: [
        { text: "Ragged Red Fibers (Gomori trichrome stain)", type: "correct", explanation: "These represent subsarcolemmal accumulation of abnormal mitochondria." },
        { text: "Negri bodies", type: "distractor", explanation: "These are seen in Rabies." },
        { text: "Lewy bodies", type: "misconception", explanation: "These are seen in Parkinson's disease." },
        { text: "Psammoma bodies", type: "wrong", explanation: "These are calcifications seen in certain cancers." }
      ]
    },
    {
      question: "What is 'Heteroplasmy' in the context of mitochondrial diseases like MERRF?",
      bloomLevel: "Analysis",
      options: [
        { text: "The presence of both normal and mutated mitochondrial DNA within a single cell", type: "correct", explanation: "The ratio of normal to mutant DNA determines the severity of the disease." },
        { text: "The ability of mitochondria to change their shape", type: "distractor", explanation: "Incorrect." },
        { text: "The transfer of DNA from the nucleus to the mitochondria", type: "misconception", explanation: "Incorrect." },
        { text: "A cell having only one type of mitochondrial DNA", type: "wrong", explanation: "This is homoplasmy." }
      ]
    },
    {
      question: "Why are organs like the brain and muscles most severely affected in MERRF?",
      bloomLevel: "Intuition",
      options: [
        { text: "They have the highest energy (ATP) requirements", type: "correct", explanation: "Mitochondrial failure hits energy-hungry tissues first." },
        { text: "They are the only organs that contain mitochondria", type: "distractor", explanation: "All nucleated cells contain mitochondria." },
        { text: "The mutation only exists in those specific tissues", type: "misconception", explanation: "The mutation is systemic, but the impact is tissue-specific." },
        { text: "Those organs are physically closer to the heart", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s3e8": [ // Chronic granulomatous disease
    {
      question: "Chronic Granulomatous Disease (CGD) is caused by a defect in which enzyme complex?",
      bloomLevel: "Recall",
      options: [
        { text: "NADPH oxidase", type: "correct", explanation: "This enzyme is responsible for the 'respiratory burst' in phagocytes." },
        { text: "Myeloperoxidase", type: "distractor", explanation: "Myeloperoxidase deficiency is a separate, milder disorder." },
        { text: "Adenosine deaminase", type: "misconception", explanation: "This is deficient in one form of SCID." },
        { text: "Glucose-6-phosphate dehydrogenase", type: "wrong", explanation: "G6PD deficiency affects RBCs and causes hemolysis." }
      ]
    },
    {
      question: "Why are patients with CGD specifically susceptible to 'Catalase-positive' organisms?",
      bloomLevel: "Understanding",
      options: [
        { text: "Catalase-positive organisms destroy the small amount of H2O2 the host produces", type: "correct", explanation: "Phagocytes in CGD can't make their own H2O2; they can only use the parasite's H2O2 unless the parasite has catalase to destroy it." },
        { text: "Catalase-positive organisms are the only ones that can enter the body", type: "distractor", explanation: "Incorrect." },
        { text: "The host's immune system is allergic to catalase", type: "misconception", explanation: "Incorrect." },
        { text: "Catalase acts as a growth factor for the bacteria", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A young boy presents with recurrent skin abscesses and lymphadenitis. A Nitroblue Tetrazolium (NBT) test is performed and the cells remain yellow (negative). What does this confirm?",
      bloomLevel: "Application",
      options: [
        { text: "Chronic Granulomatous Disease", type: "correct", explanation: "In CGD, neutrophils cannot reduce NBT to blue formazan due to lack of superoxide." },
        { text: "Normal immune function", type: "distractor", explanation: "Normal cells turn blue." },
        { text: "HIV infection", type: "misconception", explanation: "NBT test is not used for HIV." },
        { text: "Iron deficiency anemia", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Which of the following is a common cause of infection in CGD patients?",
      bloomLevel: "Analysis",
      options: [
        { text: "Staphylococcus aureus", type: "correct", explanation: "Staph is a classic catalase-positive pathogen." },
        { text: "Streptococcus pneumoniae", type: "distractor", explanation: "Strep is catalase-negative, so CGD patients can usually handle it." },
        { text: "Haemophilus influenzae", type: "misconception", explanation: "Incorrect." },
        { text: "Neisseria meningitidis", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "The name 'Granulomatous' in CGD refers to what clinical finding?",
      bloomLevel: "Intuition",
      options: [
        { text: "The formation of nodules of immune cells due to inability to clear infections", type: "correct", explanation: "The body tries to wall off the pathogens it cannot kill." },
        { text: "The grainy appearance of the patient's skin", type: "distractor", explanation: "Incorrect." },
        { text: "The presence of sand-like particles in the urine", type: "misconception", explanation: "Incorrect." },
        { text: "The way the bacteria look under a microscope", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s3e9": [ // Erythropoietic protoporphyria
    {
      question: "Erythropoietic Protoporphyria (EPP) is caused by a deficiency in which enzyme of the heme synthesis pathway?",
      bloomLevel: "Recall",
      options: [
        { text: "Ferrochelatase", type: "correct", explanation: "This enzyme inserts iron into protoporphyrin IX to form heme." },
        { text: "ALA synthase", type: "distractor", explanation: "Incorrect." },
        { text: "Uroporphyrinogen decarboxylase", type: "misconception", explanation: "This is deficient in Porphyria Cutanea Tarda." },
        { text: "PBG deaminase", type: "wrong", explanation: "This is deficient in Acute Intermittent Porphyria." }
      ]
    },
    {
      question: "What is the primary clinical manifestation of EPP?",
      bloomLevel: "Understanding",
      options: [
        { text: "Immediate, painful cutaneous photosensitivity", type: "correct", explanation: "Exposure to sunlight causes intense burning and stinging of the skin." },
        { text: "Severe abdominal pain and psychosis", type: "distractor", explanation: "This describes Acute Intermittent Porphyria." },
        { text: "Chronic blistering and scarring of the hands", type: "misconception", explanation: "This describes Porphyria Cutanea Tarda." },
        { text: "Progressive muscle weakness", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A child screams in pain whenever they are taken outside, even for a few minutes. There are no visible blisters or rashes initially. What is the most likely diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "Erythropoietic Protoporphyria", type: "correct", explanation: "The 'burning' pain without immediate visible signs is a hallmark of EPP." },
        { text: "Solar Urticaria", type: "distractor", explanation: "Urticaria causes visible hives." },
        { text: "Polymorphous Light Eruption", type: "misconception", explanation: "This causes a delayed rash, not immediate intense pain." },
        { text: "Childhood anxiety disorder", type: "wrong", explanation: "The pain is real and biochemical." }
      ]
    },
    {
      question: "Which organ is at risk for failure in a small percentage of EPP patients due to protoporphyrin accumulation?",
      bloomLevel: "Analysis",
      options: [
        { text: "Liver", type: "correct", explanation: "Protoporphyrin is excreted by the liver and can cause cholestasis and cirrhosis." },
        { text: "Kidneys", type: "distractor", explanation: "Protoporphyrin is not water-soluble and does not affect the kidneys." },
        { text: "Heart", type: "misconception", explanation: "Incorrect." },
        { text: "Lungs", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why do EPP patients often have a 'waxy' thickening of the skin over their knuckles after years of exposure?",
      bloomLevel: "Intuition",
      options: [
        { text: "Chronic, low-grade tissue damage and scarring from light exposure", type: "correct", explanation: "Repeated phototoxic insults lead to skin changes." },
        { text: "They use too much heavy sunscreen", type: "distractor", explanation: "Incorrect." },
        { text: "It is a side effect of the iron supplements they take", type: "misconception", explanation: "Incorrect." },
        { text: "They are constantly rubbing their hands to relieve the pain", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s3e10": [ // Langerhans cell histiocytosis
    {
      question: "Langerhans Cell Histiocytosis (LCH) involves the abnormal proliferation of which type of cell?",
      bloomLevel: "Recall",
      options: [
        { text: "Dendritic cells (Langerhans cells)", type: "correct", explanation: "These are antigen-presenting cells normally found in the skin." },
        { text: "B-lymphocytes", type: "distractor", explanation: "Incorrect." },
        { text: "Plasma cells", type: "misconception", explanation: "Incorrect." },
        { text: "Neutrophils", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the characteristic electron microscopic finding in LCH cells?",
      bloomLevel: "Understanding",
      options: [
        { text: "Birbeck granules (tennis racket-shaped)", type: "correct", explanation: "These are unique cytoplasmic organelles found in Langerhans cells." },
        { text: "Auer rods", type: "distractor", explanation: "These are seen in AML." },
        { text: "Heinz bodies", type: "misconception", explanation: "These are seen in G6PD deficiency." },
        { text: "Councilman bodies", type: "wrong", explanation: "These are seen in Yellow Fever." }
      ]
    },
    {
      question: "A 5-year-old child presents with a persistent, scaly rash on the scalp (resembling cradle cap) and a lytic bone lesion in the skull. What is the most likely diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "Langerhans Cell Histiocytosis", type: "correct", explanation: "The combination of seborrheic-like rash and bone lesions is classic for LCH." },
        { text: "Seborrheic Dermatitis", type: "distractor", explanation: "Seborrheic dermatitis does not cause bone lesions." },
        { text: "Osteosarcoma", type: "misconception", explanation: "Osteosarcoma typically affects long bones in teenagers, not the skull in toddlers." },
        { text: "Ewing Sarcoma", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "LCH is often associated with which endocrine complication if the pituitary stalk is involved?",
      bloomLevel: "Analysis",
      options: [
        { text: "Diabetes Insipidus", type: "correct", explanation: "Infiltration of the posterior pituitary leads to ADH deficiency." },
        { text: "Cushing's Syndrome", type: "distractor", explanation: "Incorrect." },
        { text: "Hypothyroidism", type: "misconception", explanation: "Incorrect." },
        { text: "Hyperparathyroidism", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "The 'Hand-Schüller-Christian' triad of LCH consists of bone lesions, exophthalmos, and what else?",
      bloomLevel: "Intuition",
      options: [
        { text: "Diabetes Insipidus", type: "correct", explanation: "This triad represents a multifocal form of the disease." },
        { text: "Jaundice", type: "distractor", explanation: "Incorrect." },
        { text: "Deafness", type: "misconception", explanation: "Incorrect." },
        { text: "Heart failure", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s4e1": [ // Delirium Tremens (Alcohol Withdrawal)
    {
      question: "What is the primary neurotransmitter imbalance responsible for the symptoms of Delirium Tremens (DTs)?",
      bloomLevel: "Recall",
      options: [
        { text: "GABA underactivity and Glutamate overactivity", type: "correct", explanation: "Chronic alcohol use downregulates GABA receptors and upregulates Glutamate receptors." },
        { text: "Dopamine deficiency and Serotonin excess", type: "distractor", explanation: "While these may be involved, the core issue is the GABA/Glutamate balance." },
        { text: "Acetylcholine excess and Norepinephrine deficiency", type: "misconception", explanation: "Norepinephrine is actually *increased* in withdrawal, contributing to tachycardia and hypertension." },
        { text: "Histamine underactivity", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why can DTs be fatal if left untreated?",
      bloomLevel: "Understanding",
      options: [
        { text: "Severe autonomic instability leading to cardiovascular collapse or seizures", type: "correct", explanation: "Hyper-adrenergic state causes extreme stress on the heart and brain." },
        { text: "The liver stops functioning entirely during withdrawal", type: "distractor", explanation: "Liver failure is a chronic issue, but DTs are an acute neurological/cardiovascular crisis." },
        { text: "The patient forgets how to breathe", type: "misconception", explanation: "Breathing is usually rapid (tachypnea), not absent, unless a seizure occurs." },
        { text: "Alcohol withdrawal causes the blood to turn acidic", type: "wrong", explanation: "Ketoacidosis can occur in alcoholics, but it's not the primary mechanism of DTs." }
      ]
    },
    {
      question: "A patient with a history of heavy drinking is hospitalized for a broken leg. On day 3, they become agitated, start seeing 'bugs' on the wall, and have a heart rate of 130 bpm. What is the first-line treatment?",
      bloomLevel: "Application",
      options: [
        { text: "Benzodiazepines (e.g., Lorazepam or Diazepam)", type: "correct", explanation: "Benzos act as GABA agonists to calm the overexcited nervous system." },
        { text: "Antipsychotics (e.g., Haloperidol)", type: "distractor", explanation: "Antipsychotics can lower the seizure threshold and should be used with caution, never as monotherapy." },
        { text: "Beta-blockers", type: "misconception", explanation: "Beta-blockers mask the symptoms (tachycardia) but don't treat the underlying brain excitability or prevent seizures." },
        { text: "More alcohol", type: "wrong", explanation: "While 'tapering' with alcohol was done historically, it is not the medical standard of care." }
      ]
    },
    {
      question: "Which vitamin deficiency is often associated with chronic alcoholism and can lead to Wernicke-Korsakoff syndrome?",
      bloomLevel: "Analysis",
      options: [
        { text: "Thiamine (Vitamin B1)", type: "correct", explanation: "Thiamine is a cofactor for key enzymes in glucose metabolism in the brain." },
        { text: "Cobalamin (Vitamin B12)", type: "distractor", explanation: "B12 deficiency causes megaloblastic anemia and subacute combined degeneration of the cord." },
        { text: "Niacin (Vitamin B3)", type: "misconception", explanation: "Niacin deficiency causes Pellagra (Dermatitis, Dementia, Diarrhea, Death)." },
        { text: "Vitamin C", type: "wrong", explanation: "Vitamin C deficiency causes Scurvy." }
      ]
    },
    {
      question: "The term 'Delirium Tremens' literally translates from Latin as what?",
      bloomLevel: "Intuition",
      options: [
        { text: "Trembling Madness", type: "correct", explanation: "Describes the combination of cognitive impairment (delirium) and physical shaking (tremens)." },
        { text: "Drunken Sleep", type: "distractor", explanation: "Incorrect." },
        { text: "Fear of Water", type: "misconception", explanation: "This is Hydrophobia (Rabies)." },
        { text: "The Devil's Dance", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s4e2": [ // Von Hippel-Lindau syndrome
    {
      question: "Von Hippel-Lindau (VHL) syndrome is caused by a mutation in a gene that normally regulates the response to what?",
      bloomLevel: "Recall",
      options: [
        { text: "Hypoxia (low oxygen levels)", type: "correct", explanation: "The VHL protein targets Hypoxia-Inducible Factor (HIF) for degradation." },
        { text: "High blood sugar", type: "distractor", explanation: "This is regulated by insulin." },
        { text: "DNA damage from UV light", type: "misconception", explanation: "This is associated with Xeroderma Pigmentosum." },
        { text: "Viral infections", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Which of the following tumors is a hallmark of VHL syndrome?",
      bloomLevel: "Understanding",
      options: [
        { text: "Hemangioblastomas of the retina and cerebellum", type: "correct", explanation: "These are highly vascular tumors characteristic of the disease." },
        { text: "Glioblastoma Multiforme", type: "distractor", explanation: "Glioblastoma is a common primary brain tumor but not specific to VHL." },
        { text: "Osteosarcoma", type: "misconception", explanation: "Osteosarcoma is associated with Li-Fraumeni syndrome or Retinoblastoma mutations." },
        { text: "Basal Cell Carcinoma", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient with VHL presents with episodic hypertension, palpitations, and headaches. Which tumor should be screened for in the adrenal glands?",
      bloomLevel: "Application",
      options: [
        { text: "Pheochromocytoma", type: "correct", explanation: "VHL is one of the major genetic syndromes associated with pheochromocytomas." },
        { text: "Adrenal Cortical Carcinoma", type: "distractor", explanation: "This tumor produces cortisol or aldosterone, not catecholamines." },
        { text: "Neuroblastoma", type: "misconception", explanation: "Neuroblastoma is a childhood tumor, not typically part of the VHL spectrum in adults." },
        { text: "Adrenal Adenoma", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "VHL patients have a significantly increased risk of developing which type of kidney cancer?",
      bloomLevel: "Analysis",
      options: [
        { text: "Clear Cell Renal Cell Carcinoma", type: "correct", explanation: "Loss of VHL function is a key driver in the majority of clear cell RCC cases." },
        { text: "Wilms Tumor", type: "distractor", explanation: "Wilms tumor is a pediatric kidney cancer." },
        { text: "Transitional Cell Carcinoma", type: "misconception", explanation: "This affects the lining of the renal pelvis/ureters/bladder, often linked to smoking." },
        { text: "Renal Angiomyolipoma", type: "wrong", explanation: "This is associated with Tuberous Sclerosis." }
      ]
    },
    {
      question: "Why do VHL-associated tumors often appear very 'red' or 'bloody' on imaging or during surgery?",
      bloomLevel: "Intuition",
      options: [
        { text: "Overproduction of VEGF leads to massive, disorganized blood vessel growth", type: "correct", explanation: "High HIF levels trigger the 'angiogenic switch'." },
        { text: "The tumors are made of pure blood", type: "distractor", explanation: "They are tissue tumors with high vascularity, not just blood." },
        { text: "The VHL protein is a pigment that turns red when mutated", type: "misconception", explanation: "Incorrect." },
        { text: "The tumors are always located inside major arteries", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s4e3": [ // Strongyloides
    {
      question: "Strongyloides stercoralis is unique among human parasitic helminths because of its ability to do what?",
      bloomLevel: "Recall",
      options: [
        { text: "Autoinfect the host without leaving the body", type: "correct", explanation: "Larvae can mature into the infectious stage within the gut and re-penetrate the intestinal wall or perianal skin." },
        { text: "Lay eggs that hatch into adult worms in the lungs", type: "distractor", explanation: "Eggs hatch in the gut; larvae migrate through the lungs." },
        { text: "Survive in the bloodstream for decades", type: "misconception", explanation: "They live in the small intestine; autoinfection allows for decades-long persistence." },
        { text: "Reproduce asexually in the soil", type: "wrong", explanation: "They have a complex free-living cycle in the soil that involves sexual reproduction." }
      ]
    },
    {
      question: "What is 'Strongyloides Hyperinfection Syndrome'?",
      bloomLevel: "Understanding",
      options: [
        { text: "A massive increase in worm burden triggered by immunosuppression (e.g., steroids)", type: "correct", explanation: "Steroids accelerate the autoinfection cycle, leading to widespread larval migration." },
        { text: "An infection with more than ten different species of worms", type: "distractor", explanation: "It refers to the quantity of one species, not the variety." },
        { text: "A secondary bacterial infection caused by the worms", type: "misconception", explanation: "While this happens (sepsis), the 'hyperinfection' refers to the worm load itself." },
        { text: "The stage where the worms start laying eggs in the brain", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient from an endemic area is started on high-dose Prednisone for an autoimmune condition. They suddenly develop abdominal pain, cough, and Gram-negative sepsis. What is the most likely underlying cause?",
      bloomLevel: "Application",
      options: [
        { text: "Disseminated Strongyloidiasis", type: "correct", explanation: "Migrating larvae carry enteric bacteria (like E. coli) from the gut into the bloodstream and other organs." },
        { text: "Pneumocystis pneumonia", type: "distractor", explanation: "PCP causes cough and fever but not Gram-negative sepsis or abdominal pain." },
        { text: "Perforated Peptic Ulcer", type: "misconception", explanation: "Steroids can cause ulcers, but the sepsis and cough point toward a parasitic migration." },
        { text: "Acute Appendicitis", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is 'Larva Currens', a classic skin finding in Strongyloidiasis?",
      bloomLevel: "Analysis",
      options: [
        { text: "A rapidly moving, itchy, linear rash caused by migrating larvae", type: "correct", explanation: "It moves much faster (cm/hour) than Larva Migrans (mm/day)." },
        { text: "A circular rash that looks like a target", type: "distractor", explanation: "This is Erythema Migrans (Lyme disease)." },
        { text: "Small, painful blisters on the soles of the feet", type: "misconception", explanation: "Incorrect." },
        { text: "Permanent scarring from old worm tracks", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why is a single stool sample often insufficient to rule out Strongyloides infection?",
      bloomLevel: "Intuition",
      options: [
        { text: "Larval shedding is intermittent and low-level", type: "correct", explanation: "Multiple samples or specialized techniques (like the Baermann method) are needed." },
        { text: "The worms are too small to see under a microscope", type: "distractor", explanation: "They are visible, just not always present in the sample." },
        { text: "The eggs dissolve in stool within minutes", type: "misconception", explanation: "Strongyloides sheds larvae, not eggs, in the stool." },
        { text: "The worms only come out at night", type: "wrong", explanation: "This is Pinworms (Enterobius)." }
      ]
    }
  ],
  "s4e4": [ // Ergot poisoning
    {
      question: "Ergotism is caused by the ingestion of alkaloids produced by which type of organism?",
      bloomLevel: "Recall",
      options: [
        { text: "A fungus (Claviceps purpurea) that grows on rye and other grains", type: "correct", explanation: "The fungus replaces the grain with a dark sclerotium." },
        { text: "A bacterium found in contaminated water", type: "distractor", explanation: "Incorrect." },
        { text: "A poisonous plant that looks like parsley", type: "misconception", explanation: "This is Hemlock." },
        { text: "A venomous spider", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What are the two main clinical forms of Ergotism?",
      bloomLevel: "Understanding",
      options: [
        { text: "Gangrenous and Convulsive", type: "correct", explanation: "Gangrenous is due to vasoconstriction; convulsive is due to CNS effects." },
        { text: "Respiratory and Digestive", type: "distractor", explanation: "Incorrect." },
        { text: "Acute and Chronic", type: "misconception", explanation: "While true of many diseases, Ergotism is specifically categorized by its primary symptoms." },
        { text: "Dry and Wet", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient presents with intense burning pain in their limbs, followed by cyanosis and loss of peripheral pulses. They mention eating 'organic' artisanal rye bread. What is the mechanism of the limb damage?",
      bloomLevel: "Application",
      options: [
        { text: "Severe, prolonged peripheral vasoconstriction", type: "correct", explanation: "Ergot alkaloids are potent vasoconstrictors." },
        { text: "Direct destruction of the nerves by the toxin", type: "distractor", explanation: "The damage is ischemic (lack of blood), not primarily neurotoxic." },
        { text: "Formation of large blood clots in the arteries", type: "misconception", explanation: "The vessels are constricted shut, not necessarily blocked by clots initially." },
        { text: "An allergic reaction to the rye protein", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Ergot alkaloids are chemically related to which well-known hallucinogenic drug?",
      bloomLevel: "Analysis",
      options: [
        { text: "LSD (Lysergic Acid Diethylamide)", type: "correct", explanation: "LSD was first synthesized from lysergic acid found in ergot." },
        { text: "Psilocybin", type: "distractor", explanation: "Psilocybin comes from 'magic' mushrooms." },
        { text: "Mescaline", type: "misconception", explanation: "Mescaline comes from the Peyote cactus." },
        { text: "Cocaine", type: "wrong", explanation: "Cocaine comes from the Coca plant." }
      ]
    },
    {
      question: "In the Middle Ages, Ergotism was known by what name, due to the burning sensation it caused?",
      bloomLevel: "Intuition",
      options: [
        { text: "St. Anthony's Fire", type: "correct", explanation: "Monks of the Order of St. Anthony were known for treating the condition." },
        { text: "The Black Death", type: "distractor", explanation: "This is the Plague." },
        { text: "The Dancing Plague", type: "misconception", explanation: "While possibly related to ergot, this is a different historical phenomenon." },
        { text: "The King's Evil", type: "wrong", explanation: "This is Scrofula (TB of the lymph nodes)." }
      ]
    }
  ],
  "s4e5": [ // Eperythrozoon (Mycoplasma suis)
    {
      question: "Eperythrozoon (now reclassified as Mycoplasma suis) is a parasite that primarily attaches to which host cell?",
      bloomLevel: "Recall",
      options: [
        { text: "Red Blood Cells (Erythrocytes)", type: "correct", explanation: "They live on the surface of the RBCs, causing immune-mediated destruction." },
        { text: "White Blood Cells", type: "distractor", explanation: "Incorrect." },
        { text: "Platelets", type: "misconception", explanation: "Incorrect." },
        { text: "Vascular Endothelial cells", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "How does Eperythrozoonosis cause anemia in the host?",
      bloomLevel: "Understanding",
      options: [
        { text: "Extravascular hemolysis in the spleen", type: "correct", explanation: "The spleen removes the 'decorated' RBCs, leading to anemia." },
        { text: "The parasite eats the hemoglobin inside the cell", type: "distractor", explanation: "This is what Malaria (Plasmodium) does." },
        { text: "The parasite prevents the bone marrow from making new cells", type: "misconception", explanation: "The marrow is usually hyperactive trying to compensate." },
        { text: "The parasite causes massive internal bleeding", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "While primarily a veterinary pathogen (especially in pigs), human cases are rare. What is a common risk factor for human infection?",
      bloomLevel: "Application",
      options: [
        { text: "Splenectomy (removal of the spleen)", type: "correct", explanation: "Without a spleen to clear the parasites, the infection can become symptomatic." },
        { text: "Eating raw pork", type: "distractor", explanation: "Transmission is usually via blood-sucking insects or contaminated needles, not ingestion." },
        { text: "Living in a high-altitude environment", type: "misconception", explanation: "Incorrect." },
        { text: "Having Type O blood", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the characteristic appearance of Eperythrozoon on a peripheral blood smear?",
      bloomLevel: "Analysis",
      options: [
        { text: "Small, coccoid or ring-shaped structures on the surface of RBCs", type: "correct", explanation: "They often look like 'chains' or 'dots' on the cell margin." },
        { text: "Large, crescent-shaped gametocytes", type: "distractor", explanation: "This is seen in P. falciparum malaria." },
        { text: "Intracellular 'Maltese Cross' formations", type: "misconception", explanation: "This is seen in Babesiosis." },
        { text: "Bipolar 'safety-pin' staining", type: "wrong", explanation: "This is seen in Yersinia pestis." }
      ]
    },
    {
      question: "Why was Eperythrozoon moved from the order Rickettsiales to the genus Mycoplasma?",
      bloomLevel: "Intuition",
      options: [
        { text: "DNA sequencing showed they lack a cell wall and are related to Mycoplasmas", type: "correct", explanation: "Molecular phylogenetics corrected the previous classification based on morphology." },
        { text: "They started responding to Penicillin", type: "distractor", explanation: "Mycoplasmas lack cell walls and are *resistant* to Penicillin." },
        { text: "They were found to be able to grow on agar plates", type: "misconception", explanation: "They are still very difficult to culture." },
        { text: "They were found to be viruses, not bacteria", type: "wrong", explanation: "They are bacteria." }
      ]
    }
  ],
  "s4e6": [ // Heat stroke & Thallium poisoning
    {
      question: "What is the clinical definition of 'Heat Stroke'?",
      bloomLevel: "Recall",
      options: [
        { text: "Core temperature >40°C (104°F) with central nervous system dysfunction", type: "correct", explanation: "The CNS dysfunction (delirium, coma, seizures) is the key differentiator from heat exhaustion." },
        { text: "Any temperature above 38°C (100.4°F) after exercise", type: "distractor", explanation: "This is just a fever or mild hyperthermia." },
        { text: "Sweating profusely while in a hot environment", type: "misconception", explanation: "In classic heat stroke, the patient often *stops* sweating (anhidrosis)." },
        { text: "Feeling dizzy on a summer day", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Thallium poisoning is often called the 'Poisoner's Poison' because of what characteristic?",
      bloomLevel: "Understanding",
      options: [
        { text: "It is colorless, odorless, tasteless, and symptoms are delayed", type: "correct", explanation: "It mimics other illnesses and is hard to detect without specific testing." },
        { text: "It kills the victim instantly upon contact", type: "distractor", explanation: "Thallium is a slow-acting cumulative poison." },
        { text: "It only affects people who are already sick", type: "misconception", explanation: "Incorrect." },
        { text: "It turns the victim's skin bright green", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient presents with severe abdominal pain, painful peripheral neuropathy, and sudden, total hair loss (alopecia). What is the most likely toxin?",
      bloomLevel: "Application",
      options: [
        { text: "Thallium", type: "correct", explanation: "The triad of GI distress, neuropathy, and alopecia is classic for thallium." },
        { text: "Arsenic", type: "distractor", explanation: "Arsenic causes GI distress and neuropathy, but not the same rapid, total alopecia." },
        { text: "Lead", type: "misconception", explanation: "Lead causes abdominal pain ('lead colic') and wrist drop, but not hair loss." },
        { text: "Mercury", type: "wrong", explanation: "Mercury causes neurological and renal issues, but not rapid alopecia." }
      ]
    },
    {
      question: "What is the mechanism of action for 'Prussian Blue' in treating thallium poisoning?",
      bloomLevel: "Analysis",
      options: [
        { text: "It acts as an ion exchanger in the gut, trapping thallium and preventing reabsorption", type: "correct", explanation: "It interrupts the enterohepatic circulation of thallium." },
        { text: "It directly neutralizes thallium in the bloodstream", type: "distractor", explanation: "It works in the gut, not the blood." },
        { text: "It speeds up the kidneys' ability to filter thallium", type: "misconception", explanation: "Incorrect." },
        { text: "It protects the hair follicles from damage", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why does Thallium interfere with so many cellular processes, especially in the nerves and heart?",
      bloomLevel: "Intuition",
      options: [
        { text: "It mimics Potassium (K+) and disrupts ion channels and enzymes", type: "correct", explanation: "Thallium ions have a similar radius to potassium and are 'mistakenly' taken up by cells." },
        { text: "It is highly radioactive", type: "distractor", explanation: "Natural thallium is not significantly radioactive; it's chemically toxic." },
        { text: "It dissolves the myelin sheath directly", type: "misconception", explanation: "It disrupts cellular metabolism first." },
        { text: "It prevents the body from absorbing oxygen", type: "wrong", explanation: "This is Cyanide." }
      ]
    }
  ],
  "s4e7": [ // Lyme disease
    {
      question: "Lyme disease is caused by which spiral-shaped bacterium?",
      bloomLevel: "Recall",
      options: [
        { text: "Borrelia burgdorferi", type: "correct", explanation: "Named after Willy Burgdorfer, who first identified the spirochete." },
        { text: "Treponema pallidum", type: "distractor", explanation: "This causes Syphilis." },
        { text: "Leptospira interrogans", type: "misconception", explanation: "This causes Leptospirosis." },
        { text: "Rickettsia rickettsii", type: "wrong", explanation: "This causes Rocky Mountain Spotted Fever." }
      ]
    },
    {
      question: "What is the name of the 'bullseye' rash seen in early Lyme disease?",
      bloomLevel: "Understanding",
      options: [
        { text: "Erythema Migrans", type: "correct", explanation: "It expands outward from the site of the tick bite." },
        { text: "Erythema Multiforme", type: "distractor", explanation: "This is a hypersensitivity reaction (target lesions) often linked to HSV." },
        { text: "Erythema Nodosum", type: "misconception", explanation: "These are painful red nodules on the shins." },
        { text: "Erythema Infectiosum", type: "wrong", explanation: "This is 'Slapped Cheek' syndrome (Parvovirus B19)." }
      ]
    },
    {
      question: "A patient presents with a sudden facial droop (Bell's Palsy) and a history of hiking in Connecticut. What is the most appropriate next step?",
      bloomLevel: "Application",
      options: [
        { text: "Test for Lyme antibodies and consider starting Doxycycline", type: "correct", explanation: "Bilateral or even unilateral Bell's palsy in an endemic area is highly suspicious for Lyme." },
        { text: "Perform an immediate brain MRI to rule out stroke", type: "distractor", explanation: "Bell's palsy is a peripheral nerve issue; stroke usually spares the forehead." },
        { text: "Start high-dose steroids for idiopathic Bell's palsy", type: "misconception", explanation: "If Lyme is the cause, steroids alone are insufficient and antibiotics are needed." },
        { text: "Reassure the patient that it will go away on its own", type: "wrong", explanation: "Lyme requires treatment to prevent late-stage complications." }
      ]
    },
    {
      question: "Which of the following is a common manifestation of 'Late Disseminated' (Stage 3) Lyme disease?",
      bloomLevel: "Analysis",
      options: [
        { text: "Chronic large-joint arthritis (especially the knee)", type: "correct", explanation: "This can occur months to years after the initial infection." },
        { text: "Acute heart failure (Lyme carditis)", type: "distractor", explanation: "Carditis is usually a Stage 2 (Early Disseminated) finding." },
        { text: "Meningitis", type: "misconception", explanation: "Neurological Lyme (meningitis, radiculopathy) is typically Stage 2." },
        { text: "The bullseye rash", type: "wrong", explanation: "This is Stage 1 (Early Localized)." }
      ]
    },
    {
      question: "Why is the deer tick (Ixodes scapularis) often not noticed by the patient?",
      bloomLevel: "Intuition",
      options: [
        { text: "The nymph stage is as small as a poppy seed and the bite is painless", type: "correct", explanation: "Most transmissions occur from nymphs, which are very hard to spot." },
        { text: "The tick injects a numbing agent and then flies away", type: "distractor", explanation: "Ticks don't fly; they stay attached for days." },
        { text: "The tick only bites at night while the patient is sleeping", type: "misconception", explanation: "Incorrect." },
        { text: "The tick is invisible to the human eye", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s4e8": [ // Lupus (Systemic Lupus Erythematosus)
    {
      question: "Which antibody is considered the most specific for a diagnosis of Systemic Lupus Erythematosus (SLE)?",
      bloomLevel: "Recall",
      options: [
        { text: "Anti-Smith (Sm) and Anti-dsDNA", type: "correct", explanation: "While ANA is sensitive, Sm and dsDNA are highly specific for SLE." },
        { text: "Anti-Nuclear Antibody (ANA)", type: "distractor", explanation: "ANA is very sensitive but not specific (seen in many conditions)." },
        { text: "Rheumatoid Factor (RF)", type: "misconception", explanation: "RF is for Rheumatoid Arthritis, though it can be positive in SLE." },
        { text: "Anti-Centromere Antibody", type: "wrong", explanation: "This is associated with CREST syndrome/Scleroderma." }
      ]
    },
    {
      question: "SLE is primarily classified as which type of hypersensitivity reaction?",
      bloomLevel: "Understanding",
      options: [
        { text: "Type III (Immune Complex Mediated)", type: "correct", explanation: "Antigen-antibody complexes deposit in tissues, causing inflammation." },
        { text: "Type I (IgE Mediated)", type: "distractor", explanation: "Type I is for immediate allergies like hay fever." },
        { text: "Type IV (Cell-Mediated)", type: "misconception", explanation: "Type IV is delayed, like the TB skin test or poison ivy." },
        { text: "Type II (Cytotoxic)", type: "wrong", explanation: "Type II involves antibodies against cell surface antigens (e.g., hemolytic anemia)." }
      ]
    },
    {
      question: "A Lupus patient develops protein in their urine and rising creatinine. What is the most likely complication?",
      bloomLevel: "Application",
      options: [
        { text: "Lupus Nephritis", type: "correct", explanation: "Kidney involvement is a common and serious complication of SLE." },
        { text: "Simple Urinary Tract Infection", type: "distractor", explanation: "UTI doesn't typically cause significant proteinuria or creatinine rise." },
        { text: "Dehydration from systemic inflammation", type: "misconception", explanation: "Proteinuria specifically points to glomerular damage." },
        { text: "Side effect of Hydroxychloroquine", type: "wrong", explanation: "HCQ is generally kidney-safe; its main toxicity is retinal." }
      ]
    },
    {
      question: "What is the 'Libman-Sacks' endocarditis sometimes seen in SLE?",
      bloomLevel: "Analysis",
      options: [
        { text: "Small, sterile vegetations on both sides of the heart valves", type: "correct", explanation: "These are non-bacterial verrucous endocarditis lesions." },
        { text: "A severe bacterial infection of the heart valves", type: "distractor", explanation: "Libman-Sacks is sterile (non-infectious)." },
        { text: "A hole in the septum of the heart", type: "misconception", explanation: "Incorrect." },
        { text: "Hardening of the coronary arteries", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why is Lupus famously called 'The Great Imitator' in the show?",
      bloomLevel: "Intuition",
      options: [
        { text: "It can affect almost any organ system with varied symptoms", type: "correct", explanation: "Its presentation is so diverse it can look like anything." },
        { text: "It causes patients to mimic the personality of others", type: "distractor", explanation: "This is a psychological trait, not a Lupus one." },
        { text: "It only appears in patients who are already faking symptoms", type: "misconception", explanation: "Lupus is a very real, serious autoimmune disease." },
        { text: "It is a viral infection that changes its DNA daily", type: "wrong", explanation: "Lupus is autoimmune, not a virus." }
      ]
    }
  ],
  "s4e9": [ // Measles (Rubeola)
    {
      question: "What are 'Koplik spots', a pathognomonic sign of Measles?",
      bloomLevel: "Recall",
      options: [
        { text: "Small white spots on the buccal mucosa (inside the cheek)", type: "correct", explanation: "They appear 1-2 days before the main rash." },
        { text: "Red spots on the palms and soles", type: "distractor", explanation: "This is seen in Hand, Foot, and Mouth disease or Syphilis." },
        { text: "Dark spots on the retina", type: "misconception", explanation: "Incorrect." },
        { text: "Sandpaper-like rash on the chest", type: "wrong", explanation: "This is Scarlet Fever." }
      ]
    },
    {
      question: "What is the '3 C's' prodrome of Measles?",
      bloomLevel: "Understanding",
      options: [
        { text: "Cough, Coryza, and Conjunctivitis", type: "correct", explanation: "These symptoms precede the characteristic rash." },
        { text: "Chills, Cramps, and Coma", type: "distractor", explanation: "Incorrect." },
        { text: "Cyanosis, Clubbing, and Congestion", type: "misconception", explanation: "Incorrect." },
        { text: "Constipation, Cold, and Confusion", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A non-vaccinated child presents with high fever, red eyes, and a runny nose. A few days later, a maculopapular rash begins on the face and spreads downward. What is the most likely diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "Measles (Rubeola)", type: "correct", explanation: "The 'cephalocaudal' spread of the rash is a classic feature." },
        { text: "Rubella (German Measles)", type: "distractor", explanation: "Rubella has a similar spread but the fever is lower and the child is less ill." },
        { text: "Roseola", type: "misconception", explanation: "In Roseola, the fever *drops* before the rash appears, and the rash starts on the trunk." },
        { text: "Chickenpox", type: "wrong", explanation: "Chickenpox has vesicular (blistering) lesions in different stages of healing." }
      ]
    },
    {
      question: "What is the most serious long-term neurological complication of Measles?",
      bloomLevel: "Analysis",
      options: [
        { text: "Subacute Sclerosing Panencephalitis (SSPE)", type: "correct", explanation: "A rare, fatal, progressive brain inflammation that occurs years after the initial infection." },
        { text: "Guillain-Barré Syndrome", type: "distractor", explanation: "GBS is a peripheral nerve issue, not specific to measles." },
        { text: "Multiple Sclerosis", type: "misconception", explanation: "Incorrect." },
        { text: "Alzheimer's Disease", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why is Vitamin A supplementation recommended for children with severe Measles?",
      bloomLevel: "Intuition",
      options: [
        { text: "It reduces the risk of blindness and death from complications", type: "correct", explanation: "Measles depletes Vitamin A stores, which are critical for immune function and eye health." },
        { text: "It makes the rash disappear faster", type: "distractor", explanation: "Incorrect." },
        { text: "It prevents the child from being contagious", type: "misconception", explanation: "Incorrect." },
        { text: "It acts as a direct antiviral against the measles virus", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s4e10": [ // Breast Cancer
    {
      question: "Which gene mutations are most strongly associated with hereditary breast and ovarian cancer syndrome?",
      bloomLevel: "Recall",
      options: [
        { text: "BRCA1 and BRCA2", type: "correct", explanation: "These are tumor suppressor genes involved in DNA repair." },
        { text: "APC and KRAS", type: "distractor", explanation: "These are associated with colorectal cancer." },
        { text: "HER2 and EGFR", type: "misconception", explanation: "These are oncogenes that can be overexpressed in cancer, but are not typically the germline 'hereditary' mutation." },
        { text: "RB1", type: "wrong", explanation: "This is associated with Retinoblastoma." }
      ]
    },
    {
      question: "What does 'HER2-positive' mean in the context of breast cancer pathology?",
      bloomLevel: "Understanding",
      options: [
        { text: "The cancer cells overexpress the Human Epidermal Growth Factor Receptor 2", type: "correct", explanation: "This makes the cancer more aggressive but also targetable by specific drugs like Trastuzumab." },
        { text: "The cancer was caused by a virus", type: "distractor", explanation: "HER2 is a human protein, not a virus." },
        { text: "The cancer is resistant to all forms of chemotherapy", type: "misconception", explanation: "It is actually very responsive to HER2-targeted therapies." },
        { text: "The cancer has spread to the liver", type: "wrong", explanation: "HER2 is a molecular marker, not a stage of spread." }
      ]
    },
    {
      question: "A patient's biopsy shows 'Triple-Negative' breast cancer. What does this imply for treatment?",
      bloomLevel: "Application",
      options: [
        { text: "The cancer lacks Estrogen, Progesterone, and HER2 receptors, so hormone therapy won't work", type: "correct", explanation: "These cancers require standard chemotherapy as they don't respond to targeted endocrine or HER2 drugs." },
        { text: "The patient has three different types of cancer at once", type: "distractor", explanation: "Incorrect." },
        { text: "The cancer is guaranteed to be cured with surgery alone", type: "misconception", explanation: "Triple-negative cancers are often more aggressive." },
        { text: "The test results were inconclusive and need to be repeated three times", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is 'Paget's Disease of the Breast'?",
      bloomLevel: "Analysis",
      options: [
        { text: "A form of breast cancer that manifests as an eczematous rash on the nipple", type: "correct", explanation: "It usually indicates an underlying ductal carcinoma." },
        { text: "A benign cyst that feels like a hard lump", type: "distractor", explanation: "It is a malignant condition." },
        { text: "A bone disease that has spread to the breast", type: "misconception", explanation: "Paget's disease of the bone is a different condition." },
        { text: "Inflammation of the breast tissue during breastfeeding", type: "wrong", explanation: "This is Mastitis." }
      ]
    },
    {
      question: "Why is the 'Sentinel Lymph Node' biopsy performed in breast cancer surgery?",
      bloomLevel: "Intuition",
      options: [
        { text: "To identify the first node(s) where cancer would spread, avoiding unnecessary full node removal", type: "correct", explanation: "If the sentinel node is clear, the rest are likely clear too." },
        { text: "To remove the primary tumor itself", type: "distractor", explanation: "The tumor is in the breast; the nodes are in the axilla (armpit)." },
        { text: "To inject chemotherapy directly into the lymphatic system", type: "misconception", explanation: "It's a diagnostic procedure, not a treatment delivery method." },
        { text: "To see if the patient is allergic to the blue dye", type: "wrong", explanation: "Dye is used to find the node, not to test for allergies." }
      ]
    }
  ],
  "s5e1": [ // Leprosy (Hansen's Disease)
    {
      question: "Leprosy is caused by which acid-fast bacterium?",
      bloomLevel: "Recall",
      options: [
        { text: "Mycobacterium leprae", type: "correct", explanation: "It is a slow-growing bacterium that affects the skin, nerves, and mucous membranes." },
        { text: "Mycobacterium tuberculosis", type: "distractor", explanation: "This causes Tuberculosis." },
        { text: "Mycobacterium avium", type: "misconception", explanation: "This is part of the MAC complex, often seen in AIDS patients." },
        { text: "Mycobacterium marinum", type: "wrong", explanation: "This causes 'fish tank granuloma'." }
      ]
    },
    {
      question: "Why does Leprosy primarily affect the 'cooler' parts of the body (nose, ears, hands, feet)?",
      bloomLevel: "Understanding",
      options: [
        { text: "The bacterium grows best at temperatures slightly below normal body core temperature", type: "correct", explanation: "M. leprae prefers around 30-33°C." },
        { text: "The immune system is weaker in the extremities", type: "distractor", explanation: "Incorrect." },
        { text: "The bacteria are transmitted via cold water", type: "misconception", explanation: "Incorrect." },
        { text: "The bacteria need more oxygen, which is higher in the skin", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient presents with pale, numb patches of skin and thickened peripheral nerves. What is the most likely diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "Leprosy (Hansen's Disease)", type: "correct", explanation: "The combination of hypopigmented macules and anesthesia (loss of sensation) is classic." },
        { text: "Vitiligo", type: "distractor", explanation: "Vitiligo causes loss of pigment but not loss of sensation." },
        { text: "Diabetic Neuropathy", type: "misconception", explanation: "Diabetes causes numbness but not typically localized pale skin patches." },
        { text: "Psoriasis", type: "wrong", explanation: "Psoriasis causes scaly, itchy plaques, not numb patches." }
      ]
    },
    {
      question: "What is the 'Leonine Facies' seen in advanced lepromatous leprosy?",
      bloomLevel: "Analysis",
      options: [
        { text: "Thickened, furrowed skin on the face resembling a lion", type: "correct", explanation: "Due to massive infiltration of the skin by the bacteria." },
        { text: "A face that looks like a cat", type: "distractor", explanation: "Incorrect." },
        { text: "Loss of all facial hair", type: "misconception", explanation: "While hair loss (madarosis) occurs, 'leonine facies' refers to the skin thickening." },
        { text: "A face that is constantly smiling", type: "wrong", explanation: "This is Risus Sardonicus (Tetanus)." }
      ]
    },
    {
      question: "Which animal is a known natural reservoir for Mycobacterium leprae in the southern United States?",
      bloomLevel: "Intuition",
      options: [
        { text: "Nine-banded Armadillo", type: "correct", explanation: "Armadillos have a low body temperature that allows the bacteria to thrive." },
        { text: "Raccoon", type: "distractor", explanation: "Incorrect." },
        { text: "Opossum", type: "misconception", explanation: "Incorrect." },
        { text: "Alligator", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s5e2": [ // Cancerous stem cells
    {
      question: "What is the 'Cancer Stem Cell' hypothesis?",
      bloomLevel: "Recall",
      options: [
        { text: "A small subpopulation of cells within a tumor is responsible for its growth and recurrence", type: "correct", explanation: "These cells have self-renewal properties similar to normal stem cells." },
        { text: "All cancer cells are equally capable of forming new tumors", type: "distractor", explanation: "This is the stochastic model of cancer." },
        { text: "Cancer is caused by injecting stem cells into a patient", type: "misconception", explanation: "Incorrect." },
        { text: "Stem cells are the only cells that can be cured by chemotherapy", type: "wrong", explanation: "Stem cells are often *more* resistant to chemotherapy." }
      ]
    },
    {
      question: "Why are cancer stem cells often resistant to traditional chemotherapy and radiation?",
      bloomLevel: "Understanding",
      options: [
        { text: "They divide slowly and have highly efficient DNA repair mechanisms", type: "correct", explanation: "Most chemo targets rapidly dividing cells; stem cells are often quiescent." },
        { text: "They lack a nucleus", type: "distractor", explanation: "All cancer cells have nuclei." },
        { text: "They are located in parts of the body that chemo cannot reach", type: "misconception", explanation: "While some 'niches' are protected, the resistance is primarily intrinsic to the cell." },
        { text: "They are made of a different type of protein", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient's tumor shrinks significantly with treatment, but recurs months later with more aggressive growth. According to the CSC model, what happened?",
      bloomLevel: "Application",
      options: [
        { text: "The treatment killed the bulk of the tumor but spared the cancer stem cells", type: "correct", explanation: "The surviving stem cells then regenerated the tumor." },
        { text: "The patient was reinfected with the same cancer", type: "distractor", explanation: "Cancer is not infectious in this way." },
        { text: "The tumor learned how to hide from the immune system", type: "misconception", explanation: "While true, the CSC model specifically points to the survival of the 'seed' cells." },
        { text: "The chemotherapy actually turned normal cells into cancer", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Which cell surface marker is often used to identify and isolate breast cancer stem cells?",
      bloomLevel: "Analysis",
      options: [
        { text: "CD44+/CD24-", type: "correct", explanation: "This specific profile is associated with tumorigenic potential in breast cancer." },
        { text: "CD4+", type: "distractor", explanation: "This is a marker for T-helper cells." },
        { text: "PSA", type: "misconception", explanation: "This is a marker for prostate cancer (Prostate Specific Antigen)." },
        { text: "HER2", type: "wrong", explanation: "HER2 is an oncogene, not a stem cell marker." }
      ]
    },
    {
      question: "The concept of 'Asymmetric Division' in stem cells means what?",
      bloomLevel: "Intuition",
      options: [
        { text: "One daughter cell remains a stem cell, while the other begins to differentiate", type: "correct", explanation: "This allows the stem cell pool to be maintained while producing functional cells." },
        { text: "The cell divides into two unequal sizes", type: "distractor", explanation: "Incorrect." },
        { text: "The cell only divides on one side of the body", type: "misconception", explanation: "Incorrect." },
        { text: "The cell divides into three parts", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s5e3": [ // Food Boli Bezoar
    {
      question: "What is a 'Bezoar'?",
      bloomLevel: "Recall",
      options: [
        { text: "A solid mass of indigestible material that accumulates in the digestive tract", type: "correct", explanation: "It can cause obstruction or ulceration." },
        { text: "A type of intestinal parasite", type: "distractor", explanation: "Incorrect." },
        { text: "A surgical tool used to remove gallstones", type: "misconception", explanation: "Incorrect." },
        { text: "A rare form of stomach cancer", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is a 'Phytobezoar' composed of?",
      bloomLevel: "Understanding",
      options: [
        { text: "Plant fibers (cellulose, lignin, etc.)", type: "correct", explanation: "Commonly from fruits like persimmons." },
        { text: "Hair", type: "distractor", explanation: "This is a Trichobezoar." },
        { text: "Medications", type: "misconception", explanation: "This is a Pharmacobezoar." },
        { text: "Milk products", type: "wrong", explanation: "This is a Lactobezoar." }
      ]
    },
    {
      question: "A patient with a history of gastric bypass surgery presents with early satiety and abdominal pain. An endoscopy reveals a large mass of undigested food. What is a common non-surgical treatment for certain types of bezoars?",
      bloomLevel: "Application",
      options: [
        { text: "Ingestion of Coca-Cola", type: "correct", explanation: "The acidity and carbonation can help dissolve some phytobezoars." },
        { text: "High-dose antibiotics", type: "distractor", explanation: "Antibiotics don't dissolve physical masses." },
        { text: "Drinking large amounts of milk", type: "misconception", explanation: "Milk can actually contribute to some bezoars (lactobezoars)." },
        { text: "Taking iron supplements", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is 'Rapunzel Syndrome'?",
      bloomLevel: "Analysis",
      options: [
        { text: "A trichobezoar with a long 'tail' extending into the small intestine", type: "correct", explanation: "Usually seen in patients with trichophagia (hair-eating)." },
        { text: "A condition where the hair grows uncontrollably", type: "distractor", explanation: "Incorrect." },
        { text: "The inability to cut one's own hair", type: "misconception", explanation: "Incorrect." },
        { text: "A disease that only affects people living in towers", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "In ancient times, bezoars were highly valued because they were believed to be what?",
      bloomLevel: "Intuition",
      options: [
        { text: "Universal antidotes to any poison", type: "correct", explanation: "They were often set in gold and worn as jewelry." },
        { text: "The source of eternal youth", type: "distractor", explanation: "Incorrect." },
        { text: "Fossilized dragon eggs", type: "misconception", explanation: "Incorrect." },
        { text: "A way to talk to animals", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s5e4": [ // Iron pin in brain
    {
      question: "What is the primary danger of having a ferromagnetic object (like an iron pin) in the brain during an MRI?",
      bloomLevel: "Recall",
      options: [
        { text: "The magnetic field can cause the object to move or vibrate, damaging tissue", type: "correct", explanation: "MRI machines use extremely powerful magnets." },
        { text: "The object will melt inside the brain", type: "distractor", explanation: "It won't melt, but it can heat up (induction heating)." },
        { text: "The object will turn the brain into a giant magnet", type: "misconception", explanation: "Incorrect." },
        { text: "The object will explode", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why might a patient be unaware they have a small metal fragment in their brain for years?",
      bloomLevel: "Understanding",
      options: [
        { text: "The brain itself lacks pain receptors (nociceptors)", type: "correct", explanation: "Once the object passes the skull and meninges, it may not cause immediate pain." },
        { text: "The metal fragment is too small for the immune system to notice", type: "distractor", explanation: "The immune system will notice (gliosis), but it doesn't cause 'pain'." },
        { text: "The brain can dissolve metal over time", type: "misconception", explanation: "Metal is stable; it won't dissolve." },
        { text: "The fragment is made of a 'stealth' material", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient presents with sudden, unexplained neurological deficits immediately after entering an MRI suite. What is the first thing to suspect?",
      bloomLevel: "Application",
      options: [
        { text: "Movement of a previously unknown metallic foreign body", type: "correct", explanation: "The magnetic field is active even before the scan starts." },
        { text: "A stroke caused by the stress of the scan", type: "distractor", explanation: "Less likely than a direct magnetic interaction." },
        { text: "An allergic reaction to the MRI contrast dye", type: "misconception", explanation: "Contrast is given later, and doesn't cause 'movement' symptoms." },
        { text: "Claustrophobia-induced panic attack", type: "wrong", explanation: "Panic doesn't cause focal neurological deficits." }
      ]
    },
    {
      question: "What is 'Siderosis' in the context of a long-term metallic foreign body?",
      bloomLevel: "Analysis",
      options: [
        { text: "Deposition of iron in tissues due to the slow oxidation of the object", type: "correct", explanation: "This can cause local toxicity and staining." },
        { text: "The object becoming part of the bone", type: "distractor", explanation: "Incorrect." },
        { text: "The object turning into a different metal", type: "misconception", explanation: "Incorrect." },
        { text: "The patient developing a craving for iron-rich foods", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why are 'non-ferrous' metals (like titanium) generally safe for MRI?",
      bloomLevel: "Intuition",
      options: [
        { text: "They are not attracted to magnetic fields", type: "correct", explanation: "They lack the magnetic properties of iron, nickel, or cobalt." },
        { text: "They are invisible to the MRI machine", type: "distractor", explanation: "They still cause 'artifacts' (distortions) on the image." },
        { text: "They are softer than the brain", type: "misconception", explanation: "Incorrect." },
        { text: "They are coated in a special plastic", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s5e5": [ // Sjögren's syndrome
    {
      question: "Sjögren's syndrome is an autoimmune disease that primarily targets which glands?",
      bloomLevel: "Recall",
      options: [
        { text: "Exocrine glands (salivary and lacrimal)", type: "correct", explanation: "This leads to the classic 'dry eyes and dry mouth'." },
        { text: "Endocrine glands (thyroid and adrenal)", type: "distractor", explanation: "Incorrect." },
        { text: "Lymph nodes", type: "misconception", explanation: "While lymph nodes can be involved, they are not the primary target." },
        { text: "Sweat glands", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the 'Schirmer test' used for in Sjögren's diagnosis?",
      bloomLevel: "Understanding",
      options: [
        { text: "To measure tear production using a strip of filter paper", type: "correct", explanation: "Less than 5mm of wetting in 5 minutes is considered positive." },
        { text: "To check the acidity of the saliva", type: "distractor", explanation: "Incorrect." },
        { text: "To look for antibodies in the blood", type: "misconception", explanation: "This is a blood test (SSA/SSB)." },
        { text: "To measure the size of the parotid gland", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient with Sjögren's presents with a rapidly enlarging, firm mass in the parotid gland. What serious complication should be ruled out?",
      bloomLevel: "Application",
      options: [
        { text: "B-cell lymphoma (MALT lymphoma)", type: "correct", explanation: "Sjögren's patients have a 40-fold increased risk of lymphoma." },
        { text: "Mumps", type: "distractor", explanation: "Mumps is an acute viral infection, less likely in a chronic autoimmune patient." },
        { text: "Salivary stones (Sialolithiasis)", type: "misconception", explanation: "Stones cause intermittent pain and swelling, usually related to eating." },
        { text: "Dental abscess", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Which autoantibodies are most specific for Sjögren's syndrome?",
      bloomLevel: "Analysis",
      options: [
        { text: "Anti-SSA (Ro) and Anti-SSB (La)", type: "correct", explanation: "These are present in the majority of primary Sjögren's cases." },
        { text: "Anti-dsDNA", type: "distractor", explanation: "This is specific for SLE." },
        { text: "Anti-CCP", type: "misconception", explanation: "This is specific for Rheumatoid Arthritis." },
        { text: "Anti-Jo-1", type: "wrong", explanation: "This is associated with polymyositis." }
      ]
    },
    {
      question: "Why do Sjögren's patients often have a high rate of dental cavities (caries)?",
      bloomLevel: "Intuition",
      options: [
        { text: "Lack of saliva removes the natural buffering and protective enzymes in the mouth", type: "correct", explanation: "Saliva is essential for neutralizing acids and remineralizing teeth." },
        { text: "The disease makes them crave sugary foods", type: "distractor", explanation: "Incorrect." },
        { text: "The bacteria that cause cavities thrive in dry environments", type: "misconception", explanation: "It's the lack of defense, not just the 'dryness'." },
        { text: "The medications they take for the disease rot the teeth", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s5e6": [ // Familial Mediterranean fever
    {
      question: "Familial Mediterranean Fever (FMF) is caused by a mutation in the MEFV gene, which encodes which protein?",
      bloomLevel: "Recall",
      options: [
        { text: "Pyrin", type: "correct", explanation: "Pyrin is involved in the regulation of the inflammasome." },
        { text: "Albumin", type: "distractor", explanation: "Incorrect." },
        { text: "Hemoglobin", type: "misconception", explanation: "Incorrect." },
        { text: "Insulin", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the hallmark clinical presentation of FMF?",
      bloomLevel: "Understanding",
      options: [
        { text: "Recurrent, self-limiting episodes of fever and serositis (e.g., abdominal pain)", type: "correct", explanation: "Episodes typically last 1-3 days." },
        { text: "Chronic, non-stop joint pain", type: "distractor", explanation: "FMF pain is episodic, not chronic." },
        { text: "A permanent rash on the face", type: "misconception", explanation: "FMF can have an 'erysipelas-like' rash, but it is transient." },
        { text: "Progressive loss of hearing", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the most serious long-term complication of untreated FMF?",
      bloomLevel: "Application",
      options: [
        { text: "AA Amyloidosis leading to renal failure", type: "correct", explanation: "Chronic inflammation leads to the deposition of amyloid A protein in the kidneys." },
        { text: "Liver cirrhosis", type: "distractor", explanation: "Incorrect." },
        { text: "Heart failure", type: "misconception", explanation: "While amyloid can affect the heart, the kidneys are the primary target in FMF." },
        { text: "Blindness", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Which medication is the gold standard for preventing attacks and amyloidosis in FMF?",
      bloomLevel: "Analysis",
      options: [
        { text: "Colchicine", type: "correct", explanation: "Colchicine interferes with microtubule formation and inhibits the inflammatory response." },
        { text: "Prednisone", type: "distractor", explanation: "Steroids are not effective for preventing FMF attacks." },
        { text: "Methotrexate", type: "misconception", explanation: "Incorrect." },
        { text: "Ibuprofen", type: "wrong", explanation: "NSAIDs can help with pain during an attack but don't prevent them." }
      ]
    },
    {
      question: "The name 'Mediterranean' in FMF refers to the fact that it is most common in which ethnic groups?",
      bloomLevel: "Intuition",
      options: [
        { text: "Sephardic Jews, Turks, Armenians, and Arabs", type: "correct", explanation: "These populations have the highest carrier rates of MEFV mutations." },
        { text: "Italians and Greeks only", type: "distractor", explanation: "While present, it is less common than in the groups mentioned above." },
        { text: "Northern Europeans", type: "misconception", explanation: "Incorrect." },
        { text: "East Asians", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s5e7": [ // Lead poisoning
    {
      question: "Lead poisoning (Plumbism) interferes with which vital biochemical pathway?",
      bloomLevel: "Recall",
      options: [
        { text: "Heme synthesis", type: "correct", explanation: "Lead inhibits ALAD and ferrochelatase." },
        { text: "DNA replication", type: "distractor", explanation: "Incorrect." },
        { text: "Fatty acid oxidation", type: "misconception", explanation: "Incorrect." },
        { text: "Protein folding", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is 'Burton's Line', a sign of chronic lead exposure?",
      bloomLevel: "Understanding",
      options: [
        { text: "A bluish-gray line along the gums", type: "correct", explanation: "Caused by the reaction of lead with bacteria in the mouth." },
        { text: "A dark line on the fingernails", type: "distractor", explanation: "These are Mees' lines (seen in arsenic poisoning)." },
        { text: "A line of hair loss on the scalp", type: "misconception", explanation: "Incorrect." },
        { text: "A visible line on X-rays of long bones", type: "wrong", explanation: "These are 'lead lines' in the bones, not 'Burton's line' in the gums." }
      ]
    },
    {
      question: "A child living in an old house presents with abdominal pain, irritability, and developmental delay. A blood smear shows 'Basophilic Stippling'. What is the most likely diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "Lead Poisoning", type: "correct", explanation: "Basophilic stippling is due to the inhibition of RNA degradation in RBCs." },
        { text: "Iron Deficiency Anemia", type: "distractor", explanation: "Iron deficiency causes microcytic anemia but not basophilic stippling." },
        { text: "Sickle Cell Anemia", type: "misconception", explanation: "Incorrect." },
        { text: "Vitamin B12 Deficiency", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Which neurological finding is a classic sign of lead poisoning in adults?",
      bloomLevel: "Analysis",
      options: [
        { text: "Wrist drop or foot drop (peripheral neuropathy)", type: "correct", explanation: "Lead specifically affects motor nerves." },
        { text: "Resting tremor", type: "distractor", explanation: "This is seen in Parkinson's." },
        { text: "Loss of vision", type: "misconception", explanation: "This is seen in methanol poisoning." },
        { text: "Hyperreflexia", type: "wrong", explanation: "Lead usually causes hyporeflexia due to nerve damage." }
      ]
    },
    {
      question: "Why is lead poisoning particularly dangerous for young children compared to adults?",
      bloomLevel: "Intuition",
      options: [
        { text: "Their developing brains are more sensitive and they absorb lead more efficiently", type: "correct", explanation: "Lead crosses the blood-brain barrier more easily in children." },
        { text: "They eat more lead-based paint", type: "distractor", explanation: "While true (pica), it doesn't explain the biological sensitivity." },
        { text: "They have less blood, so the concentration is higher", type: "misconception", explanation: "Incorrect." },
        { text: "They don't have a liver to filter the lead", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s5e8": [ // Acute promyelocytic leukemia
    {
      question: "Acute Promyelocytic Leukemia (APL) is characterized by which specific chromosomal translocation?",
      bloomLevel: "Recall",
      options: [
        { text: "t(15;17)", type: "correct", explanation: "This fuses the PML gene with the RARα gene." },
        { text: "t(9;22)", type: "distractor", explanation: "This is the Philadelphia chromosome (CML)." },
        { text: "t(8;14)", type: "misconception", explanation: "This is associated with Burkitt lymphoma." },
        { text: "t(11;14)", type: "wrong", explanation: "This is associated with Mantle cell lymphoma." }
      ]
    },
    {
      question: "Why is APL considered a medical emergency upon presentation?",
      bloomLevel: "Understanding",
      options: [
        { text: "High risk of life-threatening Disseminated Intravascular Coagulation (DIC)", type: "correct", explanation: "The promyelocytes release pro-coagulant factors that trigger widespread clotting and bleeding." },
        { text: "The patient will turn into a zombie", type: "distractor", explanation: "Incorrect." },
        { text: "It is the only cancer that is contagious", type: "misconception", explanation: "Incorrect." },
        { text: "The tumor grows to the size of a basketball in hours", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the 'differentiation therapy' used to treat APL?",
      bloomLevel: "Application",
      options: [
        { text: "All-Trans Retinoic Acid (ATRA)", type: "correct", explanation: "ATRA forces the immature promyelocytes to mature into functional neutrophils." },
        { text: "High-dose radiation", type: "distractor", explanation: "Incorrect." },
        { text: "Bone marrow transplant as the first step", type: "misconception", explanation: "ATRA is the first step to stabilize the patient." },
        { text: "Antibiotics", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What are 'Auer Rods', often seen in the blasts of APL patients?",
      bloomLevel: "Analysis",
      options: [
        { text: "Needle-like clumps of granular material in the cytoplasm", type: "correct", explanation: "In APL, cells often contain multiple Auer rods (faggot cells)." },
        { text: "Small parasites living inside the cells", type: "distractor", explanation: "Incorrect." },
        { text: "Fragments of the nucleus", type: "misconception", explanation: "Incorrect." },
        { text: "Crystals of uric acid", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why is the prognosis for APL now among the best of all leukemias?",
      bloomLevel: "Intuition",
      options: [
        { text: "The discovery of targeted therapies like ATRA and Arsenic Trioxide", type: "correct", explanation: "These treatments specifically address the molecular defect of the translocation." },
        { text: "The cancer cells are naturally very weak", type: "distractor", explanation: "Incorrect." },
        { text: "It only affects people with very strong immune systems", type: "misconception", explanation: "Incorrect." },
        { text: "It is easily cured with a healthy diet", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s5e9": [ // Melioidosis
    {
      question: "Melioidosis is caused by which Gram-negative bacterium?",
      bloomLevel: "Recall",
      options: [
        { text: "Burkholderia pseudomallei", type: "correct", explanation: "It is a soil-dwelling bacterium endemic to Southeast Asia and Northern Australia." },
        { text: "Burkholderia cepacia", type: "distractor", explanation: "This is a common pathogen in Cystic Fibrosis patients." },
        { text: "Pseudomonas aeruginosa", type: "misconception", explanation: "Incorrect." },
        { text: "Yersinia pestis", type: "wrong", explanation: "This causes the Plague." }
      ]
    },
    {
      question: "Why is Melioidosis often called 'The Remarkable Mimic'?",
      bloomLevel: "Understanding",
      options: [
        { text: "Its clinical presentation can resemble many other diseases, especially Tuberculosis", type: "correct", explanation: "It can cause pneumonia, abscesses, and chronic infections." },
        { text: "It can change its shape to look like other bacteria", type: "distractor", explanation: "Incorrect." },
        { text: "It only infects people who are pretending to be sick", type: "misconception", explanation: "Incorrect." },
        { text: "It makes the patient act like a different person", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A rice farmer in Thailand presents with a chronic cough, weight loss, and multiple skin abscesses. What is the most likely environmental source of infection?",
      bloomLevel: "Application",
      options: [
        { text: "Contaminated soil or water (especially during the rainy season)", type: "correct", explanation: "Infection occurs through skin abrasions, inhalation, or ingestion." },
        { text: "Bites from infected mosquitoes", type: "distractor", explanation: "Incorrect." },
        { text: "Eating undercooked seafood", type: "misconception", explanation: "Incorrect." },
        { text: "Contact with infected parrots", type: "wrong", explanation: "This is Psittacosis." }
      ]
    },
    {
      question: "Which underlying condition is the strongest risk factor for severe, disseminated Melioidosis?",
      bloomLevel: "Analysis",
      options: [
        { text: "Diabetes Mellitus", type: "correct", explanation: "Over half of all melioidosis patients have underlying diabetes." },
        { text: "Hypertension", type: "distractor", explanation: "Incorrect." },
        { text: "Asthma", type: "misconception", explanation: "Incorrect." },
        { text: "Glaucoma", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why is Burkholderia pseudomallei considered a potential bioterrorism agent?",
      bloomLevel: "Intuition",
      options: [
        { text: "It is highly infectious via inhalation, difficult to treat, and has a high mortality rate", type: "correct", explanation: "It is classified as a Tier 1 select agent." },
        { text: "It turns the water supply bright purple", type: "distractor", explanation: "Incorrect." },
        { text: "It makes people fall asleep instantly", type: "misconception", explanation: "Incorrect." },
        { text: "It is invisible to all known sensors", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s5e10": [ // Hereditary coproporphyria
    {
      question: "Hereditary Coproporphyria (HCP) is caused by a deficiency in which enzyme?",
      bloomLevel: "Recall",
      options: [
        { text: "Coproporphyrinogen oxidase", type: "correct", explanation: "This is an autosomal dominant hepatic porphyria." },
        { text: "Uroporphyrinogen decarboxylase", type: "distractor", explanation: "This is deficient in Porphyria Cutanea Tarda." },
        { text: "PBG deaminase", type: "misconception", explanation: "This is deficient in Acute Intermittent Porphyria." },
        { text: "Heme oxygenase", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What are the two main types of symptoms seen in HCP attacks?",
      bloomLevel: "Understanding",
      options: [
        { text: "Neurological (abdominal pain, psychosis) and Cutaneous (photosensitivity)", type: "correct", explanation: "HCP is one of the 'mixed' porphyrias." },
        { text: "Respiratory and Cardiac", type: "distractor", explanation: "Incorrect." },
        { text: "Bone pain and Hearing loss", type: "misconception", explanation: "Incorrect." },
        { text: "Jaundice and Bleeding", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient presents with severe abdominal pain and a blistering rash on their hands after starting a new medication. Which test would be most useful during an acute attack?",
      bloomLevel: "Application",
      options: [
        { text: "Urinary Porphobilinogen (PBG) and Coproporphyrin levels", type: "correct", explanation: "PBG is elevated in acute neurovisceral attacks." },
        { text: "Blood glucose level", type: "distractor", explanation: "Incorrect." },
        { text: "Chest X-ray", type: "misconception", explanation: "Incorrect." },
        { text: "Stool culture", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why are certain drugs (like barbiturates or sulfonamides) dangerous for patients with HCP?",
      bloomLevel: "Analysis",
      options: [
        { text: "They induce the cytochrome P450 system, which increases the demand for heme and triggers the pathway", type: "correct", explanation: "This leads to an accumulation of toxic precursors." },
        { text: "They directly destroy the heme in the blood", type: "distractor", explanation: "Incorrect." },
        { text: "They prevent the kidneys from excreting porphyrins", type: "misconception", explanation: "Incorrect." },
        { text: "They cause a severe allergic reaction", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the characteristic color of urine in a patient during an acute porphyria attack if left standing in the light?",
      bloomLevel: "Intuition",
      options: [
        { text: "Dark red or 'port-wine' color", type: "correct", explanation: "Due to the oxidation of porphobilin to porphobilinogen." },
        { text: "Bright blue", type: "distractor", explanation: "Incorrect." },
        { text: "Neon green", type: "misconception", explanation: "Incorrect." },
        { text: "Milky white", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s6e2": [ // Blastomycosis
    {
      question: "Blastomycosis is caused by a dimorphic fungus. What does 'dimorphic' mean in this context?",
      bloomLevel: "Recall",
      options: [
        { text: "It grows as a mold in the environment and as a yeast in the host", type: "correct", explanation: "This transition is triggered by the higher temperature of the human body." },
        { text: "It has two different colors", type: "distractor", explanation: "Incorrect." },
        { text: "It can infect both humans and plants", type: "misconception", explanation: "Incorrect." },
        { text: "It has two different nuclei", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the characteristic appearance of Blastomyces dermatitidis yeast on a tissue biopsy?",
      bloomLevel: "Understanding",
      options: [
        { text: "Broad-based budding yeast with a thick, refractile cell wall", type: "correct", explanation: "The 'broad base' is a key diagnostic feature." },
        { text: "Small, intracellular yeast cells", type: "distractor", explanation: "This is seen in Histoplasmosis." },
        { text: "Yeast with a wide, clear capsule", type: "misconception", explanation: "This is seen in Cryptococcus." },
        { text: "Spherules filled with endospores", type: "wrong", explanation: "This is seen in Coccidioidomycosis." }
      ]
    },
    {
      question: "A patient from the Great Lakes region presents with a chronic cough and skin lesions that look like 'verrucous' (wart-like) plaques. What is the most likely fungal diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "Blastomycosis", type: "correct", explanation: "The combination of pulmonary and skin involvement is very common in Blastomycosis." },
        { text: "Aspergillosis", type: "distractor", explanation: "Aspergillus usually doesn't cause these specific skin lesions." },
        { text: "Candidiasis", type: "misconception", explanation: "Candida usually causes thrush or intertrigo, not verrucous plaques." },
        { text: "Dermatophytosis (Ringworm)", type: "wrong", explanation: "Ringworm is a superficial skin infection, not a systemic disease." }
      ]
    },
    {
      question: "How is Blastomycosis typically acquired?",
      bloomLevel: "Analysis",
      options: [
        { text: "Inhalation of conidia (spores) from disturbed soil or decaying wood", type: "correct", explanation: "The lungs are the primary portal of entry." },
        { text: "Eating contaminated food", type: "distractor", explanation: "Incorrect." },
        { text: "Direct skin contact with an infected person", type: "misconception", explanation: "It is not transmitted person-to-person." },
        { text: "Bites from infected ticks", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why is Blastomycosis sometimes misdiagnosed as squamous cell carcinoma of the skin?",
      bloomLevel: "Intuition",
      options: [
        { text: "The skin lesions can show 'pseudoepitheliomatous hyperplasia', which mimics cancer under a microscope", type: "correct", explanation: "A pathologist must look carefully for the yeast cells to avoid a wrong diagnosis." },
        { text: "The fungus produces a toxin that causes mutations", type: "distractor", explanation: "Incorrect." },
        { text: "The fungus only grows inside cancer cells", type: "misconception", explanation: "Incorrect." },
        { text: "The lesions are always located on the face", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s6e3": [ // Antiphospholipid syndrome
    {
      question: "Antiphospholipid Syndrome (APS) is a pro-thrombotic condition. What does this mean for the patient?",
      bloomLevel: "Recall",
      options: [
        { text: "They have an increased risk of blood clots in both arteries and veins", type: "correct", explanation: "APS is a leading cause of 'unprovoked' thrombosis." },
        { text: "They have a high risk of bleeding uncontrollably", type: "distractor", explanation: "Incorrect." },
        { text: "Their blood cannot carry enough oxygen", type: "misconception", explanation: "Incorrect." },
        { text: "They are allergic to all forms of fat", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is 'Lupus Anticoagulant', one of the markers for APS?",
      bloomLevel: "Understanding",
      options: [
        { text: "An antibody that paradoxically prolongs clotting tests in the lab but causes clots in the body", type: "correct", explanation: "The name is confusing because it acts as a *pro-coagulant* in vivo." },
        { text: "A medication used to treat Lupus", type: "distractor", explanation: "Incorrect." },
        { text: "A protein that dissolves blood clots", type: "misconception", explanation: "Incorrect." },
        { text: "A virus that causes Lupus", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A young woman with a history of three consecutive miscarriages and a deep vein thrombosis (DVT) should be screened for which condition?",
      bloomLevel: "Application",
      options: [
        { text: "Antiphospholipid Syndrome", type: "correct", explanation: "Recurrent pregnancy loss and thrombosis are the two clinical pillars of APS." },
        { text: "Polycystic Ovary Syndrome", type: "distractor", explanation: "PCOS causes infertility but not typically DVTs." },
        { text: "Hemophilia", type: "misconception", explanation: "Hemophilia causes bleeding, not clotting." },
        { text: "Diabetes", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Which of the following is a common skin finding in APS?",
      bloomLevel: "Analysis",
      options: [
        { text: "Livedo Reticularis (a lacy, purple pattern)", type: "correct", explanation: "Caused by small clots in the skin's blood vessels." },
        { text: "Jaundice", type: "distractor", explanation: "Incorrect." },
        { text: "Hives (Urticaria)", type: "misconception", explanation: "Incorrect." },
        { text: "Psoriatic plaques", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why is APS sometimes called 'Sticky Blood Syndrome'?",
      bloomLevel: "Intuition",
      options: [
        { text: "The antibodies interfere with the normal regulation of the coagulation cascade, making clots more likely to form", type: "correct", explanation: "It's a descriptive term for the hypercoagulable state." },
        { text: "The blood literally becomes as thick as syrup", type: "distractor", explanation: "Incorrect." },
        { text: "The patient's skin becomes sticky to the touch", type: "misconception", explanation: "Incorrect." },
        { text: "The blood sticks to the walls of the heart", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s6e4": [ // Brain stem aneurysm
    {
      question: "What is a 'Berry Aneurysm'?",
      bloomLevel: "Recall",
      options: [
        { text: "A small, sac-like dilation of a cerebral artery, usually at a bifurcation", type: "correct", explanation: "They are the most common cause of non-traumatic subarachnoid hemorrhage." },
        { text: "A tumor that looks like a strawberry", type: "distractor", explanation: "Incorrect." },
        { text: "A blood clot in the brain", type: "misconception", explanation: "Incorrect." },
        { text: "A type of brain swelling", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why are aneurysms in the brain stem particularly dangerous?",
      bloomLevel: "Understanding",
      options: [
        { text: "The brain stem controls vital functions like breathing and heart rate", type: "correct", explanation: "Rupture or even compression in this area can be immediately fatal." },
        { text: "The brain stem is the only part of the brain that can feel pain", type: "distractor", explanation: "Incorrect." },
        { text: "The brain stem is made of solid bone", type: "misconception", explanation: "Incorrect." },
        { text: "Aneurysms only happen in the brain stem", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient presents with the 'worst headache of my life' (thunderclap headache) and a stiff neck. What is the most likely diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "Subarachnoid Hemorrhage (often from a ruptured aneurysm)", type: "correct", explanation: "The sudden onset and severity are classic." },
        { text: "Migraine", type: "distractor", explanation: "Migraines usually build up over time and are not 'thunderclap'." },
        { text: "Tension Headache", type: "misconception", explanation: "Incorrect." },
        { text: "Sinusitis", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Which genetic condition is strongly associated with an increased risk of cerebral aneurysms?",
      bloomLevel: "Analysis",
      options: [
        { text: "Autosomal Dominant Polycystic Kidney Disease (ADPKD)", type: "correct", explanation: "Patients with ADPKD should be screened for aneurysms." },
        { text: "Down Syndrome", type: "distractor", explanation: "Incorrect." },
        { text: "Cystic Fibrosis", type: "misconception", explanation: "Incorrect." },
        { text: "Type 1 Diabetes", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the 'Circle of Willis' in the context of brain aneurysms?",
      bloomLevel: "Intuition",
      options: [
        { text: "A ring of interconnected arteries at the base of the brain where most aneurysms form", type: "correct", explanation: "The junctions in this circle are high-stress areas for blood flow." },
        { text: "A group of doctors who specialize in brain surgery", type: "distractor", explanation: "Incorrect." },
        { text: "A part of the brain that controls balance", type: "misconception", explanation: "Incorrect." },
        { text: "A type of surgical clip used to treat aneurysms", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s6e5": [ // Vibrio vulnificus & Hemochromatosis
    {
      question: "Vibrio vulnificus is a Gram-negative bacterium that is most commonly found in what environment?",
      bloomLevel: "Recall",
      options: [
        { text: "Warm, salty coastal waters (estuaries)", type: "correct", explanation: "It is often associated with raw oysters or wound infections in seawater." },
        { text: "Freshwater lakes and streams", type: "distractor", explanation: "Incorrect." },
        { text: "Dry desert soil", type: "misconception", explanation: "Incorrect." },
        { text: "Inside air conditioning units", type: "wrong", explanation: "This is Legionella." }
      ]
    },
    {
      question: "What is 'Hereditary Hemochromatosis'?",
      bloomLevel: "Understanding",
      options: [
        { text: "A genetic disorder causing the body to absorb and store too much iron", type: "correct", explanation: "The excess iron damages organs like the liver, heart, and pancreas." },
        { text: "A condition where the body cannot make enough iron", type: "distractor", explanation: "Incorrect." },
        { text: "A type of blood cancer", type: "misconception", explanation: "Incorrect." },
        { text: "An allergy to iron supplements", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why is Vibrio vulnificus infection so much more deadly in patients with Hemochromatosis?",
      bloomLevel: "Application",
      options: [
        { text: "The bacteria thrive on the excess free iron in the patient's blood", type: "correct", explanation: "Vibrio is 'siderophilic' (iron-loving) and becomes extremely virulent in high-iron environments." },
        { text: "The iron prevents the antibiotics from working", type: "distractor", explanation: "Incorrect." },
        { text: "The bacteria turn the iron into a toxic gas", type: "misconception", explanation: "Incorrect." },
        { text: "Hemochromatosis patients have no white blood cells", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the classic skin finding in severe Vibrio vulnificus sepsis?",
      bloomLevel: "Analysis",
      options: [
        { text: "Hemorrhagic bullae (large, blood-filled blisters)", type: "correct", explanation: "These can rapidly progress to necrotizing fasciitis." },
        { text: "A fine, red rash like sandpaper", type: "distractor", explanation: "Incorrect." },
        { text: "Small, itchy bumps", type: "misconception", explanation: "Incorrect." },
        { text: "Total loss of skin pigment", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Hereditary Hemochromatosis is often called 'Bronze Diabetes' because of which two symptoms?",
      bloomLevel: "Intuition",
      options: [
        { text: "Skin hyperpigmentation and pancreatic damage leading to diabetes", type: "correct", explanation: "The 'bronze' color is due to iron and melanin deposition." },
        { text: "Strong muscles and high energy", type: "distractor", explanation: "Incorrect." },
        { text: "A metallic taste in the mouth and frequent urination", type: "misconception", explanation: "Incorrect." },
        { text: "Yellow eyes and low blood sugar", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s6e6": [ // Crohn's disease
    {
      question: "Crohn's disease is a type of Inflammatory Bowel Disease (IBD). Which part of the GI tract can it affect?",
      bloomLevel: "Recall",
      options: [
        { text: "Any part from the mouth to the anus", type: "correct", explanation: "It most commonly affects the terminal ileum and colon." },
        { text: "Only the large intestine (colon)", type: "distractor", explanation: "This is Ulcerative Colitis." },
        { text: "Only the stomach", type: "misconception", explanation: "Incorrect." },
        { text: "Only the esophagus", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the characteristic 'skip lesion' pattern in Crohn's disease?",
      bloomLevel: "Understanding",
      options: [
        { text: "Areas of inflammation separated by patches of healthy tissue", type: "correct", explanation: "Unlike Ulcerative Colitis, which is continuous." },
        { text: "Lesions that move from one organ to another", type: "distractor", explanation: "Incorrect." },
        { text: "Lesions that only appear when the patient is exercising", type: "misconception", explanation: "Incorrect." },
        { text: "Lesions that look like they have been jumped on", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient with Crohn's disease develops a connection between their bowel and their bladder. What is this called?",
      bloomLevel: "Application",
      options: [
        { text: "Fistula", type: "correct", explanation: "Crohn's is a transmural (full-thickness) inflammatory process, which leads to fistula formation." },
        { text: "Polyp", type: "distractor", explanation: "Incorrect." },
        { text: "Diverticulum", type: "misconception", explanation: "Incorrect." },
        { text: "Stricture", type: "wrong", explanation: "A stricture is a narrowing, not a new connection." }
      ]
    },
    {
      question: "What is the characteristic microscopic finding in a Crohn's biopsy?",
      bloomLevel: "Analysis",
      options: [
        { text: "Non-caseating granulomas", type: "correct", explanation: "These are found in about 30% of cases and help distinguish it from UC." },
        { text: "Crypt abscesses only", type: "distractor", explanation: "Crypt abscesses are more common in Ulcerative Colitis." },
        { text: "Malignant cells", type: "misconception", explanation: "Crohn's is inflammatory, not primarily malignant (though it increases cancer risk)." },
        { text: "Viral inclusion bodies", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "The 'Cobblestone' appearance of the mucosa in Crohn's is caused by what?",
      bloomLevel: "Intuition",
      options: [
        { text: "Deep, linear ulcers separated by areas of bulging, edematous tissue", type: "correct", explanation: "It looks like a cobblestone street on endoscopy." },
        { text: "The patient eating actual stones", type: "distractor", explanation: "Incorrect." },
        { text: "Small, round tumors growing in a grid", type: "misconception", explanation: "Incorrect." },
        { text: "The presence of large amounts of calcium", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s6e7": [ // Thrombotic thrombocytopenic purpura
    {
      question: "Thrombotic Thrombocytopenic Purpura (TTP) is caused by a deficiency in which enzyme?",
      bloomLevel: "Recall",
      options: [
        { text: "ADAMTS13", type: "correct", explanation: "This enzyme normally cleaves large von Willebrand factor (vWF) multimers." },
        { text: "G6PD", type: "distractor", explanation: "Incorrect." },
        { text: "Factor VIII", type: "misconception", explanation: "Incorrect." },
        { text: "Lactase", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the 'Pentad' of symptoms traditionally associated with TTP?",
      bloomLevel: "Understanding",
      options: [
        { text: "Fever, Anemia, Thrombocytopenia, Renal failure, and Neurological symptoms", type: "correct", explanation: "Mnemonic: FAT RN." },
        { text: "Pain, Heat, Redness, Swelling, and Loss of function", type: "distractor", explanation: "These are the signs of inflammation." },
        { text: "Cough, Fever, Chills, Sweats, and Weight loss", type: "misconception", explanation: "Incorrect." },
        { text: "Dermatitis, Dementia, Diarrhea, and Death", type: "wrong", explanation: "This is Pellagra." }
      ]
    },
    {
      question: "What is the characteristic finding on a peripheral blood smear in a TTP patient?",
      bloomLevel: "Application",
      options: [
        { text: "Schistocytes (fragmented RBCs)", type: "correct", explanation: "RBCs are sheared as they pass through small vessels clogged with platelet thrombi." },
        { text: "Target cells", type: "distractor", explanation: "Incorrect." },
        { text: "Sickle cells", type: "misconception", explanation: "Incorrect." },
        { text: "Bite cells", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why is TTP considered a medical emergency?",
      bloomLevel: "Analysis",
      options: [
        { text: "Widespread microthrombi can cause multi-organ failure and death within hours", type: "correct", explanation: "Immediate treatment with plasma exchange is vital." },
        { text: "The patient's blood will turn into a solid block", type: "distractor", explanation: "Incorrect." },
        { text: "It is highly contagious", type: "misconception", explanation: "Incorrect." },
        { text: "It causes the heart to stop beating instantly", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why is giving a platelet transfusion often contraindicated in TTP?",
      bloomLevel: "Intuition",
      options: [
        { text: "It can 'fuel the fire' by providing more substrate for thrombus formation", type: "correct", explanation: "Adding platelets can worsen the microvascular occlusion." },
        { text: "The patient is allergic to platelets", type: "distractor", explanation: "Incorrect." },
        { text: "The platelets will all be eaten by the spleen instantly", type: "misconception", explanation: "Incorrect." },
        { text: "Platelets are too expensive to waste", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s6e8": [ // Leukemia
    {
      question: "What is the primary difference between 'Acute' and 'Chronic' leukemias?",
      bloomLevel: "Recall",
      options: [
        { text: "Acute involves immature 'blast' cells; Chronic involves more mature cells", type: "correct", explanation: "Acute leukemias progress rapidly without treatment." },
        { text: "Acute only affects children; Chronic only affects adults", type: "distractor", explanation: "While some types favor certain ages, both can affect anyone." },
        { text: "Acute is painful; Chronic is painless", type: "misconception", explanation: "Incorrect." },
        { text: "Acute is caused by viruses; Chronic is genetic", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the 'Philadelphia Chromosome'?",
      bloomLevel: "Understanding",
      options: [
        { text: "A translocation between chromosomes 9 and 22, characteristic of CML", type: "correct", explanation: "It creates the BCR-ABL fusion oncogene." },
        { text: "A chromosome that is only found in people from Philadelphia", type: "distractor", explanation: "Incorrect." },
        { text: "A type of chromosome that looks like a bell", type: "misconception", explanation: "Incorrect." },
        { text: "A chromosome that prevents cancer", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient presents with fatigue, easy bruising, and a very high white blood cell count. A bone marrow biopsy shows >20% blasts. What is the most likely general diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "Acute Leukemia (AML or ALL)", type: "correct", explanation: "The blast percentage is the key diagnostic threshold." },
        { text: "Chronic Myeloid Leukemia", type: "distractor", explanation: "CML usually has <10% blasts in the chronic phase." },
        { text: "Infectious Mononucleosis", type: "misconception", explanation: "Mono causes high WBCs but they are 'atypical lymphocytes', not blasts." },
        { text: "Aplastic Anemia", type: "wrong", explanation: "Aplastic anemia causes *low* blood counts (pancytopenia)." }
      ]
    },
    {
      question: "Which type of leukemia is the most common cancer in children?",
      bloomLevel: "Analysis",
      options: [
        { text: "Acute Lymphoblastic Leukemia (ALL)", type: "correct", explanation: "ALL accounts for about 75% of pediatric leukemias." },
        { text: "Acute Myeloid Leukemia (AML)", type: "distractor", explanation: "AML is more common in older adults." },
        { text: "Chronic Lymphocytic Leukemia (CLL)", type: "misconception", explanation: "CLL is almost exclusively a disease of the elderly." },
        { text: "Hairy Cell Leukemia", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why do leukemia patients often suffer from frequent infections despite having a very high white blood cell count?",
      bloomLevel: "Intuition",
      options: [
        { text: "The leukemic cells are immature and non-functional", type: "correct", explanation: "They take up space in the marrow but don't provide immunity." },
        { text: "The cancer cells eat all the antibodies", type: "distractor", explanation: "Incorrect." },
        { text: "The patient is allergic to their own white blood cells", type: "misconception", explanation: "Incorrect." },
        { text: "The infections are actually caused by the chemotherapy", type: "wrong", explanation: "While chemo contributes, the disease itself causes immune failure." }
      ]
    }
  ],
  "s6e9": [ // Hughes-Stovin syndrome
    {
      question: "Hughes-Stovin Syndrome (HSS) is a rare clinical entity characterized by which two main features?",
      bloomLevel: "Recall",
      options: [
        { text: "Multiple pulmonary artery aneurysms and deep vein thrombosis (DVT)", type: "correct", explanation: "It is often considered a life-threatening variant of Behçet's disease." },
        { text: "High blood pressure and Kidney stones", type: "distractor", explanation: "Incorrect." },
        { text: "Blindness and Deafness", type: "misconception", explanation: "Incorrect." },
        { text: "Liver failure and Skin rash", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the most common cause of death in patients with HSS?",
      bloomLevel: "Understanding",
      options: [
        { text: "Massive hemoptysis (coughing up blood) due to aneurysm rupture", type: "correct", explanation: "The pulmonary aneurysms are prone to catastrophic bleeding." },
        { text: "Heart attack", type: "distractor", explanation: "Incorrect." },
        { text: "Infection", type: "misconception", explanation: "Incorrect." },
        { text: "Stroke", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A young man presents with recurrent DVTs and a chest X-ray showing several round masses in the lungs. What rare syndrome should be considered?",
      bloomLevel: "Application",
      options: [
        { text: "Hughes-Stovin Syndrome", type: "correct", explanation: "The 'masses' on X-ray are often the pulmonary aneurysms." },
        { text: "Lung Cancer", type: "distractor", explanation: "Possible, but DVTs in a young man point toward a systemic vascular issue." },
        { text: "Sarcoidosis", type: "misconception", explanation: "Sarcoidosis causes lymphadenopathy, not typically pulmonary artery aneurysms." },
        { text: "Tuberculosis", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "HSS is closely related to which other systemic vasculitis?",
      bloomLevel: "Analysis",
      options: [
        { text: "Behçet's Disease", type: "correct", explanation: "Both involve venous thrombosis and arterial aneurysms; HSS may be a limited form of Behçet's." },
        { text: "Wegener's Granulomatosis (GPA)", type: "distractor", explanation: "GPA involves small vessels and granulomas, not large artery aneurysms." },
        { text: "Kawasaki Disease", type: "misconception", explanation: "Kawasaki affects children and targets coronary arteries." },
        { text: "Giant Cell Arteritis", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why is the treatment of HSS particularly challenging?",
      bloomLevel: "Intuition",
      options: [
        { text: "Anticoagulation is needed for the DVTs but is extremely risky due to the pulmonary aneurysms", type: "correct", explanation: "Treating the clots can cause the aneurysms to bleed out." },
        { text: "There are no medications that work", type: "distractor", explanation: "Immunosuppressants are used, but the balance is difficult." },
        { text: "The disease is only found in remote parts of the world", type: "misconception", explanation: "Incorrect." },
        { text: "The patient's body rejects all forms of treatment", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s6e10": [ // Wilson's disease
    {
      question: "Wilson's disease is a genetic disorder that causes the body to accumulate too much of which mineral?",
      bloomLevel: "Recall",
      options: [
        { text: "Copper", type: "correct", explanation: "A mutation in the ATP7B gene prevents the liver from excreting copper into bile." },
        { text: "Iron", type: "distractor", explanation: "This is Hemochromatosis." },
        { text: "Calcium", type: "misconception", explanation: "Incorrect." },
        { text: "Zinc", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What are 'Kayser-Fleischer rings'?",
      bloomLevel: "Understanding",
      options: [
        { text: "Golden-brown deposits of copper in the cornea of the eye", type: "correct", explanation: "They are a hallmark sign of Wilson's disease." },
        { text: "Bony growths on the fingers", type: "distractor", explanation: "Incorrect." },
        { text: "Circular rashes on the skin", type: "misconception", explanation: "Incorrect." },
        { text: "Rings of fat around the heart", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A 20-year-old patient presents with tremors, difficulty speaking, and abnormal liver function tests. What is the most likely diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "Wilson's Disease", type: "correct", explanation: "The combination of neurological and hepatic symptoms in a young person is classic." },
        { text: "Parkinson's Disease", type: "distractor", explanation: "Parkinson's is rare in 20-year-olds and doesn't cause liver failure." },
        { text: "Alcoholic Cirrhosis", type: "misconception", explanation: "Possible, but the neurological symptoms point elsewhere." },
        { text: "Multiple Sclerosis", type: "wrong", explanation: "MS doesn't typically cause liver failure." }
      ]
    },
    {
      question: "What is the characteristic laboratory finding for ceruloplasmin in Wilson's disease?",
      bloomLevel: "Analysis",
      options: [
        { text: "Low serum ceruloplasmin", type: "correct", explanation: "Ceruloplasmin is the primary copper-carrying protein in the blood." },
        { text: "High serum ceruloplasmin", type: "distractor", explanation: "Incorrect." },
        { text: "Normal serum ceruloplasmin", type: "misconception", explanation: "While possible in rare cases, it is usually low." },
        { text: "Ceruloplasmin is absent from the body entirely", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "How does Penicillamine work in the treatment of Wilson's disease?",
      bloomLevel: "Intuition",
      options: [
        { text: "It acts as a chelating agent, binding to copper and allowing it to be excreted in the urine", type: "correct", explanation: "Chelation is the primary treatment for copper overload." },
        { text: "It prevents the body from absorbing copper from food", type: "distractor", explanation: "This is what Zinc does." },
        { text: "It repairs the mutated gene in the liver", type: "misconception", explanation: "Incorrect." },
        { text: "It turns the copper into a harmless form of iron", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s7e1": [ // Food poisoning
    {
      question: "What is the most common cause of bacterial food poisoning worldwide?",
      bloomLevel: "Recall",
      options: [
        { text: "Campylobacter jejuni", type: "correct", explanation: "Often associated with undercooked poultry." },
        { text: "Salmonella enterica", type: "distractor", explanation: "Also very common, but Campylobacter often leads in developed countries." },
        { text: "Staphylococcus aureus", type: "misconception", explanation: "Causes rapid-onset vomiting due to pre-formed toxins, but not the most common overall." },
        { text: "Clostridium botulinum", type: "wrong", explanation: "Rare but very serious." }
      ]
    },
    {
      question: "Which type of food poisoning is classically associated with 'reheated fried rice'?",
      bloomLevel: "Understanding",
      options: [
        { text: "Bacillus cereus", type: "correct", explanation: "The spores can survive cooking and germinate if rice is left at room temperature." },
        { text: "E. coli O157:H7", type: "distractor", explanation: "Associated with undercooked ground beef." },
        { text: "Listeria monocytogenes", type: "misconception", explanation: "Associated with deli meats and unpasteurized soft cheeses." },
        { text: "Vibrio parahaemolyticus", type: "wrong", explanation: "Associated with raw seafood." }
      ]
    },
    {
      question: "A patient presents with bloody diarrhea and abdominal cramps after eating a rare hamburger. What is the most serious complication to watch for?",
      bloomLevel: "Application",
      options: [
        { text: "Hemolytic Uremic Syndrome (HUS)", type: "correct", explanation: "Shiga-like toxins from E. coli O157:H7 can cause renal failure and thrombocytopenia." },
        { text: "Liver failure", type: "distractor", explanation: "Incorrect." },
        { text: "Blindness", type: "misconception", explanation: "Incorrect." },
        { text: "Hearing loss", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the primary treatment for most cases of uncomplicated viral or bacterial gastroenteritis?",
      bloomLevel: "Analysis",
      options: [
        { text: "Oral or IV rehydration and electrolyte replacement", type: "correct", explanation: "Most cases are self-limiting; preventing dehydration is the priority." },
        { text: "Immediate broad-spectrum antibiotics", type: "distractor", explanation: "Antibiotics are often not needed and can sometimes worsen the condition (e.g., in HUS risk)." },
        { text: "Antidiarrheal medications like Loperamide", type: "misconception", explanation: "Should be used with caution as they can 'trap' toxins in the gut." },
        { text: "High-fiber diet", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why is 'Staphylococcal' food poisoning characterized by such a rapid onset (1-6 hours)?",
      bloomLevel: "Intuition",
      options: [
        { text: "The symptoms are caused by pre-formed enterotoxins already present in the food", type: "correct", explanation: "The bacteria don't need to grow inside the host to cause illness." },
        { text: "The bacteria move very fast through the gut", type: "distractor", explanation: "Incorrect." },
        { text: "The stomach acid turns the bacteria into a gas", type: "misconception", explanation: "Incorrect." },
        { text: "The patient is usually allergic to the bacteria", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s7e2": [ // Sickle cell trait
    {
      question: "What is the genetic difference between Sickle Cell Trait (SCT) and Sickle Cell Disease (SCD)?",
      bloomLevel: "Recall",
      options: [
        { text: "SCT is heterozygous (HbAS); SCD is homozygous (HbSS)", type: "correct", explanation: "Trait carriers have one normal gene and one sickle gene." },
        { text: "SCT is only found in women; SCD is only found in men", type: "distractor", explanation: "Incorrect." },
        { text: "SCT is caused by a virus; SCD is genetic", type: "misconception", explanation: "Incorrect." },
        { text: "SCT is a milder form of malaria", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Under what extreme conditions can a person with Sickle Cell Trait experience 'sickling' of their RBCs?",
      bloomLevel: "Understanding",
      options: [
        { text: "Severe hypoxia, extreme dehydration, or very high altitudes", type: "correct", explanation: "Normally, the concentration of HbS is too low to sickle, but extreme stress can trigger it." },
        { text: "Eating too much sugar", type: "distractor", explanation: "Incorrect." },
        { text: "Taking a cold shower", type: "misconception", explanation: "Incorrect." },
        { text: "Sleeping for more than 10 hours", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the evolutionary advantage of being a carrier for the sickle cell gene (SCT)?",
      bloomLevel: "Application",
      options: [
        { text: "Increased resistance to severe Malaria (Plasmodium falciparum)", type: "correct", explanation: "This is a classic example of 'heterozygote advantage'." },
        { text: "Better oxygen transport at high altitudes", type: "distractor", explanation: "Incorrect." },
        { text: "Faster wound healing", type: "misconception", explanation: "Incorrect." },
        { text: "Resistance to the Plague", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Which rare kidney complication is specifically associated with Sickle Cell Trait?",
      bloomLevel: "Analysis",
      options: [
        { text: "Renal Medullary Carcinoma", type: "correct", explanation: "This is a highly aggressive tumor almost exclusively found in individuals with SCT." },
        { text: "Polycystic Kidney Disease", type: "distractor", explanation: "Incorrect." },
        { text: "Diabetic Nephropathy", type: "misconception", explanation: "Incorrect." },
        { text: "Renal stones", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why does the sickle cell gene persist in populations where the disease (SCD) is so deadly?",
      bloomLevel: "Intuition",
      options: [
        { text: "The survival benefit against malaria for carriers outweighs the loss of individuals with the disease", type: "correct", explanation: "Natural selection favors the heterozygote in malaria-endemic regions." },
        { text: "The gene is actually good for the heart", type: "distractor", explanation: "Incorrect." },
        { text: "The gene is only passed down by the father", type: "misconception", explanation: "Incorrect." },
        { text: "The gene is a recent mutation from the 20th century", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s7e3": [ // Syringomyelia
    {
      question: "What is Syringomyelia?",
      bloomLevel: "Recall",
      options: [
        { text: "The development of a fluid-filled cyst (syrinx) within the spinal cord", type: "correct", explanation: "The syrinx can expand and damage the cord over time." },
        { text: "A type of brain tumor", type: "distractor", explanation: "Incorrect." },
        { text: "Inflammation of the meninges", type: "misconception", explanation: "Incorrect." },
        { text: "Hardening of the arteries in the neck", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the classic 'cape-like' distribution of sensory loss in Syringomyelia?",
      bloomLevel: "Understanding",
      options: [
        { text: "Loss of pain and temperature sensation across the shoulders and arms", type: "correct", explanation: "Due to the syrinx compressing the decussating fibers of the spinothalamic tract." },
        { text: "Loss of vision and hearing", type: "distractor", explanation: "Incorrect." },
        { text: "Numbness in the feet and legs only", type: "misconception", explanation: "Incorrect." },
        { text: "Loss of taste on the tongue", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Which structural brain abnormality is most commonly associated with Syringomyelia?",
      bloomLevel: "Application",
      options: [
        { text: "Chiari Malformation (Type I)", type: "correct", explanation: "The displacement of cerebellar tonsils into the spinal canal disrupts CSF flow." },
        { text: "Hydrocephalus", type: "distractor", explanation: "While related to CSF flow, Chiari is the specific structural cause." },
        { text: "Dandy-Walker Malformation", type: "misconception", explanation: "Incorrect." },
        { text: "Agenesis of the Corpus Callosum", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why is 'dissociated sensory loss' (loss of pain/temp but preserved touch/vibration) a hallmark of early Syringomyelia?",
      bloomLevel: "Analysis",
      options: [
        { text: "The syrinx first damages the crossing fibers of the spinothalamic tract in the center of the cord", type: "correct", explanation: "The dorsal columns (touch/vibration) are located posteriorly and are spared initially." },
        { text: "The nerves for touch are stronger than the nerves for pain", type: "distractor", explanation: "Incorrect." },
        { text: "The brain ignores the pain signals", type: "misconception", explanation: "Incorrect." },
        { text: "The syrinx only affects the skin", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is a 'Charcot Joint' (neuropathic arthropathy) sometimes seen in Syringomyelia patients?",
      bloomLevel: "Intuition",
      options: [
        { text: "Progressive joint destruction due to lack of pain sensation and repetitive trauma", type: "correct", explanation: "Usually affects the shoulders or elbows in syringomyelia." },
        { text: "A joint that is permanently frozen in place", type: "distractor", explanation: "Incorrect." },
        { text: "A joint that is infected with bacteria", type: "misconception", explanation: "Incorrect." },
        { text: "A joint that has turned into bone", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s7e4": [ // Risperidone toxicity
    {
      question: "Risperidone is a member of which class of medications?",
      bloomLevel: "Recall",
      options: [
        { text: "Atypical Antipsychotics", type: "correct", explanation: "Used primarily for schizophrenia and bipolar disorder." },
        { text: "SSRI Antidepressants", type: "distractor", explanation: "Incorrect." },
        { text: "Benzodiazepines", type: "misconception", explanation: "Incorrect." },
        { text: "Beta-blockers", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is 'Neuroleptic Malignant Syndrome' (NMS), a potentially fatal side effect of antipsychotics like Risperidone?",
      bloomLevel: "Understanding",
      options: [
        { text: "A triad of high fever, muscle rigidity, and autonomic instability", type: "correct", explanation: "It is a medical emergency." },
        { text: "A severe allergic rash", type: "distractor", explanation: "Incorrect." },
        { text: "A sudden drop in blood sugar", type: "misconception", explanation: "Incorrect." },
        { text: "Total loss of memory", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient taking Risperidone develops involuntary, repetitive movements of the tongue and face. What is this condition called?",
      bloomLevel: "Application",
      options: [
        { text: "Tardive Dyskinesia", type: "correct", explanation: "A long-term side effect of dopamine-blocking agents." },
        { text: "Akathisia", type: "distractor", explanation: "Akathisia is a feeling of inner restlessness." },
        { text: "Dystonia", type: "misconception", explanation: "Dystonia involves sustained muscle contractions." },
        { text: "Parkinsonism", type: "wrong", explanation: "Parkinsonism involves tremors and rigidity." }
      ]
    },
    {
      question: "Why can Risperidone cause 'Hyperprolactinemia' (elevated prolactin levels)?",
      bloomLevel: "Analysis",
      options: [
        { text: "It blocks dopamine in the tuberoinfundibular pathway, removing the inhibition of prolactin release", type: "correct", explanation: "Dopamine normally acts as a 'prolactin-inhibiting factor'." },
        { text: "It directly stimulates the pituitary gland to make more prolactin", type: "distractor", explanation: "Incorrect." },
        { text: "It prevents the liver from breaking down prolactin", type: "misconception", explanation: "Incorrect." },
        { text: "It is chemically identical to prolactin", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the primary mechanism of action for Risperidone's antipsychotic effects?",
      bloomLevel: "Intuition",
      options: [
        { text: "Antagonism of Dopamine D2 and Serotonin 5-HT2A receptors", type: "correct", explanation: "The serotonin antagonism is what makes it 'atypical' compared to older drugs." },
        { text: "Increasing the levels of GABA in the brain", type: "distractor", explanation: "Incorrect." },
        { text: "Blocking the reuptake of Norepinephrine", type: "misconception", explanation: "Incorrect." },
        { text: "Opening chloride channels in neurons", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s7e5": [ // Pulmonary embolism
    {
      question: "What is the most common source of the embolus in a Pulmonary Embolism (PE)?",
      bloomLevel: "Recall",
      options: [
        { text: "Deep Vein Thrombosis (DVT) in the lower extremities", type: "correct", explanation: "Clots from the proximal deep veins (popliteal, femoral, iliac) are the most likely to embolize." },
        { text: "Clots in the heart (atrial fibrillation)", type: "distractor", explanation: "These usually cause systemic emboli (e.g., stroke), not PE." },
        { text: "Air bubbles from an IV line", type: "misconception", explanation: "Possible, but rare compared to DVT." },
        { text: "Fat from a broken bone", type: "wrong", explanation: "This is a Fat Embolism, a specific and less common type." }
      ]
    },
    {
      question: "What is 'Virchow's Triad', the three factors that contribute to thrombosis?",
      bloomLevel: "Understanding",
      options: [
        { text: "Stasis, Hypercoagulability, and Endothelial injury", type: "correct", explanation: "These three conditions significantly increase the risk of clot formation." },
        { text: "Pain, Swelling, and Redness", type: "distractor", explanation: "These are symptoms, not causes." },
        { text: "Fever, Cough, and Shortness of breath", type: "misconception", explanation: "Incorrect." },
        { text: "Age, Weight, and Diet", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient presents with sudden onset pleuritic chest pain, shortness of breath, and a heart rate of 120 bpm after a long flight. What is the gold standard imaging test for PE?",
      bloomLevel: "Application",
      options: [
        { text: "CT Pulmonary Angiography (CTPA)", type: "correct", explanation: "It is fast, accurate, and widely available." },
        { text: "Chest X-ray", type: "distractor", explanation: "X-rays are often normal in PE (Westermark sign or Hampton's hump are rare)." },
        { text: "Echocardiogram", type: "misconception", explanation: "Echo can show right heart strain but cannot definitively diagnose the clot in the lung." },
        { text: "D-dimer test", type: "wrong", explanation: "D-dimer is a blood test, not an imaging test, and is used to *rule out* PE in low-risk patients." }
      ]
    },
    {
      question: "What is a 'Saddle Embolus'?",
      bloomLevel: "Analysis",
      options: [
        { text: "A large clot that straddles the bifurcation of the main pulmonary artery", type: "correct", explanation: "It can cause sudden obstructive shock and death." },
        { text: "A clot that is shaped like a horse's saddle", type: "distractor", explanation: "Incorrect." },
        { text: "A clot that only happens to people who ride horses", type: "misconception", explanation: "Incorrect." },
        { text: "A clot that is located in the lower back", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why does a PE cause a 'V/Q mismatch' in the lungs?",
      bloomLevel: "Intuition",
      options: [
        { text: "The lung is being ventilated (V) but not perfused (Q) due to the blockage", type: "correct", explanation: "This leads to 'dead space' ventilation and hypoxia." },
        { text: "The patient stops breathing entirely", type: "distractor", explanation: "Incorrect." },
        { text: "The blood is moving too fast for the oxygen to enter", type: "misconception", explanation: "Incorrect." },
        { text: "The alveoli are filled with blood", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s7e6": [ // Hepatitis C
    {
      question: "Hepatitis C is primarily transmitted through which route?",
      bloomLevel: "Recall",
      options: [
        { text: "Blood-to-blood contact (e.g., IV drug use, needle sticks)", type: "correct", explanation: "Sexual and vertical transmission are possible but much less common than for Hep B." },
        { text: "Fecal-oral route (contaminated food/water)", type: "distractor", explanation: "This is Hep A and Hep E." },
        { text: "Respiratory droplets", type: "misconception", explanation: "Incorrect." },
        { text: "Skin-to-skin contact", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Unlike Hepatitis A or B, what is the most common outcome of an acute Hepatitis C infection?",
      bloomLevel: "Understanding",
      options: [
        { text: "Progression to chronic infection (75-85% of cases)", type: "correct", explanation: "Hep C is notorious for its ability to evade the immune system and persist." },
        { text: "Complete recovery and lifelong immunity", type: "distractor", explanation: "Only about 15-25% of people clear the virus spontaneously." },
        { text: "Fulminant liver failure and death within weeks", type: "misconception", explanation: "Acute liver failure is very rare in Hep C." },
        { text: "Instant development of liver cancer", type: "wrong", explanation: "Cancer takes decades of chronic inflammation to develop." }
      ]
    },
    {
      question: "A patient with chronic Hep C presents with yellowing of the eyes (jaundice) and a swollen abdomen (ascites). What is the underlying process?",
      bloomLevel: "Application",
      options: [
        { text: "Liver Cirrhosis", type: "correct", explanation: "Chronic inflammation leads to extensive scarring and loss of liver function." },
        { text: "Acute Pancreatitis", type: "distractor", explanation: "Incorrect." },
        { text: "Gallstones", type: "misconception", explanation: "Incorrect." },
        { text: "Kidney failure", type: "wrong", explanation: "While Hep C can affect kidneys (cryoglobulinemia), the jaundice and ascites are hepatic." }
      ]
    },
    {
      question: "What is the modern 'Cure' for Hepatitis C?",
      bloomLevel: "Analysis",
      options: [
        { text: "Direct-Acting Antivirals (DAAs)", type: "correct", explanation: "These oral medications can achieve a Sustained Virologic Response (SVR) in >95% of patients." },
        { text: "Interferon injections", type: "distractor", explanation: "Interferon was the old standard, but had many side effects and lower cure rates." },
        { text: "A lifelong vaccine", type: "misconception", explanation: "There is currently no vaccine for Hepatitis C." },
        { text: "Liver transplant is the only cure", type: "wrong", explanation: "Transplant replaces the organ but doesn't necessarily clear the virus from the body." }
      ]
    },
    {
      question: "Why is there no vaccine for Hepatitis C, despite having vaccines for Hep A and B?",
      bloomLevel: "Intuition",
      options: [
        { text: "The virus has high genetic diversity and mutates rapidly (quasispecies)", type: "correct", explanation: "The error-prone RNA polymerase makes it a moving target for the immune system." },
        { text: "The virus is too small to be seen by the immune system", type: "distractor", explanation: "Incorrect." },
        { text: "The virus only lives inside the liver cells", type: "misconception", explanation: "Incorrect." },
        { text: "The vaccine would be too expensive to manufacture", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s7e8": [ // Multiple sclerosis & Malnutrition
    {
      question: "Multiple Sclerosis (MS) is an autoimmune disease that targets which structure in the Central Nervous System?",
      bloomLevel: "Recall",
      options: [
        { text: "The Myelin Sheath of axons", type: "correct", explanation: "Demyelination slows or blocks nerve impulses." },
        { text: "The cell bodies of neurons", type: "distractor", explanation: "Incorrect." },
        { text: "The neurotransmitter receptors", type: "misconception", explanation: "This is Myasthenia Gravis (ACh receptors)." },
        { text: "The blood vessels in the brain", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is 'Lhermitte's Sign', often reported by MS patients?",
      bloomLevel: "Understanding",
      options: [
        { text: "An electric shock-like sensation that runs down the spine when the neck is flexed", type: "correct", explanation: "Indicates irritation or lesions in the cervical spinal cord." },
        { text: "A sudden loss of vision in one eye", type: "distractor", explanation: "This is Optic Neuritis." },
        { text: "Tremor that occurs when reaching for an object", type: "misconception", explanation: "This is an Intention Tremor." },
        { text: "Weakness that gets worse with heat", type: "wrong", explanation: "This is Uhthoff's Phenomenon." }
      ]
    },
    {
      question: "A patient with MS presents with severe fatigue, weakness, and confusion. They have been on a 'fad diet' and have very low levels of several vitamins. Which vitamin deficiency can mimic some neurological symptoms of MS?",
      bloomLevel: "Application",
      options: [
        { text: "Vitamin B12 (Cobalamin)", type: "correct", explanation: "B12 deficiency causes subacute combined degeneration of the spinal cord." },
        { text: "Vitamin C", type: "distractor", explanation: "Incorrect." },
        { text: "Vitamin K", type: "misconception", explanation: "Incorrect." },
        { text: "Vitamin A", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the characteristic finding in the Cerebrospinal Fluid (CSF) of an MS patient?",
      bloomLevel: "Analysis",
      options: [
        { text: "Oligoclonal bands (IgG)", type: "correct", explanation: "Indicates intrathecal (within the CNS) antibody production." },
        { text: "Very high protein and low glucose", type: "distractor", explanation: "This points toward bacterial meningitis." },
        { text: "Presence of red blood cells", type: "misconception", explanation: "This points toward subarachnoid hemorrhage or a 'traumatic tap'." },
        { text: "Small parasites", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why is MS more common in populations living further from the equator?",
      bloomLevel: "Intuition",
      options: [
        { text: "Lower Vitamin D levels (due to less sunlight) may play a role in immune regulation", type: "correct", explanation: "This is the 'latitude gradient' theory of MS." },
        { text: "Cold weather damages the nerves", type: "distractor", explanation: "Incorrect." },
        { text: "People in the north eat more processed food", type: "misconception", explanation: "Incorrect." },
        { text: "The virus that causes MS only lives in cold climates", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s7e9": [ // Varicella (Chickenpox/Shingles)
    {
      question: "The Varicella-Zoster Virus (VZV) belongs to which family of viruses?",
      bloomLevel: "Recall",
      options: [
        { text: "Herpesviridae", type: "correct", explanation: "It is also known as Human Herpesvirus 3 (HHV-3)." },
        { text: "Retroviridae", type: "distractor", explanation: "Incorrect." },
        { text: "Orthomyxoviridae", type: "misconception", explanation: "Incorrect." },
        { text: "Poxviridae", type: "wrong", explanation: "Despite the name 'Chickenpox', it is a herpesvirus, not a poxvirus." }
      ]
    },
    {
      question: "After the initial 'Chickenpox' infection resolves, where does the virus remain latent in the body?",
      bloomLevel: "Understanding",
      options: [
        { text: "Dorsal root ganglia (sensory nerve cells)", type: "correct", explanation: "It can reactivate decades later as Shingles (Herpes Zoster)." },
        { text: "The liver", type: "distractor", explanation: "Incorrect." },
        { text: "The bone marrow", type: "misconception", explanation: "Incorrect." },
        { text: "The lymph nodes", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient presents with a painful, blistering rash that follows a single stripe (dermatome) on one side of their chest. What is the diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "Herpes Zoster (Shingles)", type: "correct", explanation: "The dermatomal distribution is the hallmark of reactivation." },
        { text: "Chickenpox", type: "distractor", explanation: "Chickenpox is a generalized, itchy rash, not localized to a dermatome." },
        { text: "Poison Ivy", type: "misconception", explanation: "Poison ivy is linear but doesn't follow a nerve path and is usually on exposed skin." },
        { text: "Impetigo", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is 'Post-Herpetic Neuralgia' (PHN)?",
      bloomLevel: "Analysis",
      options: [
        { text: "Persistent, severe nerve pain that lasts long after the shingles rash has healed", type: "correct", explanation: "It is the most common complication of shingles." },
        { text: "A secondary bacterial infection of the blisters", type: "distractor", explanation: "Incorrect." },
        { text: "The stage where the patient is most contagious", type: "misconception", explanation: "Incorrect." },
        { text: "Loss of vision due to the virus affecting the eye", type: "wrong", explanation: "This is Zoster Ophthalmicus." }
      ]
    },
    {
      question: "Why is the chickenpox rash often described as 'dewdrops on a rose petal'?",
      bloomLevel: "Intuition",
      options: [
        { text: "It consists of small, clear vesicles on an erythematous (red) base", type: "correct", explanation: "A classic dermatological description of the early lesions." },
        { text: "The rash smells like flowers", type: "distractor", explanation: "Incorrect." },
        { text: "The rash only appears in the spring", type: "misconception", explanation: "Incorrect." },
        { text: "The rash is shaped like a rose", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s7e10": [ // Variegate porphyria
    {
      question: "Variegate Porphyria (VP) is caused by a deficiency in which enzyme?",
      bloomLevel: "Recall",
      options: [
        { text: "Protoporphyrinogen oxidase", type: "correct", explanation: "This is an autosomal dominant hepatic porphyria." },
        { text: "Heme synthase", type: "distractor", explanation: "Incorrect." },
        { text: "Ferrochelatase", type: "misconception", explanation: "This is deficient in Erythropoietic Protoporphyria." },
        { text: "Catalase", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What makes Variegate Porphyria 'variegate'?",
      bloomLevel: "Understanding",
      options: [
        { text: "It can present with both acute neurological attacks and chronic skin photosensitivity", type: "correct", explanation: "It combines features of AIP and PCT." },
        { text: "It changes the color of the patient's eyes", type: "distractor", explanation: "Incorrect." },
        { text: "It only affects people of various different ethnicities", type: "misconception", explanation: "Incorrect." },
        { text: "The symptoms change every single day", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient with VP presents with severe abdominal pain and dark urine. Which of the following is a common 'trigger' for such an attack?",
      bloomLevel: "Application",
      options: [
        { text: "Fasting or low-carbohydrate diets", type: "correct", explanation: "Glucose suppresses the first enzyme in the heme pathway (ALAS1)." },
        { text: "Drinking too much water", type: "distractor", explanation: "Incorrect." },
        { text: "Eating large amounts of spinach", type: "misconception", explanation: "Incorrect." },
        { text: "Exercise", type: "wrong", explanation: "While stress can trigger attacks, fasting is a more direct metabolic trigger." }
      ]
    },
    {
      question: "What is the characteristic finding in the stool of a patient with Variegate Porphyria?",
      bloomLevel: "Analysis",
      options: [
        { text: "Elevated Coproporphyrin and Protoporphyrin", type: "correct", explanation: "Stool porphyrin analysis is key for differentiating VP from other porphyrias." },
        { text: "Presence of blood", type: "distractor", explanation: "Incorrect." },
        { text: "Undigested fat (steatorrhea)", type: "misconception", explanation: "Incorrect." },
        { text: "High levels of iron", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why is the skin in VP so sensitive to sunlight?",
      bloomLevel: "Intuition",
      options: [
        { text: "Accumulated porphyrins in the skin react with UV light to produce reactive oxygen species", type: "correct", explanation: "This leads to cell damage, blistering, and scarring." },
        { text: "The skin has lost its natural sunscreen", type: "distractor", explanation: "Incorrect." },
        { text: "The patient is allergic to the sun", type: "misconception", explanation: "Incorrect." },
        { text: "The sun turns the blood into a toxin", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s8e1": [ // Mastocytosis
    {
      question: "Systemic Mastocytosis is characterized by the abnormal proliferation and accumulation of which cell type?",
      bloomLevel: "Recall",
      options: [
        { text: "Mast cells", type: "correct", explanation: "These cells are part of the immune system and contain histamine and heparin." },
        { text: "Neutrophils", type: "distractor", explanation: "Incorrect." },
        { text: "Eosinophils", type: "misconception", explanation: "Incorrect." },
        { text: "Basophils", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the most common genetic mutation associated with Systemic Mastocytosis?",
      bloomLevel: "Understanding",
      options: [
        { text: "KIT D816V", type: "correct", explanation: "This mutation leads to the constitutive activation of the KIT receptor tyrosine kinase." },
        { text: "BCR-ABL", type: "distractor", explanation: "This is associated with CML." },
        { text: "JAK2 V617F", type: "misconception", explanation: "This is associated with Polycythemia Vera." },
        { text: "BRAF V600E", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient presents with recurrent flushing, abdominal cramping, and a positive 'Darier's sign'. What does this sign indicate?",
      bloomLevel: "Application",
      options: [
        { text: "Urticaria and erythema after stroking a skin lesion", type: "correct", explanation: "Caused by the release of histamine from mast cells in the skin." },
        { text: "A sudden drop in blood pressure when standing", type: "distractor", explanation: "Incorrect." },
        { text: "A change in the color of the eyes", type: "misconception", explanation: "Incorrect." },
        { text: "A specific type of heart murmur", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Which laboratory test is most useful for screening and monitoring systemic mast cell burden?",
      bloomLevel: "Analysis",
      options: [
        { text: "Serum Tryptase", type: "correct", explanation: "Tryptase is an enzyme released by mast cells; levels >20 ng/mL are highly suggestive of systemic disease." },
        { text: "Serum Ferritin", type: "distractor", explanation: "Incorrect." },
        { text: "C-reactive protein (CRP)", type: "misconception", explanation: "Incorrect." },
        { text: "Hemoglobin A1c", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why should patients with mastocytosis avoid certain medications like NSAIDs or certain anesthetics?",
      bloomLevel: "Intuition",
      options: [
        { text: "They can trigger massive mast cell degranulation and anaphylaxis", type: "correct", explanation: "These triggers can cause a sudden, life-threatening release of mediators." },
        { text: "They prevent the mast cells from working properly", type: "distractor", explanation: "Incorrect." },
        { text: "They cause the mast cells to turn into cancer", type: "misconception", explanation: "Incorrect." },
        { text: "They make the skin turn blue", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s8e2": [ // Eosinophilic pneumonitis
    {
      question: "What is the hallmark finding in the Bronchoalveolar Lavage (BAL) fluid of a patient with Eosinophilic Pneumonia?",
      bloomLevel: "Recall",
      options: [
        { text: "High percentage of eosinophils (usually >25%)", type: "correct", explanation: "This is the key diagnostic feature." },
        { text: "High percentage of neutrophils", type: "distractor", explanation: "Incorrect." },
        { text: "Presence of malignant cells", type: "misconception", explanation: "Incorrect." },
        { text: "Absence of all white blood cells", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "How does Acute Eosinophilic Pneumonia (AEP) typically differ from Chronic Eosinophilic Pneumonia (CEP)?",
      bloomLevel: "Understanding",
      options: [
        { text: "AEP is rapid-onset and often related to new smoking; CEP is slower and often associated with asthma", type: "correct", explanation: "AEP can lead to respiratory failure quickly." },
        { text: "AEP only affects children; CEP only affects adults", type: "distractor", explanation: "Incorrect." },
        { text: "AEP is caused by a virus; CEP is caused by a fungus", type: "misconception", explanation: "Incorrect." },
        { text: "AEP is painless; CEP is painful", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the classic radiographic finding described as the 'photographic negative' of pulmonary edema in CEP?",
      bloomLevel: "Application",
      options: [
        { text: "Peripheral lung infiltrates with central sparing", type: "correct", explanation: "Pulmonary edema is usually central with peripheral sparing." },
        { text: "A single large mass in the center of the lung", type: "distractor", explanation: "Incorrect." },
        { text: "Total collapse of one lung", type: "misconception", explanation: "Incorrect." },
        { text: "Fluid around the heart", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Which medication class is considered the first-line treatment and is often diagnostic due to the rapid response?",
      bloomLevel: "Analysis",
      options: [
        { text: "Corticosteroids", type: "correct", explanation: "Symptoms and infiltrates often resolve within 48 hours of starting steroids." },
        { text: "Antibiotics", type: "distractor", explanation: "Incorrect." },
        { text: "Antifungals", type: "misconception", explanation: "Incorrect." },
        { text: "Diuretics", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why is peripheral blood eosinophilia not always present in Acute Eosinophilic Pneumonia (AEP)?",
      bloomLevel: "Intuition",
      options: [
        { text: "The eosinophils are rapidly sequestered in the lung tissue early in the disease", type: "correct", explanation: "Blood counts may be normal initially even if the lungs are full of eosinophils." },
        { text: "The body hasn't started making eosinophils yet", type: "distractor", explanation: "Incorrect." },
        { text: "The eosinophils are hiding in the bone marrow", type: "misconception", explanation: "Incorrect." },
        { text: "The patient is taking antihistamines", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s8e3": [ // Plummer's disease (Toxic Multinodular Goiter)
    {
      question: "Plummer's disease, or Toxic Multinodular Goiter, is a common cause of which condition?",
      bloomLevel: "Recall",
      options: [
        { text: "Hyperthyroidism", type: "correct", explanation: "Multiple nodules in the thyroid become autonomous and overproduce hormones." },
        { text: "Hypothyroidism", type: "distractor", explanation: "Incorrect." },
        { text: "Diabetes Insipidus", type: "misconception", explanation: "Incorrect." },
        { text: "Adrenal Insufficiency", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "How does Plummer's disease differ from Graves' disease clinically?",
      bloomLevel: "Understanding",
      options: [
        { text: "It lacks the autoimmune features like exophthalmos (bulging eyes)", type: "correct", explanation: "Plummer's is due to autonomous nodules, not TSH-receptor antibodies." },
        { text: "It only affects young children", type: "distractor", explanation: "It is actually more common in the elderly." },
        { text: "It causes the thyroid to shrink", type: "misconception", explanation: "Incorrect." },
        { text: "It is caused by a lack of iodine", type: "wrong", explanation: "While iodine deficiency can lead to goiter, Plummer's is the 'toxic' (overactive) stage." }
      ]
    },
    {
      question: "An elderly patient with a long-standing goiter develops atrial fibrillation and weight loss. What is the most likely diagnosis?",
      bloomLevel: "Application",
      options: [
        { text: "Toxic Multinodular Goiter (Plummer's Disease)", type: "correct", explanation: "Hyperthyroidism in the elderly often presents with cardiac symptoms." },
        { text: "Apathetic Hyperthyroidism", type: "distractor", explanation: "This is a clinical presentation, but Plummer's is the likely underlying cause if a goiter is present." },
        { text: "Heart Failure", type: "misconception", explanation: "Heart failure is a complication, not the primary diagnosis." },
        { text: "Dementia", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is the characteristic finding on a radioactive iodine uptake (RAIU) scan in Plummer's disease?",
      bloomLevel: "Analysis",
      options: [
        { text: "Patchy, irregular uptake with multiple 'hot' nodules", type: "correct", explanation: "The 'hot' nodules are the areas of autonomous hormone production." },
        { text: "Diffuse, uniform high uptake", type: "distractor", explanation: "This is seen in Graves' disease." },
        { text: "No uptake at all (cold scan)", type: "misconception", explanation: "Incorrect." },
        { text: "A single 'cold' nodule", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why is the TSH level suppressed in patients with Plummer's disease?",
      bloomLevel: "Intuition",
      options: [
        { text: "The excess thyroid hormone from the nodules provides negative feedback to the pituitary", type: "correct", explanation: "The pituitary senses the high T3/T4 and stops producing TSH." },
        { text: "The nodules destroy the pituitary gland", type: "distractor", explanation: "Incorrect." },
        { text: "The TSH is being used up by the thyroid", type: "misconception", explanation: "Incorrect." },
        { text: "The patient is taking TSH-blocking drugs", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s8e4": [ // Rheumatoid arthritis
    {
      question: "Rheumatoid Arthritis (RA) is a chronic inflammatory disorder that primarily affects which part of the body?",
      bloomLevel: "Recall",
      options: [
        { text: "The synovial lining of joints", type: "correct", explanation: "It leads to joint destruction and deformity." },
        { text: "The heart valves", type: "distractor", explanation: "Incorrect." },
        { text: "The large muscles", type: "misconception", explanation: "Incorrect." },
        { text: "The skin only", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "What is 'Rheumatoid Factor' (RF)?",
      bloomLevel: "Understanding",
      options: [
        { text: "An autoantibody (usually IgM) directed against the Fc portion of IgG", type: "correct", explanation: "It is found in about 70-80% of RA patients." },
        { text: "A hormone that causes joint pain", type: "distractor", explanation: "Incorrect." },
        { text: "A protein that repairs cartilage", type: "misconception", explanation: "Incorrect." },
        { text: "A virus that triggers the disease", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "A patient presents with symmetrical joint pain and morning stiffness that lasts for over an hour. Which joints are most commonly involved in early RA?",
      bloomLevel: "Application",
      options: [
        { text: "Small joints of the hands (MCP, PIP) and feet (MTP)", type: "correct", explanation: "Symmetry and small joint involvement are classic." },
        { text: "The distal interphalangeal (DIP) joints", type: "distractor", explanation: "DIP involvement is more common in Osteoarthritis or Psoriatic Arthritis." },
        { text: "The large joints like the hips and knees only", type: "misconception", explanation: "Incorrect." },
        { text: "The spine and sacroiliac joints", type: "wrong", explanation: "This is seen in Ankylosing Spondylitis." }
      ]
    },
    {
      question: "What is a 'Pannus' in the context of RA?",
      bloomLevel: "Analysis",
      options: [
        { text: "An abnormal layer of fibrovascular or granulation tissue that invades the joint space", type: "correct", explanation: "It releases enzymes that destroy cartilage and bone." },
        { text: "A type of protective cushion in the joint", type: "distractor", explanation: "Incorrect." },
        { text: "A blood clot in the synovial fluid", type: "misconception", explanation: "Incorrect." },
        { text: "A specific type of skin rash", type: "wrong", explanation: "Incorrect." }
      ]
    },
    {
      question: "Why are anti-cyclic citrullinated peptide (anti-CCP) antibodies considered more specific than RF for diagnosing RA?",
      bloomLevel: "Intuition",
      options: [
        { text: "They are rarely found in other inflammatory or infectious conditions", type: "correct", explanation: "RF can be elevated in many diseases, but anti-CCP is highly specific for RA." },
        { text: "They are only produced by the joints themselves", type: "distractor", explanation: "Incorrect." },
        { text: "They are the actual cause of the joint pain", type: "misconception", explanation: "Incorrect." },
        { text: "They disappear once the treatment starts", type: "wrong", explanation: "Incorrect." }
      ]
    }
  ],
  "s3e14": [ // CIPA (Congenital Insensitivity to Pain with Anhidrosis)
    {
      question: "CIPA is caused by a mutation in which gene, affecting the development of nociceptors?",
      bloomLevel: "Recall",
      options: [
        { text: "NTRK1", type: "correct", explanation: "NTRK1 encodes the receptor for Nerve Growth Factor (NGF)." },
        { text: "SCN9A", type: "distractor", explanation: "SCN9A mutations cause other types of pain insensitivity without anhidrosis." },
        { text: "CFTR", type: "misconception", explanation: "CFTR is associated with Cystic Fibrosis." },
        { text: "HTT", type: "wrong", explanation: "HTT is associated with Huntington's disease." }
      ]
    },
    {
      question: "Why do patients with CIPA frequently suffer from unexplained high fevers?",
      bloomLevel: "Understanding",
      options: [
        { text: "The absence of sweat glands (anhidrosis) prevents thermoregulation", type: "correct", explanation: "They cannot cool down through evaporation." },
        { text: "The body produces excess heat to compensate for the lack of pain", type: "distractor", explanation: "Heat production is normal; it's the cooling that fails." },
        { text: "They have a chronic, low-grade bacterial infection in the blood", type: "misconception", explanation: "Fever is due to heat retention, not necessarily infection." },
        { text: "The hypothalamus is unable to sense the external temperature", type: "wrong", explanation: "The defect is in the peripheral nerves and glands, not the brain." }
      ]
    },
    {
      question: "What is a common and severe orthopedic complication in children with CIPA?",
      bloomLevel: "Application",
      options: [
        { text: "Charcot joints (neuropathic arthropathy)", type: "correct", explanation: "Repeated trauma to joints without pain leads to severe destruction." },
        { text: "Osteogenesis Imperfecta", type: "distractor", explanation: "This is a separate genetic bone-fragility disorder." },
        { text: "Scoliosis due to muscle overgrowth", type: "misconception", explanation: "The issue is joint destruction from lack of pain, not muscle growth." },
        { text: "Spontaneous fractures from lack of calcium", type: "wrong", explanation: "Bones are structurally normal; they just get abused." }
      ]
    },
    {
      question: "How does the 'Anhidrosis' part of CIPA help differentiate it from other pain insensitivity syndromes?",
      bloomLevel: "Analysis",
      options: [
        { text: "It indicates a defect in the sympathetic nervous system development", type: "correct", explanation: "CIPA affects both sensory and some autonomic neurons." },
        { text: "It means the patient is allergic to water", type: "distractor", explanation: "Anhidrosis means 'no sweat', not 'no water'." },
        { text: "It suggests the patient has a hidden case of Cystic Fibrosis", type: "misconception", explanation: "CF causes salty sweat; CIPA causes no sweat." },
        { text: "It proves the patient is faking the pain insensitivity", type: "wrong", explanation: "Anhidrosis is an objective clinical sign that cannot be faked." }
      ]
    },
    {
      question: "Why is self-mutilation (e.g., biting the tongue or fingers) common in infants with CIPA?",
      bloomLevel: "Intuition",
      options: [
        { text: "They lack the protective pain reflex that stops the behavior", type: "correct", explanation: "Babies explore with their mouths and don't feel the damage they cause." },
        { text: "They have an innate psychological drive to hurt themselves", type: "distractor", explanation: "It's accidental exploration, not intentional self-harm." },
        { text: "The teeth are sharper than normal in these patients", type: "misconception", explanation: "Teeth are normal; the feedback loop is broken." },
        { text: "It is a side effect of the high fevers they experience", type: "wrong", explanation: "It happens even when they are afebrile." }
      ]
    }
  ]
};
