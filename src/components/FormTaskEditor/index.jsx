import React, { useEffect } from "react";
import styles from "./FormTaskEditor.module.css";
import Button from "../Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import dateUtils from "../../utils/dateUtils";

const TaskSchema = Yup.object().shape({
  title: Yup.string().required(),
});

const FormTaskEditor = ({
  onSubmit,
  value,
  buttonSubmitText,
  isResetOnSubmit,
}) => {
  const formTask = useFormik({
    initialValues: {
      title: "",
      description: "",
      dueDate: dateUtils.formatDate(new Date()),
      piority: "normal",
    },
    validationSchema: TaskSchema,
    onSubmit: (data) => {
      if (onSubmit && typeof onSubmit == "function") {
        onSubmit(data);
      }

      if (isResetOnSubmit) {
        formTask.resetForm();
      }
    },
  });

  useEffect(() => {
    if (value) {
      formTask.setValues({ ...value });
    }
  }, []);

  const handleDueDateBlur = (e) => {
    const value = e.target.value;

    if (new Date(value) >= new Date(dateUtils.formatDate(new Date()))) {
      formTask.setFieldValue("dueDate", value);
    } else {
      formTask.setFieldValue("dueDate", dateUtils.formatDate(new Date()));
    }
  };

  return (
    <div>
      <form onSubmit={formTask.handleSubmit}>
        <input
          className="input-full"
          placeholder="Add new task ..."
          required
          name="title"
          value={formTask.values.title}
          onChange={formTask.handleChange}
        />
        <div>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            cols="30"
            rows="10"
            placeholder=""
            className="input-full"
            name="description"
            value={formTask.values.description}
            onChange={formTask.handleChange}
          />
        </div>
        <div className={styles.otherInfo}>
          <div className={styles.otherInfoItem}>
            <label htmlFor="due-date" className={styles.label}>
              Due Date
            </label>
            <input
              className="input-full"
              type="date"
              id="due-date"
              name="dueDate"
              value={formTask.values.dueDate}
              onChange={formTask.handleChange}
              onBlur={handleDueDateBlur}
              min={dateUtils.formatDate(new Date())}
            />
          </div>
          <div className={styles.otherInfoItem}>
            <label htmlFor="piority" className={styles.label}>
              Piority
            </label>
            <select
              className="input-full"
              id="piority"
              name="piority"
              value={formTask.values.piority}
              onChange={formTask.handleChange}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="hight">Hight</option>
            </select>
          </div>
        </div>
        <Button isBlock type="submit">
          {buttonSubmitText}
        </Button>
      </form>
    </div>
  );
};

export default FormTaskEditor;
