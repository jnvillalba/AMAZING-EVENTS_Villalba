const eventsChecks = data.events;

const categories = [...new Set(eventsChecks.map((event) => event.category))];

const categoryContainer = document.getElementById("checkboxs");

categories.forEach((category) => {
  const label = document.createElement("label");
  label.textContent = category;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = category;
  checkbox.value = category;

  label.setAttribute("for", checkbox.id);

  categoryContainer.appendChild(checkbox);
  categoryContainer.appendChild(label);
});
