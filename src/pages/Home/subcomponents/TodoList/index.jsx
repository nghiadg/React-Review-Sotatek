import React, { useEffect, useState } from "react";
import styles from "./TodoList.module.css";
import TodoItem from "./subcomponents/TodoItem";
import Button from "../../../../components/Button";
import taskUtils from "../../../../utils/taskUtils";

const TodoList = ({
  taskList,
  onRemove,
  onUpdate,
  onRemoveAllSelected,
  selectedTaskIdList,
  onSetSelectedTaskIdList,
}) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchedTaskList, setSearchedTaskList] = useState([]);

  const handleInputSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    let result = taskList.filter((task) => task.title.includes(keyword));

    result = taskUtils.sort(result);

    setSearchedTaskList(result);
  };

  useEffect(() => {
    const taskSorted = taskUtils.sort([...taskList]);
    setSearchedTaskList(taskSorted);
  }, [taskList]);

  const handleToggleSelectTask = (taskId, isSelected) => {
    const newSelectedTaskIdList = [...selectedTaskIdList];
    const taskIdIndex = newSelectedTaskIdList.indexOf(taskId);
    if (isSelected && taskIdIndex < 0) {
      newSelectedTaskIdList.push(taskId);
    }
    if (!isSelected && taskIdIndex >= 0) {
      newSelectedTaskIdList.splice(taskIdIndex, 1);
    }

    if (
      onSetSelectedTaskIdList &&
      typeof onSetSelectedTaskIdList === "function"
    ) {
      onSetSelectedTaskIdList(newSelectedTaskIdList);
    }
  };

  const handleRemoveAllSelectedTask = () => {
    if (onRemoveAllSelected && typeof onRemoveAllSelected === "function") {
      onRemoveAllSelected();
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>To Do List</h2>
      <input
        type="text"
        placeholder="Search ..."
        className="input-full"
        value={searchKeyword}
        onChange={handleInputSearchChange}
      />
      <ul>
        {searchedTaskList.map((task) => (
          <li className={styles.todoItem} key={task.id}>
            <TodoItem
              task={task}
              onRemove={onRemove}
              onUpdate={onUpdate}
              onToggleSelect={handleToggleSelectTask}
              isSelected={selectedTaskIdList.includes(task.id)}
            />
          </li>
        ))}
      </ul>
      {selectedTaskIdList.length > 0 && (
        <div className={styles.bulkAction}>
          <div>Bulk Action:</div>
          <div>
            <Button className={styles.buttonDone}>Done</Button>
            <Button
              className={styles.buttonRemove}
              onClick={handleRemoveAllSelectedTask}
            >
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
