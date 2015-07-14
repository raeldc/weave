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
            <span className="dimensions">
                <ul>
                    <li className="title">Dimensions</li>
                    <li className="form-field-group width">
                        <span className="label">Width <i className="fa fa-arrows-v" /></span>
                        {this.renderClickField('width')}
                    </li>
                    <li className="form-field-group height">
                        <span className="label">Height <i className="fa fa-arrows-v" /></span>
                        {this.renderClickField('height')}
                    </li>
                </ul>
                {this.renderDropDown()}
            </span>
        )
    }

    renderClickField(subject = 'width') {
        const style = getStyle(this.props.node, this.props.device)

        return (
            <input
                type="text"
                name={subject}
                value={style.get(subject)}
                placeholder="auto"
                ref={subject}
                className="input input-xs"
                onFocus={event => this.openDropdown(subject)}
                onBlur={event => this.closeDropDown()}
                onChange={event => this.setStyle(subject, event.target.value)}
                onMouseDown={event => event.stopPropagation()}
            />
        )
    }

    renderDropDown() {
        const style = getStyle(this.props.node, this.props.device)

        if(this.state.open) {
            return (
                <BoxConfig.DropDown subject={this.refs[this.state.subject]} onMouseDown={event => {event.preventDefault()}}>
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
