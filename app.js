/**
 * InsureAssist AI - Main Application Coordinator
 * Handles navigation routing, event dispatching, test scenarios, and modal dialogs.
 */

import { KNOWLEDGE_BASE } from "./data/knowledgeBase.js";
import { MOCK_USER_DATA } from "./data/mockData.js";
import { InsuranceAIEngine } from "./services/aiEngine.js";
import { ChatView } from "./ui/chatView.js";
import { ClaimTrackerView } from "./ui/claimTracker.js";
import { DocumentChecklistView } from "./ui/documentChecklist.js";
import { ProcessGuideView } from "./ui/processGuide.js";

class App {
  constructor() {
    this.aiEngine = new InsuranceAIEngine();
    this.activeSection = "home";
    this.chatView = null;
    this.claimTracker = null;
    this.documentChecklist = null;
    this.processGuide = null;

    this.init();
  }

  init() {
    // 1. Initialize Sub-views
    const chatContainer = document.getElementById("chat-container");
    this.chatView = new ChatView(
      chatContainer,
      (query) => this.askQuery(query),
      () => this.openEscalationModal("User requested human support through chat option.")
    );

    const claimTrackerContainer = document.getElementById("claim-tracker-container");
    this.claimTracker = new ClaimTrackerView(claimTrackerContainer, (actionType) => {
      if (actionType === "VIEW_CLAIM_MODAL") {
        this.openClaimDetailsModal();
      } else if (actionType === "NAVIGATE_DOCUMENTS") {
        this.navigateTo("documents");
      } else if (actionType === "ASK_CLAIM_QUERY") {
        this.askQuery("What stage is my claim in?");
      } else if (actionType === "OPEN_SUPPORT_MODAL") {
        this.openEscalationModal("User requested assistance regarding Claim #CLM-10245.");
      }
    });

    const docChecklistContainer = document.getElementById("doc-checklist-container");
    this.documentChecklist = new DocumentChecklistView(docChecklistContainer, (action, payload) => {
      if (action === "ASK_AI_MISSING") {
        this.askQuery("What documents are required for a claim?");
      } else if (action === "STATUS_UPDATED" || action === "ALL_PREPARED") {
        this.updateDashboardDocStats(payload.stats);
      }
    });

    const processGuideContainer = document.getElementById("process-guide-container");
    this.processGuide = new ProcessGuideView(processGuideContainer);

    // 2. Render FAQ Grid
    this.renderFaqGrid();

    // 3. Bind Global Navigation & Event Listeners
    this.bindNavigation();
    this.bindChatEvents();
    this.bindTestScenarios();
    this.bindModals();
    this.bindNotifications();

    // Initial greeting message in chat
    this.chatView.appendAssistantMessage({
      text: `
        <div class="structured-content">
          <h4 class="structured-title">Welcome to InsureAssist AI 👋</h4>
          <p>I am your verified Health Insurance Assistant. You can ask me any general health-insurance question, review your active claim <strong>#CLM-10245</strong>, prepare required documents, or learn how insurance processes work.</p>
          <div class="ai-callout info">
            <span>💡</span>
            <div>
              <strong>Quick Tip:</strong>
              Click any suggested question or choose a scenario from the top bar to get started immediately.
            </div>
          </div>
        </div>
      `,
      suggestions: [
        "What stage is my claim in?",
        "Explain health insurance",
        "What documents do I need to apply?",
        "What is a deductible?",
        "How do I file a claim?"
      ]
    });
  }

