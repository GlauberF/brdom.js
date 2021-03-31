## BrDom.js
<div align="center">
    <a href="https://formly.dev">
        <img width="200" src="https://raw.githubusercontent.com/GlauberF/brdom.js/main/logo.svg?sanitize=true">
    </a>
    <br/>
    Runtime dynamic html generator with javascript.<br><br>
</div>
<br/><br/>
<a href="https://www.buymeacoffee.com/glauber" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## Why?
I was writing an application in which I needed to create html elements on the fly (at run time), as it had dynamic data.
I found some options on the internet, but I wanted something simpler, where I could define several templates (json structure) and call it as I would use it and passing the API data to this template.

Because we have an array of children, with each child having the same shape as the father. In theory, we could nest DOM elements infinitely with this format.

* Simple.
* Create a simple format for templates.
* Very light.
* Javascript vanilla
* No dependencies

## how to use?

**JSON Template**
* **example** is a template.
* **obj**(Object) is the data you would receive via API or otherwise.

```javascript
const Templates = {
    example: function(obj) {
        return {
            tag: 'div',
            id: obj.id,
            classes: ['doc-icon'],
            properties: {
                title: obj.name,
                tabIndex: 0
            },
            children: [
                {
                    tag: 'div',
                    classes: ['doc-icon-header'],
                    children: [
                        { tag: 'h3', content: obj.name }
                    ]
                },
                {
                    tag: 'div',
                    id: 'docControls',
                    classes: ['doc-controls'],
                    children: [
                        {
                            tag: 'button',
                            classes: ['doc-control'],
                            id: 'edit',
                            content: 'Edit',
                            children: [
                                {
                                    tag: 'i',
                                    classes: ['fa', 'fa-edit']
                                }
                            ]
                        },
                        {
                            tag: 'button',
                            classes: ['doc-control'],
                            id: 'delete',
                            content: 'Delete',
                            children: [
                                {
                                    tag: 'i',
                                    classes: ['fa', 'fa-trash']
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}
```

**Instantiating a template**
```javascript
const template1 = new BrDom(Templates.example({ id: 1, name: 'Test action buttons' }));
```

**Get the Dom**
```javascript
console.log('DOM: ', template1.domElement);
```

**Get an element**
```javascript
console.log('findChildById: ', template1.findChildById('edit'));
console.log('findChildByClassName: ', template1.findChildByClassName('doc-control'));
```

**Add Event**
```javascript
// Function that will be called, when event is triggered
const _fn = () => {
    console.log('<< call >>')
};
// Adding event to the element with _id edit
template1.event(_fn.bind(this), 'edit');
// Listening to element events with id edit
document.getElementById("edit").addEventListener("click", (el) => {
    console.log('working -> ', el);
});
```

**Add created html to the current document**
* html
```html
  <div id="dynamicDom"></div>
```
* javascript
```javascript
    document.getElementById("dynamicDom").appendChild(template1.domElement);
```

See our example in the `example` folder!

## Core Team
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/GlauberF">
        <img src="https://avatars.githubusercontent.com/u/11314585?v=4" width="100px;" />
        <br />
        <sub><b>Glauber Funez</b></sub>
      </a>
    </td>
  </tr>
</table>

## Contributors
Be the first to contribute, send your pull request

## License
MIT
