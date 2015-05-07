var Nodes       = require('core/stores/nodes.js'),
    LayoutStore = require('core/stores/layout.js');

module.exports = {
    getInitialState: function() {
        return {open: false};
    },

    calculateOccupiedColumns: function(node, device) {
        var children = Nodes.get(node).children || [],
            device   = device || LayoutStore.get('device'),
            count    = 0;

        if(device === 'desktop') {
            _.each(children, function(node) {
                count += Number(Nodes.getStore(node).getStore('colspan').get(device)) || 0;
            });

            return count;
        }

        return null;
    },

    toggleOpen: function(event) {
        if(!this.state.open) {
            this.setState({open: true});

            this.bindClick()
        }else {
            this.setState({open: false});
            this.unbindClick()
        }

        event.stopPropagation();
    },

    bindClick: function() {
        jQuery(window).bind('mousedown.GridSelect' + this.props.node, this.toggleOpen);
    },

    unbindClick: function() {
        jQuery(window).unbind('mousedown.GridSelect' + this.props.node);
    }
}