'use strict'

import BoxConfig from 'core/components/node/configuration/box/config.js'

// Actions
import {
    mergeStyle,
    getStyle,
} from 'core/actions/styling.js'

export default class Border extends BoxConfig {
    render() {
        const style = getStyle(this.props.node, this.props.device)

        return (
            <span>
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
                    <div className="form-field border-width">
                        <span className="label">Thickness</span>
                        <input
                            onChange={event => {
                                this.setStyle(this.state.subject+'Width', String(event.target.value).replace(/[^0-9]/g, 'x')+'px')
                            }}
                            className="input-xs"
                            ref="subjectInput"
                            value={String(style.get(this.state.subject+'Width', '0')).replace(/[^0-9]/g, '')}
                            type="text" name={this.state.subject+'Width'}
                            onMouseDown={event => event.stopPropagation()}
                            onBlur={event => this.closeDropDown()}
                        />

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
                            onBlur={event => this.closeDropDown()}
                        />
                    </div>
                    <BoxConfig.ReactColorPicker
                            defaultValue={style.get(this.state.subject+'Color')}
                            saturationWidth={150}
                            saturationHeight={150}
                            onChange={color => {this.setStyle(this.state.subject+'Color', color)}}
                            onDrag={color => {this.setStyle(this.state.subject+'Color', color)}}
                    />
                    <div className="btn-group select-sides">
                        <a className={"btn btn-default btn-xs" + allSides} onClick={event => this.setStyle('allSides')}>All Sides</a>
                        <a className={"btn btn-default btn-xs" + oneSide} onClick={event => this.setStyle(this.state.subject)}>{_.toWords(this.state.subject)}</a>
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

        if(property === 'allSides' || this.state.allSides) {
            const
                Style       = getStyle(this.props.node, this.props.device),
                borderWidth = property === this.state.subject+'Width' ? value : Style.get(this.state.subject+'Width', 0),
                borderStyle = property === this.state.subject+'Style' ? value : Style.get(this.state.subject+'Style', 'none'),
                borderColor = property === this.state.subject+'Color' ? value : Style.get(this.state.subject+'Color', '')

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

                /**
                 * Yes we set the state directly but we are also sure that
                 *  `mergeStyle` will re-render this component.
                 */
                this.state.allSides = true
        }
        else style[property] = value

        /**
         * Yes we set the state directly but we are also sure that
         *  `mergeStyle` will re-render this component.
         */
        mergeStyle(this.props.node, style, this.props.device)
    }
}
