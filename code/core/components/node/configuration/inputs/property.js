'use strict'

import Nodes         from 'core/stores/nodes.js'
import UINodeActions from 'core/actions/node.js'
import LayoutActions from 'core/actions/layout.js'

export default class Property extends React.Component {
    render() {
        let value = this.getCurrentValue()

        return (
            <span 
                className={this.props.className} 
                contentEditable="true" 
                dangerouslySetInnerHTML={{__html:value}} 
                onBlur={this.saveInput} 
                onKeyDown={this.detectEnter} 
            />
        )
    }

    componentDidUpdate() {
        ReactDOM.findDOMNode(this).innerHTML = this.getCurrentValue()
    }

    getCurrentValue() {
        return Nodes.getStore(this.props.node)
                    .getStore('css')
                    .getStore(this.props.device)
                    .get(this.props.propertyName) || this.props.default
    }

    saveInput(event) {
        var value = event.target.innerHTML

        switch(this.props.filter.constructor) {
            case Array:
                if(this.props.filter.indexOf(value) === -1) {
                    value = this.getCurrentValue()
                }
            break
            case RegExp:
                value = String(value).match(this.props.filter).join('')
            break
        }

        UINodeActions.updateNodeCSS(this.props.node, this.props.device, this.props.propertyName, value)
        LayoutActions.nodeTouched()

        event.preventDefault()
    }

    detectEnter(event) {
        if(event.keyCode === 13) {
            this.saveInput(event)
            event.preventDefault()
        }
    }
}