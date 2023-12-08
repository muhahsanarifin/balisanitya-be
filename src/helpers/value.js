module.exports = {
  usePreviousValue: (currentValue, previousValue) => {
    return currentValue.length === 0 ? previousValue : currentValue;
  },
};
