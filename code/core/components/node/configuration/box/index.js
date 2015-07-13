'use strict'

import CSSConfig        from 'core/components/node/configuration/cssconfig.js'
import DropDown         from 'core/ui/elements/dropdown.js'
import ReactColorPicker from 'react-color-picker'

// Components
import Margin       from 'core/components/node/configuration/box/margin.js'
import Padding      from 'core/components/node/configuration/box/padding.js'
import Border       from 'core/components/node/configuration/box/border.js'
import BorderRadius from 'core/components/node/configuration/box/radius.js'

// Actions
import {
    mergeStyle,
    toggleStyle,
    getStyle,
    getCascade,
} from 'core/actions/styling.js'

export default class Box extends CSSConfig {
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
                    <BorderRadius {...this.props} />
                </div>
            </div>
        )
    }
}
