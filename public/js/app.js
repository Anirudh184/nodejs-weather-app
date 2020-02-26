

const element = document.querySelector('#location');

document.querySelector('#locationForm').addEventListener('submit', (event) => {
    event.preventDefault();

    fetch('/get-weather?location=' + element.value).then(response => {
    response.json().then(({forecast, location, address} = {}) => {
        console.log(forecast)
        console.log(location)
        console.log(address)
    })
});

});