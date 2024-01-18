class TransparentHeader {
    constructor({ stickyHeaderElement, StaticHeaderElement, scrollYChangePos = 300 }) {
        this.nav = {
            sticky: stickyHeaderElement,
            static: StaticHeaderElement
        }
        this.scrollYChangePos = scrollYChangePos;
        this.activeHeader = null;
        this.checkPosOnload();
    }

    showHeader(navKey) {
        const { nav } = this;
        for (let k in nav) {
            // console.log(`---- nav key: ${k}`);
            if (navKey === k) {
                nav[k].style.display = 'flex';
                nav[k].style.opacity = '1';
                nav[k].style.transform = 'translateY(0)';
                nav[k].style.width = '100%';
                this.activeHeader = k;
            }
            else {
                nav[k].style.display = 'none';
                nav[k].style.opacity = '0';
                nav[k].style.transform = 'translateY(-100%)';
            }

        }
    }

    navChangeHandler(e) {
        const { nav, scrollYChangePos } = this;
        if (window.scrollY > scrollYChangePos) {
            this.showHeader('sticky');
        } else {
            this.showHeader('static');
        }
    }

    scrollHandler() {
        window.addEventListener('scroll', (e) => this.navChangeHandler(e));
    }

    checkPosOnload() {
        const { scrollYChangePos } = this;
        // Hide elements before DOMContentLoaded
        // ..



        document.addEventListener('DOMContentLoaded', (e) => {
            if (window.scrollY < scrollYChangePos) this.activeHeader = 'static'
            else {
                // logic when scroll is deeper then scrollYChangePos
                // ..
            }
        })
    }
}

new TransparentHeader({
    StaticHeaderElement: document.querySelector('.static-nav'),
    stickyHeaderElement: document.querySelector('.sticky-nav')
})

// const nav = {
//     static: document.querySelector('.static-nav'),
//     sticky: document.querySelector('.sticky-nav'),
// }

// const navChangeHandler = (e) => {

// }




