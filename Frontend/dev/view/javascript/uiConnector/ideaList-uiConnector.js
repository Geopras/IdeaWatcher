ideaWatcher.view.IdeaList = ideaWatcher.view.IdeaList || (function () {

    //region local vars
    // Event Globale Initialisierung
    var evIni = {
        topic: 'internal/ini',
        cbFunction: cbIni
    };

    var htmlIdeaHeader = null;
    var htmlIdeaDescription = null;
    var numberOfLikes = null;
    var numberOfFollowers = null;
    var numberOfComments = null;
    var ideaList = null;
    //endregion

    //region subscribe to events
    ideaWatcher.core.MessageBroker.subscribe(evIni);
    //endregion

    //region cbIni
    function cbIni()
    {
        console.log('Initialisiere UIConnector IdeaList');

                //endregion

        var idea1 = {
          		name:'Testname1',
          		description:'description Test1',
          		likes: 5,
          		follower: 7,
          		comments: 14
          }
          var idea2 = {
          		name:'Testname2',
          		description:'description Test2',
          		likes: 4,
          		follower:8,
          		comments:4
          }
          var listIdeas = [idea1,idea2];
          cbRenderList(listIdeas);
          
        //region register Callbacks
        ideaWatcher.controller.IdeaList.registerShowView(cbShowView);
        ideaWatcher.controller.IdeaList.registerRenderList(cbRenderList);
        //endregion 
        
    }
    //endregion

    function cbRenderList(itemList) {
      
      //baue die IdeeElemente und füge sie zu oberstem div als section hinzu
     
      htmlView = document.querySelector('.ideaList_view_div');
     
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
          likeImage.src = './resources//img/gluehbirne.png';
          likeImage.width = 20;
          likeImage.height = 20;
          var numberOfLikes = document.createElement('span');
          numberOfLikes.classList.add('ideaList_numberOfLikes_span');
          likes.appendChild(likeImage);
          likes.appendChild(numberOfLikes);
          
          var followers = document.createElement('li');
          followers.textContent = 'Followers: ';
          var numberOfFollowers = document.createElement('span');
          numberOfFollowers.classList.add('ideaList_numberOfFollowers_span');
          followers.appendChild(numberOfFollowers);
          
          var comments = document.createElement('li');
          comments.textContent = 'Comments: ';
          var numberOfComments = document.createElement('span');
          numberOfComments.classList.add('ideaList_numberOfComments_span');
          comments.appendChild(numberOfComments);
          
          ratings.appendChild(likes);
          ratings.appendChild(followers);
          ratings.appendChild(comments);
         
          ideaElement.appendChild(ideaName);
          ideaElement.appendChild(ideaDescription);
          
          htmlView.appendChild(ideaElement);
          htmlView.appendChild(ratings);
          
          ideaName.textContent = item.name;
          ideaDescription.textContent = item.description;
          
          numberOfLikes.textContent = item.likes;
          
          numberOfFollowers.textContent = item.follower;
          numberOfComments.textContent = item.comments;
	
      });    	
    }
    
    //region showView
    function cbShowView(obj)
    {
        if(obj.shouldShow)
        {
            htmlView.style.display = 'block';
        }
        else
        {
            htmlView.style.display = 'none';
        }
    }
    //endregion


    return {

    };

})();