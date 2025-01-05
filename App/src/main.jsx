import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";

const update = await check();
if (update) {
  console.log(
    `found udpate ${update.version} from ${update.date} with notes ${update.body}`,
  );
  let downloaded = 0;
  let contentLength = 0;

  await update.downloadAndInstall((event) => {
    switch (event.event) {
      case "Started":
        contentLength = event.data.contentLength;
        console.log(`started downloading ${event.data.contentLength} bytes`);
        break;
      case "Progress":
        downloaded += event.data.chunkLength;
        console.log(`downloaded ${downloaded} from ${contentLength}`);
        break;
      case "Finished":
        console.log("download finished");
        break;
    }
  });

  console.log("update installed");
  await relaunch();
} else {
  console.log("no updates available");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
