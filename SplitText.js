class SplitText {
    constructor(element, { type = "chars", containerType = "span" } = {}) {
        this.element = element;
        this.type = type;
        this.containerType = containerType;
        this.checkType();
    }
    checkType() {
        let { type } = this;
        switch (type) {
            case "chars":
                this.splitContentHandler(), this.setNewElementContentChars();
                break;
            case "words":
                this.splitWordsHandler(), this.setNewElementContentWords();
                break;
            default:
                console.log("-!!- SplitText ---- Wrong Type -!!-");
        }
    }
    setNewElementContentChars() {
        let { element, chars, containerType } = this;
        element.innerHTML = chars.map((element) => `<${containerType}>${element}</${containerType}>`).join("");
        this.chars = element.querySelectorAll(`${containerType}`);
    }
    setNewElementContentWords() {
        let { element, chars, containerType } = this;
        const n = chars.map((element) => `<${containerType}>${element}</${containerType}> `).join("");
        element.innerHTML = n; this.words = element.querySelectorAll(`${containerType}`);
    }
    splitContentHandler() {
        let { element } = this;
        this.chars = element.textContent.split("");
    }
    splitWordsHandler() {
        let { element } = this;
        const e = element.textContent.split(" ");
        this.chars = e.filter((element) => "" !== element);
    }
}