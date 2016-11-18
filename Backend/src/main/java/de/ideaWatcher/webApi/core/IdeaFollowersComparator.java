package main.java.de.ideaWatcher.webApi.core;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;

import java.util.Comparator;

/**
 * Vergleicht zwei Ideen anhand ihrer numberFollowers.
 * Die Idee mit der kleineren Anzahl wird vor die mit der größeren Anzahl sortiert.
 */
public class IdeaFollowersComparator implements Comparator<IIdea> {

    private boolean reverse;

    public IdeaFollowersComparator(){
        reverse = false;
    }

    /**
     * Vergleicht zwei Ideen anhand ihrer numberFollowers.
     * @param reverse Bei reverse = true werden große Werte vor kleine Werte sortiert.
     */
    public IdeaFollowersComparator(boolean reverse){
        this.reverse = reverse;
    }

    public int compare(IIdea idea1, IIdea idea2) {

        if (idea1.getNumberFollowers() == null && idea2.getNumberFollowers() == null) {
            return 0;
        }

        if (idea1.getNumberFollowers() == null) {
            if (reverse){
                return -1;
            }
            return 1;
        }

        if (idea2.getNumberFollowers() == null) {
            if (reverse){
                return 1;
            }
            return -1;
        }

        if (reverse){
            return idea2.getNumberFollowers().compareTo(idea1.getNumberFollowers());
        }
        return idea1.getNumberFollowers().compareTo(idea2.getNumberFollowers());
    }
}
