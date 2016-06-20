'use strict'

import Component from 'core/component.js'
import TinyColor from 'tinycolor2'
import ReactColorPicker from 'react-color-picker'
import DropDown from 'core/ui/elements/dropdown.js'
import ColorPicker from 'core/components/node/configuration/inputs/colorpicker.js'

// Actions
import {mergeStyle, toggleStyle, getStyle, getCascade} from 'core/actions/styling.js'

export default class TextShadowColorPicker extends ColorPicker {
    initialState() {
        return {open: false}
    }

    open() {
        this.setState({open: true})
    }

    close() {
        this.setState({open: false})
    }

    focusOnColorInput() {
        ReactDOM.findDOMNode(this.refs.colorInput).focus()
    }

    changeColor(color) {
        const style = getStyle(this.props.node, this.props.device)
        const string = style.get('textShadow')
        const locationString = string.match(/(-?[0-9]+px)/g).join(' ')

        mergeStyle(this.props.node, {
            textShadow: locationString + ' ' + color
        }, this.props.device)
    }
}
