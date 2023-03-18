let eventsJSON;
const getEvents = async () => {
  try {
    const response = await fetch('../amazing.json')
    eventsJSON = await response.json()
    const event = eventsJSON.events.find((event) => event._id == id);
    printDetails(event);
  }
  catch (error) {
    console.log(error);
    alert('Error')
  }
}

getEvents()

const querySearch = document.location.search;

const id = new URLSearchParams(querySearch).get("id");

const containerCards = document.getElementById("details");

function printDetails(event) {
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
}