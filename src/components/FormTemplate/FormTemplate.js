import React from "react";
import { Form, Field } from "react-final-form";
import "./FormTemplate.scss";
const FormTemplate = ({ formFields: { fields, button }, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      {(props) => (
        <form onSubmit={props.handleSubmit} className="form">
          {fields.map((formField) => {
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
                        {...input}
                        type="text"
                        placeholder={"Description"}
                      />
                    ) : (
                      <input
                        className="form__input"
                        {...input}
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

          <button
            variant={button.variant}
            type={button.type}
            className="form__button"
          >
            {button.text}
          </button>
        </form>
      )}
    </Form>
  );
};

export default FormTemplate;
