var Nodes           = require('core/stores/nodes.js'),
    Preview          = require('core/stores/layout.js'),
    UIPreviewFactory = require('core/ui/preview/factory.js');

module.exports = {
    getInitialState: function() {
        var state       = Nodes.get(this.props.id)
        state.className = state.className || ''

        this.nodeProperties = this.nodeProperties || {
            id        : this.props.id,
            classNames: state.className.split(' '),
        }

        return state
    },

    componentWillMount: function() {
        this.prepareChildren()
        this.prepareNodeProperties()
    },

    componentWillUpdate: function(nextProps, nextState) {
        //TODO: Don't prepare children if nothing changed.
        this.prepareChildren(nextProps, nextState)
        this.prepareNodeProperties(nextProps, nextState)
    },

    prepareChildren: function(nextProps, nextState) {
        var nextProps = nextProps || this.props
        var nextState = nextState || this.state
        this.children = UIPreviewFactory.createChildNodes(nextState.children, nextProps.editMode) || []
        return this.children
    },

    prepareNodeProperties: function(nextProps, nextState) {
        var nextProps = nextProps || this.props
        var nextState = nextState || this.state
        var style     = nextState.css

        this.nodeProperties.style = _.extend(_.clone(style.all), style[Preview.get('device')])

        if(this.isText()) {
            var text = this.state.text.length ? this.state.text: '&nbsp;'

            this.children                               = undefined
            this.nodeProperties.dangerouslySetInnerHTML = {__html: text}
        }

        return this.nodeProperties
    },

    isText: function() {
        return _.isEmpty(this.state.children) && _.isString(this.state.text)
    }
}