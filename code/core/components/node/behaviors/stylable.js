import {addClass} from 'core/components/node/behaviors/classable.js'

function beforeRender(component) {
    addClass(component, component.props.id)
}

export default {beforeRender}
