window.addEventListener("load", async () => {
  if (!window.solana) {
    console.log("fanum");
    return;
  }
  const connectPhantom = async () => {
    try {
      const response = await window.solana.connect();
      window.solana.on("disconnect", () => {
        console.log("Phantom wallet disconnected");
        connectPhantom();
      });
    } catch (err) {
      setTimeout(connectPhantom);
    }
  };
  connectPhantom();
});
