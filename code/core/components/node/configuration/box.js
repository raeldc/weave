'use strict'

import CSSConfig     from 'core/components/node/configuration/cssconfig.js'
import UINodeActions from 'core/actions/node.js'

export default class Box extends CSSConfig {
    render() {
        return (
            <div className="form-inline config config-box">
                <h5>Box</h5>
                <div className="wrapper">
                    <ul className="dimensions clearfix">
                        <li className="title">Dimensions</li>
                        <li className="form-field width"><span className="label">Width <i className="fa fa-arrows-h" /></span><input onChange={this.setInputValue} value={this.state.width} type="text" name="width" defaultValue="auto" /></li>
                        <li className="form-field height"><span className="label">Height <i className="fa fa-arrows-v" /></span><input onChange={this.setInputValue} value={this.state.height} type="text" name="height" defaultValue="auto" /></li>
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
                            <a className="clickField">0 px</a>
                        </li>
                        <li className="right">
                            <a className="clickField">auto</a>
                        </li>
                        <li className="bottom">
                            <a className="clickField">0 px</a>
                        </li>
                        <li className="left">
                            <a className="clickField">auto</a>
                        </li>
                    </ul>
                    <ul className="padding">
                        <li className="title">Padding</li>
                        <li className="top">
                            <a className="clickField">{this.state.paddingTop || 0}</a>
                        </li>
                        <li className="right">
                            <a className="clickField">{this.state.paddingRight || 0}</a>
                        </li>
                        <li className="bottom">
                            <a className="clickField">{this.state.paddingBottom || 0}</a>
                        </li>
                        <li className="left">
                            <a className="clickField">{this.state.paddingLeft || 0}</a>
                        </li>
                    </ul>
                    <ul className="border">
                        <li className="title">Border</li>
                        <li className="top">
                            <a className="clickField">{this.state.borderTop || 0}</a>
                        </li>
                        <li className="right">
                            <a className="clickField">{this.state.borderRight || 0}</a>
                        </li>
                        <li className="bottom">
                            <a className="clickField">{this.state.borderBottom || 0}</a>
                        </li>
                        <li className="left">
                            <a className="clickField">{this.state.borderLeft || 0}</a>
                        </li>
                    </ul>
                    <ul className="radius">
                        <li className="title">Radius</li>
                        <li className="top-left">
                            <a className="clickField">{this.state.radiusTopLeft || 0}</a>
                        </li>
                        <li className="top-right">
                            <a className="clickField">{this.state.radiusTopRight || 0}</a>
                        </li>
                        <li className="bottom-right">
                            <a className="clickField">{this.state.radiusBottomRight || 0}</a>
                        </li>
                        <li className="bottom-left">
                            <a className="clickField">{this.state.radiusBottomLeft || 0}</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    setInputValue(event) {
        UINodeActions.updateNodeCSS(this.props.node, this.props.device, event.target.name, event.target.value)
    }
}