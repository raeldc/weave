'use strict'

import Component from 'core/component.js'

// Actions
import {
    replaceStyle,
    toggleStyle,
    getStyle,
    getCascade
} from 'core/actions/styling.js'

export default class Transform extends Component {
    render() {
        let style   = getStyle(this.props.node, this.props.device),
            cascade = getCascade(this.props.node, this.props.device)

        return (
            <span {...this.props}>
                <a className={"btn"
                    + String(style.compareProperty('fontWeight', 'bold') ? ' active' : '')
                    + String(cascade.inheritsProperty('fontWeight', 'bold', 'desktop') && !style.hasProperty('textAlign') ? ' cascades' : '')
                }
                onClick={() => {
                    toggleStyle(this.props.node, {
                        fontWeight: 'bold'
                    }, this.props.device)
                }}><i className="fa fa-bold" /> <i className="fa fa-caret-down" /></a>
                <a className={"btn fa fa-italic"
                    + String(style.compareProperty('fontStyle', 'italic') ? ' active' : '')
                    + String(cascade.inheritsProperty('fontStyle', 'italic', 'desktop') && !style.hasProperty('textAlign') ? ' cascades' : '')
                }
                onClick={() => {
                    toggleStyle(this.props.node, {
                        fontStyle: 'italic'
                    }, this.props.device)
                }} />
                <a className={"btn fa fa-underline"
                    + String(style.compareProperty('textDecoration', 'underline') ? ' active' : '')
                    + String(cascade.inheritsProperty('textDecoration', 'underline', 'desktop') && !style.hasProperty('textAlign') ? ' cascades' : '')
                }
                onClick={() => {
                    toggleStyle(this.props.node, {
                        textDecoration: 'underline'
                    }, this.props.device)
                }} />
                <a className="btn advanced"><i className="fa fa-cog " /> <i className="fa fa-caret-down" /></a>
            </span>
        )
    }
}
