function localizePofileEditView(i18n) {

    console.log("Starte Lokalisierung der ProfileEdit-View ...");


    document.getElementById("profEdit_profile_header").textContent = i18n.profile;
    document.getElementById("profEdit_uname_label").textContent = i18n.username;
    document.getElementById("profEdit_email_label").textContent = i18n.email;
    document.getElementById("profEdit_mail-public_label").textContent = i18n.mail_public_available;
    document.getElementById("profEdit_surname_label").textContent = i18n.surname;
    document.getElementById("profEdit_firstname_label").textContent = i18n.firstname;
    document.getElementById("profEdit_gender_label").textContent = i18n.gender;
    document.getElementById("profEdit_country_label").textContent = i18n.country;

    document.getElementById("profEdit_submit_button").setAttribute("value", i18n.submit);
    document.getElementById("profileEdit-browseImageButton").setAttribute("value", i18n.browse);


    console.log("Lokalisierung ProfileEditView abgeschlossen.")
}