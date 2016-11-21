ideaWatcher.view.IdeaList = ideaWatcher.view.IdeaList || (function () {

        //region local vars
        var header = null;
        var htmlView = null;
        var currentListType = null;
        var currentCategory = null;
        var currentIdeasMap = {};
        var countIdeasPerRequest = 10;
        var publishedLabels = [];

        //endregion

        //region register Callbacks am Controller
        ideaWatcher.controller.IdeaList.registerInitializeView(cbIni);
        ideaWatcher.controller.IdeaList.registerShowView(cbShowView);
        ideaWatcher.controller.IdeaList.registerLocalizeView(cbLocalizeView);
        ideaWatcher.controller.IdeaList.registerGetIdeasResponse(cbGetIdeasResponse);
        ideaWatcher.controller.IdeaList.registerGetCurrentListType(cbGetCurrentListType);
        ideaWatcher.controller.IdeaList.registerGetCurrentCategory(cbGetCurrentCategory);
        ideaWatcher.controller.IdeaList.registerGetIdea(cbGetIdea);
        //endregion

        // ideaWatcher.core.MessageBroker.subscribe(evLocalizeViewFresh);
        // ideaWatcher.core.MessageBroker.subscribe(evLocalizeViewTrending);
        //endregion

        //region cbIni
        function cbIni()
        {
            console.log('Initialisiere UIConnector IdeaList');

            currentListType = ideaWatcher.model.IdeaList.ListType.HOT;
            currentCategory = ideaWatcher.model.IdeaList.Category.NONE;
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

                header.textContent = ideaWatcher.core.Localizer
                    .IdeaList[currentListType][currentCategory][language]
                    .header;
            }
            var countPublishedLabels = publishedLabels.length;
            if (countPublishedLabels > 0) {
                for (var i = 0; i < countPublishedLabels; i++) {
                    var textContent = publishedLabels[i].textContent;
                    if (textContent.startsWith(
                            ideaWatcher.core.Localizer.IdeaList.Published.de_DE)) {
                        textContent = textContent.replace(
                            ideaWatcher.core.Localizer.IdeaList.Published.de_DE,
                            ideaWatcher.core.Localizer.IdeaList.Published.en_GB);
                    } else {
                        textContent = textContent.replace(
                            ideaWatcher.core.Localizer.IdeaList.Published.en_GB,
                            ideaWatcher.core.Localizer.IdeaList.Published.de_DE);
                    }
                    publishedLabels[i].textContent = textContent;
                }
            }
        }
        //endregion

        //region getIdeasResponse
        function cbGetIdeasResponse(response) {

            var language = ideaWatcher.core.Localizer.getLanguage();
            // Nach Ergebnis sehen:
            var result = response.result;

            if (result === 'error') {

                ideaWatcher.controller.GlobalNotification.showNotification(
                    ideaWatcher.model.GlobalNotificationType.ERROR,
                    ideaWatcher.core.Localizer.IdeaList.Notification[language].Headline,
                    ideaWatcher.core.Localizer.IdeaList.Notification[language][response.errorMessage],
                    5000);
                return;

            } else if (result !== "success") {

                ideaWatcher.controller.GlobalNotification.showNotification(
                    ideaWatcher.model.GlobalNotificationType.ERROR,
                    ideaWatcher.core.Localizer.IdeaList.Notification[language].Headline,
                    ideaWatcher.core.Localizer.IdeaList.Notification[language].UnknownStatus,
                    5000);
                return;
            }

            var responseData = Object.create(ideaWatcher.model.ExchangeObject
                .IdeaList.ResponseData);
            responseData.listType = response.data.listType;
            responseData.ideas = response.data.ideas;
            responseData.isRenderNewIdeaList = response.data.isRenderNewIdeaList;
            responseData.category = response.data.category;
            responseData.isReachedEnd = response.data.isReachedEnd;

            currentListType = responseData.listType;
            currentCategory = responseData.category;

            ideaWatcher.core.Navigator.switchView({
                viewId: 'ideaList',
                url: ideaWatcher.model.Navigation.ViewUrl[currentListType][currentCategory],
                additionalData: responseData
            });
        }
        //endregion

        function cbGetCurrentListType() {
            return currentListType;
        }

        function cbGetCurrentCategory() {
            return currentCategory;
        }

        function cbGetIdea(ideaId) {

            if (currentIdeasMap) {
                return currentIdeasMap[ideaId];
            }
        }

        function renderView(exObj) {

            //region Extrahiere Renderdaten:
            var ideasToAppend = exObj.ideas;
            var isRenderNewIdeaList;
            if (exObj.isRenderNewIdeaList === false) {
                isRenderNewIdeaList = false;
            } else {
                isRenderNewIdeaList = true;
            }
            //endregion

            cbLocalizeView();

            if (isRenderNewIdeaList) {

                currentIdeaList = [];
                publishedLabels = [];
                htmlView.removeChild(document.querySelector('.ideaList_sections'));
                var htmlSections = document.createElement('div');
                htmlSections.classList.add('ideaList_sections');
                renderIdeaList(htmlSections, ideasToAppend);
                htmlView.appendChild(htmlSections);

            } else {

                var htmlSections = htmlView.querySelector('.ideaList_sections');
                renderIdeaList(htmlSections, ideasToAppend);
            }

            currentIdeaList.splice(currentIdeaList.length, 0, ideasToAppend);
            if (!currentIdeasMap) {
                createIdeasMap();
            } else {
                addToIdeasMap(ideasToAppend);
            }
        }

        function renderIdeaList(htmlList, ideaListToAppend) {

            var language = ideaWatcher.core.Localizer.getLanguage();
            //baue die IdeeElemente und füge sie zu oberstem div als section hinzu
            var publishedLabel = ideaWatcher.core.Localizer.IdeaList.Published[language];


            ideaListToAppend.forEach(function(idea){

                var ideaElement = document.createElement('div');
                ideaElement.classList.add('ideaList_ideaElement_div');

                var ideaName = document.createElement('header');
                ideaName.classList.add('ideaList_ideaName_header');

                var ideaDescription = document.createElement('div');
                ideaDescription.classList.add('ideaList_ideaDescription_div');

                // Komplette Zeile mit Idee-Daten (links: Anzahl Likes,
                // Followers, Comments und rechts: PublishDate)
                var dataRow = document.createElement('ul');
                dataRow.classList.add('ideaList_dataRow_ul');

                var dataLeft = document.createElement('li');
                dataLeft.classList.add('ideaList_leftData_li');
                dataLeft.style.float = 'left';
                // dataLeft.style.listStyle = 'none';

                var ratings = document.createElement('ul');

                var likes = document.createElement('li');
                var likeImage = document.createElement('img');
                likeImage.src = './resources/img/likeIcon.svg';
                likeImage.width = 20;
                likeImage.height = 20;
                var numberOfLikes = document.createElement('span');
                numberOfLikes.classList.add('ideaList_numberOfLikes_span');
                likes.appendChild(likeImage);
                likes.appendChild(numberOfLikes);

                var followers = document.createElement('li');
                var followersImage = document.createElement('img');
                followersImage.src = './resources/img/star_bright.svg';
                followersImage.width = 20;
                followersImage.height = 20;
                var numberOfFollowers = document.createElement('span');
                numberOfFollowers.classList.add('ideaList_numberOfFollowers_span');
                followers.appendChild(followersImage);
                followers.appendChild(numberOfFollowers);

                var comments = document.createElement('li');
                var commentsImage = document.createElement('img');
                commentsImage.src = './resources/img/comments_bright.svg';
                commentsImage.width = 20;
                commentsImage.height = 20;
                var numberOfComments = document.createElement('span');
                numberOfComments.classList.add('ideaList_numberOfComments_span');
                comments.appendChild(commentsImage);
                comments.appendChild(numberOfComments);

                ratings.appendChild(likes);
                ratings.appendChild(followers);
                ratings.appendChild(comments);

                dataLeft.appendChild(ratings);

                // PublishDate auf der rechten Seite:
                var dataRight = document.createElement('li');
                dataRight.classList.add('ideaList_RightData_li');
                dataRight.style.float = 'right';
                // dataRight.style.listStyle = 'none';

                var publishDate = document.createElement('span');
                publishDate.classList.add('ideaList_publishDate_span');
                publishedLabels.push(publishDate);
                dataRight.appendChild(publishDate);

                dataRow.appendChild(dataRight);
                dataRow.appendChild(dataLeft);


                ideaElement.appendChild(ideaName);
                ideaElement.appendChild(ideaDescription);
                ideaElement.appendChild(dataRow);

                // IdeaID in einem data-attribut speichern, damit später die
                // Idee zugeordnet werden kann:
                ideaElement.setAttribute('data-ideaid', idea.ideaId);

                // den Aktiviert-Status der Icons setzen
                setLikedState(likeImage);

                // Click-Event dranhängen, damit die IdeaDetails-View
                // aufgerufen werden kann
                ideaName.addEventListener('click', handleIdeaClickEvent);
                // und damit die Ideen geliked und gefollowed werden koennen
                likeImage.addEventListener('click', handleLikeClickEvent);
                followersImage.addEventListener('click', handleFollowClickEvent);

                htmlList.appendChild(ideaElement);

                ideaName.textContent = idea.name;
                ideaDescription.textContent = idea.description;
                numberOfLikes.textContent = idea.numberLikes;
                numberOfFollowers.textContent = idea.numberFollowers;
                numberOfComments.textContent = idea.numberComments;
                publishDate.textContent = publishedLabel + ': ' + idea.publishDate;
            });
        }

        function handleIdeaClickEvent(clickEvent) {

            //var ideaId = clickEvent.target.attributes.getNamedItem('data-ideaid').nodeValue;

            var ideaElement = getMyIdeaContainer(clickEvent.target);
            var ideaId = ideaElement.attributes.getNamedItem('data-ideaid').nodeValue;

            var exObj = Object.create(ideaWatcher.model.ExchangeObject.SwitchView);
            exObj.viewId = ideaWatcher.model.Navigation.ViewId.IDEADETAILS;
            exObj.viewUrl = ideaWatcher.model.Navigation.ViewUrl.IDEADETAILS;
            exObj.additionalData.ideaId = ideaId;

            ideaWatcher.core.Navigator.switchView(exObj);
        }

        /**
         * Gibt für das übergebene Element das übergeordnete IdeaElement_div zurück
         * @param element
         * @returns {*}
         */
        function getMyIdeaContainer (element) {
            while ((element = element.parentElement) && !element.classList.contains('ideaList_ideaElement_div'));
            return element;
        }

        function setLikedState(likeImage) {
            var ideaElement = getMyIdeaContainer(likeImage);
            var ideaId = ideaElement.attributes.getNamedItem('data-ideaid').nodeValue;

            var myIdea = cbGetIdea(ideaId);

        }

        function handleLikeClickEvent(clickEvent) {

            if (ideaWatcher.controller.UserSession.isUserLoggedIn()){
                var currentUser = ideaWatcher.controller.UserSession.getCurrentUserId();
                console.log(currentUser);
            } else {
                console.log("kein User angemeldet");
            }

            clickEvent.target.src = './resources/img/alreadyLiked.svg';
        }

        function handleFollowClickEvent(clickEvent) {

            clickEvent.target.src = './resources/img/alreadyFollowed.svg';
        }

        // Lade die nächsten Ideen, wenn ans Ende gescrollt
        document.addEventListener('scroll', function (event) {
            if (document.body.scrollTop > document.body.scrollHeight -
                window.innerHeight * 1.1) {

                if (ideaWatcher.core.Navigator.getCurrentView() ===
                    ideaWatcher.model.Navigation.ViewId.IDEALIST) {
                    showNextIdeas();
                }
            }
        });

        function showNextIdeas() {
            console.log('Zeige die nächsten ' + countIdeasPerRequest +
                ' Ideen des Typs "' + currentListType + '" der Kategorie "' +
                currentCategory + '"');

            var lengthIdeaList = currentIdeaList.length;
            ideaWatcher.controller.IdeaList
                .updateIdeaList(currentListType, currentCategory,
                   lengthIdeaList , lengthIdeaList + countIdeasPerRequest, false);
        }

        function createIdeasMap(ideasToAdd) {

            currentIdeasMap = {};
            for (var i = 0; i < ideasToAdd.length; i++) {

                var currentIdea = ideasToAdd[i];
                currentIdeasMap[currentIdea.ideaId] = currentIdea;
            }
        }

        function addToIdeasMap(ideasToAdd) {

            for (var i = 0; i < ideasToAdd.length; i++) {

                var currentIdea = ideasToAdd[i];
                var findIdea = currentIdeasMap[currentIdea.ideaId];
                if (!findIdea) {
                    currentIdeasMap[currentIdea.ideaId] = currentIdea;
                }
            }
        }

        return {

        };

    })();