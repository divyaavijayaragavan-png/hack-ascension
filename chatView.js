/**
 * InsureAssist AI - Chat View Controller
 * Manages chat message streams, tool execution badges, suggestion chips, and autoscroll
 */

export class ChatView {
  constructor(containerEl, onSuggestionClick, onEscalateClick) {
    this.containerEl = containerEl;
    this.messagesListEl = containerEl.querySelector("#chat-messages");
    this.inputEl = containerEl.querySelector("#chat-input");
    this.sendBtnEl = containerEl.querySelector("#chat-send-btn");
    this.onSuggestionClick = onSuggestionClick;
    this.onEscalateClick = onEscalateClick;
    this.activeToolBadgeEl = null;

    this._bindEvents();
  }

  _bindEvents() {
    // Delegate click for suggestion chips and escalation buttons in message area
    this.messagesListEl.addEventListener("click", (e) => {
      const chip = e.target.closest(".suggestion-chip-btn");
      if (chip) {
        const query = chip.getAttribute("data-query");
        if (query && this.onSuggestionClick) {
          this.onSuggestionClick(query);
        }
        return;
      }

      if (e.target.closest("#btn-escalate-coverage") || e.target.closest("#btn-escalate-unknown")) {
        if (this.onEscalateClick) {
          this.onEscalateClick();
        }
        return;
      }

      const copyBtn = e.target.closest(".copy-phone-btn");
      if (copyBtn) {
        const phone = copyBtn.getAttribute("data-phone");
        if (phone) {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(phone).then(() => {
              const orig = copyBtn.innerHTML;
              copyBtn.classList.add("copied");
              copyBtn.innerHTML = "✓ Copied!";
              setTimeout(() => {
                copyBtn.classList.remove("copied");
                copyBtn.innerHTML = orig;
              }, 2000);
            }).catch(() => {
              copyBtn.innerHTML = "✓ " + phone;
            });
          } else {
            copyBtn.innerHTML = "✓ " + phone;
          }
        }
      }
    });
  }

  /**
   * Append a user message bubble
   */
  appendUserMessage(text) {
    const row = document.createElement("div");
    row.className = "message-row user";
    row.innerHTML = `
      <div class="message-avatar">AJ</div>
      <div class="message-bubble">
        <p>${this._escapeHtml(text)}</p>
      </div>
    `;
    this.messagesListEl.appendChild(row);
    this.scrollToBottom();
  }

  /**
   * Show typing indicator
   */
  showTypingIndicator() {
    this.removeTypingIndicator();
    const row = document.createElement("div");
    row.className = "message-row assistant typing-row";
    row.innerHTML = `
      <div class="message-avatar">AI</div>
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    this.messagesListEl.appendChild(row);
    this.scrollToBottom();
  }

  /**
   * Remove typing indicator
   */
  removeTypingIndicator() {
    const existing = this.messagesListEl.querySelector(".typing-row");
    if (existing) existing.remove();
  }

  /**
   * Render or update an active tool execution badge
   */
  updateToolExecution({ toolName, status, message }) {
    this.removeTypingIndicator();

    if (!this.activeToolBadgeEl) {
      const row = document.createElement("div");
      row.className = "message-row assistant tool-execution-row";
      row.innerHTML = `
        <div class="message-avatar">⚙️</div>
        <div style="display:flex; flex-direction:column;">
          <div class="tool-execution-badge ${status}">
            ${status === 'running' ? '<div class="tool-spinner"></div>' : '<span>✓</span>'}
            <span class="tool-message-text">${message}</span>
          </div>
        </div>
      `;
      this.messagesListEl.appendChild(row);
      this.activeToolBadgeEl = row;
    } else {
      const badge = this.activeToolBadgeEl.querySelector(".tool-execution-badge");
      if (badge) {
        badge.className = `tool-execution-badge ${status}`;
        badge.innerHTML = `
          ${status === 'running' ? '<div class="tool-spinner"></div>' : '<span>✓</span>'}
          <span class="tool-message-text">${message}</span>
        `;
      }
    }
    this.scrollToBottom();
  }

  /**
   * Append full AI assistant message with structured content and suggestions
   */
  appendAssistantMessage({ text, suggestions = [], toolBadgeMessage = null }) {
    this.removeTypingIndicator();
    this.activeToolBadgeEl = null; // reset tool row tracker

    const row = document.createElement("div");
    row.className = "message-row assistant";

    let suggestionsHtml = "";
    if (suggestions && suggestions.length > 0) {
      const chips = suggestions.map(q => `
        <button class="suggestion-chip-btn" data-query="${this._escapeHtml(q)}">
          ${this._escapeHtml(q)}
        </button>
      `).join("");

      suggestionsHtml = `
        <div class="message-suggestions">
          <div class="suggestions-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Suggested Follow-up Questions:
          </div>
          <div class="suggestions-chips">
            ${chips}
          </div>
        </div>
      `;
    }

    row.innerHTML = `
      <div class="message-avatar">AI</div>
      <div class="message-bubble">
        ${text}
        ${suggestionsHtml}
      </div>
    `;

    this.messagesListEl.appendChild(row);
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messagesListEl.scrollTop = this.messagesListEl.scrollHeight;
    }, 50);
  }

  _escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}
