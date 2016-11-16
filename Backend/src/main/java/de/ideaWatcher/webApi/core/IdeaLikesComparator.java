package main.java.de.ideaWatcher.webApi.core;

import main.java.de.ideaWatcher.dataManager.pojos.Idea;

import java.util.Comparator;

/**
 * Vergleicht zwei Ideen anhand ihrer numberLikes.
 * Die Idee mit der kleineren Anzahl wird vor die mit der größeren Anzahl sortiert.
 */
public class IdeaLikesComparator implements Comparator<Idea> {

    public int compare(Idea idea1, Idea idea2) {

        if (idea1.getNumberLikes() == null && idea2.getNumberLikes() == null) {
            return 0;
        }

        if (idea1.getNumberLikes() == null) {
            return 1;
        }

        if (idea2.getNumberLikes() == null) {
            return -1;
        }

        return idea1.getNumberLikes().compareTo(idea2.getNumberLikes());
    }
}
