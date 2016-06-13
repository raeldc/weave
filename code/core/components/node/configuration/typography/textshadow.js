'use strict'

import Component from 'core/component.js'

// Actions
import {replaceStyle, toggleStyle, getStyle, getCascade} from 'core/actions/styling.js'

export default class TextShadow extends Component {
    //
    initialState() {
        return {distance: 5, blur: 5}
    }

    render() {
        let style = getStyle(this.props.node, this.props.device),
            cascade = getCascade(this.props.node);
        const state = this.state,
            props = this.props
        return (
            <div {...props}>
                <h6>Text Shadow</h6>
                <div>
                    <input
                        type='range'
                        className='input'
                        min='0'
                        max='100'
                        defaultValue={state.distance}
                        onChange={this.changeDistance.bind(this)}/>
                    Distance: {state.distance}px
                </div>
                <div>
                    <input
                        type='range'
                        className='input'
                        min='0'
                        max='100'
                        defaultValue={state.blur}
                        onChange={this.changeBlur.bind(this)}/>
                    Blur: {state.blur}px
                </div>
            </div>
        )
    }

    changeDistance(evt) {
        this.setState({distance: evt.target.value})
    }

    changeBlur(evt) {
        this.setState({blur: evt.target.value})
    }
}
