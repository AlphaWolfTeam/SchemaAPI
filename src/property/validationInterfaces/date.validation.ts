export default interface IValidationDate {
  type: "Date";
  before?: Date;
  after?: Date;
  equalsTo?: Date;
  between?: Date[];
  minDay?: number;
  maxDay?: number;
  specificDay?: number;
  dayBetweens?: number[];
  minMonth?: number;
  maxMonth?: number;
  specificMonth?: number;
  monthBetweens?: number[];
  minYear?: number;
  maxYear?: number;
  specificYear?: number;
  yearBetweens?: number[];
}
