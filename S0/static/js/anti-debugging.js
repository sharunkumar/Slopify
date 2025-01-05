if (location.host === "slopify.dev") {
  const elements = document.querySelectorAll("*");
  for (const element of elements) {
    for (let i = 0; i < 1000; i++) {
      element.setAttribute(`data-${Math.random()}`, `${Math.random()}`);
    }
  }
}
