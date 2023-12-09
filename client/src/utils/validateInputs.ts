export const validateEmail = (email: string): boolean => {
	const emailRgx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	return emailRgx.test(email);
};

export const validateTodoInput = (input: string): boolean => {
	return input.length > 2;
};
