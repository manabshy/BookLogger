(function() {
    'use strict';

    angular.module('app')
        .controller('AddBookController',['$log', '$location', 'dataService' ,AddBookController]);
    function AddBookController($log, $location, dataService) {
        var vm = this;
        
        vm.newBook = {};

        vm.addBook = function(){
            dataService.addBook(vm.newBook)
                .then('addBookSuccess')
                .catch('addBookError');
        };
        function addBookSuccess(message){
            alert('added a book');
            $log.info(message);
            $location.path('/');
        }
        function addBookError(errorMessage){
            $log.error(errorMessage);
        }
        console.log('AddBookController');
    }


})();