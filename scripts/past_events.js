/************************* Cards ************************/
let eventsJSON;
const getEvents = async () => {
  try {
    const response = await fetch(' ../data/amazing.json')
    eventsJSON = await response.json()
    const pastEvents = eventsJSON.events.filter(
      (event) => eventsJSON.currentDate >= event.date
    );
    console.log("pastEvents " + pastEvents.length);
    printCards(pastEvents);
    const categories = [...new Set(eventsJSON.events.map((event) => event.category))];
    printCheckboxs(categories, pastEvents);
    printSearch(pastEvents);
  }
  catch (error) {
    console.log(error);
    alert('Error')
  }
}

getEvents()

let eventContainer = document.getElementById("past-cards");

function createEventCard(event) {
  const card = document.createElement("div");
  card.classList.add(
    "card",
    "d-flex",
    "flex-column",
    "align-items-center",
    "mx-2",
    "my-2"
  );
  card.style.width = "18rem";
  card.style.height = "25rem";
  card.innerHTML = `
      <img class="card-img-top" src="${event.image}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <div class="d-flex justify-content-between align-items-center px-1 pt-4 pb-3" style="position: absolute; bottom: 0; width: 90%;">
          <p class="mb-0">Price: $ ${event.price}</p>
          <button type="button" class="btn btn-primary button" onclick="location.href='./details.html?id=${event._id}'">Details</button>
        </div>
      </div>
    `;
  return card;
}

function printCards(events) {
  for (const event of events) {
    const card = createEventCard(event);
    eventContainer.appendChild(card);
  }
}
/************************* Checkbox ************************/

function printCheckboxs(categories, events) {
  const categoryContainer = document.getElementById("checkboxs");

  categories.forEach((category) => {
    const label = document.createElement("label");
    label.textContent = category;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = category;
    checkbox.value = category;

    label.setAttribute("for", checkbox.id);

    checkbox.addEventListener("click", () => {
      const checkedCategories = Array.from(
        categoryContainer.querySelectorAll('input[type="checkbox"]:checked')
      ).map((checkbox) => checkbox.value);
      let filteredEvents = [];
      if (checkedCategories.length === 0) {
        filteredEvents = events;
      } else {
        filteredEvents = events.filter((event) =>
          checkedCategories.includes(event.category)
        );
      }
      showEvents(filteredEvents);
    });

    categoryContainer.appendChild(checkbox);
    categoryContainer.appendChild(label);
  });
}

function showEvents(events) {
  const eventsList = document.getElementById("past-cards");
  eventsList.innerHTML = "";
  events.forEach((event) => {
    let card = createEventCard(event);
    eventsList.appendChild(card);
  });

}

/************************* Search ************************/

function printSearch(events) {
  const searchInput = document.getElementById("past-form1");

  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.trim().toLowerCase();
    const checkedCategories = Array.from(
      document.querySelectorAll('input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.value);

    let filteredEvents = [];

    if (checkedCategories.length === 0) {
      filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes(searchValue)
      );
    } else {
      filteredEvents = events.filter(
        (event) =>
          checkedCategories.includes(event.category) &&
          event.name.toLowerCase().includes(searchValue)
      );
    }

    if (filteredEvents.length === 0) {
      document.getElementById("past-cards").innerHTML =
        "<h5 style='color: white;'>No se encontraron eventos que coincidan con la búsqueda.</h5>";
    } else {
      showEvents(filteredEvents);
    }
  });
}

