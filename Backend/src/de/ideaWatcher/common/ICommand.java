package de.ideaWatcher.common;

/**
 * Interface für die Erstellung einer Command-Klasse<br/>
 */
public interface ICommand<T> {

    T apply(T data);
}
