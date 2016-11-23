ideaWatcher.view.ideaCreation = ideaWatcher.view.ideaCreation || (function () {

        //region local vars


        var htmlView = null;
        var htmlProfileView = null;
        var createIdea = null;

        //region subscribe to events
        ideaWatcher.controller.ideaCreation.registerInitializeView(cbIni);
        ideaWatcher.controller.ideaCreation.registerShowView(cbShowView);
        ideaWatcher.controller.ideaCreation.registerLocalizeView(cbLocalizeView);
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
            console.log('Initialisiere UIConnector ideaCreation');

            //region assign html elements
            htmlView = document.querySelector('.ideaCreation_view');
            htmlViewHeadline = document.getElementById('ideaCreation_newIdea');
            htmlName = document.getElementById('ideaCreation_name_label');
            htmlCategory = document.getElementById('ideaCreation_category_label');
            htmlCategory1 = document.getElementById('ideaCreation_category_1');
            htmlCategory2 = document.getElementById('ideaCreation_category_2');
            htmlCategory3 = document.getElementById('ideaCreation_category_3');
            htmlCategory4 = document.getElementById('ideaCreation_category_4');
            htmlCategory5 = document.getElementById('ideaCreation_category_5');
            htmlCategory6 = document.getElementById('ideaCreation_category_6');
            htmlCategory7 = document.getElementById('ideaCreation_category_7');
            htmlDescription = document.getElementById('ideaCreation_description_label');
            htmlDescriptionTextarea = document.getElementById('ideaCreation_description_textarea');
            htmlPublishButton = document.getElementById('ideaCreation_publish_button');
            htmlCancelButton = document.getElementById('ideaCreation_cancel_button');
            htmlSaveButton = document.getElementById('ideaCreation_save_button');
            //endregion

            // lokalisiere die View anhand der global definierten Sprache
            cbLocalizeView();

        }
        //endregion

        function cbShowView(exObj) {

            if(exObj.shouldShow)
            {
                cbLocalizeView();
                htmlView.style.display = 'block';
            } else {

                htmlView.style.display = 'none';
            }

        }

        function cbLocalizeView() {

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
            htmlPublishButton.setAttribute("value", ideaWatcher.core.Localizer
                .CreateIdea[language].publish);
            htmlCancelButton.setAttribute("value", ideaWatcher.core.Localizer
                .CreateIdea[language].cancel);
            htmlSaveButton.setAttribute("value", ideaWatcher.core.Localizer
                .CreateIdea[language].save);

            console.log("Lokalisierung IdeaCreation-View abgeschlossen.");
        }
        //endregion

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {

        };


    })();