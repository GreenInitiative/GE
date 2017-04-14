(function() {
    'use strict';

    angular.module('app').component('tabs', {
        templateUrl: 'app/components/tabs/tabs.html',
        transclude: true,
        controller: TabsController,
        controllerAs: 'tc',
        bindings: {
          onPaneChange: '&'
        }
    });

    /* @ngInject */
    function TabsController() {

        var vm = this;
        vm.select = select;
        vm.addPane = addPane;
        vm.panes = [];
        ////////////////////////

        function select(pane) {
            angular.forEach(vm.panes, function(pane) {
                pane.selected = false;
            });
            pane.selected = true;
            if (vm.onPaneChange) {
                vm.onPaneChange({
                    pane: pane.id
                });
            }
        }

        function addPane(pane) {
            vm.panes.push(pane);
            vm.panes.sort(function(p1, p2) {
                return p1.order > p2.order;
            });
            if (vm.panes.length === 1 || +pane.order === 1) {
                select(pane);
            }
        }

    }
})();
