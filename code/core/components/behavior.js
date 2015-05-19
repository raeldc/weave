var keys = {
    component: Symbol('component')
}

export default class Behavior {
    constructor(component) {
        this.setComponent(component)
    }

    setComponent(component) {
        this[keys.component] = component
    }

    beforeMount() {

    }

    afterMount() {

    }

    beforeUpdate(nextProps, nextState) {

    }

    shouldUpdate(nextProps, nextState) {

    }

    afterUpdate(prevProps, prevState) {

    }

    beforeUnmount() {

    }

    beforeRender() {

    }
}