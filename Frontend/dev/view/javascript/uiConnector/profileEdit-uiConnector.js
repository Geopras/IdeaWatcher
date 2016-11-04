ideaWatcher.view.ProfileEdit = ideaWatcher.view.ProfileEdit || (function VProfileEdit() {

        //region local vars
        // Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbIni
        };

        var htmlFormProfileEdit = null;
        var htmlView = null;

        //region lade zu internationalisierende HTML-Elemente
        var htmlViewHeader = null;
        var htmlUserNameLabel = null;
        var htmlEmailLabel = null;
        var htmlEmailCheckLabel = null;
        var htmlSurnameLabel = null;
        var htmlFirstNameLabel = null;
        var htmlGenderLabel = null;
        var htmlCountryLabel = null;
        var htmlSubmitButton = null;
        var htmlBrowseImageButton = null;

        //endregion

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        //endregion

        //region cbIni
        function cbIni()
        {
            console.log('Initialisiere UIConnector ProfileEdit');

            //region assign html elements
            htmlFormProfileEdit = document.querySelector('.profileEdit_form');
            htmlView = document.querySelector('.profileEdit_view');
            htmlViewHeader = document.getElementById('profileEdit_header');
            htmlUserNameLabel = document.getElementById('userNameInput_label');
            htmlEmailLabel = document.getElementById('emailInput_label');
            htmlEmailCheckLabel = document.getElementById('profileEdit_emailCheckbox_label');
            htmlSurnameLabel = document.getElementById("profileEdit_surnameInput_label");
            htmlFirstNameLabel = document.getElementById("profileEdit_firstNameInput_label");
            htmlGenderLabel = document.getElementById("profileEdit_genderSelect_label");
            htmlCountryLabel = document.getElementById("profileEdit_countrySelect_label");
            htmlSubmitButton = document.getElementById("profileEdit_submit_button");
            htmlBrowseImageButton = document.getElementById("profileEdit_browseImage_button");
            //endregion

            //region register Callbacks
            // wam.logic.Login.registerVerificationError(cbShowVerificationError);
            ideaWatcher.controller.ProfileEdit.registerShowView(cbShowView);
            //endregion

            // region override onSubmit to prevent page reload
            htmlFormProfileEdit.onsubmit = function onSubmit(event) {
                event.preventDefault();
            };
            // endregion

            // lokalisiere die View anhand der global definierten Sprache
            localizeView();

        }
        //endregion

        //region showView
        function cbShowView(obj)
        {
            if(obj.shouldShow)
            {
                localizeView();
                htmlView.style.display = 'block';
            }
            else
            {
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
            htmlCountryLabel.textContent =
                ideaWatcher.core.Localizer.ProfileEdit[language].country;
            htmlSubmitButton.setAttribute("value", ideaWatcher.core.Localizer
                    .ProfileEdit[language].submit);
            htmlBrowseImageButton.setAttribute("value", ideaWatcher.core.Localizer
                    .ProfileEdit[language].browse);

            console.log("Lokalisierung ProfileEditView abgeschlossen.")
        }

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {

        };
        //endregion

    })();