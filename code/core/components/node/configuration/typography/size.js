'use strict'

import Component from 'core/component.js'

// Actions
import {
    replaceStyle,
    mergeStyle,
    getStyle,
    getCascade
} from 'core/actions/styling.js'

export default class Size extends Component {
    render() {
        const style = getStyle(this.props.node, this.props.device)

        return (
            <span {...this.props}>
                <a className="btn preset-size clearfix">Normal <i className="fa fa-caret-down pull-right" /></a>
                <input 
                    onChange={event => {
                        mergeStyle(this.props.node, {
                            'fontSize': event.target.value
                        }, this.props.device)
                    }} 
                    value={style.get('fontSize')}
                    type="text" 
                    min="0" 
                    max="999" 
                    name="fontSize" 
                    defaultValue="12" 
                    className="input input-xs" />
            </span>
        )
    }
}