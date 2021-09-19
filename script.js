const movieModal = document.getElementById("add-modal");
const addMovieBtn = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelBtn = movieModal.lastElementChild.firstElementChild;
const usrInputs = movieModal.querySelectorAll("input");
const addBtn = cancelBtn.nextElementSibling;
const entryText = document.getElementById("entry-text");
const movieList = entryText.nextElementSibling;
const confirmation = document.getElementById("delete-modal");
const btns = confirmation.lastElementChild;

const movies = [];

function uiHandler() {
  if (movies.length === 0) {
    entryText.style.display = "block";
  } else {
    entryText.style.display = "none";
  }
}

if (movies.length) {
  movies.forEach((movie) => {
    const { id, title, imageUrl, rating } = movie;
    renderMovie(id, title, imageUrl, rating);
  });
}
function toggleBackdrop() {
  backdrop.classList.toggle("visible");
}

function toggleMovieModal() {
  movieModal.classList.toggle("visible");
  toggleBackdrop();
}

function backdropClickHandler() {
  if (movieModal.className === "modal card visible") {
    toggleMovieModal();
  } else if (confirmation.className === "modal card visible") {
    openMovieRemoveModal();
  }

  clearInput();
}

function clearInput() {
  for (const usrInput of usrInputs) {
    usrInput.value = "";
  }
}

function renderMovie(id, title, imageUrl, rating) {
  const movieElement = document.createElement("li");
  movieElement.className = "movie-element";
  movieElement.innerHTML = `
  <div class="movie-img">
  <img src="${imageUrl}" alt="${title}" width="200px;" height="200px;">
  </div>
  <div class="movie-info">
  <h2>${title}</h2>
  <p>${rating}/5 stars</p>
  </div>
  `;
  movieList.appendChild(movieElement);

  movieElement.addEventListener("click", clone.bind(null, id));

  uiHandler();
}

function getMovieInd(id) {
  let movieInd = 0;
  for (const movie of movies) {
    if (movie.id === id) {
      break;
    }
    movieInd++;
  }
  console.log(movieInd);

  return movieInd;
}

function removeConfirmation(id) {
  const removeMovieId = getMovieInd(id);
  movies.splice(removeMovieId, 1);
  console.log(movies);
  movieList.children[removeMovieId]?.remove();
  openMovieRemoveModal();
  uiHandler();
}

function cancelMovieHandler() {
  toggleMovieModal();
  clearInput();
}

function startDeleteModalHandler(id) {
  let confirmationBtn = document.querySelector("#yes-btn");
  console.log(confirmationBtn);
  const cnclBtn = document.getElementById("no-btn");
  confirmationBtn.replaceWith(confirmationBtn.cloneNode(true));
  confirmationBtn = document.querySelector("#yes-btn");
  cnclBtn.removeEventListener("click", openMovieRemoveModal);
  confirmationBtn.addEventListener("click", removeConfirmation.bind(null, id));
  cnclBtn.addEventListener("click", openMovieRemoveModal);
}

function openMovieRemoveModal() {
  confirmation.classList.toggle("visible");
  toggleBackdrop();
}

function clone(id) {
  confirmation.classList.toggle("visible");
  toggleBackdrop();
  startDeleteModalHandler(id);
}

function addMovieHandler() {
  const title = usrInputs[0].value;
  const imgUrl = usrInputs[1].value;
  const rating = usrInputs[2].value;

  if (
    title.trim() === "" ||
    imgUrl.trim() === "" ||
    rating.trim() === "" ||
    rating < 1 ||
    rating > 5
  ) {
    alert("Please enter valid values, (rating should be in between 1 to 5).");
    return;
  }

  let newMovies = {
    id: Math.random(),
    title: title,
    imageUrl: imgUrl,
    rating: rating,
  };

  movies.push(newMovies);
  console.log(movies);
  renderMovie(
    newMovies.id,
    newMovies.title,
    newMovies.imageUrl,
    newMovies.rating
  );
  toggleMovieModal();
  clearInput();
}

addMovieBtn.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelBtn.addEventListener("click", cancelMovieHandler);
addBtn.addEventListener("click", addMovieHandler);
