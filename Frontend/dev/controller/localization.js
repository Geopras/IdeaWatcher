//region localizeViews
function localizeViews(lang){

    console.log("Starte Lokalisierung der Views ...");


    var en_GB = '{"username":"Username",' +
        '"email":"Email"}';

    var de_DE = '{"username":"Benutzername",' +
        '"email":"E-Mail"}';

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
