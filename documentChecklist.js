/**
 * InsureAssist AI - Interactive Document Checklist Controller
 * Allows checking/unchecking documents, live calculates % readiness, and explains why each document is required.
 */

import { KNOWLEDGE_BASE } from "../data/knowledgeBase.js";

export class DocumentChecklistView {
  constructor(containerEl, onChecklistChange) {
    this.containerEl = containerEl;
    this.onChecklistChange = onChecklistChange;
    // Clone claim documents state so it is interactive
    this.documents = JSON.parse(JSON.stringify(KNOWLEDGE_BASE.documents.claim));
    this.activeTab = "claim"; // 'claim' or 'application'

    this.render();
    this._bindEvents();
  }

  render() {
    if (!this.containerEl) return;

    const total = this.documents.length;
    const preparedCount = this.documents.filter(d => d.prepared).length;
    const percentage = Math.round((preparedCount / total) * 100);

    const docItemsHtml = this.documents.map((doc) => {
      const isChecked = doc.prepared;
      return `
        <div class="checklist-item ${isChecked ? 'checked' : ''}" data-id="${doc.id}">
          <div class="checklist-checkbox">
            ${isChecked ? '✓' : ''}
          </div>
          <div class="checklist-content">
            <div class="checklist-title-row">
              <span class="checklist-title">${doc.name}</span>
              <span class="status-badge ${isChecked ? 'verified' : 'pending'}" style="font-size:0.68rem;">
                ${isChecked ? 'Prepared' : 'Required'}
              </span>
            </div>
            <p class="checklist-desc">${doc.purpose}</p>
            <span class="checklist-reason">
              <strong>Why required:</strong> ${doc.whyRequired}
            </span>
          </div>
        </div>
      `;
    }).join("");

    this.containerEl.innerHTML = `
      <div class="doc-checklist-card">
        <div class="doc-header-block">
          <div>
            <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--secondary); margin-bottom: 0.25rem;">
              Document Readiness Checklist
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">
              Review and mark items as prepared for Claim #CLM-10245 or reimbursement dossier.
            </p>
          </div>
          <div class="doc-stats-badge">
            <span class="doc-stat-count" id="doc-counter">${preparedCount} / ${total} documents prepared</span>
            <span style="color:var(--text-light);">•</span>
            <span class="doc-stat-pct" id="doc-pct">${percentage}% Ready</span>
          </div>
        </div>

        <!-- Mandatory Disclaimer -->
        <div class="doc-disclaimer-banner">
          <span style="font-size: 1.1rem; flex-shrink:0;">⚠️</span>
          <div>
            <strong>Important Regulatory Notice:</strong>
            ${KNOWLEDGE_BASE.documents.disclaimer}
          </div>
        </div>

        <!-- Interactive Checklist Items Grid -->
        <div class="checklist-items-grid">
          ${docItemsHtml}
        </div>

        <div style="margin-top: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
          <div style="font-size: 0.82rem; color: var(--text-muted);">
            Click on any item to toggle prepared status.
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-outline btn-sm" id="btn-mark-all-docs">Mark All Prepared</button>
            <button class="btn btn-primary btn-sm" id="btn-ask-ai-docs">Ask AI About Missing Docs</button>
          </div>
        </div>
      </div>
    `;
  }

  _bindEvents() {
    this.containerEl.addEventListener("click", (e) => {
      const itemEl = e.target.closest(".checklist-item");
      if (itemEl && !e.target.closest("button")) {
        const docId = itemEl.getAttribute("data-id");
        this.toggleItem(docId);
        return;
      }

      if (e.target.closest("#btn-mark-all-docs")) {
        this.markAllPrepared();
      } else if (e.target.closest("#btn-ask-ai-docs")) {
        if (this.onChecklistChange) {
          this.onChecklistChange("ASK_AI_MISSING");
        }
      }
    });
  }

  toggleItem(docId) {
    const doc = this.documents.find(d => d.id === docId);
    if (doc) {
      doc.prepared = !doc.prepared;
      this.render();
      if (this.onChecklistChange) {
        this.onChecklistChange("STATUS_UPDATED", {
          docId,
          prepared: doc.prepared,
          stats: this.getStats()
        });
      }
    }
  }

  markAllPrepared() {
    this.documents.forEach(d => d.prepared = true);
    this.render();
    if (this.onChecklistChange) {
      this.onChecklistChange("ALL_PREPARED", { stats: this.getStats() });
    }
  }

  getStats() {
    const total = this.documents.length;
    const preparedCount = this.documents.filter(d => d.prepared).length;
    return {
      total,
      preparedCount,
      percentage: Math.round((preparedCount / total) * 100)
    };
  }
}
