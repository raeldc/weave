'use strict'

import Reflux from 'reflux'

export default Reflux.createActions([
    'addNode',
    'deleteNode',
    'updateNode',
    'addColumn',
    'updateColumns',
    'updateColspan',
    'updateText',
    'updateNodeCSS',
    'addChildNode',
    'moveNodeToParent',
    'moveNodeBesideSibling',
    'insertNodeBesideSibling',
    'insertNodeBeforeSibling',
    'insertNodeAfterSibling'
])