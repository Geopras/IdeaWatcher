ideaWatcher.view.IdeaList = ideaWatcher.view.IdeaList || (function () {

        //region local vars
        // Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbIni
        };

        var evLocalizeView = {
            topic: 'localizeView/IdeaList',
            cbFunction: cbLocalizeView
        };

        var evIdeaListResponse = {
            topic: 'SIdeaList/getIdeaListRequest-response',
            cbFunction: cbIdeaListResponse
        };

        var header = null;
        var htmlView = null;
        var ideaList = null;
        var htmlList = null;
        var htmlFollowersLabel = null;
        var htmlCommentsLabel = null;
        //endregion

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        ideaWatcher.core.MessageBroker.subscribe(evIdeaListResponse);
        // ideaWatcher.core.MessageBroker.subscribe(evLocalizeViewFresh);
        // ideaWatcher.core.MessageBroker.subscribe(evLocalizeViewTrending);
        //endregion

        //region cbIni
        function cbIni()
        {
            console.log('Initialisiere UIConnector HotIdeaList');

            //region register Callbacks
            ideaWatcher.controller.IdeaList.registerShowView(cbShowView);
            ideaWatcher.controller.IdeaList.registerRenderList(cbRenderList);
            //endregion

            // Zeige die ersten 10 Ideen der Hot-Ideen-Liste an:
            var exObj = {
                ideaListType: 'HOT',
                fromRank: '1',
                toRank: '10'
            };
            console.log(exObj);

            ideaWatcher.controller.IdeaList.getIdeaList(exObj);

            //         //endregion
            //
            // var idea1 = {
            //         name:'Testname1',
            //         description:'description Test1',
            //         likes: 5,
            //         follower: 7,
            //         comments: 14
            // };
            // var idea2 = {
            //         name:'Testname2',
            //         description:'description Test2',
            //         likes: 4,
            //         follower:8,
            //         comments:4
            // };
            // var listIdeas = [idea1,idea2];
            // cbRenderList({itemList: listIdeas, ideaListType: ideaWatcher.model.IdeaListType.HOT});

        }
        //endregion

        function cbRenderList(obj) {

            // localization:
            var language = ideaWatcher.core.Localizer.getLanguage();
            //baue die IdeeElemente und füge sie zu oberstem div als section hinzu

            htmlView = document.querySelector('.ideaList_view');
            header = document.createElement('h1');
            var localizeObject = ideaWatcher.core.Localizer.IdeaList[obj.ideaListType];
            header.textContent =  localizeObject[language].header;
            htmlView.appendChild(header);
            var ideaList = renderItemList(obj.ideaItemList, language);
            htmlView.appendChild(ideaList);
        }

        function renderItemList(itemList, language) {

            //baue die IdeeElemente und füge sie zu oberstem div als section hinzu

            htmlList = document.createElement('div');

            itemList.forEach(function(item){
                var ideaElement = document.createElement('section');
                ideaElement.classList.add('ideaList_ideaElement_section');

                var ideaName = document.createElement('header');
                ideaName.classList.add('ideaList_ideaName_header');

                var ideaDescription = document.createElement('div');
                ideaDescription.classList.add('ideaList_ideaDescription_div')

                var ratings = document.createElement('ul');
                ratings.classList.add('ideaList_ratings_ul')

                var likes = document.createElement('li');
                var likeImage = document.createElement('img');
                likeImage.src = './resources/img/gluehbirne.png';
                likeImage.width = 20;
                likeImage.height = 20;
                var numberOfLikes = document.createElement('span');
                numberOfLikes.classList.add('ideaList_numberOfLikes_span');
                likes.appendChild(likeImage);
                likes.appendChild(numberOfLikes);

                htmlFollowersLabel = document.createElement('li');
                htmlFollowersLabel.textContent = ideaWatcher.core.Localizer.IdeaList.GLOBAL[language].followers;
                var numberOfFollowers = document.createElement('span');
                numberOfFollowers.classList.add('ideaList_numberOfFollowers_span');
                htmlFollowersLabel.appendChild(numberOfFollowers);

                htmlCommentsLabel = document.createElement('li');
                htmlCommentsLabel.textContent = ideaWatcher.core.Localizer.IdeaList.GLOBAL[language].comments;
                var numberOfComments = document.createElement('span');
                numberOfComments.classList.add('ideaList_numberOfComments_span');
                htmlCommentsLabel.appendChild(numberOfComments);

                ratings.appendChild(likes);
                ratings.appendChild(htmlFollowersLabel);
                ratings.appendChild(htmlCommentsLabel);

                ideaElement.appendChild(ideaName);
                ideaElement.appendChild(ideaDescription);

                htmlList.appendChild(ideaElement);
                htmlList.appendChild(ratings);

                ideaName.textContent = item.name;
                ideaDescription.textContent = item.description;

                numberOfLikes.textContent = item.likes;
                numberOfFollowers.textContent = item.follower;
                numberOfComments.textContent = item.comments;
            });
            return htmlList;
        }

        //region Callback showView
        function cbShowView(obj)
        {
            if(obj.shouldShow)
            {
                cbLocalizeView(obj);
                htmlView.style.display = 'block';
            }
            else
            {
                htmlView.style.display = 'none';
            }
        }
        //endregion

        //region Callback localizeView
        function cbLocalizeView(obj) {

            console.log("Starte Lokalisierung der HotIdeaList-View ...");

            var language = ideaWatcher.core.Localizer.getLanguage();

            if (header && htmlCommentsLabel && htmlFollowersLabel) {

                header.textContent = ideaWatcher.core.Localizer.IdeaList[obj.IdeaListType][language].header;
                htmlCommentsLabel.textContent = ideaWatcher.core.Localizer.IdeaList.GLOBAL[language].comments;
                htmlFollowersLabel.textContent = ideaWatcher.core.Localizer.IdeaList.GLOBAL[language].followers;
            }
        }
        //endregion

        //region Callback ideaListResponse
        function cbIdeaListResponse(exObj) {

            ideaWatcher.core.Navigator.switchView({
                viewId: 'IdeaList',
                url: exObj.data.ideaListType + 'IdeaList',
                additionalData: exObj.data
            });
        }

        return {

        };

    })();