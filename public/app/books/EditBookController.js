(function() {
    'use strict';

    angular.module('app')
    .controller('EditBookController', ['$routeParams','dataService',EditBookController]);
    function EditBookController($routeParams, dataService) {
        console.log('EditBookController');
        var vm = this;
        dataService.getAllBooks()
            .then(function (books) {
                vm.currentBook = books.filter(function (item) {
                    return item.book_id == $routeParams.bookID;
                })[0];
                console.log(vm.currentBook);
            });
    }
})();