ideaWatcher.view.Login = ideaWatcher.view.Login || (function VLogin() {

        //region local vars
        // Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbIni
        };

        var evLoginResponse = {
            topic: 'SLogin/validateRequest-response',
            cbFunction: cbLoginResponse
        };
        
        var evLocalizeView = {
                topic: 'localizeView/login',
                cbFunction: localizeView
            };

        var htmlFormLogin = null;
        var htmlUsernameInput = null;
        var htmlPasswordInput = null;
        var htmlSubmitButton = null;
        // var htmlVerificationLabel = null;
        var htmlView = null;
        var textLogin = {
            fail: 'Benutzername oder Passwort falsch',
            duplicate: 'Sie sind bereits angemeldet, bitte zunächst abmelden'
        };
        //endregion

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evLoginResponse);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        //endregion

        //region cbIni
        function cbIni()
        {
            console.log('Initialisiere UIConnector Login');

            //region assign html elements
            htmlFormLogin = document.querySelector('.login_form');
            htmlUsernameInput = document.querySelector('.login_userName_input');
            htmlPasswordInput = document.querySelector('.login_password_input');
            htmlSubmitButton = document.querySelector('.login_submit_button');
            // htmlVerificationLabel = document.querySelector('.js-login-desk-lbl-verificationError');
            htmlView = document.querySelector('.login_view');
            //endregion

            //region register Callbacks
            // wam.logic.Login.registerVerificationError(cbShowVerificationError);
            ideaWatcher.controller.Login.registerShowView(cbShowView);
            //endregion

            // region override onSubmit to prevent page reload
            htmlFormLogin.onsubmit = function onSubmit(event) {
                event.preventDefault();

                var filterObject = ideaWatcher.model.IdeaListFilter;
                filterObject.listType = 'hot';
                filterObject.fromRank = 1;
                filterObject.toRank = 10;

                var exGetIdeasRequest = ideaWatcher.model.Request;

                exGetIdeasRequest.destination = 'SIdeaList/getIdeasRequest';
                exGetIdeasRequest.data = filterObject;

                ideaWatcher.core.WebSocketConnector.sendRequest(exGetIdeasRequest);


                var exObj = {
                    userName: htmlUsernameInput.value,
                    password: htmlPasswordInput.value
                };
                console.log(exObj);

                ideaWatcher.controller.Login.tryToLogin(exObj);
            };
            // endregion
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

        //region cbSaveResponse
        function cbLoginResponse(exObj)
        {
            if (exObj.result === 'valid') {
                console.log('Der Login-Versuch war erfolgreich.');
                //TODO: Wechsel in eine vordefinierte View fehlt noch
            }
            else if (exObj.result === 'notvalid') {
                var language = ideaWatcher.core.Localizer.getLanguage();
                if (exObj.error === 'SLogin_getUser_error') {
                    console.log('Der Login-Versuch war leider nicht erfolgreich.');
                    ideaWatcher.controller.GlobalNotification.showNotification(
                        ideaWatcher.model.GlobalNotificationType.ERROR,
                        ideaWatcher.core.Localizer.Login[language]
                            .header,
                        ideaWatcher.core.Localizer.Login[language]
                            .SLogin_getUser_error, 5000);
                }
                else if (exObj.error === 'SLogin_password_not_valid') {
                    console.log('Der Login-Versuch war leider nicht erfolgreich.');
                    ideaWatcher.controller.GlobalNotification.showNotification(
                        ideaWatcher.model.GlobalNotificationType.ERROR,
                        ideaWatcher.core.Localizer.Login[language]
                            .header,
                        ideaWatcher.core.Localizer.Login[language]
                            .SLogin_password_not_valid, 5000);
                }
            } else {
                console.log('Das Ergebnis ist des Login-Versuchs ist' +
                    ' unbekannt.')
                ideaWatcher.controller.GlobalNotification.showNotification(
                    ideaWatcher.model.GlobalNotificationType.ERROR,
                    ideaWatcher.core.Localizer.Login[language]
                        .header,
                    ideaWatcher.core.Localizer.Login[language]
                        .SLogin_unknown_error, 5000);
            }
        }
        //endregion

        
        function localizeView() {

            console.log("Starte Lokalisierung der Login-View ...");

            var language = ideaWatcher.core.Localizer.getLanguage();
            var htmlUserNameLabel = document.querySelector('#login_userName_label');
            var htmlHeader = document.querySelector('#login_header_h1');
            var htmlPasswordLabel = document.querySelector('#login_password_label');
            var htmlForgotPasswordButton = document.querySelector('.login_forgotPassword_button');
            
            htmlUsernameInput.placeholder = ideaWatcher.core.Localizer.Login[language].userName;
            htmlPasswordInput.placeholder = ideaWatcher.core.Localizer.Login[language].password;
            
            htmlHeader.textContent = ideaWatcher.core.Localizer.Login[language].header;
            htmlUserNameLabel.textContent = ideaWatcher.core.Localizer.Login[language].userName;
            htmlPasswordLabel.textContent = ideaWatcher.core.Localizer.Login[language].password;
            htmlSubmitButton.value = ideaWatcher.core.Localizer.Login[language].submit;
            htmlForgotPasswordButton.textContent = ideaWatcher.core.Localizer.Login[language].forgotPassword;
            
        }
        return {

        };

    })();