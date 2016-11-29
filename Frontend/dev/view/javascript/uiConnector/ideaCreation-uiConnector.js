ideaWatcher.view.ideaCreation = ideaWatcher.view.ideaCreation || (function() {

		var htmlIdeaCreationView = null;
		var htmlIdeaCreationForm = null;

		// region lade zu internationalisierende HTML-Elemente
		var htmlViewHeadline = null;
		var htmlIdeaName = null;
		var htmlCategory = null;
		var htmlCategorySelect = null;
		var htmlCategory1 = null;
		var htmlCategory2 = null;
		var htmlCategory3 = null;
		var htmlCategory4 = null;
		var htmlCategory5 = null;
		var htmlCategory6 = null;
		var htmlCategory7 = null;
		var htmlDescription = null;
		var htmlDescriptionTextarea = null;
		var htmlPublishButton = null;
		var htmlCancelButton = null;
		var htmlSaveButton = null;
		var htmlIdeaNameInput = null;
		var isEdit = null;
		var ideaId = null;
		var isIdeaPublished = null;

		// endregion

		// region subscribe to events
		ideaWatcher.controller.ideaCreation.registerInitializeView(cbIni);
		ideaWatcher.controller.ideaCreation.registerShowView(cbShowView);
		ideaWatcher.controller.ideaCreation
			.registerLocalizeView(cbLocalizeView);
		ideaWatcher.controller.ideaCreation
			.registerGetIdeaToEditResponse(cbGetIdeaToEditResponse);
		ideaWatcher.controller.ideaCreation
			.registerSaveIdeaResponse(cbSaveIdeaResponse);
		ideaWatcher.controller.ideaCreation
			.registerPublishIdeaResponse(cbPublishIdeaResponse);

		// endregion

		// region cbIni
		function cbIni() {
			console.log('Initialisiere UIConnector ideaCreation');

			// region assign html elements
			htmlIdeaCreationView = document
					.querySelector('.ideaCreation_view');
			htmlIdeaCreationForm = document
					.querySelector('.ideaCreation_form');
			htmlViewHeadline = document
					.getElementById('ideaCreation_newIdea');
			htmlIdeaName = document
					.getElementById('ideaCreation_name_label');
			htmlIdeaNameInput = document
					.getElementById('ideaCreation_name_input');
			htmlCategory = document
					.getElementById('ideaCreation_category_label');
			htmlCategorySelect = document
					.getElementById('ideaCreation_category_select');
			htmlCategory1 = document
					.getElementById('ideaCreation_category_1');
			htmlCategory2 = document
					.getElementById('ideaCreation_category_2');
			htmlCategory3 = document
					.getElementById('ideaCreation_category_3');
			htmlCategory4 = document
					.getElementById('ideaCreation_category_4');
			htmlCategory5 = document
					.getElementById('ideaCreation_category_5');
			htmlCategory6 = document
					.getElementById('ideaCreation_category_6');
			htmlCategory7 = document
					.getElementById('ideaCreation_category_7');
			htmlDescription = document
					.getElementById('ideaCreation_description_label');
			htmlDescriptionTextarea = document
					.getElementById('ideaCreation_description_textarea');
			htmlPublishButton = document
					.getElementById('ideaCreation_publish_button');
			htmlCancelButton = document
					.getElementById('ideaCreation_cancel_button');
			htmlSaveButton = document
					.getElementById('ideaCreation_save_button');

			// endregion

			// region override onSubmit to prevent page reload
			// htmlIdeaCreationForm.onsubmit = sendIdeaToController;
			htmlPublishButton.addEventListener('click', publishIdea);
			htmlCancelButton.addEventListener('click', cancelIdea);
			htmlSaveButton.addEventListener('click', saveIdea);
			// endregion

			cbLocalizeView();

			isEdit = false; // Flag für Save-Button, wenn vorhandene Idee
			// editiert werden soll

		}
		// endregion

		// region
		function publishIdea(event) {
			event.preventDefault();

			if (!checkValidForm())
				return;

			var exObj = {
				ideaId: ideaId,
				ideaName : htmlIdeaNameInput.value,
				ideaCategory : htmlCategorySelect.value,
				ideaDescription : htmlDescriptionTextarea.value,
				ideaStatus: 'publish'
			};
			console.log(exObj);

			ideaWatcher.controller.ideaCreation.tryToPublishIdea(exObj);
		}
		// endregion

		function saveIdea(event) {
			event.preventDefault();

			if (!checkValidForm())
				return;

			var exObj = {
				ideaName : htmlIdeaNameInput.value,
				ideaCategory : htmlCategorySelect.value,
				ideaDescription : htmlDescriptionTextarea.value
			};
			if (isEdit) {
				exObj.ideaId = ideaId;
				exObj.ideaStatus = 'edit';
			} else {
				exObj.ideaStatus = 'saveNew';
			}

			console.log(exObj);

			ideaWatcher.controller.ideaCreation.tryToSaveNewIdea(exObj);
		}
		// endregion

		function cancelIdea(event) {

			event.preventDefault();

			ideaWatcher.controller.ideaCreation.cancelSaveIdea();
		}
		// endregion

		// region checkValidForm
		function checkValidForm() {

			var ideaName = htmlIdeaNameInput.value;
			var ideaDescription = htmlDescriptionTextarea.value;
			var isFormValid = true;
			var htmlIdeaNameErrorLabel = document
					.querySelector('.ideaCreation_ideaNameError_label');
			var htmlIdeaDescriptionErrorLabel = document
					.querySelector('.ideaCreation_ideaDescriptionError_label');
			var errorMessage;
			var language = ideaWatcher.core.Localizer.getLanguage();

			if (ideaName.length < 1) {
				console.log('Ideen Name zu kurz');
				errorMessage = ideaWatcher.core.Localizer.SaveIdea[language].ideaNameTooShort;
				isFormValid = false;

				htmlIdeaNameErrorLabel.textContent = errorMessage;
				htmlIdeaNameErrorLabel.style.display = 'inline';
				htmlIdeaDescriptionErrorLabel.style.display = 'none';
			} else if (ideaDescription.length < 1) {
				console.log('Ideen Beschreibung zu kurz');
				errorMessage = ideaWatcher.core.Localizer.SaveIdea[language].ideaDescriptionTooShort;
				isFormValid = false;

				htmlIdeaDescriptionErrorLabel.textContent = errorMessage;
				htmlIdeaDescriptionErrorLabel.style.display = 'inline';
				htmlIdeaNameErrorLabel.style.display = 'none';
			} else {
				console
						.log('Der Name und die Beschreibung der Idee entsprechen den Richtlinien.');
				htmlIdeaNameErrorLabel.style.display = 'none';
				htmlIdeaDescriptionErrorLabel.style.display = 'none';
			}

			return isFormValid;
		}
		// endregion

		// region showView
		function cbShowView(exObj) {

			if (exObj.shouldShow) {

				var idea = exObj.additionalData.idea;
				if (idea) {

					ideaId = idea.ideaId;
					isIdeaPublished = idea.isPublished;

					if (!isIdeaPublished) {
						htmlPublishButton.style.display = '';

					} else {
						htmlPublishButton.style.display = 'none';
					}
				} else {
					htmlPublishButton.style.display = 'block';
				}

				renderView(idea);

				htmlIdeaCreationView.style.display = 'block';

			} else {

				htmlIdeaCreationView.style.display = 'none';
			}
		}
		// endregion

		function renderView(idea) {

			// Wenn eine Idee mit übergeben wurde, dann soll sie in das
			// Formular übernommen werden zum Editieren
			if (idea) {

				isEdit = true;
				htmlIdeaNameInput.value = idea.name;
				htmlDescriptionTextarea.value = idea.description;
				// Setze die gewählte Kategorie
				var selectBox = document
						.getElementById('ideaCreation_category_select');
				var chosenValue = idea.category;
				for (var i = 0, j = selectBox.options.length; i < j; ++i) {
					if (selectBox.options[i].value === chosenValue) {
						selectBox.selectedIndex = i;
						break;
					}
				}
			} else {
				isEdit = false;
				htmlIdeaNameInput.value = '';
				htmlDescriptionTextarea.value = '';
			}
			cbLocalizeView();
		}

		function cbLocalizeView() {

			var language = ideaWatcher.core.Localizer.getLanguage();

			console.log("Starte Lokalisierung der IdeaCreation-View ...");

			if (isEdit) {
				htmlViewHeadline.textContent = ideaWatcher.core.Localizer.SaveIdea[language].headerEditIdea;
			} else {
				htmlViewHeadline.textContent = ideaWatcher.core.Localizer.SaveIdea[language].headerNewIdea;
			}
			htmlIdeaName.textContent = ideaWatcher.core.Localizer.SaveIdea[language].name;
			htmlCategory.textContent = ideaWatcher.core.Localizer.SaveIdea[language].category;
			htmlCategory1.textContent = ideaWatcher.core.Localizer.SaveIdea[language].category1;
			htmlCategory2.textContent = ideaWatcher.core.Localizer.SaveIdea[language].category2;
			htmlCategory3.textContent = ideaWatcher.core.Localizer.SaveIdea[language].category3;
			htmlCategory4.textContent = ideaWatcher.core.Localizer.SaveIdea[language].category4;
			htmlCategory5.textContent = ideaWatcher.core.Localizer.SaveIdea[language].category5;
			htmlCategory6.textContent = ideaWatcher.core.Localizer.SaveIdea[language].category6;
			htmlCategory7.textContent = ideaWatcher.core.Localizer.SaveIdea[language].category7;
			htmlDescription.textContent = ideaWatcher.core.Localizer.SaveIdea[language].description;
			// Wenn noch Defaulttext drin steht, dann diesen lokalisieren,
			// sonst ignorieren
			if (htmlDescriptionTextarea.value === ideaWatcher.core.Localizer.SaveIdea['de_DE'].descriptionTextarea
					|| htmlDescriptionTextarea.value === ideaWatcher.core.Localizer.SaveIdea['en_GB'].descriptionTextarea) {

				htmlDescriptionTextarea.value = ideaWatcher.core.Localizer.SaveIdea[language].descriptionTextarea;
			}

			htmlPublishButton.setAttribute("value",
					ideaWatcher.core.Localizer.SaveIdea[language].publish);
			htmlCancelButton.setAttribute("value",
					ideaWatcher.core.Localizer.SaveIdea[language].cancel);
			htmlSaveButton.setAttribute("value",
					ideaWatcher.core.Localizer.SaveIdea[language].save);

			console.log("Lokalisierung IdeaCreation-View abgeschlossen.");
		}
		// endregion

		// region Response-Callbacks
		// Callback für Editieren einer Idee
		function cbGetIdeaToEditResponse(response) {

			var language = ideaWatcher.core.Localizer.getLanguage();
			// Nach Ergebnis sehen:
			var result = response.result;

			if (result !== 'success') {

				ideaWatcher.controller.GlobalNotification
						.showNotification(
								ideaWatcher.model.GlobalNotificationType.ERROR,
								ideaWatcher.core.Localizer.SaveIdea[language].notification.editIdeaHeadline,
								ideaWatcher.core.Localizer.SaveIdea[language].notification.errorMessage[response.errorMessage],
								5000);
				return;
			}

			var exObj = Object
					.create(ideaWatcher.model.ExchangeObject.SwitchView);
			exObj.viewId = ideaWatcher.model.Navigation.ViewId.CREATEIDEA;
			exObj.viewUrl = ideaWatcher.model.Navigation.ViewUrl.CREATEIDEA;
			exObj.additionalData = {
				idea : response.data
			};
			ideaWatcher.core.Navigator.switchView(exObj);
		}

		// Callback für Antwort vom Backend nach Versuch Idee zu speichern
		function cbSaveIdeaResponse(response) {

			var language = ideaWatcher.core.Localizer.getLanguage();
			// Nach Ergebnis sehen:
			var result = response.result;

			if (result !== 'success') {

				ideaWatcher.controller.GlobalNotification
						.showNotification(
								ideaWatcher.model.GlobalNotificationType.ERROR,
								ideaWatcher.core.Localizer.SaveIdea[language].notification.saveIdeaHeadline,
								ideaWatcher.core.Localizer.SaveIdea[language].notification.errorMessage[response.errorMessage],
								5000);
			}
			else if (result === 'success') {

				ideaWatcher.controller.GlobalNotification
						.showNotification(
								ideaWatcher.model.GlobalNotificationType.SUCCESS,
								ideaWatcher.core.Localizer.SaveIdea[language].notification.saveIdeaHeadline,
								ideaWatcher.core.Localizer.SaveIdea[language].notification.successMessage.saveIdeaSuccess,
								5000);
			}

			var listType = ideaWatcher.model.IdeaList.ListType.MYIDEAS;
			var category = ideaWatcher.model.IdeaList.Category.NONE;
			ideaWatcher.controller.IdeaList.updateIdeaList(listType,
					category, 1, 10, true);
		}

	function cbPublishIdeaResponse(response) {

		var language = ideaWatcher.core.Localizer.getLanguage();
		// Nach Ergebnis sehen:
		var result = response.result;

		if (result !== 'success') {

			ideaWatcher.controller.GlobalNotification
				.showNotification(
					ideaWatcher.model.GlobalNotificationType.ERROR,
					ideaWatcher.core.Localizer.SaveIdea[language].notification.publishIdeaHeadline,
					ideaWatcher.core.Localizer.SaveIdea[language].notification.errorMessage[response.errorMessage],
					5000);
		}
		else if (result === 'success') {

			htmlPublishButton.display = 'none';
			ideaWatcher.controller.GlobalNotification
				.showNotification(
					ideaWatcher.model.GlobalNotificationType.SUCCESS,
					ideaWatcher.core.Localizer.SaveIdea[language].notification.publishIdeaHeadline,
					ideaWatcher.core.Localizer.SaveIdea[language].notification.successMessage.publishIdeaSuccess,
					5000);
		}

		var listType = ideaWatcher.model.IdeaList.ListType.MYIDEAS;
		var category = ideaWatcher.model.IdeaList.Category.NONE;
		ideaWatcher.controller.IdeaList.updateIdeaList(listType,
			category, 1, 10, true);
	}

		// diese Methoden stellen die öffentliche API dar, über welche mit
		// dem Modul kommuniziert werden kann
		return {

		};

	})();