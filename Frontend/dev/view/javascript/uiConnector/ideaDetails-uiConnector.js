ideaWatcher.view.IdeaDetails = ideaWatcher.view.IdeaDetails || (function VIdeaDetails() {

    //region local vars
    // Event Globale Initialisierung
    var evIni = {
        topic: 'internal/ini',
        cbFunction: cbIni
    };

    var evLocalizeView = {
        topic: 'localizeView/ideaDetails',
        cbFunction: localizeView
    };

    var htmlView = null;
    var htmlLikeButton = null;
    var htmlFollowerButton = null;
    var htmlSubmitButton = null;
    
    //endregion

    //region subscribe to events
    ideaWatcher.core.MessageBroker.subscribe(evIni);
    ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
    //endregion

    //region cbIni
    function cbIni()
    {
        console.log('Initialisiere UIConnector IdeaDetails');

        //region assign html elements
        htmlView = document.querySelector('.ideaDetails_view');
        htmlLikeButton = document.querySelector('#ideaDetails_like_button');
        htmlFollowerButton = document.querySelector('#ideaDetails_follower_button');
        htmlSubmitButton = document.querySelector('#ideaDetails_commentSubmit_button');
        //endregion

        //region register Callbacks
        // wam.logic.Login.registerVerificationError(cbShowVerificationError);
        ideaWatcher.controller.IdeaDetails.registerShowView(cbShowView);
        //endregion

        // region override onSubmit to prevent page reload
        
//        --> eventuell umbauen für Abschicken des Kommentars
//        htmlFormSignup.onsubmit = function onSubmit(event) {
//
//            event.preventDefault();
//            
//            if(!checkEqualPassword()) return;
//            if(!checkValidPassword()) return;
//
//            var exObj = {
//                userName: htmlUsernameInput.value,
//                password: htmlPasswordInput.value,
//                email: htmlEmailInput.value
//            };
//            console.log(exObj);
//
//            ideaWatcher.controller.Signup.tryToSignup(exObj);
//        };
  
//        	eventlisteners hinzufügen
        htmlLikeButton.addEventListener('click', changeImageLike);
        htmlFollowerButton.addEventListener('click', changeImageFollower);
        
        localizeView();
        // endregion
    }
    //endregion

    
    //region showView
    function cbShowView(obj)
    {
        if(obj.shouldShow)
        {
            localizeView();
            htmlView.style.display = 'block';
        }
        else
        {
            htmlView.style.display = 'none';
        }
    }
    //endregion

    function changeImageLike() {
    	if (htmlLikeButton.style.backgroundImage == 'url("./resources/img/gluehbirneLeuchtet.png")') {
    		htmlLikeButton.style.backgroundImage = 'url("./resources/img/gluehbirneAus.png")';
    	} else {
    		htmlLikeButton.style.backgroundImage = 'url("./resources/img/gluehbirneLeuchtet.png")';
    	}
    }
    
    function changeImageFollower() {
    	
    	if (htmlFollowerButton.style.backgroundImage == 'url("./resources/img/sternAn.jpg")') {
    		htmlFollowerButton.style.backgroundImage = 'url("./resources/img/sternAus.jpg")';
    	} else {
    		htmlFollowerButton.style.backgroundImage = 'url("./resources/img/sternAn.jpg")';
    	}
    }
    
    //region localizeView
    function localizeView() {

        console.log("Starte Lokalisierung der IdeaDetails-View ...");
        var language = ideaWatcher.core.Localizer.getLanguage();
        
        htmlSubmitButton = document.querySelector('#ideaDetails_commentSubmit_button');
        htmlSubmitButton.value = ideaWatcher.core.Localizer.ideaDetails[language].submit;
       
    }
    //endregion


    return {

    };

})();