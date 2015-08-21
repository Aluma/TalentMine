var app = angular.module('TalentMine', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/templates/landing.html',
        controller: 'LandingCtrl',
        resolve: {
            artists: function(ArtistsService) {
                return ArtistsService.getArtists();
            }
        }
    })
        .otherwise({
            redirectTo: '/'
        });
})