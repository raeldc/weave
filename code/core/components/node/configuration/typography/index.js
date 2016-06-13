'use strict'

import CSSConfig from 'core/components/node/configuration/cssconfig.js'
import Size from 'core/components/node/configuration/typography/size'
import Alignment from 'core/components/node/configuration/typography/alignment.js'
import Transform from 'core/components/node/configuration/typography/transform.js'
import ColorPicker from 'core/components/node/configuration/inputs/colorpicker.js'
import Font from 'core/components/node/configuration/typography/font.js'
import TextShadow from 'core/components/node/configuration/typography/textshadow.js'

// Actions
import {mergeStyle, toggleStyle, getStyle, getCascade} from 'core/actions/styling.js'

export default class Typography extends CSSConfig {
    render() {
        const style = getStyle(this.props.node, this.props.device)
        const cascade = getCascade(this.props.node, this.props.device)

        return (
            <div className="form-inline config config-typography">
                <h5>Typography</h5>
                <div className="wrapper">
                    <ul className="typography">
                        <li className="font clearfix form-field">
                            <span className="family"><Font {...this.props}/></span>

                            <span className="style">
                                <Size {...this.props} className="font-size"/>
                                <ColorPicker
                                    {...this.props}
                                    className="color"
                                    property="color"
                                    value={style.get('color')}/>
                            </span>
                        </li>
                        <li className="formatting clearfix">
                            <Alignment {...this.props} className="alignment"/>
                            <Transform {...this.props} className="transform"/>
                        </li>
                        <li className="clearfix">
                            <TextShadow {...this.props} className=""/>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
