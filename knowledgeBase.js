/**
 * InsureAssist AI - Knowledge Base
 * Authoritative, structured health insurance knowledge repository
 */

export const KNOWLEDGE_BASE = {
  // 1. Insurance Basics & Core Definitions
  terms: {
    "health insurance": {
      title: "Health Insurance",
      summary: "A contract between an individual and an insurance provider where the insurer agrees to pay for or reimburse medical expenses incurred due to illness, injury, or preventative care in exchange for regular premium payments.",
      keyPoints: [
        "Financial shield against unexpected high hospital bills",
        "Includes in-patient hospitalization, day-care procedures, and pre/post-hospitalization care",
        "Can be individual or family floater coverage"
      ],
      relatedQuestions: [
        "How does health insurance work?",
        "What is the difference between cashless and reimbursement?",
        "What does health insurance cover?",
        "What is a deductible?"
      ]
    },
    "policy": {
      title: "Insurance Policy",
      summary: "The formal legal contract between the policyholder and the insurer that details the coverage scope, terms, exclusions, sum insured, deductibles, and claim procedures.",
      keyPoints: [
        "Specifies covered individuals and maximum financial limits",
        "Outlines waiting periods and non-payable expenses",
        "Contains the terms under which claims are approved or rejected"
      ],
      relatedQuestions: [
        "How do I check my policy coverage?",
        "What is sum insured?",
        "What are common health insurance exclusions?",
        "How do I renew my health insurance?"
      ]
    },
    "premium": {
      title: "Premium",
      summary: "The recurring payment (annual, semi-annual, or monthly) made by the policyholder to the insurance company to keep the health insurance policy active and in force.",
      keyPoints: [
        "Determined by age, medical history, sum insured, and add-on riders",
        "Must be paid before the due date or within the grace period to prevent policy lapse",
        "Often eligible for tax deductions under applicable tax laws"
      ],
      relatedQuestions: [
        "What is a grace period?",
        "What factors affect my insurance premium?",
        "What happens if I miss my premium payment?",
        "What is a deductible?"
      ]
    },
    "sum insured": {
      title: "Sum Insured",
      summary: "The maximum annual monetary limit that an insurance provider will pay out for covered hospitalization and medical treatment expenses during the policy year.",
      keyPoints: [
        "Can be individual or shared across family members (Family Floater)",
        "Expenses exceeding this sum must be paid out-of-pocket unless super top-up exists",
        "Unused sum insured often earns a No-Claim Bonus (NCB) upon renewal"
      ],
      relatedQuestions: [
        "What is a no-claim bonus?",
        "What happens if my hospital bill exceeds the sum insured?",
        "What is an out-of-pocket expense?",
        "How do I choose the right sum insured?"
      ]
    },
    "deductible": {
      title: "Deductible",
      summary: "A fixed amount of money that the policyholder must pay out-of-pocket toward covered medical expenses before the insurance company begins paying its share.",
      keyPoints: [
        "Example: If deductible is ₹25,000 and bill is ₹1,00,000, you pay ₹25,000 and insurer covers eligible ₹75,000",
        "Higher deductibles usually result in lower annual premium costs",
        "Can apply per claim or per policy year depending on policy terms"
      ],
      relatedQuestions: [
        "What is a co-payment?",
        "What is coinsurance?",
        "How does a deductible affect my claim?",
        "What is an out-of-pocket maximum?"
      ]
    },
    "co-payment": {
      title: "Co-payment (Co-pay)",
      summary: "A predefined percentage of the total admissible claim amount that the policyholder agrees to pay out-of-pocket for every claim, while the insurer pays the remaining percentage.",
      keyPoints: [
        "Common in senior citizen policies or treatments in non-network zones (e.g., 10% to 20% co-pay)",
        "Unlike deductibles, co-pays apply continuously to every eligible claim",
        "Opting for a voluntary co-pay can lower your renewal premium"
      ],
      relatedQuestions: [
        "What is the difference between deductible and co-payment?",
        "What is coinsurance?",
        "What are out-of-pocket expenses?",
        "How does a co-pay affect my claim settlement?"
      ]
    },
    "coinsurance": {
      title: "Coinsurance",
      summary: "The percentage split of covered medical expenses shared between the insured individual and the insurance company after any deductible has been met.",
      keyPoints: [
        "Typically expressed as a percentage ratio (e.g., 80/20 where insurer pays 80% and insured pays 20%)",
        "Applies after the deductible is satisfied",
        "Protects policyholders once the out-of-pocket maximum is reached"
      ],
      relatedQuestions: [
        "What is a deductible?",
        "What is a co-payment?",
        "What is an out-of-pocket maximum?",
        "How does coinsurance work during a claim?"
      ]
    },
    "out-of-pocket expenses": {
      title: "Out-of-Pocket Expenses",
      summary: "Any medical or hospitalization costs that are not paid by the insurer and must be paid directly by the policyholder, including deductibles, co-pays, and non-medical consumables.",
      keyPoints: [
        "Includes non-medical items like gloves, masks, administrative charges, and registration fees",
        "Expenses exceeding sub-limits or room-rent ceilings",
        "Amounts incurred before reaching your annual deductible"
      ],
      relatedQuestions: [
        "What are room-rent limits?",
        "What are non-medical exclusions in health insurance?",
        "What is a deductible?",
        "How can I minimize out-of-pocket expenses?"
      ]
    },
    "waiting period": {
      title: "Waiting Period",
      summary: "A specified duration of time from the policy inception during which certain illnesses, treatments, or pre-existing medical conditions are not covered by insurance.",
      keyPoints: [
        "Initial waiting period: Typically 30 days for any illness (accidents covered immediately)",
        "Specific diseases (hernia, cataract, joint replacements): Usually 1 to 2 years",
        "Pre-Existing Diseases (PED): Typically 2 to 4 years depending on policy and regulations",
        "Maternity benefits: Frequently 9 months to 36 months"
      ],
      relatedQuestions: [
        "What is considered a pre-existing condition?",
        "Are accidents covered during the initial waiting period?",
        "Can waiting periods be reduced or waived?",
        "What documents are needed to prove continuous coverage?"
      ]
    },
    "grace period": {
      title: "Grace Period",
      summary: "A specified period (typically 15 to 30 days) granted immediately after the policy premium due date during which the policyholder can pay the renewal premium without losing continuous coverage benefits.",
      keyPoints: [
        "Coverage is generally paused during the grace days until payment is completed",
        "Protects accumulated benefits such as accrued waiting periods and No-Claim Bonuses",
        "Failing to renew before grace period expiry results in policy lapse and loss of continuity"
      ],
      relatedQuestions: [
        "How do I renew my health insurance?",
        "What happens if my policy lapses?",
        "What is a no-claim bonus?",
        "How do I pay my renewal premium?"
      ]
    },
    "policy renewal": {
      title: "Policy Renewal",
      summary: "The annual process of extending your health insurance contract for another policy tenure by paying the applicable renewal premium before expiry.",
      keyPoints: [
        "Health insurance policies in most jurisdictions offer lifelong renewability",
        "Opportunity to review coverage, update family members, or revise sum insured",
        "Maintains continuity for waiting periods and accrued bonuses"
      ],
      relatedQuestions: [
        "When is the best time to renew health insurance?",
        "Can an insurer deny renewal?",
        "How do I add a family member during renewal?",
        "What is a grace period?"
      ]
    },
    "network hospitals": {
      title: "Network Hospitals",
      summary: "Hospitals and healthcare centers that have entered into an official agreement with the insurance company or Third Party Administrator (TPA) to provide cashless medical care to policyholders.",
      keyPoints: [
        "Cashless facility is exclusively available at authorized network hospitals",
        "Hospital bills are directly settled between the hospital and insurer",
        "Pre-authorization is required before or within hours of admission"
      ],
      relatedQuestions: [
        "How does a cashless claim work?",
        "What happens if I get admitted to a non-network hospital?",
        "What is pre-authorization?",
        "How do I locate network hospitals?"
      ]
    },
    "cashless treatment": {
      title: "Cashless Treatment / Cashless Claim",
      summary: "A claim facility where the policyholder receives medical care at a network hospital without paying eligible hospital bills upfront; the insurer directly settles the admissible bill with the hospital.",
      keyPoints: [
        "Requires pre-authorization from the hospital's TPA insurance desk",
        "Planned hospitalization: Pre-auth submitted 48–72 hours in advance",
        "Emergency hospitalization: Pre-auth submitted within 24 hours of admission",
        "Non-payable items (consumables, registration charges) must still be settled by the patient"
      ],
      relatedQuestions: [
        "What is pre-authorization?",
        "What is a reimbursement claim?",
        "What documents are needed for cashless claims?",
        "What if my cashless claim is denied?"
      ]
    },
    "reimbursement": {
      title: "Reimbursement Claim",
      summary: "A claim process where the policyholder pays the complete hospital bill out-of-pocket upon discharge and subsequently submits original bills, reports, and claim forms to the insurer for monetary refund.",
      keyPoints: [
        "Applicable at any registered non-network hospital or when cashless was unavailable",
        "Requires submission of all original bills, payment receipts, prescriptions, and discharge summary",
        "Must be submitted within the insurer's stipulated timeline (usually 15 to 30 days post-discharge)",
        "Settlement is transferred directly to the insured's verified bank account"
      ],
      relatedQuestions: [
        "What documents are required for a reimbursement claim?",
        "How long does a reimbursement claim take?",
        "What is a cashless claim?",
        "What happens if original bills are misplaced?"
      ]
    },
    "pre-authorization": {
      title: "Pre-Authorization",
      summary: "The formal approval obtained from the insurer or TPA prior to (or during emergency) hospitalization confirming that the proposed treatment is covered under the policy and granting cashless settlement.",
      keyPoints: [
        "Initiated by the hospital insurance desk with the treating doctor's diagnosis form",
        "Insurer issues an initial approval specifying the authorized amount",
        "Final approval is verified upon patient discharge based on the detailed itemized bill"
      ],
      relatedQuestions: [
        "What is a cashless claim?",
        "What documents are required for pre-authorization?",
        "What happens if pre-authorization is denied?",
        "How long does pre-authorization approval take?"
      ]
    },
    "exclusions": {
      title: "Exclusions",
      summary: "Specific medical conditions, treatments, circumstances, or expenses that an insurance policy explicitly does not cover under any circumstances.",
      keyPoints: [
        "Permanent exclusions: Cosmetic surgery, self-inflicted injuries, experimental treatments, unproven therapies",
        "Temporary exclusions: Pre-existing diseases and specific ailments during their waiting period",
        "Non-medical items: Diapers, toilet items, registration fees, sanitizers, gloves (unless specifically covered)"
      ],
      relatedQuestions: [
        "What does health insurance cover?",
        "What is a waiting period?",
        "Are dental and optical treatments covered?",
        "What happens if my claim is rejected due to exclusions?"
      ]
    },
    "coverage": {
      title: "Coverage Scope",
      summary: "The range of medical treatments, conditions, and hospitalization expenses that the health insurance policy protects and pays for.",
      keyPoints: [
        "In-patient hospitalization (minimum 24 hours stay typically required)",
        "Day-care procedures that do not require 24h hospitalization due to advanced medical technology",
        "Pre-hospitalization (e.g. 30–60 days before) and Post-hospitalization (e.g. 60–90 days after)",
        "Ambulance charges up to defined policy sub-limits"
      ],
      relatedQuestions: [
        "What is excluded from health insurance?",
        "What are day-care procedures?",
        "What are pre- and post-hospitalization expenses?",
        "What are sub-limits?"
      ]
    },
    "sub-limits": {
      title: "Sub-Limits",
      summary: "Pre-defined financial caps placed on specific treatments, room rents, or medical conditions within the total sum insured.",
      keyPoints: [
        "Example: Cataract surgery capped at ₹40,000 per eye regardless of a ₹10,00,000 total sum insured",
        "Room rent sub-limits (e.g., 1% of sum insured per day)",
        "Exceeding sub-limits requires the policyholder to pay the difference out-of-pocket"
      ],
      relatedQuestions: [
        "What are room-rent limits?",
        "What is proportionate deduction?",
        "How do sub-limits impact my claim?",
        "What is sum insured?"
      ]
    },
    "room-rent limits": {
      title: "Room-Rent Limits & Proportionate Deductions",
      summary: "A cap on the daily hospital room tariff eligible for coverage, often set as a percentage of the sum insured (e.g., 1% per day for normal room, 2% for ICU).",
      keyPoints: [
        "CRITICAL: If you choose a room higher than your eligible limit, insurers often apply 'proportionate deduction' across associate doctor fees, nursing, and surgery costs",
        "Opting for a policy with 'No Room Rent Capping' prevents unexpected out-of-pocket deductions",
        "Always check room eligibility prior to planned hospital admission"
      ],
      relatedQuestions: [
        "What are sub-limits?",
        "How does proportionate deduction work?",
        "What are out-of-pocket expenses?",
        "How do I avoid room rent deductions?"
      ]
    },
    "no-claim bonus": {
      title: "No-Claim Bonus (NCB) / Cumulative Bonus",
      summary: "A reward given to the policyholder for every claim-free year, usually in the form of an increased sum insured at renewal without any increase in the premium payable.",
      keyPoints: [
        "Typically increases sum insured by 10% to 50% per claim-free year, up to a maximum cap (often 100%)",
        "If a claim is filed, accumulated NCB may reduce progressively at subsequent renewals",
        "Transferable when porting your policy to another insurer under insurance portability rules"
      ],
      relatedQuestions: [
        "How does policy renewal work?",
        "Does filing a small claim affect my no-claim bonus?",
        "Can I transfer my no-claim bonus to another insurer?",
        "What is sum insured?"
      ]
    }
  },

  // 2. Step-by-Step Applying for Health Insurance (10 Stages)
  applicationProcess: [
    {
      step: 1,
      title: "Understand Requirements",
      description: "Assess your healthcare needs, family medical history, dependents, budget, and desired coverage amount."
    },
    {
      step: 2,
      title: "Select a Suitable Plan",
      description: "Choose between an Individual Health Plan, Family Floater, Senior Citizen Plan, or Critical Illness cover."
    },
    {
      step: 3,
      title: "Compare Coverage",
      description: "Examine waiting periods, network hospital density, sub-limits, room-rent capping, and co-payment clauses."
    },
    {
      step: 4,
      title: "Submit Application",
      description: "Fill out the proposal form accurately with honest disclosures of medical history, lifestyle habits, and existing conditions."
    },
    {
      step: 5,
      title: "Provide Required Information",
      description: "Provide KYC details, nominee declarations, previous policy details (if porting), and contact credentials."
    },
    {
      step: 6,
      title: "Submit Documents",
      description: "Upload identity proof, address proof, age proof, passport photo, and any historical medical records."
    },
    {
      step: 7,
      title: "Medical Assessment (If Required)",
      description: "Undergo a tele-underwriting call or pre-policy medical checkup if required based on age or medical declarations."
    },
    {
      step: 8,
      title: "Insurer Evaluates Application",
      description: "Underwriters review the risk profile. The insurer may accept standard terms, apply premium loading, or specify exclusions."
    },
    {
      step: 9,
      title: "Pay Premium",
      description: "Complete the premium payment securely using approved digital payment channels or bank transfer."
    },
    {
      step: 10,
      title: "Policy is Issued",
      description: "Receive the policy document, health card, schedule of benefits, and free-look period confirmation."
    }
  ],

  // 3. Claim Journey Steps (8 Stages)
  claimStages: [
    {
      stage: 1,
      name: "Treatment / Hospitalization",
      status: "completed",
      description: "Patient is admitted to a healthcare facility for necessary in-patient or day-care treatment."
    },
    {
      stage: 2,
      name: "Notify Insurer",
      status: "completed",
      description: "The policyholder or hospital insurance desk informs the insurer/TPA within the required time window."
    },
    {
      stage: 3,
      name: "Submit Claim",
      status: "completed",
      description: "Official claim dossier with treatment breakdown and preliminary bills is lodged."
    },
    {
      stage: 4,
      name: "Document Verification",
      status: "completed",
      description: "The claims desk verifies all submitted papers, KYC, medical charts, and doctor signatures."
    },
    {
      stage: 5,
      name: "Claim Assessment",
      status: "active",
      description: "Medical adjudication team reviews medical necessity, policy coverage terms, and admissible billing charges."
    },
    {
      stage: 6,
      name: "Approval / Decision",
      status: "pending",
      description: "Insurer issues decision: claim approval, query for additional information, or reason for repudiation."
    },
    {
      stage: 7,
      name: "Settlement",
      status: "pending",
      description: "Payment is processed directly to hospital (cashless) or disbursed to the policyholder's bank account (reimbursement)."
    },
    {
      stage: 8,
      name: "Claim Completed",
      status: "pending",
      description: "Final claim summary, settlement voucher, and explanation of benefits are archived."
    }
  ],

  // 4. Documents Guide with Rationale & Disclaimer
  documents: {
    disclaimer: "Important: Required documents vary by insurer, policy terms, applicant profile, and whether the claim is cashless or reimbursement. These are common industry examples; always verify exact requirements with your insurer.",
    application: [
      {
        name: "Identity Proof",
        purpose: "Validates applicant legal identity (Aadhaar, Passport, Voter ID, PAN Card).",
        whyRequired: "Mandated by KYC regulations to prevent fraud and authenticate the contract holder."
      },
      {
        name: "Address Proof",
        purpose: "Confirms permanent and residential domicile (Utility bill, Passport, Driving License).",
        whyRequired: "Determines geographical rating zone which affects premium pricing and network accessibility."
      },
      {
        name: "Age / Date-of-Birth Proof",
        purpose: "Verifies exact chronological age (Birth certificate, 10th standard certificate, Passport).",
        whyRequired: "Health insurance risk and premium underwriting are fundamentally keyed to the insured's age."
      },
      {
        name: "Passport-size Photograph",
        purpose: "Personal photographic record of the applicant and dependents.",
        whyRequired: "Used for creating official health cards and member identification records."
      },
      {
        name: "Proposal / Application Form",
        purpose: "Detailed self-declaration of lifestyle habits, medical history, and nominee.",
        whyRequired: "Serves as the utmost good faith legal basis for the entire insurance contract."
      },
      {
        name: "Previous Policy Information",
        purpose: "Policy copy and renewal notice of existing health insurance (if porting).",
        whyRequired: "Essential to carry forward accrued waiting period credits and No-Claim Bonus."
      },
      {
        name: "Medical Reports (where requested)",
        purpose: "Diagnostic tests, bloodwork, or specialist evaluations prior to policy issuance.",
        whyRequired: "Enables underwriters to assess existing health risks and determine appropriate coverage terms."
      }
    ],
    claim: [
      {
        id: "doc-1",
        name: "Claim Form (Part A & Part B)",
        purpose: "Part A completed by insured; Part B completed and stamped by treating hospital.",
        whyRequired: "Official legal request detailing event dates, treating doctor, and declared costs.",
        prepared: true
      },
      {
        id: "doc-2",
        name: "Policy Information & Health Card",
        purpose: "Copy of current policy schedule and digital/physical insurance ID card.",
        whyRequired: "Identifies policy number, insured member details, and active status.",
        prepared: true
      },
      {
        id: "doc-3",
        name: "Original Hospital Bills & Receipts",
        purpose: "Itemized billing statement showing room charges, nursing, medicines, and payments.",
        whyRequired: "Provides full transparency on admissible expenses for precise adjudication.",
        prepared: true
      },
      {
        id: "doc-4",
        name: "Discharge Summary / Card",
        purpose: "Hospital discharge summary detailing admission date, diagnosis, treatment course, and discharge condition.",
        whyRequired: "Critical clinical proof explaining medical necessity, diagnosis, and length of stay.",
        prepared: true
      },
      {
        id: "doc-5",
        name: "Doctor's Prescriptions & Consultation Notes",
        purpose: "Written doctor advice for hospitalization, medicines, diagnostic tests, and follow-up.",
        whyRequired: "Confirms that medical procedures and purchased drugs were officially prescribed.",
        prepared: false
      },
      {
        id: "doc-6",
        name: "Investigation & Diagnostic Reports",
        purpose: "Lab test reports, X-rays, MRI/CT scans, biopsy reports, ECG strips with doctor notes.",
        whyRequired: "Validates the underlying clinical condition that necessitated hospitalization.",
        prepared: false
      },
      {
        id: "doc-7",
        name: "Pharmacy Bills & Medicine Receipts",
        purpose: "Original stamped pharmacy cash memos with corresponding doctor prescriptions.",
        whyRequired: "Necessary to verify authenticity of medicine purchases during pre/post-hospital care.",
        prepared: false
      },
      {
        id: "doc-8",
        name: "Bank Details (Cancelled Cheque)",
        purpose: "Cancelled cheque leaf or bank passbook copy showing Account Name, Number, and IFSC/routing code.",
        whyRequired: "Ensures secure, direct electronic fund transfer (NEFT/ACH) for approved reimbursement.",
        prepared: false
      }
    ]
  },

  // 5. Frequently Asked Questions (All 19 from prompt specifications)
  faqs: [
    {
      id: "faq-1",
      question: "What is health insurance?",
      answer: "Health insurance is a contract between you and an insurance company. In exchange for regular premium payments, the insurer pays for or reimburses eligible medical and hospitalization expenses incurred due to illness, injury, or surgery. It protects you from catastrophic out-of-pocket medical debts.",
      related: ["How does health insurance work?", "What is a premium?", "What does health insurance cover?"]
    },
    {
      id: "faq-2",
      question: "How does health insurance work?",
      answer: "When you have an active health policy:\n1. You pay regular premiums.\n2. If hospitalized, you either use Cashless Treatment at a network hospital or pay upfront and file a Reimbursement Claim.\n3. The insurer reviews the medical records and hospital bills against your policy terms.\n4. Approved eligible expenses are settled up to your sum insured limit, minus any deductibles, co-pays, or non-medical exclusions.",
      related: ["What is a cashless claim?", "What is a reimbursement claim?", "What is sum insured?"]
    },
    {
      id: "faq-3",
      question: "How do I apply for health insurance?",
      answer: "Applying follows a simple 10-step process:\n1. Assess family healthcare needs\n2. Compare plans and coverage\n3. Select your sum insured\n4. Complete the proposal form\n5. Provide KYC and medical disclosure\n6. Upload identity, address, and age proofs\n7. Undergo pre-policy medical checkup (if requested)\n8. Insurer underwriters review risk\n9. Pay the premium online\n10. Policy document is issued with a free-look period.",
      related: ["What documents are required to apply?", "What is a waiting period?", "What is a pre-existing condition?"]
    },
    {
      id: "faq-4",
      question: "What documents are required to apply?",
      answer: "Commonly requested application documents include:\n• Proof of Identity (Aadhaar, Passport, Voter ID)\n• Proof of Address (Utility bill, Passport, DL)\n• Age / DOB Proof (Birth certificate, 10th certificate)\n• Recent passport-size photograph\n• Completed proposal declaration form\n• Previous policy copy (if porting)\n• Past medical reports (if requested)\n\n*Note: Exact requirements vary by insurer, age, and chosen plan.*",
      related: ["How do I apply for health insurance?", "What is underwriting?", "What is a waiting period?"]
    },
    {
      id: "faq-5",
      question: "What is a premium?",
      answer: "A premium is the recurring monetary payment you make to the insurer to keep your coverage active. Premiums are typically calculated based on the policyholder's age, medical history, sum insured amount, policy type, and optional riders.",
      related: ["What is a deductible?", "What is a grace period?", "How do I renew my health insurance?"]
    },
    {
      id: "faq-6",
      question: "What is a deductible?",
      answer: "A deductible is a fixed amount that you must pay out-of-pocket for covered medical services before your insurance company starts paying. For example, with a ₹25,000 deductible on a ₹1,00,000 approved bill, you pay ₹25,000 and the insurer covers the remaining ₹75,000.",
      related: ["What is a co-payment?", "What is coinsurance?", "How does a deductible affect my claim?"]
    },
    {
      id: "faq-7",
      question: "What is a co-payment?",
      answer: "A co-payment (co-pay) is a fixed percentage of the admissible hospital bill that you agree to pay out-of-pocket on every claim, while the insurer pays the remaining percentage. For instance, with a 10% co-pay on a ₹50,000 bill, you pay ₹5,000 and the insurer pays ₹45,000.",
      related: ["What is a deductible?", "What is coinsurance?", "What is an out-of-pocket maximum?"]
    },
    {
      id: "faq-8",
      question: "What is a waiting period?",
      answer: "A waiting period is the time that must elapse after buying a policy before specific illnesses or treatments are eligible for claim payment. Standard types include:\n• Initial 30-day waiting period for illnesses (accidents covered from day 1)\n• 1 to 2 years for specific ailments (cataract, hernia, joint replacement)\n• 2 to 4 years for Pre-Existing Diseases (PED)\n• Maternity waiting period (usually 9 to 36 months).",
      related: ["What is a pre-existing condition?", "What happens if I get sick during the waiting period?", "Can waiting periods be reduced?"]
    },
    {
      id: "faq-9",
      question: "What is a cashless claim?",
      answer: "A cashless claim allows you to receive treatment at an empanelled network hospital without paying admissible hospitalization bills from your own pocket. The hospital insurance desk submits a pre-authorization form to the insurer/TPA, and once approved, the insurer settles payment directly with the hospital.",
      related: ["What is pre-authorization?", "What is a reimbursement claim?", "What are network hospitals?"]
    },
    {
      id: "faq-10",
      question: "What is a reimbursement claim?",
      answer: "In a reimbursement claim, you pay all hospital bills out-of-pocket upon discharge, collect all original bills, prescriptions, reports, and discharge summary, and submit a claim dossier to the insurer. After verification, the approved amount is credited directly to your bank account.",
      related: ["What documents are required for a claim?", "How long does a claim take?", "What is a cashless claim?"]
    },
    {
      id: "faq-11",
      question: "How do I file a claim?",
      answer: "To file a claim:\n1. **Notify the insurer**: Within 24 hours of emergency hospitalization or 48–72 hours prior for planned admission.\n2. **Collect documents**: Discharge summary, itemized hospital bills, receipts, prescriptions, and investigation reports.\n3. **Complete claim form**: Fill Part A and get the hospital to stamp Part B.\n4. **Submit dossier**: Upload via the insurer portal or courier original physical documents.\n5. **Track assessment**: The claims team reviews documents and processes settlement.",
      related: ["What documents are required for a claim?", "How do I check my claim status?", "How long does a claim take?"]
    },
    {
      id: "faq-12",
      question: "How long does a claim take?",
      answer: "Timelines depend on the claim mechanism:\n• **Cashless Pre-Auth**: Usually 2 to 6 hours during hospital admission and discharge.\n• **Reimbursement Claims**: Typically 10 to 21 working days after the insurer receives all required original documents and verification is completed.",
      related: ["How do I check my claim status?", "What documents are required for a claim?", "What causes claim delays?"]
    },
    {
      id: "faq-13",
      question: "What documents are required for a claim?",
      answer: "Standard claim documents include:\n1. Duly completed and signed Claim Form (Part A & B)\n2. Hospital Discharge Summary\n3. Original itemized final hospital bill and payment receipts\n4. Prescriptions and medical store pharmacy bills\n5. Diagnostic reports and laboratory tests\n6. Doctor's consultation papers\n7. Cancelled cheque / bank details for electronic fund transfer\n\n*Always verify insurer-specific requirements.*",
      related: ["How do I file a claim?", "What is a reimbursement claim?", "How long does a claim take?"]
    },
    {
      id: "faq-14",
      question: "What does health insurance cover?",
      answer: "Standard comprehensive policies generally cover:\n• In-patient hospitalization (room rent, nursing, ICU, doctor visits)\n• Day-care procedures (dialysis, chemotherapy, eye surgery)\n• Pre-hospitalization costs (usually 30 to 60 days before admission)\n• Post-hospitalization costs (usually 60 to 90 days after discharge)\n• Emergency road ambulance charges\n• Organ donor hospitalization expenses.",
      related: ["What is usually excluded from health insurance?", "What are day-care procedures?", "What are sub-limits?"]
    },
    {
      id: "faq-15",
      question: "What is usually excluded from health insurance?",
      answer: "Common standard exclusions include:\n• Cosmetic and aesthetic surgeries\n• Self-inflicted injuries or injuries due to illegal activities\n• Substance abuse and alcohol rehabilitation\n• Unproven, experimental, or alternative therapies without accreditation\n• Non-medical consumables (PPE kits, gloves, sanitizers, thermometer)\n• Routine dental and optical care (unless specifically added via rider)\n• Pre-existing conditions during their waiting period.",
      related: ["What does health insurance cover?", "What is a waiting period?", "What are out-of-pocket expenses?"]
    },
    {
      id: "faq-16",
      question: "How do I check my claim status?",
      answer: "You can track your claim status by:\n1. Asking this AI assistant (say: 'What is the status of my claim?')\n2. Visiting the 'My Claim' tab in this portal\n3. Logging into your insurer mobile app or website with your Claim ID and Policy Number\n4. Calling the 24/7 toll-free claims helpline.",
      related: ["What stage is my claim in?", "How long does a claim take?", "What happens if my claim is rejected?"]
    },
    {
      id: "faq-17",
      question: "How do I renew my health insurance?",
      answer: "Renewing your policy:\n1. Check your renewal notice and expiry date.\n2. Review your coverage and check if you need to increase your sum insured or add family members.\n3. Pay the renewal premium online before the expiry date (or within the 15–30 day grace period).\n4. Receive your renewed policy document with continuous coverage and intact waiting period credits.",
      related: ["What is a grace period?", "What is a no-claim bonus?", "What happens if my policy lapses?"]
    },
    {
      id: "faq-18",
      question: "How can I add a family member?",
      answer: "You can add a spouse, newborn child, or dependent parents:\n• **At Renewal**: Submit an endorsement request along with identity proof and marriage/birth certificate before paying renewal premium.\n• **Mid-term**: Most insurers permit mid-term inclusion within 30 to 90 days of major life events (marriage or birth) by paying a pro-rated premium.",
      related: ["What is a family floater policy?", "How do I renew my health insurance?", "What documents are required to apply?"]
    },
    {
      id: "faq-19",
      question: "What happens if my claim is rejected?",
      answer: "If your claim is rejected:\n1. **Read the Repudiation Letter**: Check the exact reason and policy clause cited by the insurer.\n2. **Gather Evidence**: If rejected due to missing documentation or misunderstanding of clinical history, get a clarifying certificate from the treating specialist.\n3. **File a Grievance**: Submit a formal review request to the Insurer's Grievance Redressal Officer (GRO).\n4. **Escalate to Ombudsman**: If unresolved within 30 days, file an appeal with the Insurance Ombudsman.",
      related: ["How do I file a claim?", "What are common exclusions?", "Talk to a human support agent"]
    }
  ]
};
