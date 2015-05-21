'use strict'

function initialize(component) {
    if(_.isArray(component.state.classes)) {
        component.classes = _.uniq(component.state.classes.concat(component.classes || []))
    }
    else component.classes = []
}

function afterMount(component) {
    initialize(component)
}

function afterUpdate(component) {
    initialize(component)
}

function beforeRender(component) {
    let classes  = component.classes || []

    if(classes.length) {
        component.setProperty('className', classes.join(' '))
    }
}

export function addClass(component, name) {
    let {classes = []} = component

    if(classes.indexOf(name) === -1) {
        classes.push(name)
    }

    component.classes = classes
}

export function removeClass(component, name) {
    let {classes = []} = component

    if(classes.indexOf(name) !== -1) {
        classes = _.without(classes, name)
    }

    component.classes = classes
}

export default {initialize, afterMount, afterUpdate, beforeRender, addClass, removeClass}