# Web Components

Web Components consist of three elemens:

## Custom Elements

```javascript
class MyCustomElement extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Element functionality written in here
  }

  // Invoked each time the custom element is appended into a document-connected element. This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
  connectedCallback() {}

  // Invoked each time the custom element is disconnected from the document's DOM.
  disconnectedCallback() {}

  // Invoked each time the custom element is moved to a new document.
  adoptedCallback() {}

  // Invoked each time one of the custom element's attributes is added, removed, or changed. Which attributes to notice change for is specified in a static get observedAttributes method
  attributeChangedCallback() {}

  static get observedAttributes() { 
    return ['attr1', 'attr2']; 
  }
}

customElements.define('my-custom-element', MyCustomElement);
```

Usage

```html
  <my-custom-element attr1="1" attr2="test"></my-custom-element>
```

## Shadow DOM

Makes encapsulation possible, but not necessary.

Keeps the markup structure, style, and behavior hidden and separate from other code on the page so that different parts do not clash, and the code can be kept nice and clean. 

**Attention!!! Outside styles will not work**

Two modes:

1. open - accessable from js
2. closed - not accessable from js

```javascript
const shadow = elementRef.attachShadow({mode: 'open'});
const shadow = elementRef.attachShadow({mode: 'closed'});
```

Append children:

```javascript
shadow.appendChild(element);
```

Standard elements as Video use the Shadow DOM for example.

## Without Shadow DOM

```javascript
this.appendChild(element);
// with template
this.appendChild(template.content.cloneNode(true));
// query
this.querySelector('.step-description').innerText = stepDescription;
```

## HTML Templates and Slots

```javascript
const template = document.createElement('template');
template.innerHTML = `
<template id="my-paragraph">
  <p>My paragraph</p>
</template>
`;

class extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'})
      .appendChild(template.cloneNode(true));
  }
}
```

## Full Example

```javascript
const template = document.createElement('template');
template.innerHTML = `
  <style>
  </style>
  <span class="change-me"></span>
`;

class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.text = this.getAttribute('text');
    this.shadowRoot.querySelector('.change-me').innerHTML = this.text;
  }
}

window.customElements.define('my-component', MyComponent);
```

## Read more

- [Google Guide to Web-Components in DevTools](https://goo.gle/building-ui-devtools)
