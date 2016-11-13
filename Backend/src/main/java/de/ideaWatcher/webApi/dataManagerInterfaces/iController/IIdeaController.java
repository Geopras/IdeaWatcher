package main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;

/**
 * Interface für Definition der Ideenschnittstelle
 */
public interface IIdeaController {

    /**
     * Fuegt eine neue Idee zur Ideen-Collection hinzu
     * @param idea {IIdea} neues Idea-Objekt
     * @throws Exception wenn es beim Zugriff auf die Datenbank ein Problem gab
     */
    void addNewIdea(IIdea idea) throws Exception;

    /**
     * Gibt eine vorhandene Idee anhand des eindeutigen Namens zurueck
     * @param ideaName {String} eindeutiger Ideename
     * @return {IIdea} ein Idea-Objekt
     * @throws Exception wenn es beim Zugriff auf die Datenbank ein Problem gab
     */
    IIdea getIdea(String ideaName) throws Exception;

    /**
     * Loescht eine vorhandene Idee anhand des eindeutigen Namens
     * @param ideaName {String} eindeutiger Ideename
     * @throws Exception wenn es beim Zugriff auf die Datenbank ein Problem gab
     * Problem gekommen ist
     */
    void deleteIdea(String ideaName) throws Exception;

    /**
     * Aendert eine vorhandene Idee in der Ideen-Collection
     * @param idea {IIdea} neues Idea-Objekt
     * @throws Exception wenn es beim Zugriff auf die Datenbank ein Problem gab
     */
    void changeIdea(IIdea idea) throws Exception;
}
