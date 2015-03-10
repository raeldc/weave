module.exports = [
    {
        id: 'root',
        className: 'container',
        children: ['header', 'body', 'footer'],
    },
    {
        id: 'header',
        className: 'row',
        children: ['logo', 'navigation'],
        parent: 'root'
    },
    {
        id: 'logo',
        className: 'col-md-2',
        text: 'Logo',
        parent: 'header',
        style: {
            textAlign: 'center',
        }
    },
    {
        id: 'navigation',
        className: 'col-md-10',
        text: 'Navigation',
        parent: 'header',
        style: {
            textAlign: 'center'
        }
    },
    {
        id: 'body',
        className: 'row',
        children: ['sidebar', 'content'],
        parent: 'root',
        style: {
            minWidth: '1024px'
        }
    },
    {
        id: 'sidebar',
        className: 'col-md-4',
        parent: 'body',
        children: ['actions'],
        style: {
            textAlign: 'center'
        }
    },
    {
        id: 'content',
        className: 'col-md-8',
        parent: 'body',
        children: ['p1', 'p2', 'p3'],
        style: {
            textAlign: 'justified'
        }
    },
    {
        id: 'p1',
        element: 'p',
        parent: 'content',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis distinctio tenetur ex atque labore esse ea excepturi minima, iste minus inventore accusamus magni voluptate rem odit animi quasi porro molestiae!',
        style: {
            padding: 40,
            margin: 40
        }
    },
    {
        id: 'p2',
        element: 'p',
        parent: 'content',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis distinctio tenetur ex atque labore esse ea excepturi minima, iste minus inventore accusamus magni voluptate rem odit animi quasi porro molestiae!'
    },
    {
        id: 'p3',
        element: 'p',
        parent: 'content',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis distinctio tenetur ex atque labore esse ea excepturi minima, iste minus inventore accusamus magni voluptate rem odit animi quasi porro molestiae!'
    },
    {
        id: 'footer',
        className: 'row',
        children: ['f1', 'f2', 'f3'],
        parent: 'root'
    },
    {
        id: 'f1',
        className: 'col-md-4',
        text: 'Footer 1',
        parent: 'footer',
        style: {
            backgroundColor: '#cfcfcf',
            textAlign: 'center'
        }
    },
    {
        id: 'f2',
        className: 'col-md-4',
        text: 'Footer 2',
        parent: 'footer',
        style: {
            textAlign: 'center'
        }
    },
    {
        id: 'f3',
        className: 'col-md-4',
        text: 'Footer 3',
        parent: 'footer',
        style: {
            textAlign: 'center'
        }
    },
];