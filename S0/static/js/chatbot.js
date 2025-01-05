function toggleChat() {
  const chatbot = document.getElementById("chatbot");
  chatbot.style.display = chatbot.style.display === "none" ? "block" : "none";
}

// Add preset responses array
const botResponses = [
  "Nice opinion, too bad it's wrong.",
  "Cry harder, it's music to my ears.",
  "Do you even hear yourself right now?",
  "Imagine thinking this was a good idea to type.",
  "Keep going, you're almost at peak cringe.",
  "You're one message away from being ignored forever.",
  "Tell me you're insecure without telling me you're insecure.",
  "This feels like a skill issue, not my problem.",
  "Get a grip, or better yet, a life.",
  "I'm impressed, you somehow made it worse.",
  "Your existence is an unskippable cutscene.",
  "Say that again, but this time try being clever.",
  "You're the reason they added 'block' buttons.",
  "Send one more emoji, I dare you.",
  "The clown emoji isn’t enough for this conversation.",
  "Bold of you to assume I care.",
  "Your profile pic says everything I need to know.",
  "Thanks for the laugh, unintentional comedy is the best.",
  "You're like a captcha—annoying and unnecessary.",
  "Wow, this is like watching a train wreck in slow motion.",
  "I can’t believe you thought this would land.",
  "Go touch grass and leave me alone.",
  "You must really enjoy embarrassing yourself.",
  "This level of delusion is almost impressive.",
  "Friendly reminder: Nobody asked.",
  "Try harder, you’re not even worth my good insults.",
  "No need to project your insecurities onto me.",
  "Why are you like this? Genuinely curious.",
  "Your takes are so bad they're almost performance art.",
  "If stupidity was a sport, you'd be a gold medalist.",
  "Keep talking, I'm logging all this for my cringe compilation.",
  "Imagine thinking you're the main character right now.",
  "This feels like a waste of pixels.",
];

// Add notification sound element
const messageSound = new Audio("static/audio/droid.mp3");

function sendMessage() {
  const input = document.getElementById("userInput");
  const messages = document.getElementById("chat-messages");

  if (input.value.trim() === "") return;

  // Add user message
  messages.innerHTML += `<div class="user-message">${input.value}</div>`;

  // Get random response with Clippy container
  const randomResponse =
    botResponses[Math.floor(Math.random() * botResponses.length)];
  messages.innerHTML += `
  <div class="bot-message">
    <div class="clippy-container">
      <img src="/static/images/Clippy.png" class="clippy-image" alt="Clippy">
      <span>${randomResponse}</span>
    </div>
  </div>`;

  messageSound.play();
  input.value = "";
  messages.scrollTop = messages.scrollHeight;
}

document.addEventListener("DOMContentLoaded", () => {
  const chatbotDiv = document.getElementById("chatbot");

  const chatHeader = document.createElement("div");
  chatHeader.id = "chat-header";

  const chatHeaderSpan = document.createElement("span");
  chatHeaderSpan.textContent = "Chat Support";

  const chatHeaderButton = document.createElement("button");
  chatHeaderButton.textContent = "×";
  chatHeaderButton.addEventListener("click", toggleChat);
  chatHeaderButton.id = "chatToggleButton";

  chatHeader.appendChild(chatHeaderSpan);
  chatHeader.appendChild(chatHeaderButton);

  const chatMessagesDiv = document.createElement("div");
  chatMessagesDiv.id = "chat-messages";

  const botMessageDiv = document.createElement("div");
  botMessageDiv.className = "bot-message";

  const clippyContainerDiv = document.createElement("div");
  clippyContainerDiv.className = "clippy-container";

  const clippyImage = document.createElement("img");
  clippyImage.src = "/static/images/Clippy.png";
  clippyImage.className = "clippy-image";
  clippyImage.alt = "Clippy";

  const clippySpan = document.createElement("span");
  clippySpan.textContent = "how can i help you today?";

  clippyContainerDiv.appendChild(clippyImage);
  clippyContainerDiv.appendChild(clippySpan);

  botMessageDiv.appendChild(clippyContainerDiv);

  chatMessagesDiv.appendChild(botMessageDiv);

  const chatInputDiv = document.createElement("div");
  chatInputDiv.className = "chat-input";

  const userInput = document.createElement("input");
  userInput.id = "userInput";
  userInput.type = "text";
  userInput.placeholder = "Type a message...";

  // Update event listeners
  userInput.addEventListener("keydown", (e) => {
    e.stopPropagation();
  });

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  const sendButton = document.createElement("button");
  sendButton.textContent = "Send";
  sendButton.addEventListener("click", sendMessage);

  chatInputDiv.appendChild(userInput);
  chatInputDiv.appendChild(sendButton);

  chatbotDiv.appendChild(chatHeader);
  chatbotDiv.appendChild(chatMessagesDiv);
  chatbotDiv.appendChild(chatInputDiv);
});
