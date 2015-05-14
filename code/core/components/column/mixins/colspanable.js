var Nodes       = require('core/stores/nodes.js'),
    LayoutStore = require('core/stores/layout.js');

module.exports = {
    setColspan: function() {
        this.addClass('col-lg-' + this.getColspan('desktop'));
        this.addClass('col-md-' + this.getColspan('laptop'));
        this.addClass('col-sm-' + this.getColspan('tablet'));
        this.addClass('col-xs-' + this.getColspan('phone'));
    },

    getColspan: function(device) {
        var device, colspan, columns;

        device  = device || this.props.device;
        columns = Nodes.get(this.state.parent).columns;
        colspan = Nodes.getStore(this.props.id).getStore('colspan').get(device) || columns;

        return colspan * (12 / columns);
    },
}