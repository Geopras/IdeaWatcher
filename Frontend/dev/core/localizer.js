ideaWatcher.core.Localizer = ideaWatcher.core.Localizer || (function () {

        var currentLanguage = "en_GB";

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

        function pubSetLanguage(language) {

            currentLanguage = language;
            console.log("Sprache geändert in: " + language);
        }

        function pubGetLanguage() {

            return currentLanguage;
        }

        // function pubLocalizeViews(lang) {
        //
        //     pubSetLanguage(lang);
        //
        //     console.log("Starte Lokalisierung der Views ...");
        //
        //     ideaWatcher.view.ProfileEdit.localizeView(i18n);
        //
        //     console.log("Lokalisierung aller Views abgeschlossen.");
        // }

        return {
            // Legt die Sprache für die gesamte Website fest
            setLanguage: pubSetLanguage,
            // damit können sich die Views für die selbsständige Lokalisierung während der Initialisierung
            // die gewählte Sprache abholen
            getLanguage: pubGetLanguage,
            // damit können die Views bei einem Sprachwechsel lokalisiert werden
            // localizeViews: pubLocalizeViews
        };
    })();
