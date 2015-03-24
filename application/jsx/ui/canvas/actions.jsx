var Reflux = require('reflux');

var Actions = Reflux.createActions({
    canvasScrolled: {
        sync: true,
    },
    setDevice     : {
        sync: true,
        preEmit: function() {
            Actions.mouseOutNode();
        }
    },
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
    },
    nodeManipulated: {
        sync: true
    },
});

module.exports = Actions;