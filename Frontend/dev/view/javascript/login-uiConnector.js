ideaWatcher.view.Login = ideaWatcher.view.Login || (function VLogin() {

    //region local vars
    // Event Globale Initialisierung
    var evIni = {
        topic: 'internal/ini',
        cbFunction: cbIni
    };

    var htmlFormLogin = null;
    var htmlTxtUsername = null;
    var htmlTxtPassword = null;
    var htmlBtnLogin = null;
    // var htmlVerificationLabel = null;
    var htmlView = null;
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
        htmlFormLogin = document.querySelector('.js-Login-form-login');
        htmlTxtUsername = document.querySelector('.js-login-txt-username');
        htmlTxtPassword = document.querySelector('.js-login-txt-password');
        htmlBtnLogin = document.querySelector('.js-login-btn-login');
        // htmlVerificationLabel = document.querySelector('.js-login-desk-lbl-verificationError');
        htmlView = document.querySelector('.v-login-view');
        //endregion

        //region register Callbacks
        // wam.logic.Login.registerVerificationError(cbShowVerificationError);
        ideaWatcher.controller.Login.registerShowView(cbShowView);
        //endregion

        // region override onSubmit to prevent page reload
        htmlFormLogin.onsubmit = function onSubmit(event) {
            event.preventDefault();
        };
        // endregion

        //region LoginButton: Eventlistener(click)
        htmlBtnLogin.addEventListener('click', function clickLogin() {

            var exObj = {
                userName: htmlTxtUsername.value,
                password: htmlTxtPassword.value
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
            htmlView.style.display = 'block';
        }
        else
        {
            htmlView.style.display = 'none';
        }
    }
    //endregion


    return {

    };

})();