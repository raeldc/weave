'use strict'

import CSSConfig   from 'core/components/node/configuration/cssconfig.js'
import Alignment   from 'core/components/node/configuration/typography/alignment.js'
import Transform   from 'core/components/node/configuration/typography/transform.js'
import ColorPicker from 'core/components/node/configuration/inputs/colorpicker.js'

// Actions
import {
    mergeStyle,
    toggleStyle,
    getStyle,
    getCascade
} from 'core/actions/styling.js'

export default class Typography extends CSSConfig {
    render() {
        let style   = getStyle(this.props.node, this.props.device),
            cascade = getCascade(this.props.node, this.props.device)

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
                                <ColorPicker {...this.props} property="color" value={style.get('color', '#000')} />
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
