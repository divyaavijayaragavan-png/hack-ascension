/**
 * InsureAssist AI - Mock API Services
 * Tools for retrieving simulated policy, claim, documents, and creating escalation tickets
 */

import { MOCK_USER_DATA } from "../data/mockData.js";
import { KNOWLEDGE_BASE } from "../data/knowledgeBase.js";

// Helper for realistic async network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retrieve verified policy summary for the active user
 */
export async function get_policy_summary() {
  await delay(600);
  const p = MOCK_USER_DATA.policy;
  const c = MOCK_USER_DATA.customer;
  return {
    success: true,
    data: {
      customerName: c.name,
      policyNumber: p.policyNumber,
      planName: p.planName,
      type: p.type,
      status: p.status,
      sumInsured: p.sumInsured,
      cumulativeBonus: p.cumulativeBonus,
      totalCoverage: p.totalCoverage,
      deductible: p.deductible,
      coPayment: p.coPayment,
      roomRentLimit: p.roomRentLimit,
      renewalDate: p.renewalDate,
      coveredMembersCount: p.coveredMembers.length,
      coveredMembers: p.coveredMembers.map(m => `${m.name} (${m.relation})`)
    }
  };
}

/**
 * Retrieve current claim status
 */
export async function get_claim_status(claimId = "CLM-10245") {
  await delay(650);
  const claim = MOCK_USER_DATA.claim;
  
  if (claimId && claimId.toUpperCase() !== claim.claimId) {
    return {
      success: false,
      error: `Claim #${claimId} not found in user records. Please verify the Claim ID.`
    };
  }

  return {
    success: true,
    data: {
      claim_id: claim.claimId,
      status: claim.status,
      progress: claim.progress,
      current_stage: claim.currentStage,
      next_step: claim.nextStep,
      submitted_date: claim.submittedDate,
      last_updated: claim.lastUpdatedDate,
      hospital: claim.hospitalName,
      treatment: claim.treatmentType,
      claimed_amount: claim.claimedAmount,
      estimated_admissible: claim.estimatedAdmissible
    }
  };
}

/**
 * Retrieve claim document status
 */
export async function get_claim_documents(claimId = "CLM-10245") {
  await delay(500);
  const docs = KNOWLEDGE_BASE.documents.claim;
  const preparedCount = docs.filter(d => d.prepared).length;
  return {
    success: true,
    data: {
      claim_id: claimId,
      total_documents: docs.length,
      prepared_count: preparedCount,
      percentage_ready: Math.round((preparedCount / docs.length) * 100),
      documents: docs.map(d => ({
        name: d.name,
        prepared: d.prepared,
        why_required: d.whyRequired
      }))
    }
  };
}

/**
 * Retrieve claim progression timeline
 */
export async function get_claim_progress(claimId = "CLM-10245") {
  await delay(550);
  const claim = MOCK_USER_DATA.claim;
  return {
    success: true,
    data: {
      claim_id: claim.claimId,
      completion_percentage: claim.progress,
      active_stage: claim.currentStage,
      stages: claim.stages
    }
  };
}

/**
 * Retrieve standard required documents by category
 */
export async function get_required_documents(type = "claim") {
  await delay(450);
  const isClaim = type.toLowerCase().includes("claim");
  const docs = isClaim ? KNOWLEDGE_BASE.documents.claim : KNOWLEDGE_BASE.documents.application;
  
  return {
    success: true,
    disclaimer: KNOWLEDGE_BASE.documents.disclaimer,
    type: isClaim ? "Claim Reimbursement / Verification" : "Policy Application / Underwriting",
    documents: docs.map(d => ({
      name: d.name,
      purpose: d.purpose,
      why_required: d.whyRequired
    }))
  };
}

/**
 * Retrieve policy renewal date and details
 */
export async function get_renewal_date() {
  await delay(400);
  const p = MOCK_USER_DATA.policy;
  return {
    success: true,
    data: {
      policy_number: p.policyNumber,
      renewal_date: p.renewalDate,
      days_until_renewal: p.daysUntilRenewal,
      status: p.status,
      premium_amount: p.premiumAmount,
      cumulative_bonus_available: p.cumulativeBonus
    }
  };
}

/**
 * Create a human escalation support ticket
 */
export async function create_support_ticket(ticketDetails) {
  await delay(800);
  const ticketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
  const ticket = {
    ticket_id: ticketId,
    created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: "Assigned to Human Specialist",
    assigned_specialist: "Sarah Jenkins (Senior Claims Specialist)",
    customer: MOCK_USER_DATA.customer.name,
    customer_id: MOCK_USER_DATA.customer.id,
    policy_number: MOCK_USER_DATA.policy.policyNumber,
    claim_id: MOCK_USER_DATA.claim.claimId,
    reason: ticketDetails.reason || "General Policy Inquiry",
    topic: ticketDetails.topic || "Coverage Verification",
    ai_summary: ticketDetails.ai_summary || {},
    transcript: ticketDetails.transcript || [],
    estimated_callback: "Within 15 minutes"
  };

  MOCK_USER_DATA.supportTickets.unshift(ticket);

  return {
    success: true,
    data: ticket
  };
}
