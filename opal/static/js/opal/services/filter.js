angular.module('opal.services')
    .factory('Filter', function($http, $q) {
    return function(resource){
        var filter = this;

        this.initialise = function(attrs){
            angular.extend(filter, attrs);
        }

        this.save = function(attrs){
            var url = '/filters/';
            var deferred = $q.defer();
            var method;

	        if (angular.isDefined(filter.id)) {
		        method = 'put';
		        url += attrs.id + '/';
	        } else {
		        method = 'post';
	        }


            $http[method](url, attrs).then(
                function(response){
                    filter.initialise(response.data);
                    deferred.resolve(filter);
                },
                function(response) {
		            // TODO handle error better
		            if (response.status == 409) {
			            alert('Item could not be saved because somebody else has \
recently changed it - refresh the page and try again');
		            } else {
			            alert('Item could not be saved');
		            };
		        }
            );
            return deferred.promise;
        };

        this.destroy = function(){
	        var deferred = $q.defer();
	        var url = '/filters/' + item.id + '/';

	        $http['delete'](url).then(function(response) {
		        deferred.resolve();
	        }, function(response) {
		        // handle error better
		        alert('Item could not be deleted');
	        });
	        return deferred.promise;

        }

        this.initialise(resource);
    };
});
