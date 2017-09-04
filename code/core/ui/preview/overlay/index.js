'use strict'

import Component from 'core/component.js'

import UIPreviewOverlayHover    from 'core/ui/preview/overlay/hover.js'
import UIPreviewOverlaySelect   from 'core/ui/preview/overlay/select.js'
import UIPreviewOverlayControls from 'core/ui/preview/overlay/controls.js'

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