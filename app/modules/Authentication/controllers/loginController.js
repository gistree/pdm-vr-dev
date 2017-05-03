(function () {
    'use strict';

    angular
        .module('AuthenticationModule')
        .controller('LoginController', LoginController);


    LoginController.$inject = ['ngDialog', '$scope', 'CredentialsService', 'LayersFactory']

    function LoginController(ngDialog, $scope, CredentialsService, LayersFactory) {
        var logCtrl = this;

        this.login = function () {
            ngDialog.open({
                template: 'app/templates/login.html',
                className: 'ngdialog-theme-default',
                showClose: false,
                controller: 'DialogController',
                controllerAs: 'dialogCtrl'
            });
        }

        this.logout = function () {
            CredentialsService
                .logout()
                .then(function (res) {
                    LayersFactory.removeProtectedLayers();
                    CredentialsService.logoutUser();
                }, function (err) {
                    LayersFactory.removeProtectedLayers();
                    CredentialsService.logoutUser();
                });

        };

        $scope.$watch(function () {
            return CredentialsService.isUserLogged();
        }, function (log) {
            logCtrl.isLogged = CredentialsService.isUserLogged();
            logCtrl.username = CredentialsService.getUsername();
        });

        activate();

        function activate() {
            logCtrl.isLogged = CredentialsService.isUserLogged();
            logCtrl.username = CredentialsService.getUsername();
            window.ctrl = logCtrl;
        }
    }
})();