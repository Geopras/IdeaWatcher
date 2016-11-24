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
        ideaWatcher.controller.ProfileEdit.registerShowView(cbShowView);
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

        var htmlMaleOption = null;
        var htmlFemaleOption = null;
        var htmlGermanOption = null;
        var htmlEnglishOption = null;

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
            htmlMaleOption = document.getElementById("profileEdit_gender_male");
            htmlFemaleOption = document.getElementById("profileEdit_gender_female");
            htmlGermanOption = document.getElementById("profileEdit_language_de");
            htmlEnglishOption = document.getElementById("profileEdit_language_en");
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

                var exObj = Object.create(ideaWatcher.model.User);
                exObj.userId = ideaWatcher.controller.UserSession.getCurrentUserId();
                exObj.username = htmlUserNameInput.value;
                exObj.email = htmlEmailInput.value;
                exObj.isMailPublic = htmlEmailCheckInput.checked;
                exObj.surname = htmlSurnameInput.value;
                exObj.firstName = htmlFirstNameInput.value;
                exObj.gender = htmlGenderSelect.value;
                exObj.language = htmlLanguageSelect.value;

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
                    ideaWatcher.model.GlobalNotificationType.SUCCESS,
                    ideaWatcher.core.Localizer.ProfileEdit[language].profile,
                    ideaWatcher.core.Localizer.ProfileEdit[language].saveSuccess,
                    5000);
            }else {
                var errorMessage = exObj.error;

                var notificationType = ideaWatcher.model.GlobalNotificationType.ERROR;
                if (exObj.result == "warning") {
                    notificationType = ideaWatcher.model.GlobalNotificationType.WARNING;
                }
                if (exObj.result == "info") {
                    notificationType = ideaWatcher.model.GlobalNotificationType.INFO;
                }

                ideaWatcher.controller.GlobalNotification
                    .showNotification(
                        notificationType,
                    ideaWatcher.core.Localizer.ProfileEdit[language].profile,
                    ideaWatcher.core.Localizer.ProfileEdit[language].errorMessage[errorMessage],
                    5000);
            }
        }
        //endregion

        //region cbUserDataReceived
        // Zeige die Benutzerdaten in den Input-Feldern an, wenn sie erhalten wurden
        function cbUserDataReceived(exObj)
        {
            if (exObj.result == 'success'){
                htmlUserNameInput.value = exObj.data.userName;
                htmlEmailInput.value = exObj.data.email;
                htmlEmailCheckInput.checked = exObj.data.isMailPublic;
                htmlSurnameInput.value = exObj.data.surname;
                htmlFirstNameInput.value = exObj.data.firstName;
                htmlGenderSelect.value = exObj.data.gender;
                htmlLanguageSelect.value = exObj.data.language;
            } else {
                var errorMessage = exObj.error;

                var notificationType = ideaWatcher.model.GlobalNotificationType.ERROR;
                if (exObj.result == "warning") {
                    notificationType = ideaWatcher.model.GlobalNotificationType.WARNING;
                }
                if (exObj.result == "info") {
                    notificationType = ideaWatcher.model.GlobalNotificationType.INFO;
                }

                ideaWatcher.controller.GlobalNotification
                    .showNotification(
                        notificationType,
                        ideaWatcher.core.Localizer.ProfileEdit[language].profile,
                        ideaWatcher.core.Localizer.ProfileEdit[language].errorMessage[errorMessage],
                        5000);
            }
        }
        //endregion

        //region showView
        function cbShowView(obj)
        {
            if(obj.shouldShow)
            {
                var currentUser = {
                    userId: ideaWatcher.controller.UserSession.getCurrentUserId()
                };
                ideaWatcher.controller.ProfileEdit.tryToLoadUserData(currentUser);

                localizeView();
                htmlProfileView.style.display = 'block';
                htmlView.style.display = 'block';

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
            htmlFemaleOption.textContent =
                ideaWatcher.core.Localizer.ProfileEdit[language].female;
            htmlMaleOption.textContent =
                ideaWatcher.core.Localizer.ProfileEdit[language].male;
            htmlGermanOption.textContent =
                ideaWatcher.core.Localizer.ProfileEdit[language].de_DE;
            htmlEnglishOption.textContent =
                ideaWatcher.core.Localizer.ProfileEdit[language].en_GB;

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