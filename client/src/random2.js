// Main function
const handleSubmitForm = async () => {
	const formData = getFormData();
	// Small Function 1
	if (!validateFormData(formData)) {
		alert("Please fill in all fields");
		return;
	}
	// Small Function 2
	await sendDataToServer(formData);
	// Small Function 3
	showSuccessMessage();
	// Small Function 4
	clearFormFields();
};
