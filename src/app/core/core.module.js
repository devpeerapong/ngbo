(function() {
    'use strict';

    angular
        .module('mean', [
            'ui.router',
            'ui.bootstrap',
            'angular-jwt',
            'angular-storage',

            'mean.users',
            'mean.articles'
        ]);
})();