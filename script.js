document
  .getElementById('generateButton')
  .addEventListener('click', function () {
    const url = document.getElementById('urlInput').value;
    if (url) {
      generateQRCode(url);
    } else {
      alert('Please enter a URL.');
    }
  });

async function generateQRCode(url) {
  const apiUrl = 'https://dlkvduh8th.execute-api.us-east-1.amazonaws.com';
  const loadingText = document.getElementById('loadingText');
  const qrCodeImage = document.getElementById('qrCodeImage');

  loadingText.style.display = 'block';
  qrCodeImage.style.display = 'none';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    if (data.qrCodeUrl) {
      qrCodeImage.src = data.qrCodeUrl;
      qrCodeImage.style.display = 'flex';
    } else {
      alert('Failed to generate QR Code.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while generating the QR Code.');
  } finally {
    loadingText.style.display = 'none';
  }
}
