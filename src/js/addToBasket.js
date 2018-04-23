function AddToBasketModal() {
  var modal = document.getElementById('add-to-basket-modal');
  var hideClassName = "visually-hidden";
  var overflowClassName = "modal-open";
  var bodyClassList = document.getElementsByTagName('body')[0].classList;

  this.open = function (event) {
    event.preventDefault(); //отменить стандартное действие
    modal.classList.remove(hideClassName);
    bodyClassList.add(overflowClassName);
  };

  this.close = function () {
    bodyClassList.remove(overflowClassName);
    modal.classList.add(hideClassName);
  };

  this.escKeyPressed = function (event) {
    event = event || window.event;
    if (event.keyCode === 27) {
      this.close();
    }
  };
}

var addToBasketModal = new AddToBasketModal();
document.addEventListener("keydown", addToBasketModal.escKeyPressed.bind(addToBasketModal));
