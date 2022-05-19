# Vanilla Web Component
Library of web components with some useful input elements. It is developed with vanilla `JavaScript` for high performance.\
[Live Demo](https://sabriayes.github.io/vanilla-web-components/)

**NOTE: This project is still work-in-progress.**

| Status | Element             | Description                                                            |
|--------|---------------------|------------------------------------------------------------------------|
| ✅      | `vanilla-input`     | Text field element with animated label, hint, lead and trail icons     |
| ⌛      | `vanilla-password`  | Customized `vanilla-input` element for password                        |
| ⌛      | `vanilla-number`    | Customized `vanilla-input` element for numeric values                  |
| ⌛      | `vanilla-email`     | Customized `vanilla-input` element for email                           |
| ⌛      | `vanilla-tel`       | Customized `vanilla-input` element for phone number with country codes |
| ⌛      | `vanilla-currency`  | Customized `vanilla-input` element for currency value                  |
| ⌛      | `vanilla-quantity`  | Customized `vanilla-input` element for qantity value                   |
| ⌛      | `vanilla-search`    | Customized `vanilla-input` for searching                               |
| ⌛      | `vanilla-select`    | Dropdown menu element with search field                                |
| ⌛      | `vanilla-checkbox`  | Checkbox element                                                       |
| ⌛      | `vanilla-radio-btn` | Radio button element                                                   |
| ⌛      | `vanilla-toggle`    | Toggle option element                                                  |

# `<vanilla-input>`
`vanilla-input` is custom text field element. It supports all native HTML text input attributes and it has **animated label, errors message, hint text, lead and trail icons**.\
You can see all custom attributes at **attributes list** with description.

| Attr            | Description                                                         |
|-----------------|---------------------------------------------------------------------|
| **label**       | Sets label text *(optional)*                                        |
| **placeholder** | Sets placeholder text for input element. *(optional - native attr)* |

***NOTE: All native HTML text input attributes are available.***

# Usage
Basic usage example.
````html
<!-- Add script tag -->
<script src="dist/input.min.js"></script>

<!-- Add HTML tag -->
<vanilla-input 
    label="Your Name" 
    placeholder="Enter your name">
</vanilla-input>
````

## Hint Message
It has hint message element.
````html
<vanilla-input 
    label="Your Name" 
    placeholder="Enter your name"
    maxlength="20">
    <!-- Tag with slot="hint" attribute -->
    <span slot="hint">Max. 50 chars</span>
</vanilla-input>
````

## Error Message
It can show multiple error messages with `errors` slot elements.\
Add the `invalid` attribute to enable error display.
````html
<vanilla-input 
    invalid
    label="Your Name" 
    placeholder="Enter your name"
    required
    maxlength="50">
    <!-- Tags with slot="errors" attribute -->
    <span slot="errors">Field is required</span>
    <span slot="errors" hidden>Field length must be greater than 50</span>
</vanilla-input>
````

## Lead & Trail Icons
You can use iconic font library or SVG graphic. Set trailing icon color with `success|danger|info` classes.
````html
<vanilla-input 
    label="Your Name" 
    placeholder="Enter your name">
    <!-- Tag with slot="leading-icon" attribute for icon -->
    <span slot="leading-icon">
        <i class="fa fa-user"></i>
    </span>
    <!-- Tag with slot="trailing-icon" attribute for indicator -->
    <span slot="trailing-icon" class="success">
        <!-- Font lib or SVG -->
        <i class="fa fa-circle-notch"></i>
    </span>
</vanilla-input>
````

## Access Element
````html
<vanilla-input 
    id="your-name"
    label="Your Name" 
    placeholder="Enter your name">
</vanilla-input>

<script>
    var nameElement = document.getElementById('your-name');
    
    // Get current value.
    console.log(nameElement.value);

    // Add event listener.
    // $input - Ref to input text element in shadow DOM.
	nameElement.$input.addEventListener('change', function($event) {
        console.log($event.target.value);
    });
</script>
````

# Styling
It use global CSS varaiables for styling.
````scss
:root {
    --vwc-background-color: #fcfcfc;
    --vwc-border-color: #b4bdc6;
    --vwc-label-color: #b4bdc6;
    --vwc-icon-color: #a6a6ab;
    --vwc-accent-color: #696cff;
    --vwc-danger-color: #fd6868;
    --vwc-success-color: #68ff9d;
    --vwc-info-color: #69bffc;
}
````

# Development
### Requirements

- **NodeJs** (v12.9.1)
- **NPM** (v6.14.8)

### Folder Structure

- `src` is root folder. `src/components` contains component files.
- `partilas` folder contains styles and script files.

Each component consists of two files. (`.html` and `.js`)
- `.html` file contains DOM and style codes.
- `.js` file contains some logic.

```bash
├── src
│   ├── components
│   │   ├── {component-name}.scss
│   │   ├── {component-name}.html
│   │   ├── {component-name}.js
├── partials
│   ├── js
│   ├── scss
├── tests
│   ├── *.test.js
├── dist (for build)
```

```bash
# Clone repository
git clone git@gitlab.com:naylalabs/web/vanilla-web-components.git
cd vanilla-web-components

# Install npm packages
npm install

# Run development mode
npm run build:dev
npm run start:dev
#http://localhost:3000
```

# License 
Vanilla Web Components is MIT Licensed.
