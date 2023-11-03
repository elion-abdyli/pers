document.addEventListener("DOMContentLoaded", function () {
    const ipAddressElement = document.getElementById("ipAddress");

    fetch("https://api64.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            ipAddressElement.textContent = ipAddress;
        })
        .catch(error => {
            ipAddressElement.textContent = "Unable to retrieve your IP address.";
        });
});
