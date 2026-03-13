/*                                  Navigation                                          */
//Get the buttons
const home = document.getElementById("homeBtn");
const weather = document.getElementById("weatherBtn");
const tasks = document.getElementById("tasksBtn");
const notes = document.getElementById("notesBtn");
//Get the sections
const homeSection = document.getElementById("homeSection");
const weatherSection = document.getElementById("weatherSection");
const tasksSection = document.getElementById("tasksSection");
const notesSection = document.getElementById("notesSection");

//Add event listeners to the buttons
function showSection(section, activeSection) {
  //Hide all sections
  homeSection.style.display = "none";
  weatherSection.style.display = "none";
  tasksSection.style.display = "none";
  notesSection.style.display = "none";
  //Deselect all buttons
  home.classList.remove("active");
  weather.classList.remove("active");
  tasks.classList.remove("active");
  notes.classList.remove("active");
  //Show the selected section
  section.style.display = "block";
  activeSection.classList.add("active");
}

home.addEventListener("click", () => showSection(homeSection, home));
weather.addEventListener("click", () => showSection(weatherSection, weather));
tasks.addEventListener("click", () => showSection(tasksSection, tasks));
notes.addEventListener("click", () => showSection(notesSection, notes));

//Show the home section by default
showSection(homeSection, home);

/*                                  Greeting                                          */
const greetingElement = document.getElementById("greeting");
function setGreeting() {
  let greeting;
  const hour = new Date().getHours();
  if (hour < 12) {
    greeting = "Good Morning!";
  } else if (hour < 18) {
    greeting = "Good Afternoon!";
  } else {
    greeting = "Good Evening!";
  }
  greetingElement.textContent = greeting;
}
setGreeting();

/*                                  Date display                                         */
const dateElement = document.getElementById("pageDate");
function setDateDisplay() {
  const now = new Date();
  const opts = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  if (dateElement)
    dateElement.textContent = now.toLocaleDateString(undefined, opts);
}
setDateDisplay();

/*                                  Task Management                                         */
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
//Initialize task array from localStorage or start with an empty array
let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
function renderTasks() {
  taskList.innerHTML = "";
  taskArray.forEach((task, index) => {
    const li = document.createElement("li");

    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    taskContent.appendChild(taskText);

    const finishBtn = document.createElement("button");
    finishBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    if (task.completed) {
      li.classList.add("completed");
    }
    finishBtn.addEventListener("click", () => {
      task.completed = !task.completed;
      localStorage.setItem("tasks", JSON.stringify(taskArray));
      renderTasks();
    });
    deleteBtn.addEventListener("click", () => {
      taskArray.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(taskArray));
      renderTasks();
    });

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("task-buttons");

    buttonGroup.appendChild(finishBtn);
    buttonGroup.appendChild(deleteBtn);

    li.appendChild(taskContent);
    li.appendChild(buttonGroup);

    taskList.appendChild(li);
  });
}
// Add task on Enter key press
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskBtn.click();
  }
});
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    taskArray.push({
      text: taskText,
      completed: false,
    });
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    renderTasks();
    taskInput.value = "";
  }
});
renderTasks();

/*                                  Notes Management                                         */
const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const noteList = document.getElementById("notesList");
//Initialize notes array from localStorage or start with an empty array
let notesArray = JSON.parse(localStorage.getItem("notes")) || [];
function renderNotes() {
  noteList.innerHTML = "";

  notesArray.forEach((note, index) => {
    const noteCard = document.createElement("div");
    noteCard.classList.add("note-card");

    const noteDate = document.createElement("p");
    noteDate.classList.add("note-date");
    noteDate.textContent = new Date(note.createdAt).toLocaleDateString();

    const noteRow = document.createElement("div");
    noteRow.classList.add("note-row");

    const noteContent = document.createElement("p");
    noteContent.classList.add("note-content");
    noteContent.textContent = note.text;

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("note-buttons");

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit your note:", note.text);
      if (newText !== null) {
        notesArray[index].text = newText.trim();
        localStorage.setItem("notes", JSON.stringify(notesArray));
        renderNotes();
      }
    });

    deleteBtn.addEventListener("click", () => {
      notesArray.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notesArray));
      renderNotes();
    });

    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteBtn);

    noteRow.appendChild(noteContent);
    noteRow.appendChild(buttonGroup);

    noteCard.appendChild(noteDate);
    noteCard.appendChild(noteRow);

    noteList.appendChild(noteCard);
  });
}
// Add note on Enter key press
noteInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addNoteBtn.click();
  }
});
addNoteBtn.addEventListener("click", () => {
  console.log("Add Note button clicked");
  const noteText = noteInput.value.trim();
  if (noteText) {
    notesArray.push({
      text: noteText,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("notes", JSON.stringify(notesArray));
    renderNotes();
    noteInput.value = "";
  }
});
renderNotes();
