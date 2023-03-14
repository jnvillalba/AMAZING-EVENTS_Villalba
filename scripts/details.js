const events = data.events;

const querySearch = document.location.search;

const id = new URLSearchParams(querySearch).get("id");

const event = events.find((event) => event._id == id);

const containerCards = document.getElementById("details");

containerCards.innerHTML = ` 
    <article class="cta my-5 mx-3 ">
          <img src="${event.image}" alt="${event.name}" />
          <div class="cta__text-column">
            <h2>${event.name}</h2>
            <p>${event.description}</p>
            <p>Date: ${event.date}</p>
            <p>Place: ${event.place}</p>
            <p>Price: ${event.price}</p>
          </div>
        </article>

        
`;
