/**
 * InsureAssist AI - AI Reasoning & Response Engine
 * Production-style insurance assistant implementing tool execution,
 * strict anti-hallucination guardrails, guided recovery, and context-aware suggestions.
 */

import { KNOWLEDGE_BASE } from "../data/knowledgeBase.js";
import { MOCK_USER_DATA, AUTHORIZED_FACULTY } from "../data/mockData.js";
import * as api from "./mockApi.js";

export class InsuranceAIEngine {
  constructor() {
    this.conversationHistory = [];
  }

  /**
   * Main entry point for processing a user query
   * @param {string} userQuery 
   * @param {Function} onToolExecute - callback for agentic badges: ({ toolName, status, message })
   * @returns {Promise<Object>} Response object containing formatted HTML, suggestions, actions, etc.
   */
  async processQuery(userQuery, onToolExecute = () => {}) {
    const rawText = userQuery.trim();
    const query = rawText.toLowerCase();

    // Record user query in transcript
    this.conversationHistory.push({
      role: "user",
      content: rawText,
      timestamp: new Date().toISOString()
    });

    // 1. Guardrail: Medical Advice / Diagnosis Check
    if (this._isMedicalDiagnosisQuery(query)) {
      return this._handleMedicalAdviceGuardrail(rawText);
    }

    // 2. Intent: Direct Authorized Faculty Contact Query
    if (this._isFacultyContactQuery(query)) {
      return this._handleFacultyContactResponse();
    }

    // 3. Intent: Human Support Handoff Request
    if (this._isHumanHandoffRequest(query)) {
      return this._handleHumanHandoff(rawText, onToolExecute, "Customer explicitly requested human specialist handoff.");
    }

    // 3. Intent: Claim Status & Progress Tool Execution
    if (this._isClaimStatusQuery(query)) {
      return this._handleClaimStatusTool(onToolExecute);
    }

    // 4. Intent: Policy Summary / Verification Tool Execution
    if (this._isPolicySummaryQuery(query)) {
      return this._handlePolicySummaryTool(onToolExecute);
    }

    // 5. Intent: Policy Renewal Date & Details Tool
    if (this._isRenewalQuery(query)) {
      return this._handleRenewalTool(onToolExecute);
    }

    // 6. Intent: Required Documents Tool
    if (this._isDocumentRequirementsQuery(query)) {
      return this._handleDocumentRequirements(query, onToolExecute);
    }

    // 7. Intent: Specific Treatment Coverage Query without Verified Account Data (Scenario 6)
    if (this._isSpecificCoverageQuery(query)) {
      return this._handlePolicySpecificCoverageQuestion(rawText);
    }

    // 8. Intent: Process Guidance (How to apply, How to file claim, Renewal)
    if (this._isProcessGuidanceQuery(query)) {
      return this._handleProcessGuidance(query);
    }

    // 9. Intent: Known Insurance Knowledge Base / FAQ Match
    const kbMatch = this._findKnowledgeBaseMatch(query);
    if (kbMatch) {
      return this._handleKnowledgeBaseResponse(kbMatch, rawText);
    }

    // 10. Fallback: Guided Recovery for Unknown / Obscure Queries (Scenario 7)
    return this._handleGuidedRecovery(rawText);
  }

  // =========================================================================
  // Intent Classifiers
  // =========================================================================

  _isMedicalDiagnosisQuery(query) {
    const medicalKeywords = [
      "diagnose", "my symptoms", "i have chest pain", "i have fever", "what medicine",
      "prescribe", "treatment for my pain", "is it cancer", "am i having a heart attack",
      "blood pressure high what should i take", "can you diagnose", "dosage of"
    ];
    return medicalKeywords.some(kw => query.includes(kw));
  }

  _isHumanHandoffRequest(query) {
    const handoffKeywords = [
      "talk to a human", "talk to human", "speak with human", "human agent",
      "customer care", "customer service representative", "connect with support",
      "talk to an agent", "escalate", "call support", "speak to someone"
    ];
    return handoffKeywords.some(kw => query.includes(kw));
  }

  _isClaimStatusQuery(query) {
    const claimKeywords = [
      "status of my claim", "my claim status", "what stage is my claim in",
      "where is my claim", "track my claim", "clm-10245", "how is my claim progressing",
      "claim progress", "has my claim been approved", "claim update"
    ];
    return claimKeywords.some(kw => query.includes(kw));
  }

  _isPolicySummaryQuery(query) {
    const policyKeywords = [
      "my policy summary", "what is my coverage amount", "my sum insured",
      "view my policy", "details of my policy", "policy #hs-2024-8891",
      "who is covered under my policy", "how much coverage do i have"
    ];
    return policyKeywords.some(kw => query.includes(kw));
  }

