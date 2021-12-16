<img width="280" src="https://www.naylalabs.com/vanilla/src/assets/img/vanilla-logo.png" alt="Screenshot"/>

This is a library of web components with some useful input elements. 
It developed with vanilla `JavaScript` and embeded `CSS` for high performance.
You can see all input types at ***component list***.

### Component List

|Component|Description|
|---|---|
|`vanilla-input`|Text field element with animated label, hint, icon and indicator. [View demo](https://www.naylalabs.com/vanilla/)|

---

### Input Component
####`<vanilla-input>`

`vanilla-input` is custom text field element. It is support all native HTML text input attributes and it has **animated label, errors hint, hint text, icon and indicator**.\
You can see all custom attributes at **attributes list** with description.

|Custom Attr|Description|
|---|---|
|**label**|Sets label text. *(optional)*|
|**placeholder**|Sets placeholder text for input element . *(optional - native attr)*|
***All native HTML text input attributes is available.***

##### Usage
````html
<!-- Add script tag. -->
<script src="dist/input.text.min.js"></script>

<!-- Add HTML tag. -->
<vanilla-input 
    label="First Name" 
    placeholder="Fill your name">
</vanilla-input>
````

##### With Hint
`maxlength` is native input attribute.
````html
<vanilla-input 
    label="First Name" 
    placeholder="Fill your name"
    maxlength="20">
    <!-- Tag with slot="hint" attribute. -->
    <span slot="hint">Max. 20 chars</span>
</vanilla-input>
````

##### With Error Message
You can use multiple `errors` slot elements.\
Add `invalid` attribute for error mode.
````html
<vanilla-input 
    invalid
    label="First Name" 
    placeholder="Fill your name"
    required
    maxlength="20">
    <!-- Tag with slot="errors" attribute. -->
    <span slot="errors">Field is required</span>
    <span slot="errors" hidden>Length must be greater than 20</span>
</vanilla-input>
````

##### With Icon
You can use iconic font library or SVG graphic.\
Add `icon` slot for left icon.\
Add `indicator` slot for right icon.\
`success|danger|info` classes set indicator color.
````html
<vanilla-input 
    label="First Name" 
    placeholder="Fill your name">
    <!-- Tag with slot="icon" attribute for left icon. -->
    <span slot="icon">
        <i class="fa fa-user"></i>
    </span>
    <!-- Tag with slot="indicator" attribute for indicator. -->
    <span slot="indicator" class="success">
        <i class="fa fa-circle-notch"></i>
    </span>
</vanilla-input>
````
##### Access Component
````html
<vanilla-input 
    id="first-name"
    label="First Name" 
    placeholder="Fill your name">
</vanilla-input>

<script>
    var component = document.getElementById('first-name');
    
    // Get current value.
    console.log(component.value);

    // Add event listener.
    // $input - Ref to input text element in shadow DOM.
    component.$input.addEventListener('change', function($event) {
        console.log($event.target.value);
    });
</script>
````
---
### Styling
This library use global CSS varaibales for themes.
````scss
:root {
    // Default theme
    --background-color: #fcfcfc;
    --border-color: #e6e7e9;
    --label-color: #a6a6ab;
    --icon-color: #a6a6ab;
    --accent-color: #ffbeab;
    --danger-color: #dd8080;
    --success-color: #68ca8e;
    --info-color: #62aeda;
}
````
---
### Development Mode
#### Requirements

- **NodeJs** (v12.9.1)
- **NPM** (v6.14.8)

#### Folder Structer

- `src` is root folder. `src/components` contains component files.
- Each component consists of two files. (`.html` and `.js`)
- `.html` file contains DOM and style codes.
- `.js` file contains some logic.

```bash
├── src
│   ├── components
│   │   ├── {component-name}.html
│   │   ├── {component-name}.js
├── demos
│   ├── assets
│   ├── index.html
├── dist (for build)
```

```bash
# Clone repository.
git clone git@gitlab.com:naylalabs/web/vanilla-web-components.git
cd vanilla-web-components

# Install npm packages.
npm install

# Run development mode.
npm run build:dev
npm run start:dev
#http://localhost:3000
```
