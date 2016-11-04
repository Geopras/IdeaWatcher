ideaWatcher.view.Login = ideaWatcher.view.Login || (function VLogin() {

    //region local vars
    // Event Globale Initialisierung
    var evIni = {
        topic: 'internal/ini',
        cbFunction: cbIni
    };

    var htmlView = null;
    var htmlForm = null;
    var htmlHeader = null;
    var htmlUsernameInput = null;
    var htmlUsernameInputLabel = null;
    var htmlPasswordInput = null;
    var htmlPasswordInputLabel = null;
    var htmlSubmitButton = null;
    var htmlForgotPasswordButton = null;

    var textLogin = {
        fail: 'Benutzername oder Passwort falsch',
        duplicate: 'Sie sind bereits angemeldet, bitte zunächst abmelden'
    };
    //endregion

    //region subscribe to events
    ideaWatcher.core.MessageBroker.subscribe(evIni);
    //endregion

    //region cbIni
    function cbIni()
    {
        console.log('Initialisiere UIConnector Login');

        //region assign html elements
        htmlView = document.querySelector('.login_view');
        htmlForm = document.querySelector('.login_form');
        htmlHeader = document.getElementById('login_header');
        htmlUsernameInput = document.querySelector('.login_userName_input');
        htmlUsernameInputLabel = document.querySelector('login_userNameInput_label');
        htmlPasswordInput = document.querySelector('.login_password_input');
        htmlPasswordInputLabel = document.querySelector('profileEdit_password_label');
        htmlSubmitButton = document.querySelector('.login_submit_button');
        htmlForgotPasswordButton = document.querySelector('.login_forgotPassword_button');
        //endregion

        //region register Callbacks
        // wam.logic.Login.registerVerificationError(cbShowVerificationError);
        ideaWatcher.controller.Login.registerShowView(cbShowView);
        //endregion

        // region override onSubmit to prevent page reload
        htmlForm.onsubmit = function onSubmit(event) {
            event.preventDefault();
        };
        // endregion

        //region LoginButton: Eventlistener(click)
        htmlSubmitButton.addEventListener('click', function clickLogin() {

            var exObj = {
                userName: htmlUsernameInput.value,
                password: htmlPasswordInput.value
            };
            console.log(exObj);

            ideaWatcher.controller.Login.tryToLogin(exObj);
        });
        //endregion
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

        console.log("Starte Lokalisierung der Login-View ...");

        htmlHeader.textContent =
            ideaWatcher.core.Localizer.login[language].header;
        htmlUsernameInputLabel.textContent =
            ideaWatcher.core.Localizer.login[language].userName;
        htmlPasswordInputLabel.textContent =
            ideaWatcher.core.Localizer.login[language].password;
        htmlSubmitButton.setAttribute("value", ideaWatcher.core.Localizer
            .login[language].submit);
        htmlForgotPasswordButton.setAttribute("value", ideaWatcher.core.Localizer
            .login[language].browse);

        console.log("Lokalisierung Login-View abgeschlossen.")
    }

    // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
    return {

    };
    //endregion

})();