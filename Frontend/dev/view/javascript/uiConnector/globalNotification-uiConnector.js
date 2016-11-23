ideaWatcher.view.GlobalNotification = ideaWatcher.view.GlobalNotification || (function () {

        //region local vars
        var evIni = {
          topic: 'internal/ini',
          cbFunction: cbIni
        };
        var htmlView = null;
        var htmlHeadline = null;
        var htmlDisplayText = null;
        var colorInfo = '#86a8ff';
        var colorWarning = '#ffa775';
        var colorError = '#ff3245';
        var colorSuccess = '#77ff60';

        //endregion

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        //endregion


        //region ini
        function cbIni() {
            console.log('initialisere GLOBAL NOTIFICATION');
            htmlView = document.querySelector('.globalNotification_view');
            htmlHeadline = document.querySelector('#globalNotification_headline_h3');
            htmlDisplayText = document.querySelector('#globalNotification_displayText_span');
            ideaWatcher.controller.GlobalNotification.registerShowNotification(cbShowNotification);
        }
        //endregion

        //region
        function cbShowNotification(notificationType, headline, text, duration) {

            switch(ideaWatcher.model.GlobalNotificationType[notificationType]) {
                case ideaWatcher.model.GlobalNotificationType.INFO:
                    htmlView.style.backgroundColor = colorInfo;
                    break;
                case ideaWatcher.model.GlobalNotificationType.WARNING:
                    htmlView.style.backgroundColor = colorWarning;
                    break;
                case ideaWatcher.model.GlobalNotificationType.ERROR:
                    htmlView.style.backgroundColor = colorError;
                    break;
                case ideaWatcher.model.GlobalNotificationType.SUCCESS:
                    htmlView.style.backgroundColor = colorSuccess;
                    break;
                default:
                    htmlView.style.backgroundColor = colorInfo;
                    break;
            }

            htmlView.style.right = '50px';

            htmlHeadline.textContent = headline;
            htmlDisplayText.textContent = text;
            htmlView.style.opacity = '1.0';

            setTimeout(function () {

                htmlView.style.right = '-350px';
                htmlView.style.opacity = '0.0';

            },duration);
            console.log('show Notification');
        }
        //endregion

        return {

        };

    })();