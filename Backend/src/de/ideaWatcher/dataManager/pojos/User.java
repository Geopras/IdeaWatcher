package de.ideaWatcher.dataManager.pojos;

import main.java.ideaWatcher.webApi.dataManagerInterfaces.iPOJOs.IUser;

/**
 * POJO zur Definition eines User-Objekts
 */
public class User implements IUser {

    private String name;
    private Long userId;
    private String password;

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public Long getUserId() {
        return this.userId;
    }

    @Override
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Gibt eine leere Instanz der User-Klasse zurueck
     * @return {User} user object
     */
    public User() {
        this.name = "";
        this.password = "";
    }

    /**
     * Gibt eine gefuellte User-Instanz zurueck
     * @param name
     * @param userId
     * @param password
     * @return
     */
    public User(String name, Long userId, String password) {
        this.name = name;
        this.userId = userId;
        this.password = password;
    }
}
