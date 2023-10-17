// exitIntent.js
let trackingExitIntent = false;

// Track mouse movement and cursor position
document.addEventListener('mouseleave', (event) => {
  if (event.clientY < 0 && !trackingExitIntent) {
    // The cursor has moved above the viewport, indicating potential exit intent
    trackingExitIntent = true;

    // Send exit intent data to the server
    sendExitIntentToServer();
  }
});

function sendExitIntentToServer() {
  fetch('http://localhost:8080/track-exit-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ exitIntent: true }),
  })
  .then(() => {
    // Optional: Handle the server response
  })
  .catch((error) => {
    // Optional: Handle errors
  });
}
