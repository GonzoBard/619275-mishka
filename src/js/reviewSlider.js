function ReviewSlider() {

  var reviewsList = document.getElementById("reviews__list");
  var hideClassName = "cut-from-content";

  this.next = function () {
    this.step(1);
  };

  this.prev = function () {
    this.step(-1);
  };

  this.step = function (direction) {

    var currentIndex = -1;
    var listLength = reviewsList.children.length;

    for (i = 0; i < listLength; i++) {
      if (!reviewsList.children[i].classList.contains(hideClassName)) {
        currentIndex = i;
        break;
      }
    }

    if (currentIndex >= 0) {
      var nextIndex = currentIndex + direction;

      if (nextIndex < 0) { // достигли начала списка
        // кнопка prev, по-идее, должна была быть неактивна
      } else if (nextIndex > (listLength - 1)) { // достигли конца списка
        // кнопка next, по-идее, должна была быть неактивна
      } else {
        reviewsList.children[currentIndex].classList.add(hideClassName);
        reviewsList.children[nextIndex].classList.remove(hideClassName);
      }
    }
  }
}

var reviewSlider = new ReviewSlider();
