window.onload = init()

function init() {

    let httpRequest

    function makeRequest(event) {
        
        httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            alert("Sorry, Cannot Get HTTP")
        }

        httpRequest.onreadystatechange = processContent
        httpRequest.open("GET", "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
        httpRequest.send()
    }
    
    function processContent() {
        if (httpRequest.readyState === httpRequest.DONE) {
            let data = httpRequest.responseText

            if (data) {
                data = JSON.parse(data)
                if (data) displayContent(data)
            } else {
                alert("please try again")
            }
        }
    }

    function displayContent(items) {
        let disp = document.querySelector('.horoscope > .card')
        let display = ``
        console.log(items[0])
        // items.forEach(item => display.push(item))
        for (let item in items){
                console.log(items[item]["name"])
                display += `<div class="card mb-4 shadow-sm">
                                <div class="card-header">
                                    <h4 class="my-0 font-weight-normal"> ${items[item]["name"]} </h4>
                                </div>
                                <div class="card-body">
                                    <h1 class="card-title pricing-card-title">Price ${items[item]["price"]}</h1>
                                </div>
                                <div class="card-body">
                                    <h1 class="card-title pricing-card-title">Rating ${items[item]["rating"]}</h1>
                                </div>
                            </div>`
        }

        disp.innerHTML = display;
    }

    makeRequest()
}
