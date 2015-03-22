var Nodes           = require('application/stores/nodes.js'),
    UICanvasFactory = require('application/ui/canvas/factory.js');

module.exports = {
    getInitialState: function() {
        var state       = Nodes.get(this.props.id);
        state.className = state.className || '';

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

        this.children = UICanvasFactory.createChildNodes(this.state.children, this.props.editMode) || [];
        return this.children;
    },

    prepareNodeProperties: function(nextProps, nextState) {
        var nextProps = nextProps || this.props;
        var nextState = nextState || this.state;

        this.nodeProperties = this.nodeProperties || {
            id        : this.props.id,
            classNames: nextState.className.split(' '),
        };

        this.nodeProperties.style = this.state.style;

        if(this.isText()) {
            var text = this.state.text.length ? this.state.text: '&nbsp;';

            this.children                               = undefined;
            this.nodeProperties.dangerouslySetInnerHTML = {__html: text};
        }

        return this.nodeProperties;
    },

    isText: function() {
        return _.isEmpty(this.state.children) && _.isString(this.state.text);
    }
}