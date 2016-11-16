package main.java.de.ideaWatcher.webApi.core;

import main.java.de.ideaWatcher.dataManager.pojos.Idea;

import java.util.Comparator;

/**
 * Vergleicht zwei Ideen anhand ihrer numberFollowers.
 * Die Idee mit der kleineren Anzahl wird vor die mit der größeren Anzahl sortiert.
 */
public class IdeaFollowersComparator implements Comparator<Idea> {

    public int compare(Idea idea1, Idea idea2) {

        if (idea1.getNumberFollowers() == null && idea2.getNumberFollowers() == null) {
            return 0;
        }

        if (idea1.getNumberFollowers() == null) {
            return 1;
        }

        if (idea2.getNumberFollowers() == null) {
            return -1;
        }

        return idea1.getNumberFollowers().compareTo(idea2.getNumberFollowers());
    }
}
