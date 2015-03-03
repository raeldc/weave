var Alchemy = require('./alchemy/alchemy.js');

Alchemy.initialize([
    {
        id: 'root',
        element: 'div',
        className: 'row',
        style: {
            margin: '10px',
            border: '1px solid green',
        }
    }
], document.getElementById('body'));

global.Alchemy = Alchemy;
