var Reflux = require('reflux');

var Actions = Reflux.createActions({
    // Fired when the frame has scrolled and if the frame is resized
    frameChanged: {
    },
    // Fired when a device is chosen.
    setDevice     : {
        sync: true,
        preEmit: function() {
            Actions.mouseOutNode();
        }
    },
    // Fired when the node has changed but the changes aren't saved in the Node Store
    nodeTouched: {},
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
    startDrag: {

    },
    stopDrag: {
        preEmit: function() {
            Actions.unSelectNode();
            Actions.mouseOutNode();
        }
    },
    draggingOnTop: {

    },
    draggingOnRight: {

    },
    draggingOnBottom: {

    },
    draggingOnLeft: {

    },
    draggingInside: {

    },
    insertingComponent: {
        sync: true,
        preEmit: function() {
            Actions.unSelectNode();
            Actions.mouseOutNode();
        }
    },
    resetDropSubject: {
        sync: true
    },
    endInsertingComponent: {
        sync: true
    },
    insertComponent: {
        sync: true
    },
    displaySelectOverlay: {
        sync: true
    },
    displayHoverOverlay: {
        sync: true
    }
});

module.exports = Actions;