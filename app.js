// State di array of objects
let tasks = [];

// DOM Elements
const taskList = document.getElementById("task-list");
const counterEl = document.getElementById("counter");

// Fungsi render() untuk menampilkan data dari state
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

      // Aman dari XSS menggunakan textContent
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

// Jalankan awal
render();