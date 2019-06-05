window.onload = init()

function init() {

    let httpRequest

    function makeRequest(event) {
        event.preventDefault()
        httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            alert("Sorry Babe, Cannot Get HTTP")
        }

        httpRequest.onreadystatechange = processContent
        httpRequest.open("GET", "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
        httpRequest.send()
    }
    console.log("hi")
    function processContent() {
        if (httpRequest.readyState === httpRequest.DONE) {
            let data = httpRequest.responseText

            if (data) {
                data = JSON.parse(data)
                if (data.result) displayContent(data.result)
            } else {
                alert("please try again")
            }
        }
    }

    function displayContent(data) {
        const horo = document.querySelector('.horoscope')

        horo.innerHTML = data;
    }

    makeRequest()
}
