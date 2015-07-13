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
        this.focusSubject()
    }

    render() {
        return null
    }


    renderDropDown(style) {
        return null
    }

    openDropdown(subject) {
        this.setState({
            open   : true,
            subject: subject
        })
    }

    focusSubject() {
        if(this.refs.subjectInput) {
            let delayer = setInterval(() => {
                let active = false

                // Check if one of the refs are on focus
                _.each(this.refs, input => {
                    if(document.activeElement === React.findDOMNode(input)) {
                        active = true
                    }
                })

                // If not on focus, focus on it
                if(!active) {
                    React.findDOMNode(this.refs.subjectInput).select()
                }

                clearInterval(delayer)
            }, 0)
        }
    }

    closeDropDown(event) {
        let delayer = setInterval(() => {
            let active = false

            // Check if one of the refs are on focus
            _.each(this.refs, input => {
                if(document.activeElement === React.findDOMNode(input)) {
                    active = true
                }
            })

            // If not on focus, focus on it
            if(!active) {
                this.setState({
                    open   : false,
                    subject: undefined
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
