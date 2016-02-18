'use strict'

import BoxConfig from 'core/components/node/configuration/box/config.js'

// Actions
import {
    mergeStyle,
    getStyle,
} from 'core/actions/styling.js'

export default class Margin extends BoxConfig {
    render() {
        const style = getStyle(this.props.node, this.props.device)

        return (
            <span>
                <ul className="margin">
                    <li className="title">Margin</li>
                    <li className="top">
                        <a className="clickField" ref="marginTop" onClick={() => {this.openDropdown('marginTop')}}>{style.get('marginTop', '0px')}</a>
                    </li>
                    <li className="right">
                        <a className="clickField" ref="marginRight" onClick={() => {this.openDropdown('marginRight')}}>{style.get('marginRight', '0px')}</a>
                    </li>
                    <li className="bottom">
                        <a className="clickField" ref="marginBottom" onClick={() => {this.openDropdown('marginBottom')}}>{style.get('marginBottom', '0px')}</a>
                    </li>
                    <li className="left">
                        <a className="clickField" ref="marginLeft" onClick={() => {this.openDropdown('marginLeft')}}>{style.get('marginLeft', '0px')}</a>
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
                <BoxConfig.DropDown subject={this.refs[this.state.subject]}>
                    <input
                        type="text"
                        name={this.state.subject}
                        defaultValue={style.get(this.state.subject, '0px')}
                        ref="subjectInput"
                        className="input input-xs"
                        onBlur={event => this.closeDropDown()}
                        onChange={event => {this.setStyle(this.state.subject, event.target.value)}}
                        onMouseDown={event => { event.stopPropagation() }}
                    />
                    <div className="btn-group select-sides">
                        <a className={"btn btn-default btn-xs" + allSides} onClick={event => {this.setStyle('allSides')}}>All Sides</a>
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
            value = ReactDOM.findDOMNode(this.refs.subjectInput).value
            this.state.allSides = false
        }

        if(property === 'allSides' || this.state.allSides) {
            style = {
                marginTop   : value,
                marginRight : value,
                marginBottom: value,
                marginLeft  : value,
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
