'use strict'

import CSSConfig        from 'core/components/node/configuration/cssconfig.js'
import DropDown         from 'core/ui/elements/dropdown.js'
import ReactColorPicker from 'react-color-picker'

// Components
import Margin  from 'core/components/node/configuration/box/margin.js'
import Padding from 'core/components/node/configuration/box/padding.js'
import Border  from 'core/components/node/configuration/box/border.js'

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
            let active = false

            // Check if one of the refs are on focus
            _.each(this.refs, input => {
                if(document.activeElement === React.findDOMNode(input)) {
                    active = true
                }
            })

            // If not on focus, focus on it
            if(!active) {
                React.findDOMNode(this.refs.subjectInput).select()
            }
        }
    }

    render() {
        const style   = getStyle(this.props.node, this.props.device)
        const cascade = getCascade(this.props.node, this.props.device)

        return (
            <div className="form-inline config config-box">
                <h5>Box</h5>
                <div className="wrapper">
                    <ul className="dimensions clearfix">
                        <li className="title">Dimensions</li>
                        <li className="form-field width">
                            <span className="label">Width <i className="fa fa-arrows-h" /></span>
                            <input
                                onChange={event => {this.setStyle('width', event.target.value)}}
                                value={style.get('width', null)}
                                type="text"
                                name="width"
                            />
                        </li>
                        <li className="form-field height">
                            <span className="label">Height <i className="fa fa-arrows-v" /></span>
                            <input
                                onChange={event => {this.setStyle('height', event.target.value)}}
                                value={style.get('height', null)}
                                type="text"
                                name="height"
                            />
                        </li>
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
                    <Margin {...this.props} />
                    <Padding {...this.props} />
                    <Border {...this.props} />
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
                </div>
                {this.getDropDown(style)}
            </div>
        )
    }

    openDropdown(subject) {
        this.setState({
            open   : true,
            subject: subject
        })
    }

    closeDropDown() {
        this.setState({
            open   : false,
            subject: undefined
        })
    }

    getDropDown(style) {
        if(this.state.open) {
            if(this.state.subject.match(/^border(.*)Radius/g)) {
                return this.getBorderRadiusDropDown(style)
            }
        }

        return null
    }

    getBorderRadiusDropDown(style) {
        const allSides = this.state.allSides ? ' active' : ''
        const oneSide  = !this.state.allSides ? ' active' : ''

        return (
            <DropDown subject={this.refs[this.state.subject]} viewportWidth={300} onMouseDown={event => {event.preventDefault()}}>
                <div className="form-field border-radius">
                    <span className="label">Radius</span>
                    <input onChange={event => {
                        this.setStyle(this.state.subject, String(event.target.value).replace(/[^0-9]/g, 'x')+'px')
                    }} className="input-xs" ref="subjectInput" value={String(style.get(this.state.subject, '0')).replace(/[^0-9]/g, '')} type="text" name={this.state.subject} onMouseDown={event => {event.stopPropagation()}} onBlur={this.closeDropDown} />
                </div>
                <div className="btn-group select-sides">
                    <a className={"btn btn-default btn-xs" + allSides} onClick={event => {this.setStyle('allSides')}}>All Corners</a>
                    <a className={"btn btn-default btn-xs" + oneSide} onClick={event => {this.setStyle(this.state.subject)}}>{_.toWords(this.state.subject)}</a>
                </div>
            </DropDown>
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

        if(subject.match(/^border(.*)Radius/g)) {
            value = value.replace(/[^0-9]/g, '') + 'px'
        }

        if(property === 'allSides' || this.state.allSides) {
            this.state.allSides = true

            if(subject.match(/^border(.*)Radius/g)) {
                style = {
                    borderTopRightRadius    : value,
                    borderTopLeftRadius     : value,
                    borderBottomRightRadius : value,
                    borderBottomLeftRadius  : value,
                }
            }
        }else style[property] = value

        /**
         * Yes we set the state directly but we are also sure that
         *  `mergeStyle` will re-render this component.
         */
        mergeStyle(this.props.node, style, this.props.device)
    }
}
