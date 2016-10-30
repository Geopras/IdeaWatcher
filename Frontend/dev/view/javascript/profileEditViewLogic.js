function localizePofileEditView(i18n) {

    console.log("Starte Lokalisierung der ProfileEdit-View ...");

    document.getElementById("profEdit_uname_label").textContent = i18n.username;
    document.getElementById("profEdit_email_label").textContent = i18n.email;

    console.log("Lokalisierung ProfileEditView abgeschlossen.")
}