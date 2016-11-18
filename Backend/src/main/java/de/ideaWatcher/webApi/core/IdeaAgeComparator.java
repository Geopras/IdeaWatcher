package main.java.de.ideaWatcher.webApi.core;


import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;

import java.util.Comparator;

/**
 * Vergleicht zwei Ideen anhand ihres PublishDates.
 * Die Idee mit dem älterem Datum wird vor die Idee mit dem neueren Datum sortiert.
 */
public class IdeaAgeComparator implements Comparator<IIdea> {

    private boolean reverse;

    public IdeaAgeComparator(){
        reverse = false;
    }

    /**
     * Vergleicht zwei Ideen anhand ihrer publishDates.
     * @param reverse Bei reverse = true werden Ideen mit neuerem Datum vor Ideen mit
     *                aelterem Datum sortiert.
     */
    public IdeaAgeComparator(boolean reverse){
        this.reverse = reverse;
    }

    public int compare(IIdea idea1, IIdea idea2) {

        if (idea1.getPublishDate() == null && idea2.getPublishDate() == null) {
            return 0;
        }

        if (idea1.getPublishDate() == null) {
            if (reverse){
                return -1;
            }
            return 1;
        }

        if (idea2.getPublishDate() == null) {
            if (reverse){
                return 1;
            }
            return -1;
        }

        if (reverse){
            return idea2.getPublishDate().compareTo(idea1.getPublishDate());
        }
        return idea1.getPublishDate().compareTo(idea2.getPublishDate());
    }

}
