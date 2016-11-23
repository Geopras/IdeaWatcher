ideaWatcher.controller.ideaCreation = ideaWatcher.controller.ideaCreation || (function () {

        //region lokale Variablen
        var cbIni = null;
        var cbShowView = null;
        var cbLocalize = null;

        //endregion


        //region Event Globale Initialisierung

        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbInitializeView
        };

        var evSwitchView = {
            topic: 'switchView/' + ideaWatcher.model.Navigation.ViewId.CREATEIDEA,
            cbFunction: cbSwitchView
        };

        var evLocalizeView = {
            topic: 'localizeView/' + ideaWatcher.model.Navigation.ViewId.CREATEIDEA,
            cbFunction: cbLocalizeView
        };
        //endregion

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evSwitchView);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        //endregion

        //region Callbacks definieren

        function cbInitializeView(obj) {
            cbIni();
        }
        function cbSwitchView(obj)
        {
            // if(obj.shouldShow) wam.logic.Header.showHeader(false);
            cbShowView(obj);
        }

        function cbLocalizeView(obj) {
            cbLocalize();
        }
        //endregion

        //region register Callbacks

        function pubRegisterInitializeView(cb) {
            cbIni = cb;
        }
        function pubRegisterShowView(cb) {
            cbShowView = cb;
        }

        function pubRegisterLocalizeView(cb) {
            cbLocalize = cb;
        }
        //endregion

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {
            // hier kann die View eine Methode(ui-Connector) registrieren, die gerufen wird,
            // wenn die View ein/ausgeblendet werden soll
            registerInitializeView: pubRegisterInitializeView,
            registerLocalizeView: pubRegisterLocalizeView,
            registerShowView: pubRegisterShowView
        };

    })();