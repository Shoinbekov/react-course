// Generates src/data/medicines.json — the seed data for the simulated API.
// Run with: npm run generate-data
// The output is deterministic (same input → same file), so it is safe to commit.
import { writeFileSync } from 'node:fs'

// [name, active ingredient, category, form, strength, prescription?, base price in KZT]
const DRUGS = [
  ['Paracetamol', 'Paracetamol', 'Pain & Fever', 'Tablet', '500 mg', false, 350],
  ['Panadol Extra', 'Paracetamol + Caffeine', 'Pain & Fever', 'Tablet', '500 mg / 65 mg', false, 1450],
  ['Ibuprofen', 'Ibuprofen', 'Pain & Fever', 'Tablet', '400 mg', false, 520],
  ['Nurofen for Children', 'Ibuprofen', 'Pain & Fever', 'Syrup', '100 mg / 5 ml', false, 2350],
  ['Aspirin Cardio', 'Acetylsalicylic acid', 'Heart & Blood Pressure', 'Tablet', '100 mg', false, 1650],
  ['Nimesil', 'Nimesulide', 'Pain & Fever', 'Powder', '100 mg', true, 3900],
  ['Ketorol', 'Ketorolac', 'Pain & Fever', 'Tablet', '10 mg', true, 980],
  ['Diclofenac Gel', 'Diclofenac', 'Pain & Fever', 'Gel', '1%', false, 1250],
  ['No-Spa', 'Drotaverine', 'Digestive Health', 'Tablet', '40 mg', false, 1850],
  ['Amoxicillin', 'Amoxicillin', 'Antibiotics', 'Capsule', '500 mg', true, 1350],
  ['Augmentin', 'Amoxicillin + Clavulanic acid', 'Antibiotics', 'Tablet', '875 mg / 125 mg', true, 4950],
  ['Azithromycin', 'Azithromycin', 'Antibiotics', 'Tablet', '500 mg', true, 2100],
  ['Ciprofloxacin', 'Ciprofloxacin', 'Antibiotics', 'Tablet', '500 mg', true, 1150],
  ['Ceftriaxone', 'Ceftriaxone', 'Antibiotics', 'Injection', '1 g', true, 690],
  ['Levomekol', 'Chloramphenicol + Methyluracil', 'Skin Care', 'Ointment', '40 g', false, 1100],
  ['Loratadine', 'Loratadine', 'Allergy', 'Tablet', '10 mg', false, 640],
  ['Cetirizine', 'Cetirizine', 'Allergy', 'Tablet', '10 mg', false, 780],
  ['Suprastin', 'Chloropyramine', 'Allergy', 'Tablet', '25 mg', false, 1590],
  ['Zyrtec Drops', 'Cetirizine', 'Allergy', 'Drops', '10 mg / ml', false, 3450],
  ['Erius', 'Desloratadine', 'Allergy', 'Syrup', '0.5 mg / ml', false, 4200],
  ['Omeprazole', 'Omeprazole', 'Digestive Health', 'Capsule', '20 mg', false, 890],
  ['Pantoprazole', 'Pantoprazole', 'Digestive Health', 'Tablet', '40 mg', true, 2650],
  ['Smecta', 'Diosmectite', 'Digestive Health', 'Powder', '3 g', false, 2300],
  ['Mezym Forte', 'Pancreatin', 'Digestive Health', 'Tablet', '10000 IU', false, 2150],
  ['Linex', 'Lactic acid bacteria', 'Digestive Health', 'Capsule', '280 mg', false, 3700],
  ['Loperamide', 'Loperamide', 'Digestive Health', 'Capsule', '2 mg', false, 420],
  ['Enterosgel', 'Polymethylsiloxane', 'Digestive Health', 'Gel', '225 g', false, 4800],
  ['Duphalac', 'Lactulose', 'Digestive Health', 'Syrup', '667 mg / ml', false, 3950],
  ['Amlodipine', 'Amlodipine', 'Heart & Blood Pressure', 'Tablet', '5 mg', true, 760],
  ['Lisinopril', 'Lisinopril', 'Heart & Blood Pressure', 'Tablet', '10 mg', true, 690],
  ['Bisoprolol', 'Bisoprolol', 'Heart & Blood Pressure', 'Tablet', '5 mg', true, 1240],
  ['Losartan', 'Losartan', 'Heart & Blood Pressure', 'Tablet', '50 mg', true, 1480],
  ['Atorvastatin', 'Atorvastatin', 'Heart & Blood Pressure', 'Tablet', '20 mg', true, 2890],
  ['Validol', 'Menthyl isovalerate', 'Heart & Blood Pressure', 'Tablet', '60 mg', false, 310],
  ['Metformin', 'Metformin', 'Diabetes', 'Tablet', '850 mg', true, 1120],
  ['Glibenclamide', 'Glibenclamide', 'Diabetes', 'Tablet', '5 mg', true, 830],
  ['Diabeton MR', 'Gliclazide', 'Diabetes', 'Tablet', '60 mg', true, 3350],
  ['Ambroxol', 'Ambroxol', 'Cold & Cough', 'Syrup', '15 mg / 5 ml', false, 980],
  ['ACC', 'Acetylcysteine', 'Cold & Cough', 'Powder', '200 mg', false, 2450],
  ['Theraflu', 'Paracetamol + Phenylephrine', 'Cold & Cough', 'Powder', '650 mg', false, 2950],
  ['Strepsils', 'Amylmetacresol', 'Cold & Cough', 'Lozenge', '0.6 mg', false, 1850],
  ['Xylometazoline', 'Xylometazoline', 'Cold & Cough', 'Spray', '0.1%', false, 690],
  ['Aqua Maris', 'Sea water', 'Cold & Cough', 'Spray', '30 ml', false, 2700],
  ['Sinupret', 'Herbal extract', 'Cold & Cough', 'Tablet', '160 mg', false, 4350],
  ['Vitamin D3', 'Cholecalciferol', 'Vitamins', 'Drops', '500 IU / drop', false, 2550],
  ['Vitamin C', 'Ascorbic acid', 'Vitamins', 'Tablet', '500 mg', false, 640],
  ['Magne B6', 'Magnesium + Pyridoxine', 'Vitamins', 'Tablet', '470 mg / 5 mg', false, 4450],
  ['Omega-3', 'Fish oil', 'Vitamins', 'Capsule', '1000 mg', false, 3900],
  ['Complivit', 'Multivitamin', 'Vitamins', 'Tablet', '30 tablets', false, 2100],
  ['Ferrum Lek', 'Iron hydroxide', 'Vitamins', 'Syrup', '50 mg / 5 ml', false, 3250],
  ['Panthenol', 'Dexpanthenol', 'Skin Care', 'Spray', '5%', false, 2600],
  ['Bepanthen', 'Dexpanthenol', 'Skin Care', 'Ointment', '5%', false, 3150],
  ['Clotrimazole', 'Clotrimazole', 'Skin Care', 'Ointment', '1%', false, 560],
  ['Acyclovir', 'Acyclovir', 'Skin Care', 'Ointment', '5%', false, 480],
  ['Hydrocortisone', 'Hydrocortisone', 'Skin Care', 'Ointment', '1%', true, 950],
  ['Glycine', 'Glycine', 'Nervous System', 'Tablet', '100 mg', false, 450],
  ['Novo-Passit', 'Herbal extract + Guaifenesin', 'Nervous System', 'Syrup', '100 ml', false, 3850],
  ['Afobazol', 'Fabomotizole', 'Nervous System', 'Tablet', '10 mg', false, 2950],
  ['Sertraline', 'Sertraline', 'Nervous System', 'Tablet', '50 mg', true, 3600],
  ['Melatonin', 'Melatonin', 'Nervous System', 'Tablet', '3 mg', false, 2400],
]

