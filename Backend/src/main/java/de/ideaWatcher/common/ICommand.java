package main.java.de.ideaWatcher.common;

/**
 * Interface für die Erstellung einer Command-Klasse
 * mit generischen Ein- und Ausgabeobjekten
 */
public interface ICommand<In, Out> {

    /**
     * Fuehrt den Command aus
     * @param data zu uebergebende Daten
     * @return Ergebnis des Command zurueckgegeben
     */
    Out apply(In data);
}
