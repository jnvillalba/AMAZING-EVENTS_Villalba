
const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            highest: {},
            lowest: {},
            largest: {},
        };
    },
    mounted() {
        this.getEvents();
    },
    methods: {
        async getEvents() {
            try {
                const response = await fetch("../data/amazing.json");
                const eventsJSON = await response.json();
                console.log(eventsJSON);
                this.highest = this.eventWithHighestAttendance(eventsJSON.events)
                
                this.lowest = this.eventWithLowestAttendance(eventsJSON.events)
                this.largest = this.eventWithLargestCapacity(eventsJSON.events)
            } catch (error) {
                console.log(error);
                alert("Error");
            }
        },

        eventWithLargestCapacity(eventList) {
            return eventList.reduce((previousEvent, currentEvent) => previousEvent.capacity > currentEvent.capacity ? previousEvent : currentEvent);
        },
        eventWithHighestAttendance(eventList) {
            const highestAttendanceEvent = eventList.reduce((previousEvent, currentEvent) => {
                const previousAttendancePercentage = (previousEvent.estimate ? previousEvent.estimate : previousEvent.assistance / previousEvent.capacity) * 100;
                const currentAttendancePercentage = (currentEvent.estimate ? currentEvent.estimate : currentEvent.assistance / currentEvent.capacity) * 100;
                return currentAttendancePercentage > previousAttendancePercentage ? currentEvent : previousEvent;
            });
            return highestAttendanceEvent;
        },

        eventWithLowestAttendance(eventList) {
            const lowestAttendanceEvent = eventList.reduce((previousEvent, currentEvent) => {
                const previousAttendancePercentage = previousEvent.estimate ? previousEvent.estimate : previousEvent.assistance / previousEvent.capacity * 100;
                const currentAttendancePercentage = currentEvent.estimate ? currentEvent.estimate : currentEvent.assistance / currentEvent.capacity * 100;
                return currentAttendancePercentage < previousAttendancePercentage ? currentEvent : previousEvent;
            });
            return lowestAttendanceEvent;
        }


    },
}).mount("#app");


