ideaWatcher.view.Signup = ideaWatcher.view.Signup || (function VSignup() {

    //region local vars
    // Event Globale Initialisierung
    var evIni = {
        topic: 'internal/ini',
        cbFunction: cbIni
    };

    var evLocalizeView = {
        topic: 'localizeView/signup',
        cbFunction: localizeView
    };

    var htmlFormSignup = null;
    var htmlUsernameInput = null;
    var htmlEmailInput = null;
    var htmlPasswordInput = null;
    var htmlPasswordRepeatInput = null;
    var htmlSubmitButton = null;
    var htmlPasswordRepeatErrorLabel = null;
    var htmlView = null;
    //endregion

    //region subscribe to events
    ideaWatcher.core.MessageBroker.subscribe(evIni);
    ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
    //endregion

    //region cbIni
    function cbIni()
    {
        console.log('Initialisiere UIConnector Signup');

        //region assign html elements
        htmlFormSignup = document.querySelector('.signup_form');
        htmlUsernameInput = document.querySelector('#signUp_userName_input');
        htmlEmailInput = document.querySelector('#signUp_mail_input');
        htmlPasswordInput = document.querySelector('#signUp_password_input');
        htmlPasswordRepeatInput = document.querySelector('#signUp_passwordRepeated_input');
        htmlSubmitButton = document.querySelector('#signUp_submit_button');
        htmlPasswordRepeatErrorLabel = document.querySelector('.signUp_passwordRepeatedError_label');
        // htmlVerificationLabel = document.querySelector('.js-login-desk-lbl-verificationError');
        htmlView = document.querySelector('.signUp_view');
        //endregion

        //region register Callbacks
        ideaWatcher.controller.Signup.registerShowView(cbShowView);
        //endregion

        // region override onSubmit to prevent page reload
        htmlFormSignup.onsubmit = function onSubmit(event) {

            event.preventDefault();
            
            if(!checkEqualPassword()) return;
            if(!checkValidPassword()) return;

            var exObj = {
                userName: htmlUsernameInput.value,
                password: htmlPasswordInput.value,
                email: htmlEmailInput.value
            };
            console.log(exObj);

            ideaWatcher.controller.Signup.tryToSignup(exObj);
        };

        htmlPasswordRepeatInput.disabled = true;
        

        htmlPasswordInput.addEventListener('change', checkValidPassword);
        htmlPasswordRepeatInput.addEventListener('change', checkEqualPassword);
        localizeView();
        
        // endregion
    }
    //endregion

    //region check if Passwords are equal
    function checkEqualPassword() {

        htmlPasswordRepeatErrorLabel.style.display = 'inline';

        var language = ideaWatcher.core.Localizer.getLanguage();
        if (htmlPasswordInput.value == htmlPasswordRepeatInput.value) {
        	console.log('Equal passwords.');
        	htmlPasswordRepeatErrorLabel.textContent = ideaWatcher.core.Localizer.signUp[language].passwordMatching;
        	htmlPasswordRepeatErrorLabel.style.color = 'black';
           return true;
        } else {
        	console.log('Not equal passwords.');
        	htmlPasswordRepeatErrorLabel.textContent = ideaWatcher.core.Localizer.signUp[language].passwordNotMatching;
            return false;
        }
    }
    //endregion

    //region check if Password is valid
    function checkValidPassword() {

        //TODO: dispolay prperty durch visibility austauschen, da das element nicht aus render Tree genommen werden soll
        var language = ideaWatcher.core.Localizer.getLanguage();
        var password = htmlPasswordInput.value;
        var htmlPasswordErrorLabel = document.querySelector('.signUp_passwordError_label');
        var isPasswordValid = true;
        var errorMessage;

        console.log(password);
        if (password.length < 8) {
            errorMessage = ideaWatcher.core.Localizer.signUp[language].passwordTooShort;
            isPasswordValid = false;
        } else if (password.search(/[a-z]/) < 0) {
            errorMessage = ideaWatcher.core.Localizer.signUp[language].passwordMissingLowercase;
            isPasswordValid = false;

        } else if (password.search(/[A-Z]/) < 0) {
            errorMessage = ideaWatcher.core.Localizer.signUp[language].passwordMissingUppercase;
            isPasswordValid = false;
        } else if (password.search(/[0-9]/) < 0) {
            errorMessage = ideaWatcher.core.Localizer.signUp[language].passwordMissingDigit;
            isPasswordValid = false;
        } else if (password.search(/[{}()#:;^,.?!|&_~@$%/\=+*"'-]/) < 0) {
            errorMessage = ideaWatcher.core.Localizer.signUp[language].passwordMissingSpecialCharacter;
            isPasswordValid = false;
        } else if (password.search(/[äüöß]/) > 0) {
            errorMessage = ideaWatcher.core.Localizer.signUp[language].passwordContainsInvalidCharacter;
            isPasswordValid = false;
        } else {
            console.log('Dass Passwort entspricht den Richtlinien.');
            htmlPasswordRepeatInput.disabled = false;
            htmlPasswordErrorLabel.style.display = 'none';
        }

        if (!isPasswordValid) {
            htmlPasswordErrorLabel.textContent = errorMessage;
            htmlPasswordErrorLabel.style.display = 'inline';
        }

        return isPasswordValid;
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

    //region localizeView
    function localizeView() {

        console.log("Starte Lokalisierung der SignUp-View ...");

        var language = ideaWatcher.core.Localizer.getLanguage();
        var htmlViewHeader = document.querySelector('.signUp_header');
        var htmlUserNameLabel = document.querySelector('#signUp_userName_label');
        var htmlMailLabel = document.querySelector('#signUp_mail_label');
        var htmlPasswordLabel = document.querySelector('#signUp_password_label');
        var htmlPasswordRepeatedLabel = document.querySelector('#signUp_passwordRepeated_label');

        htmlViewHeader.textContent = ideaWatcher.core.Localizer.signUp[language].header;
        htmlUserNameLabel.textContent = ideaWatcher.core.Localizer.signUp[language].userName;
        htmlMailLabel.textContent = ideaWatcher.core.Localizer.signUp[language].mail;
        htmlPasswordLabel.textContent = ideaWatcher.core.Localizer.signUp[language].password;
        htmlPasswordRepeatedLabel.textContent = ideaWatcher.core.Localizer.signUp[language].passwordRepeated;
        htmlSubmitButton.value = ideaWatcher.core.Localizer.signUp[language].submit;
    }
    //endregion

    return {

    };

})();