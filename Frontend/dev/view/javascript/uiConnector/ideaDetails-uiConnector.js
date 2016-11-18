ideaWatcher.view.IdeaDetails = ideaWatcher.view.IdeaDetails
		|| (function VIdeaDetails() {

			// region local vars
			// Event Globale Initialisierung
			var evIni = {
				topic : 'internal/ini',
				cbFunction : cbIni
			};

			var evLocalizeView = {
				topic : 'localizeView/ideaDetails',
				cbFunction : localizeView
			};

			var idea = null;
			var htmlView = null;
			var htmlIdeaHeader = null;
			var htmlIdeaDescription = null;
			var htmlLikeButton = null;
			var htmlFollowerButton = null;
			var htmlSubmitButton = null;

			// endregion

			// region subscribe to events
			ideaWatcher.core.MessageBroker.subscribe(evIni);
			ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
			// endregion

			// region cbIni
			function cbIni() {
				console.log('Initialisiere UIConnector IdeaDetails');

				// region assign html elements
				
				htmlLikeButton = document
						.querySelector('#ideaDetails_like_button');
				htmlFollowerButton = document
						.querySelector('#ideaDetails_follower_button');
				
				// endregion

				// region register Callbacks
				// wam.logic.Login.registerVerificationError(cbShowVerificationError);
				ideaWatcher.controller.IdeaDetails.registerShowView(cbShowView);
				// endregion

				// region override onSubmit to prevent page reload

				// --> eventuell umbauen für Abschicken des Kommentars
				// htmlFormSignup.onsubmit = function onSubmit(event) {
				//
				// event.preventDefault();
				//            
				// if(!checkEqualPassword()) return;
				// if(!checkValidPassword()) return;
				//
				// var exObj = {
				// userName: htmlUsernameInput.value,
				// password: htmlPasswordInput.value,
				// email: htmlEmailInput.value
				// };
				// console.log(exObj);
				//
				// ideaWatcher.controller.Signup.tryToSignup(exObj);
				// };

				// eventlisteners hinzufügen
				htmlLikeButton.addEventListener('click', changeImageLike);
				htmlFollowerButton.addEventListener('click',
						changeImageFollower);

				localizeView();

				var otherUser = ideaWatcher.model.User;
				otherUser.username = 'Erika Mustermann';
//				otherUser.pictureUrl = '';
				
				var comment1 = ideaWatcher.model.Comment;
				comment1.userName = otherUser.username ;
				comment1.pictureUrl = './resources/img/user.jpg';
				comment1.createDate = new Date();
				comment1.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis turpis eu eleifend finibus. Praesent non nisi tempor, imperdiet diam eu, tincidunt ex. Morbi laoreet sollicitudin faucibus. Praesent vitae velit blandit nunc posuere vehicula. Etiam sed augue quam. In hendrerit dictum nullam. ';
				
				var user = ideaWatcher.model.User;
				user.username = 'a';
				user.email = 'a@c.de';
				user.isMailPublic = true;
				user.pictureUrl = './resources/img/gluehbirneLeuchtet.png';
				
				var ideaObject = ideaWatcher.model.Idea;
				ideaObject.name = 'TestObjekt Idee';
				ideaObject.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis turpis eu eleifend finibus. Praesent non nisi tempor, imperdiet diam eu, tincidunt ex. Morbi laoreet sollicitudin faucibus. Praesent vitae velit blandit nunc posuere vehicula. Etiam sed augue quam. In hendrerit dictum nullam. ';
				ideaObject.creator = user;
				ideaObject.publishDate = new Date();
				ideaObject.likeUsers = [otherUser];
				ideaObject.numberLikes = 15;
				ideaObject.followers = [otherUser];
				ideaObject.numberFollowers = 5;
				ideaObject.comments = [ comment1, comment1 ];
				ideaObject.numberComments = 2;

				// region: ich geb mal was beim Start von außen rein
				var obj = {
					viewId : 'IdeaDetails',
					url : 'IdeaDetails',
					additionalData : {
						ideaobject : ideaObject
					}
				}
				renderView(obj);
				// endregion
			}
			// endregion

			// region showView
			function cbShowView(obj) {
				if (obj.shouldShow) {
					obj: {
						additionalData: {
							ideaobject: ideaObject
						}
					}

					renderView(obj);
					localizeView();
					htmlView.style.display = 'block';
				} else {
					htmlView.style.display = 'none';
				}
			}
			// endregion

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

			// region localizeView
			function localizeView() {

				console.log("Starte Lokalisierung der IdeaDetails-View ...");
				var language = ideaWatcher.core.Localizer.getLanguage();

				htmlSubmitButton = document
						.querySelector('#ideaDetails_commentSubmit_button');
				htmlSubmitButton.value = ideaWatcher.core.Localizer.ideaDetails[language].submit;

			}
			// endregion

			function renderView(obj) {

				console.log('Starte erstellen der Liste...');
				
				htmlView = document.querySelector('.ideaDetails_view');
				
				//header
				htmlIdeaHeader = document.querySelector('#ideaDetails_ideaHeader_h1');
				htmlIdeaHeader.textContent = obj.additionalData.ideaobject.name;
				//description
				htmlIdeaDescription = document.querySelector('#ideaDetails_description_div');
				htmlIdeaDescription.textContent = obj.additionalData.ideaobject.description;
				//iconbar
					
					//likebutton
					htmlLikeButton = document.querySelector('#ideaDetails_like_button');
					setLikeButtonPicture(htmlLikeButton);
					//number of likes
					htmlLikesSpan = document.querySelector('#ideaDetails_likes_span');
					htmlLikesSpan.textContent = obj.additionalData.ideaobject.numberLikes;
					
					//starbutton
					htmlFollowerButton = document.querySelector('#ideaDetails_follower_button');
					setLikeButtonPicture(htmlFollowerButton);
					//number of followers
					htmlFollowerSpan = document.querySelector('#ideaDetails_follower_span');
					htmlFollowerSpan.textContent = obj.additionalData.ideaobject.numberFollowers;
					//number of comments
					htmlCommentsSpan = document.querySelector('#ideaDetails_comments_span');
					htmlCommentsSpan.textContent = obj.additionalData.ideaobject.numberComments;

					//contactlink
					var creator = obj.additionalData.ideaobject.creator;
					var mailaddress = creator.email;
					var mailto = 'mailto: ' + mailaddress;
					var htmlContactLink = document.querySelector('#ideaDetails_contact_a');
					htmlContactLink.href = mailto;
				//set userPicture in new Comment section
					var htmlUserImage = document.querySelector('#ideaDetails_userPicture_img');
					htmlUserImage.src = creator.pictureUrl;
				//list of old comments
				htmlOldCommentsSection = document.querySelector('#ideaDetails_existingComments_section');	
				
				var comments = obj.additionalData.ideaobject.comments;
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
				
				
				htmlLikeButton.addEventListener('click', changeImageLike);
				htmlFollowerButton.addEventListener('click',
						changeImageFollower);
			}
			
			function setLikeButtonPicture(htmlLikeButton) {
				//wenn der Nutzer die Idee schon gelikt hat, dann zeige die leuchtende Glühbirne, ansonsten die nicht leuchtende
			}

			function setLikeButtonPicture(htmlFollowerButton) {
				// wenn der Nutzer der Idee schon folgt, soll der leuchtende Stern angezeigt werden, ansonsten der nicht leuchtende
			}
			
			return {

			};

		})();