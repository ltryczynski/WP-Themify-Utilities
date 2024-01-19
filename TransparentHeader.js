class TransparentHeader {
    constructor({ stickyHeaderElement, StaticHeaderElement, scrollYChangePos = 300 }) {
        this.nav = {
            sticky: stickyHeaderElement,
            static: StaticHeaderElement,
        }
        this.scrollYChangePos = scrollYChangePos;
        this.setUpHeaders();
        this.checkActiveHeader();
        this.windowScrollHander();
    }

    setUpHeaders() {
        const { nav } = this;
        this.setHeadersStyle(nav.sticky, 'fixed');
        this.setHeadersStyle(nav.static, 'absolute');
    }

    toggleHeader(navKey) {
        const { nav } = this;
        for (let k in nav) {
            console.log(`---- nav key: ${k}`);
            if (navKey === k) {
                this.showHeader(nav[k]);
                this.activeHeader = k;
            }
            else {
                this.hideHeader(nav[k]);
            }

        }
    }

    checkActiveHeader() {
        const { checkWindowPosition, scrollYChangePos } = this;
        if (checkWindowPosition() > scrollYChangePos) {
            console.log('sticky nav');
            this.toggleHeader('sticky');
        }
        else {
            console.log('static nav ');
            this.toggleHeader('static');
        }
    }

    windowScrollHander() {
        window.addEventListener('scroll', () => this.checkActiveHeader());
    }

    // Utilities
    checkWindowPosition() {
        return window.scrollY;
    }

    setHeadersStyle(element, positionType) {
        element.style.position = positionType;
        element.style.top = '0';
        element.style.left = '0';
        element.style.right = '0';
        element.style.width = '100%';
        element.style.transition = '.3s ease-out';
        element.style.zIndex = '999';
    }

    hideHeader(element) {
        element.style.display = 'none';
        element.style.opacity = '0';
        element.style.transform = 'translateY(-100%)';
    }
    showHeader(element) {
        element.style.display = 'block';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.width = '100%';
        }, 10);
    }


}

const x = new TransparentHeader({
    StaticHeaderElement: document.querySelector('.static-nav'),
    stickyHeaderElement: document.querySelector('.sticky-nav')
})