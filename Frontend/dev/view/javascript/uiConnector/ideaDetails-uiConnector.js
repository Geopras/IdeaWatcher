ideaWatcher.view.IdeaDetails = ideaWatcher.view.IdeaDetails || (function() {

			var idea = null;
			var htmlView = null;
			var htmlIdeaHeader = null;
			var htmlIdeaDescription = null;
			var htmlLikesSpan = null;
			var htmlLikeImg = null;
			var htmlFollowerImg = null;
			var htmlCommentTextInput = null;
			var htmlFollowerSpan = null;
			var htmlIdeaCreator = null;
			var htmlIdeaCreatorName = null;
			var htmlCommentsSpan = null;
			var htmlSubmitButton = null;
			var htmlEditButton = null;
			var htmlDeleteIdeaButton = null;
			var htmlOldCommentsTable = null;
			var isLiked = null;
			var isFollowed = null;

			var currentIdea = null;

			var evUserDataReceived = {
				topic : 'SIdea/getIdeaDetailsRequest-response',
				cbFunction : cbIdeaDetailsDataReceived
			};
			// endregion

			// region registriere Callbacks beim Controller
			ideaWatcher.controller.IdeaDetails.registerInitializeView(cbIni);
			ideaWatcher.controller.IdeaDetails.registerShowView(cbShowView);
			ideaWatcher.controller.IdeaDetails
					.registerLocalizeView(cbLocalizeView);
			ideaWatcher.controller.IdeaDetails
					.registerGetIdeaResponse(cbGetIdeaResponse);
			ideaWatcher.controller.IdeaDetails
					.registerSaveCommentResponse(cbSaveCommentResponse);
			ideaWatcher.controller.IdeaDetails
					.registerDeleteCommentResponse(cbDeleteCommentResponse);
			ideaWatcher.controller.IdeaDetails
					.registerLikeFollowResponse(cbLikeFollowResponse);
			// endregion

			// region subscribe to events
			ideaWatcher.core.MessageBroker.subscribe(evUserDataReceived);
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
				htmlEditButton = document
						.querySelector('#ideaDetails_edit_img');
				htmlDeleteIdeaButton = document
						.querySelector('#ideaDetails_ideaDeleteButton_img');
				htmlIdeaCreator = document
						.querySelector('#ideaDetails_creator_span');
				htmlIdeaCreatorName = document
						.querySelector('#ideaDetails_creatorName_span');
				// endregion

				// region register Callbacks
				ideaWatcher.controller.IdeaDetails.registerShowView(cbShowView);
				// endregion

				// region submit new comment
				htmlView.onsubmit = function onSubmit(event) {

					event.preventDefault();

					if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
						var currentUserId = ideaWatcher.controller.UserSession
								.getCurrentUserId();
						// TODO: Kommentar abschicken
						
						var exObj = {
							userId : currentUserId,
							ideaId : currentIdea.ideaId,
							text : htmlCommentTextInput.value,
						};
						console.log(exObj);
						ideaWatcher.controller.IdeaDetails
								.tryToSaveComment(exObj);

						// TODO: Hier muss noch die entsprechende Methode des
						// Controllers aufgerufen werden
					} else {
						console.log("kein User angemeldet");
					}
				};
				// endregion

				// eventlisteners hinzufügen
				htmlLikeImg.addEventListener('click', changeLikeStatus);
				htmlFollowerImg.addEventListener('click', changeFollowerStatus);
				htmlEditButton.addEventListener('click', navigateToEditView);
				htmlDeleteIdeaButton.addEventListener('click', deleteIdea);

			}
			// endregion

			function cbIdeaDetailsDataReceived(exObj) {

				var language = ideaWatcher.core.Localizer.getLanguage();

				if (exObj.result == 'success') {

					var idea = exObj.data;

					renderView(idea);

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
									notificationType,
									ideaWatcher.core.Localizer.ideaDetails[language].ideaDetails,
									ideaWatcher.core.Localizer.ideaDetails[language].errorMessage[errorMessage],
									5000);
				}
			}

			// region showView
			function cbShowView(obj) {
				if (obj.shouldShow) {

					var ideaId = obj.additionalData.ideaId;
					ideaWatcher.controller.IdeaDetails
							.tryToLoadIdeaData(ideaId);

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
				htmlEditButton = document
						.querySelector('#ideaDetails_editIdea_button');
				htmlCommentDateText = document.querySelector('#ideaDetails_commentCreationDate_span');
				var locale = language.replace('_', '-');
				var dateObject = htmlCommentDateText.attributes.getNamedItem('data-comment-date').nodeValue;
				htmlCommentDateText.textContent = dateObject
						.toLocaleDateString(locale)
						+ ' '
						+ dateObject.toLocaleTimeString(locale);
				
				htmlIdeaCreator.textContent = ideaWatcher.core.Localizer.ideaDetails[language].creator;
				
				
			}
			// endregion

			function cbGetIdeaResponse(response) {

				renderView(response.data.idea);
			}

			function cbSaveCommentResponse(response) {
				var language = ideaWatcher.core.Localizer.getLanguage();

				if (response.result == 'success') {

					renderView(response.data.idea)
				} else {
					var errorMessage = response.error;

					var notificationType = ideaWatcher.model.GlobalNotificationType.ERROR;
					if (response.result == "warning") {
						notificationType = ideaWatcher.model.GlobalNotificationType.WARNING;
					}
					if (response.result == "info") {
						notificationType = ideaWatcher.model.GlobalNotificationType.INFO;
					}

					ideaWatcher.controller.GlobalNotification
							.showNotification(
									notificationType,
									ideaWatcher.core.Localizer.ideaDetails[language].ideaDetails,
									ideaWatcher.core.Localizer.ideaDetails[language].errorMessage[errorMessage],
									5000);
				}

			}

			function cbDeleteCommentResponse(response) {
				var language = ideaWatcher.core.Localizer.getLanguage();

				if (response.result == 'success') {

					renderView(response.data.idea)
				} else {
					var errorMessage = response.error;

					var notificationType = ideaWatcher.model.GlobalNotificationType.ERROR;
					if (response.result == "warning") {
						notificationType = ideaWatcher.model.GlobalNotificationType.WARNING;
					}
					if (response.result == "info") {
						notificationType = ideaWatcher.model.GlobalNotificationType.INFO;
					}

					ideaWatcher.controller.GlobalNotification
							.showNotification(
									notificationType,
									ideaWatcher.core.Localizer.ideaDetails[language].ideaDetails,
									ideaWatcher.core.Localizer.ideaDetails[language].errorMessage[errorMessage],
									5000);
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
									notificationType,
									ideaWatcher.core.Localizer.ideaDetails[language].ideaDetails,
									ideaWatcher.core.Localizer.ideaDetails[language].errorMessage[errorMessage],
									5000);
				}
			}

			function changeLikeStatus() {

				if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
					var currentUserId = ideaWatcher.controller.UserSession
							.getCurrentUserId();

					var creatorId = currentIdea.creator.userId;

					if (currentUserId !== creatorId) {

						if (isLiked) {
							htmlLikeImg.src = './resources/img/bulb_off.png';
							isLiked = false;
							var exObj = {
								userId : currentUserId,
								ideaId : currentIdea.ideaId,
								action : 'unlike'
							};
						} else {
							htmlLikeImg.src = './resources/img/bulb_on.png';
							isLiked = true;
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
						//User darf eigene Idee nicht liken.
					}

				} else {
					console.log("kein User angemeldet");
				}

			}

			function changeFollowerStatus() {
				if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
					var currentUserId = ideaWatcher.controller.UserSession
							.getCurrentUserId();

					var creatorId = currentIdea.creator.userId;

					if (currentUserId !== creatorId) {

						if (isFollowed) {
							htmlFollowerImg.src = './resources/img/favorite_off.png';
							isFollowed = false;
							var exObj = {
								userId : currentUserId,
								ideaId : currentIdea.ideaId,
								action : 'unfollow'
							};
						} else {
							htmlFollowerImg.src = './resources/img/favorite_on.png';
							isFollowed = true;
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
						//User darf eigener Idee nicht folgen.
					}
				} else {
					console.log("kein User angemeldet");
				}

			}

			function deleteComment(clickEvent) {

				var currentCommentId = clickEvent.target.attributes
						.getNamedItem('data-comment-id').nodeValue;
				var currentIdeaId = clickEvent.target.attributes
						.getNamedItem('data-idea-id').nodeValue;

				var exObj = {
					commentId : currentCommentId,
					ideaId : currentIdeaId,
				};

				console.log(exObj);

				ideaWatcher.controller.IdeaDetails.tryToDeleteComment(exObj);

			}

			function navigateToEditView(clickEvent) {
				var ideaId = clickEvent.target.attributes
						.getNamedItem('data-idea-id').nodeValue;

				if (currentIdea.likeUsers.length === 0) {
					// Wenn noch nicht geliked wurde, dann Editieren zulassen
					ideaWatcher.controller.IdeaList.tryToEditIdea(ideaId);
				} else {

					var language = ideaWatcher.core.Localizer.getLanguage();

					ideaWatcher.controller.GlobalNotification.showNotification(
						ideaWatcher.model.GlobalNotificationType.WARNING,
						ideaWatcher.core.Localizer.IdeaList.Notification[language].infoMessage.editNotPossibleHeader,
						ideaWatcher.core.Localizer.IdeaList.Notification[language].infoMessage.editNotPossibleMessage,
						5000);
				}
			}
			
			function deleteIdea(clickEvent) {
				var ideaId = clickEvent.target.attributes
						.getNamedItem('data-idea-id').nodeValue;
				ideaWatcher.controller.IdeaDetails.tryToDeleteIdea(ideaId);
			}

			function renderView(crtIdea) {

				var language = ideaWatcher.core.Localizer.getLanguage();

				console.log('Starte erstellen der Detailansicht...');
				currentIdea = crtIdea;

				// htmlEditButton und deleteIdeaButton sollen nur angezeigt
				// werden, wenn es sich um die
				// Idee des Nutzers handelt
				htmlEditButton = document
						.querySelector('#ideaDetails_edit_img');
				htmlEditButton.style.display = 'none';

				htmlDeleteIdeaButton = document
						.querySelector('#ideaDetails_ideaDeleteButton_img');
				htmlDeleteIdeaButton.src = './resources/img/deleteButton1.svg';
				htmlDeleteIdeaButton.style.display = 'none';

				htmlIdeaCreatorName.textContent = currentIdea.creator.userName;

				// Flag isOwnIdea bestimmen
				var isOwnIdea = false;

				if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
					var currentUserId = ideaWatcher.controller.UserSession
							.getCurrentUserId();

					if (currentIdea.creator.userId == currentUserId) {
						isOwnIdea = true;
					}
				} else {
					// kein User angemeldet
				}

				currentIdea = crtIdea;

				htmlView = document.querySelector('.ideaDetails_view');
				var creator = currentIdea.creator;

				// header
				htmlIdeaHeader = document
						.querySelector('#ideaDetails_ideaHeader_h1');
				htmlIdeaHeader.textContent = currentIdea.name;
				// description
				htmlIdeaDescription = document
						.querySelector('#ideaDetails_description_div');
				htmlIdeaDescription.style.whiteSpace = 'pre-wrap';
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
					htmlContactLink.style.display = 'inline';
				} else {
					htmlContactLink.style.display = 'none';
				}

				if (isOwnIdea) {
					htmlLikeImg.style.cursor = 'default';
					htmlFollowerImg.style.cursor = 'default';
					htmlEditButton.style.display = 'inline';
					htmlEditButton.dataset.ideaId = currentIdea.ideaId;
					htmlDeleteIdeaButton.style.display = 'inline';
					htmlDeleteIdeaButton.dataset.ideaId = currentIdea.ideaId;
				}

				var htmlNewCommentForm = document
				.querySelector('#ideaDetails_newComment_form');
				
				// set userPicture in new Comment section
				if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
					var currentUserId = ideaWatcher.controller.UserSession
							.getCurrentUserId();	
					htmlNewCommentForm.style.display = 'block';
					var htmlUserImage = document
							.querySelector('#ideaDetails_userPicture_img');
					if (creator.pictureUrl) {
						htmlUserImage.src = creator.pictureUrl;
					}
				} else {
					htmlNewCommentForm.style.display = 'none';
					
				}

				htmlCommentTextInput.value = '';

				// list of old comments
				htmlOldCommentsTable = document
						.querySelector('#ideaDetails_existingComments_table');
				while (htmlOldCommentsTable.firstChild) {
					htmlOldCommentsTable
							.removeChild(htmlOldCommentsTable.firstChild);
				}

				var comments = currentIdea.comments;

				if (comments) {

					comments.reverse();
					comments
							.forEach(function(comment) {

								// flag isOwnComment
								var isOwnComment = false;

								if (ideaWatcher.controller.UserSession
										.isUserLoggedIn()) {
									var currentUserId = ideaWatcher.controller.UserSession
											.getCurrentUserId();

									if (comment.userId == currentUserId) {
										isOwnComment = true;
									}
								} else {
									// kein User angemeldet
								}

								// create new table row
								var htmlOneCommentRow = document
										.createElement('tr');

								// create datacell for img, text and button
								var htmlCommentImgCell = document
										.createElement('td');
								htmlCommentImgCell.classList
										.add('ideaDetails_commentImage_td');
								var htmlCommentTextCell = document
										.createElement('td');
								htmlCommentTextCell.classList
										.add('ideaDetails_commentText_td');
								var htmlCommentDeleteButtonCell = document
										.createElement('td');
								htmlCommentDeleteButtonCell.classList
										.add('ideaDetails_commentDeleteButton_td');

								// create img and add to datacell for img
								var htmlCommentImage = document
										.createElement('img');
								if (comment.pictureUrl) {
									htmlCommentImage.src = comment.pictureUrl;
								} else {
									htmlCommentImage.src = './resources/img/user.jpg'
								}
								htmlCommentImage.style.width = '30px';
								htmlCommentImage.style.height = '30px';

								htmlCommentImgCell
										.appendChild(htmlCommentImage);

								// create name and text and add to datacell for
								// text
								var htmlCommentNameAndTextDiv = document
										.createElement('div');
								var htmlCommentNameBold = document
										.createElement('b');
								htmlCommentNameBold.textContent = comment.userName;
								var htmlCreationDateText = document
										.createElement('span');
								htmlCreationDateText.id = 'ideaDetails_commentCreationDate_span';
								var dateObject = new Date(comment.publishDate);
								htmlCreationDateText.dataset.commentDate = dateObject;
								var htmlCommentTextDiv = document
										.createElement('div');
								htmlCommentTextDiv.style.whiteSpace = 'pre-wrap';
								htmlCommentTextDiv.textContent = comment.text;

								htmlCommentNameAndTextDiv
										.appendChild(htmlCommentNameBold);
								htmlCommentNameAndTextDiv
										.appendChild(htmlCreationDateText);
								htmlCommentNameAndTextDiv.appendChild(document
										.createElement('br'));
								htmlCommentNameAndTextDiv
										.appendChild(htmlCommentTextDiv);

								htmlCommentTextCell
										.appendChild(htmlCommentNameAndTextDiv);

								// create deleteButton and add to datacell for
								// button
								if (isOwnComment) {
									var htmlCommentDeleteButton = document
											.createElement('img');
									htmlCommentDeleteButton.id = ('ideaDetails_deleteCommentButton_img');
									htmlCommentDeleteButton.src = './resources/img/deleteButton1.svg';
									htmlCommentDeleteButton.dataset.commentId = comment.commentId;
									htmlCommentDeleteButton.dataset.ideaId = currentIdea.ideaId;
									htmlCommentDeleteButton.addEventListener(
											'click', deleteComment);

									htmlCommentDeleteButtonCell
											.appendChild(htmlCommentDeleteButton);
								}

								htmlOneCommentRow
										.appendChild(htmlCommentImgCell);
								htmlOneCommentRow
										.appendChild(htmlCommentTextCell);
								htmlOneCommentRow
										.appendChild(htmlCommentDeleteButtonCell);

								htmlOldCommentsTable
										.appendChild(htmlOneCommentRow);

							});
				}

				cbLocalizeView();
			}

			function setLikeButtonPicture(htmlLikeImg, ideaObject) {
				if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
					var currentUser = ideaWatcher.controller.UserSession
							.getCurrentUserId();
					
					htmlLikeImg.style.cursor = 'pointer';

					// wenn der Nutzer die Idee schon gelikt hat, dann zeige die
					// leuchtende Glühbirne, ansonsten die nicht leuchtende
					if (ideaObject.likeUsers.includes(currentUser)) {
						htmlLikeImg.src = './resources/img/bulb_on.png';
						isLiked = true;
					} else {
						htmlLikeImg.src = './resources/img/bulb_off.png';
						isLiked = false;
					}
				} else {
					htmlLikeImg.style.cursor = 'default';
					htmlLikeImg.src = './resources/img/bulb_off.png';
				}
			}

			function setFollowerButtonPicture(htmlFollowerImg, ideaObject) {

				if (ideaWatcher.controller.UserSession.isUserLoggedIn()) {
					var currentUser = ideaWatcher.controller.UserSession
							.getCurrentUserId();

					htmlFollowerImg.style.cursor = 'pointer';
					
					// wenn der Nutzer der Idee schon folgt, soll der leuchtende
					// Stern angezeigt werden, ansonsten der nicht leuchtende
					if (ideaObject.followers.includes(currentUser)) {
						htmlFollowerImg.src = './resources/img/favorite_on.png';
						isFollowed = true;
					} else {
						htmlFollowerImg.src = './resources/img/favorite_off.png';
						isFollowed = false;
					}
				} else {
					htmlFollowerImg.style.cursor = 'default';
					htmlFollowerImg.src = './resources/img/favorite_off.png';
				}

			}

			return {

			};

		})();