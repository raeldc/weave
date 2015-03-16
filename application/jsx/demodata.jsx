module.exports ={
    'root' : {
        id: 'root',
        component: 'container',
        className: 'container',
        children : ['header', 'body', 'footer'],
    },
    'header': {
        id: 'header',
        component: 'container',
        element: 'header',
        className: 'row',
        children: ['logo', 'navigation'],
        parent: 'root'
    },
    'logo': {
        id: 'logo',
        component: 'container',
        className: 'col-md-2',
        text: 'Logo',
        parent: 'header',
        style: {
            textAlign: 'center',
        }
    },
    'navigation': {
        id: 'navigation',
        component: 'container',
        element: 'nav',
        className: 'col-md-10',
        text: 'Navigation',
        parent: 'header',
        style: {
            textAlign: 'center'
        }
    },
    'body': {
        id: 'body',
        component: 'container',
        className: 'row',
        children: ['sidebar', 'content'],
        parent: 'root',
        style: {
            minWidth: '1024px'
        }
    },
    'sidebar': {
        id: 'sidebar',
        component: 'container',
        className: 'col-md-4',
        parent: 'body',
        text: 'Sidebar here',
        style: {
            textAlign: 'center'
        }
    },
    'content': {
        id: 'content',
        component: 'container',
        className: 'col-md-8',
        parent: 'body',
        children: ['title', 'p1', 'p2', 'p3'],
        style: {
            textAlign: 'justified'
        }
    },
    'title': {
        id: 'title',
        component: 'title',
        parent: 'content',
        text: 'Alchemy - Build WordPress Themes and Pages!'
    },
    'p1': {
        id: 'p1',
        component: 'text',
        parent: 'content',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis distinctio tenetur ex atque labore esse ea excepturi minima, iste minus inventore accusamus magni voluptate rem odit animi quasi porro molestiae!',
        style: {
            padding: 40,
            margin: 40
        }
    },
    'p2': {
        id: 'p2',
        component: 'text',
        parent: 'content',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis distinctio tenetur ex atque labore esse ea excepturi minima, iste minus inventore accusamus magni voluptate rem odit animi quasi porro molestiae!'
    },
    'p3': {
        id: 'p3',
        component: 'text',
        parent: 'content',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis distinctio tenetur ex atque labore esse ea excepturi minima, iste minus inventore accusamus magni voluptate rem odit animi quasi porro molestiae!'
    },
    'footer': {
        id: 'footer',
        component: 'container',
        element: 'footer',
        className: 'row',
        children: ['f1', 'f2', 'f3'],
        parent: 'root'
    },
    'f1': {
        id: 'f1',
        component: 'container',
        className: 'col-md-4',
        text: 'Footer 1',
        parent: 'footer',
        style: {
            backgroundColor: '#cfcfcf',
            textAlign: 'center'
        }
    },
    'f2': {
        id: 'f2',
        component: 'container',
        className: 'col-md-4',
        text: 'Footer 2',
        parent: 'footer',
        style: {
            textAlign: 'center'
        }
    },
    'f3': {
        id: 'f3',
        component: 'container',
        className: 'col-md-4',
        text: 'Footer 3',
        parent: 'footer',
        style: {
            textAlign: 'center'
        }
    },
};