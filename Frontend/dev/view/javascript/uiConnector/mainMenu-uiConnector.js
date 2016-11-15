ideaWatcher.view.MainMenu = ideaWatcher.view.MainMenu
		|| (function() {

			// region local vars
			// Event Globale Initialisierung
			var evIni = {
				topic : 'internal/ini',
				cbFunction : cbiIni
			};
			var htmlView;
			var htmlHomeButton;
			var htmlHotButton;
			var htmlFreshButton;
			var htmlTrendingButton;
			var htmlLoginButton;
			var htmlSignupButton;
			var htmlLanguageSwitchCheckbox;
			var htmlUserButton;
			var htmlCategoryParentNode;
			var htmlCategoryChildrenList;
			// endregion

			// region subscribe to events
			ideaWatcher.core.MessageBroker.subscribe(evIni);
			// endregion

			function cbiIni() {
				console.log('ini Event');
				htmlView = document.querySelector('.mainMenu_view');
				htmlHomeButton = document
						.querySelector('.mainMenu_logo_button');
				htmlHotButton = document.querySelector('.mainMenu_hot_button');
				htmlFreshButton = document
						.querySelector('.mainMenu_fresh_button');
				htmlTrendingButton = document
						.querySelector('.mainMenu_trending_button');
				htmlLoginButton = document
						.querySelector('#mainMenu_login_button');
				htmlSignupButton = document
				.querySelector('#mainMenu_signup_button');
				htmlUserButton = document
						.querySelector('.mainMenu_user_button');
				htmlCategoryParentNode = document
						.querySelector('.mainMenu_categoryList_ul');
				htmlLanguageSwitchCheckbox = document
						.querySelector('.mainMenu_switch');

				htmlHomeButton
						.addEventListener('click', handleButtonNavigation);
				htmlHotButton.addEventListener('click',
						handleButtonNavigationHot);
				htmlFreshButton.addEventListener('click',
						handleButtonNavigationFresh);
				htmlTrendingButton.addEventListener('click',
						handleButtonNavigationTrending);
				htmlLoginButton.addEventListener('click',
						handleButtonNavigationLogin);
				htmlSignupButton.addEventListener('click',
						handleButtonNavigationSignup);
				//htmlUserButton.addEventListener('click',
					//	handleButtonNavigationProfile);
				htmlLanguageSwitchCheckbox.addEventListener('change',
						handleCheckboxLanguageSwitch); // bei "click" wird die
														// Methode gleich
														// zweimal aufgerufen

				htmlCategoryChildrenList = htmlCategoryParentNode.children;

				for (var i = 0; i < htmlCategoryChildrenList.length; i++) {
					console.log(htmlCategoryChildrenList[i].textContent);
					htmlCategoryChildrenList[i].addEventListener('click',
							handleButtonNavigationCategory);
				}

			}

			function handleButtonNavigation(clickEvent) {

				console.log('htmlBtnHome geklickt');
				ideaWatcher.core.Navigator.switchView({
					viewId : 'HotIdeaList',
					url : 'ideaWatcher.html'
				});
			}

			function handleButtonNavigationLogin(clickEvent) {

				console.log('htmlBtnLogin geklickt');

				ideaWatcher.core.Navigator.switchView({
					viewId : 'login',
					url : 'myLogin'
				});

			}

			function handleButtonNavigationSignup(clickEvent) {

				console.log('htmlBtnSignup geklickt');

				ideaWatcher.core.Navigator.switchView({
					viewId : 'signup',
					url : 'mySignUp'
				});

			}
			
			function handleButtonNavigationProfile(clickEvent) {

				console.log('htmlUserButton geklickt');
				ideaWatcher.core.Navigator.switchView({
					viewId : 'profile',
					url : 'myProfile'
				});
			}

			function handleButtonNavigationHot(clickEvent) {

				console.log('htmlHotButton geklickt');
				ideaWatcher.core.Navigator.switchView({
					viewId : 'HotIdeaList',
					url : 'HotIdeaList'
				});
			}

			function handleButtonNavigationFresh(clickEvent) {

				console.log('htmlFreshButton geklickt');
				ideaWatcher.core.Navigator.switchView({
					viewId : 'FreshIdeaList',
					url : 'FreshIdeaList'
				});
			}
			function handleButtonNavigationTrending(clickEvent) {

				console.log('htmlTrendingButton geklickt');
				ideaWatcher.core.Navigator.switchView({
					viewId : 'TrendingIdeaList',
					url : 'TrendingIdeaList'
				});
			}

			function handleButtonNavigationCategory(clickEvent) {

				console.log('htmlCategoryButton geklickt');
				var source = clickEvent.srcElement || clickEvent.target;
				ideaWatcher.core.Navigator.switchView({
					viewId : 'CategoryIdeaList',
					url : 'CategoryIdeaList',
					additionalData : {
						categoryName : source.textContent
					}
				});
			}

			function handleCheckboxLanguageSwitch(clickEvent) {
				var language = ideaWatcher.core.Localizer.getLanguage();
				if (language == 'de_DE') {
					language = ideaWatcher.core.Localizer.setLanguage('en_GB');
				} else {

					language = ideaWatcher.core.Localizer.setLanguage('de_DE');
				}

			}

			return {

			};

		})();