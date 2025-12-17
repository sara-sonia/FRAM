console.log("CHAT WIDGET JS LOADED");

document.addEventListener("DOMContentLoaded", () => {
  let chatContainer = document.getElementById("chat-container");
  if (!chatContainer) {
    chatContainer = document.createElement("div");
    chatContainer.id = "chat-container";
    document.body.appendChild(chatContainer);
  }

  chatContainer.innerHTML = `
    <div class="chat-frame" id="chat-frame" role="dialog" aria-label="FRAM chat widget" style="display:none;">
      <div class="chat-inner">
        <button class="close-chat" aria-label="Close chat">✕</button>
        <div class="conversation" id="conversation">
          <div id="messages" aria-live="polite">
            <div class="system-row">
              <div class="fram-label">FRAM</div>
              <div class="system-bubble">What can I help you with today?</div>
            </div>
          </div>
          <div id="disconnected" class="disconnected" style="display:none;">
            Failed to connect. Wait and try again later.
          </div>
        </div>
        <div class="input-row">
          <textarea id="input" class="input-field" rows="1" placeholder="Type your message..." aria-label="Message input"></textarea>
          <button id="sendBtn" class="send-btn">
            <span id="sendIcon">↑</span>
          </button>
        </div>
      </div>
    </div>
  `;

  const chatFrame = chatContainer.querySelector(".chat-frame");
  const inputEl = chatContainer.querySelector("#input");
  const sendBtn = chatContainer.querySelector("#sendBtn");
  const sendIcon = chatContainer.querySelector("#sendIcon");
  const messagesEl = chatContainer.querySelector("#messages");
  const disconnectedEl = chatContainer.querySelector("#disconnected");
  const conversationEl = chatContainer.querySelector(".conversation");
  const closeBtn = chatContainer.querySelector(".close-chat");
  const chatTriggerLinks = document.querySelectorAll(".chat-link");

  let isLoading = false;

  // -----------------------------
  // Accessibility: Trigger links
  // -----------------------------
  chatTriggerLinks.forEach(link => {
    if (!link.hasAttribute("tabindex")) link.setAttribute("tabindex", "0");

    link.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openChat();
      }
    });
  });

  function openChat() {
    chatFrame.style.display = "block";
    inputEl.focus();
  }

  // Close chat via close button
  closeBtn.addEventListener("click", () => {
    closeChat();
  });

  // Close chat via Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && chatFrame.style.display === "block") {
      closeChat();
    }
  });

  function closeChat() {
    chatFrame.style.display = "none";
    // Return focus to first chat trigger link
    chatTriggerLinks[0]?.focus();
  }

  // Open chat via click
  document.addEventListener("click", (e) => {
    if (e.target.closest(".chat-link")) {
      e.preventDefault();
      openChat();
    }
  });

  // -----------------------------
  // Message handling
  // -----------------------------
  function scrollToBottom() {
    conversationEl.scrollTop = conversationEl.scrollHeight;
  }

  function createFramMessage(content) {
    const row = document.createElement("div");
    row.className = "system-row";
    const label = document.createElement("div");
    label.className = "fram-label";
    label.textContent = "FRAM";
    const bubble = document.createElement("div");
    bubble.className = "system-bubble";
    if (typeof content === "string") bubble.textContent = content;
    else bubble.appendChild(content);
    row.append(label, bubble);
    return row;
  }

  function appendCustomerMessage(text) {
    const el = document.createElement("div");
    el.className = "customer-bubble";
    el.textContent = text;
    messagesEl.appendChild(el);
    scrollToBottom();
  }

  function appendBotMessage(node) {
    messagesEl.appendChild(node);
    scrollToBottom();
  }

  function setLoading(on) {
    isLoading = on;
    if (on) {
      sendIcon.textContent = "✕";
      const dots = document.createElement("div");
      dots.className = "dots";
      dots.textContent = "● ● ●";
      const loaderRow = createFramMessage(dots);
      loaderRow.id = "loaderBubble";
      appendBotMessage(loaderRow);
      inputEl.disabled = true;
      sendBtn.disabled = true;
    } else {
      sendIcon.textContent = "↑";
      document.getElementById("loaderBubble")?.remove();
      inputEl.disabled = false;
      sendBtn.disabled = false;
      inputEl.focus();
    }
  }

  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text || isLoading) return;

    appendCustomerMessage(text);
    inputEl.value = "";
    setLoading(true);
    disconnectedEl.style.display = "none";

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      if (!res.ok) throw new Error("Server error");

      const { reply } = await res.json();
      const botRow = createFramMessage(reply || "No response");
      appendBotMessage(botRow);
    } catch (err) {
      console.error(err);
      disconnectedEl.style.display = "flex";
    } finally {
      setLoading(false);
    }
  }

  sendBtn.addEventListener("click", sendMessage);

  inputEl.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  console.log("Chat widget initialized ✅");
});
