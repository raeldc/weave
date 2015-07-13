'use strict'

import Margin from 'core/components/node/configuration/box/margin.js'

// Actions
import {
    mergeStyle,
    getStyle,
} from 'core/actions/styling.js'

export default class Padding extends Margin {
    render() {
        const style = getStyle(this.props.node, this.props.device)

        return (
            <span>
                <ul className="padding">
                    <li className="title">Padding</li>
                    <li className="top">
                        <a className="clickField" ref="paddingTop" onClick={() => {this.openDropdown('paddingTop')}}>{style.get('paddingTop', '0px')}</a>
                    </li>
                    <li className="right">
                        <a className="clickField" ref="paddingRight" onClick={() => {this.openDropdown('paddingRight')}}>{style.get('paddingRight', '0px')}</a>
                    </li>
                    <li className="bottom">
                        <a className="clickField" ref="paddingBottom" onClick={() => {this.openDropdown('paddingBottom')}}>{style.get('paddingBottom', '0px')}</a>
                    </li>
                    <li className="left">
                        <a className="clickField" ref="paddingLeft" onClick={() => {this.openDropdown('paddingLeft')}}>{style.get('paddingLeft', '0px')}</a>
                    </li>
                </ul>
                {this.renderDropDown()}
            </span>
        )
    }

    setStyle(property, value) {
        const
            subject = this.state.subject || ''
        let
            style = {}

        if(value === undefined) {
            value = React.findDOMNode(this.refs.subjectInput).value
            this.state.allSides = false
        }

        if(property === 'allSides' || this.state.allSides) {
            /**
             * Yes we set the state directly but we are also sure that
             *  `mergeStyle` will re-render this component.
             */
            this.state.allSides = true
            style = {
                paddingTop   : value,
                paddingRight : value,
                paddingBottom: value,
                paddingLeft  : value,
            }
        }else style[property] = value

        mergeStyle(this.props.node, style, this.props.device)
    }
}