  _isRenewalQuery(query) {
    const renewalKeywords = [
      "when is my renewal", "renewal date", "when does my policy expire",
      "my renewal due date", "how many days until renewal"
    ];
    return renewalKeywords.some(kw => query.includes(kw));
  }

  _isDocumentRequirementsQuery(query) {
    const docKeywords = [
      "what documents do i need", "documents required", "required documents",
      "checklist for claim", "checklist for applying", "what papers do i need"
    ];
    return docKeywords.some(kw => query.includes(kw));
  }

  _isSpecificCoverageQuery(query) {
    // Tests for specific conditions/treatments without account underwriting access
    const coverageTests = [
      "will my policy cover", "is this covered under my policy", "will my specific policy cover",
      "does my plan cover condition", "does my plan cover surgery for", "am i covered for cosmetic",
      "will insurance pay for dental implants for me", "is laser eye surgery covered under my policy",
      "will my policy cover a specific treatment"
    ];
    return coverageTests.some(kw => query.includes(kw));
  }

  _isProcessGuidanceQuery(query) {
    return query.includes("how do i file a claim") ||
           query.includes("how does a claim work") ||
           query.includes("explain the health insurance process") ||
           query.includes("how to apply for insurance") ||
           query.includes("steps to apply");
  }

  _isFacultyContactQuery(query) {
    const facultyKeywords = [
      "faculty", "facluty", "authorized faculty", "authorised faculty",
      "faculty phone", "faculty contact", "faculty number", "faculty incharge",
      "faculty in-charge", "teacher phone", "teacher number", "teacher contact",
      "advisor phone", "who is the faculty", "contact faculty", "call faculty",
      "who to call if ai doesn't know", "who to call if ai doesn't understand"
    ];
    return facultyKeywords.some(kw => query.includes(kw));
  }

  // =========================================================================
  // Handlers & Tool Implementations
  // =========================================================================

  /**
   * Medical Advice Guardrail
   */
  _handleMedicalAdviceGuardrail(rawQuery) {
    const html = `
      <div class="structured-content">
        <div class="ai-callout warning">
          <span style="font-size:1.2rem;">⚠️</span>
          <div>
            <strong>Medical Notice & Non-Clinical Disclaimer</strong>
            <p>I am an AI Health Insurance Assistant designed solely to assist with insurance policies, claim processes, and documentation. I am not a doctor and cannot provide medical diagnosis, treatment recommendations, or drug prescriptions.</p>
          </div>
        </div>
        <p>If you or someone else is experiencing severe symptoms, acute pain, or a medical emergency, please consult a qualified healthcare professional or visit the emergency room immediately.</p>
        <p>Once you receive care, I will be right here to assist you with pre-authorization, hospital cashless paperwork, and claim filing.</p>
      </div>
    `;

    return {
      text: html,
      suggestions: [
        "How do I file an emergency claim?",
        "What is a cashless claim?",
        "What documents are needed for hospital admission?",
        "Talk to a human support agent"
      ]
    };
  }

  /**
   * Tool: get_claim_status()
   */
  async _handleClaimStatusTool(onToolExecute) {
    onToolExecute({
      toolName: "get_claim_status('CLM-10245')",
      status: "running",
      message: "Checking verified claim status in claims database..."
    });

    const res = await api.get_claim_status("CLM-10245");
    const claim = res.data;

    onToolExecute({
      toolName: "get_claim_status('CLM-10245')",
      status: "success",
      message: `✓ Verified claim data retrieved: ${claim.status} (${claim.progress}%)`
    });

    const html = `
      <div class="structured-content">
        <div class="ai-callout verified">
          <span>✓</span>
          <div>
            <strong>Verified Claim Record Retrieved</strong>
            <p>Direct lookup from claims database for Claim #${claim.claim_id}</p>
          </div>
        </div>

        <div class="chat-action-card">
          <div class="card-header-flex">
            <div>
              <span class="status-badge assessment">${claim.status}</span>
              <strong style="margin-left:0.5rem; color:var(--secondary);">#${claim.claim_id}</strong>
            </div>
            <span style="font-weight:800; color:var(--primary); font-size:1.1rem;">${claim.progress}% Complete</span>
          </div>

          <div class="progress-track" style="margin-bottom: 0.85rem;">
            <div class="progress-fill" style="width: ${claim.progress}%;"></div>
          </div>

          <div class="card-field-row">
            <div class="field-item">
              <span class="field-label">Current Stage</span>
              <span class="field-value">${claim.current_stage}</span>
            </div>
            <div class="field-item">
              <span class="field-label">Submitted On</span>
              <span class="field-value">${claim.submitted_date}</span>
            </div>
            <div class="field-item">
              <span class="field-label">Hospital</span>
              <span class="field-value">${claim.hospital}</span>
            </div>
            <div class="field-item">
              <span class="field-label">Claimed Amount</span>
              <span class="field-value">${claim.claimed_amount}</span>
            </div>
          </div>

          <div style="background:var(--bg-app); padding:0.65rem 0.85rem; border-radius:var(--radius-sm); border-left:3px solid var(--primary); font-size:0.82rem;">
            <strong>Next Step:</strong> ${claim.next_step}
          </div>
        </div>

        <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem;">
          <em>Note: Your claim is currently with the medical adjudication panel. No further documents are requested at this time.</em>
        </p>
      </div>
    `;

    return {
      text: html,
      suggestions: [
        "What documents have been verified for my claim?",
        "How long does claim assessment usually take?",
        "View claim timeline",
        "Talk to a human claims specialist"
      ],
      action: {
        type: "CLAIM_RETRIEVED",
        claimData: claim
      }
    };
  }

