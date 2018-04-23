function AddToBasketModal() {
  var modal = document.getElementById('add-to-basket-modal');
  var hideClassName = "visually-hidden";

  this.open = function (event) {
    event.preventDefault(); //отменить стандартное действие
    modal.classList.remove(hideClassName);
  };

  this.close = function () {
    modal.classList.add(hideClassName);
  };
}

var addToBasketModal = new AddToBasketModal();
