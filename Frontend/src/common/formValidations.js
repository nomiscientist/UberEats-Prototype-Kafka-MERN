/**
 * Format Phone Number
 */
export const formatPhoneNumber = (value) => {
  if (!value) return;
  const currentPhoneNumber = value.replace(/[^\d]/g, "");
  const mobileNoLength = currentPhoneNumber.length;
  if (mobileNoLength >= 7) {
    if (mobileNoLength < 4) return currentPhoneNumber;
    if (mobileNoLength < 7)
      return `(${currentPhoneNumber.slice(0, 3)}) ${currentPhoneNumber.slice(
        3
      )}`;
    return `(${currentPhoneNumber.slice(0, 3)}) ${currentPhoneNumber.slice(
      3,
      6
    )}-${currentPhoneNumber.slice(6, 10)}`;
  } else {
    return currentPhoneNumber;
  }
};

/**
 * Validate Email address
 */
export const isValidEmail = (value) => {
  return !(value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,64}$/i.test(value));
};

/**
 * Validate Password
 */
export const validatePassword = (password) => {
  var re = {
    full: /[A-Za-z0-9!@#$%^&*.]{8,20}$/,
  };
  return re.full.test(password);
};

/*
 * Validate zipcode
 */
export const validateZipcode = (value) => {
  let isValidZip = /^[0-9\b]+$/.test(value);

  return isValidZip;
};
