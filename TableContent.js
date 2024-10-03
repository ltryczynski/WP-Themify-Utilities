class TableContent {
    constructor({ contentContainer, tableContentContainer, instantRender = true }) {
        this.contentContainer = contentContainer;
        this.tableContentContainer = tableContentContainer;
        this.headingItems = this.getHeadingsFromContent();
        instantRender && this.render();
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
                console.log('parentElement', parentElement);
            }
        }

        return tableContentContainer.appendChild(tableContentList);
    }


    render() {
        if (this.headingItems.length) {
            this.tableContent = this.createTableContent();
        }
    }

}


const tableContent = new TableContent({
    tableContentContainer: document.querySelector('#table-content'),
    contentContainer: document.querySelector('.content'),
});

