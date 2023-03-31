const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      apiUrl: "https://mindhub-xj03.onrender.com/api/amazing",
      events: [],
      categories: [],
      eventsToShow: [],
      checkedCategories: [],
      searchValue: "",
    };
  },

  created() {
    this.getEvents();
  },
  mounted() {},
  methods: {
    getEvents() {
      fetch(this.apiUrl)
        .then((response) => response.json())
        .then((dataEvents) => {
          this.events = dataEvents.events.filter(
            (event) => dataEvents.currentDate <= event.date
          );
          this.eventsToShow = this.events;
          this.categories = [
            ...new Set(dataEvents.events.map((event) => event.category)),
          ];
        })
        .catch((error) => console.log(error));
    },
  },
  computed: {
    filterEvents() {
      if (this.checkedCategories.length === 0) {
        this.eventsToShow = this.events.filter((event) =>
          event.name.toLowerCase().includes(this.searchValue)
        );
      } else {
        this.eventsToShow = this.events.filter(
          (event) =>
            this.checkedCategories.includes(event.category) &&
            event.name.toLowerCase().includes(this.searchValue)
        );
      }
    },
  },
}).mount("#app");
