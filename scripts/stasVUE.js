
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
                //📌 Primera parte:
                this.printStats(eventsJSON.events)

                // 📌 Segunda parte:

            } catch (error) {
                console.log(error);
                alert("Error");
            }
        },

        //📌 Primera parte:

        printStats(events) {
            this.highest = this.eventWithHighestAttendance(events)
            this.lowest = this.eventWithLowestAttendance(events)
            this.largest = this.eventWithLargestCapacity(events)
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
        },
        
    }

}).mount("#app");


