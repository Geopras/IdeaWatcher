ideaWatcher.view.IdeaDetails = ideaWatcher.view.IdeaDetails || (function () {

		var idea = null;
		var htmlView = null;
		var htmlIdeaHeader = null;
		var htmlIdeaDescription = null;
		var htmlLikesSpan = null;
		var htmlLikeButton = null;
		var htmlFollowerButton = null;
		var htmlCommentTextInput = null;
		var htmlFollowerSpan = null;
		var htmlCommentsSpan = null;
		var htmlSubmitButton = null;
		var htmlOldCommentsSection = null;

		var currentUser = null;
		var currentIdea = null;

		// endregion

		//region registriere Callbacks beim Controller
		ideaWatcher.controller.IdeaDetails.registerInitializeView(cbIni);
		ideaWatcher.controller.IdeaDetails.registerShowView(cbShowView);
		ideaWatcher.controller.IdeaDetails.registerLocalizeView(cbLocalizeView);
		ideaWatcher.controller.IdeaDetails.registerGetIdeaResponse(cbGetIdeaResponse);
		// endregion

		// region cbIni
		function cbIni() {
			console.log('Initialisiere UIConnector IdeaDetails');

			// region assign html elements
			htmlView = document.querySelector('.ideaDetails_view');
			htmlLikeButton = document
					.querySelector('#ideaDetails_like_button');
			htmlFollowerButton = document
					.querySelector('#ideaDetails_follower_button');
			htmlCommentTextInput = document.querySelector('#ideaDetails_comment_input');

			// endregion

			// region register Callbacks
			// wam.logic.Login.registerVerificationError(cbShowVerificationError);
			ideaWatcher.controller.IdeaDetails.registerShowView(cbShowView);
			// endregion


			// --> eventuell umbauen für Abschicken des Kommentars
			htmlView.onsubmit = function onSubmit(event) {

			 event.preventDefault();

			 var exObj = {
			 userName: currentUser.username,
			 text: htmlCommentTextInput.value
			 };
			 console.log(exObj);

			 ideaWatcher.controller.IdeaDetails.tryToComment(exObj);
			 };

			// eventlisteners hinzufügen
			htmlLikeButton.addEventListener('click', changeLikeStatus);
			htmlFollowerButton.addEventListener('click',
					changeFollowerStatus);

//			var otherUser = ideaWatcher.model.User;
//			var creator = Object.create(otherUser);
//			currentUser = Object.create(otherUser);
//			otherUser.username = 'Erika Mustermann';
////				otherUser.pictureUrl = '';
//
//			creator.username = 'a';
//			creator.email = 'a@c.de';
//			creator.isMailPublic = true;
//			creator.pictureUrl = './resources/img/gluehbirneLeuchtet.png';
//
////				var currentUser =  ideaWatcher.controller.Login.getUserId();
//			currentUser.username = 'Andi';
//
//			var comment1 = ideaWatcher.model.Comment;
//			comment1.userName = otherUser.username ;
//			comment1.pictureUrl = './resources/img/user.jpg';
//			comment1.createDate = new Date();
//			comment1.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis turpis eu eleifend finibus. Praesent non nisi tempor, imperdiet diam eu, tincidunt ex. Morbi laoreet sollicitudin faucibus. Praesent vitae velit blandit nunc posuere vehicula. Etiam sed augue quam. In hendrerit dictum nullam. ';
//
//			var ideaObject = ideaWatcher.model.Idea;
//			ideaObject.ideaId = '936DA01F-9ABD-4D9D-80C7-02AF85C822A8';
//			ideaObject.name = 'TestObjekt Idee';
//			ideaObject.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis turpis eu eleifend finibus. Praesent non nisi tempor, imperdiet diam eu, tincidunt ex. Morbi laoreet sollicitudin faucibus. Praesent vitae velit blandit nunc posuere vehicula. Etiam sed augue quam. In hendrerit dictum nullam. ';
//			ideaObject.creator = creator;
//			ideaObject.publishDate = new Date();
//			ideaObject.likeUsers = [otherUser];
//			ideaObject.numberLikes = 15;
//			ideaObject.followers = [otherUser];
//			ideaObject.numberFollowers = 5;
//			ideaObject.comments = [ comment1, comment1 ];
//			ideaObject.numberComments = 2;

			// region: ich geb mal was beim Start von außen rein
//			renderView(ideaObject);
			// endregion
		}
		// endregion

		// region showView
		function cbShowView(obj) {
			if (obj.shouldShow) {

				var idea = ideaWatcher.controller.IdeaDetails.getIdea(obj.additionalData.ideaId);
				renderView(idea);
				htmlView.style.display = 'block';
			} else {
				htmlView.style.display = 'none';
			}
		}
		// endregion

		// region localizeView
		function cbLocalizeView() {

			console.log("Starte Lokalisierung der IdeaDetails-View ...");
			var language = ideaWatcher.core.Localizer.getLanguage();

			htmlSubmitButton = document
				.querySelector('#ideaDetails_commentSubmit_button');
			htmlSubmitButton.value = ideaWatcher.core.Localizer.ideaDetails[language].submit;

		}
		// endregion

		function cbGetIdeaResponse(response) {

			renderView(response.data.idea);
		}

		function changeLikeStatus() {

			if (htmlLikeButton.style.backgroundImage == 'url("./resources/img/gluehbirneLeuchtet.png")') {
				htmlLikeButton.style.backgroundImage = 'url("./resources/img/gluehbirneAus.png")';
				var exObj = {
						 userId: currentUser.username,
						 ideaId:  currentIdea.ideaId,
						 action: 'unlike'
						 };
			} else {
				htmlLikeButton.style.backgroundImage = 'url("./resources/img/gluehbirneLeuchtet.png")';
				var exObj = {
						 userId: currentUser.username,
						 ideaId: currentIdea.ideaId,
						 action: 'like'
						 };
			}
			console.log(exObj);
			ideaWatcher.controller.IdeaDetails.tryToChangeLike(exObj);
		}

		function changeFollowerStatus() {

			if (htmlFollowerButton.style.backgroundImage == 'url("./resources/img/sternAn.jpg")') {
				htmlFollowerButton.style.backgroundImage = 'url("./resources/img/sternAus.jpg")';
				var exObj = {
						 userId: currentUser.username,
						 ideaId:  currentIdea.ideaId,
						 action: 'unfollow'
						 };
			} else {
				htmlFollowerButton.style.backgroundImage = 'url("./resources/img/sternAn.jpg")';
				var exObj = {
						 userId: currentUser.username,
						 ideaId:  currentIdea.ideaId,
						 action: 'follow'
						 };
			}
			console.log(exObj);

			ideaWatcher.controller.IdeaDetails.tryToChangeFollower(exObj);
		}



		function renderView(currentIdea) {

			console.log('Starte erstellen der Liste...');

			htmlView = document.querySelector('.ideaDetails_view');
			var creator = currentIdea.creator;

			//header
			htmlIdeaHeader = document.querySelector('#ideaDetails_ideaHeader_h1');
			htmlIdeaHeader.textContent = currentIdea.name;
			//description
			htmlIdeaDescription = document.querySelector('#ideaDetails_description_div');
			htmlIdeaDescription.textContent = currentIdea.description;
			//iconbar

			//likebutton
			htmlLikeButton = document.querySelector('#ideaDetails_like_button');
			setLikeButtonPicture(htmlLikeButton, currentIdea);
			//number of likes
			htmlLikesSpan = document.querySelector('#ideaDetails_likes_span');
			htmlLikesSpan.textContent = currentIdea.numberLikes;

			//starbutton
			htmlFollowerButton = document.querySelector('#ideaDetails_follower_button');
			setFollowerButtonPicture(htmlFollowerButton, currentIdea);
			//number of followers
			htmlFollowerSpan = document.querySelector('#ideaDetails_follower_span');
			htmlFollowerSpan.textContent = currentIdea.numberFollowers;
			//number of comments
			htmlCommentsSpan = document.querySelector('#ideaDetails_comments_span');
			htmlCommentsSpan.textContent = currentIdea.numberComments;

			//contactlink

			var mailaddress = creator.email;
			var mailto = 'mailto: ' + mailaddress;
			var htmlContactLink = document.querySelector('#ideaDetails_contact_a');
			htmlContactLink.href = mailto;
			//set userPicture in new Comment section
			var htmlUserImage = document.querySelector('#ideaDetails_userPicture_img');
			htmlUserImage.src = creator.pictureUrl;
			//list of old comments
			htmlOldCommentsSection = document.querySelector('#ideaDetails_existingComments_section');

			var comments = currentIdea.comments;

			if (comments) {
				
				comments.forEach(function(comment){
	
					//div ideaDetails_CommentNameAndText_div
					var htmlOneCommentDiv = document.createElement('div');
					htmlOneCommentDiv.classList.add('ideaDetails_oneComment_div');
					//img comment.pictureUrl
					var htmlCommentImage = document.createElement('img');
					htmlCommentImage.src = comment.pictureUrl;
					htmlCommentImage.style.width = '30px';
					htmlCommentImage.style.height = '30px';
					//div ohne klasse
					var htmlCommentNameAndTextDiv = document.createElement('div');
	
					//div ideaDetails_CommentName_div
					var htmlCommentNameDiv = document.createElement('div');
					htmlCommentNameDiv.classList.add('ideaDetails_CommentName_div');
					htmlCommentNameDiv.textContent = comment.userName;
					//div ideaDetails_CommentText_div
					var htmlCommentTextDiv = document.createElement('div');
					htmlCommentTextDiv.classList.add('ideaDetails_CommentText_div');
					htmlCommentTextDiv.textContent = comment.text;
					//append 2 divs to div
					htmlCommentNameAndTextDiv.appendChild(htmlCommentNameDiv);
					htmlCommentNameAndTextDiv.appendChild(htmlCommentTextDiv);
	
					//append img und div zu div
					htmlOneCommentDiv.appendChild(htmlCommentImage);
					htmlOneCommentDiv.appendChild(htmlCommentNameAndTextDiv);
	
					//append div zu oldOldComments
					htmlOldCommentsSection.appendChild(htmlOneCommentDiv);
				});
	
				//append all elements to section
				//append all elements to view
				htmlView.appendChild(htmlOldCommentsSection);
			}

			cbLocalizeView();
		}

		function setLikeButtonPicture(htmlLikeButton, ideaObject) {
			//wenn der Nutzer die Idee schon gelikt hat, dann zeige die leuchtende Glühbirne, ansonsten die nicht leuchtende
			if (ideaObject.likeUsers.includes(currentUser)) {
				htmlLikeButton.style.backgroundImage = 'url("./resources/img/gluehbirneLeuchtet.png")';
			} else {
				htmlLikeButton.style.backgroundImage = 'url("./resources/img/gluehbirneAus.png")';
			}
		}

		function setFollowerButtonPicture(htmlFollowerButton, ideaObject) {
			// wenn der Nutzer der Idee schon folgt, soll der leuchtende Stern angezeigt werden, ansonsten der nicht leuchtende
			if (ideaObject.followers.includes(currentUser)) {
				htmlFollowerButton.style.backgroundImage = 'url("./resources/img/sternAn.jpg")';
			} else {
				htmlFollowerButton.style.backgroundImage = 'url("./resources/img/sternAus.jpg")';
			}
		}

		return {

		};

	})();