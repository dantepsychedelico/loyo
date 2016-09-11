'use strict';

angular.module('loyoApp')
.factory('httpInterceptor', ['$q', '$rootScope', function($q, $rootScope) {
    return {
        request: function(config) {
            if (localStorage.getItem('JWT')) {
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + localStorage.getItem('JWT');
            }
            return config;
        },
        response: function(response) {
            if (response.config.url === '/auth/me') return response;
            if (response.status === 401) {
                $rootScope.$emit('unauthenticated');
                return $q.reject(response);
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.config.url === '/auth/me') return rejection;
            if (rejection.status === 401) {
                $rootScope.$emit('unauthenticated');
                return $q.reject(rejection);
            }
            return $q.reject(rejection);
        }
    };
}])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
}])
.factory('User', ['$rootScope', '$http', '$location', '$q', '$state', function($rootScope, $http, $location, $q, $state) {
    function User(){
        var self = this;
        $rootScope.$user = this;
        $http.get('/auth/me')
        .then(function(results) {
            self.onIdentity(results.data, false);
        })
    }

    User.prototype.onIdentity = function(response, redirect) {
        if (!response) return;
        if (angular.isDefined(response.token)) {
            localStorage.setItem('JWT', response.token);
        }
        this.user = response.user;
        if (redirect!==false) this.toRedirectPage();
    };

    User.prototype.onIdFail = function (response) {
        $location.path(response.redirect);
        this.loginError = 'Authentication failed.';
        this.registerError = response;
        this.validationError = response.msg;
        this.resetpassworderror = response.msg;
    };

    User.prototype.login = function (user) {
        // this is an ugly hack due to mean-admin needs
        var self = this;
        return $http.post('/auth/login', {
            email: user.email,
            password: user.password
        })
        .then(function(results) {
            return self.onIdentity(results.data);
        })
        .catch(function(results) {
            user.error = results.data;
        });
    };

    User.prototype.logout = function(){
        this.user = null ;
        var self = this;
        return $http.get('/auth/logout')
        .then(function(result) {
            localStorage.removeItem('JWT');
            self.toHomePage();
        });
    };
    User.prototype.toRedirectPage = function() {
        if ($state.is('account.signin') || $location.path() === '/account/signin') {
            $location.search({});
            if ($state.params.redirect === '/account/signin' || !$state.params.redirect) {
                $location.path('/');
            } else {
                $location.path($state.params.redirect);
            }
        }
    };
    User.prototype.toLogInPage = function(destination) {
        if (!$state.is('account.signin') && $location.path() !== '/account/signin') {
            $state.go('account.signin', {redirect: destination});
        }
    };
    User.prototype.toHomePage = function() {
        $state.go('main');
    };
    var user = new User();
    $rootScope.$on('unauthenticated', function(event) {
        alert('unauthenticated');
//         user.toLogInPage($location.path());
    });
    return user;
}]);
