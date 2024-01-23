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

    }


    scrollEvent() {
        window.addEventListener('scroll', (e) => this.scrollHander(e));
    }
    scrollHander(event) {
        const { footerDOM, status } = this;
        let h = window.scrollY;

        // Reaching footer
        if (status.footerInView !== true && h >= document.documentElement.scrollHeight - window.innerHeight - footerDOM.mainFooter.clientHeight) {
            status.footerInView = true;
            footerDOM.mainFooter.style.visibility = 'visible';
        }

        // Max document height reach
        if (h >= document.documentElement.scrollHeight - window.innerHeight) {
            footerDOM.mainFooter.style.position = 'absolute';
            footerDOM.mainFooter.style.zIndex = '1';

            status.footerScrollMax = true;
        }
        // Get back from footer view
        if (status.footerScrollMax === true && h < document.documentElement.scrollHeight - window.innerHeight - this.footerDOM.mainFooter.clientHeight) {
            footerDOM.mainFooter.style.position = 'fixed';
            footerDOM.mainFooter.style.zIndex = '-100';
            status.footerScrollMax = false;
            status.footerInView = false;
            footerDOM.mainFooter.style.visibility = 'hidden';
        }

    }


}

const fixedFooter = new FixedFooter({
    mainFooter: document.querySelector('.footer-lt__main'),
    backdropFooter: document.querySelector('.footer-lt__backdrop'),
})