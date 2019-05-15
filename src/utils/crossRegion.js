let currentRegion = '';
let crossRegionRequest = '';

function getRegion() {

    return crossRegionRequest;
}

function setRegion(region) {
    currentRegion = region;
    if (currentRegion === '') {
        crossRegionRequest = '';
    } else {
        crossRegionRequest = "?region=" + currentRegion;
    }
}

export { getRegion, setRegion };