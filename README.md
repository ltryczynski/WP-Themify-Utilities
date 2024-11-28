# WP-Themify-Utilities

Utilities functions, class, and html elements for Wordpress Themify theme
<br><br>

## Anchor

Create anchor ad compontent for your page. It will automatically create anchor element fixed at the bottom of the page. Class contain basic behaviour (scroll event, toggle)

### Usage

```javascript
const anchor = new Anchor({
  title: "anchor title", //mandatory, specify the title of the anchor
  description: "anchor description", //optional, specify the description of the anchor
  href: "anchor link", //optional, specify the link for the anchor
  anchorTemplate: (title, description, href) => {}, //optional, specify the template for the anchor, return string
}).init();
```

<br><br>

## EqualHeight

Use this class to make the height of the elements equal. It will automatically adjust the height of the elements to the height of the tallest element.

### Usage

```javascript
new EqualHeight(
  document.querySelectorAll(".off-eq-1"), //mandatory, specify the elements you want to make the height equal
  {
    center: true, //optional, specify if you want to center the content
  }
);
```

<br><br>

## FixedFooter

Create a fixed footer for your page. Script modify behavior of the footer to be fixed at the bottom of the page. When scroll hit bottom of teh page, the footer will be set to absolute.

### Usage

```javascript
const fixedFooter: new FixedFooter({
    mainFooter: document.querySelector('.footer-lt__main'), //mandatory, specify the main footer element
    enableMobile: false, //optional, specify if you want to enable the fixed footer on mobile (default is false)
    mobileBreakpoint: '768' //optional, specify the breakpoint for mobile
})
```

<br><br>

## MegaMenu

MegaMenu for themify builder pro. It will help to style the mega menu for the themify builder pro.

#### Usage

```javascript
new MegaMenu({
  menuElements: document.querySelectorAll(".main-nav"), //mandatory, specify the menu elements
  submenuSelecto: "ul.sub-menu.tf_scrollbar", //optional, specify the selector for the submenus
  mobileBreakpoin: 786, //optional, specify the breakpoint for mobile
  enableMobile: false, //optional, specify if you want to enable the mega menu on mobile
});
```

<br><br>

## ScrollToTop

Create button to scroll to top of the page. It will automatically show the button when user scroll down the page.

### Usage

```javascript
//simple usage
const arrow: new ScrollToTopArrow();

// with options
const arrow: new ScrollToTopArrow({
    arrowSvg, //optional, specify the svg for the arrow
    top: 'auto', //optional, specify the top position of the arrow
    right: '1em', //optional, specify the right position of the arrow
    bottom: '1em', //optional, specify the bottom position of the arrow
    left: 'auto', //optional, specify the left position of the arrow
    showArrowHeight: '200' //optional, specify the scroll height to show the arrow
});
```

<br><br>

## SplitText

Use this class to split text within an element into smaller elements, such as individual letters or words. You can specify the type of element to enclose each letter or word, for example, `<span>`.

### Usage

```javascript
new SplitText(
  document.querySelector(".text-element"), //mandatory, specify the element containing the text to split
  {
    type: "chars", //optional, specify the type of split: "letters" or "words" (default is "letters")
    containerType: "span", //optional, specify the element to wrap each letter or word (default is "span")
  }
);
```

<br><br>

## TableContent

Create Table of Content for your post/page. It will automatically generate a list of links to the headings in your post/page content. It will also add scroll effect to the links when clicked.

### Usage

```javascript
const tableContent: new TableContent({
    tableContentContainer: document.querySelector('#table-content'), //mandatory, specify the container for the table of content
    contentContainer: document.querySelector('.content'), //mandatory, specify the container for the content
    topBar: true, //optional, specify if you want to show the top bar
    instantRender: true, //optional, specify if you want to render the table of content instantly, you can use .render() method to render it later
    topBarText: 'Table of Content', //optional, specify the text for the top bar
    topBarTextTagName: 'p', //optional, specify the tag name for the top bar text
    topBarHideText: 'Hide', //optional, specify the text for the top bar when it is hidden
    topBarShowText: 'Show', //optional, specify the text for the top bar when it is shown
    topBarStyle: true //optional, specify if you want to use the default style for the top bar
    }
});
```

<br><br>

## TransparentHeader

Script for header in themify builder pro, it will help to make the header transparent when user scroll down the page. To work properly, you need to create two headers, one for the normal header and one for the transparent header. The script will automatically switch between the headers when user scroll down the page.

### Usage

```javascript
const transparentHeader: new TransparentHeader({
    staticHeaderElement: document.querySelector('.static-nav'), //mandatory, specify the static header element
    stickyHeaderElement: document.querySelector('.sticky-nav'), //mandatory, specify the sticky header element
    scrollYChangePos: 300 //optional, specify the scroll position to change the header
})
```