  /**
   * Tool: get_policy_summary()
   */
  async _handlePolicySummaryTool(onToolExecute) {
    onToolExecute({
      toolName: "get_policy_summary()",
      status: "running",
      message: "Fetching active policy contract details..."
    });

    const res = await api.get_policy_summary();
    const pol = res.data;

    onToolExecute({
      toolName: "get_policy_summary()",
      status: "success",
      message: `✓ Policy #${pol.policyNumber} retrieved (Active)`
    });

    const html = `
      <div class="structured-content">
        <div class="ai-callout verified">
          <span>✓</span>
          <div>
            <strong>Verified Policy Record</strong>
            <p>Active policy contract for ${pol.customerName}</p>
          </div>
        </div>

        <div class="chat-action-card">
          <div class="card-header-flex">
            <div>
              <span class="status-badge active">Active</span>
              <strong style="margin-left:0.5rem; color:var(--secondary);">${pol.planName}</strong>
            </div>
            <span style="font-size:0.82rem; color:var(--text-muted); font-weight:600;">#${pol.policyNumber}</span>
          </div>

          <div class="card-field-row">
            <div class="field-item">
              <span class="field-label">Base Sum Insured</span>
              <span class="field-value">${pol.sumInsured}</span>
            </div>
            <div class="field-item">
              <span class="field-label">Cumulative Bonus</span>
              <span class="field-value">${pol.cumulativeBonus}</span>
            </div>
            <div class="field-item">
              <span class="field-label">Total Current Protection</span>
              <span class="field-value" style="color:var(--primary); font-weight:800;">${pol.totalCoverage}</span>
            </div>
            <div class="field-item">
              <span class="field-label">Co-Payment / Deductible</span>
              <span class="field-value">${pol.coPayment} / ${pol.deductible}</span>
            </div>
            <div class="field-item">
              <span class="field-label">Room Rent Limit</span>
              <span class="field-value">${pol.roomRentLimit}</span>
            </div>
            <div class="field-item">
              <span class="field-label">Next Renewal Date</span>
              <span class="field-value">${pol.renewalDate}</span>
            </div>
          </div>

          <div style="font-size:0.8rem; color:var(--text-secondary); border-top:1px solid var(--border-subtle); padding-top:0.5rem;">
            <strong>Covered Members (${pol.coveredMembersCount}):</strong> ${pol.coveredMembers.join(", ")}
          </div>
        </div>
      </div>
    `;

    return {
      text: html,
      suggestions: [
        "What is the status of my claim?",
        "What is a cumulative bonus?",
        "How do I add a family member?",
        "What is my room rent limit?"
      ]
    };
  }

