import React from "react";
import { Form, Field } from "react-final-form";
import { required, composeValidators } from "utils/validation";
import "./formInput.scss";
import { Line, RemoveSeries, SeriesNumber } from "./components";
interface formFields {
  fields: any;
  button: any;
}
interface Props {
  formFields: any;
  setFormFields: (cos: any) => void;
  handleSubmit: (values: any) => void;
}

const FormInput: React.FC<Props> = ({
  formFields: { fields, button },
  handleSubmit,
  setFormFields,
}) => {
  const handleAddSeries = () => {
    console.log("handleAddSeries", fields.length);

    fields.push(
      {
        name: `exerciseWeight${ID()}`,
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Ciężar",
        placeholder: "Ciężar",
      },
      {
        name: `exerciseRepeat${ID()}`,
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Liczba powtórzeń",
        placeholder: "Liczba powtórzeń",
      }
    );

    setFormFields({
      fields,
      button,
    });
  };
  const ID = function () {
    return (
      Math.random().toString(36).substr(2, 9) +
      Math.random().toString(36).substr(2, 9)
    );
  };
  const handleRemoveSeries = (number: number) => {
    console.log("handleRemoveSeries");
    console.log("number", number);
    console.log("number", fields.splice(number - 1, 2));
    console.log(fields);
    setFormFields({
      fields,
      button,
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      {(props) => (
        <form onSubmit={props.handleSubmit} className="form">
          {fields.map((formField: any, index: number) => {
            return (
              <Field
                key={formField.name}
                name={formField.name}
                validate={formField.validate}
                defaultValue={formField.initialValue}
                parse={formField.parse}
              >
                {({ input, meta }) => (
                  <>
                    <SeriesNumber index={index} />
                    <div className="form__wrapper">
                      <label>{formField.text}</label>
                      <input
                        className="form__input"
                        {...input}
                        type="number"
                        step="1"
                        min="0"
                        placeholder={formField.placeholder}
                      />
                      {meta.error && meta.touched && (
                        <span className="form__span">{meta.error}</span>
                      )}
                    </div>
                    {index % 2 === 1 && (
                      <RemoveSeries
                        index={index}
                        handleRemoveSeries={handleRemoveSeries}
                      />
                    )}
                  </>
                )}
              </Field>
            );
          })}
          <Line handleAddSeries={handleAddSeries} />
          <button className="form__button">{button.text}</button>
        </form>
      )}
    </Form>
  );
};

export default FormInput;
