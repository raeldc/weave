'use strict'

import Component        from 'core/component.js'
import TinyColor        from 'tinycolor2'
import ReactColorPicker from 'react-color-picker'

// Actions
import {
    mergeStyle,
    toggleStyle,
    getStyle,
    getCascade
} from 'core/actions/styling.js'

export default class ColorPicker extends Component {
    initialState() {
        return {open: false}
    }

    render() {
        let DropDownBox = this.state.open ? this.getDropDownBox() : null,
            open        = this.state.open ? ' open' : '',
            color       = TinyColor(this.props.value),
            pickerColor = color.isDark() ? color.lighten(50) : color.darken(50)

        return (
            <span className={this.props.className || 'color'}>
                <input value={this.props.value} type="text" name="color" placeholder="#000" ref="colorInput" onChange={event => {this.changeColor(event.target.value)}} onFocus={this.open} onBlur={this.close} />
                <a className={"btn color-picker" + open} style={{backgroundColor: this.props.value}} onClick={this.focusOnColorInput} onMouseDown={event => {event.preventDefault()}}>
                    <i className="fa fa-eyedropper" style={{color: pickerColor}} />
                    {DropDownBox}
                </a>
            </span>
        )
    }

    getDropDownBox() {
        return(
            <ul className="dropdown-menu">
                <li>
                    <ReactColorPicker
                        defaultValue={this.props.value}
                        saturationWidth={220}
                        saturationHeight={220}
                        onChange={this.changeColor}
                        onDrag={this.changeColor}
                    />
                </li>
            </ul>
        )
    }

    focusOnColorInput() {
        React.findDOMNode(this.refs.colorInput).focus()
    }

    open() {
        this.setState({
            open: true
        })
    }

    close() {
        this.setState({
            open: false
        })
    }

    changeColor(color) {
        let style = {}
            style[this.props.property] = color

        mergeStyle(this.props.node, style, this.props.device)
    }
}
