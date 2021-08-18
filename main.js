// Step 1: Select all the required DOM elements

let container = document.getElementById('container')
let count = document.getElementById('count')
let total = document.getElementById('total')
let ticketPrice = document.getElementById('options').value
let selectMovie = document.getElementById('options');
let seats = document.querySelectorAll('.row .seat:not(.occupied)')


// Step 2: Create the Required Functions

const saveMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)

}


// Update the count and price spans
const updateText = () => {
    let selectedSeats = document.querySelectorAll('.row .seat.selected')

    const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat))
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex))

    let number = +(selectedSeats.length)
    count.innerText = number
    total.innerText = number * ticketPrice

}

// Get data from localStorage and populate the UI

let populateUI = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if (selectedMovieIndex !== null) {
        selectMovie.selectedIndex = selectedMovieIndex
    }


}





// Step 3: Add the Required event listeners
populateUI()
updateText()


container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateText();
    }
})


// On changing the movie

selectMovie.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    saveMovieData(e.target.selectedIndex, e.target.value)
    updateText()
})

// Initial count and total
