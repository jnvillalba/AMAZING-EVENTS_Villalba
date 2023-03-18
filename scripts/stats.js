/*
📌 Primera parte:
>> Todos los eventos
(Evento con el mayor % de asistencia, 
    Evento con menor % de asistencia, 
    Evento con mayor capacidad)
*/

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
    const highest = eventWithHighestAttendance(events)
    const lowest = eventWithLowestAttendance(events)
    const largest = eventWithLargestCapacity(events)
    highestAttendanceEvent.textContent = highest.name;
    lowestAttendanceEvent.textContent = lowest.name;
    largestCapacityEvent.textContent = largest.name;
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
/*
 📌 Segunda parte:
>> Eventos Futuros
(Dividirlos en categorias y calcular para cada una, las ganancias totales y % total de asistencia;
     tener en cuenta que estos eventos tienen estimado, porque son futuros)

 📌 Tercera parte:
>> Eventos Pasados
(Dividirlos en categorias y calcular para cada una, las ganancias totales y % total de asistencia)
*/