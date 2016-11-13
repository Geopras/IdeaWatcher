ideaWatcher.view.GlobalNotification = ideaWatcher.view.GlobalNotification || (function UIGlobalNotification() {

    //region local vars
    var evIni = {
      topic: 'internal/ini',
      cbFunction: cbIni
    };
    var htmlView = null;
    var htmlHeadline = null;
    var htmlDisplayText = null;
    //endregion

    //region subscribe to events
    ideaWatcher.core.MessageBroker.subscribe(evIni);
    //endregion


    //region ini
    function cbIni() {
        console.log('initialisere GLOBAL NOTIFICATION');
        htmlView = document.querySelector('.globalNotification_view');
        htmlHeadline = document.querySelector('#globalNotification_headline_h3');
        htmlDisplayText = document.querySelector('#globalNotification_displayText_span');
        ideaWatcher.controller.GlobalNotification.registerShowNotification(cbShowNotification);
    }
    //endregion

    //region
    function cbShowNotification(headline, text, duration){
        console.log('show Notification');

        htmlView.style.right = '50px';
        htmlHeadline.textContent = headline;
        htmlDisplayText.textContent = text;
        htmlView.style.opacity = '1.0';
        
        setTimeout(function () {

            htmlView.style.right = '-350px';
            htmlView.style.opacity = '0.0';
            
        },duration);
    }
    //endregion

    return {

    };

})();