export const validateEmail = (email) => {
	const emailRgx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	return emailRgx.test(email);
};
