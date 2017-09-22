'use strict'

require('babelify/polyfill')

import CoreBuilder from 'core'
import Vue         from 'vue/dist/vue.common.js'
import VuePlugin   from 'vue-electron'

import UIAppOpeningOptions      from './ui/app/opening/options.js'
import UIAppOpeningBuildOptions from './ui/app/opening/buildoptions.js'

new Vue({
    el        : '#ui-app-opening',
    template  : `
        <div class="app-opening">
            <ui-app-opening-options></ui-app-opening-options>
            <ui-app-opening-buildoptions></ui-app-opening-buildoptions>
        </div>
    `,
    components: {
        'ui-app-opening-options'     : UIAppOpeningOptions,
        'ui-app-opening-buildoptions': UIAppOpeningBuildOptions
    }
})
