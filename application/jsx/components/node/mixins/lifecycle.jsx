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
        this.prepareChildren();
        this.prepareNodeProperties();
    },

    prepareChildren: function() {
        this.children = Factory.createChildNodes(this.state.children) || this.state.text || [];
        return this.children;
    },

    prepareNodeProperties: function() {
        this.nodeProperties = this.nodeProperties || {
            id       : this.props.id,
            style    : this.state.style,
            className: this.state.className || ''
        };

        if(_.isString(this.children)) {
            this.nodeProperties.dangerouslySetInnerHTML = {__html: this.children};
            this.children = undefined;
        }

        return this.nodeProperties;
    },

    addClass: function(className) {
        var classNames    = this.nodeProperties.className || '';
        var newClassNames = _.isArray(className) ? className : [className];

        this.nodeProperties.className = _.compact(_.uniq(classNames.split(' ').concat(newClassNames))).join(' ');
    },

    removeClass: function(className) {
        var classNames = this.nodeProperties.className.split(' ');
        this.nodeProperties.className = _.without(classNames, className).join(' ');
    }
}