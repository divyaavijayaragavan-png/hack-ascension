/**
 * InsureAssist AI - Claim Tracker UI Controller
 * Renders the 8-stage visual claim journey, completion %, and interactive action handlers
 */

import { MOCK_USER_DATA } from "../data/mockData.js";

export class ClaimTrackerView {
  constructor(containerEl, onActionTrigger) {
    this.containerEl = containerEl;
    this.onActionTrigger = onActionTrigger;
    this.claimData = MOCK_USER_DATA.claim;

    this.render();
    this._bindEvents();
  }

  render() {
    if (!this.containerEl) return;

    const c = this.claimData;

    // Build 8 stages
    const stagesHtml = c.stages.map((st) => {
      let icon = st.index;
      let statusClass = "pending";
      let statusCaption = "Pending";

      if (st.status === "completed") {
        icon = "✓";
        statusClass = "completed";
        statusCaption = st.date || "Completed";
      } else if (st.status === "active") {
        icon = "●";
        statusClass = "active";
        statusCaption = "In Progress";
      }

      return `
        <div class="stage-item ${statusClass}" title="${st.note}">
          <div class="stage-node">${icon}</div>
          <span class="stage-title">${st.title}</span>
          <span class="stage-status-caption">${statusCaption}</span>
        </div>
      `;
    }).join("");

    this.containerEl.innerHTML = `
      <div class="claim-journey-card">
        <div class="claim-header-block">
          <div class="claim-meta-left">
            <div>
              <div style="display:flex; align-items:center; gap:0.6rem;">
                <span class="claim-id-badge">Claim #${c.claimId}</span>
                <span class="status-badge ${c.statusType}">${c.status}</span>
                <span class="badge-simulated">Demo Claim Data</span>
              </div>
              <div class="claim-sub-meta" style="margin-top:0.25rem;">
                Submitted: <strong>${c.submittedDate}</strong> • Last Updated: <strong>${c.lastUpdatedDate}</strong> • Patient: <strong>${c.patientName}</strong>
              </div>
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.78rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.04em;">Claimed Amount</div>
            <div style="font-size:1.3rem; font-weight:800; color:var(--secondary);">${c.claimedAmount}</div>
          </div>
        </div>

        <!-- Progress Percentage Bar -->
        <div class="claim-progress-bar-wrap">
          <div class="progress-header-flex">
            <span class="progress-label-text">Overall Claim Progress</span>
            <span class="progress-pct-text">${c.progress}% Complete</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${c.progress}%;"></div>
          </div>
        </div>

        <!-- 8-Stage Horizontal Journey Tracker -->
        <div class="journey-stages-container">
          ${stagesHtml}
        </div>

        <!-- Next Steps Info Box -->
        <div class="claim-next-step-box">
          <div class="next-step-info">
            <h4>Next Step in Process</h4>
            <p>${c.nextStep}</p>
          </div>
          <button class="btn btn-outline btn-sm" id="btn-view-timeline">View Full Timeline</button>
        </div>

        <!-- Claim Status Actions -->
        <div class="claim-actions-row">
          <button class="btn btn-primary btn-sm" id="btn-view-claim-details">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            View Claim Details
          </button>
          <button class="btn btn-outline btn-sm" id="btn-view-claim-docs">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            View Claim Documents
          </button>
          <button class="btn btn-outline btn-sm" id="btn-ask-ai-claim">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Ask AI About Claim
          </button>
          <button class="btn btn-outline btn-sm" id="btn-contact-support-claim">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Contact Claims Desk
          </button>
        </div>
      </div>
    `;
  }

  _bindEvents() {
    this.containerEl.addEventListener("click", (e) => {
      if (e.target.closest("#btn-view-claim-details") || e.target.closest("#btn-view-timeline")) {
        if (this.onActionTrigger) this.onActionTrigger("VIEW_CLAIM_MODAL");
      } else if (e.target.closest("#btn-view-claim-docs")) {
        if (this.onActionTrigger) this.onActionTrigger("NAVIGATE_DOCUMENTS");
      } else if (e.target.closest("#btn-ask-ai-claim")) {
        if (this.onActionTrigger) this.onActionTrigger("ASK_CLAIM_QUERY");
      } else if (e.target.closest("#btn-contact-support-claim")) {
        if (this.onActionTrigger) this.onActionTrigger("OPEN_SUPPORT_MODAL");
      }
    });
  }
}