  // -------------------------------------------------------------------------
  // Navigation Routing
  // -------------------------------------------------------------------------
  bindNavigation() {
    const navLinks = document.querySelectorAll(".nav-link[data-nav]");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute("data-nav");
        this.navigateTo(targetSection);
      });
    });

    // Logo click goes home
    document.getElementById("site-logo").addEventListener("click", () => {
      this.navigateTo("home");
    });

    // Hero buttons
    const heroAskBtn = document.getElementById("hero-btn-ask");
    if (heroAskBtn) {
      heroAskBtn.addEventListener("click", () => {
        this.navigateTo("ask-ai");
        const input = document.getElementById("chat-input");
        if (input) input.focus();
      });
    }

    const heroGuideBtn = document.getElementById("hero-btn-guide");
    if (heroGuideBtn) {
      heroGuideBtn.addEventListener("click", () => {
        this.navigateTo("guide");
      });
    }

    // Dashboard quick card actions
    document.getElementById("dash-card-ask")?.addEventListener("click", () => {
      this.navigateTo("ask-ai");
    });
    document.getElementById("dash-card-claim")?.addEventListener("click", () => {
      this.navigateTo("claim");
    });
    document.getElementById("dash-card-docs")?.addEventListener("click", () => {
      this.navigateTo("documents");
    });
    document.getElementById("dash-card-guide")?.addEventListener("click", () => {
      this.navigateTo("guide");
    });
  }

  navigateTo(sectionId) {
    this.activeSection = sectionId;

    // Update active class on nav links
    document.querySelectorAll(".nav-link[data-nav]").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("data-nav") === sectionId);
    });

    // Update active class on section elements
    document.querySelectorAll(".section").forEach((sec) => {
      sec.classList.toggle("active", sec.id === `section-${sectionId}`);
    });

    // Scroll to top of section
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // -------------------------------------------------------------------------
  // Chat Interaction Logic
  // -------------------------------------------------------------------------
  bindChatEvents() {
    const form = document.getElementById("chat-form");
    const input = document.getElementById("chat-input");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = input.value.trim();
      if (!query) return;

      input.value = "";
      this.askQuery(query);
    });

    // "Try asking" quick pills
    document.querySelectorAll(".try-pill[data-try]").forEach((pill) => {
      pill.addEventListener("click", () => {
        const query = pill.getAttribute("data-try");
        this.askQuery(query);
      });
    });

    // Clear chat button
    document.getElementById("btn-clear-chat")?.addEventListener("click", () => {
      const messages = document.getElementById("chat-messages");
      messages.innerHTML = "";
      this.chatView.appendAssistantMessage({
        text: "<p>Chat cleared. What health-insurance question can I help you with?</p>",
        suggestions: [
          "Explain health insurance",
          "What stage is my claim in?",
          "What documents do I need to apply?",
          "What is a deductible?"
        ]
      });
    });
  }

  /**
   * Main query execution flow
   */
  async askQuery(queryText) {
    if (!queryText) return;

    // Switch to Ask AI section if on another page
    if (this.activeSection !== "ask-ai") {
      this.navigateTo("ask-ai");
    }

    // Display user message in chat
    this.chatView.appendUserMessage(queryText);
    this.chatView.showTypingIndicator();

    try {
      const response = await this.aiEngine.processQuery(queryText, (toolStatus) => {
        this.chatView.updateToolExecution(toolStatus);
      });

      this.chatView.appendAssistantMessage({
        text: response.text,
        suggestions: response.suggestions
      });
    } catch (err) {
      console.error("Error processing AI query:", err);
      this.chatView.appendAssistantMessage({
        text: `
          <div class="structured-content">
            <div class="ai-callout warning">
              <span>⚠️</span>
              <div>
                <strong>System Notice</strong>
                <p>An unexpected error occurred while processing your request. Please try again or connect with human support.</p>
              </div>
            </div>
          </div>
        `,
        suggestions: ["Talk to a human", "What stage is my claim in?", "Explain health insurance"]
      });
    }
  }

  // -------------------------------------------------------------------------
  // FAQ Grid
  // -------------------------------------------------------------------------
  renderFaqGrid() {
    const grid = document.getElementById("faq-grid");
    if (!grid) return;

    grid.innerHTML = KNOWLEDGE_BASE.faqs.map((faq) => `
      <div class="faq-card" data-faq-id="${faq.id}">
        <div class="faq-card-content">
          <span class="faq-card-icon">💬</span>
          <span class="faq-card-text">${faq.question}</span>
        </div>
        <span class="faq-card-arrow">→</span>
      </div>
    `).join("");

    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".faq-card");
      if (card) {
        const questionText = card.querySelector(".faq-card-text").textContent.trim();
        this.askQuery(questionText);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 8 Test Scenarios Bar (Direct Requirement from Specification)
  // -------------------------------------------------------------------------
  bindTestScenarios() {
    const chips = document.querySelectorAll(".scenario-chip[data-scenario]");
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const num = chip.getAttribute("data-scenario");
        this.runScenario(num);
      });
    });
  }

  runScenario(number) {
    const scenarios = {
      "1": "Explain health insurance.",
      "2": "What documents do I need to apply?",
      "3": "How do I file a claim?",
      "4": "What stage is my claim in?",
      "5": "What is a deductible?",
      "6": "Will my policy cover a specific treatment?",
      "7": "Tell me something about an obscure insurance rule that isn't in your knowledge base.",
      "8": "Talk to a human."
    };

    const query = scenarios[number];
    if (query) {
      this.askQuery(query);
    }
  }

  // -------------------------------------------------------------------------
  // Notifications Dropdown
  // -------------------------------------------------------------------------
  bindNotifications() {
    const btn = document.getElementById("notification-btn");
    const panel = document.getElementById("notifications-panel");
    const list = document.getElementById("notif-list");

    if (list) {
      list.innerHTML = MOCK_USER_DATA.notifications.map((n) => `
        <div class="notif-item ${n.unread ? 'unread' : ''}">
          <div class="notif-icon" style="background:${n.type === 'success' ? '#ECFDF5' : n.type === 'warning' ? '#FFFBEB' : '#EFF6FF'};">
            ${n.type === 'success' ? '✓' : n.type === 'warning' ? '🔔' : 'ℹ️'}
          </div>
          <div class="notif-body">
            <h5>${n.title}</h5>
            <p>${n.message}</p>
            <div class="notif-time">${n.time}</div>
          </div>
        </div>
      `).join("");
    }

    if (btn && panel) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        panel.classList.toggle("open");
      });

      document.addEventListener("click", (e) => {
        if (!panel.contains(e.target) && !btn.contains(e.target)) {
          panel.classList.remove("open");
        }
      });
    }
  }

  // -------------------------------------------------------------------------
  // Modals & Popups
  // -------------------------------------------------------------------------
  bindModals() {
    // Backdrop close
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop || e.target.closest(".modal-close-btn")) {
          backdrop.classList.remove("open");
        }
      });
    });

    // Profile button opens policy summary
    document.getElementById("user-profile-btn")?.addEventListener("click", () => {
      this.openPolicyDetailsModal();
    });
  }

  openClaimDetailsModal() {
    const modal = document.getElementById("claim-details-modal");
    const c = MOCK_USER_DATA.claim;

    document.getElementById("modal-claim-content").innerHTML = `
      <div style="display:flex; flex-direction:column; gap:1rem;">
        <div class="card-field-row">
          <div class="field-item">
            <span class="field-label">Claim ID</span>
            <span class="field-value">#${c.claimId}</span>
          </div>
          <div class="field-item">
            <span class="field-label">Status</span>
            <span class="field-value"><span class="status-badge ${c.statusType}">${c.status}</span></span>
          </div>
          <div class="field-item">
            <span class="field-label">Hospital</span>
            <span class="field-value">${c.hospitalName}</span>
          </div>
          <div class="field-item">
            <span class="field-label">Treatment</span>
            <span class="field-value">${c.treatmentType}</span>
          </div>
          <div class="field-item">
            <span class="field-label">Admission / Discharge</span>
            <span class="field-value">${c.admissionDate} → ${c.dischargeDate}</span>
          </div>
          <div class="field-item">
            <span class="field-label">Claimed Amount</span>
            <span class="field-value">${c.claimedAmount}</span>
          </div>
          <div class="field-item">
            <span class="field-label">Assigned Medical Examiner</span>
            <span class="field-value">${c.assignedAdjudicator}</span>
          </div>
          <div class="field-item">
            <span class="field-label">TPA Provider</span>
            <span class="field-value">${c.tpaName}</span>
          </div>
        </div>

        <h4 style="font-size:0.95rem; font-weight:700; color:var(--secondary); margin-top:0.5rem;">Audit & Processing Stages</h4>
        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          ${c.stages.map(s => `
            <div style="display:flex; align-items:flex-start; gap:0.6rem; font-size:0.82rem; padding:0.4rem 0; border-bottom:1px solid var(--border-subtle);">
              <span style="font-weight:700; color:${s.status === 'completed' ? 'var(--primary)' : s.status === 'active' ? '#2563EB' : 'var(--text-light)'};">
                ${s.status === 'completed' ? '✓' : s.status === 'active' ? '●' : '○'} Stage ${s.index}:
              </span>
              <div style="flex:1;">
                <strong>${s.title}</strong> (${s.date || 'Pending'})
                <div style="color:var(--text-secondary); font-size:0.76rem;">${s.note}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    modal.classList.add("open");
  }

  openPolicyDetailsModal() {
    const modal = document.getElementById("policy-details-modal");
    const p = MOCK_USER_DATA.policy;
    const u = MOCK_USER_DATA.customer;

    document.getElementById("modal-policy-content").innerHTML = `
      <div style="display:flex; flex-direction:column; gap:1rem;">
        <div class="card-field-row">
          <div class="field-item">
            <span class="field-label">Policyholder</span>
            <span class="field-value">${u.name} (ID: ${u.id})</span>
          </div>
          <div class="field-item">
            <span class="field-label">Policy Plan</span>
            <span class="field-value">${p.planName}</span>
          </div>
          <div class="field-item">
            <span class="field-label">Policy Number</span>
            <span class="field-value">#${p.policyNumber}</span>
          </div>
          <div class="field-item">
            <span class="field-label">Status</span>
            <span class="field-value"><span class="status-badge active">${p.status}</span></span>
          </div>
          <div class="field-item">
            <span class="field-label">Base Sum Insured</span>
            <span class="field-value">${p.sumInsured}</span>
          </div>
          <div class="field-item">
            <span class="field-label">Cumulative Bonus</span>
            <span class="field-value">${p.cumulativeBonus}</span>
          </div>
          <div class="field-item">
            <span class="field-label">Total Coverage</span>
            <span class="field-value" style="color:var(--primary); font-weight:800;">${p.totalCoverage}</span>
          </div>
          <div class="field-item">
            <span class="field-label">Renewal Date</span>
            <span class="field-value">${p.renewalDate}</span>
          </div>
        </div>

        <h4 style="font-size:0.95rem; font-weight:700; color:var(--secondary); margin-top:0.5rem;">Covered Members</h4>
        <div style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.82rem;">
          ${p.coveredMembers.map(m => `
            <div style="display:flex; justify-content:space-between; background:var(--bg-app); padding:0.5rem 0.75rem; border-radius:var(--radius-sm);">
              <strong>${m.name}</strong>
              <span style="color:var(--text-muted);">${m.relation}, Age ${m.age}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    modal.classList.add("open");
  }

  async openEscalationModal(reason) {
    const modal = document.getElementById("escalation-modal");
    modal.classList.add("open");

    // Automatically trigger support ticket creation
    this.askQuery("Talk to a human.");
  }

  updateDashboardDocStats(stats) {
    const docValue = document.getElementById("dash-doc-value");
    if (docValue) {
      docValue.textContent = `${stats.preparedCount} / ${stats.total} completed`;
    }
  }
}

// Instantiate and expose globally
window.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});
