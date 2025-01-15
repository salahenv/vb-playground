const sendEvent = (value, count) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            count === 5 ?
            reject('Failed to sent ' + value) : resolve('Analytics sent ' + value)
        }, 1000);
    });
}

function Analytics () {

    let events = [];
    let count = 1;

    this.logEvent = function (event) {
        events.push(event);
    }

    this.send = async function () {
        const event = events.shift();
        if(!event) {
            console.log('all sent');
            return;
        }
        try {
            const res = await sendEvent(event, count);
            console.log(res);
            count = count + 1;
            this.send();
        } catch (error) {
            console.log(error);
            count = 1;
            events.unshift(event);
            console.log('Retrying sending ' + event);
            this.send();
        }
    }
}

function SDK () {
    SDK.instance;
    const getInstance = function () {
        debugger
        if(!SDK.instance) {
            SDK.instance = new Analytics();
        }
        return SDK.instance
    }

    return {
        getInstance: getInstance
    }
}



const sdk = new SDK();
const sdk2 = new SDK();
console.log(sdk.getInstance() === sdk2.getInstance());

// export default sdk;

// sdk.logEvent("event 1");
// sdk.logEvent("event 2");
// sdk.logEvent("event 3");
// sdk.logEvent("event 4");
// sdk.logEvent("event 5");
// sdk.logEvent("event 6");
// sdk.logEvent("event 7");
// sdk.logEvent("event 8");

// sdk.send();

// sdk2.logEvent("event 9");
// sdk2.logEvent("event 10");
