ideaWatcher.controller.GlobalNotification = ideaWatcher.controller.GlobalNotification || (function CGlobalNotification() {

    // quick and dirty Hack, nicht zum nachmachen;
    onkeydown = function(e){
        if(e.ctrlKey && e.keyCode == 'I'.charCodeAt(0)){
            pubShowNotification('Login','Login leider fehlgeschlagen', 4000);
        }
    };

    //region local vars
    var cbShowNotification = null;
    //endregion

    function pubShowNotification(headline,text,duration)
    {
        cbShowNotification(headline,text,duration);
    }

    function pubRegisterShowNotification(cbFunction) {
        cbShowNotification = cbFunction;
    }

    return {
        registerShowNotification: pubRegisterShowNotification,
        showNotification: pubShowNotification
    };

})();
