ideaWatcher.core.Navigator = ideaWatcher.core.Navigator || (function () {

        //region local vars
        var currentView = ideaWatcher.model.Navigation.ViewId.HOT.NONE;
        var startView = ideaWatcher.model.Navigation.ViewId.HOT.NONE;
        //endregion

        //region EventListener registrieren(popstate)
        window.addEventListener('popstate', function (e) {
            executeSwitch(e.state);
        });
        //endregion

        function prepareSwitch(switchInfo) {
            history.pushState(switchInfo.viewId, '', switchInfo.url);
            executeSwitch(switchInfo.viewId, switchInfo.additionalData);
        }

        function executeSwitch(newView, additionalData) {
            if (newView === null) newView = startView;

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

        function pubGetCurrentView() {

            return currentView;
        }

        return {
            switchView: prepareSwitch,
            // gibt die aktuell angezeigte View zurück
            getCurrentView: pubGetCurrentView
        };

    })();