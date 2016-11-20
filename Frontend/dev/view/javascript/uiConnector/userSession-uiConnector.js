ideaWatcher.view.UserSession = ideaWatcher.view.UserSession || (function VLogin() {

        //region local vars
        var isLoginSuccessful = false;
        //TODO: userId-Abfrage-Schnittstelle im login-controller einbauen
        var userId;

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

        //region Registrierung der eigenen Callbacks am Controller
        ideaWatcher.controller.UserSession.registerInitializeView(cbIni);
        ideaWatcher.controller.UserSession.registerLocalizeView(cbLocalizeView);
        ideaWatcher.controller.UserSession.registerShowView(cbShowView);
        ideaWatcher.controller.UserSession.registerLoginResponse(cbLoginResponse);
        ideaWatcher.controller.UserSession.registerLogoutResponse(cbLogoutResponse);
        //endregion

        //region cbIni
        function cbIni()
        {
            console.log('Initialisiere UIConnector UserSession');

            //region assign html elements
            htmlFormLogin = document.querySelector('.login_form');
            htmlUsernameInput = document.querySelector('.login_userName_input');
            htmlPasswordInput = document.querySelector('.login_password_input');
            htmlSubmitButton = document.querySelector('.login_submit_button');
            // htmlVerificationLabel = document.querySelector('.js-login-desk-lbl-verificationError');
            htmlView = document.querySelector('.login_view');
            //endregion

            //region register Callbacks
            // wam.logic.UserSession.registerVerificationError(cbShowVerificationError);
            ideaWatcher.controller.UserSession.registerShowView(cbShowView);
            //endregion

            // region override onSubmit to prevent page reload
            htmlFormLogin.onsubmit = function onSubmit(event) {
                event.preventDefault();

                var exObj = {
                    userName: htmlUsernameInput.value,
                    password: htmlPasswordInput.value
                };
                console.log(exObj);

                ideaWatcher.controller.UserSession.tryToLogin(exObj);
            };
            // endregion
        }
        //endregion

        //region showView
        function cbShowView(obj)
        {
            if(obj.shouldShow)
            {
            	cbLocalizeView();
                htmlView.style.display = 'block';
            }
            else
            {
                htmlView.style.display = 'none';
            }
        }
        //endregion

        function cbLocalizeView() {

            console.log("Starte Lokalisierung der UserSession-View ...");

            var language = ideaWatcher.core.Localizer.getLanguage();
            var htmlUserNameLabel = document.querySelector('#login_userName_label');
            var htmlHeader = document.querySelector('#login_header_h1');
            var htmlPasswordLabel = document.querySelector('#login_password_label');
            var htmlForgotPasswordButton = document.querySelector('.login_forgotPassword_button');

            htmlUsernameInput.placeholder = ideaWatcher.core.Localizer.UserSession[language].userName;
            htmlPasswordInput.placeholder = ideaWatcher.core.Localizer.UserSession[language].password;

            htmlHeader.textContent = ideaWatcher.core.Localizer.UserSession[language].headerLogin;
            htmlUserNameLabel.textContent = ideaWatcher.core.Localizer.UserSession[language].userName;
            htmlPasswordLabel.textContent = ideaWatcher.core.Localizer.UserSession[language].password;
            htmlSubmitButton.value = ideaWatcher.core.Localizer.UserSession[language].submit;
            htmlForgotPasswordButton.textContent = ideaWatcher.core.Localizer.UserSession[language].forgotPassword;

        }

        //region cbSaveResponse
        function cbLoginResponse(response)
        {
            var language = ideaWatcher.core.Localizer.getLanguage();
            if (response.result === 'valid') {
                console.log('Der Login-Versuch war erfolgreich.');

                ideaWatcher.controller.UserSession.publishLoginSuccessful();

                // ersten 10 Ideen der Hot-Ideenliste anzeigen
                var listType = ideaWatcher.model.IdeaList.ListType.HOT;

                ideaWatcher.controller.IdeaList.updateIdeaList(listType, '', 1, 10, true);

            }
            else if (response.result === 'notvalid') {

                if (response.error === 'SLogin_getUser_error') {
                    console.log('Der Login-Versuch war leider nicht erfolgreich.');
                    ideaWatcher.controller.GlobalNotification.showNotification(
                        ideaWatcher.model.GlobalNotificationType.ERROR,
                        ideaWatcher.core.Localizer.UserSession[language]
                            .headerLogin,
                        ideaWatcher.core.Localizer.UserSession[language]
                            .SLogin_getUser_error, 5000);
                }
                else if (response.error === 'SLogin_password_not_valid') {

                    console.log('Der Login-Versuch war leider nicht erfolgreich.');
                    ideaWatcher.controller.GlobalNotification.showNotification(
                        ideaWatcher.model.GlobalNotificationType.ERROR,
                        ideaWatcher.core.Localizer.UserSession[language]
                            .headerLogin,
                        ideaWatcher.core.Localizer.UserSession[language]
                            .SLogin_password_not_valid, 5000);
                }
            } else {

                console.log('Das Ergebnis des Login-Versuchs ist' +
                    ' unbekannt.');
                ideaWatcher.controller.GlobalNotification.showNotification(
                    ideaWatcher.model.GlobalNotificationType.ERROR,
                    ideaWatcher.core.Localizer.UserSession[language]
                        .headerLogin,
                    ideaWatcher.core.Localizer.UserSession[language]
                        .SLogin_unknown_error, 5000);
            }
        }
        //endregion

        function cbLogoutResponse(response) {

            var result = response.result;
            var language = ideaWatcher.core.Localizer.getLanguage();

            if (result === 'success') {
                ideaWatcher.controller.UserSession.publishLogoutSuccessful();
            } else {
                console.log('Der Logout-Versuch war leider nicht erfolgreich.');
                ideaWatcher.controller.GlobalNotification.showNotification(
                    ideaWatcher.model.GlobalNotificationType.ERROR,
                    ideaWatcher.core.Localizer.UserSession[language]
                        .headerLogout,
                    ideaWatcher.core.Localizer.UserSession[language]
                        .SLogin_deleteToken_error, 5000);
            }
        }

        return {

        };

    })();