'use strict'

var _favorites  = []
var _recents    = []
var _components = {}
var _groups     = {
    content: {
        title      : "Content",
        description: "These are components you use for page contents like title, text box and images.",
        components : []
    },
    layout: {
        title      : "Layout",
        description: "Components used for building the structure or layout of the page.",
        components : []
    },
    others: {
        title      : "Others",
        description: "Components who does not know where they should belong...",
        components : []
    }
}

export function register(component) {
    if(component.name === undefined) {
        throw new Error("Trying to register a component without an id.")
    }

    if(_components[component.name] === undefined) {
        _components[component.name] = component
        _groups[component.group || 'others'].components.push(component.name)
    }
}

export function get(name) {
    var component = _components[name]

    if(component === undefined) {
        throw new Error("Unregistered Component " + name)
    }

    return component
}

export function has(name) {
    return _components[name] !== undefined
}

export function registerGroup(id, title, description) {
    _groups[id] = {
        title      : title,
        description: description,
        components : []
    }
}

export function getGroups() {
    return _.clone(_groups)
}

export function getFavorites() {
    return _.clone(_favorites)
}

export function getRecents() {
    return _.clone(_recents)
}

// Returns the React Class
export function getNode(id) {
    return get(id).node
}

export function getConfigurations(id) {
    return get(id).configurations
}

export function getDefaults(id) {
    return get(id).defaults || {}
}
