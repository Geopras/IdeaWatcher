ideaWatcher.core.Localizer = ideaWatcher.core.Localizer || (function CLocalizer() {

        var i18n = null;

        var en_GB = '{"username":"Username",' +
            '"email":"Email",' +
            '"mail_public_available":"allow people to contact me (Email address is public)",' +
            '"surname":"Surname",' +
            '"firstname":"First Name",' +
            '"gender":"Gender",' +
            '"country":"Country",' +
            '"submit":"Submit",' +
            '"profile":"Profile",' +
            '"browse":"Browse ..."' +
            '}';

        var de_DE = '{"username":"Benutzername",' +
            '"email":"E-Mail",' +
            '"mail_public_available":"Erlaube anderen mich zu kontaktieren (E-Mail Adresse ist öffentlich)",' +
            '"surname":"Nachname",' +
            '"firstname":"Vorname",' +
            '"gender":"Geschlecht",' +
            '"country":"Land",' +
            '"submit":"Absenden",' +
            '"profile":"Profil",' +
            '"browse":"Durchsuchen ..."' +
            '}';

        function pubLocalizeViews(lang){

            console.log("Starte Lokalisierung der Views ...");

            switch(lang) {
                case "en_GB":
                    i18n = JSON.parse(en_GB);
                    break;
                case "de_DE":
                    i18n = JSON.parse(de_DE);
                    break;
                default:
                    i18n = JSON.parse(en_GB);
            }

            ideaWatcher.view.ProfileEdit.localizeView(i18n);

            console.log("Lokalisierung aller Views abgeschlossen.");
        }

        return {
            localizeViews: pubLocalizeViews
        };

    })();
