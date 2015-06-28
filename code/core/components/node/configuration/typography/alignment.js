'use strict'

import Component from 'core/component.js'

// Actions
import {
    replaceStyle,
    toggleStyle,
    getStyle,
    getCascade
} from 'core/actions/styling.js'

export default class Typography extends Component {
    render() {
        let style   = getStyle(this.props.node, this.props.device),
            cascade = getCascade(this.props.node, this.props.device)

        return (
            <span {...this.props}>
                <a  className={
                        "btn fa fa-align-left"
                        + String(style.compareProperty('textAlign', 'left') ? ' active' : '')
                        + String(cascade.hasProperty('textAlign') ? ' cascades' : '')
                    }
                    onClick={() => {
                        toggleStyle(this.props.node, {
                            textAlign: 'left'
                        }, this.props.device)
                    }}
                />
                <a className={
                        "btn fa fa-align-center"
                        + String(style.compareProperty('textAlign', 'center') ? ' active' : '')
                        + String(cascade.hasProperty('textAlign') ? ' cascades' : '')
                    }
                    onClick={() => {
                        toggleStyle(this.props.node, {
                            textAlign: 'center'
                        }, this.props.device)
                    }}
                />
                <a className={
                        "btn fa fa-align-justify"
                        + String(style.compareProperty('textAlign', 'justify') ? ' active' : '')
                        + String(cascade.hasProperty('textAlign') ? ' cascades' : '')
                    }
                    onClick={() => {
                        toggleStyle(this.props.node, {
                            textAlign: 'justify'
                        }, this.props.device)
                    }}
                />
                <a className={
                        "btn fa fa-align-right"
                            + String(style.compareProperty('textAlign', 'right') ? ' active' : '')
                            + String(cascade.hasProperty('textAlign') ? ' cascades' : '')
                    }
                    onClick={() => {
                        toggleStyle(this.props.node, {
                            textAlign: 'right'
                        }, this.props.device)
                    }}
                />
            </span>
        )
    }
}
