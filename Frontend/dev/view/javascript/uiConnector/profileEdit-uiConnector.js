ideaWatcher.view.ProfileEdit = ideaWatcher.view.ProfileEdit || (function () {

        //region local vars
        var htmlForm = null;
        var htmlView = null;
        var htmlUserMenuView = null;

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

        //region subscribe to events
        ideaWatcher.controller.ProfileEdit.registerShowView(cbShowView);
        ideaWatcher.controller.ProfileEdit.registerInitializeView(cbIni);
        ideaWatcher.controller.ProfileEdit.registerLocalizeView(cbLocalizeView);
        ideaWatcher.controller.ProfileEdit.registerSaveResponse(cbSaveResponse);
        ideaWatcher.controller.ProfileEdit.registerGetUserDataResponse(cbGetUserDataResponse);
        //endregion

        //region cbIni
        function cbIni()
        {
            console.log('Initialisiere UIConnector ProfileEdit');

            //region assign html elements
            htmlForm = document.querySelector('.profileEdit_form');
            htmlView = document.querySelector('.profileEdit_view');
            htmlUserMenuView = document.querySelector('.userMenu_view');
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
            cbLocalizeView();

        }
        //endregion

        //region showView
        function cbShowView(obj) {

            if (obj.shouldShow) {

                var currentUser = {

                    userId: ideaWatcher.controller.UserSession.getCurrentUserId()
                };
                ideaWatcher.controller.ProfileEdit.tryToLoadUserData(currentUser);

                cbLocalizeView();
                htmlUserMenuView.style.display = 'block';
                htmlView.style.display = 'block';

            } else {

                htmlUserMenuView.style.display = 'none';
                htmlView.style.display = 'none';
            }
        }
        //endregion

        //region localizeView()
        function cbLocalizeView() {

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

        //region cbSaveResponse
        function cbSaveResponse(response)
        {
            var language = ideaWatcher.core.Localizer.getLanguage();

            if (response.result == 'success'){
                ideaWatcher.controller.GlobalNotification.showNotification(
                    ideaWatcher.model.GlobalNotificationType.SUCCESS,
                    ideaWatcher.core.Localizer.ProfileEdit[language].profile,
                    ideaWatcher.core.Localizer.ProfileEdit[language].saveSuccess,
                    5000);
            }else {
                var errorMessage = response.error;

                var notificationType = ideaWatcher.model.GlobalNotificationType.ERROR;
                if (response.result == "warning") {
                    notificationType = ideaWatcher.model.GlobalNotificationType.WARNING;
                }
                if (response.result == "info") {
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
        function cbGetUserDataResponse(response)
        {
            if (response.result == 'success'){
                htmlUserNameInput.value = response.data.userName;
                htmlEmailInput.value = response.data.email;
                htmlEmailCheckInput.checked = response.data.isMailPublic;
                htmlSurnameInput.value = response.data.surname;
                htmlFirstNameInput.value = response.data.firstName;
                htmlGenderSelect.value = response.data.gender;
                htmlLanguageSelect.value = response.data.language;
            } else {
                var errorMessage = response.error;

                var notificationType = ideaWatcher.model.GlobalNotificationType.ERROR;
                if (response.result == "warning") {
                    notificationType = ideaWatcher.model.GlobalNotificationType.WARNING;
                }
                if (response.result == "info") {
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

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {

        };


    })();