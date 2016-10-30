//region localizeViews
function localizeViews(lang){

    console.log("Starte Lokalisierung der Views ...");

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

    var i18n;

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

    localizePofileEditView(i18n);

    console.log("Lokalisierung aller Views abgeschlossen.");
}
//endregion
