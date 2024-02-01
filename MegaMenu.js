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
            window.addEventListener('load', () => {
                this.setWidth();
            });
        }
    }

    setWidth() {
        const { menuElements, submenuSelector } = this;
        for (let i in menuElements) {
            console.log(menuElements[i]);
            menuElements[i].querySelector(submenuSelector).style.width = `${this.getWidthByCompareMenuElements()}px`;
        }
    }

    getWidthByCompareMenuElements() {
        const { menuElements } = this;
        let h = 0;
        menuElements.forEach(item => item.clientWidth > h ? h = item.clientWidth : '');
        return h;
    }
}

new MegaMenu({
    menuElements: document.querySelectorAll('.main-nav'),
})

