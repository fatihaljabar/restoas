const DrawerInitiator = {
  _isDrawerOpen: false,

  init({ button, drawer }) {
    button.addEventListener('click', (event) => {
      this._openDrawer(event, drawer);
    });

    document.addEventListener('click', (event) => {
      if (
        !event.target.classList.contains('menu') &&
        !event.target.classList.contains('hamburgerMenu')
      ) {
        this._closeDrawer(event, drawer);
      }
    });
  },

  _openDrawer(event, drawer) {
    event.stopPropagation();
    drawer.style.display = 'flex';
    drawer.style.flexDirection = 'column';
    drawer.style.animation = 'slideLeft 200ms alternate';
    drawer.style.transform = 'translateX(0)';
    this._isDrawerOpen = !this._isDrawerOpen;
  },

  _closeDrawer(event, drawer) {
    if (this._isDrawerOpen) {
      event.stopPropagation();
      drawer.style.animation = 'slideRight 200ms alternate';
      drawer.style.transform = 'translateX(100%)';

      setTimeout(() => {
        drawer.style.display = 'none';
        this._isDrawerOpen = !this._isDrawerOpen;
      }, 200);
    }
  },
};

export default DrawerInitiator;
