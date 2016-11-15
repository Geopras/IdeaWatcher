ideaWatcher.view.ProfileEdit = ideaWatcher.view.ProfileEdit || (function VProfileEdit() {

        //region local vars
        // Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbIni
        };

        var evSaveResponse = {
            topic: 'SProfileEdit/validateAndSaveRequest-response',
            cbFunction: cbSaveResponse
        };

        var evUserDataReceived = {
            topic: 'SProfileEdit/getUserDataRequest-response',
            cbFunction: cbUserDataReceived
        };

        var evLocalizeView = {
            topic: 'localizeView/profileEdit',
            cbFunction: localizeView
        };

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evSaveResponse);
        ideaWatcher.core.MessageBroker.subscribe(evUserDataReceived);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        //endregion

        var htmlForm = null;
        var htmlView = null;
        var htmlProfileView = null;

        //region lade zu internationalisierende HTML-Elemente
        var htmlViewHeader = null;

        var htmlUserNameLabel = null;
        var htmlEmailLabel = null;
        var htmlEmailCheckLabel = null;
        var htmlSurnameLabel = null;
        var htmlFirstNameLabel = null;
        var htmlGenderLabel = null;
        var htmlLanguageLabel = null;

        var htmlUserNameInput = null;
        var htmlEmailInput = null;
        var htmlEmailCheckInput = null;
        var htmlSurnameInput = null;
        var htmlFirstNameInput = null;
        var htmlGenderSelect = null;
        var htmlLanguageSelect = null;

        var htmlAlertSuccessDiv = null;
        var htmlAlertInfoDiv = null;
        var htmlAlertWarningDiv = null;
        var htmlAlertErrorDiv = null;

        var htmlSubmitButton = null;
        var htmlBrowseImageButton = null;
        //endregion

        //region cbIni
        function cbIni()
        {
            console.log('Initialisiere UIConnector ProfileEdit');

            //region assign html elements
            htmlForm = document.querySelector('.profileEdit_form');
            htmlView = document.querySelector('.profileEdit_view');
            htmlProfileView = document.querySelector('.profile_view');
            htmlViewHeader = document.querySelector('.profileEdit_header');
            htmlUserNameLabel = document.getElementById('profileEdit_userName_label');
            htmlEmailLabel = document.getElementById('profileEdit_mail_label');
            htmlEmailCheckLabel = document.getElementById('profileEdit_mailCheckbox_label');
            htmlSurnameLabel = document.getElementById("profileEdit_surname_label");
            htmlFirstNameLabel = document.getElementById("profileEdit_firstName_label");
            htmlGenderLabel = document.getElementById("profileEdit_gender_label");
            htmlLanguageLabel = document.getElementById("profileEdit_language_label");
            htmlUserNameInput = document.getElementById('profileEdit_userName_input');
            htmlEmailInput = document.getElementById('profileEdit_mail_input');
            htmlEmailCheckInput = document.getElementById('profileEdit_mailCheckbox_input');
            htmlSurnameInput = document.getElementById("profileEdit_surname_input");
            htmlFirstNameInput = document.getElementById("profileEdit_firstName_input");
            htmlGenderSelect = document.getElementById("profileEdit_gender_select");
            htmlLanguageSelect = document.getElementById("profileEdit_language_select");
            htmlAlertSuccessDiv = document.getElementById("profileEdit_alertSuccess_div");
            htmlAlertInfoDiv = document.getElementById("profileEdit_alertInfo_div");
            htmlAlertWarningDiv = document.getElementById("profileEdit_alertWarning_div");
            htmlAlertErrorDiv = document.getElementById("profileEdit_alertError_div");
            htmlSubmitButton = document.getElementById("profileEdit_submit_button");
            htmlBrowseImageButton = document.getElementById("profileEdit_browseImage_button");
            //endregion

            // Benutzername und Email dürfen nicht geändert werdne
            htmlUserNameInput.disabled = true;
            htmlEmailInput.disabled = true;

            //region register Callbacks
            ideaWatcher.controller.ProfileEdit.registerShowView(cbShowView);
            //endregion

            // region onSubmit
            htmlForm.onsubmit = function onSubmit(event) {
                // prevent page reload
                event.preventDefault();

                var exObj = ideaWatcher.model.User;
                exObj.username = htmlUserNameInput.value;
                exObj.email = htmlEmailInput.value;
                exObj.isMailPublic = htmlEmailCheckInput.checked;
                exObj.surname = htmlSurnameInput.value;
                exObj.firstName = htmlFirstNameInput.value;
                exObj.gender = htmlGenderSelect.value;
                exObj.language = htmlLanguageSelect.value;

                //TODO (NiceTOHave): Validierung von Username und Mail bei LostFocus vom Input oder so

                ideaWatcher.controller.ProfileEdit.tryToSaveUserData(exObj);
            };
            // endregion

            // lokalisiere die View anhand der global definierten Sprache
            localizeView();

        }
        //endregion

        //region cbSaveResponse
        function cbSaveResponse(exObj)
        {
            var language = ideaWatcher.core.Localizer.getLanguage();

            if (exObj.result == 'success'){
                ideaWatcher.controller.GlobalNotification.showNotification(
                    ideaWatcher.core.Localizer.ProfileEdit[language].profile,
                    ideaWatcher.core.Localizer.ProfileEdit[language].saveSuccess,
                    5000);
            } else {

                var errorMessage = exObj.error;

                ideaWatcher.controller.GlobalNotification.showNotification(
                    ideaWatcher.core.Localizer.ProfileEdit[language].profile,
                    ideaWatcher.core.Localizer.ProfileEdit[language].errorMessage[errorMessage],
                    5000);
            }

            //TODO: Ausgabe an User - Speichern erfolgreich oder Fehler bei Validierung von UserName, Email
        }
        //endregion

        //region cbUserDataReceived
        // Zeige die Benutzerdaten in den Input-Feldern an, wenn sie erhalten wurden
        function cbUserDataReceived(exObj)
        {
            htmlUserNameInput.value = exObj.data.userName;
            htmlEmailInput.value = exObj.data.email;
            htmlEmailCheckInput.checked = exObj.data.isMailPublic;
            htmlSurnameInput.value = exObj.data.surname;
            htmlFirstNameInput.value = exObj.data.firstName;
            htmlGenderSelect.value = exObj.data.gender;
            htmlLanguageSelect.value = exObj.data.language;
        }
        //endregion

        //region showView
        function cbShowView(obj)
        {
            if(obj.shouldShow)
            {
                //TODO: Hier würde man jetzt den aktuell angemeldeten Benutzer übergeben
                var currentUser = {
                    userName: 'HansWurst2000'
                };
                ideaWatcher.controller.ProfileEdit.tryToLoadUserData(currentUser);

                localizeView();
                htmlProfileView.style.display = 'block';
                htmlView.style.display = 'block';

                // //TODO: Hier wird nur Testweise ein BeispielUser erzeugt und angezeigt
                // var testUser = ideaWatcher.model.User;
                // testUser.username = "HansWurst2000";
                // testUser.email = "hans.wurst@gmx.de";
                // testUser.isMailPublic = true;
                // testUser.surname = "Wurst";
                // testUser.firstName = "Hans";
                // testUser.gender = "Male";
                // testUser.language = "";
                //
                // var evTest = {
                //     topic: 'SProfileEdit/loadUserDataResponse',
                //     exObject: testUser
                // };
                // ideaWatcher.core.MessageBroker.publish(evTest);
            }
            else
            {
                htmlProfileView.style.display = 'none';
                htmlView.style.display = 'none';
            }
        }
        //endregion

        //region localizeView()
        function localizeView() {

            var language = ideaWatcher.core.Localizer.getLanguage();

            console.log("Starte Lokalisierung der ProfileEdit-View ...");

            htmlViewHeader.textContent =
                ideaWatcher.core.Localizer.ProfileEdit[language].profile;
            htmlUserNameLabel.textContent =
                ideaWatcher.core.Localizer.ProfileEdit[language].userName;
            htmlEmailLabel.textContent =
                ideaWatcher.core.Localizer.ProfileEdit[language].email;
            htmlEmailCheckLabel.textContent =
                ideaWatcher.core.Localizer.ProfileEdit[language].mail_public_available;
            htmlSurnameLabel.textContent =
                ideaWatcher.core.Localizer.ProfileEdit[language].surname;
            htmlFirstNameLabel.textContent =
                ideaWatcher.core.Localizer.ProfileEdit[language].firstName;
            htmlGenderLabel.textContent =
                ideaWatcher.core.Localizer.ProfileEdit[language].gender;
            htmlLanguageLabel.textContent =
                ideaWatcher.core.Localizer.ProfileEdit[language].language;
            htmlSubmitButton.setAttribute("value", ideaWatcher.core.Localizer
                    .ProfileEdit[language].submit);
            htmlBrowseImageButton.setAttribute("value", ideaWatcher.core.Localizer
                    .ProfileEdit[language].browse);

            console.log("Lokalisierung ProfileEditView abgeschlossen.");
        }
        //endregion

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {

        };


    })();