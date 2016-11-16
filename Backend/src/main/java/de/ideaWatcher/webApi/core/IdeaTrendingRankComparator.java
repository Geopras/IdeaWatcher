package main.java.de.ideaWatcher.webApi.core;

import main.java.de.ideaWatcher.dataManager.pojos.Idea;

import java.util.Comparator;

/**
 * Vergleicht zwei Ideen anhand ihres Trending-Rankings.
 * Die Idee mit dem kleineren Ranking wird vor die mit dem größeren Ranking sortiert.
 */
public class IdeaTrendingRankComparator implements Comparator<Idea> {

    public int compare(Idea idea1, Idea idea2) {

        if (idea1.getTrendingRank() == null && idea2.getTrendingRank() == null) {
            return 0;
        }

        if (idea1.getTrendingRank() == null) {
            return 1;
        }

        if (idea2.getTrendingRank() == null) {
            return -1;
        }

        return idea1.getTrendingRank().compareTo(idea2.getTrendingRank());
    }
}
