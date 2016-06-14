'use strict'

import Component from 'core/component.js'
import TinyColor from 'tinycolor2'
import ReactColorPicker from 'react-color-picker'
import DropDown from 'core/ui/elements/dropdown.js'

// Actions
import {mergeStyle, toggleStyle, getStyle, getCascade} from 'core/actions/styling.js'

export default class ColorPicker extends Component {
    initialState() {
        return {open: false}
    }

    render() {
        const DropDownBox = this.state.open
            ? this.getDropDown()
            : null
        const open = this.state.open
            ? ' open'
            : ''
        const color = TinyColor(this.props.value)
        const pickerColor = color.isDark()
            ? color.lighten(50)
            : color.darken(50)

        return (
            <span className={this.props.className || 'color'}>
                <input
                    value={this.props.value}
                    type="text"
                    name="color"
                    placeholder="#000"
                    ref="colorInput"
                    onChange={event => {
                    this.changeColor(event.target.value)
                }}
                    onFocus={this.open}
                    onBlur={this.close}/>
                <a
                    className={"btn"}
                    style={{
                    backgroundColor: this.props.value,
                    position: 'relative'
                }}
                    onClick={this.focusOnColorInput}
                    onMouseDown={event => {
                    event.preventDefault()
                }}>
                    <i
                        className="fa fa-eyedropper"
                        style={{
                        color: pickerColor
                    }}/> {DropDownBox}
                </a>
            </span>
        )
    }

    getDropDown() {
        return (
            <DropDown subject={this.refs.colorInput} viewportWidth={300}>
                <ReactColorPicker
                    defaultValue={this.props.value}
                    saturationWidth={220}
                    saturationHeight={200}
                    onChange={this.changeColor}
                    onDrag={this.changeColor}/>
            </DropDown>
        )
    }

    changeColor(color) {
        const style = {}

        style[this.props.property] = color

        mergeStyle(this.props.node, style, this.props.device)
    }

    focusOnColorInput() {
        ReactDOM.findDOMNode(this.refs.colorInput).focus()
    }

    open() {
        this.setState({open: true})
    }

    close() {
        this.setState({open: false})
    }
}
