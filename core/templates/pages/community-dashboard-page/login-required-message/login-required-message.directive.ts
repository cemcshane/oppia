// Copyright 2019 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Directive for the item view of an opportunity.
 */

require('services/site-analytics.service.ts');
require('services/user-backend-api.service.ts');

angular.module('oppia').directive('loginRequiredMessage', [
  '$timeout', 'UrlInterpolationService', function(
      $timeout, UrlInterpolationService) {
    return {
      restrict: 'E',
      scope: {
        getMessage: '&message'
      },
      bindToController: {},
      templateUrl: UrlInterpolationService.getDirectiveTemplateUrl(
        '/pages/community-dashboard-page/login-required-message/' +
        'login-required-message.directive.html'),
      controllerAs: '$ctrl',
      controller: [
        '$scope', '$window', 'SiteAnalyticsService', 'UserBackendApiService',
        function($scope, $window, SiteAnalyticsService, UserBackendApiService) {
          var ctrl = this;
          ctrl.onLoginButtonClicked = function() {
            UserBackendApiService.getLoginUrlAsync().then(
              function(loginUrl) {
                if (loginUrl) {
                  SiteAnalyticsService.registerStartLoginEvent('loginButton');
                  $timeout(function() {
                    $window.location = loginUrl;
                  }, 150);
                } else {
                  $window.location.reload();
                }
                // TODO(#8521): Remove the use of $rootScope.$apply()
                // once the controller is migrated to angular.
                $scope.$applyAsync();
              }
            );
          };
          ctrl.$onInit = function() {
            ctrl.OPPIA_AVATAR_IMAGE_URL = (
              UrlInterpolationService.getStaticImageUrl(
                '/avatar/oppia_avatar_100px.svg'));
          };
        }
      ]
    };
  }]);
