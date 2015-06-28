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
                <a className={"btn fa fa-align-left" + Style.compareProperty('textAlign', 'left', ' active', '')} onClick={() => {
                    toggleStyle(this.props.node, {
                        textAlign: 'left'
                    }, this.props.device)
                }} />
                <a className={"btn fa fa-align-center" + Style.compareProperty('textAlign', 'center', ' active', '')} onClick={() => {
                    toggleStyle(this.props.node, {
                        textAlign: 'center'
                    }, this.props.device)
                }} />
                <a className={"btn fa fa-align-justify" + Style.compareProperty('textAlign', 'justify', ' active', '')} onClick={() => {
                    toggleStyle(this.props.node, {
                        textAlign: 'justify'
                    }, this.props.device)
                }} />
                <a className={"btn fa fa-align-right" + Style.compareProperty('textAlign', 'right', ' active', '')} onClick={() => {
                    toggleStyle(this.props.node, {
                        textAlign: 'right'
                    }, this.props.device)
                }} />
            </span>
        )
    }
}
