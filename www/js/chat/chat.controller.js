(function() {
    'use strict';

    angular
        .module('app')
        .controller('chatCtrl', chatCtrl);

    chatCtrl.$inject = ['$scope', '$stateParams'];

    /* @ngInject */
    function chatCtrl($scope, $stateParams) {
        var vm = this;
        vm.title = 'chatCtrl';

        activate();

        ////////////////

        function activate() {
        }
    }
})();