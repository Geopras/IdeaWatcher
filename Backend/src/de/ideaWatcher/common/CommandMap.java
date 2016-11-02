package de.ideaWatcher.common;

import java.util.HashMap;
import java.util.stream.Collectors;

/**
 * Klasse zur Erstellung einer Map, um Methodenaufrufe (Commands) bestimmten
 * Keys zuzuordnen, sodass ueber einen Key ein bestimmter Command ausgefuehrt
 * wird. (siehe Wikipedia: "Command pattern")
 * @param <T> Typ der ein- und ausgehenden Daten zum Ausfuehren eines Command
 */
public class CommandMap<T> {

    private HashMap<String, ICommand> commands;

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
    public void addCommand(String key, ICommand command) {
        commands.put(key, command);
    }

    /**
     * Fuehre den Command aus, wenn der Key zu einem Command passt.
     * @param key {String} eindeutiger Identifier eines Command
     * @param data Daten beliebigen Typs fuer auszufuehrende Methode
     * @return Rueckgabewert der Methode vom Typ der eingehenden Daten
     * @throws Exception Wenn der Key in der CommandMap nicht existiert
     */
    public T executeCommand(String key, T data) throws Exception {
        if (commands.containsKey(key)) {
            return (T)commands.get(key).apply(data);
        } else {
            throw new Exception(String.format("commandMap_key_not_exists",
                    key));
        }
    }

    /**
     * Liste alle vorhandenen Commands der CommandMap in der Konsole auf
     */
    public void listCommands() {
        System.out.println("Enabled commands: " +
                commands.keySet().stream().collect(Collectors.joining(", ")));
    }
}

