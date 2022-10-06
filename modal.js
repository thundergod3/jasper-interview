const state = {
  isDragging: false,
  isHidden: true,
  xDiff: 0,
  yDiff: 0,
  x: 50,
  y: 50,
};

function ready(fn) {
  if (
    document.attachEvent
      ? document.readyState === "complete"
      : document.readyState !== "loading"
  ) {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function renderModal(modal, myState) {
  const modalOverlay = document.querySelectorAll(".modal-overlay");

  if (state.isHidden) {
    modal.style.visibility = "hidden";
    modal.style.opacity = 0;
    modal.classList.add("closing");
    modal.classList.remove("opening");
    modalOverlay[0].classList.add("closing");
    modalOverlay[0].classList.remove("opening");
  } else {
    modal.style.visibility = "visible";
    modal.style.opacity = 1;
    modal.classList.add("opening");
    modal.classList.remove("closing");
    modalOverlay[0].classList.add("opening");
    modalOverlay[0].classList.remove("closing");
  }

  modal.style.transform = "translate(" + myState.x + "px, " + myState.y + "px)";
}

function onMouseMove(e) {
  if (state.isDragging) {
    state.x = e.pageX - state.xDiff;
    state.y = e.pageY - state.yDiff;
  }

  const modal = document.querySelectorAll(".modal");
  renderModal(modal[0], state);
}

function onMouseDown(e) {
  state.isDragging = true;
  state.xDiff = e.pageX - state.x;
  state.yDiff = e.pageY - state.y;
}

function onMouseUp() {
  state.isDragging = false;
}

function closeModal() {
  state.isHidden = true;

  const modal = document.querySelectorAll(".modal");
  state.x = 50;
  state.y = 50;
  state.xDiff = 0;
  state.yDiff = 0;
  renderModal(modal[0], state);
}

ready(() => {
  const modalOverlay = document.createElement("div");
  const modal = document.querySelectorAll(".modal");

  modalOverlay.setAttribute("class", "modal-overlay");
  document.body.appendChild(modalOverlay);
  renderModal(modal[0], state);

  const modalHeader = document.querySelectorAll(".modal-header");
  modalHeader[0].addEventListener("mousedown", onMouseDown);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);

  const closeButton = document.querySelectorAll(".modal-close");
  closeButton[0].addEventListener("click", closeModal);

  const toggleButton = document.querySelectorAll(".modal-trigger");
  toggleButton[0].addEventListener("click", function () {
    state.isHidden = !state.isHidden;
    renderModal(modal[0], state);
  });
});
