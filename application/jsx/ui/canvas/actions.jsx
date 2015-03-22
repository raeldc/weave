var Reflux = require('reflux');

var Actions = Reflux.createActions({
    setDevice    : {},
    mouseOverNode: {},
    unSelectNode : {
        sync: true,
    },
    selectNode   : {
        sync: true,
        preEmit: function(id) {
            Actions.unSelectNode();
        }
    }
});

module.exports = Actions;