function componentController() {
  this.text = 'My brand new component!';
}

angular
  .module('app')
  .component('component', {
    templateUrl: 'app/component.html',
    controller: componentController
  });

