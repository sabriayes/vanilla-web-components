class TextField extends HTMLElement {

    CLASSES = {
        rootDOM: ['vanilla-element', 'vanilla-text-field'],
        innerContainerDOM: ['inner-container']
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
            this.CLASSES.rootDOM
        );

        const innerContainerDOM = document.createElement('div');
        innerContainerDOM.classList.add(
            this.CLASSES.innerContainerDOM
        );
        innerContainerDOM.innerHTML = 'Vanilla WC';

        rootDOM.appendChild(innerContainerDOM);
        
        this.shadowRoot.appendChild(rootDOM);
    }
}

window.customElements.define('vanilla-text-field', TextField);