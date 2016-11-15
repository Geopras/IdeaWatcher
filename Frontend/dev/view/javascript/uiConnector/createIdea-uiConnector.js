ideaWatcher.view.ideaCreation = ideaWatcher.view.ideaCreation || (function VCreateIdea() {

        //region local vars
        // Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbIni
        };

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evSaveResponse);
        ideaWatcher.core.MessageBroker.subscribe(evUserDataReceived);
        //endregion

        //region lade zu internationalisierende HTML-Elemente
        var htmlViewHeadline = null;
        var htmlName = null;
        var htmlCategory = null;
        var htmlCategory1 = null;
        var htmlCategory2 = null;
        var htmlCategory3 = null;
        var htmlCategory4 = null;
        var htmlCategory5 = null;
        var htmlCategory6 = null;
        var htmlCategory7 = null;
        var htmlDescription = null;
        var htmlDescriptionTextarea = null;
        var htmlPublishButton = null;
        var htmlCancelButton = null;
        var htmlSaveButton = null;
        //endregion

        //region cbIni
        function cbIni()
        {
            console.log('Initialisiere UIConnector ProfileEdit');

            //region assign html elements
            htmlViewHeadline = document.querySelector('.ideaCreation_newIdea');
            htmlName = document.querySelector('.ideaCreation_name_label');
            htmlCategory = document.querySelector('.ideaCreation_category_label');
            htmlCategory1 = document.querySelector('.ideaCreation_category_1');
            htmlCategory2 = document.querySelector('.ideaCreation_category_2');
            htmlCategory3 = document.querySelector('.ideaCreation_category_3');
            htmlCategory4 = document.querySelector('.ideaCreation_category_4');
            htmlCategory5 = document.querySelector('.ideaCreation_category_5');
            htmlCategory6 = document.querySelector('.ideaCreation_category_6');
            htmlCategory7 = document.querySelector('.ideaCreation_category_7');
            htmlDescription = document.querySelector('.ideaCreation_description_label');
            htmlDescriptionTextarea = document.querySelector('.ideaCreation_description_textarea');
            htmlPublishButton = document.querySelector('.ideaCreation_publish_button');
            htmlCancelButton = document.querySelector('.ideaCreation_cancel_button');
            htmlSaveButton = document.querySelector('.ideaCreation_save_button');
            //endregion

            // lokalisiere die View anhand der global definierten Sprache
            localizeView();

        }
        //endregion

        function localizeView() {

            var language = ideaWatcher.core.Localizer.getLanguage();

            console.log("Starte Lokalisierung der IdeaCreation-View ...");

            htmlViewHeadline.textContent = 
                ideaWatcher.core.Localizer.CreateIdea[language].headline;
            htmlName.textContent = 
                ideaWatcher.core.Localizer.CreateIdea[language].name;
            htmlCategory .textContent = 
                ideaWatcher.core.Localizer.CreateIdea[language].category;
            htmlCategory1 .textContent = 
                ideaWatcher.core.Localizer.CreateIdea[language].category1;
            htmlCategory2.textContent = 
                ideaWatcher.core.Localizer.CreateIdea[language].category2;
            htmlCategory3.textContent = 
                ideaWatcher.core.Localizer.CreateIdea[language].category3;
            htmlCategory4.textContent = 
                ideaWatcher.core.Localizer.CreateIdea[language].category4;
            htmlCategory5.textContent = 
                ideaWatcher.core.Localizer.CreateIdea[language].category5;
            htmlCategory6.textContent = 
                ideaWatcher.core.Localizer.CreateIdea[language].category6;
            htmlCategory7.textContent = 
                ideaWatcher.core.Localizer.CreateIdea[language].category7;
            htmlDescription.textContent = 
                ideaWatcher.core.Localizer.CreateIdea[language].description;
            htmlDescriptionTextarea.textContent = 
                ideaWatcher.core.Localizer.CreateIdea[language].descriptionTextarea;
            htmlPublishButton.textContent = 
                ideaWatcher.core.Localizer.CreateIdea[language].publish;
            htmlCancelButton.textContent = 
                ideaWatcher.core.Localizer.CreateIdea[language].cancel;
            htmlSaveButton.textContent = 
                ideaWatcher.core.Localizer.CreateIdea[language].save;

            console.log("Lokalisierung IdeaCreation-View abgeschlossen.")
        }
        //endregion

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {

        };


    })();