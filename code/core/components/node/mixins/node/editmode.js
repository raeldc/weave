var Nodes         = require('core/stores/nodes.js'),
    LayoutActions = require('core/actions/layout.js');

module.exports = {
    componentWillMount: function() {
        if(this.props.editMode) {
            this.nodeProperties.classNames.push('ui-editmode');
        }
    },

    componentWillUpdate: function(nextProps, nextState) {
        if(this.props.editMode) {
            this.nodeProperties.classNames.push('ui-editmode');

            if(this.isText() && this.nodeProperties.contentEditable) {
                this.nodeProperties.classNames.push('editable');
            }else {
                this.nodeProperties.classNames = _.without(this.nodeProperties.classNames, 'editable');
            }
        }else {
            this.nodeProperties.classNames = _.without(this.nodeProperties.classNames, 'ui-editmode');
        }
    },

    componentDidMount: function() {
        if(this.props.editMode) {
            this.stopListeningToNodeChanges   = Nodes.getStore(this.props.id).listen(this.renderChanges);
            this.stopListeningToCSSChanges    = Nodes.getStore(this.props.id).getStore('css').listen(this.renderChanges);
            this.stopListeningToDeviceChanges = LayoutActions.setDevice.listen(this.renderChanges);
        }
    },

    componentWillUnmount: function() { 
        if(this.props.editMode) {
            this.stopListeningToNodeChanges();
            this.stopListeningToCSSChanges();
            this.stopListeningToDeviceChanges();
        }
    },

    renderChanges: function() {
        this.setState(Nodes.get(this.props.id));
    }
}