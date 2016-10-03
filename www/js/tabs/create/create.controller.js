(function() {
    'use strict';

    angular
        .module('app')
        .controller('CreateController', CreateController);

    CreateController.$inject = [];

    /* @ngInject */
    function CreateController() {
        var vm = this;
        vm.title = 'CreateController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();