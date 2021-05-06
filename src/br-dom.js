export default class BrDom {
    constructor(object) {
        Object.assign(this, object);
        const childObjects = [];
        if (object.children) {
            for (const child of object.children) {
                const childObject = new BrDom(child);
                childObjects.push(childObject);
            }
        }
        this.eventListeners = [];
        this.children = childObjects;
        this.element = this.domElement;
    }
    _checkConditions(conditions, domElement) {
        // IF
        if ((conditions === null || conditions === void 0 ? void 0 : conditions.if) && Array.isArray(conditions.if)) {
            for (const condition of this.conditions.if) {
                if (condition.operator === '==' || condition.operator === '===') {
                    if (condition.value !== condition.analyzes) {
                        return domElement;
                    }
                }
                if (condition.operator === '!=' || condition.operator === '!==') {
                    if (condition.value === condition.analyzes) {
                        return domElement;
                    }
                }
                if (condition.operator === '>' || condition.operator === '>=') {
                    if (condition.value < condition.analyzes) {
                        return domElement;
                    }
                }
                if (condition.operator === '<' || condition.operator === '<=') {
                    if (condition.value > condition.analyzes) {
                        return domElement;
                    }
                }
            }
        }
    }
    get domElement() {
        let domElement = document.createElement(this.tag);
        if (this._checkConditions(this.conditions, domElement)) {
            this.element = '';
            return this.element;
        }
        if (this.id) {
            domElement.id = this.id;
        }
        if (this.content !== null && this.content !== undefined) {
            domElement.innerText = this.content;
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
                    this[child.id] = child.domElement;
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
    findChildById(id) {
        if (this.children) {
            for (const child of this.children) {
                if (child.id === id) {
                    return child;
                }
                else if (child.children) {
                    let found = child.findChildById(id);
                    if (found) {
                        return found;
                    }
                }
            }
        }
        return false;
    }
    findChildByClassName(cssClass) {
        if (this.children) {
            for (const child of this.children) {
                if (child.classes && child.classes.includes(cssClass)) {
                    return child;
                }
                else if (child.children) {
                    let found = child.findChildByClassName(cssClass);
                    if (found) {
                        return found;
                    }
                }
            }
        }
        return false;
    }
    event(action, id, type = 'click') {
        if (id) {
            const node = this.findChildById(id);
            if (node) {
                node.eventListeners.push({ type: type, action: action });
            }
        }
        else {
            this.eventListeners.push({ type: type, action: action });
        }
    }
}
