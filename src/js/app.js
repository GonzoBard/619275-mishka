function MainNavigationMenu() {

  var isOpen;
  var valueName = "mainNavigationMenuIsOpen";
  var btnContainer = document.getElementById("main-nav__toggle-wrap");
  var btnClose = document.getElementById("main-nav__btn-toggle--close");
  var btnOpen = document.getElementById("main-nav__btn-toggle--open");
  var siteNavigation = document.getElementById("site-nav");
  var hideClassName = "cut-from-content";

  this.whatToDo = function () {
    // 1) Меню всегда открыто, если ширина экрана больше 320px
    // 2) Иначе смотреть в localStorage
    // 3) Если что-то не так с localStorage, то меню открыто
    // 4) Иначе применить значение из localStorage
    return this.isScreenMoreThan320() || this.getValueFromStorage();
  };

  this.init = function () {
    this.setState(this.whatToDo());
  };

  this.setState = function (value) {
    isOpen = value;
    if (isOpen) {
      btnClose.classList.remove(hideClassName);
      if (!btnOpen.classList.contains(hideClassName)) {
        btnOpen.classList.add(hideClassName);
      }
      siteNavigation.classList.remove(hideClassName);
    } else {
      btnOpen.classList.remove(hideClassName);
      if (!btnClose.classList.contains(hideClassName)) {
        btnClose.classList.add(hideClassName);
      }
      siteNavigation.classList.add(hideClassName);
    }
  };

  this.changeState = function (value, needSave = true) {
    if (value !== isOpen) { // если next состояние отличается от текущего
      this.setState(value);
      if (needSave) { // при изменении ширины экрана мы не сохраняем состояние в localStorage
        this.saveValueToStorage();
      }
    }
  };

  this.screenResized = function () {
    this.changeState(this.whatToDo(), false);
  };

  this.isScreenMoreThan320 = function () {
    result = this.getScreenWidth() > 320;
    if (result) {
      if (!btnContainer.classList.contains(hideClassName)) {
        btnContainer.classList.add(hideClassName);
      }
    } else {
      if (btnContainer.classList.contains(hideClassName)) {
        btnContainer.classList.remove(hideClassName);
      }
    }
    return result;
  };

  this.getScreenWidth = function () {
    // https://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript#8876069
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  };

  this.saveValueToStorage = function () {
    if (this.storageAvailable('localStorage')) {
      localStorage.setItem(valueName, isOpen);
    }
  };

  this.getValueFromStorage = function () {
    if (this.storageAvailable('localStorage') && localStorage.hasOwnProperty(valueName)) {
      return localStorage[valueName] === "true";
    } else {
      return true;
    }
  };

  this.storageAvailable = function (type) { // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
    try {
      var storage = window[type],
        x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch (e) {
      return e instanceof DOMException && (
          // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
    }
  };
}

var mainNavigationMenu = new MainNavigationMenu();
mainNavigationMenu.init();
window.addEventListener("resize", mainNavigationMenu.screenResized.bind(mainNavigationMenu));
