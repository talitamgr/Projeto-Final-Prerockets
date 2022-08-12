var menu = new Menu({
    container: '.headerNav',
    toggleBtn: '.btnHamburg',
})
function Menu(config) {
    this.nav = (typeof config.container === 'string') ? document.querySelector(config.container) : config.container
    this.btn = (typeof config.toggleBtn === 'string') ? document.querySelector(config.toggleBtn) : config.toggleBtn

    var _openned = false;
    var _this = this;

    this.nav.removeAttribute('style')
    closeMenu()
    this.btn.addEventListener('click', openOrClose)

   

    function openOrClose() {
        if (!_openned) {
            openMenu()
        } else {
            closeMenu()
        }
    }

    function openMenu() {
        var _style = {
            maxHeight: '100vh',
            overflow: 'hidden'
        }

        applyStyleToNav(_style)

        _openned = true;
    }

    function applyStyleToNav(_style) {
        Object.keys(_style).forEach(stl => {
            _this.nav.style[stl] = _style[stl]
        })
    }

    function closeMenu() {
        var _style = {
            maxHeight: '0px',
            overflow: 'hidden'
        }

        applyStyleToNav(_style)

        _openned = false
    }
}
