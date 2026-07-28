const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const statusBadge = document.getElementById("status-badge");

const sessionId = crypto.randomUUID();
let isSending = false;

function appendMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerHTML = `<div class="bubble">${escapeHtml(text)}</div>`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  return div;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function showTyping() {
  const div = document.createElement("div");
  div.className = "message bot typing";
  div.id = "typing-indicator";
  div.innerHTML = '<div class="bubble">ChatBuddy is typing...</div>';
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTyping() {
  document.getElementById("typing-indicator")?.remove();
}

async function sendMessage(message) {
  if (isSending || !message.trim()) return;

  isSending = true;
  sendBtn.disabled = true;
  userInput.disabled = true;

  appendMessage(message, "user");
  userInput.value = "";
  showTyping();

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, sessionId }),
    });

    hideTyping();

    if (!res.ok) {
      appendMessage("Sorry, try again.", "bot");
      return;
    }

    const data = await res.json();
    appendMessage(data.reply, "bot");
  } catch {
    hideTyping();
    appendMessage("Can't reach the server right now.", "bot");
  } finally {
    isSending = false;
    sendBtn.disabled = false;
    userInput.disabled = false;
    userInput.focus();
  }
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage(userInput.value);
});

fetch("/api/health")
  .then(() => {
    statusBadge.textContent = "Online";
    statusBadge.className = "status-badge online";
  })
  .catch(() => {
    statusBadge.textContent = "Offline";
    statusBadge.className = "status-badge offline";
  });

userInput.focus();
