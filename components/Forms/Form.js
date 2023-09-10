import AddForm from "./AddForm";
import UpdateForm from "./UpdateForm";
import { useSelector } from "react-redux";
import { useReducer } from "react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function Form() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const formId = useSelector((state) => state.app.client.formId);

  return (
    <div className="container mx-auto py-5">
      {formId
        ? UpdateForm({ formId, formData, setFormData })
        : AddForm({ formData, setFormData })}
    </div>
  );
}
