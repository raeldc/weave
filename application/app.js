Alchemy.initialize([
    {
        id: 'root',
        element: 'div',
        className: 'row',
        style: {
            margin: '10px',
            border: '1px solid green',
        },
        children: [2, 3, 4]
    },
    {
        id     : 2,
        element: 'div',
        text   : 'Col 1',
        className: 'col-md-4',
        style  : {
        },
    },
    {
        id     : 3,
        element: 'div',
        text   : 'Col 2',
        className: 'col-md-4',
        style  : {
        },
    },
    {
        id     : 4,
        element: 'div',
        text   : 'Col 3',
        className: 'col-md-4',
        style  : {
        },
    }
], document.getElementById('body'));
