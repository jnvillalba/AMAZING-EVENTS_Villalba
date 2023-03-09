console.log("index");
console.log(data.events.length);

let eventContainer = document.getElementById("index-cards");

for (let event of data.events) {
  let card = document.createElement("div");
  card.className = "card d-flex flex-column align-items-center mx-2 my-2";
  card.style = "width: 18rem; height: 25rem";
  card.innerHTML = `
    <img
      class="card-img-top"
      src="${event.image}"
      alt="Card image cap"
    />
    <div class="card-body">
      <h5 class="card-title">${event.name}</h5>
      <p class="card-text">${event.description}</p>
    
      <div class="d-flex justify-content-between align-items-center px-1 pt-4 pb-3" style="position: absolute; bottom: 0; width: 90%;">
    <p class="mb-0">Price: $ ${event.price}</p>
        <button
          type="button"
          class="btn btn-primary button"
          onclick="location.href='./details.html'"
        >
          Details
        </button>
      </div>
    </div>
    `;

  eventContainer.appendChild(card);
}

const events = data.events;

const categories = [...new Set(events.map((event) => event.category))];

const categoryContainer = document.getElementById("index-checkbox");

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
