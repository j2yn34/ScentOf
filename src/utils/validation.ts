export const validation = (
  value: string,
  regex: RegExp,
  validMessage: string,
  invalidMessage: string,
  setValidState: React.Dispatch<React.SetStateAction<boolean>>,
  setMessageState: React.Dispatch<React.SetStateAction<string>>
): void => {
  if (value.length > 0) {
    if (!regex.test(value)) {
      setMessageState(invalidMessage);
      setValidState(false);
    } else {
      setMessageState(validMessage);
      setValidState(true);
    }
  }
};
