ideaWatcher.view.IdeaList = ideaWatcher.view.IdeaList || (function () {

        //region local vars
        var header = null;
        var htmlView = null;
        var htmlFollowersLabel = null;
        var htmlCommentsLabel = null;
        var currentListType = null;
        var currentIdeaList = [];
        //endregion

        //region register Callbacks am Controller
        ideaWatcher.controller.IdeaList.registerInitializeView(cbIni);
        ideaWatcher.controller.IdeaList.registerShowView(cbShowView);
        ideaWatcher.controller.IdeaList.registerLocalizeView(cbLocalizeView);
        ideaWatcher.controller.IdeaList.registerGetIdeasResponse(cbGetIdeasResponse);
        //endregion

        // ideaWatcher.core.MessageBroker.subscribe(evLocalizeViewFresh);
        // ideaWatcher.core.MessageBroker.subscribe(evLocalizeViewTrending);
        //endregion

        //region cbIni
        function cbIni()
        {
            console.log('Initialisiere UIConnector IdeaList');

            currentListType = ideaWatcher.model.IdeaListType.HOT;
            currentIdeaList = [];
            //region initialize html
            htmlView = document.querySelector('.ideaList_view');
            header = document.querySelector('#ideaList_header_h1');
            //endregion
        }
        //endregion

        function cbShowView(exObj) {

            if(exObj.shouldShow)
            {
                renderView(exObj.additionalData);
                htmlView.style.display = 'block';
            }
            else
            {
                htmlView.style.display = 'none';
            }
        }

        //region Callback localizeView
        function cbLocalizeView() {

            console.log("Starte Lokalisierung der IdeaList-View ...");

            var language = ideaWatcher.core.Localizer.getLanguage();

            if (header) {

                header.textContent = ideaWatcher.core.Localizer.IdeaList[currentListType][language].header;
                // htmlCommentsLabel.textContent = ideaWatcher.core.Localizer.IdeaList.GLOBAL[language].comments;
                // htmlFollowersLabel.textContent = ideaWatcher.core.Localizer.IdeaList.GLOBAL[language].followers;
            }
        }
        //endregion

        //region getIdeasResponse
        function cbGetIdeasResponse(exObj) {

            var responseData = ideaWatcher.model.GetIdeasData.ResponseData;
            responseData.listType = exObj.data.listType;
            currentListType = responseData.listType;
            responseData.ideas = exObj.data.ideas;
            responseData.isRenderNewIdeaList = exObj.data.isRenderNewIdeaList;
            responseData.category = exObj.data.category;
            responseData.destinationUrl = exObj.data.destinationUrl;

            ideaWatcher.core.Navigator.switchView({
                viewId: 'IdeaList',
                url: responseData.destinationUrl,
                additionalData: responseData
            });
        }
        //endregion

        function renderView(exObj) {

            //region Extrahiere Renderdaten:
            var ideasToAppend = exObj.ideas;
            var isRenderNewIdeaList;
            if (exObj.isRenderNewIdeaList === 'FALSE') {
                isRenderNewIdeaList = false;
            } else {
                isRenderNewIdeaList = true;
            }
            //endregion

            // localization:
            var language = ideaWatcher.core.Localizer.getLanguage();
            //baue die IdeeElemente und füge sie zu oberstem div als section hinzu

            cbLocalizeView();

            if (isRenderNewIdeaList) {

                currentIdeaList = [];
                htmlView.removeChild(document.querySelector('.ideaList_sections'));
                var htmlSections = document.createElement('div');
                htmlSections.classList.add('ideaList_sections');
                renderIdeaList(htmlSections, ideasToAppend, language);
                htmlView.appendChild(htmlSections);

            } else {

                var htmlSections = htmlView.querySelector('.ideaList_sections');
                renderIdeaList(htmlSections, ideasToAppend, language);
            }

            currentIdeaList.splice(currentIdeaList.length, 0, ideasToAppend);
        }

        function renderIdeaList(htmlList, ideaListToAppend, language) {

            //baue die IdeeElemente und füge sie zu oberstem div als section hinzu

            ideaListToAppend.forEach(function(item){
                var ideaElement = document.createElement('section');
                ideaElement.classList.add('ideaList_ideaElement_section');

                var ideaName = document.createElement('header');
                ideaName.classList.add('ideaList_ideaName_header');

                var ideaDescription = document.createElement('div');
                ideaDescription.classList.add('ideaList_ideaDescription_div');

                var ratings = document.createElement('ul');
                ratings.classList.add('ideaList_ratings_ul');

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
                numberOfLikes.textContent = item.numberLikes;
                numberOfFollowers.textContent = item.numberFollowers;
                numberOfComments.textContent = item.numberComments;
            });
        }

        // window.addEventListener('scroll', function(e) {
        //     last_known_scroll_position = window.scrollY;
        //     if (!ticking) {
        //         window.requestAnimationFrame(function() {
        //             doSomething(last_known_scroll_position);
        //             ticking = false;
        //         });
        //     }
        //     ticking = true;
        // });

        // document.onscroll = function() {
        //     if(document.documentElement.scrollTop === document.documentElement.scrollHeight)
        //     {
        //         alert('bottom');
        //     }
        // };

        return {

        };

    })();