document.addEventListener("DOMContentLoaded", function() {
  const inputBox = document.querySelector(".inputField input");
  const addBtn = document.querySelector(".inputField button");
  const todoList = document.querySelector(".todoList");
  const deleteAllBtn = document.querySelector(".footer button");

  inputBox.addEventListener("keyup", function() {
    toggleAddButtonState();
  });

  addBtn.addEventListener("click", function() {
    addTask();
  });

  deleteAllBtn.addEventListener("click", function() {
    clearAllTasks();
  });

  // Show initial tasks
  showTasks();

  function toggleAddButtonState() {
    let userEnteredValue = inputBox.value.trim();
    if (userEnteredValue.length !== 0) {
      addBtn.classList.add("active");
    } else {
      addBtn.classList.remove("active");
    }
  }

  function addTask() {
    let userEnteredValue = inputBox.value.trim();
    if (userEnteredValue.length === 0) return;

    let listArray = getListArrayFromLocalStorage();
    listArray.push(userEnteredValue);
    updateLocalStorage(listArray);
    showTasks();
    inputBox.value = "";
    addBtn.classList.remove("active");
  }

  function showTasks() {
    let listArray = getListArrayFromLocalStorage();
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length;
    deleteAllBtn.classList.toggle("active", listArray.length > 0);
    renderTasks(listArray);
  }

  function renderTasks(listArray) {
    let newLiTag = listArray.map((task, index) => {
      return <li>${task}<span class="icon" data-index="${index}"><i class="fas fa-trash"></i></span></li>;
    }).join("");
    todoList.innerHTML = newLiTag;
  }
//inner html
  function clearAllTasks() {
    localStorage.removeItem("New Todo");
    showTasks();
  }
//remove item
  function getListArrayFromLocalStorage() {
    let getLocalStorageData = localStorage.getItem("New Todo");
    return getLocalStorageData ? JSON.parse(getLocalStorageData) : [];
  }

  function updateLocalStorage(listArray) {
    localStorage.setItem("New Todo", JSON.stringify(listArray));
  }

  // Event delegation for delete task icons
  todoList.addEventListener("click", function(event) {
    if (event.target.classList.contains("icon")) {
      let index = event.target.dataset.index;
      deleteTask(index);
    }
  });
//delete task
  function deleteTask(index) {
    let listArray = getListArrayFromLocalStorage();
    listArray.splice(index, 1);
    updateLocalStorage(listArray);
    showTasks();
  }
});
//end
// reviewed the javascript
