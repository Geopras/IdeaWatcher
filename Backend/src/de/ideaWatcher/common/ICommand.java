package de.ideaWatcher.common;

/**
 * Interface für die Erstellung einer Command-Klasse
 * mit generischen Ein- und Ausgabeobjekten
 */
public interface ICommand<In, Out> {

    Out apply(In data);
}
