class FixedFooter {
    constructor({ mainFooter, backdropFooter }) {
        this.footerDOM = {
            mainFooter, backdropFooter
        }
        this.footerScrollMax = null;
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
        let h = window.scrollY;
        if (h >= document.documentElement.scrollHeight - window.innerHeight) {
            this.footerDOM.mainFooter.style.position = 'absolute';
            this.footerScrollMax = true;
        }
        if (this.footerScrollMax === true && h < document.documentElement.scrollHeight - window.innerHeight - this.footerDOM.mainFooter.clientHeight) {
            this.footerDOM.mainFooter.style.position = 'fixed';
            this.footerScrollMax = false;
        }
    }
}

const fixedFooter = new FixedFooter({
    mainFooter: document.querySelector('.footer-lt__main'),
    backdropFooter: document.querySelector('.footer-lt__backdrop'),
})