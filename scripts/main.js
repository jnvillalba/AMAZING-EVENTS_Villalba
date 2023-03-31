const { createApp } = Vue

const app = createApp({
    data() {
        return {
            apiUrl: "https://mindhub-xj03.onrender.com/api/amazing",
            events: [],
            categories: [],
            eventsToShow: [],
            checkedCategories: [],
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
                    this.eventsToShow = this.events
                    this.getCategories()
                })
                .catch(error => console.log(error))
        },

        getCategories() {
            this.categories = [...new Set(this.events.map((event) => event.category))];
        },


    },
    computed: {
        filterEvents() {
            if (this.checkedCategories.length === 0) {
                this.eventsToShow = this.events;
            } else {
                this.eventsToShow = this.events.filter((event) =>
                    this.checkedCategories.includes(event.category)
                );
            }
        },
    }
}).mount('#app')