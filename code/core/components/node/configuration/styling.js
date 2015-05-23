'use strict'

import CSSConfig     from 'core/components/node/configuration/cssconfig.js'
import UINodeActions from 'core/actions/node.js'

// Components
import ColorPicker from 'react-colorpicker'

export default class Styling extends CSSConfig {
    render() {
        return (
            <div className="form-inline config config-styling">
                <h5>Styling</h5>
                <ul>
                    <li className="title">Text Color</li>
                    <li className="textcolor colorpicker-container">
                        <ColorPicker color={this.state.color} onChange={this.changeColor} />
                    </li>
                </ul>
            </div>
        )
    }

    changeColor(color) {
        UINodeActions.updateNodeCSS(this.props.node, this.props.device, 'color', color.toHex())
    }
}