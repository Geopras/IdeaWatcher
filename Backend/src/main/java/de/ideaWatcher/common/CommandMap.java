package main.java.de.ideaWatcher.common;

import java.util.HashMap;
import java.util.stream.Collectors;

/**
 * Klasse zur Erstellung einer Map, um Methodenaufrufe (Commands) bestimmten
 * Keys zuzuordnen, sodass ueber einen Key ein bestimmter Command ausgefuehrt
 * wird. (siehe Wikipedia: "Command pattern")
 * @param <In> Typ der eingehenden Daten zum Ausfuehren eines Command
 * @param <Out> Typ der ausgehenden Daten zum Ausfuehren eines Command
 */
public class CommandMap<In, Out> {

    private HashMap<String, ICommand<In, Out>> commands;

    /**
     * Erzeuge eine neue Instanz von CommandMap
     */
    public CommandMap() {
        commands = new HashMap<>();
    }

    /**
     * Fuege einen neuen Command zusammen mit seinem Key zur CommandMap hinzu.
     * @param key {String} eindeutiger Identifier des Command
     * @param command {ICommand} Instanz des hinzuzufuegenden Command
     */
    public void addCommand(String key, ICommand<In, Out> command) {
        commands.put(key, command);
    }

    /**
     * Fuehre den Command aus, wenn der Key zu einem Command passt.
     * @param key {String} eindeutiger Identifier eines Command
     * @param data Daten beliebigen Typs fuer auszufuehrende Methode
     * @return Rueckgabewert der Methode vom Typ der eingehenden Daten
     * @throws Exception Wenn der Key in der CommandMap nicht existiert
     */
    public Out executeCommand(String key, In data) throws Exception {
        if (commands.containsKey(key)) {
            return commands.get(key).apply(data);
        } else {
            throw new Exception(String.format("commandMap_key_not_exists",
                    key));
        }
    }

    /**
     * Liste alle vorhandenen Commands der CommandMap in der Konsole auf
     */
    public void listCommands() {
        System.out.println("Enabled command: " +
                commands.keySet().stream().collect(Collectors.joining(", ")));
    }
}

