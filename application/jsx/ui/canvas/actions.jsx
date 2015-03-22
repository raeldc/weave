var Reflux = require('reflux');

var Actions = Reflux.createActions({
    canvasScrolled: {
        sync: true,
    },
    setDevice     : {},
    deviceChanged : {},
    mouseOutNode  : {
        sync: true,
    },
    mouseOverNode: {
        sync: true,
        preEmit: function() {
            Actions.mouseOutNode();
        }
    },
    unSelectNode: {
        sync: true,
    },
    selectNode : {
        sync: true,
        preEmit: function() {
            Actions.unSelectNode();
        }
    }
});

module.exports = Actions;