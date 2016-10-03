(function() {
    'use strict';

    angular
        .module('app')
        .controller('NotificationsController', NotificationsController);

    NotificationsController.$inject = [];

    /* @ngInject */
    function NotificationsController() {
        var vm = this;
        vm.title = 'NotificationsController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();