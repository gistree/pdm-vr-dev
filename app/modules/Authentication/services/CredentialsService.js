(function () {
    'use strict';

    angular
        .module('AuthenticationModule')
        .service('CredentialsService', CredentialsService);

    CredentialsService.$inject = ['$http'];

    function CredentialsService($http) {
        var username = "";
        var isLoggedIn = false;

        this.login = login;
        this.logout = logout;
        this.loginUser = loginUser;
        this.logoutUser = logoutUser;
        this.isUserLogged = isUserLogged;
        this.getUsername = getUsername;

        function login(username, password) {
            return $http({
                url: '/credentials/login',
                method: "POST",
                data: {
                    'username': username,
                    'password': password
                },
                xhrFields: {
                    withCredentials: true
                },
            });
        };

        function logout() {
            return $http({
                url: '/credentials/logout',
                method: "POST",
            });
        }

        function loginUser(u) {
            username = u;
            isLoggedIn = true;
        }

        function logoutUser() {
            username = "";
            isLoggedIn = false;
        }

        function isUserLogged() {
            return isLoggedIn;
        }

        function getUsername() {
            return username;
        }
    }
})();