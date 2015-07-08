'use strict'

import Component     from 'core/component.js'
import LayoutActions from 'core/actions/layout.js'

export default class DropDown extends Component {
    afterMount() {
        this.followSubject()
        this.stopListeningToFrameChanged = LayoutActions.windowChanged.listen(this.followSubject)
    }

    newProps(component, props) {
        this.followSubject(props.subject)
    }

    beforeUnmount() {
        this.stopListeningToFrameChanged()
    }

    render() {
        const children = this.props.children || null

        return(
            <div className={this.props.className || 'dropdown-box'} style={this.state || {}}>
                <div className="dropdown-container">
                    {this.props.children}
                </div>
            </div>
        )
    }

    followSubject(subject) {
        let self            = this.getElementPosition(this),
            subjectPosition = subject ? this.getElementPosition(subject) : this.getElementPosition(this.props.subject),
            subjectCenter   = subjectPosition.left + (subjectPosition.width / 2),
            viewportStartX  = this.props.viewportStartX,
            viewportStartY  = this.props.viewportStartY,
            viewportWidth   = this.props.viewportWidth || jQuery(window).outerWidth(),
            viewportHeight  = this.props.viewportHeight || jQuery(window).outerHeight(),
            top             = viewportStartY + subjectPosition.top + subjectPosition.height

        this.setState({
            // Don't let it overlap at the bottom
            top : top + self.height >= viewportHeight ? (viewportHeight - self.height) - (viewportHeight - subjectPosition.top) : top,
            // Make it center
            left: Math.max(viewportStartX, Math.min(viewportWidth - self.width, subjectCenter - (self.width / 2)))
        })
    }

    getElementPosition(element) {
        let $element   = jQuery(React.findDOMNode(element)),
            nodeOffset = $element.offset(),
            info       = {
                width : $element.outerWidth(),
                height: $element.outerHeight(),
                top   : nodeOffset.top - jQuery(window).scrollTop(),
                left  : nodeOffset.left
            }

        return info
    }
}

DropDown.propTypes = {
    viewportStartX: React.PropTypes.number,
    viewportStartY: React.PropTypes.number,
    viewportWidth : React.PropTypes.number,
    viewportHeight: React.PropTypes.number
}

DropDown.defaultProps = {
    viewportStartX: 0,
    viewportStartY: 0,
    viewportWidth : undefined,
    viewportHeight: undefined
}
