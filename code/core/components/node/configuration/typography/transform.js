'use strict'

import BoxConfig  from 'core/components/node/configuration/box/config.js'
import TextShadow from 'core/components/node/configuration/typography/textshadow.js'

// Actions
import {replaceStyle, toggleStyle, getStyle, getCascade} from 'core/actions/styling.js'

export default class Transform extends BoxConfig {
    render() {
        const style = getStyle(this.props.node, this.props.device)
        const cascade = getCascade(this.props.node, this.props.device)

        return (
            <span {...this.props}>
                <a
                    className={"btn" + String(style.compareProperty('fontWeight', 'bold')
                    ? ' active'
                    : '') + String(cascade.inheritsProperty('fontWeight', 'bold', 'desktop') && !style.hasProperty('textAlign')
                    ? ' cascades'
                    : '')}
                    onClick={() => {
                    toggleStyle(this.props.node, {
                        fontWeight: 'bold'
                    }, this.props.device)
                }}><i className="fa fa-bold"/>
                    <i className="fa fa-caret-down"/></a>
                <a
                    className={"btn fa fa-italic" + String(style.compareProperty('fontStyle', 'italic')
                    ? ' active'
                    : '') + String(cascade.inheritsProperty('fontStyle', 'italic', 'desktop') && !style.hasProperty('textAlign')
                    ? ' cascades'
                    : '')}
                    onClick={() => {
                    toggleStyle(this.props.node, {
                        fontStyle: 'italic'
                    }, this.props.device)
                }}/>
                <a
                    className={"btn fa fa-underline" + String(style.compareProperty('textDecoration', 'underline')
                    ? ' active'
                    : '') + String(cascade.inheritsProperty('textDecoration', 'underline', 'desktop') && !style.hasProperty('textAlign')
                    ? ' cascades'
                    : '')}
                    onClick={() => {
                    toggleStyle(this.props.node, {
                        textDecoration: 'underline'
                    }, this.props.device)
                }}/>
                <a
                    className="btn advanced"
                    ref="transformAdvanced"
                    onClick={() => this.openDropdown('transformAdvanced', 'wordSpacing')}>
                    <i className="fa fa-cog "/>
                    <i className="fa fa-caret-down"/>
                </a>
                {this.renderDropDown()}
            </span>
        )
    }

    renderDropDown() {
        const style = getStyle(this.props.node, this.props.device)
        const cascade = getCascade(this.props.node, this.props.device)
        if (this.state.open) {
            return (
                <BoxConfig.DropDown subject={this.refs[this.state.subject]}>
                    <h6>Spacing</h6>
                    <div className="form-field">
                        <div className="form-field-group">
                            <a
                                className={"btn fa fa-strikethrough" + String(style.compareProperty('textDecoration', 'line-through')
                                ? ' active'
                                : '') + String(cascade.inheritsProperty('textDecoration', 'line-through', 'desktop') && !style.hasProperty('textAlign')
                                ? ' cascades'
                                : '')}
                                onClick={() => {
                                toggleStyle(this.props.node, {
                                    textDecoration: 'line-through'
                                }, this.props.device)
                            }}/>
                        </div>
                        <div className="form-field-group">
                            <span className="label">Word</span>
                            <input
                                type="text"
                                name="wordSpacing"
                                defaultValue={style.get('wordSpacing', 'normal')}
                                ref="wordSpacing"
                                className="input input-xs"
                                onBlur={event => this.closeDropDown()}
                                onChange={event => {
                                this.setStyle("wordSpacing", event.target.value)
                            }}
                                onMouseDown={event => {
                                event.stopPropagation()
                            }}/>
                        </div>
                        <div className="form-field-group">
                            <span className="label">Letter</span>
                            <input
                                type="text"
                                name="letterSpacing"
                                defaultValue={style.get('letterSpacing', 'normal')}
                                ref="letterSpacing"
                                className="input input-xs"
                                onBlur={event => this.closeDropDown()}
                                onChange={event => {
                                this.setStyle("letterSpacing", event.target.value)
                            }}
                                onMouseDown={event => {
                                event.stopPropagation()
                            }}/>
                        </div>
                    </div>
                    <h6>Capitalization</h6>
                    <div className="form-field">
                        <a
                            className={"btn" + String(style.compareProperty('textTransform', 'none')
                            ? ' active'
                            : '') + String(cascade.inheritsProperty('textTransform', 'none', 'desktop') && !style.hasProperty('textTransform')
                            ? ' cascades'
                            : '')}
                            onClick={() => {
                            toggleStyle(this.props.node, {
                                textTransform: 'none'
                            }, this.props.device)
                        }}>None</a>
                        <a
                            className={"btn" + String(style.compareProperty('textTransform', 'capitalize')
                            ? ' active'
                            : '') + String(cascade.inheritsProperty('textTransform', 'capitalize', 'desktop') && !style.hasProperty('textTransform')
                            ? ' cascades'
                            : '')}
                            onClick={() => {
                            toggleStyle(this.props.node, {
                                textTransform: 'capitalize'
                            }, this.props.device)
                        }}>Capitalize</a>
                        <a
                            className={"btn" + String(style.compareProperty('textTransform', 'lowercase')
                            ? ' active'
                            : '') + String(cascade.inheritsProperty('textTransform', 'lowercase', 'desktop') && !style.hasProperty('textTransform')
                            ? ' cascades'
                            : '')}
                            onClick={() => {
                            toggleStyle(this.props.node, {
                                textTransform: 'lowercase'
                            }, this.props.device)
                        }}>Lowercase</a>
                        <a
                            className={"btn" + String(style.compareProperty('textTransform', 'uppercase')
                            ? ' active'
                            : '') + String(cascade.inheritsProperty('textTransform', 'uppercase', 'desktop') && !style.hasProperty('textTransform')
                            ? ' cascades'
                            : '')}
                            onClick={() => {
                            toggleStyle(this.props.node, {
                                textTransform: 'uppercase'
                            }, this.props.device)
                        }}>Uppercase</a>
                    </div>
                    <TextShadow {...this.props}/>
                </BoxConfig.DropDown>
            )
        }
    }
}
