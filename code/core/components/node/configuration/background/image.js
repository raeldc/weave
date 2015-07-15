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
                            onClick={event => this.setBackground('backgroundRepeatX', !this.props.backgroundRepeatX)}>
                                Horizontal
                        </a>
                        <a className={"btn" + String(this.props.backgroundRepeatY ? ' active' : '')}
                            onClick={event => this.setBackground('backgroundRepeatY', !this.props.backgroundRepeatY)}>
                                Vertical
                        </a>
                    </div>
                    <div className="form-field background-position">
                        <span className="label"><i className="fa fa-arrows" />Position</span>
                        <div className="background-position-top">
                            <a className={"btn" + String(this.props.backgroundPosition === 'left top'? ' active' : '')}
                                onClick={event => this.setBackground('backgroundPosition', 'left top')}>
                                    <i className="fa fa-arrow-up left-top" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPosition === 'center top'? ' active' : '')}
                                onClick={event => this.setBackground('backgroundPosition', 'center top')}>
                                    <i className="fa fa-arrow-up center-top" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPosition === 'right top'? ' active' : '')}
                                onClick={event => this.setBackground('backgroundPosition', 'right top')}>
                                    <i className="fa fa-arrow-up right-top" />
                            </a>
                        </div>
                        <div className="background-position-center">
                            <a className={"btn" + String(this.props.backgroundPosition === 'left center'? ' active' : '')}
                                onClick={event => this.setBackground('backgroundPosition', 'left center')}>
                                    <i className="fa fa-arrow-left left-center" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPosition === 'center center'? ' active' : '')}
                                onClick={event => this.setBackground('backgroundPosition', 'center center')}>
                                    <i className="fa fa-arrows center" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPosition === 'right center'? ' active' : '')}
                                onClick={event => this.setBackground('backgroundPosition', 'right center')}>
                                    <i className="fa fa-arrow-right right-center" />
                            </a>
                        </div>
                        <div className="background-position-bottom">
                            <a className={"btn" + String(this.props.backgroundPosition === 'left bottom'? ' active' : '')}
                                onClick={event => this.setBackground('backgroundPosition', 'left bottom')}>
                                    <i className="fa fa-arrow-down left-bottom" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPosition === 'center bottom'? ' active' : '')}
                                onClick={event => this.setBackground('backgroundPosition', 'center bottom')}>
                                    <i className="fa fa-arrow-down center-bottom" />
                            </a>
                            <a className={"btn" + String(this.props.backgroundPosition === 'right bottom'? ' active' : '')}
                                onClick={event => this.setBackground('backgroundPosition', 'right bottom')}>
                                    <i className="fa fa-arrow-down right-bottom" />
                            </a>
                        </div>
                    </div>
                </BoxConfig.DropDown>
            )
        }

        return null
    }

    setBackground(property, value) {
        const properties = {
            id              : this.props.id,
            [`${property}`] : value
        }

        mergeStyle(this.props.node, {background: properties}, this.props.device)
    }

    deleteBackground(id) {
        removeBackground(this.props.node, this.props.id, this.props.device)
    }
}
