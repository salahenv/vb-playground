// class PubSub {
//     constructor() {
//         this.events = {};
//     }

//     subscribe(event, cb) {
//         if(!this.events[event]) {
//             this.events[event] = [];
//         }
//         this.events[event].push(cb)
//     }

//     unsubscribe(event, cb) {
//         if(!this.events[event]) {
//             return;
//         }
//         this.events[event] =  this.events[event].filter((callbacks) => {
//             return callbacks !== cb
//         })
//     }

//     publish(event, data) {
//         if(!this.events[event]) {
//             return;
//         }
//         this.events[event].forEach(cb => {
//             cb(data);
//         });
//     }
// }

function PubSub() {
    let events = {};
    this.subscribe = function(event, cb) {
        if(!events[event]) {
            events[event] = [];
        }
        events[event].push(cb)
    }
    this.publish = function(event, data) {
        if(!events[event]) {
            return;
        }
        events[event].forEach(cb => {
            cb(data);
        });
    }
}

export const pubsub = new PubSub();

pubsub.subscribe('click', (data) => {
    console.log('subscriber', data);
});