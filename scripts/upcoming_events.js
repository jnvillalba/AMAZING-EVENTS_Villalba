console.log("upcoming");

let eventContainer = document.getElementById("upcoming-cards");
const upcomingEvents = data.events.filter(
  (event) => data.currentDate <= event.date
);

for (const event of upcomingEvents) {
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
          <button type="button" class="btn btn-primary button" onclick="location.href='./details.html'">Details</button>
        </div>
      </div>
    `;

  eventContainer.appendChild(card);
}