  /**
   * Tool: get_renewal_date()
   */
  async _handleRenewalTool(onToolExecute) {
    onToolExecute({
      toolName: "get_renewal_date()",
      status: "running",
      message: "Checking renewal schedule and bonus entitlement..."
    });

    const res = await api.get_renewal_date();
    const ren = res.data;

    onToolExecute({
      toolName: "get_renewal_date()",
      status: "success",
      message: `✓ Renewal on ${ren.renewal_date} (${ren.days_until_renewal} days remaining)`
    });

    const html = `
      <div class="structured-content">
        <h4 class="structured-title">Policy Renewal Schedule</h4>
        <p>Your <strong>${ren.policy_number}</strong> policy is due for renewal on <strong>${ren.renewal_date}</strong> (in ${ren.days_until_renewal} days).</p>
        
        <div class="chat-action-card">
          <div class="card-field-row">
            <div class="field-item">
              <span class="field-label">Renewal Date</span>
              <span class="field-value">${ren.renewal_date}</span>
            </div>
            <div class="field-item">
              <span class="field-label">Annual Premium</span>
              <span class="field-value">${ren.premium_amount}</span>
            </div>
            <div class="field-item">
              <span class="field-label">Accrued No-Claim Bonus</span>
              <span class="field-value" style="color:var(--primary); font-weight:700;">${ren.cumulative_bonus_available}</span>
            </div>
            <div class="field-item">
              <span class="field-label">Policy Status</span>
              <span class="field-value"><span class="status-badge active">${ren.status}</span></span>
            </div>
          </div>
        </div>

        <div class="ai-callout info">
          <span>ℹ️</span>
          <div>
            <strong>Renewal Tip</strong>
            <p>Renewing before the due date ensures your accrued waiting periods and bonus protection stay intact without interruption.</p>
          </div>
        </div>
      </div>
    `;

    return {
      text: html,
      suggestions: [
        "How do I pay my renewal premium?",
        "Can I add a family member during renewal?",
        "What is a grace period?",
        "How do I increase my sum insured?"
      ]
    };
  }

  /**
   * Tool: get_required_documents()
   */
  async _handleDocumentRequirements(query, onToolExecute) {
    const isApplication = query.includes("apply") || query.includes("application");
    const docType = isApplication ? "application" : "claim";

    onToolExecute({
      toolName: `get_required_documents('${docType}')`,
      status: "running",
      message: `Fetching required document checklist for ${docType}...`
    });

    const res = await api.get_required_documents(docType);

    onToolExecute({
      toolName: `get_required_documents('${docType}')`,
      status: "success",
      message: `✓ Retrieved ${res.documents.length} standard ${docType} documents`
    });

    let docItemsHtml = res.documents.map((d, i) => `
      <div class="structured-step">
        <div class="step-num">${i + 1}</div>
        <div class="step-content">
          <strong>${d.name}</strong>
          <p>${d.purpose || d.why_required}</p>
          <span style="font-size:0.75rem; color:var(--primary); font-weight:600;">Why required: ${d.why_required}</span>
        </div>
      </div>
    `).join("");

    const html = `
      <div class="structured-content">
        <h4 class="structured-title">Required Documents (${res.type})</h4>
        
        <div class="ai-callout disclaimer">
          <span>⚠️</span>
          <div>
            <strong>Important Variation Notice</strong>
            <p>${res.disclaimer}</p>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:0.6rem; margin-top:0.5rem;">
          ${docItemsHtml}
        </div>
      </div>
    `;

    return {
      text: html,
      suggestions: [
        isApplication ? "How do I apply for health insurance?" : "How do I file a claim?",
        "View interactive document checklist",
        "What is a cashless claim?",
        "What happens if a document is missing?"
      ]
    };
  }

  /**
   * Policy-Specific Treatment Query (Scenario 6)
   * Must NOT hallucinate or invent specific policy coverage!
   */
  _handlePolicySpecificCoverageQuestion(rawQuery) {
    const html = `
      <div class="structured-content">
        <div class="ai-callout info">
          <span>ℹ️</span>
          <div>
            <strong>Policy-Specific Coverage Notice</strong>
            <p>I can explain how coverage for this type of treatment is generally evaluated across health insurance policies, but I do not have direct access to your policy's specific endorsements, waiting-period riders, or exclusion schedules. Therefore, I cannot confirm whether your specific policy covers it.</p>
          </div>
        </div>

        <h4 class="structured-title" style="margin-top:0.5rem;">How Treatment Coverage is Evaluated:</h4>
        
        <div class="structured-step">
          <div class="step-num">1</div>
          <div class="step-content">
            <strong>Medical Necessity</strong>
            <p>Treatment must be clinically prescribed by a licensed specialist for an active medical condition (not elective or purely cosmetic).</p>
          </div>
        </div>

        <div class="structured-step">
          <div class="step-num">2</div>
          <div class="step-content">
            <strong>Waiting Periods</strong>
            <p>Specific conditions or pre-existing diseases often have a 1 to 3 year waiting period before coverage activates.</p>
          </div>
        </div>

        <div class="structured-step">
          <div class="step-num">3</div>
          <div class="step-content">
            <strong>Exclusions & Sub-limits</strong>
            <p>Check policy wording for specific sub-limits (e.g. room rent ceilings, robotic surgery caps, or standard exclusions).</p>
          </div>
        </div>

        <div class="escalation-cta-card">
          <div class="escalation-meta">
            <h4>Need confirmation for your specific treatment?</h4>
            <p>Our claims specialist can verify your exact policy document and medical records directly.</p>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-escalate-coverage">Contact Support</button>
        </div>
      </div>
    `;

    return {
      text: html,
      suggestions: [
        "What factors determine whether a treatment is covered?",
        "What are common health-insurance exclusions?",
        "What is a waiting period?",
        "How can I check my policy coverage?",
        "What documents can I use to verify coverage?"
      ]
    };
  }

