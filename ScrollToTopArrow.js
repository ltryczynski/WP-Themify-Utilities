class ScrollToTopArrow {
    constructor({ arrowSvg, top = 'auto', right = '1em', bottom = '1em', left = 'auto', showArrowHeight = '200' } = {}) {
        this.arrowSvg = arrowSvg || this.angleUpIcon();
        this.position = {
            top, right, bottom, left
        };
        this.showArrowHeight = showArrowHeight;
        this.arrow = null;
        this.createArrow();
        this.scrollEvent();
        this.clickEvent();
    }

    createArrow() {
        const { top, right, bottom, left } = this.position;
        const div = document.createElement('div');
        div.innerHTML = this.arrowSvg;
        div.style = `width:4rem; height:4rem; background-color:rgba(31,39,62, .9); border-radius:50%; box-shadow:1px 1px 4px 0px rgba(0,0,0,.25); display:flex; justify-content:center; align-items:center; cursor:pointer; position:fixed; top: ${top}; right:${right}; bottom:${bottom}; left: ${left}; visibility:hidden; opacity:0; transform: translateY(1em); transition:.3s ease-out; backdrop-blur(1px); -webkit-backdrop-blur(1px); z-index:50;`;
        this.arrow = div;
        document.body.append(div);
    }

    scrollEvent() {
        window.addEventListener('scroll', (e) => {
            this.scrollEventHandler(e);
        })
    }

    scrollEventHandler(event) {
        const { showArrowHeight } = this;
        let h = window.scrollY;
        if (h > showArrowHeight) this.showArrow();
        if (h <= showArrowHeight) this.hideArrow();
    }

    showArrow() {
        const { arrow } = this;
        arrow.style.visibility = 'visible';
        arrow.style.opacity = '1';
        arrow.style.transform = 'translateY(0)';
    }
    hideArrow() {
        const { arrow } = this;
        arrow.style.visibility = 'hidden';
        arrow.style.opacity = '0';
        arrow.style.transform = 'translateY(1em)';
    }

    clickEvent() {
        const { arrow } = this;
        arrow.addEventListener('click', (e) => {
            this.clickEventHandler(e);
        });
    }

    clickEventHandler(event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Utilities
    angleUpIcon() {
        return `<svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom:2px;"><path d="M1 22C1 22 12.7452 10 13 10C13.2548 10 25 22 25 22" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M1 13C1 13 12.7452 1 13 1C13.2548 1 25 13 25 13" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>`
    }
}

const arrow = new ScrollToTopArrow();