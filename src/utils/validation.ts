export const required = (text: string) => (
  value: string | number
): undefined | string => (value ? undefined : text);
export const checkAtSign = (text: string) => (value: string) =>
  value.includes("@") ? undefined : text;
export const mustBeNumber = (text: string) => (
  value: number
): string | undefined => (isNaN(value) ? text : undefined);
export const minValue = (min: number, text: string) => (value: string) =>
  isNaN(value.length) || value.length >= min ? undefined : text;
export const maxValue = (max: number, text: string) => (value: string) =>
  isNaN(value.length) || value.length <= max ? undefined : text;
export const uniqueMealName = (items: any, text: string) => (value: string) =>
  items.find((item: any) => item.mealName === value) === undefined
    ? undefined
    : text;

export const composeValidators = (...validators: any) => (value: any) =>
  validators.reduce(
    (error: any, validator: any) => error || validator(value),
    undefined
  );
