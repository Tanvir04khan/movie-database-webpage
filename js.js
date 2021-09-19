const noBtn = btns.firstElementChild;
let noBtnClicked;

function noBtnEventListener() {
  noBtn.addEventListener("click", clone);
  noBtnClicked = true;
  return noBtnClicked;
}
