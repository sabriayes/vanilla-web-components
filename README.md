<img width="280" src="https://www.naylalabs.com/vanilla/src/assets/img/vanilla-logo.png" alt="Screenshot"/>

Web components library with native JavaScript.

## Vanilla Web Components

|Component|Description|
|---|---|
|`vanilla-input`|Text input element with animated label. [View demo](https://www.naylalabs.com/vanilla/)|

### Input Component
Use `vanilla-input` tag. See attributes list and example codes.

***All native input attributes is available.***

|Custom Attr|Description|
|---|---|
|**label**|Set label text. *optional*|
|**placeholder**|Set input element placeholder text. *optional - native attr*|

##### Default Usage
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
You can use multiple `errors` slot elements.
`invalid` attribute set error mode.
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
You can use iconic font library or SVG graphic.
Use `icon` slot for left icon.
Use `indicator` slot for right icon.
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
    component.addEventListener('change', function($event) {
        console.log($event.target.value);
    });
</script>
````

##### Styling
````scss
:root {
    // Default Theme
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
### Run in Development Mode
#### Requirements

- **NodeJs** (v12.9.1)
- **NPM** (v6.14.8)

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
