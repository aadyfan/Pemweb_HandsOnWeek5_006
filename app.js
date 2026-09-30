// State di array of objects
let tasks = [];

// DOM Elements
const taskForm = document.getElementById("task-form");
const judulInput = document.getElementById("judul");
const matkulInput = document.getElementById("matkul");
const deadlineInput = document.getElementById("deadline");
const errorMessage = document.getElementById("error-message");
const taskList = document.getElementById("task-list");
const counterEl = document.getElementById("counter");

// Fungsi render()
function render() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.className = "empty-state";
    emptyLi.textContent = "Tidak ada tugas";
    taskList.appendChild(emptyLi);
  } else {
    tasks.forEach(task => {
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
}

// Form submit listener + preventDefault() + validasi
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const judul = judulInput.value.trim();
  const matkul = matkulInput.value;
  const deadline = deadlineInput.value;

  // Validasi judul >= 3 karakter
  if (judul.length < 3) {
    errorMessage.textContent = "Judul minimal harus 3 karakter!";
    return;
  }

  // Validasi deadline wajib
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
  render();

  judulInput.value = "";
  deadlineInput.value = "";
});

// Jalankan awal
render();