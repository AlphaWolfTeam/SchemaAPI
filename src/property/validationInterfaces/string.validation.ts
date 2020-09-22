export default interface IValidationString {
  type: "String";
  longerThan?: number;
  shorterThan?: number;
  amountOfChars?: number;
  equalsTo?: string;
  differFrom?: string[];
  startsWith?: string;
  endsWith?: string;
  includes?: string;
  pattern?: string;
  requiredChars?: string[];
  mustntIncludeChars?: string[];
}
