module.exports = {
    getInitialState: function() {
        if(this.properties === undefined) {
            this.properties = {};
        }
    },

    componentDidMount: function() {
        this.classes = [];
    },

    componentDidUpdate: function() {
        this.classes = [];
    },

    addClass: function(name) {
        this.classes = this.classes || [];

        if(this.classes.indexOf(name) === -1) {
            this.classes.push(name);
        }

        return this;
    },

    removeClass: function(name) {
        this.classes = this.classes || [];

        if(this.classes.indexOf(name) !== -1) {
            this.classes = _.without(this.classes, name);
        }

        return this;
    },

    setClass: function() {
        var classes  = this.classes            || [];
        var defaults = this.properties.classes || [];

        classes = _.uniq(classes.concat(defaults));

        if(classes.length) {
            this.properties.className = classes.join(' ');
        }

        return this.properties;
    }
}