(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = [];

    /* @ngInject */
    function ProfileController() {
        var vm = this;
        vm.title = 'ProfileController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();