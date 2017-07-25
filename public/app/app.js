(function() {
var app =  angular.module('app', ['ngRoute']);
// app.config(function($provide){
//     $provide.provider('books',function(){
//         this.$get = function(){
//             var appName = 'Book Logger';
//             var appDesc = 'Track which books to read';
//             return{
//                 appName: appName,
//                 appDesc: appDesc
//             };
//         };

//     });
// })
    // Dependency Annotation
    app.provider('books',['constants',function(constants){
            this.$get = function(){
                var appName = constants.APP_TITLE;
                var appDesc = constants.APP_DESCRIPTION;
                var version = constants.APP_VERSION;
                if(includeVersionTitle){
                    appName+= ' ' + version + " " + appDesc;
                }
                return{
                    appName: appName,
                    appDesc: appDesc
                };
            };
            var includeVersionTitle = false;
            this.setIncludeVersionTitle = function(value){
                includeVersionTitle = value;
            };
    }]);
    //Remember,we named the service 'books',but angular automatically appends the word 'Provider' to the name of the service you specify when creating the underline provider for the service

    //Just to demonstrate constant services unlike other services can be injected into the module config function

    //We can't inject value service 'badgeService' into the module config function

    // Dependency Annotation
    app.config(['booksProvider','$routeProvider','constants','dataServiceProvider',function(booksProvider,$routeProvider,constants,dataServiceProvider){
        booksProvider.setIncludeVersionTitle(true);
        console.log('Title from constants service: ' + constants.APP_TITLE);

        // This is just to hightlight the fact that angular is creating the underline providers for us when we use the more convenient factory service and value function - e.i dataServiceProvider

        console.log(dataServiceProvider.$get);
        $routeProvider
            .when('/', {
                templateUrl: '/app/templates/books.html',
                controller: 'BooksController',
                controllerAs: 'books'
            })
            .when('/AddBook', {
                templateUrl: '/app/templates/addBook.html',
                controller: 'AddBookController',
                controllerAs: 'addBook'
            })
            .when('/EditBook/:bookID', {
                templateUrl: '/app/templates/editBook.html',
                controller: 'EditBookController',
                controllerAs: 'bookEditor'
            })
            .otherwise('/');
    }]);
}());
