package test.dataManager;

import main.java.de.ideaWatcher.dataManager.services.UserService;
import org.junit.Assert;
import org.junit.Test;

/**
 * Created by geopras on 09.11.16.
 */
public class UserServiceTest {

    @Test
    public void validatePassword_should_return_true_if_password_is_correct() {

        String password = "Test1234";
        UserService userService = new UserService();
        String hashedPassword = userService.hashPassword(password);
        System.out.println(hashedPassword);
        Assert.assertTrue(userService.validatePassword("Test1234", hashedPassword));
    }
}
