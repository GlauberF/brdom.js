// Javascript structure to be converted to HTML
// Obj - It is the data that you would see from the Database / API
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
                    conditions: {
                        if: [
                            {
                                operator: '=null',
                                value: null,
                                // analyzes: 1
                            }
                        ],
                    },
                    tag: 'div',
                    classes: ['doc-icon-header'],
                    children: [
                        { tag: 'h3', content: 'valor é null' }
                    ]
                },
                {
                    conditions: {
                        if: [
                            {
                                operator: '===',
                                value: obj.name,
                                analyzes: 'Test action buttons'
                            }
                        ],
                    },
                    tag: 'div',
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


// Instantiating the template
const template1 = new BrDom(Templates.example({ id: 1, name: 'Test action buttons' }));

// Get the Dom
console.log('DOM: ', template1.domElement);

// Get Element
console.log('findChildById: ', template1.findChildById('edit'));
console.log('findChildByClassName: ', template1.findChildByClassName('doc-control'));

// Add Event
window.setTimeout(() => {
    const _fn = () => {
        console.log('<< call >>')
    };
    template1.event(_fn.bind(this), 'edit');
    document.getElementById("dynamicDom").appendChild(template1.domElement);
    document.getElementById("edit").addEventListener("click", (el) => {
        console.log('working -> ', el);
    });
});

