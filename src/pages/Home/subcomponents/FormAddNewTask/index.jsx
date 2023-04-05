import React from "react";
import styles from "./FormAddNewTask.module.css";
import FormTaskEditor from "../../../../components/FormTaskEditor";

const FormAddNewTask = ({ onSubmit }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>New Task</h2>
      <FormTaskEditor
        onSubmit={onSubmit}
        buttonSubmitText="Add"
        isResetOnSubmit
      />
    </div>
  );
};

export default FormAddNewTask;
