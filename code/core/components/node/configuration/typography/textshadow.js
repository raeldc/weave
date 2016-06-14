'use strict'

import Component from 'core/component.js'
import ColorPicker from 'core/components/node/configuration/inputs/colorpicker.js'

// Actions
import {replaceStyle, toggleStyle, getStyle, getCascade, mergeStyle} from 'core/actions/styling.js'

export default class TextShadow extends Component {
    //
    initialState() {
        // const style = getStyle(this.props.node, this.props.device)
        return {x: 0, y: 0, blur: 0, color: '#000'}
    }

    componentWillMount() {
        this.reStyle()
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
                    Color: {state.color}
                    <input
                        type='color'
                        className='input'
                        defaultValue={state.color}
                        onChange={this.changeColor.bind(this)}/>
                </div>
                <div>
                    X: {state.x}px
                    <input
                        type='range'
                        className='input'
                        min='-10'
                        max='10'
                        defaultValue={state.x}
                        onInput={this.changeX.bind(this)}/>
                </div>
                <div>
                    Y: {- state.y}px
                    <input
                        type='range'
                        className='input'
                        min='-10'
                        max='10'
                        defaultValue={state.y}
                        onInput={this.changeY.bind(this)}/>
                </div>
                <div>
                    Blur: {state.blur}px
                    <input
                        type='range'
                        className='input'
                        min='0'
                        max='10'
                        defaultValue={state.blur}
                        onChange={this.changeBlur.bind(this)}/>
                </div>
            </div>
        )
    }

    changeX(evt) {
        var state = this.state
        state.x = parseInt(evt.target.value)
        this.reStyle()
    }

    changeY(evt) {
        var state = this.state
        state.y = -parseInt(evt.target.value)
        this.reStyle()
    }

    changeBlur(evt) {
        var state = this.state
        state.blur = parseInt(evt.target.value)
        this.reStyle()
    }

    changeColor(evt) {
        var state = this.state
        state.color = evt.target.value
        this.reStyle()
    }

    reStyle() {
        this.setState({})
        const state = this.state
        // console.log('(%02d, %02d)', state.x, state.y)
        mergeStyle(this.props.node, {
            textShadow: state.x + 'px ' + state.y + 'px ' + state.blur + 'px ' + state.color
        }, this.props.device)
    }
}
