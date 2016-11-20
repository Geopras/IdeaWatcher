package main.java.de.ideaWatcher.webApi.core;


import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;

import java.util.Comparator;

/**
 * Vergleicht zwei Ideen anhand ihres Hot-Rankings.
 * Die Idee mit dem kleineren Ranking wird vor die mit dem größeren Ranking sortiert.
 */
public class IdeaHotRankComparator implements Comparator<IIdea> {

    private boolean reverse;

    public IdeaHotRankComparator(){
        reverse = false;
    }

    /**
     * Vergleicht zwei Ideen anhand ihres Hot-Rankings.
     * @param reverse Bei reverse = true werden große Werte vor kleine Werte sortiert.
     */
    public IdeaHotRankComparator(boolean reverse){
        this.reverse = reverse;
    }

    public int compare(IIdea idea1, IIdea idea2) {

        if (idea1.getHotRank() == null && idea2.getHotRank() == null) {
            return 0;
        }

        if (idea1.getHotRank() == null) {
            if (reverse){
                return -1;
            }
            return 1;
        }

        if (idea2.getHotRank() == null) {
            if (reverse){
                return 1;
            }
            return -1;
        }

        if (reverse){
            return idea2.getHotRank().compareTo(idea1.getHotRank());
        }
        return idea1.getHotRank().compareTo(idea2.getHotRank());
    }
}
