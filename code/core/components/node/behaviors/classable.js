'use strict'

function initialize(component) {
    if(_.isArray(component.state.classes)) {
        component.classes = component.state.classes.concat([])
    }
    else component.classes = []
}

function beforeRender(component) {
    let classes  = component.classes || []

    if(classes.length) {
        component.setProperty('className', classes.join(' '))
    }
}

function afterRender(component) {
    initialize(component)
}

export function addClass(component, name) {
    let {classes = []} = component

    if(typeof name ==='string' && name.length > 0 && classes.indexOf(name) === -1) {
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

export default {initialize, beforeRender, afterRender, addClass, removeClass}
