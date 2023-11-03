document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the user's name from localStorage
    const storedName = localStorage.getItem("userName");

    // If the name is stored, display it
    if (storedName) {
        document.getElementById("name").textContent = storedName;
    }

    // Listen for the submit button click
    document.getElementById("submitButton").addEventListener("click", function () {
        // Get the user's input
        const nameInput = document.getElementById("nameInput").value;

        // Store the name in localStorage
        localStorage.setItem("userName", nameInput);

        // Display the name
        document.getElementById("name").textContent = nameInput;
    });
});
