var Nodes       = require('core/stores/nodes.js'),
    LayoutStore = require('core/stores/layout.js');

module.exports = {
    getInitialState: function() {
        return {open: false};
    },

    toggleOpen: function(event) {
        if(!this.state.open) {
            this.setState({open: true});
            this.bindClick();
        }else {
            this.setState({open: false});
            this.unbindClick();
        }
    },

    bindClick: function() {
        jQuery(window).bind('mouseup.GridSelect' + this.props.node, this.toggleOpen);
    },

    unbindClick: function() {
        jQuery(window).unbind('mouseup.GridSelect' + this.props.node);
    }
}