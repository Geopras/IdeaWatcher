package main.java.de.ideaWatcher.webApi.core;

import main.java.de.ideaWatcher.dataManager.pojos.Idea;

import java.util.Comparator;

/**
 * Vergleicht zwei Ideen anhand ihrer numberLikes.
 * Die Idee mit der kleineren Anzahl wird vor die mit der größeren Anzahl sortiert.
 */
public class IdeaLikesComparator implements Comparator<Idea> {

    private boolean reverse;

    public IdeaLikesComparator(){
        reverse = false;
    }

    /**
     * Vergleicht zwei Ideen anhand ihrer numberLikes.
     * @param reverse Bei reverse = true werden große Werte vor kleine Werte sortiert.
     */
    public IdeaLikesComparator(boolean reverse){
        this.reverse = reverse;
    }

    public int compare(Idea idea1, Idea idea2) {

        if (idea1.getNumberLikes() == null && idea2.getNumberLikes() == null) {
            return 0;
        }

        if (idea1.getNumberLikes() == null) {
            if (reverse){
                return -1;
            }
            return 1;
        }

        if (idea2.getNumberLikes() == null) {
            if (reverse){
                return 1;
            }
            return -1;
        }

        if (reverse){
            return idea2.getNumberLikes().compareTo(idea1.getNumberLikes());
        }
        return idea1.getNumberLikes().compareTo(idea2.getNumberLikes());
    }
}
