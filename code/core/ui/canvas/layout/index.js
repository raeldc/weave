'use strict'

import Factory       from 'core/components/node/factory.js'
import DragContainer from 'core/ui/canvas/layout/dragcontainer.js'

export default class Layout extends React.Component {
    render() {
        return (
            <div className="ui-layout">
                <DragContainer />
                {Factory.createNode('root', {type: 'layout'})}
            </div>
        )
    }
}