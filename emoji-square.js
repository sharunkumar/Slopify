#!/usr/bin/env node

import { readFileSync } from "node:fs";

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
  "🚧", // construction - WIP
  "📊", // chart - analytics
  "🔌", // plug - plugins
  "🧩", // puzzle - solving
  "🎮", // game - fun stuff
];

// Define square size
const size = 5;
const totalEmojis = size * size;

// Get random emojis for the square
const selectedEmojis = [];
for (let i = 0; i < totalEmojis; i++) {
  const randomIndex = Math.floor(Math.random() * devEmojis.length);
  selectedEmojis.push(devEmojis[randomIndex]);
}

// Print the square
console.log("\nDev Emoji Square (5x5):\n");
for (let i = 0; i < size; i++) {
  const row = selectedEmojis.slice(i * size, (i + 1) * size).join(" ");
  console.log(row);
}
console.log("\n");

