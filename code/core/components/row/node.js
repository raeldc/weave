'use strict'

import Node from 'core/components/node/node.js'
import Childable   from 'core/components/node/behaviors/childable.js'

export default class RowNode extends Node {
    constructor(props, context) {
        super(props, context)

        this.addBehavior(Childable)
    }

    render() {
        return <div className="container-fluid">{super.render()}</div>
    }
}