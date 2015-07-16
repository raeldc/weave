'use strict'

import BoxConfig from 'core/components/node/configuration/box/config.js'

// Actions
import {
    mergeStyle,
    removeBackground,
} from 'core/actions/styling.js'

export default class Background extends BoxConfig {
    render() {
        return (
            <span>
                <a className="btn fa fa-eye advanced" />
                <img src={this.props.backgroundImage} ref="background" />
                <a className="btn configure advanced" onClick={event => this.openDropdown('background', 'backgroundImage')}>
                    <i className="fa fa-cog" />
                    <i className="fa fa-caret-down" />
                </a>
                {this.renderDropDown()}
                <a className="btn fa fa-trash advanced" onClick={event => this.deleteBackground(this.props.id)} />
            </span>
        )
    }

    renderDropDown() {
        if(this.state.open) {
            return (
                <BoxConfig.DropDown subject={this.refs.background} onMouseDown={event => {event.preventDefault()}}>
                    <div className="form-field">
                        <span className="label">URL</span>
                        <input
                            type="text"
                            name={'backgroundImage'}
                            defaultValue={this.props.backgroundImage}
                            ref={'backgroundImage'}
                            className="input input-lg"
                            onBlur={event => this.closeDropDown()}
                            onChange={event => this.setBackground('backgroundImage', event.target.value)}
                            onMouseDown={event => event.stopPropagation()}
                        />
                    </div>
                    <div className="form-field background-repeat">
                        <span className="label"><i className="fa fa-th" />Repeat</span>
                        <a className={"btn" + String(this.props.backgroundRepeatX ? ' active' : '')}
                            onClick={event => this.setBackground({
                                backgroundRepeatX  : !this.props.backgroundRepeatX,
                                backgroundPositionX: null,
                                backgroundPositionY: null,
                            })}>
                                Horizontal
                        </a>
                        <a className={"btn" + String(this.props.backgroundRepeatY ? ' active' : '')}
                            onClick={event => this.setBackground({
                                backgroundRepeatY  : !this.props.backgroundRepeatY,
                                backgroundPositionX: null,
                                backgroundPositionY: null,
                            })}>
                                Vertical
                        </a>
                    </div>
                    <h6><i className="fa fa-arrows" /> Position</h6>
                    <div className="form-field background-position-buttons">
                        <div className="background-position-top">
                            <a className={"btn" + String(this.props.backgroundPositionX === 'left' && this.props.backgroundPositionY === 'top'? ' active' : '')}
                                onClick={event => this.setBackground({
                                    backgroundRepeatX  : false,
                                    backgroundRepeatY  : false,
                                    backgroundPositionX: 'left',
                                    backgroundPositionY: 'top',
                                })}>
                                    <i className="fa fa-arrow-up left-top" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPositionX === 'center' && this.props.backgroundPositionY === 'top'? ' active' : '')}
                                onClick={event => this.setBackground({
                                    backgroundRepeatX  : false,
                                    backgroundRepeatY  : false,
                                    backgroundPositionX: 'center',
                                    backgroundPositionY: 'top',
                                })}>
                                    <i className="fa fa-arrow-up center-top" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPositionX === 'right' && this.props.backgroundPositionY === 'top'? ' active' : '')}
                                onClick={event => this.setBackground({
                                    backgroundRepeatX  : false,
                                    backgroundRepeatY  : false,
                                    backgroundPositionX: 'right',
                                    backgroundPositionY: 'top',
                                })}>
                                    <i className="fa fa-arrow-up right-top" />
                            </a>
                        </div>
                        <div className="background-position-center">
                            <a className={"btn" + String(this.props.backgroundPositionX === 'left' && this.props.backgroundPositionY === 'center'? ' active' : '')}
                                onClick={event => this.setBackground({
                                    backgroundRepeatX  : false,
                                    backgroundRepeatY  : false,
                                    backgroundPositionX: 'left',
                                    backgroundPositionY: 'center',
                                })}>
                                    <i className="fa fa-arrow-left left-center" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPositionX === 'center' && this.props.backgroundPositionY === 'center'? ' active' : '')}
                                onClick={event => this.setBackground({
                                    backgroundRepeatX  : false,
                                    backgroundRepeatY  : false,
                                    backgroundPositionX: 'center',
                                    backgroundPositionY: 'center',
                                })}>
                                    <i className="fa fa-arrows center" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPositionX === 'right' && this.props.backgroundPositionY === 'center'? ' active' : '')}
                                onClick={event => this.setBackground({
                                    backgroundRepeatX  : false,
                                    backgroundRepeatY  : false,
                                    backgroundPositionX: 'right',
                                    backgroundPositionY: 'center',
                                })}>
                                    <i className="fa fa-arrow-right right-center" />
                            </a>
                        </div>
                        <div className="background-position-bottom">
                            <a className={"btn" + String(this.props.backgroundPositionX === 'left' && this.props.backgroundPositionY === 'bottom'? ' active' : '')}
                                onClick={event => this.setBackground({
                                    backgroundRepeatX  : false,
                                    backgroundRepeatY  : false,
                                    backgroundPositionX: 'left',
                                    backgroundPositionY: 'bottom',
                                })}>
                                    <i className="fa fa-arrow-down left-bottom" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPositionX === 'center' && this.props.backgroundPositionY === 'bottom'? ' active' : '')}
                                onClick={event => this.setBackground({
                                    backgroundRepeatX  : false,
                                    backgroundRepeatY  : false,
                                    backgroundPositionX: 'center',
                                    backgroundPositionY: 'bottom',
                                })}>
                                    <i className="fa fa-arrow-down center-bottom" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPositionX === 'right' && this.props.backgroundPositionY === 'bottom'? ' active' : '')}
                                onClick={event => this.setBackground({
                                    backgroundRepeatX  : false,
                                    backgroundRepeatY  : false,
                                    backgroundPositionX: 'right',
                                    backgroundPositionY: 'bottom',
                                })}>
                                    <i className="fa fa-arrow-down right-bottom" />
                            </a>
                        </div>
                    </div>
                    <div className="form-field background-position">
                        <div className="form-field-group background-position-x">
                            <span className="label">X</span>
                            <input
                                type="text"
                                name="backgroundPositionX"
                                value={this.props.backgroundPositionX}
                                placeholder="left"
                                ref="backgroundPositionX"
                                className="input input-xs"
                                onBlur={event => this.closeDropDown()}
                                onChange={event => this.setBackground({
                                    backgroundRepeatX  : false,
                                    backgroundRepeatY  : false,
                                    backgroundPositionX: event.target.value,
                                })}
                                onMouseDown={event => event.stopPropagation()}
                            />
                        </div>
                        <div className="form-field-group background-position-y">
                            <span className="label">Y</span>
                            <input
                                type="text"
                                name="backgroundPositionY"
                                value={this.props.backgroundPositionY}
                                placeholder="top"
                                ref="backgroundPositionY"
                                className="input input-xs"
                                onBlur={event => this.closeDropDown()}
                                onChange={event => this.setBackground({
                                    backgroundRepeatX  : false,
                                    backgroundRepeatY  : false,
                                    backgroundPositionY: event.target.value,
                                })}
                                onMouseDown={event => event.stopPropagation()}
                            />
                        </div>
                    </div>
                    <h6><i className="fa fa-expand" /> Size</h6>
                    <div className="form-field background-size">
                        <a className={"btn" + String(this.props.backgroundSize === 'auto' ? ' active' : '')}
                            onClick={event => this.setBackground({
                                backgroundSize   : 'auto',
                                backgroundWidth  : null,
                                backgroundHeight : null,
                            })}>
                                Auto
                        </a>
                        <a className={"btn" + String(this.props.backgroundSize === 'contain' ? ' active' : '')}
                            onClick={event => this.setBackground({
                                backgroundSize   : 'contain',
                                backgroundWidth  : null,
                                backgroundHeight : null,
                            })}>
                                Contain
                        </a>
                        <a className={"btn" + String(this.props.backgroundSize === 'cover' ? ' active' : '')}
                            onClick={event => this.setBackground({
                                backgroundSize   : 'cover',
                                backgroundWidth  : null,
                                backgroundHeight : null,
                            })}>
                                Cover
                        </a>
                    </div>
                    <div className="form-field">
                        <div className="form-field-group background-width">
                            <span className="label">Width</span>
                            <input
                                type="text"
                                name="backgroundWidth"
                                value={this.props.backgroundWidth}
                                placeholder={this.props.backgroundSize !== 'auto' && !this.props.backgroundHeight ? 'n/a' : 'auto'}
                                ref="backgroundWidth"
                                className="input input-xs"
                                onBlur={event => this.closeDropDown()}
                                onChange={event => this.setBackground({
                                    backgroundSize  : null,
                                    backgroundWidth : event.target.value,
                                })}
                                onMouseDown={event => event.stopPropagation()}
                            />
                        </div>
                        <div className="form-field-group background-height">
                            <span className="label">Height</span>
                            <input
                                type="text"
                                name="backgroundHeight"
                                value={this.props.backgroundHeight}
                                placeholder={this.props.backgroundSize !== 'auto' && !this.props.backgroundWidth ? 'n/a' : 'auto'}
                                ref="backgroundHeight"
                                className="input input-xs"
                                onBlur={event => this.closeDropDown()}
                                onChange={event => this.setBackground({
                                    backgroundSize   : null,
                                    backgroundHeight : event.target.value,
                                })}
                                onMouseDown={event => event.stopPropagation()}
                            />
                        </div>
                    </div>
                </BoxConfig.DropDown>
            )
        }

        return null
    }

    setBackground(property, value) {
        const properties = {
            id : this.props.id,
        }

        if(_.isObject(property)) {
            _.extend(properties, property)
        }
        else properties[property] = value

        mergeStyle(this.props.node, {background: properties}, this.props.device)
    }

    deleteBackground(id) {
        removeBackground(this.props.node, this.props.id, this.props.device)
    }
}
