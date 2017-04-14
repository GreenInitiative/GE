(function () {
    'use strict';

    angular.module('app').component('tabsPane', {
        transclude: true,
        require: {
            tabs: '^tabs'
        },
        bindings: {
            title: '@',
            content: '@',
        },
        templateUrl: 'app/components/tabs-pane/tabs-pane.html',
        controller: TabsPaneController,
        controllerAs: 'tpc'
    });

    /* @ngInject */
    function TabsPaneController() {

        var vm = this;
        vm.$onInit = initialize;
        ////////////////////////

        function initialize() {
            vm.tabs.addPane(vm);
        }

    }
})();
