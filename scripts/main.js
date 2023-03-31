const { createApp } = Vue

const app = createApp({
    data() {
        return {
            apiUrl: "https://mindhub-xj03.onrender.com/api/amazing",
            events: [],
            categories: [],
            eventsToshow: [],
        }
    },

    created() {
        this.getEvents()
        //this.printCheckboxs(this.categories, this.events);
        //this.printSearch(this.events);
    },
    mounted() {

    },
    methods: {
        getEvents() {
            fetch(this.apiUrl)
                .then(response => response.json())
                .then(dataEvents => {
                    this.events = dataEvents.events
                    this.eventsToshow = this.events
                    this.getCategories()
                })
                .catch(error => console.log(error))
        },

        getCategories() {
            this.categories = [...new Set(this.events.map((event) => event.category))];
        },

    },
    computed: {
        superFiltro() {

        }
    }
}).mount('#app')