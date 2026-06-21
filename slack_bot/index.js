require("dotenv").config({ path: __dirname + '/.env' });
const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// Command: /ask-groq
app.command("/ask-groq", async ({ command, ack, respond }) => {
  await ack();

  const prompt = command.text;
  if (!prompt) {
    await respond({ text: "Please provide a prompt! Example: `/ask-groq What is the capital of France?`" });
    return;
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192", // Using a fast/versatile model
        messages: [
          { role: "system", content: "You are a helpful, concise AI Slack bot." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    await respond({ text: `*Prompt:* ${prompt}\n\n*Response:* ${reply}` });
  } catch (err) {
    console.error("Error communicating with Groq API:", err.response ? err.response.data : err.message);
    await respond({ text: "Sorry, I encountered an error communicating with the Groq API." });
  }
});

// Command: /bot-status
app.command("/bot-status", async ({ ack, respond }) => {
  await ack();
  const uptime = process.uptime();
  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
  };

  await respond({
    text: `🤖 *Bot Status*\n\n✅ *Status:* Online and operational\n⏱️ *Uptime:* ${formatUptime(uptime)}\n💻 *Environment:* Node.js on Hack Club Nest (24/7)\n🧠 *Brain:* Groq Llama 3`,
  });
});

// Command: /bot-help
app.command("/bot-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `🛠️ *Available Commands*\n\n` +
      `• \`/ask-groq [prompt]\` - Ask the Groq AI a question or give it a prompt to generate text.\n` +
      `• \`/bot-status\` - Check if the bot is alive, its uptime, and runtime stats.\n` +
      `• \`/bot-help\` - Show this help message.`,
  });
});

(async () => {
  try {
    await app.start();
    console.log("⚡️ Slack bot is running!");
  } catch (error) {
    console.error("Failed to start bot:", error);
  }
})();