const MANUFACTURERS = [
  ['Chimpharm', 'Kazakhstan'],
  ['Nobel Almaty Pharmaceutical Factory', 'Kazakhstan'],
  ['KRKA', 'Slovenia'],
  ['Gedeon Richter', 'Hungary'],
  ['Sandoz', 'Switzerland'],
  ['Teva', 'Israel'],
  ['Bayer', 'Germany'],
  ['Servier', 'France'],
  ['Pharmstandard', 'Russia'],
  ['Dr. Reddy\'s', 'India'],
]

// Small deterministic pseudo-random generator (same numbers every run).
let seed = 20261022
function rand() {
  seed = (seed * 1103515245 + 12345) % 2147483648
  return seed / 2147483648
}

const DESCRIPTION = {
  'Pain & Fever': 'Relieves mild to moderate pain and reduces fever.',
  Antibiotics: 'Treats bacterial infections. Take the full course prescribed by your doctor.',
  Allergy: 'Reduces allergy symptoms such as sneezing, itching and watery eyes.',
  'Digestive Health': 'Supports the digestive system and relieves stomach discomfort.',
  'Heart & Blood Pressure': 'Used for heart health and blood pressure control.',
  Diabetes: 'Helps control blood sugar levels in type 2 diabetes.',
  'Cold & Cough': 'Eases symptoms of cold, cough and sore throat.',
  Vitamins: 'Dietary supplement that supports overall health.',
  'Skin Care': 'Applied to the skin to treat irritation, wounds or infections.',
  'Nervous System': 'Supports the nervous system, mood and sleep.',
}

const medicines = []
let id = 1
// Two offers (different manufacturers) for every drug → 120 records.
for (let round = 0; round < 2; round++) {
  DRUGS.forEach(([name, ingredient, category, form, strength, prescription, basePrice], i) => {
    const [manufacturer, country] = MANUFACTURERS[(i * 3 + round * 7) % MANUFACTURERS.length]
    const priceFactor = round === 0 ? 1 : 0.8 + rand() * 0.6
    const price = Math.round((basePrice * priceFactor) / 10) * 10
    const month = String(1 + Math.floor(rand() * 9)).padStart(2, '0')
    medicines.push({
      id: id++,
      name,
      activeIngredient: ingredient,
      category,
      form,
      strength,
      manufacturer,
      country,
      price,
      inStock: Math.floor(rand() * 60), // 0 means out of stock
      prescription,
      rating: Math.round((3.4 + rand() * 1.6) * 10) / 10,
      description: DESCRIPTION[category],
      addedAt: `2026-${month}-${String(1 + Math.floor(rand() * 28)).padStart(2, '0')}`,
    })
  })
}

writeFileSync(new URL('../src/data/medicines.json', import.meta.url), JSON.stringify(medicines, null, 2) + '\n')
console.log(`Generated ${medicines.length} medicines`)
