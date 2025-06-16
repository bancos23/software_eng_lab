angular.module('app')
.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      const model = $parse(attrs.fileModel);
      element.bind('change', function () {
        scope.$apply(() => model.assign(scope, element[0].files[0]));
      });
    }
  };
}]);
