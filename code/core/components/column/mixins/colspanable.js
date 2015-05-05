var Nodes       = require('core/stores/nodes.js'),
    LayoutStore = require('core/stores/layout.js');

module.exports = {
    setColspan: function(properties) {
        this.addClass('col-lg-' + this.getColspan('desktop'));
        this.addClass('col-md-' + this.getColspan('laptop'));
        this.addClass('col-sm-' + this.getColspan('tablet'));
        this.addClass('col-xs-' + this.getColspan('phone'));
    },

    getColspan: function(device) {
        var device  = device || LayoutStore.get('device');
        var colspan = Nodes.getStore(this.props.id).getStore('colspan').get(device);
        var columns = Nodes.get(this.state.parent).columns;

        return colspan * (12 / columns);
    },
}