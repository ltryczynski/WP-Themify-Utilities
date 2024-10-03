class TableContent {
    constructor({ contentContainer, tableContentContainer, instantRender = true, topBar = false, topBarText = 'Table of Content', topBarTextTagName = 'p', topBarHideText = 'Hide', topBarShowText = 'Show', topBarStyle = true }) {
        this.contentContainer = contentContainer;
        this.tableContentContainer = tableContentContainer;
        this.headingItems = this.getHeadingsFromContent();

        this.topBar = {
            topBarText,
            topBarTextTagName,
            topBarHideText,
            topBarShowText,
            topBarStyle,
            topBarState: false,
        }

        instantRender && this.render();

        if (topBar) {
            this.topBarElement = this.createTopBar();
            this.tableContentContainer.prepend(this.topBarElement);
        }

    }

    getHeadingsFromContent() {
        const { contentContainer } = this;
        const headings = contentContainer.querySelectorAll('h2, h3');
        return Array.from(headings).map((heading, index) => {
            if (!heading.id) {
                heading.id = 'heading-' + index;
            }
            return {
                tagName: heading.tagName,
                textContent: heading.textContent,
                id: heading.id
            };
        });
    }

    createTableContentItem(heading) {
        const tableContentItem = document.createElement('li');
        const ahref = document.createElement('a');
        ahref.href = `#${heading.id}`;
        ahref.textContent = heading.textContent;
        tableContentItem.appendChild(ahref);
        return tableContentItem;
    }

    createTableContentNestedItem(tableContentItem) {
        const nestedList = document.createElement('ul');
        nestedList.classList.add('table-content-list');
        nestedList.appendChild(tableContentItem);
        return nestedList
    }

    createTableContent() {
        const { tableContentContainer, headingItems, createTableContentItem, createTableContentNestedItem } = this;
        const tableContentList = document.createElement('ul');
        tableContentList.classList.add('table-content-list');

        let parentElement = null;

        for (let i = 0; i < headingItems.length; i++) {
            const tableContentItem = createTableContentItem(headingItems[i]);

            if (headingItems[i].tagName === 'H2') {
                tableContentList.appendChild(tableContentItem);
            } else if (headingItems[i].tagName === 'H3' && parentElement) {
                if (headingItems[i - 1].tagName === 'H2') {
                    const nestedList = createTableContentNestedItem(tableContentItem)
                    parentElement.appendChild(nestedList);
                    parentElement = nestedList;
                } else {
                    parentElement.appendChild(tableContentItem);
                }
            }

            if (i < headingItems.length - 1 && headingItems[i].tagName === 'H2' && headingItems[i + 1].tagName === 'H3') {
                parentElement = tableContentItem;
            }
        }
        tableContentContainer.appendChild(tableContentList)
        return tableContentList;
    }

    createTopBar() {
        const { topBarText, topBarTextTagName, topBarHideText, topBarShowText, topBarStyle } = this.topBar;
        const topBar = document.createElement('div');
        const topBarTextElement = document.createElement(topBarTextTagName);
        const topBarButton = document.createElement('button');

        topBar.classList.add('table-content__top-bar');
        topBarTextElement.textContent = topBarText;
        topBarButton.textContent = topBarShowText;

        topBar.appendChild(topBarTextElement);
        topBar.appendChild(topBarButton);

        this.tableContentList.classList.add('table-content-hidden');
        this.tableContentList.style.display = 'none';

        topBarStyle && document.head.appendChild(this.createTopBarStyle());

        topBarButton.addEventListener('click', () => {
            if (this.topBar.topBarState) {
                console.log('hide');
                this.tableContentList.classList.remove('table-content-visible');
                this.tableContentList.classList.add('table-content-hidden');
                requestAnimationFrame(() => {
                    this.tableContentList.style.display = 'none';
                })
                topBarButton.textContent = topBarShowText;
            } else {
                console.log('show');
                this.tableContentList.classList.remove('table-content-hidden');
                this.tableContentList.classList.add('table-content-visible');
                topBarButton.textContent = topBarHideText;
                requestAnimationFrame(() => {
                    this.tableContentList.style.display = 'block';
                })
            }
            this.topBar.topBarState = !this.topBar.topBarState;
        });

        return topBar;
    }

    createTopBarStyle() {
        const style = document.createElement('style');
        style.textContent = `
            #${this.tableContentContainer.id} .table-content__top-bar button {
            background-color: transparent;
            outline: 0;
            border: 0;
            color: #fff;
            cursor: pointer;
            margin-left: 1rem;
            }

            .table-content-hidden {
            height: 0;
            overflow: hidden;
            transform: scaleY(0);
            transition: 0.3s;
            transform-origin: top;
            }

            .table-content-visible {
            height: auto;
            transform: scaleY(1);
            transform-origin: top;
            transition: 0.3s;
            }
            #${this.tableContentContainer.id} .table-content__top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            }
            #${this.tableContentContainer.id} .table-content__top-bar * {
            margin: 0;
            }
            `;
        return style;
    }

    render() {
        if (this.headingItems.length) {
            this.tableContentList = this.createTableContent();
        }
    }

}


const tableContent = new TableContent({
    tableContentContainer: document.querySelector('#table-content'),
    contentContainer: document.querySelector('.content'),
    topBar: true,
});

