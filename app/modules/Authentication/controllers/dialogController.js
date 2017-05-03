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
                    CredentialsService.loginUser(res.data.username);
                    layFac.addLayer(res.data.data);
                    $scope.closeThisDialog();
                }, function (err) {
                    dialogCtrl.message = "O login falhou.";
                });
        }
    }
})();