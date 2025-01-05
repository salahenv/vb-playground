function PubSub() {
  let subscriptionList = new Map();
  let subscriptionOnceList = new Map();
  let subscriptionOnceAsyncList = new Map();

  this.subscribe = function (event, cb) {
    if (!subscriptionList.has(event)) {
      subscriptionList.set(event, [cb]);
    } else {
      const existingCb = subscriptionList.get(event);
      subscriptionList.set(event, [...existingCb, cb]);
    }
    return {
        unsubscribe: function() {
            const filteredCb = subscriptionList.get(event).filter((existingCb) => existingCb !== cb);
            subscriptionList.set(event, filteredCb);
        }
    }
  };

  this.subscribeOnce = function (event, cb) {
    if (!subscriptionOnceList.has(event)) {
      subscriptionOnceList.set(event, [cb]);
    } else {
      const existingCb = subscriptionOnceList.get(event);
      subscriptionOnceList.set(event, [...existingCb, cb]);
    }
  };

  this.subscribeAsyncOnce = function (event) {
    return new Promise((resolve, reject) => {
      if (!subscriptionOnceAsyncList.has(event)) {
        subscriptionOnceAsyncList.set(event, [resolve]);
      } else {
        const existingResolve = subscriptionOnceAsyncList.get(event);
        subscriptionOnceAsyncList.set(event, [...existingResolve, resolve]);
      }
    });
  };

  this.publish = function (event, data) {
    if (subscriptionList.has(event)) {
      subscriptionList.get(event).forEach((cb) => {
        cb(data);
      });
    }
    //
    if (subscriptionOnceList.has(event)) {
      subscriptionOnceList.get(event).forEach((cb) => {
        cb(data);
      });
      subscriptionOnceList.delete(event);
    }
    //
    if (subscriptionOnceAsyncList.has(event)) {
        subscriptionOnceAsyncList.get(event).forEach((cb) => {
            setTimeout(() => cb(data), 1000);
        });
        subscriptionOnceAsyncList.delete(event);
      }
  };
  this.publishAll = function (data) {
    for (let subs of subscriptionList) {
      const [event, cbs] = subs;
      cbs.forEach((cb) => {
        cb(data);
      });
    }
  };
}

const pubsub = new PubSub();

const s1 = pubsub.subscribe("click", (data) => {
  console.log("click" + " subscriber 1", data);
});


pubsub.subscribe("click", (data) => {
  console.log("click" + " subscriber 2", data);
});

// pubsub.subscribe("change", (data) => {
//   console.log("change" + " subscriber 1", data);
// });

//

// pubsub.subscribeOnce("click", (data) => {
//   console.log("click" + " subscriber once", data);
// });

//

// pubsub.subscribeAsyncOnce("click").then((data) => {
//   console.log("click" + " subscriber once async", data);
// });

// pubsub.subscribeAsyncOnce("click").then((data) => {
//     console.log("click" + " subscriber once async 2", data);
// });

pubsub.publish("click", "-");
s1.unsubscribe();
pubsub.publish("click", "-");
// pubsub.publish("click", "-");
// pubsub.publish("change", "1");
// console.log("============================");
// pubsub.publishAll("all");
// console.log("============================");
