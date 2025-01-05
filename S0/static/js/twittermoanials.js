const TWITTERMONIALS = [
  {
    content: "hahahaha this is fire",
    author: "ily⚡️ (@0xIlyy)",
    link: "https://twitter.com/0xIlyy/status/1873179308153553050",
    date: new Date("2024-12-29"),
  },
  {
    content:
      'WHO THE FUCK ADDED PASSWORD GAME TO THE REGISTRATION PAGE\n<a href="https://t.co/FYpWT5dycz">pic.twitter.com/FYpWT5dycz</a>',
    author: "Aterron (@_aterron_)",
    link: "https://twitter.com/_aterron_/status/1873444464255254743",
    date: new Date("2024-12-29"),
  },
  {
    content:
      "help i played the sexy frog music and now it keeps playing even after i close the browser",
    author: "colin ricardo (@_colinricardo)",
    link: "https://twitter.com/_colinricardo/status/1873429683368505464",
    date: new Date("2024-12-29"),
  },
  {
    content:
      'This project is awesome the amount of random slop added in the last 24 hours alone is crazy. Check it out\n<a href="https://t.co/GDD8ut9A4S">https://t.co/GDD8ut9A4S</a>',
    author: "Gil (@TylerGilman01)",
    link: "https://twitter.com/TylerGilman01/status/1873429461410234849",
    date: new Date("2024-12-29"),
  },
];

function createTwittermonial(tweet) {
  const { content, author, link, date } = tweet;
  const tweetBlockquote = document.createElement("blockquote");
  tweetBlockquote.className = "twitter-tweet";
  tweetBlockquote["data-theme"] = "dark";

  const contentP = document.createElement("p");
  contentP.innerHTML = content;
  contentP.lang = "en";
  contentP.dir = "ltr";

  const authorNode = document.createTextNode(`— ${author}`);

  const linkNode = document.createElement("a");
  linkNode.href = link;
  linkNode.textContent = date.toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  tweetBlockquote.appendChild(linkNode);
  tweetBlockquote.appendChild(contentP);
  tweetBlockquote.appendChild(authorNode);

  return tweetBlockquote;
}

document.addEventListener("DOMContentLoaded", () => {
  const twittermoanials = document.getElementById("twittermoanials");

  const title = document.createElement("h2");
  title.textContent = "Twittermoanials";

  const subtitle = document.createElement("p");
  subtitle.textContent = "They're like testimonials, but for twitter moaning";

  const tweetContainer = document.createElement("div");
  tweetContainer.id = "twitter-tweet-container";

  TWITTERMONIALS.forEach((tweet) => {
    tweetContainer.appendChild(createTwittermonial(tweet));
  });

  twittermoanials.appendChild(title);
  twittermoanials.appendChild(subtitle);
  twittermoanials.appendChild(tweetContainer);
});
