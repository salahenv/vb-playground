const featureStates = {
    feature1: true,
    feature2: true,
}

function getFeatureFlags() {
    console.log('FROM BACKEND');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(featureStates);
        }, 100)
    })
}

const MAX_TTL = 10000;

const Cache = {
    featureFlags: {},
    time: null,
    isFetching: false,
    promise: null
}

async function getFeatureState(featureName, defaultValue) {

    isCacheExist = Object.keys(Cache.featureFlags).length;
    isCacheIsValid = Date.now() - Cache.time <= MAX_TTL;

    if(isCacheExist && isCacheIsValid) {
        console.log('FROM CACHE');
        if(Cache.featureFlags.hasOwnProperty(featureName)) {
            const featureState = Cache.featureFlags[featureName];
            return Promise.resolve(featureState);
        }
        return  Promise.resolve(defaultValue);
    }

    if(Cache.isFetching) {
        console.log('WATING...for cache creation');
        await Cache.promise;
        return Cache.featureFlags.hasOwnProperty(featureName)
            ? Cache.featureFlags[featureName]
            : defaultValue;
    }

    Cache.isFetching = true;
    // const featureFlags = await getFeatureFlags();
    const promise = getFeatureFlags().then((featureFlags) => {
        Cache.isFetching = false;
        Cache.promise = null
        Cache.featureFlags = featureFlags;
        Cache.time = Date.now();
    });

    if(Cache.featureFlags.hasOwnProperty(featureName)) {
        const featureState = Cache.featureFlags[featureName];
        return featureState;
    }
    return defaultValue;
}

getFeatureState('feature1', false).then((value) => {
    console.log('feature1', value);
});

setTimeout(() => {
    getFeatureState('feature2', false).then((value) => {
        console.log('feature2', value);
    });
}, 1000)


getFeatureState('feature3', true).then((value) => {
    console.log('feature3', value);
});