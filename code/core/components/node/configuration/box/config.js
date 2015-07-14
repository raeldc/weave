'use strict'

import Component        from 'core/component.js'
import DropDown         from 'core/ui/elements/dropdown.js'
import ReactColorPicker from 'react-color-picker'

// Actions
import {mergeStyle} from 'core/actions/styling.js'

export default class BoxConfig extends Component {
    initialState() {
        return {open: false, allSides: false}
    }

    afterUpdate() {
        this.focusOnInput()
    }

    render() {
        return null
    }


    renderDropDown(style) {
        return null
    }

    openDropdown(subject, focus = 'subjectInput') {
        this.setState({
            open   : true,
            subject: subject,
            focus  : focus,
        })
    }

    focusOnInput() {
        const focus = React.findDOMNode(this.refs[this.state.focus])

        if(focus && focus.tagName === 'INPUT') {
            const delayer = setInterval(() => {
                clearInterval(delayer)
                focus.select()
            }, 0)
        }
    }

    closeDropDown(event) {
        const delayer = setInterval(() => {
            let active = false

            // Check if one of the refs are on focus
            _.every(this.refs, input => {
                if(document.activeElement === React.findDOMNode(input)) {
                    active = true
                    return false
                }

                return true
            })

            // If not on focus, close the DropDown
            if(!active) {
                this.setState({
                    open   : false,
                    subject: undefined,
                    focus  : undefined,
                })
            }

            clearInterval(delayer)
        }, 0)
    }

    setStyle(property, value) {
        let style = {[`${property}`]: value}

        mergeStyle(this.props.node, style, this.props.device)
    }
}

BoxConfig.DropDown         = DropDown
BoxConfig.ReactColorPicker = ReactColorPicker
