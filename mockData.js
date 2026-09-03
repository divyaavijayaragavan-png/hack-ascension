/**
 * InsureAssist AI - Mock Data
 * Realistic simulated insurance records for demo environment
 */

export const MOCK_USER_DATA = {
  customer: {
    name: "Alex Johnson",
    id: "CUST-99201",
    email: "alex.johnson@example.com",
    phone: "+91 98765 43210",
    city: "Bangalore",
    state: "Karnataka",
    memberSince: "2022"
  },
  
  policy: {
    policyNumber: "HS-2024-8891",
    planName: "HealthSecure Family Plus",
    type: "Family Floater",
    status: "Active",
    sumInsured: "₹10,00,000",
    sumInsuredRaw: 1000000,
    cumulativeBonus: "₹2,50,000 (25% NCB earned)",
    totalCoverage: "₹12,50,000",
    deductible: "₹0",
    coPayment: "0% (Nil co-pay for network hospitals)",
    roomRentLimit: "Single Private A/C Room (No capping)",
    inceptionDate: "16 Oct 2022",
    renewalDate: "15 Oct 2026",
    daysUntilRenewal: 42,
    premiumAmount: "₹24,850 / year",
    networkHospitalsCount: "12,500+ cashless network providers",
    coveredMembers: [
      { name: "Alex Johnson", relation: "Self", age: 36, status: "Active" },
      { name: "Maya Johnson", relation: "Spouse", age: 34, status: "Active" },
      { name: "Leo Johnson", relation: "Dependent Child", age: 7, status: "Active" }
    ],
    waitingPeriodsMet: [
      "Initial 30-day waiting period: Completed (2022)",
      "Specific 2-year ailment waiting period: Completed (2024)",
      "Pre-existing diseases waiting period: 3 of 3 years completed"
    ]
  },

  claim: {
    claimId: "CLM-10245",
    status: "Under Assessment",
    statusType: "assessment", // used for CSS badge
    progress: 65,
    submittedDate: "12 Aug 2026",
    lastUpdatedDate: "28 Aug 2026",
    patientName: "Alex Johnson",
    hospitalName: "St. Jude Multi-Specialty Hospital, Indiranagar",
    treatmentType: "Laparoscopic Appendectomy (In-patient)",
    admissionDate: "10 Aug 2026",
    dischargeDate: "12 Aug 2026",
    claimedAmount: "₹1,42,500",
    estimatedAdmissible: "₹1,38,200",
    currentStage: "Claim Assessment",
    nextStep: "Insurer medical adjudication team reviews the submitted itemized bill and diagnostic reports.",
    tpaName: "MediCare Health TPA Services",
    assignedAdjudicator: "Dr. K. Sharma (Senior Claims Medical Examiner)",
    
    stages: [
      {
        index: 1,
        title: "Treatment / Hospitalization",
        status: "completed",
        date: "10 Aug 2026",
        note: "Patient admitted and surgery performed successfully."
      },
      {
        index: 2,
        title: "Notify Insurer",
        status: "completed",
        date: "10 Aug 2026",
        note: "Hospital insurance desk and patient lodged pre-authorization notification."
      },
      {
        index: 3,
        title: "Submit Claim",
        status: "completed",
        date: "12 Aug 2026",
        note: "Complete digital claim dossier and preliminary billing breakdown submitted."
      },
      {
        index: 4,
        title: "Document Verification",
        status: "completed",
        date: "20 Aug 2026",
        note: "Discharge summary, pharmacy bills, and doctor notes verified by TPA desk."
      },
      {
        index: 5,
        title: "Claim Assessment",
        status: "active",
        date: "28 Aug 2026",
        note: "Medical panel reviewing clinical necessity and room rent compliance."
      },
      {
        index: 6,
        title: "Approval / Decision",
        status: "pending",
        date: "Est. 05 Sep 2026",
        note: "Final approval letter and authorized settlement voucher to be issued."
      },
      {
        index: 7,
        title: "Settlement",
        status: "pending",
        date: "Est. 08 Sep 2026",
        note: "Direct electronic bank transfer to insured's verified account."
      },
      {
        index: 8,
        title: "Claim Completed",
        status: "pending",
        date: "Est. 10 Sep 2026",
        note: "Settlement confirmation and closure summary sent to policyholder."
      }
    ]
  },

  notifications: [
    {
      id: "notif-1",
      title: "Claim #CLM-10245 Status Update",
      message: "Your claim has moved to 'Claim Assessment' with the medical panel.",
      time: "2 days ago",
      type: "info",
      unread: true
    },
    {
      id: "notif-2",
      title: "Documents Verified",
      message: "Discharge summary and hospital bills successfully verified by TPA desk.",
      time: "14 days ago",
      type: "success",
      unread: true
    },
    {
      id: "notif-3",
      title: "Annual Policy Renewal Reminder",
      message: "Your policy renews on 15 Oct 2026. Cumulative bonus of ₹2,50,000 ready to apply.",
      time: "20 days ago",
      type: "warning",
      unread: false
    }
  ],

  supportTickets: []
};

/**
 * Authorized Faculty In-Charge Contact Details
 * Provided whenever the AI assistant encounters an unknown/unverified query
 * or when direct human faculty escalation is required.
 */
export const AUTHORIZED_FACULTY = {
  name: "Prof. Dr. A. K. Sharma",
  title: "Prof. Dr. A. K. Sharma, Ph.D.",
  role: "Authorized Faculty In-Charge & Student Advisory Officer",
  department: "Healthcare Administration & Institutional Policy Cell",
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  alternatePhone: "+91 80 2345 6789",
  alternatePhoneRaw: "+918023456789",
  email: "faculty.incharge@healthcare-edu.in",
  officeLocation: "Room 204, Academic Block A, Institutional Campus",
  officeHours: "Monday – Friday: 9:00 AM – 5:00 PM IST",
  status: "Available for Escalation"
};
