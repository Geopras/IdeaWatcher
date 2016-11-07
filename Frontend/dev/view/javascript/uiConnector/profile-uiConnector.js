ideaWatcher.view.Profile = ideaWatcher.view.Profile || (function VProfile() {

        //region local vars
        // Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbIni
        };

        var htmlView = null;

        //region lade zu internationalisierende HTML-Elemente
        var htmlMyIdeasButton = null;
        var htmlFollowedIdeasButton = null;
        var htmlProfileEditButton = null;
        //endregion

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        //endregion

        //region cbIni
        function cbIni()
        {
            console.log('Initialisiere UIConnector Profile');

            //region assign html elements
            htmlView = document.querySelector('.profile_view');
            htmlMyIdeasButton = document.querySelector('.profileSubMenu_myIdeas_button');
            htmlFollowedIdeasButton = document.querySelector('.profileSubMenu_followedIdeas_button');
            htmlProfileEditButton = document.querySelector('.profileSubMenu_profileEdit_button');
            //endregion

            //region register Callbacks
            // wam.logic.Login.registerVerificationError(cbShowVerificationError);
            ideaWatcher.controller.Profile.registerShowView(cbShowView);
            //endregion

            htmlMyIdeasButton.addEventListener('click', handleButtonNavigationMyIdeas);
            htmlFollowedIdeasButton.addEventListener('click', handleButtonNavigationFollowedIdeas);
            htmlProfileEditButton.addEventListener('click', handleButtonNavigationEditProfile);

            // lokalisiere die View anhand der global definierten Sprache
            localizeView();

        }
        //endregion

        //region showView
        function cbShowView(obj)
        {
            if(obj.shouldShow)
            {

                localizeView();
                console.log("Zeige Profile-View an...");
                htmlView.style.display = 'block';
            }
            else
            {
                console.log("Blende Profile-View aus ...");
                htmlView.style.display = 'none';
            }
        }
        //endregion

        //region localizeView()
        function localizeView() {

            var language = ideaWatcher.core.Localizer.getLanguage();

            console.log("Starte Lokalisierung der Profile-View ...");


            console.log("Lokalisierung ProfileView abgeschlossen.")
        }
        //endregion

        function handleButtonNavigationMyIdeas(clickEvent){

            ideaWatcher.core.Navigator.switchView({
                viewId: 'myIdeas',
                url: 'myProfile'
            });
        }

        function handleButtonNavigationFollowedIdeas(clickEvent){

            ideaWatcher.core.Navigator.switchView({
                viewId: 'followedIdeas',
                url: 'myProfile'
            });
        }

        function handleButtonNavigationEditProfile(clickEvent){

            ideaWatcher.core.Navigator.switchView({
                viewId: 'profileEdit',
                url: 'myProfile'
            });
        }

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {

        };

    })();

/*
 // Stefan - 07.11.2016 - hab das mal raus genommen, weil ich die Navi des SubMenus wie die des MainMenus bauen will

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabContent, tabLinks;

    // Get all elements with class="tabcontent" and hide them
    tabContent = document.querySelector('.profile_tabContent');
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = 'none';
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tabLinks = document.querySelector('.profile_tabLinks');
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(' active', '');
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById('profile_' + tabName + '_tab').style.display = 'block';
    evt.currentTarget.className += ' active';
}
*/

