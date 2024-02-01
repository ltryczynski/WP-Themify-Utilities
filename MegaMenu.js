class MegaMenu {
    constructor({ menuElements, submenuSelector = 'ul.sub-menu.tf_scrollbar', mobileBreakpoint = 786, enableMobile = false }) {
        this.menuElements = [...menuElements];
        this.submenuSelector = submenuSelector;
        this.mobile = {
            mobileBreakpoint, enableMobile
        }
        this.setUp();
    }
    setUp() {
        const { enableMobile, mobileBreakpoint } = this.mobile;
        if (enableMobile === true || window.innerWidth > mobileBreakpoint) {
            this.setWidth();
        }
    }

    setWidth() {
        const { menuElements, submenuSelector } = this;
        for (let i in menuElements) {
            menuElements[i].querySelector(submenuSelector).style.width = `${menuElements[i].clientWidth}px`;
        }
    }

}

new MegaMenu({
    menuElements: document.querySelectorAll('.main-nav'),
})

