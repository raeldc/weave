'use strict'

import LayoutActions      from 'core/actions/layout.js'
import NodeActions        from 'core/actions/node.js'
import Store              from 'core/stores'
import Nodes              from 'core/stores/nodes.js'
import * as Components    from 'core/stores/components.js'

let Layout = (new Store({device: 'desktop', screenLayout: 'split'})).setActions(LayoutActions, {
    onSetScreenLayout: function(layout) {
        if(this.get('screenLayout') !== layout) {
            this.set('screenLayout', layout)
            this.trigger('setScreenLayout',layout)
        }
    },

    onSetDevice: function(device) {
        if(this.get('device') !== device) {
            this.set('device', device)
            this.trigger(device)
        }
    },

    onSelectNode: function(id) {
        if(this.get('selectedNode') !== id) {
            this.set('selectedNode', id)
            this.trigger(id)
        }
    },

    onUnSelectNode: function() {
        this.set('selectedNode', null)
        this.trigger()
    },

    onDroppingOnNode: function(id) {
        if(this.get('pending_drop_subject') !== id) {
            this.set('pending_drop_subject', id)
        }
    },

    onDroppingOnNodePosition: function(position) {
        if(this.get('pending_drop_position') !== position) {
            this.set('pending_drop_position', position)
        }
    },

    onInsertingComponent: function(component) {
        this.set('pending_component', component)
    },

    onEndInsertingComponent: function(component) {
        this.set('pending_component',    null)
        this.set('pending_drop_subject', null)
    },

    onInsertComponent: function(component, subject, position) {
        var properties = _.extend({component: component}, Components.getDefaults(component))

        switch(position) {
            case 'bottom':
                NodeActions.insertNodeAfterSibling(properties, subject)
            break
            case 'top':
                NodeActions.insertNodeBeforeSibling(properties, subject)
            break
            default:
                NodeActions.addChildNode(subject, properties)
            break
        }
    },

    onStartDrag: function(id) {
        this.set('drag_subject', id)
    },

    onStopDrag: function(id) {
        this.remove('drag_subject')
    }
})

export default Layout