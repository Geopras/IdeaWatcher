// Localization für View signUp

// Bitte alphabetisch ordnen!!

ideaWatcher.core.Localizer.signUp = {
    en_GB: {
        header: "Sign Up",
        mail: "Email",
        password: "Password",
        passwordContainsInvalidCharacter: "Your password cannot contain those characters: äöüß",
        passwordMatching : 'The passwords are matching.',
        passwordMissingDigit : 'Das password should contain at least one digit.',
		passwordMissingLowercase : 'The password should contain at least one lowercase letter.',
		passwordMissingSpecialCharacter : 'The password should contain at least one of the following characters: {}()#:;^,.?!|&_~@$%/\=+*"\'-.',
		passwordMissingUppercase : 'The password should contain at least one uppercase letter.',
		passwordNotMatching : 'The passwords are not matching.',
        passwordRepeated: "Password repeated",
        passwordTooShort : 'The password has to be at least 8 characters long.',
        registration : 'Registration',
        signup_ERROR: {
            SSignup_addUser_error: "An error occuring while adding the user to the database. Please contact the WebApi administrator.",
            SSignup_existsUser_error: "The database query for your sign-up has failed. Please contact the WebApi administrator.",
            SSignup_username_already_exists: "Sign-up has failed because this username already exists."
        },
        signup_SUCCESS: 'Registration successful.',
        submit: "Register Now!",
        userExists : 'This username is already taken.',
        userName: "Username"
    },
    de_DE: {
        header: "Registrierung",
        mail: "E-Mail",
        password: "Passwort",
        passwordContainsInvalidCharacter: "Das Passwort darf keines dieser Zeichen enthalten: äöüß",
        passwordMatching : 'Die Passwörter stimmen überein.',
        passwordMissingDigit : 'Das Passwort muss mindestens eine Ziffer enthalten.',
		passwordMissingLowercase : 'Das Passwort muss mindestens einen Kleinbuchstaben enthalten.',
		passwordMissingSpecialCharacter : 'Das Passwort muss mindestens ein Sonderzeichen enthalten.',
		passwordMissingUppercase : 'Das Passwort muss mindestens einen Großbuchstaben enthalten.',
		passwordNotMatching : 'Die Passwörter stimmen nicht überein.',
		passwordRepeated: "Passwort wiederholen",
		passwordTooShort : 'Das Passwort muss mindestens 8 Zeichen lang sein.',
        registration : 'Registrierung',
        signup_ERROR: {
            SSignup_addUser_error: "Die Registrierung ist bei der Datenbankoperation \"Hinzufügen eines neuen Benutzers\" fehlgeschlagen. Bitte wenden Sie sich an den WebApi-Administrator.",
            SSignup_existsUser_error: "Die Registrierung ist bei der Datenbankabfrage, ob der Benutzer bereits existiert, fehlgeschlagen. Bitte wenden Sie sich an den WebApi-Administrator.",
            SSignup_username_already_exists: "Die Registrierung ist nicht möglich, da der Benutzername bereits existiert."
        },
        signup_SUCCESS: 'Registrierung erfolgreich durchgeführt!',
		submit: "Registriere Mich!",
		userExists : 'Benutzername bereits vergeben.',
		userName: "Benutzername"
    }
};