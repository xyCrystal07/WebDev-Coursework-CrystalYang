// Display "Hello World!" on page load
window.onload = function() {
    alert('Hello World!');
};

// Function for welcome message
function showWelcomeMessage() {
    alert('Welcome to the Sustainable Development Goals! Explore the 17 goals to build a better future by 2030.');
}

// Function to show SDG-specific information
function showGoalInfo(goalName, goalDescription) {
    alert(`Goal: ${goalName}\n\n${goalDescription}`);
}

// Function to toggle the "Get Involved" message
function toggleInvolvedMessage() {
    const message = document.getElementById('involved-message');
    message.classList.toggle('active');
}

// Function to handle feedback form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    alert(`Thank you, ${name}, for your feedback! We'll review it to improve our mission.`);
    event.target.reset(); // Reset form after submission
}