ideaWatcher.view.Signup = ideaWatcher.view.Signup || (function () {

    //region local vars
    // Event Globale Initialisierung
    var evIni = {
        topic: 'internal/ini',
        cbFunction: cbIni
    };

    var htmlFormSignup = null;
    var htmlUsernameInput = null;
    var htmlEmailInput = null;
    var htmlPasswordInput = null;
    var htmlPasswordRepeatInput = null;
    var htmlSubmitButton = null;
    var htmlView = null;
    var textSignup = {
        userExists: 'Benutzername bereits vergeben.',
        passwortNotMatching: 'Die Passwörter stimmen nicht überein.',
        passwortTooShort: 'Das Passwort .',
        	passwortTooShort: 'Das Passwort .',
        		passwortTooShort: 'Das Passwort .'
    };
    //endregion

    //region subscribe to events
    ideaWatcher.core.MessageBroker.subscribe(evIni);
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
        
        // htmlVerificationLabel = document.querySelector('.js-login-desk-lbl-verificationError');
        htmlView = document.querySelector('.signUp_view');
        //endregion

        //region register Callbacks
        // wam.logic.Login.registerVerificationError(cbShowVerificationError);
        ideaWatcher.controller.Signup.registerShowView(cbShowView);
        //endregion

        // region override onSubmit to prevent page reload
        htmlFormSignup.onsubmit = function onSubmit(event) {
            event.preventDefault();
        };
        
        htmlPasswordInput.addEventListener('change', checkValidPassword);
        htmlPasswordRepeatInput.addEventListener('change', checkEqualPassword);
        // endregion

        //region LoginButton: Eventlistener(click)
        htmlSubmitButton.addEventListener('click', function clickSignUp() {

            var exObj = ideaWatcher.model.SignupRequest;
            exObj.data = {
                userName: htmlUsernameInput.value,
                password: htmlPasswordInput.value,
                email: htmlEmailInput.value
            };
            console.log(exObj);

            ideaWatcher.controller.Signup.tryToSignup(exObj);
        });
        //endregion
    }
    //endregion

    function checkEqualPassword() {
    	if (htmlPasswordInput.value == htmlPasswordRepeatInput.value)
    		{
    		console.log('Passwörter stimmen überein.');
    		}
    		
    }
    
    function checkValidPassword() {
    	

    	var regex = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}');
    	console.log(htmlPasswordInput.value);
    	if (regex.test(htmlPasswordInput.value))
    		{
    		console.log('Dass Passwort entspricht den Richtlinien.');
    		}
    	else
    		{
    		console.log('Dass Passwort entspricht nicht den Richtlinien.');
    		}
    	
//    	if (htmlPasswordInput.value.length < 8)
//    		{
//    		console.log('Passwort ist zu kurz.');
//    		}
//    	else
//    		{
//    		console.log('Passwort ist scheinbar lang genug.');
//    		}
    }
    
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