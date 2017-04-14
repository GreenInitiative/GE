angular
  .module('app')
  .component('dashboard', {
    templateUrl: 'app/components/dashboard.html',
    controller: Dashboard,
    bindings: {
    }
  });

/** @ngInject */
function Dashboard() {
}

Dashboard.prototype = {
};
