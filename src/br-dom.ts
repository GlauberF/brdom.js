export default class BrDom {
    private readonly eventListeners: any[];
    private readonly children: any[];
    private element: any;
    private id: any;
    private conditions: {
        [k: string]: {
            operator: '=='|'==='|'!='|'!=='|'>'|'>='|'<'|'<='|'!null'|'=null'|'!undefined'|'=undefined';
            value: any;
            analyzes: any;
            reservedStructure?: {
                classes?: string[];
                properties?: {
                    [k: string]: any
                };
                content?: any
            }
        };
    };
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
     * Analyzes if it has if condition and if it meets to continue
     * @param conditions
     * @param domElement
     * @private
     */
    private _checkConditions(conditions, domElement) {
        // IF
        if(conditions?.if && Array.isArray(conditions.if)) {
            for (const condition of this.conditions.if) {
                if (condition.operator === '==' || condition.operator === '===') {
                    if(condition.value !== condition.analyzes) {
                        return domElement;
                    }
                }
                if (condition.operator === '!=' || condition.operator === '!==') {
                    if(condition.value === condition.analyzes) {
                        return domElement;
                    }
                }
                if (condition.operator === '>' || condition.operator === '>=') {
                    if(condition.value < condition.analyzes) {
                        return domElement;
                    }
                }
                if (condition.operator === '<' || condition.operator === '<=') {
                    if(condition.value > condition.analyzes) {
                        return domElement;
                    }
                }
                if (condition.operator === '=null') {
                    if(condition.value !== null) {
                        return domElement;
                    }
                }
                if (condition.operator === '!null') {
                    if(condition.value === null) {
                        return domElement;
                    }
                }
                if (condition.operator === '=undefined') {
                    if(condition.value !== undefined) {
                        return domElement;
                    }
                }
                if (condition.operator === '!undefined') {
                    if(condition.value === undefined) {
                        return domElement;
                    }
                }
            }
        }
    }

    /**
     * Return the DOM
     * @example
     * const template1 = new Dominator(Templates.any({name: 'Glauber Funez'}));
     * console.log(template1.domElement);
     */
    get domElement(): HTMLElement {
        let domElement = document.createElement(this.tag);

        // Conditions
        if(this._checkConditions(this.conditions, domElement)) {
            this.element = '';
            return this.element;
        }

        if (this.id) {
            domElement.id = this.id
        }
        if (this.content !== null && this.content !== undefined) {
            domElement.innerText = this.content
        }
        if (this.properties) {
            for (const prop in this.properties) {
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
                if (child.id) {
                    this[child.id] = child.domElement
                }
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
                    if (found) {
                        return found
                    }
                }
            }
        }
        return false
    }

    /**
     * Returns a created HTML element, based on its Css Class
     * @example
     * // see the example/example.js file
     * const template1 = new BrDom(Templates.example({ id: 1, name: 'Test action buttons' }));
     * console.log(template1.findChildByClassName('doc-control'));
     * @param cssClass
     */
    findChildByClassName(cssClass: string) {
        if(this.children) {
            for(const child of this.children) {
                if(child.classes && child.classes.includes(cssClass)) {
                    return child;
                }
                else if(child.children) {
                    let found = child.findChildByClassName(cssClass);
                    if(found) {
                        return found;
                    }
                }
            }
        }
        return false;
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
