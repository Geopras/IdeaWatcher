ideaWatcher.view.ProfileEdit = ideaWatcher.view.ProfileEdit || (function VProfileEdit() {

        //region local vars
        // Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbIni
        };

        var htmlFormProfileEdit = null;
        var htmlView = null;

        //endregion

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        //endregion

        //region cbIni
        function cbIni()
        {
            console.log('Initialisiere UIConnector ProfileEdit');

            //region assign html elements
            htmlFormProfileEdit = document.querySelector('.js-profileEdit-form-profile');
            htmlView = document.querySelector('.v-profileEdit-view');
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

        }
        //endregion

        //region showView
        function cbShowView(obj)
        {
            if(obj.shouldShow)
            {
                htmlView.style.display = 'block';
            }
            else
            {
                htmlView.style.display = 'none';
            }
        }
        //endregion

        function pubLocalizeView(i18n) {

            console.log("Starte Lokalisierung der ProfileEdit-View ...");


            document.getElementById("profEdit_profile_header").textContent = i18n.profile;
            document.getElementById("profEdit_uname_label").textContent = i18n.username;
            document.getElementById("profEdit_email_label").textContent = i18n.email;
            document.getElementById("profEdit_mail-public_label").textContent = i18n.mail_public_available;
            document.getElementById("profEdit_surname_label").textContent = i18n.surname;
            document.getElementById("profEdit_firstname_label").textContent = i18n.firstname;
            document.getElementById("profEdit_gender_label").textContent = i18n.gender;
            document.getElementById("profEdit_country_label").textContent = i18n.country;

            document.getElementById("profEdit_submit_button").setAttribute("value", i18n.submit);
            document.getElementById("profileEdit-browseImageButton").setAttribute("value", i18n.browse);


            console.log("Lokalisierung ProfileEditView abgeschlossen.")
        }

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {

            localizeView: pubLocalizeView,
        };

    })();