'use strict'

import Component from 'core/component.js'

import LayoutActions         from 'core/actions/layout.js'
import UINodeActions         from 'core/actions/node.js'
import PreviewStore          from 'core/stores/layout.js'
import UIPreviewOverlayMixin from 'core/ui/preview/overlay/mixin.js'

import {initialize, displayOverlay, hideOverlay} from 'core/ui/preview/overlay/mixin.js'

export default class Control extends Component {
    constructor(props, context) {
        super(props, context)
        this.addBehavior(UIPreviewOverlayMixin)
        initialize(this)
    }

    initialState() {
        return {type: 'controls'}
    }

    render() {
        var style = {
            left  : this.state.left,
            top   : this.state.top,
            height: this.state.height,
            width : this.state.width
        }

        var className = this.state.visible ? this.state.type : 'hidden'

        return (
            <div className={className} style={style}>
                <a className="btn" onClick={this.deleteNode}>Delete</a>
            </div>
        )
    }

    afterMount() {
        this.stopListeningToSelectNode = LayoutActions.selectNode.listen(() => displayOverlay(this))
    }

    beforeUnmount() {
        this.stopListeningSelectNode()
        this.stopListeningUnselectNode()
    }

    listenToReverseSelection() {
        this.stopListeningToUnSelectNode = LayoutActions.unSelectNode.listen(() => hideOverlay(this))
    }

    stopListeningToReverseSelection() {
        this.stopListeningToUnSelectNode()
    }

    deleteNode(event) {
        var node   = PreviewStore.get('selectedNode')
        var parent = node.parent

        LayoutActions.unSelectNode()
        LayoutActions.mouseOutNode()
        UINodeActions.deleteNode(node)

        event.stopPropagation()
    }
}