  /**
   * Step-by-step Process Guidance (Applying or Claiming)
   */
  _handleProcessGuidance(query) {
    if (query.includes("claim")) {
      const stages = KNOWLEDGE_BASE.claimStages;
      const stepsHtml = stages.map(s => `
        <div class="structured-step">
          <div class="step-num">${s.stage}</div>
          <div class="step-content">
            <strong>${s.name}</strong>
            <p>${s.description}</p>
          </div>
        </div>
      `).join("");

      const html = `
        <div class="structured-content">
          <h4 class="structured-title">How a Health Insurance Claim Works (Step-by-Step)</h4>
          <p>Whether cashless or reimbursement, every claim follows these key stages:</p>
          <div style="display:flex; flex-direction:column; gap:0.6rem; margin:0.6rem 0;">
            ${stepsHtml}
          </div>
          <div class="ai-callout info">
            <span>💡</span>
            <div>
              <strong>Cashless vs Reimbursement</strong>
              <p>For cashless claims, pre-authorization happens at the network hospital desk. For reimbursement, you submit all original bills after discharge.</p>
            </div>
          </div>
        </div>
      `;

      return {
        text: html,
        suggestions: [
          "What documents are required for a claim?",
          "What is a cashless claim?",
          "What stage is my claim in?",
          "How long does a claim take?"
        ]
      };
    } else {
      // Application process (10 steps)
      const steps = KNOWLEDGE_BASE.applicationProcess;
      const stepsHtml = steps.map(s => `
        <div class="structured-step">
          <div class="step-num">${s.step}</div>
          <div class="step-content">
            <strong>${s.title}</strong>
            <p>${s.description}</p>
          </div>
        </div>
      `).join("");

      const html = `
        <div class="structured-content">
          <h4 class="structured-title">Applying for Health Insurance (10-Step Journey)</h4>
          <div style="display:flex; flex-direction:column; gap:0.6rem; margin:0.6rem 0;">
            ${stepsHtml}
          </div>
        </div>
      `;

      return {
        text: html,
        suggestions: [
          "What documents are required to apply?",
          "What is a waiting period?",
          "How do I choose the right sum insured?",
          "What is underwriting in health insurance?"
        ]
      };
    }
  }

  /**
   * General Knowledge Base / FAQ Matcher
   */
  _findKnowledgeBaseMatch(query) {
    // Check FAQs first
    for (const faq of KNOWLEDGE_BASE.faqs) {
      if (query.includes(faq.question.toLowerCase().replace("?", ""))) {
        return { type: "faq", data: faq };
      }
    }

    // Check specific terms
    for (const [termKey, termData] of Object.entries(KNOWLEDGE_BASE.terms)) {
      if (query.includes(termKey)) {
        return { type: "term", key: termKey, data: termData };
      }
    }

    // Secondary keyword matching
    if (query.includes("deductible")) return { type: "term", key: "deductible", data: KNOWLEDGE_BASE.terms["deductible"] };
    if (query.includes("premium")) return { type: "term", key: "premium", data: KNOWLEDGE_BASE.terms["premium"] };
    if (query.includes("copay") || query.includes("co-pay") || query.includes("co-payment")) return { type: "term", key: "co-payment", data: KNOWLEDGE_BASE.terms["co-payment"] };
    if (query.includes("cashless")) return { type: "term", key: "cashless treatment", data: KNOWLEDGE_BASE.terms["cashless treatment"] };
    if (query.includes("reimbursement")) return { type: "term", key: "reimbursement", data: KNOWLEDGE_BASE.terms["reimbursement"] };
    if (query.includes("waiting period")) return { type: "term", key: "waiting period", data: KNOWLEDGE_BASE.terms["waiting period"] };
    if (query.includes("exclusion")) return { type: "term", key: "exclusions", data: KNOWLEDGE_BASE.terms["exclusions"] };
    if (query.includes("network hospital")) return { type: "term", key: "network hospitals", data: KNOWLEDGE_BASE.terms["network hospitals"] };
    if (query.includes("bonus") || query.includes("ncb")) return { type: "term", key: "no-claim bonus", data: KNOWLEDGE_BASE.terms["no-claim bonus"] };
    if (query.includes("health insurance")) return { type: "term", key: "health insurance", data: KNOWLEDGE_BASE.terms["health insurance"] };

    return null;
  }

