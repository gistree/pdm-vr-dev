(function () {
    'use strict';

    angular
        .module('AuthenticationModule')
        .controller('DialogController', DialogController);

    DialogController.$inject = ['$scope', 'LayersFactory', 'CredentialsService'];

    function DialogController($scope, layFac, CredentialsService) {
        var dialogCtrl = this;

        this.submit = function (form) {
            $scope.submitted = true;
            if (form.$invalid) {
                return;
            }
            CredentialsService
                .login(dialogCtrl.username, dialogCtrl.password)
                .then(function (res) {
                    res.data.layers.forEach(function (grp) {
                        layFac.addLayer(grp);
                    });
                    CredentialsService.loginUser(res.data.username);
                    $scope.closeThisDialog();
                }, function (err) {
                    dialogCtrl.invalidUser = true;
                    dialogCtrl.invalidPass = true;
                    dialogCtrl.message = "O login falhou.";
                });
        }
        this.reset = function (e) {
            dialogCtrl[e] = false;
        }
    }
})();