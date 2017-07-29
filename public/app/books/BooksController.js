(function() {
    // Dependency Annotation
    angular.module('app')
        .controller('BooksController', ['books','dataService','logger','badgeService','$cookies','$cookieStore','$log','$http','constants',BooksController]);


    function BooksController(books,dataService,logger,badgeService,$cookies,$cookieStore,$log) {

        var vm = this;
        vm.appName = books.appName;
        //vm.allBooks = dataService.getAllBooks();
        dataService.getAllBooks()
            .then(getBooksSuccess,getBooksError,getBooksNotification);

        function getBooksSuccess(books){
            vm.allBooks = books;
        }    
        function getBooksError(reason){
            console.log(reason);
        }
        function getBooksNotification(notification){
            console.log('Promise notification:' + notification);

        }
        function errorCallBack(errorMsg){
            console.log('Error Message:' + errorMsg);
        }
        dataService.getAllReaders()
            .then(getReadersSuccess)
            .catch(errorCallBack)
            .finally(getAllReadersComplete);

        function getReadersSuccess(readers){
            vm.allReaders = readers;
        }    
        function getAllReadersComplete(){
            console.log('getAllReaders has completed');
        }
        vm.getBadge = badgeService.retrieveBadge;
        vm.favoriteBook = $cookies.favoriteBook;
        vm.lastEdited = $cookieStore.get('lastEdited');
        logger.output('BooksController has been created');
    }


}());

