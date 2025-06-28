document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToDOM(task.text, task.completed));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text !== '') {
      addTaskToDOM(text);
      saveTask(text, false);
      taskInput.value = '';
    }
  });

  function addTaskToDOM(text, completed = false) {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed');
    li.innerHTML = `${text}
      <span class="task-buttons">
        <button onclick="toggleComplete(this)">✅</button>
        <button onclick="deleteTask(this)">🗑️</button>
      </span>`;
    taskList.appendChild(li);
  }

  window.toggleComplete = (btn) => {
    const li = btn.parentElement.parentElement;
    li.classList.toggle('completed');
    updateLocalStorage();
  }

  window.deleteTask = (btn) => {
    const li = btn.parentElement.parentElement;
    li.remove();
    updateLocalStorage();
  }

  function saveTask(text, completed) {
    tasks.push({ text, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function updateLocalStorage() {
    const updated = [];
    document.querySelectorAll('#task-list li').forEach(li => {
      updated.push({
        text: li.childNodes[0].textContent.trim(),
        completed: li.classList.contains('completed')
      });
    });
    localStorage.setItem('tasks', JSON.stringify(updated));
  }
});
