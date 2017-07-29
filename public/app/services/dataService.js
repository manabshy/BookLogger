(function() {

    angular.module('app')
        .factory('dataService', ['$q','$timeout','logger','$http','constants',dataService]);


    function dataService($q,$timeout,logger,$http,constants) {

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders
        };

        function getAllBooks() {

            return $http({
                method: 'GET',
                url: 'api/books',
                headers: {
                    'PS-BookLogger-Version': constants.APP_VERSION
                }
            })
            .then(sendResponseData)
            .catch(sendGetBooksError)

        }
        function sendResponseData(response) {

            return response.data;

        }

        function sendGetBooksError(response) {

            return $q.reject('Error retrieving book(s). (HTTP status: ' + response.status + ')');

        }

        function getAllReaders() {

            logger.output('getting all readers');

            var readersArray = [
                {
                    reader_id: 1,
                    name: 'Marie',
                    weeklyReadingGoal: 315,
                    totalMinutesRead: 5600
                },
                {
                    reader_id: 2,
                    name: 'Daniel',
                    weeklyReadingGoal: 210,
                    totalMinutesRead: 3000
                },
                {
                    reader_id: 3,
                    name: 'Lanier',
                    weeklyReadingGoal: 140,
                    totalMinutesRead: 600
                }
            ];
            var deferred = $q.defer();
            $timeout(function(){
                deferred.resolve(readersArray);
            },1500);
            return deferred.promise;
        }
    }

    dataService.$inject = ['logger'];

}());