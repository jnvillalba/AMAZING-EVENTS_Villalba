//📌 Primera parte:
const highestAttendanceEvent = document.querySelector('#highestAttendance');
const lowestAttendanceEvent = document.querySelector('#lowestAttendance');
const largestCapacityEvent = document.querySelector('#largestCapacity');

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
    const highest = eventWithHighestAttendance(events)
    const lowest = eventWithLowestAttendance(events)
    const largest = eventWithLargestCapacity(events)
    highestAttendanceEvent.textContent = highest.name;
    lowestAttendanceEvent.textContent = lowest.name;
    largestCapacityEvent.textContent = largest.name;

    // 📌 Segunda parte:
    const upcomingEvents = events.filter(
        (event) => eventsJSON.currentDate <= event.date
    );
    const categories = [...new Set(upcomingEvents.map((event) => event.category))];
    const revenues = categoryRevenues(categories, upcomingEvents);
    const attendance = categoryAttendances(categories, upcomingEvents);
    printUpcomingStats(categories, revenues, attendance)
});

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
function printUpcomingStats(categories, revenues, attendance) {
    const tbody = document.querySelector('table.container tbody');
    //cambiar a tablas diferentes
    const upcomingHeader = document.querySelector('table.container tr:nth-of-type(4)');

    for (let i = 0; i < categories.length; i++) {
        const tr = document.createElement('tr');
        const tdCategory = document.createElement('td');
        const tdRevenues = document.createElement('td');
        const tdAttendance = document.createElement('td');

        tdCategory.textContent = categories[i];
        tdRevenues.textContent = revenues[i];
        tdAttendance.textContent = attendance[i] + " %";

        tr.appendChild(tdCategory);
        tr.appendChild(tdRevenues);
        tr.appendChild(tdAttendance);

        tbody.insertBefore(tr, upcomingHeader.nextElementSibling);
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
            totalEstimate += event.estimate;
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
            totalRevenue += event.price * event.estimate;
        }
    }
    return totalRevenue;
};


/*
 📌 Tercera parte:
>> Eventos Pasados
(Dividirlos en categorias y calcular para cada una, las ganancias totales y % total de asistencia)
*/