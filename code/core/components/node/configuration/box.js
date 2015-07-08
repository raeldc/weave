'use strict'

import CSSConfig from 'core/components/node/configuration/cssconfig.js'
import DropDown  from 'core/ui/elements/dropdown.js'

// Actions
import {
    mergeStyle,
    toggleStyle,
    getStyle,
    getCascade,
} from 'core/actions/styling.js'

export default class Box extends CSSConfig {
    initialState() {
        return {open: false, allSides: false}
    }

    afterUpdate() {
        if(this.refs.subjectInput) {
            let input = React.findDOMNode(this.refs.subjectInput)

            if(document.activeElement !== input) {
                input.select()
            }
        }
    }

    render() {
        const style       = getStyle(this.props.node, this.props.device)
        const cascade     = getCascade(this.props.node, this.props.device)
        const DropDownBox = this.state.open ? this.getDropDown(style) : null

        return (
            <div className="form-inline config config-box">
                <h5>Box</h5>
                <div className="wrapper">
                    <ul className="dimensions clearfix">
                        <li className="title">Dimensions</li>
                        <li className="form-field width"><span className="label">Width <i className="fa fa-arrows-h" /></span><input onChange={this.setInputValue} value={this.state.width} type="text" name="width" defaultValue="auto" /></li>
                        <li className="form-field height"><span className="label">Height <i className="fa fa-arrows-v" /></span><input onChange={this.setInputValue} value={this.state.height} type="text" name="height" defaultValue="auto" /></li>
                    </ul>
                </div>

                <div className="wrapper">
                    <ul className="alignment">
                        <li className="title">Alignment</li>
                        <li className="normal">
                            <a className="btn active"><i className="fa fa-th" /> Normal</a>
                        </li>
                        <li className="float-left">
                            <a className="btn"><i className="fa fa-square-o" /> <i className="fa fa-long-arrow-left" /></a>
                        </li>
                        <li className="center-block">
                            <a className="btn"><i className="fa fa-long-arrow-left" /> <i className="fa fa-square" /> <i className="fa fa-long-arrow-right" /></a>
                        </li>
                        <li className="float-right">
                            <a className="btn"><i className="fa fa-long-arrow-right" /> <i className="fa fa-square-o" /></a>
                        </li>
                    </ul>
                </div>
                <div className="wrapper">
                    <ul>
                        <li className="title">Border and Spacing</li>
                    </ul>
                </div>
                <div className="wrapper box-model">
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
                    <ul className="border">
                        <li className="title">Border</li>
                        <li className="top">
                            <a className="clickField">{this.state.borderTop || 0}</a>
                        </li>
                        <li className="right">
                            <a className="clickField">{this.state.borderRight || 0}</a>
                        </li>
                        <li className="bottom">
                            <a className="clickField">{this.state.borderBottom || 0}</a>
                        </li>
                        <li className="left">
                            <a className="clickField">{this.state.borderLeft || 0}</a>
                        </li>
                    </ul>
                    <ul className="radius">
                        <li className="title">Radius</li>
                        <li className="top-left">
                            <a className="clickField">{this.state.radiusTopLeft || 0}</a>
                        </li>
                        <li className="top-right">
                            <a className="clickField">{this.state.radiusTopRight || 0}</a>
                        </li>
                        <li className="bottom-right">
                            <a className="clickField">{this.state.radiusBottomRight || 0}</a>
                        </li>
                        <li className="bottom-left">
                            <a className="clickField">{this.state.radiusBottomLeft || 0}</a>
                        </li>
                    </ul>
                </div>
                {DropDownBox}
            </div>
        )
    }

    openDropdown(subject) {
        this.setState({
            open   : true,
            subject: subject
        })
    }

    closeDropdown() {
        this.setState({
            open   : false,
            subject: undefined
        })
    }

    getDropDown(style) {
        const allSides = this.state.allSides ? ' active' : ''
        const oneSide  = !this.state.allSides ? ' active' : ''

        return (
            <DropDown subject={this.refs[this.state.subject]} viewportWidth={300} onMouseDown={event => {event.preventDefault()}}>
                <input
                    type="text"
                    name={this.state.subject}
                    defaultValue={style.get(this.state.subject, '0px')}
                    ref="subjectInput"
                    className="input input-xs"
                    onBlur={this.closeDropdown}
                    onChange={(event) => {this.setStyle(this.state.subject, event.target.value)}}
                    onMouseDown={event => { event.stopPropagation() }}
                />
                <div className="btn-group select-sides" role="group">
                    <a className={"btn btn-default btn-xs" + allSides} onClick={event => {this.setStyle('allSides')}}>All Sides</a>
                    <a className={"btn btn-default btn-xs" + oneSide} onClick={event => {this.setStyle(this.state.subject)}}>{_.toWords(this.state.subject)}</a>
                </div>
            </DropDown>
        )
    }

    setStyle(property, value) {
        let style = {}

        if(value === undefined) {
            value = React.findDOMNode(this.refs.subjectInput).value
            this.state.allSides = false
        }

        if(property === 'allSides' || this.state.allSides) {
            this.state.allSides = true

            switch(this.state.subject) {
                case 'marginTop':
                case 'marginRight':
                case 'marginBottom':
                case 'marginLeft':
                    style = {
                        marginTop   : value,
                        marginRight : value,
                        marginBottom: value,
                        marginLeft  : value,
                    }
                break

                case 'paddingTop':
                case 'paddingRight':
                case 'paddingBottom':
                case 'paddingLeft':
                    style = {
                        paddingTop   : value,
                        paddingRight : value,
                        paddingBottom: value,
                        paddingLeft  : value,
                    }
                break
            }
        }else style[property] = value

        mergeStyle(this.props.node, style, this.props.device)
    }
}
