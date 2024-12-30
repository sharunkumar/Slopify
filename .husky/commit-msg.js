#!/usr/bin/env node

import { readFileSync } from "node:fs";
import emojiRegex from "emoji-regex";

// Curated list of developer-friendly emojis
const devEmojis = [
  "✨", // sparkles - new feature
  "🚀", // rocket - deployment/performance
  "🧱", // brick - infrastructure
  "🌱", // seedling - initial commit
  "🐛", // bug - bug fix
  "🔧", // wrench - configuration
  "🎨", // art - styling/UI
  "♻️", // recycle - refactor
  "🔥", // fire - remove code/files
  "📦", // package - dependencies
  "🔒", // lock - security
  "📝", // memo - docs
  "🧪", // test tube - testing
  "⚡️", // zap - improvement
  "🔍", // magnifying glass - search
  "💡", // bulb - idea/solution
  "🏗️", // construction - WIP
  "🎯", // target - goals/focus
  "🛠️", // tools - development tools
  "🧹", // broom - cleanup
];

// Function to generate emoji square
function generateEmojiSquare(size = 5) {
  const selectedEmojis = [];
  for (let i = 0; i < size * size; i++) {
    const randomIndex = Math.floor(Math.random() * devEmojis.length);
    selectedEmojis.push(devEmojis[randomIndex]);
  }

  let square = "\nPick an emoji for your commit:\n\n";
  for (let i = 0; i < size; i++) {
    const row = selectedEmojis.slice(i * size, (i + 1) * size).join(" ");
    square += row + "\n";
  }
  return square;
}

// Read the commit message from the file
const commitMsgFile = process.argv[2];
const commitMsg = readFileSync(commitMsgFile, "utf8");

// Use the emoji-regex package for more accurate emoji detection
const regex = emojiRegex();

if (!regex.test(commitMsg)) {
  console.error("\x1b[31mError: Commit message must include at least one emoji! 🚫\x1b[0m");
  console.error(generateEmojiSquare());
  console.error("Example commit messages:");
  console.error("✨ Add new feature");
  console.error("🐛 Fix bug in login");
  console.error("🎨 Update styles");
  process.exit(1);
}

process.exit(0);

