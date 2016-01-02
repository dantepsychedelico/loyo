'use strict';

angular.module('loyoApp')
.directive('summernote', function($window, $parse, $sce) {
  return {
    restrict: 'EAC',
    link: function(scope, element, attrs) {
      var api = element.summernote(angular.extend({
        height: +attrs.height || $window.innerHeight/3,
        force: true,
        onChange: function(contents) {
          $parse(attrs.bind).assign(scope, angular.isDefined(attrs.nonTrust) ? 
                                    contents : $sce.trustAsHtml(contents));
          scope.$eval(attrs.postChange);
        },
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'italic', 'underline', 'clear']],
          ['custom', ['kai', 'ming']],
          ['fontname', ['fontname']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
          ['table', ['table']],
          ['insert', ['link', 'album', 'hr']],
          ['view', ['fullscreen', 'codeview']],
          ['help', ['undo', 'redo', 'help']]
        ],
        disableDragAndDrop: true
      }, $parse(attrs.summernote)(scope)))
      .code(($parse(attrs.bind)(scope)||'').toString()); // bug cannot update
      scope.$on('$destroy', function() {
//         $parse(attrs.bind).assign(scope, $sce.trustAsHtml(api.code()));
        element.destroy();
      });
    }
  };
})
.run(function($modal) {
  var template = angular.element.summernote.renderer.getTemplate();

  // add hello plugin 
  angular.element.summernote.addPlugin({
    name: 'custom',

    init : function(layoutInfo) { // run init method when summernote was initialized
//       var $note = layoutInfo.holder();
// 
//       // you can use jquery custom event.
//       $note.on('summernote.update', function(customEvent, nativeEvent) {
//          var $boldButton = angular.element(this).summernote('toolbar.get', 'bold');
//          $boldButton.toggleClass('active').css({
//            color : 'red'
//          });
//       });
    },
            
    buttons: {
      kai: function () {
        return template.iconButton('fa fa-kai', {
          event : 'kai',
          title: '標楷體',
          hide: true
        });
      },
      ming: function() {
        return template.iconButton('fa fa-ming', {
          event : 'ming',
          title: '微軟正黑體',
          hide: true
        });
      },
      album: function() {
        return template.iconButton('fa fa-picture-o', {
          event: 'album',
          title: '相簿',
          hide: true
        });
      }
    },

    events: { // events
      // run callback when hello button is clicked
      kai: function (event, editor, layoutInfo, value) {
        var $editable = layoutInfo.editable();
        editor.fontName($editable, '標楷體, cwTeXKai, serif');
      },
      ming: function (event, editor, layoutInfo) {
        var $editable = layoutInfo.editable();
        editor.fontName($editable, '微軟正黑體, Microsoft YaHei, 微软雅黑, メイリオ, 맑은 고딕, Helvetica Neue, Helvetica, Arial, cwTeXMing, serif');
      },
      album: function(event, editor, layoutInfo) {
        var modalInstance = $modal.open({
          templateUrl: 'components/editor/upload-image-modal.html',
          controller: 'imageUploadModalCtrl',
          windowTemplateUrl: 'template/modal/window-fullwidth.html',
          resolve: {
            insert: function() {
              return true;
            }
          }
        });
        modalInstance.result
        .then(function(src) {
          var $editable = layoutInfo.editable();
          var $image = angular.element('<img src="'+src+'">');
          editor.beforeCommand($editable);
          angular.element.summernote.core.range.create().insertNode($image[0]);
          angular.element.summernote.core.range.createFromNodeAfter($image[0]).select();
          editor.afterCommand($editable);
        });
      }
    }
  });
})
