// let img = "";

const generateQR = async () => {
    const input = document.getElementById("userInput").value;
    if (input === "") {
        alert("Please enter any text or URL");
        return;
    }

    const QRcodeImg = document.getElementById("QRcodeImg");
    const size = document.getElementById("sizeSelect").value;
    const cont = document.getElementById("cont");
    const loading = document.getElementById("loading");
    const imgBox = document.getElementById("imgBox");

    // Show loading indicator and hide image box
    cont.classList.remove('hidden');
    imgBox.classList.add('hidden');
    loading.classList.remove('hidden');

    // Fetch the QR code image
    try {
        const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${input.trim()}`);
        const blob = await response.blob();
        QRcodeImg.src = URL.createObjectURL(blob);

        // Wait until the image has loaded
        QRcodeImg.onload = () => {
            // Hide loading indicator and show image box
            loading.classList.add('hidden');
            imgBox.classList.remove('hidden');
        };
    } catch (error) {
        console.error('Error fetching the QR code image:', error);
        loading.classList.add('hidden');
        alert('Failed to generate QR code. Please try again.');
    }
};


const saveQR = () => {
    const image = document.getElementById('QRcodeImg');
    const imageURL = image.src;
    const input = document.getElementById("userInput").value;

    fetch(imageURL)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${input}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(err => console.error('Error fetching the image: ', err));
};
