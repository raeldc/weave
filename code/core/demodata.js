module.exports ={
    'root' : {
        id       : 'root',
        component: 'container',
        className: 'container',
        children : ['header', 'body', 'footer'],
        css      : {
            all      : {},
            desktop  : {},
            laptop   : {},
            tablet   : {},
            phone    : {}
        },
    },
    'header': {
        id       : 'header',
        component: 'container',
        element  : 'header',
        className: 'row',
        children : ['logo', 'navigation'],
        parent   : 'root',
        css      : {
            all      : {},
            desktop  : {},
            laptop   : {},
            tablet   : {},
            phone    : {}
        },
    },
    'logo': {
        id       : 'logo',
        component: 'container',
        className: 'col-md-2',
        text     : 'Logo',
        parent   : 'header',
        css      : {
            all      : {},
            desktop  : {},
            laptop   : {},
            tablet   : {},
            phone    : {}
        },
    },
    'navigation': {
        id       : 'navigation',
        component: 'container',
        element  : 'nav',
        className: 'col-md-10',
        text     : 'Navigation',
        parent   : 'header',
        css      : {
            all      : {},
            desktop  : {},
            laptop   : {},
            tablet   : {},
            phone    : {}
        },
    },
    'body': {
        id       : 'body',
        component: 'container',
        className: 'row',
        children : ['sidebar', 'content'],
        parent   : 'root',
        css      : {
            all    : {},
            desktop: {},
            laptop : {},
            tablet : {},
            phone  : {}
        },
    },
    'sidebar': {
        id       : 'sidebar',
        component: 'container',
        className: 'col-md-4',
        parent   : 'body',
        text     : 'Sidebar here',
        css      : {
            all: {
                textAlign: 'center'
            },
            desktop  : {},
            laptop   : {},
            tablet   : {},
            phone    : {}
        },
    },
    'content': {
        id       : 'content',
        component: 'container',
        className: 'col-md-8',
        parent   : 'body',
        children : ['title', 'p1', 'p2', 'p3'],
        css      : {
            all: {
                textAlign: 'justified'
            },
            desktop  : {},
            laptop   : {},
            tablet   : {},
            phone    : {}
        }
    },
    'title': {
        id       : 'title',
        component: 'title',
        parent   : 'content',
        text     : 'Core Builder - Build Anything for the Web!',
        css      : {
            all      : {},
            desktop  : {},
            laptop   : {},
            tablet   : {},
            phone    : {}
        },
    },
    'p1': {
        id       : 'p1',
        component: 'text',
        parent   : 'content',
        text     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis distinctio tenetur ex atque labore esse ea excepturi minima, iste minus inventore accusamus magni voluptate rem odit animi quasi porro molestiae!',
        css      : {
            all: {
                padding: 40,
                margin : 40
            },
            desktop  : {},
            laptop   : {},
            tablet   : {},
            phone    : {}
        }
    },
    'p2': {
        id       : 'p2',
        component: 'text',
        parent   : 'content',
        text     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis distinctio tenetur ex atque labore esse ea excepturi minima, iste minus inventore accusamus magni voluptate rem odit animi quasi porro molestiae!',
        css      : {
            all      : {},
            desktop  : {},
            laptop   : {},
            tablet   : {},
            phone    : {}
        },
    },
    'p3': {
        id       : 'p3',
        component: 'text',
        parent   : 'content',
        text     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis distinctio tenetur ex atque labore esse ea excepturi minima, iste minus inventore accusamus magni voluptate rem odit animi quasi porro molestiae!',
        css      : {
            all      : {},
            desktop  : {},
            laptop   : {},
            tablet   : {},
            phone    : {}
        },
    },
    'footer': {
        id       : 'footer',
        component: 'container',
        element  : 'footer',
        className: 'row',
        children : ['f1', 'f2', 'f3'],
        parent   : 'root',
        css      : {
            all      : {},
            desktop  : {},
            laptop   : {},
            tablet   : {},
            phone    : {}
        },
    },
    'f1': {
        id       : 'f1',
        component: 'container',
        className: 'col-md-4',
        text     : 'Footer 1',
        parent   : 'footer',
        css      : {
            all: {
                backgroundColor: '#cfcfcf',
                textAlign: 'center'
            },
            desktop  : {},
            laptop   : {},
            tablet   : {},
            phone    : {}
        }
    },
    'f2': {
        id       : 'f2',
        component: 'container',
        className: 'col-md-4',
        text     : 'Footer 2',
        parent   : 'footer',
        css      : {
            all      : {},
            desktop  : {},
            laptop   : {},
            tablet   : {},
            phone    : {}
        },
    },
    'f3': {
        id       : 'f3',
        component: 'container',
        className: 'col-md-4',
        text     : 'Footer 3',
        parent   : 'footer',
        css      : {
            all      : {},
            desktop  : {},
            laptop   : {},
            tablet   : {},
            phone    : {}
        },
    },
};