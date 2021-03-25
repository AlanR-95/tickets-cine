const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');


// PopulateUI
populateUI();

let ticketPrice = +movieSelect.value; /*convertirlo de string a int*/

// Almacenar el index de la película actual y el precio
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}



// Actualizar el total y la cantidad
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    
    // Copiando los seats seleccionados en un array "[...selectedSeats]"
    // map a traves del array obteniendo los índices de los seats y devolver un nuevo array de índices seleccionados
    
    const seatsIndex = [...selectedSeats].map(function(seat){
        return[...seats].indexOf(seat)

    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}


// Obteniendo la informacion del almacenamiento local y mostrándolo en la UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    // chequeando que no este vacio selectedSeats
    // volviendo a poner como 'selected' los asientos guardados
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
          if (selectedSeats.indexOf(index) > -1) {
            seat.classList.add('selected');
          }
        });
    }
    
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Event: Cambio de selección de película
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Event: Click al seleccionar un asiento
container.addEventListener('click', e => {
    if (
      e.target.classList.contains('seat') &&
      !e.target.classList.contains('occupied')
    ) {
      e.target.classList.toggle('selected');
  
      updateSelectedCount();
    }
});

// Actualizando los asientos seleccionados y el costo de forma continua
updateSelectedCount();

