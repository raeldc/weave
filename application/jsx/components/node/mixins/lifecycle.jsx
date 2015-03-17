var Factory = require('application/components/factory.js');
var Nodes   = require('application/stores/nodes.js');

module.exports = {
    getInitialState: function() {
        var state = Nodes.get(this.props.id);
        state.enableEditable = false;
        return state;
    },

    componentWillMount: function() {
        this.prepareChildren();
        this.prepareNodeProperties();
    },

    componentWillUpdate: function(nextProps, nextState) {
        //TODO: Don't prepare children if nothing changed.
        this.prepareChildren(nextProps, nextState);
        this.prepareNodeProperties(nextProps, nextState);
    },

    prepareChildren: function(nextProps, nextState) {
        var nextProps = nextProps || this.props;
        var nextState = nextState || this.state;

        this.children = Factory.createChildNodes(this.state.children) || [];
        return this.children;
    },

    prepareNodeProperties: function(nextProps, nextState) {
        var nextProps = nextProps || this.props;
        var nextState = nextState || this.state;

        this.nodeProperties = this.nodeProperties || {
            id       : this.props.id,
            className: ''
        };

        this.nodeProperties.style     = this.state.style;
        this.nodeProperties.className = nextState.className;

        if(this.isText()) {
            var text = this.state.text.length ? this.state.text: '&nbsp;';

            this.children                               = undefined;
            this.nodeProperties.dangerouslySetInnerHTML = {__html: text};
            this.nodeProperties.contentEditable         = this.state.enableEditable;
        }

        return this.nodeProperties;
    },

    isText: function() {
        return _.isEmpty(this.state.children) && _.isString(this.state.text);
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