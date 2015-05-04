module.exports = {
    addClass: function(name) {
        this.classes = this.classes || [];

        if(this.classes.indexOf(name) === -1) {
            this.classes.push(name);
        }
    },

    removeClass: function(name) {
        this.classes = this.classes || [];

        if(this.classes.indexOf(name) !== -1) {
            this.classes = _.without(this.classes, name);
        }
    },

    setClass: function(properties) {
        var classes  = this.classes       || [];
        var defaults = properties.classes || [];

        classes = _.uniq(classes.concat(defaults));

        if(classes.length) {
            properties.className = classes.join(' ');
        }

        return properties;
    }
}