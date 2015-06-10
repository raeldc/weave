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

                <div className="wrapper margin-padding">
                    <ul className="margin">
                        <li className="title">Margin</li>
                        <li className="top">
                            <input onChange={this.setInputValue} value={this.state.marginTop} type="number" min="0" max="999" name="marginTop" defaultValue="0" />
                        </li>
                        <li className="right">
                            <input onChange={this.setInputValue} value={this.state.marginRight} type="number" min="0" max="999" name="marginRight" defaultValue="0" />
                        </li>
                        <li className="bottom">
                            <input onChange={this.setInputValue} value={this.state.marginBottom} type="number" min="0" max="999" name="marginBottom" defaultValue="0" />
                        </li>
                        <li className="left">
                            <input onChange={this.setInputValue} value={this.state.marginLeft} type="number" min="0" max="999" name="marginLeft" defaultValue="0" />
                        </li>
                    </ul>
                    <ul className="padding">
                        <li className="title">Padding</li>
                        <li className="top">
                            <input onChange={this.setInputValue} value={this.state.paddingTop} type="number" min="0" max="999" name="paddingTop" defaultValue="0" />
                        </li>
                        <li className="right">
                            <input onChange={this.setInputValue} value={this.state.paddingRight} type="number" min="0" max="999" name="paddingRight" defaultValue="0" />
                        </li>
                        <li className="bottom">
                            <input onChange={this.setInputValue} value={this.state.paddingBottom} type="number" min="0" max="999" name="paddingBottom" defaultValue="0" />
                        </li>
                        <li className="left">
                            <input onChange={this.setInputValue} value={this.state.paddingLeft} type="number" min="0" max="999" name="paddingLeft" defaultValue="0" />
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