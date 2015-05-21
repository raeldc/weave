'use strict'

import Node from 'core/components/node/node.js'

export default class RowNode extends Node {
    render() {
        return <div className="container-fluid">{super.render()}</div>
    }
}