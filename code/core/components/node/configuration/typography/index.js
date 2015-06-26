'use strict'

import CSSConfig from 'core/components/node/configuration/cssconfig.js'

// Actions
import {changeStyle, getStyle} from 'core/actions/styling.js'

export default class Typography extends CSSConfig {
    render() {
        let Style = getStyle(this.props.node, this.props.device)
        console.log('render Typography')
        return (
            <div className="form-inline config config-typography">
                <h5>Typography</h5>
                <div className="wrapper">
                    <ul className="typography">
                        <li className="font clearfix">
                            <span className="family">Font <i className="fa fa-chevron-down pull-right" /></span>
                            <span className="style">
                                <span className="font-size">
                                    <a className="btn preset-size clearfix">Normal <i className="fa fa-caret-down pull-right" /></a>
                                    <input onChange={this.setInputValue} value={this.state.size} type="number" min="0" max="999" name="fontSize" defaultValue="12" />
                                </span>

                                <span className="color">
                                    <input onChange={this.setInputValue} value={this.state.color} type="text" name="color" defaultValue="#000" />
                                    <a className="btn color-picker fa fa-eyedropper" />
                                </span>
                            </span>
                        </li>
                        <li className="formatting clearfix">
                            <span className="alignment">
                                <a className={"btn fa fa-align-left" + Style.compareProperty('textAlign', 'left', ' active', '')} onClick={() => {
                                    changeStyle(this.props.node, {
                                        textAlign: 'left'
                                    }, this.props.device)
                                }} />
                                <a className={"btn fa fa-align-center" + Style.compareProperty('textAlign', 'center', ' active', '')} onClick={() => {
                                    changeStyle(this.props.node, {
                                        textAlign: 'center'
                                    }, this.props.device)
                                }} />
                                <a className={"btn fa fa-align-justify" + Style.compareProperty('textAlign', 'justify', ' active', '')} onClick={() => {
                                    changeStyle(this.props.node, {
                                        textAlign: 'justify'
                                    }, this.props.device)
                                }} />
                                <a className={"btn fa fa-align-right" + Style.compareProperty('textAlign', 'right', ' active', '')} onClick={() => {
                                    changeStyle(this.props.node, {
                                        textAlign: 'right'
                                    }, this.props.device)
                                }} />
                            </span>
                            <span className="transform">
                                <a className="btn active"><i className="fa fa-bold" /> <i className="fa fa-caret-down" /></a>
                                <a className="btn fa fa-italic" />
                                <a className="btn fa fa-underline" />
                                <a className="btn advanced"><i className="fa fa-cog " /> <i className="fa fa-caret-down" /></a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
