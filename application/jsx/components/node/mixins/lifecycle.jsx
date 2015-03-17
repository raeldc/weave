var Factory = require('application/components/factory.js');
var Nodes   = require('application/stores/nodes.js');

module.exports = {
    getInitialState: function() {
        return Nodes.get(this.props.id);
    },

    componentWillMount: function() {
        this.prepareChildren();
        this.prepareNodeProperties();
    },

    componentWillUpdate: function() {
        //TODO: Don't prepare children if nothing changed.
        this.prepareChildren();
        this.prepareNodeProperties();
    },

    prepareChildren: function() {
        this.children = Factory.createChildNodes(this.state.children) || [];
        return this.children;
    },

    prepareNodeProperties: function() {
        this.nodeProperties = this.nodeProperties || {
            id: this.props.id,
        };

        this.nodeProperties.style = this.state.style;
        this.addClass(this.state.className);

        if(_.isEmpty(this.state.children) && _.isString(this.state.text)) {
            var text = this.state.text.length ? this.state.text: ' ';
            this.nodeProperties.dangerouslySetInnerHTML = {__html: text};
            this.children = undefined;
        }

        return this.nodeProperties;
    },

    addClass: function(className) {
        var className     = className || '';
        var classNames    = this.nodeProperties.className || '';
        var newClassNames = _.isArray(className) ? className : className.split(' ');

        this.nodeProperties.className = _.compact(_.uniq(classNames.split(' ').concat(newClassNames))).join(' ');
    },

    removeClass: function(className) {
        var classNames = this.nodeProperties.className.split(' ');
        this.nodeProperties.className = _.without(classNames, className).join(' ');
    }
}