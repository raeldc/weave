var Dispatcher  = require('application/alchemy/dispatcher.js');

var _components = {};

var _groups = {
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
};

var _favorites = [];
var _recents   = [];

var Components = {
    register: function(component) {
        if(component.name === undefined) {
            throw new Error("Trying to register a component without an id.");
        }

        if(_components[component.name] === undefined) {
            _components[component.name] = component;
            _groups[component.group || 'others'].components.push(component.name);
        }

        return this;
    },

    get: function(name) {
        var component = _components[name];

        if(component === undefined) {
            throw new Error("Unregistered Component " + name);
        }

        return component;
    },

    registerGroup: function(id, title, description) {
        _groups[id] = {
            title      : title,
            description: description,
            components : []
        }
    },

    getGroups: function() {
        return _.clone(_groups);
    },

    getFavorites: function() {
        return _.clone(_favorites);
    },

    getRecents: function() {
        return _.clone(_recents);
    },

    // Returns the React Class
    getReactComponent: function(id) {
        return this.get(id).reactComponent;
    },

    getConfigurations: function(id) {
        return this.get(id).configurations;
    }
};

module.exports = Object.freeze(Components);