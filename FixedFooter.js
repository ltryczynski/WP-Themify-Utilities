class FixedFooter {
    constructor({ mainFooter, backdropFooter }) {
        this.footerDOM = {
            mainFooter, backdropFooter
        }
        this.status = {
            footerScrollMax: false,
            footerInView: false,
        }

        this.setUpFooters();
        this.scrollEvent();
    }

    setUpFooters() {
        const { mainFooter, backdropFooter } = this.footerDOM;
        backdropFooter.style.height = `${mainFooter.clientHeight}px`;
        mainFooter.style.position = 'fixed';
        mainFooter.style.bottom = '0';
        mainFooter.style.zIndex = '-10';

        if (window.scrollY > document.documentElement.scrollHeight - window.innerHeight - mainFooter.clientHeight) {
            console.log("footer In view");
            this.maxHeightReachHandler();
        }
        else {
            console.log("footer not in view");
            this.getBackFromView();
        }

    }


    scrollEvent() {
        window.addEventListener('scroll', (e) => this.scrollHander(e));
    }
    scrollHander(event) {
        const { footerDOM, status } = this;
        let h = window.scrollY;

        // Reaching footer
        if (status.footerInView !== true && h >= document.documentElement.scrollHeight - window.innerHeight - footerDOM.mainFooter.clientHeight) {
            this.reachingFooterHandler();
        }

        // Max document height reach
        if (h >= document.documentElement.scrollHeight - window.innerHeight) {
            this.maxHeightReachHandler();
        }
        // Get back from footer view
        if (status.footerScrollMax === true && h < document.documentElement.scrollHeight - window.innerHeight - this.footerDOM.mainFooter.clientHeight) {
            this.getBackFromView();
        }

    }

    // utilities
    reachingFooterHandler() {
        const { status, footerDOM } = this;
        status.footerInView = true;
        footerDOM.mainFooter.style.visibility = 'visible';
    }

    maxHeightReachHandler() {
        const { status, footerDOM } = this;
        footerDOM.mainFooter.style.position = 'absolute';
        footerDOM.mainFooter.style.zIndex = '1';
        status.footerScrollMax = true;
    }

    getBackFromView() {
        const { status, footerDOM } = this;
        footerDOM.mainFooter.style.position = 'fixed';
        footerDOM.mainFooter.style.zIndex = '-100';
        status.footerScrollMax = false;
        status.footerInView = false;
        footerDOM.mainFooter.style.visibility = 'hidden';
    }

}

const fixedFooter = new FixedFooter({
    mainFooter: document.querySelector('.footer-lt__main'),
    backdropFooter: document.querySelector('.footer-lt__backdrop'),
})