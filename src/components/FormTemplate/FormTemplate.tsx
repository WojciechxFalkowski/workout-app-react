import React from "react";
import { Form, Field } from "react-final-form";
import "./FormTemplate.scss";
interface Fields {
  name: string;
  validate?: (fn: () => void) => void;
  initialValue: any;
  placeholder: string;
  text: string;
  type?: string;
  parse?: ((value: any, name: string) => () => void) | undefined;
  component?: string;
  min?: string;
  max?: string;
  step?: string;
}
interface Button {
  type?: "submit";
  text: string;
}
interface formFields {
  fields: Array<Fields>;
  button: Button;
}

export interface Props {
  formFields: formFields;
  handleSubmit: (values: any) => void;
}
const FormTemplate: React.FC<Props> = ({ formFields, handleSubmit }) => {
  const { fields, button } = formFields;
  return (
    <Form onSubmit={handleSubmit}>
      {(props) => (
        <form onSubmit={props.handleSubmit} className="form">
          {fields.map((formField: Fields) => {
            return (
              <Field
                key={formField.name}
                name={formField.name}
                validate={formField.validate}
                defaultValue={formField.initialValue}
                parse={formField.parse}
              >
                {({ input, meta }) => (
                  <div className="form__wrapper">
                    <label>{formField.text}</label>
                    {formField.component === "textarea" ? (
                      <textarea
                        className="form__textarea"
                        placeholder={"Description"}
                      />
                    ) : (
                      <input
                        className="form__input"
                        type={formField.type}
                        step={formField.step ? formField.step : undefined}
                        min={formField.min ? formField.min : undefined}
                        max={formField.max ? formField.max : undefined}
                        placeholder={formField.placeholder}
                      />
                    )}
                    {meta.error && meta.touched && (
                      <span className="form__span">{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>
            );
          })}

          <button type={button.type} className="form__button">
            {button.text}
          </button>
        </form>
      )}
    </Form>
  );
};

export default FormTemplate;