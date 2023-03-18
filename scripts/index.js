
let eventsJSON;
const getEvents = async () => {
  try {
    const response = await fetch('../amazing.json')
    eventsJSON = await response.json()
    console.log(eventsJSON);
    printCards(eventsJSON.events);
  }
  catch (error) {
    console.log(error);
    alert('Error')
  }
}

getEvents()

/************************* Cards ************************/

let eventContainer = document.getElementById("index-cards");

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

/************************* Search ************************/

const searchInput = document.querySelector("#form1");
const searchResults = document.querySelector("#search-results");
function updateSearchResults() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredEvents = data.events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm)
  );

  let resultsHtml = "";
  filteredEvents.forEach((event) => {
    resultsHtml += `
      <div class="search-result" data-label="${event.name}" onclick="location.href='./details.html?id=${event._id}'">
        <h3>${event.name}</h3>
        <p>${event.date} at ${event.place}</p>
      </div>
    `;
  });

  if (searchTerm === "") {
    searchResults.style.display = "none";
    showEvents(data.events)
  } else if (filteredEvents.length > 0) {
    searchResults.style.display = "block";
    searchResults.innerHTML = resultsHtml;
    showEvents(filteredEvents);
  } else {
    searchResults.style.display = "none";
  }

  const resultDivs = document.querySelectorAll(".search-result");
  resultDivs.forEach((div) => {
    div.addEventListener("click", () => {
      const label = div.getAttribute("data-label");
      searchInput.value = label;
      searchResults.innerHTML = "";
      searchResults.style.display = "none";
    });
  });
}

searchInput.addEventListener("input", updateSearchResults);

/************************* Checkbox ************************/
const eventsChecks = data.events;

const categories = [...new Set(eventsChecks.map((event) => event.category))];
//console.log(categories)
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
      filteredEvents = eventsChecks;
    } else {
      filteredEvents = eventsChecks.filter((event) =>
        checkedCategories.includes(event.category)
      );
    }
    showEvents(filteredEvents);
  });

  categoryContainer.appendChild(checkbox);
  categoryContainer.appendChild(label);
});

function showEvents(events) {
  const eventsList = document.getElementById("index-cards");
  eventsList.innerHTML = "";
  events.forEach((event) => {
    let card = createEventCard(event);
    eventsList.appendChild(card);
  });

}
