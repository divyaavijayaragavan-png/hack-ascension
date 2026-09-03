/**
 * InsureAssist AI - Insurance Process Guide UI Controller
 * Interactive explorer for Applying for Insurance, Filing a Claim, and Renewing Insurance.
 */

export class ProcessGuideView {
  constructor(containerEl, onStepClick) {
    this.containerEl = containerEl;
    this.onStepClick = onStepClick;
    this.activeTab = "applying"; // 'applying', 'claiming', 'renewing'

    this.render();
    this._bindEvents();
  }

  render() {
    if (!this.containerEl) return;

    this.containerEl.innerHTML = `
      <div class="card" style="padding: 2rem;">
        <div style="margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--secondary); margin-bottom: 0.35rem;">
            Interactive Insurance Journey Guide
          </h2>
          <p style="font-size: 0.95rem; color: var(--text-secondary);">
            Clear, step-by-step pathways for applying, filing claims, and policy renewals.
          </p>
        </div>

        <!-- Guide Tab Buttons -->
        <div class="guide-tabs">
          <button class="guide-tab-btn ${this.activeTab === 'applying' ? 'active' : ''}" data-tab="applying">
            Applying for Insurance
          </button>
          <button class="guide-tab-btn ${this.activeTab === 'claiming' ? 'active' : ''}" data-tab="claiming">
            Filing a Claim
          </button>
          <button class="guide-tab-btn ${this.activeTab === 'renewing' ? 'active' : ''}" data-tab="renewing">
            Renewing Insurance
          </button>
        </div>

        <!-- Guide Content Panels -->
        <div class="guide-content-panel ${this.activeTab === 'applying' ? 'active' : ''}" id="panel-applying">
          <div class="guide-steps-flow">
            <div class="guide-step-card">
              <div class="guide-step-number">1</div>
              <div class="guide-step-body">
                <h4>Choose Plan</h4>
                <p>Select between an individual cover, family floater, or critical illness plan depending on your family's needs and age profile.</p>
              </div>
            </div>

            <div class="guide-step-card">
              <div class="guide-step-number">2</div>
              <div class="guide-step-body">
                <h4>Submit Application</h4>
                <p>Complete the proposal form with truthful declarations of existing medical conditions, smoking/drinking habits, and past surgeries.</p>
              </div>
            </div>

            <div class="guide-step-card">
              <div class="guide-step-number">3</div>
              <div class="guide-step-body">
                <h4>Submit Documents</h4>
                <p>Provide KYC documents including government-issued photo identity proof, address proof, age proof, and previous policy records if porting.</p>
              </div>
            </div>

            <div class="guide-step-card">
              <div class="guide-step-number">4</div>
              <div class="guide-step-body">
                <h4>Medical Assessment (If Required)</h4>
                <p>Undergo pre-policy medical checkup or tele-underwriting consultation if necessitated by age or declared medical history.</p>
              </div>
            </div>

            <div class="guide-step-card">
              <div class="guide-step-number">5</div>
              <div class="guide-step-body">
                <h4>Underwriting Evaluation</h4>
                <p>The insurance underwriting panel reviews health risks and issues coverage terms, applicable waiting periods, or premium loadings.</p>
              </div>
            </div>

            <div class="guide-step-card">
              <div class="guide-step-number">6</div>
              <div class="guide-step-body">
                <h4>Premium Payment</h4>
                <p>Pay the initial annual or installment premium via secure online payment or bank authorization.</p>
              </div>
            </div>

            <div class="guide-step-card">
              <div class="guide-step-number">7</div>
              <div class="guide-step-body">
                <h4>Policy Issued</h4>
                <p>Receive your formal policy certificate, digital health card, and schedule of benefits with a 15–30 day free-look inspection period.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="guide-content-panel ${this.activeTab === 'claiming' ? 'active' : ''}" id="panel-claiming">
          <div class="guide-steps-flow">
            <div class="guide-step-card">
              <div class="guide-step-number">1</div>
              <div class="guide-step-body">
                <h4>Notify Insurer</h4>
                <p>Alert the insurer/TPA within 24 hours of emergency hospital admission or 48–72 hours prior to scheduled surgery.</p>
              </div>
            </div>

            <div class="guide-step-card">
              <div class="guide-step-number">2</div>
              <div class="guide-step-body">
                <h4>Receive Treatment</h4>
                <p>Undergo in-patient hospitalization or day-care medical procedure under qualified doctor care.</p>
              </div>
            </div>

            <div class="guide-step-card">
              <div class="guide-step-number">3</div>
              <div class="guide-step-body">
                <h4>Submit Claim</h4>
                <p>At network hospital: TPA desk submits pre-auth. At non-network hospital: Pay upfront and lodge a reimbursement claim.</p>
              </div>
            </div>

            <div class="guide-step-card">
              <div class="guide-step-number">4</div>
              <div class="guide-step-body">
                <h4>Submit Documents</h4>
                <p>Provide signed Claim Form Part A & B, detailed discharge summary, itemized final bill, receipts, pharmacy memos, and lab reports.</p>
              </div>
            </div>

            <div class="guide-step-card">
              <div class="guide-step-number">5</div>
              <div class="guide-step-body">
                <h4>Verification</h4>
                <p>TPA claims examiners check doctor accreditation, hospital registration, and authenticate all submitted billing receipts.</p>
              </div>
            </div>

            <div class="guide-step-card">
              <div class="guide-step-number">6</div>
              <div class="guide-step-body">
                <h4>Assessment</h4>
                <p>Medical claims adjudicators assess medical necessity, policy coverage clauses, deductible/co-pay limits, and admissible charges.</p>
              </div>
            </div>

            <div class="guide-step-card">
              <div class="guide-step-number">7</div>
              <div class="guide-step-body">
                <h4>Settlement</h4>
                <p>Approved funds are disbursed directly to the hospital (cashless) or deposited into the policyholder's bank account (reimbursement).</p>
              </div>
            </div>
          </div>
        </div>

        <div class="guide-content-panel ${this.activeTab === 'renewing' ? 'active' : ''}" id="panel-renewing">
          <div class="guide-steps-flow">
            <div class="guide-step-card">
              <div class="guide-step-number">1</div>
              <div class="guide-step-body">
                <h4>Check Renewal Date</h4>
                <p>Review your policy expiration schedule and renewal notice (issued 30 to 45 days prior to expiration).</p>
              </div>
            </div>

            <div class="guide-step-card">
              <div class="guide-step-number">2</div>
              <div class="guide-step-body">
                <h4>Review Policy & Add-ons</h4>
                <p>Assess whether your healthcare needs changed (e.g. adding newborn child, spouse, or critical illness riders).</p>
              </div>
            </div>

            <div class="guide-step-card">
              <div class="guide-step-number">3</div>
              <div class="guide-step-body">
                <h4>Check Coverage & Cumulative Bonus</h4>
                <p>Confirm accumulated No-Claim Bonus (NCB) increase to your base sum insured for maintaining a claim-free year.</p>
              </div>
            </div>

            <div class="guide-step-card">
              <div class="guide-step-number">4</div>
              <div class="guide-step-body">
                <h4>Pay Renewal Premium</h4>
                <p>Pay the renewal premium before due date (or within the 15–30 day grace period) to protect continuous waiting period credits.</p>
              </div>
            </div>

            <div class="guide-step-card">
              <div class="guide-step-number">5</div>
              <div class="guide-step-body">
                <h4>Receive Renewed Policy</h4>
                <p>Download your updated policy certificate, updated health cards, and premium receipt for tax deduction purposes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _bindEvents() {
    this.containerEl.addEventListener("click", (e) => {
      const tabBtn = e.target.closest(".guide-tab-btn");
      if (tabBtn) {
        const tab = tabBtn.getAttribute("data-tab");
        if (tab && tab !== this.activeTab) {
          this.activeTab = tab;
          this.render();
        }
      }
    });
  }
}
