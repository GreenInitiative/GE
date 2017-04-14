angular
  .module('app')
  .component('headerComponent', {
    templateUrl: 'app/components/Header.html',
    controller: Header,
    bindings: {
    }
  });

/** @ngInject */
function Header() {
}

Header.prototype = {
};
