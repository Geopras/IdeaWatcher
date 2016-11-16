ideaWatcher.controller.GlobalNotification = ideaWatcher.controller.GlobalNotification || (function CGlobalNotification() {

    // quick and dirty Hack, nicht zum nachmachen;
    onkeydown = function(e){
        if(e.ctrlKey && e.keyCode == 'I'.charCodeAt(0)){
            pubShowNotification(ideaWatcher.model.GlobalNotificationType.ERROR,'Login','Login leider' +
                ' fehlgeschlagen', 4000);
        }
    };


    //region local vars
    var cbShowNotification = null;
    //endregion

    function pubShowNotification(notificationType,headline,text,duration)
    {
        cbShowNotification(notificationType,headline,text,duration);
    }

    function pubRegisterShowNotification(cbFunction) {
        cbShowNotification = cbFunction;
    }

    return {
        registerShowNotification: pubRegisterShowNotification,
        showNotification: pubShowNotification
    };

})();
