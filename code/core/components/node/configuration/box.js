'use strict'

import CSSConfig        from 'core/components/node/configuration/cssconfig.js'
import DropDown         from 'core/ui/elements/dropdown.js'
import ReactColorPicker from 'react-color-picker'

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
                        <li className="top" ref="borderTop" onClick={() => {this.openDropdown('borderTop')}}>
                            <a className="clickField">{style.get('borderTop', '0px')}</a>
                        </li>
                        <li className="right" ref="borderRight" onClick={() => {this.openDropdown('borderRight')}}>
                            <a className="clickField">{style.get('borderRight', '0px')}</a>
                        </li>
                        <li className="bottom" ref="borderBottom" onClick={() => {this.openDropdown('borderBottom')}}>
                            <a className="clickField">{style.get('borderBottom', '0px')}</a>
                        </li>
                        <li className="left" ref="borderLeft" onClick={() => {this.openDropdown('borderLeft')}}>
                            <a className="clickField">{style.get('borderLeft', '0px')}</a>
                        </li>
                    </ul>
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

    closeBorderDropDown(event) {
        let delayer = setInterval(() => {
            if(document.activeElement !== React.findDOMNode(this.refs.subjectInput) && document.activeElement !== React.findDOMNode(this.refs.borderColor)) {
                this.closeDropDown()
                clearInterval(delayer)
            }
        }, 0)
    }

    getDropDown(style) {
        if(this.state.open) {
            if(this.state.subject.match(/^margin|^padding/g)) {
                return this.getSpacingDropDown(style)
            }else if(this.state.subject.match(/^border(.*)Radius/g)) {
                return this.getBorderRadiusDropDown(style)
            }else if(this.state.subject.match(/^border/g)) {
                return this.getBorderDropDown(style)
            }
        }

        return null
    }

    getSpacingDropDown(style) {
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
                    onBlur={this.closeDropDown}
                    onChange={event => {this.setStyle(this.state.subject, event.target.value)}}
                    onMouseDown={event => { event.stopPropagation() }}
                />
                <div className="btn-group select-sides">
                    <a className={"btn btn-default btn-xs" + allSides} onClick={event => {this.setStyle('allSides')}}>All Sides</a>
                    <a className={"btn btn-default btn-xs" + oneSide} onClick={event => {this.setStyle(this.state.subject)}}>{_.toWords(this.state.subject)}</a>
                </div>
            </DropDown>
        )
    }

    getBorderDropDown(style) {
        const allSides = this.state.allSides ? ' active' : ''
        const oneSide  = !this.state.allSides ? ' active' : ''

        return (
            <DropDown subject={this.refs[this.state.subject]} viewportWidth={300} onMouseDown={event => {event.preventDefault()}}>
                <div className="form-field border-width">
                    <span className="label">Thickness</span>
                    <input onChange={event => {
                        this.setStyle(this.state.subject+'Width', String(event.target.value).replace(/[^0-9]/g, 'x')+'px')
                    }} className="input-xs" ref="subjectInput" value={String(style.get(this.state.subject+'Width', '0')).replace(/[^0-9]/g, '')} type="text" name={this.state.subject+'Width'} onMouseDown={event => {event.stopPropagation()}} onBlur={this.closeBorderDropDown} />
                </div>
                <div className="form-field border-style">
                    <span className="label">Border Style</span>
                    <a className={
                        "btn btn-default btn-xs border-style-solid"
                        + String(style.compareProperty(this.state.subject+'Style', 'solid') ? ' active' : '')
                    }
                    onClick={() => {
                        this.setStyle(this.state.subject+'Style', 'solid')
                    }}><i>&nbsp;</i></a>
                    <a className={
                        "btn btn-default btn-xs border-style-dotted"
                        + String(style.compareProperty(this.state.subject+'Style', 'dotted') ? ' active' : '')
                    }
                    onClick={() => {
                        this.setStyle(this.state.subject+'Style', 'dotted')
                    }}><i>&nbsp;</i></a>
                    <a className={
                        "btn btn-default btn-xs border-style-dashed"
                        + String(style.compareProperty(this.state.subject+'Style', 'dashed') ? ' active' : '')
                    }
                    onClick={() => {
                        this.setStyle(this.state.subject+'Style', 'dashed')
                    }}><i>&nbsp;</i></a>
                    <a className={
                        "btn btn-default btn-xs border-style-none"
                        + String(style.compareProperty(this.state.subject+'Style', 'none') || !style.hasProperty(this.state.subject+'Style') ? ' active' : '')
                    }
                    onClick={() => {
                        this.setStyle(this.state.subject+'Style', 'none')
                    }}><i className="fa fa-times"></i></a>
                </div>
                <div className="form-field border-color">
                    <span className="label">Color</span>
                    <input
                        onChange={event => {this.setStyle(this.state.subject+'Color', event.target.value)}}
                        className="input-md"
                        value={style.get(this.state.subject+'Color')}
                        type="text" ref="borderColor"
                        name={this.state.subject+'Color'}
                        onMouseDown={event => {event.target.select()}}
                        onBlur={this.closeBorderDropDown}
                    />
                </div>
                <ReactColorPicker
                        defaultValue={style.get(this.state.subject+'Color')}
                        saturationWidth={150}
                        saturationHeight={150}
                        onChange={color => {this.setStyle(this.state.subject+'Color', color)}}
                        onDrag={color => {this.setStyle(this.state.subject+'Color', color)}}
                />
                <div className="btn-group select-sides">
                    <a className={"btn btn-default btn-xs" + allSides} onClick={event => {this.setStyle('allSides')}}>All Corners</a>
                    <a className={"btn btn-default btn-xs" + oneSide} onClick={event => {this.setStyle(this.state.subject)}}>{_.toWords(this.state.subject)}</a>
                </div>
            </DropDown>
        )
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
                    <a className={"btn btn-default btn-xs" + allSides} onClick={event => {this.setStyle('allSides')}}>All Sides</a>
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

            if(subject.match(/^margin/g)) {
                style = {
                    marginTop   : value,
                    marginRight : value,
                    marginBottom: value,
                    marginLeft  : value,
                }
            }else if(subject.match(/^padding/g)) {
                style = {
                    paddingTop   : value,
                    paddingRight : value,
                    paddingBottom: value,
                    paddingLeft  : value,
                }
            }else if(subject.match(/^border(.*)Radius/g)) {
                style = {
                    borderTopRightRadius    : value,
                    borderTopLeftRadius     : value,
                    borderBottomRightRadius : value,
                    borderBottomLeftRadius  : value,
                }
            }else if(subject.match(/^border/g)) {
                const Style = getStyle(this.props.node, this.props.device)
                const borderWidth = property === this.state.subject+'Width' ? value : Style.get(this.state.subject+'Width', 0)
                const borderStyle = property === this.state.subject+'Style' ? value : Style.get(this.state.subject+'Style', 'none')
                const borderColor = property === this.state.subject+'Color' ? value : Style.get(this.state.subject+'Color', '')

                style = {
                    borderTopWidth   : borderWidth,
                    borderTopStyle   : borderStyle,
                    borderTopColor   : borderColor,
                    borderRightWidth : borderWidth,
                    borderRightStyle : borderStyle,
                    borderRightColor : borderColor,
                    borderBottomWidth: borderWidth,
                    borderBottomStyle: borderStyle,
                    borderBottomColor: borderColor,
                    borderLeftWidth  : borderWidth,
                    borderLeftStyle  : borderStyle,
                    borderLeftColor  : borderColor,
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