  _handleKnowledgeBaseResponse(match, rawQuery) {
    if (match.type === "faq") {
      const faq = match.data;
      const formattedAnswer = faq.answer.split("\n").map(line => {
        if (line.startsWith("•") || line.startsWith("-")) {
          return `<li>${line.substring(1).trim()}</li>`;
        }
        if (/^\d+\./.test(line)) {
          return `<div style="margin-bottom:0.25rem;"><strong>${line.split(":")[0] || line}</strong>${line.includes(":") ? ": " + line.split(":").slice(1).join(":") : ""}</div>`;
        }
        return `<p style="margin-bottom:0.4rem;">${line}</p>`;
      }).join("");

      const html = `
        <div class="structured-content">
          <h4 class="structured-title">${faq.question}</h4>
          <div style="font-size:0.9rem; line-height:1.6; color:var(--text-primary);">
            ${formattedAnswer}
          </div>
        </div>
      `;

      return {
        text: html,
        suggestions: faq.related || [
          "How does health insurance work?",
          "What is a cashless claim?",
          "What documents are required for a claim?"
        ]
      };
    } else {
      // Term
      const term = match.data;
      const keyPointsHtml = term.keyPoints.map(kp => `<li>${kp}</li>`).join("");

      const html = `
        <div class="structured-content">
          <h4 class="structured-title">${term.title}</h4>
          <p style="font-size:0.92rem; color:var(--text-primary); margin-bottom:0.5rem;">${term.summary}</p>
          
          <div style="background:var(--bg-app); border-radius:var(--radius-md); padding:0.85rem 1rem; border-left:3px solid var(--primary); margin:0.5rem 0;">
            <strong style="font-size:0.82rem; text-transform:uppercase; color:var(--secondary); letter-spacing:0.03em;">Key Rules to Know:</strong>
            <ul style="margin-top:0.4rem; padding-left:1.2rem; font-size:0.85rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:0.35rem;">
              ${keyPointsHtml}
            </ul>
          </div>
        </div>
      `;

      return {
        text: html,
        suggestions: term.relatedQuestions
      };
    }
  }

