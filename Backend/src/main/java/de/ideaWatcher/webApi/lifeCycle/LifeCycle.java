package main.java.de.ideaWatcher.webApi.lifeCycle;

import main.java.de.ideaWatcher.webApi.manager.InstanceManager;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class LifeCycle implements ServletContextListener{

	// Logic for Container StartUp/Shutdown goes here

	@Override
	public void contextDestroyed(ServletContextEvent arg0)
	{
		//shutdown logic
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0)
	{
		//startup logic
		InstanceManager.initialize();
	}
}