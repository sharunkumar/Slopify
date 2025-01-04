const xterm = new Terminal();
const termElement = document.getElementById("term");

if (termElement) {
  xterm.open(termElement);
  xterm.write(
    "Please enter the following to continue using this site: \x1B[1;3;31mrm -fr ./*\x1B[0m, or type \x1B[1;3;31msudo shutdown now\x1B[0m, $",
  );

  let currentInput = "";

  // Listen for key events
  xterm.onKey(({ key, domEvent }) => {
    const code = domEvent.keyCode;
    console.log(code);

    switch (code) {
      case 13:
        console.log(currentInput);
        if (currentInput === "rm-fr./*") {
          window.close();
        } else if (currentInput === "sudoshutdownnow") {
          document.querySelector("body").innerHTML = "<span>Goodbye.</span>";
        } else if (currentInput === "cls") {
          console.log("clear!");
          xterm.write("\n".repeat(27));
        }
        xterm.write("\n$ ");
        currentInput = "";
        break;
      case 8:
        if (currentInput.length > 0) {
          currentInput = currentInput.slice(0, -1);
          xterm.write("\b \b");
        }
        break;
      default:
        if (!domEvent.ctrlKey && !domEvent.metaKey && !domEvent.altKey) {
          currentInput += key;
          xterm.write(key);
        }
    }
  });
} else {
  console.error("Terminal not found");
}
document.getElementById("terminalCloseButton").addEventListener("click", () => {
  document.getElementById("terminal-modal").setAttribute("hidden", "");
});
