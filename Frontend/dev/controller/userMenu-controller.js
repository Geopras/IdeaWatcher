ideaWatcher.controller.UserMenu = ideaWatcher.controller.UserMenu || (function () {

        var cbShowView = null;
        var cbInitView = null;
        var cbLocalize = null;

        // Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbInitializeView
        };

        var evSwitchView = {
            topic: 'switchView/profile',
            cbFunction: cbSwitchView
        };

        var evLocalizeViewMyIdeas = {
            topic: 'localizeView/' + ideaWatcher.model.Navigation.ViewId.MYIDEAS.NONE,
            cbFunction: cbLocalizeView
        };

        var evLocalizeViewFollowedIdeas = {
            topic: 'localizeView/' + ideaWatcher.model.Navigation.ViewId.MYFOLLOWEDIDEAS.NONE,
            cbFunction: cbLocalizeView
        };

        var evLocalizeViewProfileEdit = {
            topic: 'localizeView/' + ideaWatcher.model.Navigation.ViewId.MYPROFILE,
            cbFunction: cbLocalizeView
        };

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evSwitchView);
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeViewMyIdeas);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeViewFollowedIdeas);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeViewProfileEdit);
        //endregion

        //region Callback: Internal - SwitchView
        function cbSwitchView(obj)
        {
            cbShowView({
                shouldShow: obj.shouldShow
            });
        }

        function cbInitializeView(obj) {

            cbInitView();
        }

        function cbLocalizeView(obj) {

            cbLocalize();
        }
        //endregion

        //region register Callbacks
        function pubRegisterShowView(cb) {
            cbShowView = cb;
        }

        function pubRegisterInitView(cb) {

            cbInitView = cb;
        }

        function pubRegisterLocalize(cb) {

            cbLocalize = cb;
        }
        //endregion

        function pubSwitchView(buttonId, data) {

            var exObj = Object.create(ideaWatcher.model.ExchangeObject.SwitchView);
            exObj.viewId = ideaWatcher.model.Navigation.ViewId[buttonId];
            exObj.viewUrl = ideaWatcher.model.Navigation.ViewUrl[buttonId];
            if (data) {
                exObj.additionalData = data;
            }

            ideaWatcher.core.Navigator.switchView(exObj);
        }

        function pubShowIdeaList(listType) {

            var category = ideaWatcher.model.IdeaList.Category.NONE;

            ideaWatcher.controller.IdeaList
                .updateIdeaList(listType, category, 1, 10, true);
        }

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {
            // hier kann die View eine Methode(ui-Connector) registrieren, die gerufen wird,
            registerInitializeView: pubRegisterInitView,
            registerLocalizeView: pubRegisterLocalize,
            // wenn die View ein/ausgeblendet werden soll
            registerShowView: pubRegisterShowView,
            showIdeaList: pubShowIdeaList,
            switchView: pubSwitchView
        };

    })();
