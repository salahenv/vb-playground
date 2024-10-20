class PubSub {
    constructor() {
        this.events = {};
    }

    subscribe(event, cb) {
        debugger
        if(!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(cb)
    }

    unsubscribe(event, cb) {
        if(!this.events[event]) {
            return;
        }
        this.events[event] =  this.events[event].filter((callbacks) => {
            return callbacks !== cb
        })
    }

    publish(event, data) {
        debugger
        if(!this.events[event]) {
            return;
        }
        this.events[event].forEach(cb => {
            cb(data);
        });
    }
}

export const pubsub = new PubSub();

pubsub.subscribe('click', (data) => {
    console.log('subscriber', data);
});