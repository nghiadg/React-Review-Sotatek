import React, { useState } from "react";
import styles from "./TodoItem.module.css";
import Button from "../../../../../../components/Button";
import FormTaskEditor from "../../../../../../components/FormTaskEditor";

const TodoItem = ({ task, onRemove, onUpdate, onToggleSelect, isSelected }) => {
  const [isShowDetail, setIsShowDetail] = useState(false);

  const handleToggleDetail = () => {
    setIsShowDetail((prevState) => !prevState);
  };

  const handleRemoveTask = () => {
    if (onRemove && typeof onRemove === "function") {
      onRemove(task.id);
    }
  };

  const handleUpdateTask = (taskUpdated) => {
    if (onUpdate && typeof onUpdate === "function") {
      onUpdate(task.id, taskUpdated);
    }
  };

  const handleToggleSelectTask = (e) => {
    const isSelected = e.target.checked;
    if (onToggleSelect && typeof onToggleSelect === "function") {
      onToggleSelect(task.id, isSelected);
    }
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <div>
          <input
            type="checkbox"
            name=""
            id={task.id}
            onChange={handleToggleSelectTask}
            checked={isSelected}
          />
          <label htmlFor={task.id}>{task.title}</label>
        </div>
        <div>
          <Button className={styles.buttonDetail} onClick={handleToggleDetail}>
            Detail
          </Button>
          <Button className={styles.buttonRemove} onClick={handleRemoveTask}>
            Remove
          </Button>
        </div>
      </div>
      {isShowDetail && (
        <div className={styles.detail}>
          <FormTaskEditor
            value={task}
            buttonSubmitText="Update"
            onSubmit={handleUpdateTask}
          />
        </div>
      )}
    </div>
  );
};

export default TodoItem;
