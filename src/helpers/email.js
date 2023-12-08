module.exports = {
  maskedEmail: (email) => {
    const unMaskedLetter = email.slice(
      -(email.length - email.indexOf("@")) + -4
    );
    return unMaskedLetter.padStart(email.length, "*");
  },
};
