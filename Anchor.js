class Anchor {
    constructor({ href, title, description, anchorTemplate }) {
        this.anchor;
        if (anchorTemplate) {
            this.anchorTemplate = anchorTemplate(title, description, href);
        } else {
            this.anchorTemplate = this.getAnchorTemplate(title, description, href);
        }
        this.anchorState = false;
        this.first = true;
    }

    createAnchor() {
        const anchor = document.createElement('section');
        anchor.classList.add('anchor--hidden');
        anchor.id = 'anchor';
        anchor.innerHTML = this.anchorTemplate;
        return {
            anchor,
            toggle: anchor.querySelector('.anchor__toggle'),
        };
    }

    getAnchorTemplate(title, description, href) {
        const template = `
        <div class="anchor__wrapper">
          <div class="anchor__banner">
            <div class="anchor__content">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" /></svg>
              <div class="anchor__main">
                <p class="anchor__title">${title}</p>
                <p class="anchor__description">
                  ${description}
                </p>
              </div>
            </div>
            <div class="module module-buttons tb_3897662 buttons-horizontal solid btn btn__primary">
              <div class="module-buttons-item tf_in_flx">
                <a href="${href}" class="ui builder_button tf_in_flx transparent">Kontakt</a>
              </div>
            </div>
          </div>
          <div class="anchor__toggle">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </div>
        </div>
        `;
        return template;
    }

    hideAnchor() {
        this.anchor.anchor.classList.remove('anchor--visible');
        this.anchor.anchor.classList.add('anchor--hidden');
        this.anchor.toggle.querySelector('svg').style.transform = 'rotate(180deg)';
        this.anchorState = false;
    }

    showAnchor() {
        this.anchor.anchor.classList.remove('anchor--hidden');
        this.anchor.anchor.classList.add('anchor--visible');
        this.anchor.toggle.querySelector('svg').style.transform = 'rotate(0deg)';
        this.anchorState = true;
    }


    anchorEvents() {
        window.addEventListener('scroll', () => {
            this.anchorState && this.first && this.hideAnchor();
            this.first = false;
        });
        this.anchor.toggle.addEventListener('click', () => {
            this.anchorState ? this.hideAnchor() : this.showAnchor();
            this.first = false
        });
    }

    init() {
        this.anchor = this.createAnchor();
        this.hideAnchor();
        document.body.appendChild(this.anchor.anchor);
        setTimeout(() => {
            this.showAnchor();
            this.anchorEvents();
        }, 1000);

        setTimeout(() => {
            this.first && this.anchorState && this.hideAnchor();
        }, 10000)
    }
}