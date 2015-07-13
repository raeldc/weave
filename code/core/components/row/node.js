'use strict'

import Node       from 'core/components/node/node.js'
import Childable  from 'core/components/node/behaviors/childable.js'
import {addClass} from 'core/components/node/behaviors/classable.js'

export default class RowNode extends Node {
    constructor(props, context) {
        super(props, context)

        this.addBehavior(Childable)
    }

    beforeRender() {
        addClass(this, 'container-fluid')
    }

    render() {
        return (
            <div {...this.getProperties()}>
                <div className="row">
                    {this.getChildren()}
                </div>
            </div>
        )
    }
}
