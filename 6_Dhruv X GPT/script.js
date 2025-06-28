const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

// Fake GPT response generator
function generateGPTResponse(message) {
  const responses = [
    "That's interesting, tell me more!",
    "I see. Can you explain it a bit further?",
    "Great! What's next?",
    "I'm always here to help you.",
    "Sounds good. Would you like to explore more?",
    "That's a cool idea!",
    "Thanks for sharing that!"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

function addMessage(content, type) {
  const message = document.createElement("div");
  message.classList.add("message", `${type}-message`);
  message.innerText = content;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = userInput.value.trim();
  if (msg === "") return;

  addMessage(msg, "user");
  userInput.value = "";

  setTimeout(() => {
    const gptReply = generateGPTResponse(msg);
    addMessage(gptReply, "gpt");
  }, 600);
});
