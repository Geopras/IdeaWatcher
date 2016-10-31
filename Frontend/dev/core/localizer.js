ideaWatcher.core.Localizer = ideaWatcher.core.Localizer || (function CLocalizer() {

        var i18n = null;

        // Testdaten
        // der WebSocket gibt direkt JS-Objekte zurück. Deshalb werden sie hier als Testdaten direkt
        // als JS-Objekte angelegt, damit die weitere Verarbeitung gleich ist

        var en_GB = {
            vProfileEdit: {
                username: 'Username',
                email: 'Email',
                mail_public_available: 'allow people to contact me (Email address is public)',
                surname: 'Surname',
                firstname: 'First Name',
                gender: 'Gender',
                country: 'Country',
                submit: 'Submit',
                profile: 'Profile',
                browse: 'Browse ...'
            }
        };

        var de_DE = {
            vProfileEdit: {
                username: 'Benutzername',
                email: 'E-Mail',
                mail_public_available: 'Erlaube anderen mich zu kontaktieren (E-Mail Adresse ist öffentlich)',
                surname: 'Nachname',
                firstname: 'Vorname',
                gender: 'Geschlecht',
                country: 'Land',
                submit: 'Übernehmen',
                profile: 'Profil',
                browse: 'Durchsuchen ...'
            }
        };

        /*
        // JSON-Definition (nicht mehr verwendet, weil WebSocket direkt JS-Objekte zurück gibt)
        // trotzdem aufheben für Backend

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
            */

        function pubSetLanguage(lang){

            console.log("Localizer: wähle Sprache aus");

            switch(lang) {
                case "en_GB":
                    //i18n = JSON.parse(en_GB);
                    i18n = en_GB;
                    console.log("Sprache: englisch");
                    break;
                case "de_DE":
                    //i18n = JSON.parse(de_DE);
                    i18n = de_DE;
                    console.log("Sprache: deutsch");
                    break;
                default:
                    //i18n = JSON.parse(en_GB);
                    i18n = en_GB;
                    console.log("Sprache: englisch (default)");
            }

        }

        function pubGetLanguage(){

            if (i18n == null){
                pubSetLanguage(null);
            }

            return i18n;
        }

        function pubLocalizeViews(lang){

            pubSetLanguage(lang);

            console.log("Starte Lokalisierung der Views ...");

            ideaWatcher.view.ProfileEdit.localizeView(i18n);

            console.log("Lokalisierung aller Views abgeschlossen.");
        }

        return {
            // Legt die Sprache für die gesamte Website fest
            setLanguage: pubSetLanguage,
            // damit können sich die Views für die selbsständige Lokalisierung während der Initialisierung
            // die gewählte Sprache abholen
            getLanguage: pubGetLanguage,
            // damit können die Views bei einem Sprachwechsel lokalisiert werden
            localizeViews: pubLocalizeViews
        };

    })();
