package main.java.de.ideaWatcher.webApi.core;


import main.java.de.ideaWatcher.dataManager.pojos.Idea;

import java.util.Comparator;

/**
 * Vergleicht zwei Ideen anhand ihres PublishDates.
 * Die Idee mit dem älterem Datum wird vor die Idee mit dem neueren Datum sortiert.
 */
public class IdeaAgeComparator implements Comparator<Idea> {

public int compare(Idea idea1, Idea idea2) {

        if (idea1.getPublishDate() == null && idea2.getPublishDate() == null) {
        return 0;
        }

        if (idea1.getPublishDate() == null) {
        return 1;
        }

        if (idea2.getPublishDate() == null) {
        return -1;
        }

        return idea1.getPublishDate().compareTo(idea2.getPublishDate());
        }

}
