'use strict'

import Component     from 'core/component.js'
import LayoutActions from 'core/actions/layout.js'

export default class DropDown extends Component {
    afterMount() {
        this.followSubject()
        this.stopListeningToFrameChanged = LayoutActions.windowChanged.listen(this.followSubject)
    }

    beforeUnmount() {
        this.stopListeningToFrameChanged()
    }

    render() {
        let children = this.props.children || null

        return(
            <div className={this.props.className || 'dropdown-box'} style={this.state || {}}>
                <div className="dropdown-container">
                    {this.props.children}
                </div>
            </div>
        )
    }

    followSubject() {
        let self          = this.getElementPosition(this),
            subject       = this.getElementPosition(this.props.subject),
            subjectCenter = subject.left + (subject.width / 2),
            viewport      = this.props.viewportWidth

        this.setState({
            top : subject.top + subject.height,
            // Make it center
            left: Math.max(this.props.viewportStart, Math.min(viewport - self.width, subjectCenter - (self.width / 2)))
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
    viewportStart: React.PropTypes.number,
    viewportWidth: React.PropTypes.number
}

DropDown.defaultProps = {
    viewportStart: 0,
    viewportWidth: jQuery(window).outerWidth()
}
