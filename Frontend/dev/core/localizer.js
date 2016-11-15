ideaWatcher.core.Localizer = ideaWatcher.core.Localizer || (function () {

        var currentLanguage = 'en_GB';

        function pubSetLanguage(language) {

            currentLanguage = language;
            console.log('Sprache geändert in: ' + language);
        }

        function pubLocalizeCurrentViews() {

            // lokalisiere die dauerhaft angezeigten Views
            ideaWatcher.core.MessageBroker.publish({
                topic: 'localizeView/mainMenu',
                cbFunction: null
            });

            ideaWatcher.core.MessageBroker.publish({
                topic: 'localizeView/footBar',
                cbFunction: null
            });
            
//            ideaWatcher.core.MessageBroker.publish({
//                topic: 'localizeView/ideaCreation',
//                cbFunction: null
//            });

            // sage der aktuellen View Bescheid, dass sie sich lokalisieren soll
            var currentView = ideaWatcher.core.Navigator.getCurrentView();
            if (currentView != null){
                ideaWatcher.core.MessageBroker.publish({
                    topic: 'localizeView/' + currentView,
                    cbFunction: null
                });
            }
        }

        function pubGetLanguage() {

            return currentLanguage;
        }

        return {
            // Legt die Sprache für die gesamte Website fest
            setLanguage: pubSetLanguage,
            // damit können sich die Views für die selbsständige Lokalisierung während der Initialisierung
            // die gewählte Sprache abholen
            getLanguage: pubGetLanguage,
            // damit können die Views bei einem Sprachwechsel lokalisiert werden
            localzeCurrentViews: pubLocalizeCurrentViews
        };
    })();