  /**
   * Guided Recovery for Unknown / Obscure Questions (Scenario 7)
   * Displays Authorized Faculty Phone Number when AI doesn't know something!
   */
  _handleGuidedRecovery(rawQuery) {
    const html = `
      <div class="structured-content">
        <div class="ai-callout info">
          <span style="font-size:1.15rem;">ℹ️</span>
          <div>
            <strong>Information Limitation Notice</strong>
            <p>I don't have verified information in my knowledge base to answer that specific inquiry. To ensure total accuracy and prevent hallucinations, I never speculate on unverified rules or policy terms.</p>
          </div>
        </div>

        <!-- Authorized Faculty Contact Card -->
        <div class="faculty-contact-card">
          <div class="faculty-header">
            <div class="faculty-avatar-badge">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <div class="faculty-meta">
              <span class="faculty-badge-pill">🎓 Authorized Faculty In-Charge</span>
              <h4 class="faculty-name">${AUTHORIZED_FACULTY.title}</h4>
              <p class="faculty-dept">${AUTHORIZED_FACULTY.department}</p>
            </div>
          </div>

          <div class="faculty-body">
            <p class="faculty-help-text">
              Because I cannot answer this query, please contact the <strong>Authorized Faculty</strong> directly for official assistance and verification:
            </p>
            
            <div class="faculty-phone-box">
              <div class="faculty-phone-main">
                <div class="phone-label">Direct Authorized Phone / Hotline:</div>
                <a href="tel:${AUTHORIZED_FACULTY.phoneRaw}" class="faculty-phone-number" title="Click to call authorized faculty">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>${AUTHORIZED_FACULTY.phone}</span>
                </a>
              </div>
              <div class="faculty-actions-row">
                <a href="tel:${AUTHORIZED_FACULTY.phoneRaw}" class="btn btn-primary btn-sm faculty-call-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  Call Faculty
                </a>
                <button type="button" class="btn btn-outline btn-sm copy-phone-btn" data-phone="${AUTHORIZED_FACULTY.phone}">
                  📋 Copy Number
                </button>
              </div>
            </div>

            <div class="faculty-meta-grid">
              <div class="faculty-meta-item">
                <span class="meta-icon">🕒</span>
                <span><strong>Hours:</strong> ${AUTHORIZED_FACULTY.officeHours}</span>
              </div>
              <div class="faculty-meta-item">
                <span class="meta-icon">🏢</span>
                <span><strong>Office:</strong> ${AUTHORIZED_FACULTY.officeLocation}</span>
              </div>
              <div class="faculty-meta-item">
                <span class="meta-icon">📞</span>
                <span><strong>Campus Line:</strong> <a href="tel:${AUTHORIZED_FACULTY.alternatePhoneRaw}" class="subtle-link">${AUTHORIZED_FACULTY.alternatePhone}</a></span>
              </div>
              <div class="faculty-meta-item">
                <span class="meta-icon">✉️</span>
                <span><strong>Email:</strong> <a href="mailto:${AUTHORIZED_FACULTY.email}" class="subtle-link">${AUTHORIZED_FACULTY.email}</a></span>
              </div>
            </div>
          </div>
        </div>

        <p style="margin-top:0.6rem; font-size:0.88rem; color:var(--text-secondary);">
          Alternatively, explore these verified insurance topics that I can fully assist you with:
        </p>

        <div style="display:flex; flex-wrap:wrap; gap:0.45rem; margin:0.5rem 0;">
          <button class="try-pill" style="padding:0.4rem 0.8rem;" onclick="window.app.askQuery('What does health insurance cover?')">Coverage & Benefits</button>
          <button class="try-pill" style="padding:0.4rem 0.8rem;" onclick="window.app.askQuery('How do I file a claim?')">Claim Process</button>
          <button class="try-pill" style="padding:0.4rem 0.8rem;" onclick="window.app.askQuery('What documents are required for a claim?')">Required Documents</button>
          <button class="try-pill" style="padding:0.4rem 0.8rem;" onclick="window.app.askQuery('What is a premium?')">Premiums & Deductibles</button>
          <button class="try-pill" style="padding:0.4rem 0.8rem;" onclick="window.app.askQuery('How do I renew my health insurance?')">Policy Renewal</button>
          <button class="try-pill" style="padding:0.4rem 0.8rem;" onclick="window.app.askQuery('What is a waiting period?')">Waiting Periods</button>
        </div>

        <div class="escalation-cta-card">
          <div class="escalation-meta">
            <h4>Need formal ticket escalation?</h4>
            <p>You can also dispatch an automated AI dossier to the customer claims desk.</p>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-escalate-unknown">Talk to Support</button>
        </div>
      </div>
    `;

    return {
      text: html,
      suggestions: [
        "What is the phone number of authorized faculty?",
        "What does health insurance cover?",
        "What are common health-insurance exclusions?",
        "What is a deductible?",
        "Talk to a human"
      ]
    };
  }

