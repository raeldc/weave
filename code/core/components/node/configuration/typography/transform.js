'use strict'

import Component from 'core/component.js'

// Actions
import {
    replaceStyle,
    toggleStyle,
    getStyle
} from 'core/actions/styling.js'

export default class Typography extends Component {
    render() {
        let Style = getStyle(this.props.node, this.props.device)
        return (
            <span {...this.props}>
                <a className={"btn" + Style.compareProperty('fontWeight', 'bold', ' active', '')} onClick={() => {
                    toggleStyle(this.props.node, {
                        fontWeight: 'bold'
                    }, this.props.device)
                }}><i className="fa fa-bold" /> <i className="fa fa-caret-down" /></a>
                <a className={"btn fa fa-italic" + Style.compareProperty('fontStyle', 'italic', ' active', '')} onClick={() => {
                    toggleStyle(this.props.node, {
                        fontStyle: 'italic'
                    }, this.props.device)
                }} />
                <a className={"btn fa fa-underline"  + Style.compareProperty('textDecoration', 'underline', ' active', '')} onClick={() => {
                    toggleStyle(this.props.node, {
                        textDecoration: 'underline'
                    }, this.props.device)
                }} />
                <a className="btn advanced"><i className="fa fa-cog " /> <i className="fa fa-caret-down" /></a>
            </span>
        )
    }
}
