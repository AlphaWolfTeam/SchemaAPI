export default interface IValidationNumber {
  type: "Number";
  biggerThan?: number;
  smallerThan?: number;
  equalsTo?: number;
  differFrom?: number[];
  digitsAmount?: number;
  isEven?: boolean;
  isPositive?: boolean;
  isPrime?: boolean;
  isDecimal?: boolean;
}
