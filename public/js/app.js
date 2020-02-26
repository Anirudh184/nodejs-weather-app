

const element = document.querySelector('#location');

document.querySelector('#locationForm').addEventListener('submit', (event) => {
    event.preventDefault();
    document.querySelector('#error').innerHTML = '';
    document.querySelector('#result .location').innerHTML= '';
    document.querySelector('#result .summary').innerHTML= '';

    fetch('/get-weather?location=' + element.value).then(response => {
    response.json().then((result) => {
        if(result.error) {
            document.querySelector('#error').innerHTML= result.error;
            return;
        } 

        document.querySelector('#result .location').innerHTML= result.location;
        document.querySelector('#result .summary').innerHTML= result.forecast;
    })  
});

});