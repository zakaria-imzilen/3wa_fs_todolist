const handleSubmitForm = () => {
	// Get form values
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const message = document.getElementById("message").value;

	// Validation
	if (!name || !email || !message) {
		alert("Please fill in all fields");
		return;
	}

	// Code to send form data to a server using fetch or another method
	// Example:
	fetch("/submit-form", {
		method: "POST",
		body: JSON.stringify({ name, email, message }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	// Show success message
	alert("Form submitted successfully");

	// Clear form fields
	document.getElementById("name").value = "";
	document.getElementById("email").value = "";
	document.getElementById("message").value = "";
};
