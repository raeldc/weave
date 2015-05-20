'use strict'

var keys = {
    behaviors : Symbol('behaviors'),
    properties: Symbol('properties'),
    children  : Symbol('children')
}

export default class Component extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.autoBind()

        var render = this.render.bind(this)

        this.render = () => {
            this.execute('beforeRender')
            let result = render()
            this.execute('afterRender', result)

            // Reset Children and Properties
            // We do this so the component is ready to change it again during its lifecycle
            this[keys.children] = [];
            this[keys.properties] = {};

            return result
        }

        if(this[keys.behaviors] === undefined) {
            this[keys.behaviors] = [];
        }

        if(this[keys.properties] === undefined) {
            this[keys.properties] = {};
        }

        if(this[keys.children] === undefined) {
            this[keys.children] = [];
        }

        if(typeof this.initialState === 'function') {
            this.state = this.initialState(props)
        }
    }

    // Bind an array of method name to class instance
    bind(methods) {
        methods.forEach(method => {
            this[method] = this[method].bind(this)
        })
    }

    // Bind all methods to class instance
    autoBind() {
        this.bind(
            Object.getOwnPropertyNames(this.constructor.prototype)
                .filter(prop => typeof this[prop] === 'function')
        )
    }

    addBehavior(...behaviors) {
        // If a list of uninstantiated behaviors
        if(_.isArray(behaviors)) {
            for(let behavior of behaviors) {
                if(this[keys.behaviors].indexOf(behavior) === -1) {
                    this[keys.behaviors].push(behavior)
                }
            }
        }

        return this
    }

    addChild(child) {
        if(React.isValidElement(child)) {
            let key = child['key']

            if(key !== undefined) {
                // We first remove the child before we insert it again
                this[keys.children] = this[keys.children].filter(element => {
                    return element['key'] !== key
                })

                this[keys.children].push(child)
            }
        }

        return this
    }

    getChildren() {
        let children = this[keys.children]

        if(_.size(children)) {
            return children
        }

        return null
    }

    setProperty(key, property) {
        this[keys.properties][key] = property

        return this
    }

    getProperty(key) {
        return this[keys.properties][key]
    }

    getProperties(key) {
        return this[keys.properties]
    }

    execute(command, ...args) {
        const commands = ['beforeMount', 'afterMount', 'beforeUpdate', 'afterUpdate', 'beforeUnmount', 'beforeRender', 'afterRender']

        if(command === 'shouldUpdate') {
            if(typeof this[command] === 'function') {
                if(this[command](this, ...args) === false) {
                    return false
                }
            }

            for(let behavior in this[keys.behaviors]) {
                if(typeof this[keys.behaviors][behavior][command] === 'function') {
                    if(this[keys.behaviors][behavior][command](this, ...args) === false) {
                        return false
                    }
                }
            }

            return true
        }

        if(commands.indexOf(command) !== -1) {
            if(typeof this[command] === 'function') {
                this[command](this, ...args)
            }

            this[keys.behaviors].forEach(behavior => {
                if(typeof behavior[command] === 'function') {
                    behavior[command](this, ...args)
                }
            })
        }

        return this
    }

    componentWillMount(...args) {
        this.execute('beforeMount', ...args)
    }

    componentDidMount(...args) {
        this.execute('afterMount', ...args)
    }

    shouldComponentUpdate(...args) {
        return this.execute('shouldUpdate', ...args)
    }

    componentWillUpdate(...args) {
        this.execute('beforeUpdate', ...args)
    }

    componentDidUpdate(...args) {
        this.execute('afterUpdate', ...args)
    }

    componentWillUnmount(...args) {
        this.execute('beforeUnmount', ...args)
    }

    render() {
        return null
    }
}