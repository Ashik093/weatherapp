export const convertDateFormat = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    });
}

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                function(error) {
                    hideLoader()
                    reject(error);
                }
            );
        } else {
            hideLoader()
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });

}

export const hideLoader = () => {
    var loaderStart = document.querySelector('.loaderStart');
    var waetherCard = document.querySelector('.weather-card');
    loaderStart.classList.remove('loading');
    waetherCard.classList.remove('d-none');
}

export const showLoader = () => {
    var loaderStart = document.querySelector('.loaderStart');
    var waetherCard = document.querySelector('.weather-card');
    loaderStart.classList.add('loading');
    waetherCard.classList.add('d-none');
}

export const showNoDataCard = () => {
    var noDataCard = document.querySelector('.no-data-card');
    var dataCard = document.querySelector('.data-card');
    noDataCard.classList.remove('d-none');
    dataCard.classList.add('d-none');
}
export const showDataCard = () => {
    var noDataCard = document.querySelector('.no-data-card');
    var dataCard = document.querySelector('.data-card');
    noDataCard.classList.add('d-none');
    dataCard.classList.remove('d-none');
}