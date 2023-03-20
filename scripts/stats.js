//📌 Primera parte:
const table = document.querySelector('#stats-table');

const upctable = document.querySelector('#upc-table');

const pastTable = document.querySelector('#past-table');
let eventsJSON;
const getEvents = async () => {
    try {
        const response = await fetch('../amazing.json')
        eventsJSON = await response.json()
    }
    catch (error) {
        console.log(error);
        alert('Error')
    }
}

getEvents().then(() => {
    const events = eventsJSON.events;

    //📌 Primera parte:
    printStats(events)

    // 📌 Segunda parte:
    const upcomingEvents = events.filter(
        (event) => eventsJSON.currentDate <= event.date
    );
    const upcCategories = [...new Set(upcomingEvents.map((event) => event.category))];
    const upcRevenues = categoryRevenues(upcCategories, upcomingEvents);
    const upcAttendances = categoryAttendances(upcCategories, upcomingEvents);
    printStatsByCategory(upcCategories, upcRevenues, upcAttendances, upctable)

    //📌 Tercera parte:
    const pastEvents = events.filter(
        (event) => eventsJSON.currentDate >= event.date
    );
    const pastCategories = [...new Set(pastEvents.map((event) => event.category))];
    const pastRevenues = categoryRevenues(pastCategories, pastEvents);
    const pastAttendances = categoryAttendances(pastCategories, pastEvents);
    printStatsByCategory(pastCategories, pastRevenues, pastAttendances, pastTable)
});

function printStats(events) {
    const highest = eventWithHighestAttendance(events)
    const lowest = eventWithLowestAttendance(events)
    const largest = eventWithLargestCapacity(events)
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${highest.name}</td>
      <td>${lowest.name}</td>
      <td>${largest.name}</td>
      `;

    table.appendChild(fila);
};

const eventWithLargestCapacity = eventList => eventList.reduce((previousEvent, currentEvent) => previousEvent.capacity > currentEvent.capacity ? previousEvent : currentEvent);

function eventWithHighestAttendance(eventList) {
    const highestAttendanceEvent = eventList.reduce((previousEvent, currentEvent) => {
        const previousAttendancePercentage = previousEvent.assistance / previousEvent.capacity;
        const currentAttendancePercentage = currentEvent.assistance / currentEvent.capacity;
        return currentAttendancePercentage > previousAttendancePercentage ? currentEvent : previousEvent;
    });
    return highestAttendanceEvent;
}
function eventWithLowestAttendance(eventList) {
    const lowestAttendanceEvent = eventList.reduce((previousEvent, currentEvent) => {
        const previousAttendancePercentage = previousEvent.assistance / previousEvent.capacity;
        const currentAttendancePercentage = currentEvent.assistance / currentEvent.capacity;
        return currentAttendancePercentage < previousAttendancePercentage ? currentEvent : previousEvent;
    });
    return lowestAttendanceEvent;
}


//📌 Segunda parte:
function printStatsByCategory(categories, revenues, attendances, table) {

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const revenue = revenues[i];
        const attendance = attendances[i];

        const row = `
            <tr>
              <td>${category}</td>
              <td>${revenue}</td>
              <td>${attendance}%</td>
            </tr>
            `;
        table.insertAdjacentHTML('beforeend', row);
    }

}

const categoryAttendances = (categories, events) => {
    return categories.map((category) => categoryAttendance(category, events));
}

const categoryAttendance = (category, events) => {
    let totalEstimate = 0;
    let totalCapacity = 0;
    for (const event of events) {
        if (event.category === category) {
            totalEstimate += event.estimate ? event.estimate : event.assistance;
            totalCapacity += event.capacity;
        }
    }
    const percentage = (totalEstimate / totalCapacity) * 100;
    return percentage.toFixed(2);
};

const categoryRevenues = (categories, events) => {
    return categories.map((category) => categoryRevenue(category, events));
}

const categoryRevenue = (category, events) => {
    let totalRevenue = 0;
    for (const event of events) {
        if (event.category === category) {
            totalRevenue += event.price * (event.estimate ? event.estimate : event.assistance);
        }
    }
    return totalRevenue;
};


/*
 📌 Tercera parte:
>> Eventos Pasados
(Dividirlos en categorias y calcular para cada una, las ganancias totales y % total de asistencia)
*/