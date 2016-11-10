ideaWatcher.view.component.IdeaList = ideaWatcher.view.component.IdeaList || (function () {

    //region local vars
    // Event Globale Initialisierung
    
    var htmlList = null;
    var htmlIdeaHeader = null;
    var htmlIdeaDescription = null;
    var numberOfLikes = null;
    var numberOfFollowers = null;
    var numberOfComments = null;
    var ideaList = null;
    //endregion
        

    function cbRenderList(itemList) {

        // localization:
        var language = ideaWatcher.core.Localizer.getLanguage();
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
          
            var followers = document.createElement('li');
            followers.textContent = ideaWatcher.core.Localizer.IdeaList[language].followers;
            var numberOfFollowers = document.createElement('span');
            numberOfFollowers.classList.add('ideaList_numberOfFollowers_span');
            followers.appendChild(numberOfFollowers);
          
            var comments = document.createElement('li');
            comments.textContent = ideaWatcher.core.Localizer.IdeaList[language].comments;
            var numberOfComments = document.createElement('span');
            numberOfComments.classList.add('ideaList_numberOfComments_span');
            comments.appendChild(numberOfComments);
          
            ratings.appendChild(likes);
            ratings.appendChild(followers);
            ratings.appendChild(comments);
         
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
    
    return {
    	renderList : cbRenderList
    }; 

})();