// ideaWatcher.view.component.IdeaItemList = ideaWatcher.view.component.IdeaItemList || (function () {
//
//     //region local vars
//     // Event Globale Initialisierung
//
//     var htmlList = null;
//     var htmlFollowersLabel = null;
//     var htmlCommentsLabel = null;
//
//
//     //endregion
//
//
//     function cbRenderList(itemList) {
//
//         var language = ideaWatcher.core.Localizer.getLanguage();
//         //baue die IdeeElemente und füge sie zu oberstem div als section hinzu
//
//         htmlList = document.createElement('div');
//
//         itemList.forEach(function(item){
//       	    var ideaElement = document.createElement('section');
//             ideaElement.classList.add('ideaList_ideaElement_section');
//
//             var ideaName = document.createElement('header');
//             ideaName.classList.add('ideaList_ideaName_header');
//
//             var ideaDescription = document.createElement('div');
//             ideaDescription.classList.add('ideaList_ideaDescription_div')
//
//             var ratings = document.createElement('ul');
//             ratings.classList.add('ideaList_ratings_ul')
//
//             var likes = document.createElement('li');
//             var likeImage = document.createElement('img');
//             likeImage.src = './resources/img/gluehbirne.png';
//             likeImage.width = 20;
//             likeImage.height = 20;
//             var numberOfLikes = document.createElement('span');
//             numberOfLikes.classList.add('ideaList_numberOfLikes_span');
//             likes.appendChild(likeImage);
//             likes.appendChild(numberOfLikes);
//
//             htmlFollowersLabel = document.createElement('li');
//             htmlFollowersLabel.textContent = ideaWatcher.core.Localizer.IdeaList.GLOBAL[language].followers;
//             var numberOfFollowers = document.createElement('span');
//             numberOfFollowers.classList.add('ideaList_numberOfFollowers_span');
//             htmlFollowersLabel.appendChild(numberOfFollowers);
//
//             htmlCommentsLabel = document.createElement('li');
//             htmlCommentsLabel.textContent = ideaWatcher.core.Localizer.IdeaList.GLOBAL[language].comments;
//             var numberOfComments = document.createElement('span');
//             numberOfComments.classList.add('ideaList_numberOfComments_span');
//             htmlCommentsLabel.appendChild(numberOfComments);
//
//             ratings.appendChild(likes);
//             ratings.appendChild(htmlFollowersLabel);
//             ratings.appendChild(htmlCommentsLabel);
//
//             ideaElement.appendChild(ideaName);
//             ideaElement.appendChild(ideaDescription);
//
//             htmlList.appendChild(ideaElement);
//             htmlList.appendChild(ratings);
//
//             ideaName.textContent = item.name;
//             ideaDescription.textContent = item.description;
//
//             numberOfLikes.textContent = item.likes;
//             numberOfFollowers.textContent = item.follower;
//             numberOfComments.textContent = item.comments;
//       });
//         return htmlList;
//     }
//
//     function pubLocalize() {
//
//         var language = ideaWatcher.core.Localizer.getLanguage();
//         htmlCommentsLabel.textContent = ideaWatcher.core.Localizer.IdeaList.GLOBAL[language].comments;
//         htmlFollowersLabel.textContent = ideaWatcher.core.Localizer.IdeaList.GLOBAL[language].followers;
//     }
//
//     return {
//     	renderList : cbRenderList,
//         localize: pubLocalize
//     };
//
// })();