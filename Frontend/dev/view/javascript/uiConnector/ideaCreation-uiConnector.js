ideaWatcher.view.ideaCreation = ideaWatcher.view.ideaCreation || (function () {


        //region subscribe to events
        ideaWatcher.controller.ideaCreation.registerInitializeView(cbIni);
        ideaWatcher.controller.ideaCreation.registerShowView(cbShowView);
        ideaWatcher.controller.ideaCreation.registerLocalizeView(cbLocalizeView);
        //endregion

        // //region local vars
        // var evIni = {
        //     topic: 'internal/ini',
        //     cbFunction: cbIni
        // };
        //
        // var evLocalizeView = {
        //     topic: 'localizeView/ideaCreation',
        //     cbFunction: localizeView
        // };

        var htmlIdeaCreationView = null;
        var htmlIdeaCreationForm = null;

        //region lade zu internationalisierende HTML-Elemente
        var htmlViewHeadline = null;
        var htmlIdeaName = null;
        var htmlCategory = null;
        var htmlCategorySelect = null;
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
        var htmlIdeaNameInput = null;
        //endregion

        // //region subscribe to events
        // ideaWatcher.core.MessageBroker.subscribe(evIni);
        // ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        // //endregion

        //region cbIni
        function cbIni()
        {
            console.log('Initialisiere UIConnector ideaCreation');

            //region assign html elements
            htmlIdeaCreationView = document.querySelector('.ideaCreation_view');
            htmlIdeaCreationForm = document.querySelector('.ideaCreation_form');
            htmlViewHeadline = document.getElementById('ideaCreation_newIdea');
            htmlIdeaName = document.getElementById('ideaCreation_name_label');
            htmlIdeaNameInput = document.getElementById('ideaCreation_name_input');
            htmlCategory = document.getElementById('ideaCreation_category_label');
            htmlCategorySelect = document.getElementById('ideaCreation_category_select');
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

            // region override onSubmit to prevent page reload
            // htmlIdeaCreationForm.onsubmit = sendIdeaToController;
            htmlPublishButton.addEventListener('click',  publishIdea);
            htmlCancelButton.addEventListener('click', cancelIdea);
            htmlSaveButton.addEventListener('click',  saveIdea);
            // endregion

            cbLocalizeView();

        }
        //endregion

        //region
        function publishIdea()
        {
            event.preventDefault();

            if(!checkValidForm()) return;

            var exObj = {
                ideaName: htmlIdeaNameInput.value,
                ideaCategory: htmlCategorySelect.value,
                ideaDescription: htmlDescriptionTextarea.value,
                ideaStatus: 'publish'
            };
            console.log(exObj);

            ideaWatcher.controller.ideaCreation.publishNewIdea(exObj);
        }
        //endregion

        function saveIdea()
        {
            event.preventDefault();

            if(!checkValidForm()) return;

            var exObj = {
                ideaName: htmlIdeaNameInput.value,
                ideaCategory: htmlCategorySelect.value,
                ideaDescription: htmlDescriptionTextarea.value,
                ideaStatus: 'save'
            };
            console.log(exObj);

            ideaWatcher.controller.ideaCreation.saveNewIdea(exObj);
        }
        //endregion

        function cancelIdea() {

            event.preventDefault();

            var exObj = {
                ideaName: '',
                ideaCategory: '',
                ideaDescription: '',
                ideaStatus: 'cancel'
            };
            console.log(exObj);

            ideaWatcher.controller.ideaCreation.cancelNewIdea();
        }
        //endregion

        //region checkValidForm
        function checkValidForm() {

            var ideaName = htmlIdeaNameInput.value;
            var ideaDescription = htmlDescriptionTextarea.value;
            var isFormValid = true;
            var htmlIdeaNameErrorLabel = document.querySelector('.ideaCreation_ideaNameError_label');
            var htmlIdeaDescriptionErrorLabel = document.querySelector('.ideaCreation_ideaDescriptionError_label');
            var errorMessage;

            if (ideaName.length < 1) {
                console.log('Ideen Name zu kurz');
                errorMessage = ideaWatcher.core.Localizer.ideaCreation[language].ideaNameTooShort;
                isFormValid = false;
            } else if (ideaDescription < 1) {
                console.log('Ideen Beschreibung zu kurz');
                errorMessage = ideaWatcher.core.Localizer.ideaCreation[language].ideaDescriptionTooShort;
                isFormValid = false;
            } else {
                console.log('Der Name und die Beschreibung der Idee entsprechen den Richtlinien.');
                htmlIdeaNameErrorLabel.style.display = 'none';
                htmlIdeaDescriptionErrorLabel.style.display = 'none';
            }

            if (!isFormValid) {
                htmlIdeaNameErrorLabel.textContent = errorMessage;
                htmlIdeaNameErrorLabel.style.display = 'inline';
                htmlIdeaDescriptionErrorLabel.textContent = errorMessage;
                htmlIdeaDescriptionErrorLabel.style.display = 'inline';
            }

            return isFormValid;
        }
        //endregion

        //region showView
        function cbShowView(exObj) {

            if(exObj.shouldShow)
            {
                renderView(exObj.additionalData.idea);
                htmlIdeaCreationView.style.display = 'block';
            } else {

                htmlIdeaCreationView.style.display = 'none';
            }
        }
        //endregion

        function renderView(idea) {

            // Wenn eine Idee mit übergeben wurde, dann soll sie in das
            // Formular übernommen werden zum Editieren
            if (idea) {

                htmlIdeaNameInput.textContent = idea.name;
                htmlDescriptionTextarea.textContent = idea.description;
                // Setze die gewählte Kategorie
                var selectBox = document.getElementById('ideaCreation_category_select');
                var chosenValue = idea.category;
                for(var i = 0, j = selectBox.options.length; i < j; ++i) {
                    if(selectBox.options[i].value === chosenValue) {
                        selectBox.selectedIndex = i;
                        break;
                    }
                }
            }
            cbLocalizeView();
        }

        function cbLocalizeView() {

            var language = ideaWatcher.core.Localizer.getLanguage();

            console.log("Starte Lokalisierung der IdeaCreation-View ...");

            htmlViewHeadline.textContent =
                ideaWatcher.core.Localizer.CreateIdea[language].headline;
            htmlIdeaName.textContent =
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
            // Wenn noch Defaulttext drin steht, dann diesen lokalisieren,
            // sonst ignorieren
            if (htmlDescriptionTextarea.textContent ===
                ideaWatcher.core.Localizer.CreateIdea['de_DE'].descriptionTextarea ||
                htmlDescriptionTextarea.textContent ===
                ideaWatcher.core.Localizer.CreateIdea['en_GB'].descriptionTextarea) {

                htmlDescriptionTextarea.textContent =
                    ideaWatcher.core.Localizer.CreateIdea[language].descriptionTextarea;
            }

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