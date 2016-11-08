ideaWatcher.controller.FollowedIdeas = ideaWatcher.controller.FollowedIdeas || (function CFollowedIdeas() {

        var cbShowView = null;
        var evSwitchView = {
            topic: 'switchView/followedIdeas',
            cbFunction: cbSwitchView
        };

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evSwitchView);
        //endregion

        //region Callback: Internal - SwitchView
        function cbSwitchView(obj)
        {
            cbShowView({
                shouldShow: obj.shouldShow
            });
        }
        //endregion

        //region register Callbacks
        function pubRegisterShowView(cb) {
            cbShowView = cb;
        }
        //endregion

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {
            // hier kann die View eine Methode(ui-Connector) registrieren, die gerufen wird,
            // wenn die View ein/ausgeblendet werden soll
            registerShowView: pubRegisterShowView
        };

    })();
