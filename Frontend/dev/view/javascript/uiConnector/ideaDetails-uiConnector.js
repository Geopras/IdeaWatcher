ideaWatcher.view.IdeaDetails = ideaWatcher.view.IdeaDetails
		|| (function() {

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

			var currentIdea = null;


		var evLikeFollowResponse = {
			topic: 'SIdeaDetails/LikeFollowIdeaRequest-response',
			cbFunction: cbLikeFollowResponse
		};
			// endregion

			// region registriere Callbacks beim Controller
			ideaWatcher.controller.IdeaDetails.registerInitializeView(cbIni);
			ideaWatcher.controller.IdeaDetails.registerShowView(cbShowView);
			ideaWatcher.controller.IdeaDetails
					.registerLocalizeView(cbLocalizeView);
			ideaWatcher.controller.IdeaDetails
					.registerGetIdeaResponse(cbGetIdeaResponse);
			// endregion

		//region subscribe to events
		ideaWatcher.core.MessageBroker.subscribe(evLikeFollowResponse);
		//endregion

			// region cbIni
			function cbIni() {
				console.log('Initialisiere UIConnector IdeaDetails');

				// region assign html elements
				htmlView = document.querySelector('.ideaDetails_view');
				htmlLikeButton = document
						.querySelector('#ideaDetails_like_button');
				htmlFollowerButton = document
						.querySelector('#ideaDetails_follower_button');
				htmlCommentTextInput = document
						.querySelector('#ideaDetails_comment_input');

				// endregion

				// region register Callbacks
				// wam.logic.Login.registerVerificationError(cbShowVerificationError);
				ideaWatcher.controller.IdeaDetails.registerShowView(cbShowView);
				// endregion

				// --> eventuell umbauen für Abschicken des Kommentars
				htmlView.onsubmit = function onSubmit(event) {

					event.preventDefault();
				};

				// eventlisteners hinzufügen
				htmlLikeButton.addEventListener('click', changeLikeStatus);
				htmlFollowerButton.addEventListener('click',
						changeFollowerStatus);

				// endregion
			}
			// endregion

			// region showView
			function cbShowView(obj) {
				if (obj.shouldShow) {

					var idea = ideaWatcher.controller.IdeaDetails
							.getIdea(obj.additionalData.ideaId);
					currentIdea = idea;
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

				if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
					var currentUser = ideaWatcher.controller.UserSession
							.getCurrentUserId();
					
					if (htmlLikeButton.style.backgroundImage == 'url("./resources/img/bulb_on.png")') {
						htmlLikeButton.style.backgroundImage = 'url("./resources/img/bulb_off.png")';
						var exObj = {
							userId : currentUser.userId,
							ideaId : currentIdea.ideaId,
							action : 'unlike'
						};
					} else {
						htmlLikeButton.style.backgroundImage = 'url("./resources/img/bulb_on.png")';
						var exObj = {
							userId : currentUser.userId,
							ideaId : currentIdea.ideaId,
							sdjfdsjfn : 'like'
						};
					}
					console.log(exObj);
					ideaWatcher.controller.IdeaDetails.tryToChangeLikeFollow(exObj);
				} else {
					console.log("kein User angemeldet");
				}

			}

			function changeFollowerStatus() {
				if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
					var currentUser = ideaWatcher.controller.UserSession
							.getCurrentUserId();
					
					if (htmlFollowerButton.style.backgroundImage == 'url("./resources/img/favorite_on.png")') {
						htmlFollowerButton.style.backgroundImage = 'url("./resources/img/favorite_off.png")';
						var exObj = {
							userId : currentUser.username,
							ideaId : currentIdea.ideaId,
							action : 'unfollow'
						};
					} else {
						htmlFollowerButton.style.backgroundImage = 'url("./resources/img/favorite_on.png")';
						var exObj = {
							userId : currentUser.username,
							ideaId : currentIdea.ideaId,
							action : 'follow'
						};
					}
					console.log(exObj);

					ideaWatcher.controller.IdeaDetails
							.tryToChangeLikeFollow(exObj);
				} else {
					console.log("kein User angemeldet");
				}

			}

			function renderView(currentIdea) {

				console.log('Starte erstellen der Liste...');

				htmlView = document.querySelector('.ideaDetails_view');
				var creator = currentIdea.creator;

				// header
				htmlIdeaHeader = document
						.querySelector('#ideaDetails_ideaHeader_h1');
				htmlIdeaHeader.textContent = currentIdea.name;
				// description
				htmlIdeaDescription = document
						.querySelector('#ideaDetails_description_div');
				htmlIdeaDescription.textContent = currentIdea.description;
				// iconbar

				// likebutton
				htmlLikeButton = document
						.querySelector('#ideaDetails_like_button');
				setLikeButtonPicture(htmlLikeButton, currentIdea);
				// number of likes
				htmlLikesSpan = document
						.querySelector('#ideaDetails_likes_span');
				htmlLikesSpan.textContent = currentIdea.numberLikes;

				// starbutton
				htmlFollowerButton = document
						.querySelector('#ideaDetails_follower_button');
				setFollowerButtonPicture(htmlFollowerButton, currentIdea);
				// number of followers
				htmlFollowerSpan = document
						.querySelector('#ideaDetails_follower_span');
				htmlFollowerSpan.textContent = currentIdea.numberFollowers;
				// number of comments
				htmlCommentsSpan = document
						.querySelector('#ideaDetails_comments_span');
				htmlCommentsSpan.textContent = currentIdea.numberComments;

				// contactlink

				var mailaddress = creator.email;
				var mailto = 'mailto: ' + mailaddress;
				var htmlContactLink = document
						.querySelector('#ideaDetails_contact_a');
				htmlContactLink.href = mailto;
				// set userPicture in new Comment section
				var htmlUserImage = document
						.querySelector('#ideaDetails_userPicture_img');
				if (creator.pictureUrl) {
					htmlUserImage.src = creator.pictureUrl;
				}

				// list of old comments
				htmlOldCommentsSection = document
						.querySelector('#ideaDetails_existingComments_section');

				var comments = currentIdea.comments;

				if (comments) {

					comments.forEach(function(comment) {

						// div ideaDetails_CommentNameAndText_div
						var htmlOneCommentDiv = document.createElement('div');
						htmlOneCommentDiv.classList
								.add('ideaDetails_oneComment_div');
						// img comment.pictureUrl
						var htmlCommentImage = document.createElement('img');
						htmlCommentImage.src = comment.pictureUrl;
						htmlCommentImage.style.width = '30px';
						htmlCommentImage.style.height = '30px';
						// div ohne klasse
						var htmlCommentNameAndTextDiv = document
								.createElement('div');

						// div ideaDetails_CommentName_div
						var htmlCommentNameDiv = document.createElement('div');
						htmlCommentNameDiv.classList
								.add('ideaDetails_CommentName_div');
						htmlCommentNameDiv.textContent = comment.userName;
						// div ideaDetails_CommentText_div
						var htmlCommentTextDiv = document.createElement('div');
						htmlCommentTextDiv.classList
								.add('ideaDetails_CommentText_div');
						htmlCommentTextDiv.textContent = comment.text;
						// append 2 divs to div
						htmlCommentNameAndTextDiv
								.appendChild(htmlCommentNameDiv);
						htmlCommentNameAndTextDiv
								.appendChild(htmlCommentTextDiv);

						// append img und div zu div
						htmlOneCommentDiv.appendChild(htmlCommentImage);
						htmlOneCommentDiv
								.appendChild(htmlCommentNameAndTextDiv);

						// append div zu oldOldComments
						htmlOldCommentsSection.appendChild(htmlOneCommentDiv);
					});

					// append all elements to section
					// append all elements to view
					htmlView.appendChild(htmlOldCommentsSection);
				}

				cbLocalizeView();
			}

			function setLikeButtonPicture(htmlLikeButton, ideaObject) {
				if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
					var currentUser = ideaWatcher.controller.UserSession
							.getCurrentUserId();
					
					// wenn der Nutzer die Idee schon gelikt hat, dann zeige die
					// leuchtende Glühbirne, ansonsten die nicht leuchtende
					if (ideaObject.likeUsers.includes(currentUser)) {
						htmlLikeButton.style.backgroundImage = 'url("./resources/img/bulb_on.png")';
					} else {
						htmlLikeButton.style.backgroundImage = 'url("./resources/img/bulb_off.png")';
					}
				} else {
					
					htmlLikeButton.style.backgroundImage = 'url("./resources/img/bulb_off.png")';
				}
			}

			function setFollowerButtonPicture(htmlFollowerButton, ideaObject) {

				if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
					var currentUser = ideaWatcher.controller.UserSession
							.getCurrentUserId();
					
					// wenn der Nutzer der Idee schon folgt, soll der leuchtende
					// Stern angezeigt werden, ansonsten der nicht leuchtende
					if (ideaObject.followers.includes(currentUser)) {
						htmlFollowerButton.style.backgroundImage = 'url("./resources/img/favorite_on.png")';
					} else {
						htmlFollowerButton.style.backgroundImage = 'url("./resources/img/favorite_off.png")';
					}
				} else {
					
					htmlFollowerButton.style.backgroundImage = 'url("./resources/img/favorite_off.png")';
				}

			}
			
			function cbLikeFollowResponse(exObj) {
				if (exObj.result == 'success'){

					//TODO Glühbirne ändern und Like Follows hochzaehlen
				} else {
					var errorMessage = exObj.error;

					var notificationType = ideaWatcher.model.GlobalNotificationType.ERROR;
					if (exObj.result == "warning"){
						notificationType = ideaWatcher.model.GlobalNotificationType.WARNING;
					}
					if (exObj.result == "info"){
						notificationType = ideaWatcher.model.GlobalNotificationType.INFO;
					}

					ideaWatcher.controller.GlobalNotification.showNotification(
						ideaWatcher.model.GlobalNotificationType.ERROR,
						ideaWatcher.core.Localizer.ideaDetails[language].ideaDetails,
						ideaWatcher.core.Localizer.ideaDetails[language].errorMessage[errorMessage],
						5000);
				}
			}

			return {

			};

		})();