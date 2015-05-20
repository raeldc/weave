'use strict'

function afterMount(component) {
    component.classes = []
}

function afterUpdate(component) {
    component.classes = []
}

function beforeRender(component) {
    let classes  = component.classes                || [],
        defaults = component.getProperty('classes') || []

    classes = _.uniq(classes.concat(defaults))

    if(classes.length) {
        component.setProperty('className', classes.join(' '))
    }
}

export function addClass(component, name) {
    component.classes = component.classes || []

    if(component.classes.indexOf(name) === -1) {
        component.classes.push(name)
    }
}

export function removeClass(component, name) {
    component.classes = component.classes || []

    if(component.classes.indexOf(name) !== -1) {
        component.classes = _.without(component.classes, name)
    }
}

export default {afterMount, afterUpdate, beforeRender, addClass, removeClass}