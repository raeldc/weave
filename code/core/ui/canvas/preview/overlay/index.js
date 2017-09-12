'use strict'

import Component from 'core/component.js'

import UIPreviewOverlayHover    from 'core/ui/canvas/preview/overlay/hover.js'
import UIPreviewOverlaySelect   from 'core/ui/canvas/preview/overlay/select.js'
import UIPreviewOverlayControls from 'core/ui/canvas/preview/overlay/controls.js'

export default class Overlay extends Component {
    render() {
        return (
            <svg>
                <UIPreviewOverlayHover />
                <UIPreviewOverlaySelect />
            </svg>
        );
    }

    shouldUpdate() {
        return false
    }
}