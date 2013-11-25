/*global require*/
require.config({
    baseUrl: '/lib/',
    paths: {
        'app': '../js/app/',
        'jquery': 'jquery/jquery.min'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'parse': {
            deps: ['jquery', 'underscore'],
            exports: 'Parse'
        }
    }
});

require(['app/main']);
