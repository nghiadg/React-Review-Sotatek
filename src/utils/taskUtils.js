const taskUtils = {
  sort: (taskList) => {
    const newTaskList = [...taskList];
    const compare = (a, b) => {
      const dueDateOfA = new Date(a.dueDate);
      const dueDateOfB = new Date(b.dueDate);
      if (dueDateOfA > dueDateOfB) {
        return 1;
      }

      if (dueDateOfA < dueDateOfB) {
        return -1;
      }

      return 0;
    };

    return newTaskList.sort(compare);
  },
};

export default taskUtils;