module.exports ={
    'root' : {
        id       : 'root',
        component: 'root',
        children : ['header']
    },
    'header' : {
        id       : 'header',
        component: 'row',
        parent   : 'root',
        columns  : 4,
        //children : ['col1', 'col2', 'col3']
    },
    /*
    'col1' : {
        id       : 'col1',
        component: 'column',
        parent   : 'header',
        span     : 2,
        children : ['content1', 'content2']
    },
    'col2' : {
        id       : 'col2',
        component: 'column',
        parent   : 'header',
        span     : 2,
        children : ['content3', 'content4']
    },
    'col3' : {
        id       : 'col3',
        component: 'column',
        parent   : 'header',
        span     : 2,
        children : ['content5', 'content6']
    },
    'content1' : {
        id       : 'content1',
        component: 'text',
        parent   : 'col1',
        text     : 'Content 1'
    },
    'content2' : {
        id       : 'content2',
        component: 'text',
        parent   : 'col1',
        text     : 'Content 2'
    },
    'content3' : {
        id       : 'content3',
        component: 'text',
        parent   : 'col2',
        text     : 'Content 3'
    },
    'content4' : {
        id       : 'content4',
        component: 'text',
        parent   : 'col2',
        text     : 'Content 4'
    },
    'content5' : {
        id       : 'content5',
        component: 'text',
        parent   : 'col3',
        text     : 'Content 5'
    },
    'content6' : {
        id       : 'content6',
        component: 'text',
        parent   : 'col3',
        text     : 'Content 6'
    }
    */
};