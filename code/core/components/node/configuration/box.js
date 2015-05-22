'use strict'

import CSSConfig from 'core/components/node/configuration/cssconfig.js'

// Stores
import Nodes from 'core/stores/nodes.js'

// Actions
import UINodeActions from 'core/actions/node.js'

export default class Box extends CSSConfig {
    render() {
        return (
            <div className="form-inline config config-box">
                <h5>Box</h5>
                <div className="wrapper">
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