'use strict'

import CSSConfig from 'core/components/node/configuration/cssconfig.js'
import Alignment from 'core/components/node/configuration/typography/alignment.js'
import Transform from 'core/components/node/configuration/typography/transform.js'

export default class Typography extends CSSConfig {
    render() {
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
                            <Alignment {...this.props} className="alignment" />
                            <Transform {...this.props} className="transform" />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
