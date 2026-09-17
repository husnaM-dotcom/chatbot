const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    const message = messageInput.value.trim();

    if (!message) {
        return;
    }

    addMessage(message, "user");
    messageInput.value = "";
    showTyping();

    const response = await fetch(`/chat?message=${encodeURIComponent(message)}`, {
        method: "POST"
    });

    const data = await response.json();

    await new Promise(resolve => setTimeout(resolve, 1000));

    document.getElementById("typing").remove();

    addMessage(data.reply, "ai");
}

function addMessage(text, sender) {
    const message = document.createElement("div");
    message.classList.add("message");

    if (sender === "user") {
        message.classList.add("user-message");
    } else {
        message.classList.add("ai-message");
    }

    const content = document.createElement("div");
    content.classList.add("message-content");

    const bubble = document.createElement("div");
    bubble.classList.add("message-bubble");
    bubble.textContent = text;

    const time = document.createElement("span");
    time.classList.add("message-time");

    time.textContent = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    content.appendChild(bubble);
    content.appendChild(time);

    if (sender === "ai") {
        const icon = document.createElement("div");
        icon.classList.add("ai-icon");
        icon.textContent = "✧";

        message.appendChild(icon);
    }

    message.appendChild(content);

    chatBox.appendChild(message);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
    const typing = document.createElement("div");
    typing.id = "typing";
    typing.classList.add("message", "ai-message");

    typing.innerHTML = `
        <div class="ai-icon">✧</div>
        <div class="message-content">
            <div class="message-bubble">
                AI is typing...
            </div>
        </div>
    `;

    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
}