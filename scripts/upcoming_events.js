console.log("upcoming");

let eventContainer = document.getElementById("upcoming-cards");

for (let i = 0; i < data.events.length; i++) {
  if (data.currentDate <= data.events[i].date) {
    let card = document.createElement("div");
    card.className = "card d-flex flex-column align-items-center mx-2 my-2";
    card.style = "width: 18rem; height: 25rem";
    card.innerHTML = `
    <img
      class="card-img-top"
      src="${data.events[i].image}"
      alt="Card image cap"
    />
    <div class="card-body">
      <h5 class="card-title">${data.events[i].name}</h5>
      <p class="card-text">${data.events[i].description}</p>
    
      <div class="d-flex justify-content-between align-items-center px-1 pt-4 pb-3" style="position: absolute; bottom: 0; width: 90%;">
    <p class="mb-0">Price: $ ${data.events[i].price}</p>
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
}
