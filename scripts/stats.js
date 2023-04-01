const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      highest: {},
      lowest: {},
      largest: {},
      eventsJSON: null,
      upcomingEventsStats: null,
      pastEventsStats: null,
    };
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      try {
        const response = await fetch("../data/amazing.json");
        this.eventsJSON = await response.json();
        console.log(this.eventsJSON);
        //📌 Primera parte:
        this.printStats(this.eventsJSON.events);

        // 📌 Segunda y Tercera parte:
        this.computeStats();

      } catch (error) {
        console.log(error);
        alert("Error");
      }
    },

    //📌 Primera parte:

    printStats(events) {
      this.highest = this.eventWithHighestAttendance(events);
      this.lowest = this.eventWithLowestAttendance(events);
      this.largest = this.eventWithLargestCapacity(events);
    },

    eventWithLargestCapacity(eventList) {
      return eventList.reduce((previousEvent, currentEvent) =>
        previousEvent.capacity > currentEvent.capacity
          ? previousEvent
          : currentEvent
      );
    },
    eventWithHighestAttendance(eventList) {
      const highestAttendanceEvent = eventList.reduce(
        (previousEvent, currentEvent) => {
          const previousAttendancePercentage =
            (previousEvent.estimate
              ? previousEvent.estimate
              : previousEvent.assistance / previousEvent.capacity) * 100;
          const currentAttendancePercentage =
            (currentEvent.estimate
              ? currentEvent.estimate
              : currentEvent.assistance / currentEvent.capacity) * 100;
          return currentAttendancePercentage > previousAttendancePercentage
            ? currentEvent
            : previousEvent;
        }
      );
      return highestAttendanceEvent;
    },

    eventWithLowestAttendance(eventList) {
      const lowestAttendanceEvent = eventList.reduce(
        (previousEvent, currentEvent) => {
          const previousAttendancePercentage = previousEvent.estimate
            ? previousEvent.estimate
            : (previousEvent.assistance / previousEvent.capacity) * 100;
          const currentAttendancePercentage = currentEvent.estimate
            ? currentEvent.estimate
            : (currentEvent.assistance / currentEvent.capacity) * 100;
          return currentAttendancePercentage < previousAttendancePercentage
            ? currentEvent
            : previousEvent;
        }
      );
      return lowestAttendanceEvent;
    },

    printEventsStatsByCategory(events, table) {
      this.categories = [...new Set(events.map((event) => event.category))];
      this.revenues = this.categoryRevenues(this.categories, events);
      this.attendances = this.categoryAttendances(this.categories, events);
      this.printStatsByCategory(
        this.categories,
        this.revenues,
        this.attendances,
        table
      );
    },

    // 📌 Segunda y Tercera parte:
    computeStats() {
      const events = this.eventsJSON.events;

      this.upcomingEventsStats = this.printEventsStatsByCategory(
        events.filter((event) => this.eventsJSON.currentDate <= event.date)
      );
      this.pastEventsStats = this.printEventsStatsByCategory(
        events.filter((event) => this.eventsJSON.currentDate >= event.date)
      );
    },
    printEventsStatsByCategory(events) {
      const categories = [...new Set(events.map((event) => event.category))];
      const revenues = this.categoryRevenues(categories, events);
      const attendances = this.categoryAttendances(categories, events);
      return this.printStatsByCategory(categories, revenues, attendances);
    },
    printStatsByCategory(categories, revenues, attendances) {
      const categoryStats = [];
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const revenue = revenues[i];
        const attendance = attendances[i];
        categoryStats.push({
          category,
          revenue,
          attendance,
        });
      }
      return categoryStats;
    },
    categoryAttendances(categories, events) {
      return categories.map((category) =>
        this.categoryAttendance(category, events)
      );
    },
    categoryAttendance(category, events) {
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
    },
    categoryRevenues(categories, events) {
      return categories.map((category) =>
        this.categoryRevenue(category, events)
      );
    },
    categoryRevenue(category, events) {
      let totalRevenue = 0;
      for (const event of events) {
        if (event.category === category) {
          totalRevenue +=
            event.price * (event.estimate ? event.estimate : event.assistance);
        }
      }
      return totalRevenue;
    },
  },
}).mount("#app");
