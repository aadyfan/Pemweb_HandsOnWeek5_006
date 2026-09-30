let tasks = [];
let currentFilter = "semua";

const taskForm = document.getElementById("task-form");
const judulInput = document.getElementById("judul");
const matkulInput = document.getElementById("matkul");
const deadlineInput = document.getElementById("deadline");
const errorMessage = document.getElementById("error-message");
const taskList = document.getElementById("task-list");
const counterEl = document.getElementById("counter");
const filterContainer = document.querySelector(".filter-buttons");

function init() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
  render();
}
function saveToStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  taskList.innerHTML = "";

  const sortedTasks = [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const filteredTasks = sortedTasks.filter(task => {
    if (currentFilter === "aktif") return !task.selesai;
    if (currentFilter === "selesai") return task.selesai;
    return true;
  });

  if (filteredTasks.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.className = "empty-state";
    emptyLi.textContent = "Tidak ada tugas";
    taskList.appendChild(emptyLi);
  } else {
    filteredTasks.forEach(task => {
      const li = document.createElement("li");
      li.className = `task-item ${task.selesai ? "completed" : ""}`;
      li.dataset.id = task.id;

      const contentDiv = document.createElement("div");
      contentDiv.className = "task-content";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.selesai;
      checkbox.className = "toggle-complete";

      const infoDiv = document.createElement("div");
      infoDiv.className = "task-info";

      const titleSpan = document.createElement("span");
      titleSpan.className = "task-title";
      titleSpan.textContent = task.judul;

      const metaSpan = document.createElement("span");
      metaSpan.className = "task-meta";
      metaSpan.textContent = `${task.matkul} • deadline ${task.deadline}`;

      infoDiv.appendChild(titleSpan);
      infoDiv.appendChild(metaSpan);

      contentDiv.appendChild(checkbox);
      contentDiv.appendChild(infoDiv);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn-delete";
      deleteBtn.textContent = "x";

      li.appendChild(contentDiv);
      li.appendChild(deleteBtn);

      taskList.appendChild(li);
    });
  }

  const activeCount = tasks.filter(t => !t.selesai).length;
  if (tasks.length === 0) {
    counterEl.textContent = "pesan saat daftar kosong";
  } else {
    counterEl.textContent = `${activeCount} tugas aktif`;
  }
}

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const judul = judulInput.value.trim();
  const matkul = matkulInput.value;
  const deadline = deadlineInput.value;

  if (judul.length < 3) {
    errorMessage.textContent = "Judul minimal harus 3 karakter!";
    return;
  }

  if (!deadline) {
    errorMessage.textContent = "Deadline wajib diisi!";
    return;
  }

  errorMessage.textContent = "";

  const newTask = {
    id: Date.now(),
    judul: judul,
    matkul: matkul,
    deadline: deadline,
    selesai: false
  };

  tasks.push(newTask);
  saveToStorage();
  render();

  judulInput.value = "";
  deadlineInput.value = "";
});

taskList.addEventListener("click", function (e) {
  const itemEl = e.target.closest(".task-item");
  if (!itemEl) return;

  const taskId = Number(itemEl.dataset.id);

  if (e.target.classList.contains("toggle-complete")) {
    tasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, selesai: e.target.checked };
      }
      return task;
    });
    saveToStorage();
    render();
  }

  if (e.target.classList.contains("btn-delete")) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveToStorage();
    render();
  }
});


filterContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    document.querySelectorAll(".btn-filter").forEach(btn => btn.classList.remove("on"));
    e.target.classList.add("on");

    currentFilter = e.target.dataset.filter;
    render();
  }
});


init();