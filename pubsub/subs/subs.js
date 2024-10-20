import { pubsub } from "../index.js";

pubsub.subscribe('click', (data) => {
    console.log('subscriber', data);
});

pubsub.publish('click', {name: 'Salah'});