import Nodes         from 'core/stores/nodes.js'
import LayoutActions from 'core/actions/layout.js'

function beforeRender(component) {
    // self.
    if(isText(component)) {
        var text = component.state.text.length ? component.state.text: '&nbsp'
        component.setProperty('dangerouslySetInnerHTML', {__html: text})
    }
}

function isText(component) {
    return _.isEmpty(component.state.children) && _.isString(component.state.text)
}

export default {beforeRender}