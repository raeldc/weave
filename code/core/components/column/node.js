'use strict'

import Node        from 'core/components/node/node.js'
import Colspanable from 'core/components/column/behaviors/colspanable.js'

export default class ColumnNode extends Node {
    constructor(props, context) {
        super(props, context)

        this.addBehavior(Colspanable)
    }
}