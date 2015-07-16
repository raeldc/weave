'use strict'

import BoxConfig from 'core/components/node/configuration/box/config.js'

// Actions
import {
    mergeStyle,
    getStyle,
} from 'core/actions/styling.js'

export default class BorderRadius extends BoxConfig {
    render() {
        const style = getStyle(this.props.node, this.props.device)

        return (
            <span>
                <ul className="radius">
                    <li className="title">Radius</li>
                    <li className="top-left" ref="borderTopLeftRadius" onClick={() => {this.openDropdown('borderTopLeftRadius')}}>
                        <a className="clickField">{style.get('borderTopLeftRadius', '0px')}</a>
                    </li>
                    <li className="top-right" ref="borderTopRightRadius" onClick={() => {this.openDropdown('borderTopRightRadius')}}>
                        <a className="clickField">{style.get('borderTopRightRadius', '0px')}</a>
                    </li>
                    <li className="bottom-right" ref="borderBottomRightRadius" onClick={() => {this.openDropdown('borderBottomRightRadius')}}>
                        <a className="clickField">{style.get('borderBottomRightRadius', '0px')}</a>
                    </li>
                    <li className="bottom-left" ref="borderBottomLeftRadius" onClick={() => {this.openDropdown('borderBottomLeftRadius')}}>
                        <a className="clickField">{style.get('borderBottomLeftRadius', '0px')}</a>
                    </li>
                </ul>
                {this.renderDropDown()}
            </span>
        )
    }

    renderDropDown() {
        const
            style    = getStyle(this.props.node, this.props.device),
            allSides = this.state.allSides ? ' active' : '',
            oneSide  = !this.state.allSides ? ' active' : ''

        if(this.state.open) {
            return (
                <BoxConfig.DropDown subject={this.refs[this.state.subject]} viewportWidth={300}>
                    <div className="form-field border-radius">
                        <span className="label">Radius</span>
                        <input onChange={event => {
                            this.setStyle(this.state.subject, String(event.target.value).replace(/[^0-9]/g, 'x')+'px')
                        }} className="input-xs" ref="subjectInput" value={String(style.get(this.state.subject, '0')).replace(/[^0-9]/g, '')} type="text" name={this.state.subject} onMouseDown={event => {event.stopPropagation()}} onBlur={event => this.closeDropDown()} />
                    </div>
                    <div className="btn-group select-sides">
                        <a className={"btn btn-default btn-xs" + allSides} onClick={event => {this.setStyle('allSides')}}>All Corners</a>
                        <a className={"btn btn-default btn-xs" + oneSide} onClick={event => {this.setStyle(this.state.subject)}}>{_.toWords(this.state.subject)}</a>
                    </div>
                </BoxConfig.DropDown>
            )
        }

        return null
    }

    setStyle(property, value) {
        let style = {}

        if(value === undefined) {
            value = React.findDOMNode(this.refs.subjectInput).value
            this.state.allSides = false
        }

        value = value.replace(/[^0-9]/g, '') + 'px'

        if(property === 'allSides' || this.state.allSides) {
            style = {
                borderTopRightRadius    : value,
                borderTopLeftRadius     : value,
                borderBottomRightRadius : value,
                borderBottomLeftRadius  : value,
            }

            /**
             * Yes we set the state directly but we are also sure that
             *  `mergeStyle` will re-render this component.
             */
            this.state.allSides = true
        }
        else style[property] = value

        mergeStyle(this.props.node, style, this.props.device)
    }
}
