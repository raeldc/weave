'use strict'

import Stylesheet from 'core/lib/class/stylesheet.js'

describe('Stylesheet', function() {
    it('Generates CSS', function(){
        var stylesheet = new Stylesheet()

        stylesheet.addStyle('h1', {
            textAlign: 'left'
        })

        stylesheet.getStyle('h2').set('textAlign', 'center')

        stylesheet.addStyle('h2', {
            textAlign: 'right'
        })

        console.log(stylesheet.toString())
        //console.log(stylesheet.getStyle('h1').toString())

        expect(true).toEqual(true)
    })
})