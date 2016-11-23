package main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;

import java.util.List;

/**
 * Interface für Definition der Ideenschnittstelle
 */
public interface IIdeaController {

    
    /**
     * Fuegt eine neue Idee zur Ideen-Collection hinzu
     * @param idea {IIdea} neues Idea-Objekt
     * @return {String} von Datenbank generierte IdeaID
     * @throws Exception wenn es beim Zugriff auf die Datenbank ein Problem gab
     */
    void addNewIdea(IIdea idea, String userId) throws Exception;

    /**
     * Gibt eine vorhandene Idee zurueck
     * @param ideaId {String} eindeutige IdeeID
     * @return {IIdea} ein Idea-Objekt
     * @throws Exception wenn es beim Zugriff auf die Datenbank ein Problem gab
     */
    IIdea getIdea(String ideaId) throws Exception;

    /**
     * Gibt alle vorhandenen Ideen zurueck
     * @return {List<IIdea} eine List von Idea-Objekten
     * @throws Exception wenn es beim Zugriff auf die Datenbank ein Problem gab
     */
    List<IIdea> getAllIdeas() throws Exception;

    /**
     * Loescht eine vorhandene Idee
     * @param ideaId {String} eindeutige IdeeID
     * @throws Exception wenn es beim Zugriff auf die Datenbank ein Problem gab
     * Problem gekommen ist
     */
    
    /**
     * Gibt alle vorhandenen Ideen in SmartForm zurueck
     * @return {List<IIdea} eine List von Idea-Objekten
     * @throws Exception wenn es beim Zugriff auf die Datenbank ein Problem gab
     */
    List<IIdea> getAllIdeasSmart() throws Exception;
    
    void deleteIdea(String ideaId) throws Exception;

    /**
     * Aendert eine vorhandene Idee in der Ideen-Collection
     * @param idea {IIdea} neues Idea-Objekt
     * @throws Exception wenn es beim Zugriff auf die Datenbank ein Problem gab
     */
    void updateIdea(IIdea idea) throws Exception;
    
    /**
     * Aktualisiert bestimmtes Feld einer Idee
     * @param idea {String} ideaId ID des Dokuments
     * @param idea {String} type Feld des Dokuments in der DB
     * @param idea {String} value der Wert des Feldes
     * @throws Exception wenn es beim Zugriff auf die Datenbank ein Problem gab
     */   
    void updateApropertyOfaIdea(String ideaId, String type, String value) throws Exception;
}
