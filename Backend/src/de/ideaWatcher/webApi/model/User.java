package de.ideaWatcher.webApi.model;

/**
 * POJO zur Definition eines User
 */
public class User {

    private String name;
    private int userId;
    private String password;

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getUserId() {
        return this.userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User() {
        this.name = "";
        this.password = "";
    }

    public User(String name, String password) {
        this.name = name;
        this.password = password;
    }
}
