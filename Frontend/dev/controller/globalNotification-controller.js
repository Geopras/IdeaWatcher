ideaWatcher.controller.GlobalNotification = ideaWatcher.controller.GlobalNotification || (function CGlobalNotification() {

    // quick and dirty Hack, nicht zum nachmachen;
    onkeydown = function(e){
        if(e.ctrlKey && e.keyCode == 'I'.charCodeAt(0)){
            showNotification('Login','Login leider fehlgeschlagen', 4000);
        }
    };

    //region local vars
    var cbShowNotification = null;
    //endregion

    function showNotification(headline,text,duration)
    {
        cbShowNotification(headline,text,duration);
    }

    function pubRegisterShowNotification(cbFunction) {
        cbShowNotification = cbFunction;
    }

    return {

        registerShowNotification: pubRegisterShowNotification
    };

})();
