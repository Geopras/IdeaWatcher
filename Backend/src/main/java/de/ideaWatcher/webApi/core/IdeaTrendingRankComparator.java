package main.java.de.ideaWatcher.webApi.core;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;

import java.util.Comparator;

/**
 * Vergleicht zwei Ideen anhand ihres Trending-Rankings.
 * Die Idee mit dem kleineren Ranking wird vor die mit dem größeren Ranking sortiert.
 */
public class IdeaTrendingRankComparator implements Comparator<IIdea> {

    private boolean reverse;

    public IdeaTrendingRankComparator(){
        reverse = false;
    }

    /**
     * Vergleicht zwei Ideen anhand ihres Trending-Rankings.
     * @param reverse Bei reverse = true werden große Werte vor kleine Werte sortiert.
     */
    public IdeaTrendingRankComparator(boolean reverse){
        this.reverse = reverse;
    }

    public int compare(IIdea idea1, IIdea idea2) {

        if (idea1.getTrendingRank() == null && idea2.getTrendingRank() == null) {
            return 0;
        }

        if (idea1.getTrendingRank() == null) {
            if (reverse){
                return -1;
            }
            return 1;
        }

        if (idea2.getTrendingRank() == null) {
            if (reverse){
                return 1;
            }
            return -1;
        }

        if (reverse){
            return idea2.getTrendingRank().compareTo(idea1.getTrendingRank());
        }
        return idea1.getTrendingRank().compareTo(idea2.getTrendingRank());
    }
}
