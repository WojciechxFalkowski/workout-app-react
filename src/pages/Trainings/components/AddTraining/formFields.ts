import { required, composeValidators, maxValue } from "utils/validation";
import {
  dayMonthYearWithSeparator,
  hoursMinutesWithSeparator,
} from "utils/dateFunctions";
const date = new Date();
const datePattern = `${dayMonthYearWithSeparator(
  date,
  "-",
  "yes"
)}T${hoursMinutesWithSeparator(date, ":")}`;
export default {
  fields: [
    {
      name: "date",
      validate: composeValidators(required("To pole jest wymagane!")),
      initialValue: datePattern,
      text: "Data treningu",
      placeholder: "Data treningu",
      type: "datetime-local",
      max: datePattern,
    },
    {
      name: "workoutName",
      validate: composeValidators(
        required("To pole jest wymagane!"),
        maxValue(40, "Nazwa treningu maksymalnie może mieć 40 znaków")
      ),
      initialValue: undefined,
      text: "Nazwa treningu",
      placeholder: "Nazwa treningu",
    },
  ],
  button: {
    text: "Dodaj trening",
  },
};
