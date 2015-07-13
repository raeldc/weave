'use strict'

import BoxConfig from 'core/components/node/configuration/box/config.js'

// Actions
import {
    mergeStyle,
    getStyle,
} from 'core/actions/styling.js'

export default class Dimensions extends BoxConfig {
    render() {
        const style = getStyle(this.props.node, this.props.device)

        return (
            <span>
                <ul className="dimensions clearfix">
                    <li className="title">Dimensions</li>
                    <li className="form-field width">
                        <span className="label">Width <i className="fa fa-arrows-v" /></span>
                        <a
                            className="clickField"
                            ref="width"
                            onClick={event => this.openDropdown('width')}> {style.get('width', 'auto')}
                        </a>
                    </li>
                    <li className="form-field height">
                        <span className="label">Height <i className="fa fa-arrows-v" /></span>
                        <a
                            className="clickField"
                            ref="height"
                            onClick={event => this.openDropdown('height')}> {style.get('height', 'auto')}
                        </a>
                    </li>
                </ul>
                {this.renderDropDown()}
            </span>
        )
    }

    renderDropDown() {
        const style = getStyle(this.props.node, this.props.device)

        if(this.state.open) {
            return (
                <BoxConfig.DropDown subject={this.refs[this.state.subject]} onMouseDown={event => {event.preventDefault()}}>
                    <div className={"form-field " + this.state.subject}>
                        <span className="label">{_.toWords(this.state.subject)}</span>
                        <input
                            type="text"
                            name={this.state.subject}
                            defaultValue={style.get(this.state.subject, '')}
                            ref="subjectInput"
                            className="input input-xs"
                            onBlur={event => this.closeDropDown()}
                            onChange={event => this.setStyle(this.state.subject, event.target.value)}
                            onMouseDown={event => event.stopPropagation()}
                        />
                    </div>
                    <div className={"form-field min-" + this.state.subject}>
                        <span className="label">Minimum {_.toWords(this.state.subject)}</span>
                        <input
                            type="text"
                            name={"min" + _.toWords(this.state.subject)}
                            defaultValue={style.get('min' + _.toWords(this.state.subject), '')}
                            ref={"min" + _.toWords(this.state.subject)}
                            className="input input-xs"
                            onBlur={event => this.closeDropDown()}
                            onChange={event => this.setStyle('min' + _.toWords(this.state.subject), event.target.value)}
                            onMouseDown={event => event.stopPropagation()}
                        />
                    </div>
                    <div className={"form-field max-" + this.state.subject}>
                        <span className="label">Maximum {_.toWords(this.state.subject)}</span>
                        <input
                            type="text"
                            name={"max" + _.toWords(this.state.subject)}
                            defaultValue={style.get('max' + _.toWords(this.state.subject), '')}
                            ref={"max" + _.toWords(this.state.subject)}
                            className="input input-xs"
                            onBlur={event => this.closeDropDown()}
                            onChange={event => this.setStyle('max' + _.toWords(this.state.subject), event.target.value)}
                            onMouseDown={event => event.stopPropagation()}
                        />
                    </div>
                </BoxConfig.DropDown>
            )
        }

        return null
    }
}
