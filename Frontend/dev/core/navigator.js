ideaWatcher.core.Navigator = ideaWatcher.core.Navigator || (function CNavigator() {

    //region local vars
    var currentView = 'login';
    var startView = 'login';
    //endregion

    //region EventListener registrieren(popstate)
    window.addEventListener('popstate', function(e) {
        executeSwitch(e.state);
    });
    //endregion

    function prepareSwitch(switchInfo) {
        history.pushState(switchInfo.viewId,'',switchInfo.url);
        executeSwitch(switchInfo.viewId,switchInfo.additionalData);
    }

    function executeSwitch(newView,additionalData) {
        if(newView === null) newView = startView;

        ideaWatcher.core.MessageBroker.publish({
            topic: 'switchView/' + currentView,
            cbFunction: null,
            exObject: {
                shouldShow: false,
                additionalData: additionalData
            }
        });

        ideaWatcher.core.MessageBroker.publish({
            topic: 'switchView/' + newView,
            cbFunction: null,
            exObject: {
                shouldShow: true,
                additionalData: additionalData
            }
        });

        currentView = newView;
    }

    return {
        switchView: prepareSwitch
    };

})();