ideaWatcher.view.IdeaDetails = ideaWatcher.view.IdeaDetails
		|| (function() {

			var idea = null;
			var htmlView = null;
			var htmlIdeaHeader = null;
			var htmlIdeaDescription = null;
			var htmlLikesSpan = null;
			var htmlLikeImg = null;
			var htmlFollowerImg = null;
			var htmlCommentTextInput = null;
			var htmlFollowerSpan = null;
			var htmlCommentsSpan = null;
			var htmlSubmitButton = null;
			var htmlOldCommentsSection = null;

			var currentIdea = null;

			var evLikeFollowResponse = {
				topic : 'SIdeaDetails/LikeFollowIdeaRequest-response',
				cbFunction : cbLikeFollowResponse
			};

			var evUserDataReceived = {
				topic: 'SIdea/getIdeaDetailsRequest',
				cbFunction: cbIdeaDetailsDataReceived
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

			// region subscribe to events
			ideaWatcher.core.MessageBroker.subscribe(evLikeFollowResponse);
			// endregion

			// region cbIni
			function cbIni() {
				console.log('Initialisiere UIConnector IdeaDetails');

				// region assign html elements
				htmlView = document.querySelector('.ideaDetails_view');
				htmlLikeImg = document.querySelector('#ideaDetails_like_img');
				htmlFollowerImg = document
						.querySelector('#ideaDetails_follower_img');
				htmlCommentTextInput = document
						.querySelector('#ideaDetails_comment_input');

				// endregion

				// region register Callbacks
				ideaWatcher.controller.IdeaDetails.registerShowView(cbShowView);
				// endregion

				//region submit new comment
				htmlView.onsubmit = function onSubmit(event) {

					event.preventDefault();

					if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
						var currentUserId = ideaWatcher.controller.UserSession
								.getCurrentUserId();
						// TODO: Kommentar abschicken
						var exObj = {
							userId : currentUserId,
							ideaId : currentIdea.ideaId,
							text : '' // Kommentartext
						};
						console.log('Kommentar wird im UIConnector abgeschickt.')
						//TODO: Hier muss noch die entsprechende Methode des Controllers aufgerufen werden
					} else {
						console.log("kein User angemeldet");
					}
				};
				// endregion
				
				// eventlisteners hinzufügen
				htmlLikeImg.addEventListener('click', changeLikeStatus);
				htmlFollowerImg.addEventListener('click', changeFollowerStatus);

				
			}
			// endregion

		
			function cbIdeaDetailsDataReceived(exObj) {
				if (exObj.result == 'success'){

					// var ideaDetailsObject = Object.create(ideaWatcher.model.Idea);
					// ideaDetailsObject.category = exObj.data.category;
					// //ideaDetailsObject.comments
					// //ideaDetailsObject.creator
					// ideaDetailsObject.description = exObj.data.description;
					// ideaDetailsObject.

					renderView(exObj.data)
				} else {
					var errorMessage = exObj.error;

					ideaWatcher.controller.GlobalNotification.showNotification(
						ideaWatcher.core.Localizer.IdeaDetails[language].ideaDetails,
						ideaWatcher.core.Localizer.IdeaDetails[language].errorMessage[errorMessage],
						5000);
				}
			}

			// region showView
			function cbShowView(obj) {
				if (obj.shouldShow) {

					// var idea = ideaWatcher.controller.IdeaDetails
					// 		.getIdea(obj.additionalData.ideaId);
					// currentIdea = idea;
					// renderView(idea);

					var ideaId = obj.additionalData.ideaId;
					ideaWatcher.controller.IdeaDetails.tryToLoadIdeaData(ideaId);

					// request losschicken

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
				var htmlContactLink = document
						.querySelector('#ideaDetails_contact_a');
				htmlContactLink.textContent = ideaWatcher.core.Localizer.ideaDetails[language].contact;

			}
			// endregion

			function cbGetIdeaResponse(response) {

				renderView(response.data.idea);
			}

			function changeLikeStatus() {

				if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
					var currentUserId = ideaWatcher.controller.UserSession
							.getCurrentUserId();

					if (htmlLikeImg.src == './resources/img/bulb_on.png') {
						htmlLikeImg.src = './resources/img/bulb_off.png';
						var exObj = {
							userId : currentUserId,
							ideaId : currentIdea.ideaId,
							action : 'unlike'
						};
					} else {
						htmlLikeImg.src = './resources/img/bulb_on.png';
						var exObj = {
							userId : currentUserId,
							ideaId : currentIdea.ideaId,
							action : 'like'
						};
					}
					console.log(exObj);
					ideaWatcher.controller.IdeaDetails
							.tryToChangeLikeFollow(exObj);
				} else {
					console.log("kein User angemeldet");
				}

			}

			function changeFollowerStatus() {
				if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
					var currentUserId = ideaWatcher.controller.UserSession
							.getCurrentUserId();

					if (htmlFollowerImg.src == '/resources/img/favorite_on.png') {
						htmlFollowerImg.src = './resources/img/favorite_off.png';
						var exObj = {
							userId : currentUserId,
							ideaId : currentIdea.ideaId,
							action : 'unfollow'
						};
					} else {
						htmlFollowerImg.src = './resources/img/favorite_on.png';
						var exObj = {
							userId : currentUserId,
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

				console.log('Starte erstellen der Detailansicht...');
				console.log(currentIdea);

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
				htmlLikeImg = document.querySelector('#ideaDetails_like_img');
				setLikeButtonPicture(htmlLikeImg, currentIdea);
				htmlLikeImg.dataset.ideaId = currentIdea.ideaId;
				// number of likes
				htmlLikesSpan = document
						.querySelector('#ideaDetails_likes_span');
				htmlLikesSpan.textContent = currentIdea.numberLikes;

				// starbutton
				htmlFollowerImg = document
						.querySelector('#ideaDetails_follower_img');
				setFollowerButtonPicture(htmlFollowerImg, currentIdea);
				htmlFollowerImg.dataset.ideaId = currentIdea.ideaId;
				// number of followers
				htmlFollowerSpan = document
						.querySelector('#ideaDetails_follower_span');
				htmlFollowerSpan.textContent = currentIdea.numberFollowers;
				// number of comments
				htmlCommentsSpan = document
						.querySelector('#ideaDetails_comments_span');
				htmlCommentsSpan.textContent = currentIdea.numberComments;

				// contactlink

				var htmlContactLink = document
						.querySelector('#ideaDetails_contact_a');
				if (creator.isMailPublic) {
					var mailaddress = creator.email;
					var mailto = 'mailto: ' + mailaddress;
					htmlContactLink.href = mailto;
				} else {
					htmlContactLink.style.display = 'none';
				}
				// set userPicture in new Comment section
				if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
					var currentUserId = ideaWatcher.controller.UserSession
							.getCurrentUserId();
					var htmlNewCommentForm = document
							.querySelector('#ideaDetails_newComment_form');
					htmlNewCommentForm.style.display = 'block';
					var htmlUserImage = document
							.querySelector('#ideaDetails_userPicture_img');
					if (creator.pictureUrl) {
						htmlUserImage.src = creator.pictureUrl;
					}
				} else {
					console.log('Kein Nutzer angemeldet.');
				}

				// list of old comments
				htmlOldCommentsSection = document
						.querySelector('#ideaDetails_existingComments_section');
				htmlOldCommentsSection.textContent = '';

				var comments = currentIdea.comments;

				if (comments) {

					comments.forEach(function(comment) {

						// div ideaDetails_CommentNameAndText_div
						var htmlOneCommentDiv = document.createElement('div');
						htmlOneCommentDiv.classList
								.add('ideaDetails_oneComment_div');
						// img comment.pictureUrl
						var htmlCommentImage = document.createElement('img');
						if (comment.pictureUrl) {
						htmlCommentImage.src = comment.pictureUrl;
						} else {
							htmlCommentImage.src = './resources/img/user.jpg'
						}
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

			function setLikeButtonPicture(htmlLikeImg, ideaObject) {
				if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
					var currentUser = ideaWatcher.controller.UserSession
							.getCurrentUserId();

					// wenn der Nutzer die Idee schon gelikt hat, dann zeige die
					// leuchtende Glühbirne, ansonsten die nicht leuchtende
					if (ideaObject.likeUsers.includes(currentUser)) {
						htmlLikeImg.src = './resources/img/bulb_on.png';
					} else {
						htmlLikeImg.src = './resources/img/bulb_off.png';
					}
				} else {

					htmlLikeImg.src = './resources/img/bulb_off.png';
				}
			}

			function setFollowerButtonPicture(htmlFollowerImg, ideaObject) {

				if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
					var currentUser = ideaWatcher.controller.UserSession
							.getCurrentUserId();

					// wenn der Nutzer der Idee schon folgt, soll der leuchtende
					// Stern angezeigt werden, ansonsten der nicht leuchtende
					if (ideaObject.followers.includes(currentUser)) {
						htmlFollowerImg.src = './resources/img/favorite_on.png';
					} else {
						htmlFollowerImg.src = './resources/img/favorite_off.png';
					}
				} else {

					htmlFollowerImg.src = './resources/img/favorite_off.png';
				}

			}

			function cbLikeFollowResponse(exObj) {

				var language = ideaWatcher.core.Localizer.getLanguage();

				if (exObj.result == 'success') {

					switch (exObj.data.action) {
					case 'like':
						htmlLikesSpan.textContent = exObj.data.newNumber;
						break;
					case 'follow':
						htmlFollowerSpan.textContent = exObj.data.newNumber;
						break;
					}
					// TODO Glühbirne ändern und Like Follows hochzaehlen
				} else {
					var errorMessage = exObj.error;

					var notificationType = ideaWatcher.model.GlobalNotificationType.ERROR;
					if (exObj.result == "warning") {
						notificationType = ideaWatcher.model.GlobalNotificationType.WARNING;
					}
					if (exObj.result == "info") {
						notificationType = ideaWatcher.model.GlobalNotificationType.INFO;
					}

					ideaWatcher.controller.GlobalNotification
							.showNotification(
									ideaWatcher.model.GlobalNotificationType.ERROR,
									ideaWatcher.core.Localizer.ideaDetails[language].ideaDetails,
									ideaWatcher.core.Localizer.ideaDetails[language].errorMessage[errorMessage],
									5000);
				}
			}

			return {

			};

		})();