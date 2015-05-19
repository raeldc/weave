import Behavior from 'core/components/behavior.js'

var keys = {
    behaviors : Symbol('behaviors'),
    properties: Symbol('properties'),
    children  : Symbol('children')
}

export default class Component extends React.Component {
    construct(props, context) {
        super(props, context)

        if(this[keys.behaviors] === undefined) {
            this[keys.behaviors] = {};
        }

        if(this[keys.properties] === undefined) {
            this[keys.properties] = {};
        }

        if(this[keys.children] === undefined) {
            this[keys.children] = [];
        }
    }

    addBehavior(behaviors) {
        // If a list of uninstantiated behaviors
        if(_.isArray(behaviors)) {
            for(let behavior of behaviors) {
                if(behavior.prototype instanceof Behavior) {
                    this.addBehavior(behavior)
                }
            }
        // If a singular behavior
        }else if(behaviors.prototype instanceof Behavior) {
            this[keys.behaviors][behaviors.prototype.name] = new behaviors(this)
        // If already instantiated
        }else if(behaviors instanceof Behavior) {
            this[keys.behaviors][behaviors.prototype.name] = behaviors.setComponent(this)
        }

        return this
    }

    addChildren(children) {
        // If a list of uninstantiated children
        if(_.isArray(children)) {
            for(let child of children) {
                if(React.isValidElement(child)) {
                    this.addChildren(child)
                }
            }
            // If a singular child
        }else if(React.isValidElement(children)) {
            this[keys.children].push(children)
        }

        return this
    }

    getChildren() {
        return this[keys.children]
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
        const commands = ['beforeMount', 'afterMount', 'beforeUpdate', 'afterUpdate', 'beforeUnmount', 'beforeRender']

        if(command === 'shouldUpdate') {
            for(let behavior in this[keys.behaviors]) {
                if(this[keys.behaviors][behavior][command](...args) === false) {
                    return false
                }
            }

            return true
        }

        if(commands.indexOf(command) !== -1) {
            for(let behavior in this[keys.behaviors]) {
                this[keys.behaviors][behavior][command](...args)
            }

            return this
        }
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
        this.execute('beforeRender', ...args)
    }
}