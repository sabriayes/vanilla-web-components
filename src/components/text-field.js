import css from './text-field.css';

class TextField extends HTMLElement {

    CLASSES = {
        root: ['vanilla-element', 'vanilla-text-field'],
        innerContainer: ['inner-container']
    };

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
    }

    connectedCallback() {
        this.render();
    }

    render() {
        
        /**
         * Create root and inner container DOM elements. 
         * 
         * <div class="vwc-text-field">
         *      <div class="inner-container">
         *      </div>
         * </div>
         */
        const rootDOM = document.createElement('div');
        rootDOM.classList.add(
            ...this.CLASSES.root
        );

        const innerContainerDOM = document.createElement('div');
        innerContainerDOM.classList.add(
            ...this.CLASSES.innerContainer
        );
        innerContainerDOM.innerHTML = 'Vanilla WC';

        rootDOM.appendChild(innerContainerDOM);
        
        this.styles(css);
        this.shadowRoot.appendChild(rootDOM);
    }

    styles(cssRawContent) {

        const adoptedStyleSheets = document.createElement('style');
        adoptedStyleSheets.innerHTML = cssRawContent;
        this.shadowRoot.appendChild(adoptedStyleSheets);
    }
}

window.customElements.define('vanilla-text-field', TextField);