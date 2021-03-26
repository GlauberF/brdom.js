var BrDom = /** @class */ (function () {
    /**
     * Constructor
     * @param object
     */
    function BrDom(object) {
        // @ts-ignore
        Object.assign(this, object);
        var childObjects = [];
        if (object.children) {
            for (var _i = 0, _a = object.children; _i < _a.length; _i++) {
                var child = _a[_i];
                var childObject = new BrDom(child);
                childObjects.push(childObject);
            }
        }
        this.eventListeners = [];
        this.children = childObjects;
        this.element = this.domElement;
    }
    Object.defineProperty(BrDom.prototype, "domElement", {
        /**
         * Return the DOM
         * @example
         * const template1 = new Dominator(Templates.any({name: 'Glauber Funez'}));
         * console.log(template1.domElement);
         */
        get: function () {
            var domElement = document.createElement(this.tag);
            if (this.id)
                domElement.id = this.id;
            if (this.content)
                domElement.innerText = this.content;
            if (this.properties) {
                for (var prop in this.properties) {
                    domElement[prop] = this.properties[prop];
                }
            }
            if (this.classes) {
                for (var _i = 0, _a = this.classes; _i < _a.length; _i++) {
                    var cssClass = _a[_i];
                    domElement.classList.add(cssClass);
                }
            }
            if (this.children) {
                for (var _b = 0, _c = this.children; _b < _c.length; _b++) {
                    var child = _c[_b];
                    domElement.append(child.domElement);
                    if (child.id)
                        this[child.id] = child.domElement;
                }
            }
            if (this.eventListeners) {
                for (var _d = 0, _e = this.eventListeners; _d < _e.length; _d++) {
                    var eventListener = _e[_d];
                    domElement.addEventListener(eventListener.type, eventListener.action);
                }
            }
            this.element = domElement;
            return domElement;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns a created HTML element, based on its ID
     * @example
     * const template1 = new Dominator(Templates.any({name: 'Glauber Funez'}));
     * console.log(template1.findChildById('htmlElementId'));
     * @param id
     */
    BrDom.prototype.findChildById = function (id) {
        if (this.children) {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child.id === id) {
                    return child;
                }
                else if (child.children) {
                    var found = child.findChildById(id);
                    if (found)
                        return found;
                }
            }
        }
        return false;
    };
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
    BrDom.prototype.event = function (action, id, type) {
        if (type === void 0) { type = 'click'; }
        if (id) {
            var node = this.findChildById(id);
            if (node) {
                node.eventListeners.push({ type: type, action: action });
            }
        }
        else {
            this.eventListeners.push({ type: type, action: action });
        }
    };
    return BrDom;
}());
