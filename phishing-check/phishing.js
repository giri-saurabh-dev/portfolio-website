async function checkURL() {
  const url = document.getElementById("urlInput").value;
  const result = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=YOUR_API_KEY`, {
    method: "POST",
    body: JSON.stringify({
      client: { clientId: "your-company", clientVersion: "1.5.2" },
      threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: [{ url }]
      }
    }),
    headers: { "Content-Type": "application/json" }
  });

  const data = await result.json();
  document.getElementById("result").textContent = data.matches ? "⚠️ Suspicious URL!" : "✅ URL looks safe.";
}

function handleImage(input) {
  const reader = new FileReader();
  reader.onload = function () {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);
      if (code) {
        document.getElementById("urlInput").value = code.data;
        checkURL();
      } else {
        document.getElementById("result").textContent = "❌ QR code not recognized.";
      }
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(input.files[0]);
}
