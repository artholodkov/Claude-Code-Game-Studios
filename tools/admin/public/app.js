const searchInput = document.getElementById("search");
const commandsList = document.getElementById("commands");
const meta = document.getElementById("meta");

let allCommands = [];

function render(commands) {
  commandsList.innerHTML = "";

  if (commands.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No commands found.";
    commandsList.appendChild(empty);
    return;
  }

  for (const item of commands) {
    const li = document.createElement("li");
    li.className = "item";
    li.innerHTML = `
      <div class="row">
        <code class="command">${item.command}</code>
        <span class="skill">${item.skill}</span>
      </div>
      <code class="path">${item.path}</code>
    `;
    commandsList.appendChild(li);
  }
}

function filterCommands() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = allCommands.filter((item) => {
    return (
      item.command.toLowerCase().includes(query) ||
      item.skill.toLowerCase().includes(query) ||
      item.path.toLowerCase().includes(query)
    );
  });

  meta.textContent = `Showing ${filtered.length} of ${allCommands.length} commands`;
  render(filtered);
}

async function init() {
  try {
    const response = await fetch("/api/commands");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    allCommands = data.commands || [];
    meta.textContent = `Showing ${allCommands.length} of ${allCommands.length} commands`;
    render(allCommands);
  } catch (error) {
    meta.textContent = "Failed to load commands.";
    commandsList.innerHTML = `<li class="empty">${error.message}</li>`;
  }
}

searchInput.addEventListener("input", filterCommands);
init();
