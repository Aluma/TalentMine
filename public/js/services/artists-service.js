angular.module('TalentMine').service('ArtistsService', function($http, $q) {
    this.getArtists = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/artists'
        }).then(function(response) {
            deferred.resolve(response.data);
        });
        return deferred.promise;
    }
});