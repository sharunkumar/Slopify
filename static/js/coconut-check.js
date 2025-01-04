// Check if coconut.jpg exists
function checkCoconut() {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = '/static/images/coconut.jpg';
  });
}

// Crash/no-op the site if coconut.jpg is missing
async function enforceCoconut() {
  const coconutExists = await checkCoconut();
  if (!coconutExists) {
    killEverything();
  }
}

// Run check immediately
enforceCoconut(); 