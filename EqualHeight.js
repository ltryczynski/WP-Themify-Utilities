class EqualHeight {
    constructor(elements, { center = false } = {}) {
        this.elements = elements;
        this.maxHeight = null;
        this.options = {
            center
        };
        this.onDOMelementsLoad();
    }

    onDOMelementsLoad() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setOptions();
            this.getMaxHeight();
            this.setMaxHeight();
        })
    }

    // Utilities
    getMaxHeight() {
        const { elements } = this;
        let h = 0;
        elements.forEach(item => { if (item.clientHeight > h) h = item.clientHeight; });
        this.maxHeight = h;
    }
    setMaxHeight() {
        const { elements, maxHeight } = this;
        elements.forEach(item => {
            item.style.height = `${maxHeight}px`;
        })
    }
    setOptions() {
        const { options, elements } = this;
        elements.forEach(item => {
            if (options.center === true) {
                item.style.display = 'flex';
                item.style.justifyContent = 'center';
                item.style.alignItems = 'center';
            }
        })

    }
}
new EqualHeight(document.querySelectorAll('.off-eq-1'), {
    center: true
});
new EqualHeight(document.querySelectorAll('.off-eq-2'));