  /**
   * Dedicated Response for Authorized Faculty Contact Queries
   */
  _handleFacultyContactResponse() {
    const html = `
      <div class="structured-content">
        <div class="ai-callout verified">
          <span>✓</span>
          <div>
            <strong>Authorized Faculty Contact Record</strong>
            <p>Official institutional contact for student queries, policy disputes, and escalation.</p>
          </div>
        </div>

        <div class="faculty-contact-card">
          <div class="faculty-header">
            <div class="faculty-avatar-badge">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <div class="faculty-meta">
              <span class="faculty-badge-pill">🎓 Authorized Faculty In-Charge</span>
              <h4 class="faculty-name">${AUTHORIZED_FACULTY.title}</h4>
              <p class="faculty-dept">${AUTHORIZED_FACULTY.department}</p>
            </div>
          </div>

          <div class="faculty-body">
            <p class="faculty-help-text">
              Reach out directly to the authorized faculty member for institutional advisory and off-record policy resolution:
            </p>
            
            <div class="faculty-phone-box">
              <div class="faculty-phone-main">
                <div class="phone-label">Authorized Faculty Direct Phone:</div>
                <a href="tel:${AUTHORIZED_FACULTY.phoneRaw}" class="faculty-phone-number" title="Click to call authorized faculty">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>${AUTHORIZED_FACULTY.phone}</span>
                </a>
              </div>
              <div class="faculty-actions-row">
                <a href="tel:${AUTHORIZED_FACULTY.phoneRaw}" class="btn btn-primary btn-sm faculty-call-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  Call Faculty
                </a>
                <button type="button" class="btn btn-outline btn-sm copy-phone-btn" data-phone="${AUTHORIZED_FACULTY.phone}">
                  📋 Copy Number
                </button>
              </div>
            </div>

            <div class="faculty-meta-grid">
              <div class="faculty-meta-item">
                <span class="meta-icon">🕒</span>
                <span><strong>Office Hours:</strong> ${AUTHORIZED_FACULTY.officeHours}</span>
              </div>
              <div class="faculty-meta-item">
                <span class="meta-icon">🏢</span>
                <span><strong>Office Location:</strong> ${AUTHORIZED_FACULTY.officeLocation}</span>
              </div>
              <div class="faculty-meta-item">
                <span class="meta-icon">📞</span>
                <span><strong>Campus Line:</strong> <a href="tel:${AUTHORIZED_FACULTY.alternatePhoneRaw}" class="subtle-link">${AUTHORIZED_FACULTY.alternatePhone}</a></span>
              </div>
              <div class="faculty-meta-item">
                <span class="meta-icon">✉️</span>
                <span><strong>Official Email:</strong> <a href="mailto:${AUTHORIZED_FACULTY.email}" class="subtle-link">${AUTHORIZED_FACULTY.email}</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    return {
      text: html,
      suggestions: [
        "What stage is my claim in?",
        "What documents are required for my claim?",
        "Talk to a human claims specialist",
        "How do I file a claim?"
      ]
    };
  }

  /**
   * Human Escalation Handler (Scenario 8)
   */
  async _handleHumanHandoff(rawQuery, onToolExecute, reason) {
    onToolExecute({
      toolName: "create_support_ticket()",
      status: "running",
      message: "Compiling conversation context and generating AI escalation dossier..."
    });

    const aiSummary = {
      customerRequest: rawQuery,
      detectedTopic: "Specialized Policy / Escalation Request",
      infoAvailable: "General insurance knowledge, verified claim #CLM-10245 status (Under Assessment, 65%)",
      infoUnavailable: "Specific underwriter exceptions or customized off-record policies",
      actionsPerformed: ["Identified user intent", "Queried active customer context", "Prepared handover ticket"],
      reasonForEscalation: reason || "User requested human support or safety boundary reached"
    };

    const res = await api.create_support_ticket({
      reason: aiSummary.reasonForEscalation,
      topic: aiSummary.detectedTopic,
      ai_summary: aiSummary,
      transcript: this.conversationHistory
    });

    const ticket = res.data;

    onToolExecute({
      toolName: "create_support_ticket()",
      status: "success",
      message: `✓ Support Ticket #${ticket.ticket_id} created and dispatched`
    });

    const html = `
      <div class="structured-content">
        <div class="ai-callout verified">
          <span>✓</span>
          <div>
            <strong>Connected with Support — Ticket #${ticket.ticket_id}</strong>
            <p>Assigned to: <strong>${ticket.assigned_specialist}</strong> (Estimated callback: ${ticket.estimated_callback})</p>
          </div>
        </div>

        <div class="chat-action-card">
          <div class="card-header-flex">
            <div>
              <span class="status-badge active">Escalated</span>
              <strong style="margin-left:0.5rem; color:var(--secondary);">Support Ticket #${ticket.ticket_id}</strong>
            </div>
            <span style="font-size:0.75rem; color:var(--text-muted);">${ticket.created_at}</span>
          </div>

          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.75rem;">
            A complete <strong>AI Escalation Dossier</strong> has been sent to the specialist. <em>You will not need to repeat your questions or account details.</em>
          </p>

          <div style="background:var(--bg-app); padding:0.85rem; border-radius:var(--radius-md); font-size:0.8rem; display:flex; flex-direction:column; gap:0.35rem;">
            <div><strong>Customer:</strong> ${ticket.customer} (ID: ${ticket.customer_id})</div>
            <div><strong>Active Policy:</strong> ${ticket.policy_number}</div>
            <div><strong>Active Claim:</strong> #${ticket.claim_id} (Under Assessment)</div>
            <div><strong>Detected Need:</strong> ${ticket.reason}</div>
            <div style="border-top:1px solid var(--border-subtle); padding-top:0.45rem; margin-top:0.3rem; color:var(--text-secondary);">
              <strong>Authorized Faculty In-Charge:</strong> ${AUTHORIZED_FACULTY.name} — <a href="tel:${AUTHORIZED_FACULTY.phoneRaw}" style="color:var(--primary); font-weight:700;">${AUTHORIZED_FACULTY.phone}</a> (${AUTHORIZED_FACULTY.officeHours})
            </div>
          </div>
        </div>
      </div>
    `;

    return {
      text: html,
      suggestions: [
        "What stage is my claim in?",
        "What documents are required for my claim?",
        "How does a health insurance claim work?",
        "Back to FAQs"
      ],
      action: {
        type: "TICKET_CREATED",
        ticket
      }
    };
  }
}
