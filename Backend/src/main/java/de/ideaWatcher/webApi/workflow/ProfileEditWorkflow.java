package main.java.de.ideaWatcher.webApi.workflow;

import main.java.de.ideaWatcher.dataManager.pojos.User;
import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.core.Response;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IUserController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;
import org.json.JSONObject;

import java.util.logging.Level;
import java.util.logging.Logger;

public class ProfileEditWorkflow implements IWorkflow {

    private static final Logger log = Logger.getLogger( ProfileEditWorkflow.class.getName() );
    private IUserController userController;

    public ProfileEditWorkflow() {

        this.userController = InstanceManager.getDataManager().getUserController();
    }

    public IResponse getResponse(IRequest request) {

        // die ID des Users, der die Anfrage gestellt hat
        // => ein User kann also nur sein eigenes Profil speichern
        String userId = request.getUserId();

        // Workflow-Antwort instanziieren
        IResponse response = new Response();

        // das User-Objekt mit den alten Werten aus der Datenbank
        IUser oldUser;

        //region die zum Speichern übermittelten Daten extrahieren
        String requestUsername;
        String requestEmail;
        String requestSurname;
        String requestFirstName;
        String requestGender;
        String requestLanguage;
        boolean requestIsMailPublic;

        try {
            JSONObject profileData = request.getData();
            requestUsername = profileData.getString("username");
            requestEmail = profileData.getString("email");
            requestSurname = profileData.getString("surname");
            requestFirstName = profileData.getString("firstName");
            requestGender = profileData.getString("gender");
            requestLanguage = profileData.getString("language");
            requestIsMailPublic = profileData.getBoolean("isMailPublic");
            // Das Profilbild wird noch nicht aktualsiert
            //requestPictureUrl = profileData.getString("pictureURL");
        } catch (Exception ex) {
            response.setErrorMessage("SProfile_saveRequestData_error");
            response.setResult("error");
            log.log(Level.SEVERE, "Beim Auswerten der zu Speichernden " +
                    "Profildaten ist ein Fehler aufgetreten!" +
                    "\nFehlermeldung: "
                    + ex.getMessage());
            return response;
        }
        //endregion

        //region Den zur Request-UserID zugehoerigen User in DB abfragen

        try {
            oldUser = this.userController.getUser(userId);
        } catch (Exception ex) {
            response.setErrorMessage("SProfile_getUser_error");
            response.setResult("error");
            log.log(Level.SEVERE, "Bei der Abfrage eines bestimmten User aus " +
                    "der Datenbank ist ein Fehler " +
                    "aufgetreten!\nFehlermeldung: " + ex.getMessage());
            return response;
        }
        //endregion

        // Muss nicht geprüft werden, da der Username nicht geändert werden kann
        //region Prüfen, ob sich Benutzername geändert hat
        if (!requestUsername.equals(oldUser.getUserName())){
            // Prüfe, ob der neue UserName noch verfügbar ist
            boolean existsUser;
            try {
                existsUser = this.userController.existsUserName(requestUsername);
            } catch (Exception ex) {
                response.setErrorMessage("SProfile_existsUser_error");
                response.setResult("error");
                log.log(Level.SEVERE, "Beim Prüfen, ob bereits ein User mit dem neuen" +
                        " UserName existiert ist ein Fehler aufgetreten!\nFehlermeldung: " + ex.getMessage());
                return response;
            }

            if (existsUser){
                // Der gewählte UserName ist bereits vergeben
                response.setErrorMessage("SProfile_userNameNotFree_error");
                response.setResult("error");
                return response;
            }
        }
        //endregion

        // Muss nicht geprüft werden, da die Email nicht geändert werden kann
        //region Prüfen, ob sich Email-Adresse geändert hat
        if (!requestEmail.equals(oldUser.getEmail())){
            // Prüfe, ob die neue Email-Adresse noch verfügbar ist
            boolean existsMail;
            try {
                existsMail = this.userController.existsEmail(requestEmail);
            } catch (Exception ex) {
                response.setErrorMessage("SProfile_existsEmail_error");
                response.setResult("error");
                log.log(Level.SEVERE, "Beim Prüfen, ob bereits ein User mit der neuen" +
                        " Email-Adresse existiert ist ein Fehler" +
                        " aufgetreten!\nFehlermeldung: " + ex.getMessage());
                return response;
            }

            if (existsMail){
                // Die gewählte Email-Adresse ist bereits vergeben
                response.setErrorMessage("SProfile_emailNotFree_error");
                response.setResult("error");
                return response;
            }
        }
        //endregion

        // Speichere Daten

        try {
            oldUser.setUserName(requestUsername);
            oldUser.setEmail(requestEmail);
            oldUser.setSurname(requestSurname);
            oldUser.setFirstname(requestFirstName);
            oldUser.setGender(requestGender);
            oldUser.setLanguage(requestLanguage);
            oldUser.setIsMailPublic(requestIsMailPublic);

            this.userController.updateUser(oldUser);

            response.setResult("success");
            return response;

        } catch (Exception ex) {
            response.setErrorMessage("SProfile_changeUser_error");
            response.setResult("error");
            log.log(Level.SEVERE, "Beim Ändern der Werte eines existierenden Nutzers" +
                    " ist ein Fehler aufgetreten!" +
                    "\nFehlermeldung: " + ex.getMessage());
            return response;
        }
    }
}
