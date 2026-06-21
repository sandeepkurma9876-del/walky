# Hack Club Slack Bot

A fully functional Slack bot using `@slack/bolt` and Groq AI, built for the Hack Club Stardance mission.

## Features

- `/ask-groq [prompt]` - Ask the Groq AI a question or give it a prompt to generate text.
- `/bot-status` - Check if the bot is alive, its uptime, and runtime stats.
- `/bot-help` - Show the help message and available commands.

## Setup Instructions

1. Clone the repository to your local machine or Hack Club Nest server.
2. Run `npm install` in the `slack_bot` directory to install dependencies.
3. Create a `.env` file in the `slack_bot` directory with the following variables:
   - `SLACK_BOT_TOKEN=xoxb-your-bot-token`
   - `SLACK_APP_TOKEN=xapp-your-app-token`
   - `GROQ_API_KEY=your-groq-api-key`
4. Make sure Socket Mode is enabled for your app in the Slack App settings.

## Running on Hack Club Nest 24/7

1. Copy the contents of the `slackbot.service` file to `~/.config/systemd/user/slackbot.service` on your Nest server.
2. Update the `<your-user>` and `<your-repo>` placeholders in the service file to match your environment.
3. Enable and start the service:
   ```bash
   systemctl --user enable slackbot.service
   systemctl --user start slackbot.service
   ```
4. Check the logs with:
   ```bash
   journalctl --user -u slackbot.service
   ```
