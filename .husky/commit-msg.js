#!/usr/bin/env node

import { readFileSync } from "node:fs";
import emojiRegex from "emoji-regex";
import { exec } from "child_process";

// Function to play video using system default video player
function playVideo(videoName) {
  const videoPath = `${process.cwd()}/static/video/${videoName}`;
  const command =
    process.platform === "darwin"
      ? `afplay "${videoPath}"` // macOS built-in audio player
      : process.platform === "win32"
      ? `start /min wmplayer "${videoPath}"` // Windows Media Player minimized
      : `paplay "${videoPath}"`; // PulseAudio on Linux

  return new Promise((resolve) => {
    exec(command, (error) => {
      if (error) {
        // Fallback to just opening with default app
        const fallbackCommand =
          process.platform === "darwin"
            ? `open "${videoPath}"`
            : process.platform === "win32"
            ? `start "${videoPath}"`
            : `xdg-open "${videoPath}"`;

        exec(fallbackCommand, (fallbackError) => {
          if (fallbackError) {
            console.error("Failed to play video:", fallbackError);
          }
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
}

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
  "🚨", // rotating light - critical changes
  "📊", // bar chart - analytics/metrics
  "🔖", // bookmark - version tags
  "🎉", // party popper - major release
  "📱", // mobile phone - mobile features
  "🌐", // globe - internationalization
  "🔗", // link - dependencies/links
  "🏷️", // label - types/interfaces
  "📈", // chart increasing - performance
  "🔀", // shuffle - merge
  "⏪", // rewind - revert
  "🗑️", // wastebasket - deprecation
  "🔁", // repeat - automation
  "📸", // camera - snapshots/testing
  "🎭", // masks - mocking/testing
  "🔌", // electric plug - plugins
  "🧭", // compass - navigation
  "📚", // books - documentation
  "🎪", // circus tent - staging
  "🔐", // locked with key - authentication
];

// Curated list of rizz words
const slangWords = [
  // Original words
  "fanum",
  "ohio",
  "rizz",
  "rizzler",
  "gyatt",
  "ong",

  // Internet/Gaming terms
  "brain rot",
  "skibidi",
  "sigma",
  "sus",
  "noob",
  "yeet",
  "simp",
  "og",

  // Personality/Characteristics
  "mewing",
  "aura",
  "delulu",
  "savage",
  "pookie",
  "chad alpha",
  "chad",
  "alpha",
  "beta",
  "mog",

  // Common expressions
  "bruh",
  "salty",
  "ate",
  "zang",
  "bet",
  "lit",
  "low key",
  "bop",
  "ick",
  "cringe",
  "opp",
  "twin",
  "sheesh",
  "vibe",
  "bussin",
  "glaze",
  "dog water",
  "slay",
  "fam",
  "yapping",
  "yap",

  // Compound terms
  "skibidi ohio rizz",
  "skibidi rizz",
  "what the sigma",
  "fanum tax",
  "negative aura",
  "mad lit",
  "just put the fries in the bag",
  "hits different",

  // Truth/Lie related
  "cap",
  "no cap",

  // Style/Status
  "drip",
  "flex",
  "tea",
  "goat",
  "its giving",
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

// Function to generate example rizz
function generateRizzExamples() {
  const examples = [
    "feat: no cap this update bussin fr fr ✨",
    "fix: bruh moment in the auth service 🐛",
    "docs: fam check this documentation update 📝",
    "style: added more drip to the UI 🎨",
    "refactor: ong cleaned up that spaghetti code ♻️",
  ];

  // Get 5 random slang words
  const shuffled = [...slangWords].sort(() => 0.5 - Math.random());
  const randomSlang = shuffled.slice(0, 5);

  return examples.join("\n") + "\n\nSome rizzy terms you can use:\n" + randomSlang.join(", ");
}

async function checkCommit() {
  // Read the commit message from the file
  const commitMsgFile = process.argv[2];
  const commitMsg = readFileSync(commitMsgFile, "utf8");
  const commitMsgLower = commitMsg.toLowerCase();

  // If our marker is missing, this commit likely used --no-verify
  if (!commitMsg.includes("#[verify:active]")) {
    console.error("\x1b[33m💀 Caught in 4K trying to skip the rizz check with --no-verify\x1b[0m");
    console.error("\x1b[33mFr fr you thought you could escape? That's kinda mid ngl\x1b[0m");
    await playVideo("no_rizz.mp4");
    // We could optionally fail the commit here if we want to be strict
    // process.exit(1);
  }

  // Check both conditions
  const hasEmoji = emojiRegex().test(commitMsg);
  const hasRizz = slangWords.some((word) => commitMsgLower.includes(word.toLowerCase()));

  let failed = false;

  // Check rizz first
  if (!hasRizz) {
    console.error("\x1b[31mError: Commit message has no rizz! 💀\x1b[0m");
    console.error("\nExample rizzy commits that would pass:\n");
    console.error(generateRizzExamples());
    console.error("\nMake it more rizzy and try again fr fr no cap");
    await playVideo("no_rizz.mp4");
    failed = true;
  }

  // Then check emoji
  if (!hasEmoji) {
    console.error("\x1b[31mError: Commit message must include at least one emoji! 🚫\x1b[0m");
    console.error(generateEmojiSquare());
    console.error("Example commit messages:");
    console.error(`❌ Fail: 'Add new feature'`);
    console.error(`✅ Pass: '✨ Add new feature'`);
    console.error("More examples:");
    console.error("✅ Pass: '🐛 Fix bug in login'");
    console.error("✅ Pass: '🎨 Update styles'");
    await playVideo("ganondorf_laugh.mp4");
    failed = true;
  }

  if (failed) {
    process.exit(1);
  }

  console.log("\x1b[32m✨ Sheesh! That commit message bussin fr fr\x1b[0m");
  await playVideo("wombo_combo.mp4");
  process.exit(0);
}

checkCommit().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});

