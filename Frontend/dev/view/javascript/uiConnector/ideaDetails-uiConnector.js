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
				otherUser.username = 'x';
//				otherUser.pictureUrl = '';
				
				var comment1 = ideaWatcher.model.Comment;
				comment1.userName = otherUser.username ;
				comment1.pictureUrl = '';
				comment1.createDate = new Date();
				comment1.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis turpis eu eleifend finibus. Praesent non nisi tempor, imperdiet diam eu, tincidunt ex. Morbi laoreet sollicitudin faucibus. Praesent vitae velit blandit nunc posuere vehicula. Etiam sed augue quam. In hendrerit dictum nullam. ';
				
				var user = ideaWatcher.model.User;
				user.username = 'a';
				user.email = 'a@c.de';
				user.isMailPublic = true;
//				user.pictureUrl = '';
				
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
				htmlIdeaHeader = document.createElement('h1');
				htmlIdeaHeader.id = 'ideaDetails_ideaHeader_h1';
				htmlIdeaHeader.textContent = obj.additionalData.ideaobject.name;
				//description
				htmlIdeaDescription = document.createElement('div');
				htmlIdeaDescription.id = 'ideaDetails_description_div';
				htmlIdeaDescription.textContent = obj.additionalData.ideaobject.description;
				//iconbar
					
					//likebutton
					htmlLikeButton = document.createElement('button');
					htmlLikeButton.id = 'ideaDetails_like_button';
					//number of likes
					htmlLikesSpan = document.createElement('span');
					htmlLikesSpan.textContent = obj.additionalData.ideaobject.numberLikes;
					
					//starbutton
					//number of followers
					//commenticon
					//number of comments
					//contactlink
					//section
					htmlIconSection = document.createElement('section');
					htmlIconSection.id = 'ideaDetails_iconList_section';
					htmlIconSection.appendChild(htmlLikeButton);
					htmlIconSection.appendChild(htmlLikesSpan);
				//new comment
					//section
				//list of old comments
					
				//append all elements to view
				htmlView.appendChild(htmlIdeaHeader);
				htmlView.appendChild(htmlIdeaDescription);
				htmlView.appendChild(htmlIconSection);
			}

			return {

			};

		})();