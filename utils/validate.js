export const Validate = (email) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  if (!isEmailValid) return "Email is not valid";
  // if (!isNameValid) return "Name is not valid";

  return null;
};
