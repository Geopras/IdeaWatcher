// ideaWatcher.view.MyIdeas = ideaWatcher.view.MyIdeas || (function () {
//
//         // region local vars
//         // Event Globale Initialisierung
//         var evIni = {
//             topic : 'internal/ini',
//             cbFunction : cbIni
//         };
//
//         var evLocalizeView = {
//             topic: 'localizeView/myIdeas',
//             cbFunction: localizeView
//         };
//
//         var htmlView = null;
//         var htmlProfileView = null;
//         var header = null;
//         var htmlIdeaCreateButton = null;
//         var ideaList = null;
//
//         // region lade zu internationalisierende HTML-Elemente
//
//         // endregion
//
//         // region subscribe to events
//         ideaWatcher.core.MessageBroker.subscribe(evIni);
//         ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
//
//         ideaWatcher.controller.MyIdeas.registerShowView(cbShowView);
//         // endregion
//
//         // region cbIni
//         function cbIni() {
//             console.log('Initialisiere UIConnector MyIdeas');
//
//             // endregion
//
//             var idea1 = {
//                 name : 'Testname1',
//                 description : 'description Test1',
//                 likes : 5,
//                 follower : 7,
//                 comments : 14
//             }
//             var idea2 = {
//                 name : 'Testname2',
//                 description : 'description Test2',
//                 likes : 4,
//                 follower : 8,
//                 comments : 4
//             }
//             var listIdeas = [ idea1, idea2 ];
//             cbRenderList(listIdeas);
//
//             // region assign html elements
//             htmlView = document.querySelector('.myIdeas_view');
//             htmlProfileView = document.querySelector('.profile_view');
//             // endregion
//
//             // region register Callbacks
//             // wam.logic.UserSession.registerVerificationError(cbShowVerificationError);
//             ideaWatcher.controller.MyIdeas.registerShowView(cbShowView);
//             ideaWatcher.controller.MyIdeas.registerRenderList(cbRenderList);
//             // endregion
//
//             // lokalisiere die View anhand der global definierten Sprache
//             localizeView();
//
//         }
//         // endregion
//
//
//         function cbRenderList(itemList) {
//
//             // localization:
//             var language = ideaWatcher.core.Localizer.getLanguage();
//             htmlView = document.querySelector('.myIdeas_view');
//             //baue die IdeeElemente und füge sie zu oberstem div als section hinzu
//             header = document.querySelector('.myIdeas_header_h1');
//             htmlIdeaCreateButton = document.querySelector('.myIdeas_createNewIdea_button');
//
//             var ideaList = ideaWatcher.view.component.IdeaList.renderList(itemList);
//             htmlView.appendChild(ideaList);
//         }
//
//
//         // region showView
//         function cbShowView(obj) {
//             if (obj.shouldShow) {
//                 localizeView();
//                 console.log("Zeige MyIdeas-View an...");
//                 htmlProfileView.style.display = 'block';
//                 htmlView.style.display = 'block';
//             } else {
//                 console.log("Blende MyIdeas-View aus ...");
//                 htmlProfileView.style.display = 'none';
//                 htmlView.style.display = 'none';
//             }
//         }
//         // endregion
//
//         // region localizeView()
//         function localizeView() {
//
//             var language = ideaWatcher.core.Localizer.getLanguage();
//             header.textContent =  ideaWatcher.core.Localizer.MyIdeaList[language].header;
//             htmlIdeaCreateButton.textContent =  ideaWatcher.core.Localizer.MyIdeaList[language].newIdea;
//             console.log("Starte Lokalisierung der MyIdeas-View ...");
//
//             console.log("Lokalisierung MyIdeasView abgeschlossen.")
//         }
//         // endregion
//
//         // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul
//         // kommuniziert werden kann
//         return {
//
//         };
//
//     })();