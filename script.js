const apiUrl = "https://b021ie5mc8.execute-api.us-east-1.amazonaws.com";

const GenerateBtn = document.getElementById("generateButton");
const loadingText = document.getElementById("loadingText");
const qrCodeImage = document.getElementById("qrCodeImage");

GenerateBtn.addEventListener("click", function () {
  const url = document.getElementById("urlInput").value;
  if (url) {
    generateQRCode(url);
  } else {
    alert("Please enter a URL.");
  }
});

async function generateQRCode(url) {
  loadingText.style.display = "block";
  qrCodeImage.style.display = "none";

  try {
    console.log("Generating QR Code for:", url);
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        Origin: "localhost",
      },
      body: `{ "url": "${url}" }`,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    if (data.qrCodeUrl) {
      qrCodeImage.src = data.qrCodeUrl;
      qrCodeImage.style.display = "flex";
    } else {
      alert("Failed to generate QR Code.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while generating the QR Code.");
  } finally {
    loadingText.style.display = "none";
  }
}
