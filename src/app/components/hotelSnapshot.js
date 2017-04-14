(function () {
    'use strict';

    var hotelSnapshotComponent = {
        bindings: {
        },
        templateUrl: 'app/components/hotelSnapshot.html',
        controller: HotelSnapshotController,
        controllerAs: 'hs'
    };

    angular.module('app')
        .component('hotelSnapshot', hotelSnapshotComponent);

    /* @ngInject */
    function HotelSnapshotController($scope, $state) {
        var vm = this;
        vm.onPaneChange = handlePaneChange;
        function handlePaneChange(pane) {
            vm.selectedPane = pane;
        }
    }
})();
