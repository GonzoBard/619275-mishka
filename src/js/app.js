function MainNavigationMenu() {

  // 1) Меню всегда открыто, если ширина экрана >= tablet,
  //      определяется селектором: (для @media tablet) .main-nav__site.cut-from-content { display: flex;}
  //    Глобальная видимость кнопки переключения меню
  //      определяется селектором: (для @media tablet) .main-nav__toggle-wrap { display: none; }
  //
  // 2) Иначе смотреть в localStorage
  // 3) Если что-то не так с localStorage, то меню всегда открыто
  // 4) Иначе применить значение из localStorage

  var isOpen;
  var valueName = "mainNavigationMenuIsOpen";
  var btnClose = document.getElementById("main-nav__btn-toggle--close");
  var btnOpen = document.getElementById("main-nav__btn-toggle--open");
  var siteNavigation = document.getElementById("main-nav__site");
  var hideClassName = "cut-from-content";

  this.init = function () {
    this.setState(this.getValueFromStorage());
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

  this.changeState = function (value) {
    if (value !== isOpen) { // если next состояние отличается от текущего
      this.setState(value);
      this.saveValueToStorage();
    }
  };

  this.saveValueToStorage = function () {
    if (this.storageAvailable("localStorage")) {
      localStorage.setItem(valueName, isOpen);
    }
  };

  this.getValueFromStorage = function () {
    if (this.storageAvailable("localStorage") && localStorage.hasOwnProperty(valueName)) {
      return localStorage[valueName] === "true";
    } else {
      return true;
    }
  };

  this.storageAvailable = function (type) { // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
    try {
      var storage = window[type],
        x = "__storage_test__";
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
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there"s something already stored
        storage.length !== 0;
    }
  };
}

var mainNavigationMenu = new MainNavigationMenu();
mainNavigationMenu.init();
