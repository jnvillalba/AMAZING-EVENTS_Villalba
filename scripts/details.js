const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      event: {},
    };
  },
  created() {
    this.getEvent();
  },
  methods: {
    async getEvent() {
      try {
        const response = await fetch("../data/amazing.json");
        const eventsJSON = await response.json();
        const id = new URLSearchParams(document.location.search).get("id");
        const event = eventsJSON.events.find((event) => event._id == id);
        this.event = event;
      } catch (error) {
        console.log(error);
        alert("Error");
      }
    },
  },
});

app.mount("#app");
