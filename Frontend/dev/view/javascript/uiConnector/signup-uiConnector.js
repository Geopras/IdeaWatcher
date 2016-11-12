ideaWatcher.view.Signup = ideaWatcher.view.Signup
		|| (function() {

			// region local vars
			// Event Globale Initialisierung
			var evIni = {
				topic : 'internal/ini',
				cbFunction : cbIni
			};

			var htmlFormSignup = null;
			var htmlUsernameInput = null;
			var htmlEmailInput = null;
			var htmlPasswordInput = null;
			var htmlPasswordRepeatInput = null;
			var htmlSubmitButton = null;
			var htmlView = null;
			var textSignup = {
				userExists : 'Benutzername bereits vergeben.',
				passwortNotMatching : 'Die Passwörter stimmen nicht überein.',
				passwortTooShort : 'Das Passwort ist zu kurz.',
				passwortMissingUppercase : 'Das Passwort muss mindestens einen Großbuchstaben enthalten.',
				passwortMissingLowercase : 'Das Passwort muss mindestens einen Kleinbuchstaben enthalten.',
				passwortMissingDigit : 'Das Passwort muss mindestens eine Ziffer enthalten.',
				passwortMissingSpecialCharacter : 'Das Passwort muss mindestens ein Sonderzeichen enthalten.'
			};
			// endregion

			// region subscribe to events
			ideaWatcher.core.MessageBroker.subscribe(evIni);
			// endregion

			// region cbIni
			function cbIni() {
				console.log('Initialisiere UIConnector Signup');

				// region assign html elements
				htmlFormSignup = document.querySelector('.signup_form');
				htmlUsernameInput = document
						.querySelector('#signUp_userName_input');
				htmlEmailInput = document.querySelector('#signUp_mail_input');
				htmlPasswordInput = document
						.querySelector('#signUp_password_input');
				htmlPasswordRepeatInput = document
						.querySelector('#signUp_passwordRepeated_input');
				htmlSubmitButton = document
						.querySelector('#signUp_submit_button');

				// htmlVerificationLabel =
				// document.querySelector('.js-login-desk-lbl-verificationError');
				htmlView = document.querySelector('.signUp_view');
				// endregion

				// region register Callbacks
				// wam.logic.Login.registerVerificationError(cbShowVerificationError);
				ideaWatcher.controller.Signup.registerShowView(cbShowView);
				// endregion

				// region override onSubmit to prevent page reload
				htmlFormSignup.onsubmit = function onSubmit(event) {
					event.preventDefault();
				};

				htmlPasswordInput
						.addEventListener('change', checkValidPassword);
				htmlPasswordRepeatInput.addEventListener('change',
						checkEqualPassword);
				// endregion

				// region LoginButton: Eventlistener(click)
				htmlSubmitButton.addEventListener('click',
						function clickSignUp() {

							var exObj = ideaWatcher.model.SignupRequest;
							exObj.data = {
								userName : htmlUsernameInput.value,
								password : htmlPasswordInput.value,
								email : htmlEmailInput.value
							};
							console.log(exObj);

							ideaWatcher.controller.Signup.tryToSignup(exObj);
						});
				// endregion
			}
			// endregion

			function checkEqualPassword() {
				if (htmlPasswordInput.value == htmlPasswordRepeatInput.value) {
					console.log('Passwörter stimmen überein.');
				}

			}

			function checkValidPassword() {

				var password = htmlPasswordInput.value;
				console.log(password);
				if (password.length < 8) {
					console.log("Your password must be at least 8 characters");
				} else if (password.search(/[a-z]/) < 0) {
					console
							.log("Your password must contain at least one lowercase letter.");
				} else if (password.search(/[A-Z]/) < 0) {
					console
							.log("Your password must contain at least one uppercase letter.");
				} else if (password.search(/[0-9]/) < 0) {
					console
							.log("Your password must contain at least one digit.");
				} else if (password.search(/[{}()#:;^,.?!|&_~@$%/\=+*"'-]/) < 0) {
					console
							.log("Your password must contain at least one of those special digits: {}()#:;^,.?!|&_~@$%/\=+*\"'-");
				} else if (password.search(/[äüöß]/) > 0) {
					console
							.log("Your password cannot contain those characters: äöüß");
				} else {
					console.log('Dass Passwort entspricht den Richtlinien.');
					return true;
				}
			}

			// region showView
			function cbShowView(obj) {
				if (obj.shouldShow) {
					htmlView.style.display = 'block';
				} else {
					htmlView.style.display = 'none';
				}
			}
			// endregion

			// region showView
			function cbShowView(obj) {
				if (obj.shouldShow) {
					htmlView.style.display = 'block';
				} else {
					htmlView.style.display = 'none';
				}
			}
			// endregion

			return {

			};

		})();