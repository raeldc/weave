'use strict'

import BoxConfig from 'core/components/node/configuration/box/config.js'

// Drag and Drop
import { DragSource, DropTarget } from 'react-dnd';

// Actions
import {
    mergeStyle,
    removeBackground,
} from 'core/actions/styling.js'

const backgroundSource = {
    beginDrag(props) {
        return {
            id: props.id
        }
    }
}

const backgroundTarget = {
    hover(props, monitor) {
        const subject = monitor.getItem().id;

        if (subject !== props.id) {
            props.reorder(subject, props.id);
        }
    }
}

class Background extends BoxConfig {
    render() {
        const {isDragging, connectDragSource, connectDropTarget} = this.props
        const style = {
            opacity: isDragging ? 0 : 1
        }

        return connectDropTarget(
            <span>
                {connectDragSource(
                <span style={style}>
                    <a className="btn fa fa-eye advanced" />
                        <img src={this.props.backgroundImage} ref="background" />
                    <a className="btn configure advanced" onClick={event => this.openDropdown('background', 'backgroundImage')}>
                        <i className="fa fa-cog" />
                        <i className="fa fa-caret-down" />
                    </a>
                    <a className="btn fa fa-trash advanced" onClick={event => this.deleteBackground(this.props.id)} />
                </span>
                )}
                {this.renderDropDown()}
            </span>
        )
    }

    renderDropDown() {
        if(this.state.open) {
            return (
                <BoxConfig.DropDown subject={this.refs.background}>
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
                                backgroundRepeatX: !this.props.backgroundRepeatX,
                            })}>
                                Horizontal
                        </a>
                        <a className={"btn" + String(this.props.backgroundRepeatY ? ' active' : '')}
                            onClick={event => this.setBackground({
                                backgroundRepeatY: !this.props.backgroundRepeatY,
                            })}>
                                Vertical
                        </a>
                    </div>
                    <h6><i className="fa fa-arrows" /> Position</h6>
                    <div className="form-field background-position-buttons">
                        <div className="background-position-top">
                            <a className={"btn" + String(this.props.backgroundPositionX === 'left' && this.props.backgroundPositionY === 'top'? ' active' : '')}
                                onClick={event => this.setBackground({
                                    backgroundPositionX: 'left',
                                    backgroundPositionY: 'top',
                                })}>
                                    <i className="fa fa-arrow-up left-top" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPositionX === 'center' && this.props.backgroundPositionY === 'top'? ' active' : '')}
                                onClick={event => this.setBackground({
                                    backgroundPositionX: 'center',
                                    backgroundPositionY: 'top',
                                })}>
                                    <i className="fa fa-arrow-up center-top" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPositionX === 'right' && this.props.backgroundPositionY === 'top'? ' active' : '')}
                                onClick={event => this.setBackground({
                                    backgroundPositionX: 'right',
                                    backgroundPositionY: 'top',
                                })}>
                                    <i className="fa fa-arrow-up right-top" />
                            </a>
                        </div>
                        <div className="background-position-center">
                            <a className={"btn" + String(this.props.backgroundPositionX === 'left' && this.props.backgroundPositionY === 'center'? ' active' : '')}
                                onClick={event => this.setBackground({
                                    backgroundPositionX: 'left',
                                    backgroundPositionY: 'center',
                                })}>
                                    <i className="fa fa-arrow-left left-center" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPositionX === 'center' && this.props.backgroundPositionY === 'center'? ' active' : '')}
                                onClick={event => this.setBackground({
                                    backgroundPositionX: 'center',
                                    backgroundPositionY: 'center',
                                })}>
                                    <i className="fa fa-arrows center" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPositionX === 'right' && this.props.backgroundPositionY === 'center'? ' active' : '')}
                                onClick={event => this.setBackground({
                                    backgroundPositionX: 'right',
                                    backgroundPositionY: 'center',
                                })}>
                                    <i className="fa fa-arrow-right right-center" />
                            </a>
                        </div>
                        <div className="background-position-bottom">
                            <a className={"btn" + String(this.props.backgroundPositionX === 'left' && this.props.backgroundPositionY === 'bottom'? ' active' : '')}
                                onClick={event => this.setBackground({
                                    backgroundPositionX: 'left',
                                    backgroundPositionY: 'bottom',
                                })}>
                                    <i className="fa fa-arrow-down left-bottom" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPositionX === 'center' && this.props.backgroundPositionY === 'bottom'? ' active' : '')}
                                onClick={event => this.setBackground({
                                    backgroundPositionX: 'center',
                                    backgroundPositionY: 'bottom',
                                })}>
                                    <i className="fa fa-arrow-down center-bottom" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPositionX === 'right' && this.props.backgroundPositionY === 'bottom'? ' active' : '')}
                                onClick={event => this.setBackground({
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

export default DropTarget('background', backgroundTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(
    DragSource('background', backgroundSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging       : monitor.isDragging()
    }))(Background)
)
