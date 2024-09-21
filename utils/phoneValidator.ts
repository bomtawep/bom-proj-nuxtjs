// const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/

export const phoneValidator = (phoneNumber: string): boolean => {
    return phoneRegExp.test(phoneNumber);
}