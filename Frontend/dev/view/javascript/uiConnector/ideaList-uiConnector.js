ideaWatcher.view.IdeaList = ideaWatcher.view.IdeaList || (function () {

        //region local vars
        var header = null;
        var htmlIdeaListView = null;
        var htmlMyIdeasView = null;
        var htmlMyFollowedIdeasView = null;
        var htmlProfileView = null;
        var htmlIdeaListHeader = null;
        var htmlMyIdeasHeader = null;
        var htmlMyFollowedIdeasHeader = null;
        var htmlIdeaListSections = null;
        var htmlMyIdeasSections = null;
        var htmlMyFollowedIdeasSections = null;
        var htmlCreateIdeaButton = null;
        var currentIdeasMap = {};
        var countIdeasPerRequest = 10;
        var publishedLabels = [];

        //endregion

        //region register Callbacks am Controller
        ideaWatcher.controller.IdeaList.registerInitializeView(cbIni);
        ideaWatcher.controller.IdeaList.registerShowView(cbShowView);
        ideaWatcher.controller.IdeaList.registerLocalizeView(cbLocalizeView);
        ideaWatcher.controller.IdeaList.registerGetIdeasResponse(cbGetIdeasResponse);
        ideaWatcher.controller.IdeaList.registerGetIdea(cbGetIdea);
        //endregion

        //region Callback-Functions
        //region cbIni
        function cbIni()
        {
            console.log('Initialisiere UIConnector IdeaList');

            //region initialize html
            htmlIdeaListView = document.querySelector('.ideaList_view');
            htmlMyIdeasView = document.querySelector('.myIdeas_view');
            htmlMyFollowedIdeasView = document.querySelector('.myFollowedIdeas_view');
            header = document.querySelector('.ideaList_header_h1');
            htmlIdeaListHeader = document.querySelector('.ideaList_header_h1');
            htmlProfileView = document.querySelector('.profile_view');
            htmlMyIdeasHeader = document.querySelector('.myIdeas_header_h1');
            htmlMyFollowedIdeasHeader = document.querySelector('.myFollowedIdeas_header_h1');
            htmlIdeaListSections = document.querySelector('.ideaList_sections');
            htmlMyIdeasSections = document.querySelector('.myIdeas_sections');
            htmlMyFollowedIdeasSections = document.querySelector('.myFollowedIdeas_sections');
            htmlCreateIdeaButton = document.querySelector('.myIdeas_createNewIdea_button');
            htmlCreateIdeaButton.addEventListener('click', handleCreateIdeaClickEvent);
            //endregion
        }
        //endregion

        function cbShowView(exObj) {

            if(exObj.shouldShow)
            {
                var responseData = Object.create(ideaWatcher.model.ExchangeObject
                    .IdeaList.ResponseData);
                responseData.listType = exObj.additionalData.listType;
                responseData.category = exObj.additionalData.category;
                responseData.ideas = exObj.additionalData.ideas;
                responseData.isReachedEnd = exObj.additionalData.isReachedEnd;
                responseData.isRenderNewIdeaList = exObj.additionalData.isRenderNewIdeaList;

                renderView(responseData);

                switch (responseData.listType) {
                    case (ideaWatcher.model.IdeaList.ListType.MYIDEAS):
                        htmlProfileView.style.display = 'block';
                        htmlIdeaListView.style.display = 'none';
                        htmlMyIdeasView.style.display = 'block';
                        htmlMyFollowedIdeasView.style.display = 'none';
                        break;
                    case (ideaWatcher.model.IdeaList.ListType.MYFOLLOWEDIDEAS):
                        htmlProfileView.style.display = 'block';
                        htmlIdeaListView.style.display = 'none';
                        htmlMyIdeasView.style.display = 'none';
                        htmlMyFollowedIdeasView.style.display = 'block';
                        break;
                    default:
                        htmlProfileView.style.display = 'none';
                        htmlIdeaListView.style.display = 'block';
                        htmlMyIdeasView.style.display = 'none';
                        htmlMyFollowedIdeasView.style.display = 'none';
                }
            }
            else
            {
                htmlProfileView.style.display = 'none';
                htmlIdeaListView.style.display = 'none';
                htmlMyIdeasView.style.display = 'none';
                htmlMyFollowedIdeasView.style.display = 'none';
            }
        }

        //region Callback localizeView
        function cbLocalizeView() {

            console.log("Starte Lokalisierung der IdeaList-View ...");

            var language = ideaWatcher.core.Localizer.getLanguage();

            if (header) {

                var listType = ideaWatcher.controller.IdeaList.getCurrentClickedListType();
                var category = ideaWatcher.controller.IdeaList.getCurrentClickedCategory();

                switch (listType) {
                    case (ideaWatcher.model.IdeaList.ListType.MYIDEAS):
                        header = htmlMyIdeasHeader;
                        break;
                    case (ideaWatcher.model.IdeaList.ListType.MYFOLLOWEDIDEAS):
                        header = htmlMyFollowedIdeasHeader;
                        break;
                    default:
                        header = htmlIdeaListHeader;
                }

                header.textContent = ideaWatcher.core.Localizer
                    .IdeaList[listType][category][language]
                    .header;
            }
            if (htmlCreateIdeaButton) {
                htmlCreateIdeaButton.textContent = ideaWatcher.core.Localizer.IdeaList.CreateNewIdeaButtonLabel[language];
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

        //region Response-Callbacks
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

            var listType = response.data.listType;
            var category = response.data.category;

            if (!currentIdeasMap || response.data.isRenderNewIdeaList) {
                createCurrentIdeasMap(response.data.ideas);
            } else {
                addToCurrentIdeasMap()
            }

            var exObj = ideaWatcher.model.ExchangeObject.SwitchView;
            exObj.viewId = ideaWatcher.model.Navigation.ViewId[listType][category];
            exObj.viewUrl = ideaWatcher.model.Navigation.ViewUrl[listType][category];
            exObj.additionalData = response.data;
            ideaWatcher.core.Navigator.switchView(exObj);
        }

        function cbDeleteIdeaResponse(response) {

            var language = ideaWatcher.core.Localizer.getLanguage();
            // Nach Ergebnis sehen:
            var result = response.result;
            var ideaId = response.data.ideaId;

            if (result !== 'success') {

                ideaWatcher.controller.GlobalNotification.showNotification(
                    ideaWatcher.model.GlobalNotificationType.ERROR,
                    ideaWatcher.core.Localizer.IdeaList.DeleteIdea[language].errorMessage.header,
                    ideaWatcher.core.Localizer.IdeaList.DeleteIdea[language].errorMessage[response.errorMessage],
                    5000);
                return;
            }

            // Wenn erfolgreich, dann Ideenliste neu abfragen
            var listType = ideaWatcher.controller.IdeaList.getCurrentClickedListType();
            var category = ideaWatcher.controller.IdeaList.getCurrentClickedCategory();

            // Liste neu abfragen
            ideaWatcher.controller.IdeaList
                .updateIdeaList(listType, category, 1,
                    Object.keys(currentIdeasMap).length - 1, true);

        }
        //endregion

        function cbGetIdea(ideaId) {

            if (currentIdeasMap) {
                return currentIdeasMap[ideaId];
            }
        }
        //endregion

        //region Render-Funktionen

        function renderView(ideaListData) {

            var htmlParentNode;
            var htmlSectionsClassName;
            var htmlSections;
            if (ideaListData.listType === ideaWatcher.model.IdeaList.ListType.MYIDEAS) {
                htmlParentNode = document.querySelector('.myIdeas_view');
                htmlSections = document.querySelector('.myIdeas_sections');

            } else if (ideaListData.listType === ideaWatcher.model.IdeaList.ListType.MYFOLLOWEDIDEAS) {
                htmlParentNode = document.querySelector('.myFollowedIdeas_view');
                htmlSections = document.querySelector('.myFollowedIdeas_sections');
            } else {
                htmlParentNode = document.querySelector('.ideaList_view');
                htmlSections = document.querySelector('.ideaList_sections');
            }
            htmlSectionsClassName = htmlSections.className;

            var isMyIdeas = false;
            if (ideaListData.listType === ideaWatcher.model.IdeaList.ListType.MYIDEAS) {
                isMyIdeas = true;
            }
            if (ideaListData.isRenderNewIdeaList) {

                publishedLabels = [];
                htmlParentNode.removeChild(htmlSections);
                htmlSections = document.createElement('div');
                htmlSections.classList.add(htmlSectionsClassName);
                renderIdeaList(htmlSections, ideaListData.ideas, isMyIdeas);
                htmlParentNode.appendChild(htmlSections);

            } else {
                renderIdeaList(htmlSections, ideaListData.ideas, isMyIdeas);
            }
            cbLocalizeView();
        }

        function renderIdeaList(htmlList, ideaList, isMyIdeas) {

            var language = ideaWatcher.core.Localizer.getLanguage();
            //baue die IdeeElemente und füge sie zu oberstem div als section hinzu
            var publishedLabel = ideaWatcher.core.Localizer.IdeaList.Published[language];

            ideaList.forEach(function (idea) {

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

                var ratings = document.createElement('ul');

                var likes = document.createElement('li');
                var likeImage = document.createElement('img');
                likeImage.classList.add('ideaList_likeButton');
                likeImage.src = './resources/img/likeIcon.svg';
                likeImage.width = 20;
                likeImage.height = 20;
                var numberOfLikes = document.createElement('span');
                numberOfLikes.classList.add('ideaList_numberOfLikes_span');
                likes.appendChild(likeImage);
                likes.appendChild(numberOfLikes);

                var followers = document.createElement('li');
                var followersImage = document.createElement('img');
                followersImage.classList.add('ideaList_followButton');
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

                if (isMyIdeas) {

                    var userButtons = document.createElement('li');

                    var editButtonImage = document.createElement('img');
                    editButtonImage.classList.add('ideaList_user_button');
                    editButtonImage.src = './resources/img/editButton2.svg';
                    editButtonImage.width = 20;
                    editButtonImage.height = 20;
                    editButtonImage.addEventListener('click', handleEditButton);

                    var deleteButtonImage = document.createElement('img');
                    deleteButtonImage.classList.add('ideaList_user_button');
                    deleteButtonImage.src = './resources/img/deleteButton1.svg';
                    deleteButtonImage.width = 20;
                    deleteButtonImage.height = 20;
                    deleteButtonImage.addEventListener('click', handleDeleteButton);

                    userButtons.appendChild(editButtonImage);
                    userButtons.appendChild(deleteButtonImage);

                    userButtons.setAttribute('data-ideaid', idea.ideaId);
                    ratings.appendChild(userButtons);
                }

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
                ideaName.setAttribute('data-ideaid', idea.ideaId);
                likeImage.setAttribute('data-ideaid', idea.ideaId);
                followersImage.setAttribute('data-ideaid', idea.ideaId);

                // den Aktiviert-Status der Icons setzen
                setLikedState(likeImage);
                setFollowState(followersImage);

                // Click-Event dranhängen, damit die IdeaDetails-View
                // aufgerufen werden kann
                ideaName.addEventListener('click', handleIdeaClickEvent);

                htmlList.appendChild(ideaElement);

                ideaName.textContent = idea.name;
                ideaDescription.textContent = getShortDescription(idea.description);
                numberOfLikes.textContent = idea.numberLikes;
                numberOfFollowers.textContent = idea.numberFollowers;
                numberOfComments.textContent = idea.numberComments;
                publishDate.textContent = publishedLabel + ': ' + idea.publishDate;
            });
        }

        //endregion

        //region EventHandler
        // ClickEventHandler für CreateNewIdeaButton
        function handleCreateIdeaClickEvent(clickEvent) {

            ideaWatcher.controller.IdeaList.navigateToCreateIdeaView();
        }

        function handleIdeaClickEvent(clickEvent) {

            var ideaId = clickEvent.target.attributes.getNamedItem('data-ideaid').nodeValue;

            var exObj = Object.create(ideaWatcher.model.ExchangeObject.SwitchView);
            exObj.viewId = ideaWatcher.model.Navigation.ViewId.IDEADETAILS;
            exObj.viewUrl = ideaWatcher.model.Navigation.ViewUrl.IDEADETAILS;
            exObj.additionalData.ideaId = ideaId;

            ideaWatcher.core.Navigator.switchView(exObj);
        }

        function handleEditButton(clickEvent) {

            var ideaId = clickEvent.target.parentNode.attributes.getNamedItem('data-ideaid').nodeValue;
            ideaWatcher.controller.IdeaList.tryToEditIdea(ideaId);
        }

        function handleDeleteButton(clickEvent) {

            var ideaId = clickEvent.target.parentNode.attributes.getNamedItem('data-ideaid').nodeValue;
            ideaWatcher.controller.IdeaList.tryToDeleteIdea(ideaId);
        }

        //endregion

        //region Hilfsfunktionen

        function setLikedState(likeImage) {
            var ideaId = likeImage.attributes.getNamedItem('data-ideaid').nodeValue;

            var ideaObject = cbGetIdea(ideaId);

            if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
                var currentUser = ideaWatcher.controller.UserSession
                    .getCurrentUserId();
                // wenn der Nutzer die Idee schon gelikt hat, dann zeige die
                // leuchtende Glühbirne, ansonsten die nicht leuchtende
                if (ideaObject.likeUsers.includes(currentUser)) {
                    likeImage.src = './resources/img/bulb_on.png';
                } else {
                    likeImage.src = './resources/img/bulb_off.png';
                }
            } else {
                likeImage.src = './resources/img/bulb_off.png';
            }
        }

        function setFollowState(followImage) {
            var ideaId = followImage.attributes.getNamedItem('data-ideaid').nodeValue;

            var ideaObject = cbGetIdea(ideaId);

            if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
                var currentUser = ideaWatcher.controller.UserSession
                    .getCurrentUserId();
                // wenn der Nutzer der Idee schon folgt, soll der leuchtende
                // Stern angezeigt werden, ansonsten der nicht leuchtende
                if (ideaObject.followers.includes(currentUser)) {
                    followImage.src = './resources/img/favorite_on.png';
                } else {
                    followImage.src = './resources/img/favorite_off.png';
                }
            } else {
                followImage.src = './resources/img/favorite_off.png';
            }
        }

        // Lade die nächsten Ideen, wenn ans Ende gescrollt
        document.addEventListener('scroll', function (event) {
            if (document.body.scrollTop > document.body.scrollHeight -
                window.innerHeight * 1.1) {

                var currentView = ideaWatcher.core.Navigator.getCurrentView();
                if (currentView === ideaWatcher.model.Navigation.ViewId.HOT.NONE ||
                    currentView === ideaWatcher.model.Navigation.ViewId.MYIDEAS.NONE ||
                    currentView === ideaWatcher.model.Navigation.ViewId.MYFOLLOWEDIDEAS.NONE) {
                    showNextIdeas();
                }
            }
        });

        function showNextIdeas() {

            var listType = ideaWatcher.controller.IdeaList.getCurrentClickedListType();
            var category = ideaWatcher.controller.IdeaList.getCurrentClickedCategory();
            console.log('Zeige die nächsten ' + countIdeasPerRequest +
                ' Ideen des Typs "' + listType + '" der Kategorie "' +
                category + '"');

            var lengthIdeaList = Object.keys(currentIdeasMap).length;
            ideaWatcher.controller.IdeaList
                .updateIdeaList(listType, category,
                   lengthIdeaList , lengthIdeaList + countIdeasPerRequest, false);
        }

        function createCurrentIdeasMap(ideasToAdd) {

            currentIdeasMap = {};
            for (var i = 0; i < ideasToAdd.length; i++) {

                var currentIdea = ideasToAdd[i];
                currentIdeasMap[currentIdea.ideaId] = currentIdea;
            }
        }

        function addToCurrentIdeasMap(ideasToAdd) {

            for (var i = 0; i < ideasToAdd.length; i++) {

                var currentIdea = ideasToAdd[i];
                var findIdea = currentIdeasMap[currentIdea.ideaId];
                if (!findIdea) {
                    currentIdeasMap[currentIdea.ideaId] = currentIdea;
                }
            }
        }

        function getShortDescription(description) {

            if (description.length > 200) {
                var shortText = description.substring(0, 200) + '...';
                return shortText;
            } else {
                return description;
            }
        }
        //endregion

        return {

        };

    })();