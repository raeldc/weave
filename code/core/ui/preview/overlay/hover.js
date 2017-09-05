'use strict'

import Component from 'core/component.js'

import LayoutActions         from 'core/actions/layout.js'
import UIPreviewOverlayMixin from 'core/ui/preview/overlay/mixin.js'

import {initialize, displayOverlay, hideOverlay} from 'core/ui/preview/overlay/mixin.js'

export default class Hover extends Component {
    constructor(props, context) {
        super(props, context)
        this.addBehavior(UIPreviewOverlayMixin)
        initialize(this)
    }

    initialState() {
        return {type: 'hover'}
    }

    render() {
        var className = this.state.visible ? this.state.type : 'hidden'

        return (
            <rect className={className} 
                x={this.state.left} 
                y={this.state.top} 
                height={this.state.height} 
                width={this.state.width} />
        )
    }

    afterMount() {
        this.stopListeningToDisplayHoverOverlay = LayoutActions.displayHoverOverlay.listen((node) => displayOverlay(this, node))
    }

    beforeUnmount() {
        this.stopListeningToDisplayHoverOverlay()
        this.stopListeningToMouseOutNode()
    }

    listenToReverseSelection() {
        this.stopListeningToMouseOutNode  = LayoutActions.mouseOutNode.listen((node) => hideOverlay(this, node))
    }

    stopListeningToReverseSelection() {
        this.stopListeningToMouseOutNode()
    }
}