'use strict'

import Node        from 'core/components/node/node.js'
import Childable   from 'core/components/node/behaviors/childable.js'
import Colspanable from 'core/components/column/behaviors/colspanable.js'

export default class ColumnNode extends Node {
    constructor(props, context) {
        super(props, context)

        this.addBehavior(Childable, Colspanable)
    }
}