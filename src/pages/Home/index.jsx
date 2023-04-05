import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import FormAddNewTask from "./subcomponents/FormAddNewTask";
import TodoList from "./subcomponents/TodoList";
import localStorageUtils from "../../utils/localStorageUtils";

const TASK_LIST_KEY = "taskList";
const SELECTED_TASK_ID_LIST = "selectedTaskIdList";

const Home = () => {
  const [taskList, setTaskList] = useState(
    localStorageUtils.getItem(TASK_LIST_KEY) || []
  );
  const [selectedTaskIdList, setSelectedTaskIdList] = useState(
    localStorageUtils.getItem(SELECTED_TASK_ID_LIST) || []
  );

  const handleAddNewTask = (newTask) => {
    const newTaskList = [...taskList];
    const taskId = new Date().getTime();
    newTaskList.push({ ...newTask, id: taskId });
    setTaskList(newTaskList);

    const newSelectedTaskIdList = [...selectedTaskIdList];
    newSelectedTaskIdList.push(taskId);
    setSelectedTaskIdList(newSelectedTaskIdList);
  };

  const handleRemoveTask = (taskId) => {
    const newTaskList = [...taskList];

    const taskIndex = newTaskList.findIndex((task) => task.id === taskId);

    newTaskList.splice(taskIndex, 1);

    setTaskList(newTaskList);

    const newSelectedTaskIdList = [...selectedTaskIdList];
    const taskIdIndex = newSelectedTaskIdList.indexOf(taskId);

    if (taskIdIndex >= 0) {
      newSelectedTaskIdList.splice(taskIdIndex, 1);
      setSelectedTaskIdList(newSelectedTaskIdList);
    }
  };

  const handleUpdateTask = (taskId, taskUpdated) => {
    const newTaskList = [...taskList];

    const taskIndex = newTaskList.findIndex((task) => task.id === taskId);

    newTaskList.splice(taskIndex, 1, taskUpdated);

    setTaskList(newTaskList);
  };

  const handleRemoveAllSelectedTask = () => {
    const newTaskList = [...taskList];
    for (const selectedTaskId of selectedTaskIdList) {
      const taskIndex = newTaskList.findIndex(
        (task) => task.id === selectedTaskId
      );
      newTaskList.splice(taskIndex, 1);
    }

    setTaskList(newTaskList);
    setSelectedTaskIdList([]);
  };

  useEffect(() => {
    localStorageUtils.setItem(TASK_LIST_KEY, taskList);
  }, [taskList]);

  useEffect(() => {
    localStorageUtils.setItem(SELECTED_TASK_ID_LIST, selectedTaskIdList);
  }, [selectedTaskIdList]);

  return (
    <div className={styles.flex}>
      <div className={styles.flexItem}>
        <FormAddNewTask onSubmit={handleAddNewTask} />
      </div>
      <div className={styles.flexItem}>
        <TodoList
          taskList={taskList}
          onRemove={handleRemoveTask}
          onUpdate={handleUpdateTask}
          onRemoveAllSelected={handleRemoveAllSelectedTask}
          selectedTaskIdList={selectedTaskIdList}
          onSetSelectedTaskIdList={setSelectedTaskIdList}
        />
      </div>
    </div>
  );
};

export default Home;
