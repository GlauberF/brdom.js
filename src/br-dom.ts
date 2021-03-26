class BrDom {
    private readonly eventListeners: any[];
    private readonly children: any[];
    private element: any;
    private id: any;
    private content: any;
    private properties: any;
    private tag: any;
    private classes: any;

    /**
     * Constructor
     * @param object
     */
    constructor(object) {
        // @ts-ignore
        Object.assign(this, object);
        const childObjects = [];
        if (object.children){
            for (const child of object.children) {
                const childObject = new BrDom(child);
                childObjects.push(childObject);
            }
        }
        this.eventListeners = [];
        this.children = childObjects;
        this.element = this.domElement;
    }

    /**
     * Return the DOM
     * @example
     * const template1 = new Dominator(Templates.any({name: 'Glauber Funez'}));
     * console.log(template1.domElement);
     */
    get domElement(): HTMLElement {
        const domElement = document.createElement(this.tag);
        if (this.id) domElement.id = this.id;
        if (this.content) domElement.innerText = this.content;
        if (this.properties) {
            for (const prop in this.properties) {
                // domElement[prop] = this.properties[prop];
                domElement.setAttribute(prop, this.properties[prop]);
            }
        }
        if (this.classes) {
            for (const cssClass of this.classes) {
                domElement.classList.add(cssClass);
            }
        }
        if (this.children) {
            for (const child of this.children) {
                domElement.append(child.domElement);
                if (child.id) this[child.id] = child.domElement;
            }
        }
        if (this.eventListeners) {
            for (const eventListener of this.eventListeners) {
                domElement.addEventListener(eventListener.type, eventListener.action);
            }
        }
        this.element = domElement;
        return domElement;
    }

    /**
     * Returns a created HTML element, based on its ID
     * @example
     * const template1 = new Dominator(Templates.any({name: 'Glauber Funez'}));
     * console.log(template1.findChildById('htmlElementId'));
     * @param id
     */
    findChildById(id) {
        if (this.children) {
            for (const child of this.children) {
                if (child.id === id) {
                    return child
                } else if (child.children) {
                    let found = child.findChildById(id)
                    if (found) return found
                }
            }
        }
        return false
    }

    /**
     * Adds an event to the element based on the ID
     * @example
     *  const template1 = new Dominator(Templates.any({name: 'Glauber Funez'}));
     *  const _fn = () => { console.log('<< call >>') };
     *  template1.event(_fn.bind(this), 'htmlElementId');
     *  document.getElementById("htmlElementId").addEventListener("click", () => {
     *      console.log('working -> ', el);
     *  });
     * @param action
     * @param id
     * @param type
     */
    event(action, id, type = 'click') {
        if (id) {
            const node = this.findChildById(id)
            if (node) {
                node.eventListeners.push({type: type, action: action})
            }
        } else {
            this.eventListeners.push({type: type, action: action})
        }
    }
}