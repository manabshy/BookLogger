//Value service
(function(window, document) {
    // body
    angular.module('app')
        .value('badgeService',{
            'retrieveBadge': retrieveBadge
        });

    function retrieveBadge(minutesRead){
        var badge = null;
        switch(true){
            case (minutesRead > 5000):
                badge = 'Book worm';
                break;
            case (minutesRead > 2500):
                badge = 'Page turner';
                break;
            default:
                badge = 'Getting Started';

        }
        return badge;
    }    
        

})(window, document);