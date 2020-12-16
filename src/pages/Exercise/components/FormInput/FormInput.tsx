import React, { useContext } from "react";
import { Form, Field } from "react-final-form";
import "./formInput.scss";
import { Line, RemoveSeries, SeriesNumber } from "./components";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase/app";
interface Fields {
  name: string;
  validate: (value: any) => void;
  initialValue: string | undefined;
  text: string;
  placeholder: string;
}
interface Button {
  type: string;
  text: string;
}
interface FormFields {
  fields: Fields[];
  button: Button;
}
interface Props {
  formFields: FormFields;
  setFormFields: React.Dispatch<React.SetStateAction<FormFields>>;
  id: string;
  paramId: string;
}

const FormInput: React.FC<Props> = ({
  formFields: { fields, button },
  setFormFields,
  id,
  paramId,
}) => {
  const { currentUser } = useContext(AuthContext);
  const handleSubmit = (values: any) => {
    const newArray: any = [];
    fields.forEach((field) => {
      newArray.push(values[field.name]);
    });
    if (currentUser) {
      const url = `users/${currentUser.uid}/trainings/${id}/exercises/${paramId}`;
      firebase.database().ref(url).child("series").set(newArray);
    }
  };

  const handleRemoveSeries = (number: number) => {
    fields.splice(number - 1, 2);
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
          <Line fields={fields} button={button} setFormFields={setFormFields} />
          <button className="form__button">{button.text}</button>
        </form>
      )}
    </Form>
  );
};

export default FormInput;
