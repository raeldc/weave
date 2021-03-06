'use strict'

import Reflux from 'reflux'

let LayoutActions = Reflux.createActions({
    setScreenLayout : {},
    // Fired when the window has scrolled and if the window is resized
    windowChanged: {
    },
    // Fired when the frame has scrolled and if the frame is resized
    frameChanged: {
    },
    // Fired when a device is chosen.
    setDevice     : {
        sync: true,
        preEmit: function() {
            LayoutActions.mouseOutNode();
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
            LayoutActions.mouseOutNode();
        }
    },
    unSelectNode: {
        sync: true,
    },
    selectNode : {
        sync: true,
        preEmit: function() {
            LayoutActions.unSelectNode();
        }
    },
    startDrag: {
        sync: true
    },
    startResize: {
        sync: true
    },
    stopDrag: {
        sync: true,
        preEmit: function() {
            LayoutActions.unSelectNode();
            LayoutActions.mouseOutNode();
        }
    },
    stopResize: {
        sync: true
    },
    insertingComponent: {
        sync: true,
        preEmit: function() {
            LayoutActions.unSelectNode();
            LayoutActions.mouseOutNode();
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
})

export default LayoutActions
