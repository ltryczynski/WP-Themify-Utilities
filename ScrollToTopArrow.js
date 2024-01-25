class ScrollToTopArrow {
    constructor({ arrowSvg } = {}) {
        this.arrowSvg = arrowSvg || this.angleUpIcon();
    }

    createArrow() {
        const div = document.createElement('div');
        div.innerHTML = this.arrowSvg;
        div.style = `width:4rem; height:4rem; background-color:rgba(31,39,62, 1); border-radius:50%; box-shadow:1px 1px 4px 0px rgba(0,0,0,.25)`
    }

    angleUpIcon() {
        return `<svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 22C1 22 12.7452 10 13 10C13.2548 10 25 22 25 22" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M1 13C1 13 12.7452 1 13 1C13.2548 1 25 13 25 13" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>`
    }
}

new ScrollToTopArrow();