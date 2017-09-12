'use strict'

import Component        from 'core/component.js'
import UIPreviewFactory from 'core/components/node/factory.js'
import UIConfig         from 'core/stores/uiconfig.js'
import LayoutActions    from 'core/actions/layout.js'
import UIPreviewOverlay from 'core/ui/canvas/preview/overlay'

export default class Preview extends Component {
    initialState() {
        return UIConfig.Preview.toObject()
    }

    render() {
        return (
            <div className={"ui-preview " + this.state.device}>
                <iframe ref="iframe" src={this.state.page} onLoad={this.renderPreviewContent} />
            </div>
        )
    }

    shouldUpdate(nextProps, nextState) {
        return this.state.device !== nextState.device
    }

    afterMount() {
        window.preview = ReactDOM.findDOMNode(this.refs.iframe).contentWindow
        
        jQuery(window.preview).scroll(this.onFrameEvent)
        jQuery(window.preview).resize(this.onFrameEvent)
        jQuery(window.preview).mouseup(this.onFrameEvent)

        this.stopListeningToPreviewChanges = UIConfig.Preview.listen(this.changePreview)
    }

    beforeUnmount() {
        this.stopListeningToPreviewChanges()
        jQuery(window.preview).unbind('scroll')
        jQuery(window.preview).unbind('resize')
    }

    onFrameEvent(event) {
        LayoutActions.frameChanged(null, event)
        event.stopPropagation()
    }

    changePreview() {
        this.setState(this.initialState())
    }

    renderPreviewContent() {
        var doc = ReactDOM.findDOMNode(this.refs.iframe).contentDocument

        ReactDOM.render(
            UIPreviewFactory.createNode('root'),
            doc.getElementById('corebuilder-container')
        )

        ReactDOM.render(
            <UIPreviewOverlay />,
            doc.getElementById('corebuilder-overlay')
        )
    }
}