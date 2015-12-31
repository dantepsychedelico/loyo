'use strict';

angular.module('unify', [])
.factory('Modernizr', function($window) {
  return $window.Modernizr;
})
.factory('Waypoint', function($window) {
  return $window.Waypoint;
})
.directive('headerFixedShrink', function($window, $timeout, Modernizr) {
  return {
    restirct: 'A',
    link: function(scope, element, attr) {
      console.log(Modernizr);
      angular.element($window).bind('scroll', function() {
        if ($window.scrollY && attr.class.match(/header-fixed-shrink/)===null) {
          element.addClass('header-fixed-shrink');
        } else if ($window.scrollY === 0) {
          element.removeClass('header-fixed-shrink');
        }
      });
    }
  };
})
.directive('noTouch', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if (!/iPad|iPhone|iPod/.test(navigator.platform)) {
        element.addClass('no-touch');
      } 
    }
  };
})
.directive('revolution', function($q, $parse) {
  return {
    restrict: 'A',
    controller: function($scope, $element, $attrs, $compile) {
      var promises = [];
      var html = $element.html();
      this.addPromise = function(promise) {
        promises.push(promise);
      };
      var start = this.start = function() {
        $q.all(promises)
        .then(function() {
          var api = $element.revolution($parse($attrs.revolution)($scope));
          promises = [];
        });
      };
      var restart = this.restart = function() {
        $element.removeClass('revslider-initialised tp-simpleresponsive');
        $element.html(html);
        $compile($element)($scope);
      };
      if ($attrs.revolutionApi) {
        $parse($attrs.revolutionApi).assign($scope, {
          start: start,
          restart: restart
        });
      }
    },
    compile: function(tElement, tAttrs) {
      var wait = tElement.find('[revolution-slide]').length;
      return function(scope, element, attrs) {
        if (!wait) {
          var api = element.revolution(angular.extend({
              delay: 9000,
              startwidth: 1360,
              startheight: 760,
              hideThumbs: 10,
              fullScreen: 'on',
              hideAllCaptionAtLimit: 420,
//             hideTimerBar: 'on',
              navigationStyle:'preview4'
          }, $parse(attrs.revolution)(scope)));
        }
        scope.$on('$destroy', function() {
          element.revkill();
        });
      };
    }
  };
})
.directive('revolutionSlide', function($parse, $q) {
  return {
    restrict: 'A',
    require: '?^revolution',
    link: function(scope, element, attrs, ctrl) {
      var deferred = $q.defer();
      if (ctrl) ctrl.addPromise(deferred.promise);
      if (scope.$last && ctrl) ctrl.start(); 
      if (attrs.oneSlide) ctrl.start();
      var watch = angular.noop;
      function generateElem(options) {
        if (options) {
          var elems = options.elems;
          element.addClass(options.class);
          element.data(options);
          _.forEach(elems, function(elem) {
            var $elem;
            if (elem.tag === 'img') {
              $elem = angular.element('<img>');
              $elem.attr('src', elem.src);
            }
            if (elem.tag === 'div') {
              $elem = angular.element('<div>');
            }
            $elem.addClass(elem.class);
            if (elem._iac) $elem.addClass(elem._iac);
            if (elem._oac) $elem.addClass(elem._oac);
            $elem.html(elem.html);
            $elem.data(elem);
            element.append($elem);
          });
          deferred.resolve();
          watch();
        }
      }
      if ($parse(attrs.revolutionSlide)(scope)) {
        generateElem($parse(attrs.revolutionSlide)(scope));
      } else {
        watch = scope.$watch(attrs.revolutionSlide, generateElem);
      }
    }
  };
})
.directive('ngMasonry', function($parse) {
  return {
    restrict: 'A',
    controller: function($scope, $element, $attrs) {
      this.layout = function() {
        $element.masonry('layout');
      };
    },
    link: function(scope, element, attrs) {
      element.masonry(angular.merge({
        itemSelector: '.grid-item',
        columnWidth: 200
      }, $parse(attrs.ngMasonry)(scope)));
    }
  };
})
.directive('ngMasonryLoad', function() {
  return {
    require: '^ngMasonry',
    restrict: 'A',
    link: function(scope, element, attrs, ngMasonry) {
      element.bind('load', function() {
        ngMasonry.layout();
      });
    }
  };
})
.directive('leftSlideBar', function($window) {
  return {
    restrict: 'C',
    link: function(scope, element, attrs) {
      var footerHeight = angular.element(document.getElementById('footer')).height();
      var subLeftSlideBar = element.find('ul.sub-left-slide-bar');
      function adjustHeight() {
        if (document.body.scrollTop <= 130) {
          // top
          element.css('margin-top', 220-document.body.scrollTop);
          element.css('max-height', $window.innerHeight - 240 + document.body.scrollTop);
          element.css('display', 'block');
          subLeftSlideBar.css('max-height', $window.innerHeight - 475 + document.body.scrollTop);
        } else if (document.body.clientHeight - $window.innerHeight - document.body.scrollTop < footerHeight) {
          // bottom
          var height = document.body.clientHeight - footerHeight - document.body.scrollTop - 110;
          if (height > 0) {
            element.css('max-height', height);
            element.css('margin-top', 90);
            element.css('display', 'block');
            subLeftSlideBar.css('max-height', height - 235);
          } else {
            element.css('max-height', 0);
            element.css('margin-top', 90);
            element.css('display', 'none');
          }
        } else {
          // middle
          element.css('max-height', $window.innerHeight - 110);
          element.css('margin-top', 90);
          element.css('display', 'block');
          subLeftSlideBar.css('max-height', $window.innerHeight - 110 - 235);
        }
      }
      adjustHeight();
      angular.element($window).bind('scroll', adjustHeight);
      angular.element($window).bind('resize', adjustHeight);
    }
  };
})
.directive('owlCarousel', function($parse) {
  return {
    restrict: 'A',
    controller: function($scope, $element, $attrs, $parse) {
      this.owlCarousel = function() {
        if ($element.data('owl.carousel')) {
          $element.data('owl.carousel').destroy();
        }
        $element.owlCarousel($parse($attrs.owlCarousel)($scope));
      }
    }
  };
})
.directive('owlCarouselItem', function() {
  return {
    restirct: 'A',
    require: '^owlCarousel',
    link: function(scope, element, attrs, ctrl) {
      if (scope.$last) {
         element.nextAll().remove();
         ctrl.owlCarousel();
      }
    }
  };
})
.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/carousel/carousel-no-chevron.html',
    '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" '+
    'ng-swipe-right="prev()" ng-swipe-left="next()">' +
    '<ol class="carousel-indicators" ng-show="slides.length > 1">' +
    '<li ng-repeat="slide in slides | orderBy:indexOfSlide track by $index" ng-class="{ active: isActive(slide) }" ng-click="select(slide)">' +
    '<span class="sr-only">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if="isActive(slide)">, currently active</span></span>'+
    '</li>' +
    '</ol>' +
    '<div class="carousel-inner" ng-transclude></div>' +
    '</div>');
}])
.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/carousel/carousel-no-indicators.html',
   '<div class="carousel-v1">' +
    '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" '+
    'ng-swipe-right="prev()" ng-swipe-left="next()">' +
    '<div class="carousel-inner" ng-transclude></div>' +
    '<div class="carousel-arrow">' +
    '<a class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1">'+
    '<i class="fa fa-angle-left">' + 
    '</i>' + 
    '</a>' +
    '<a class="right carousel-control" ng-click="next()" ng-show="slides.length > 1">'+
    '<i class="fa fa-angle-right">' + 
    '</i>' + 
    '</a>' +
    '</div>' +
    '</div>'+
    '</div>');
}]);
