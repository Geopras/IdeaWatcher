// ideaWatcher.controller.MyIdeas = ideaWatcher.controller.MyIdeas || (function () {
//
//         var cbShowView = null;
//         var cbRenderList = null;
//         var evSwitchView = {
//             topic: 'switchView/myIdeas',
//             cbFunction: cbSwitchView
//         };
//
//         //region subscribe to events
//         ideaWatcher.core.MessageBroker.subscribe(evSwitchView);
//         //endregion
//
//         //region Callback: Internal - SwitchView
//         function cbSwitchView(obj)
//         {
//             cbShowView(obj);
//         }
//         //endregion
//
//         //region register Callbacks
//         function pubRegisterShowView(cb) {
//             cbShowView = cb;
//         }
//
//         function pubRegisterRenderList(cb) {
//             cbRenderList = cb;
//
//         }
//         //endregion
//
//         // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
//         return {
//             // hier kann die View eine Methode(ui-Connector) registrieren, die gerufen wird,
//             // wenn die View ein/ausgeblendet werden soll
//             registerShowView: pubRegisterShowView,
//             registerRenderList: pubRegisterRenderList
//         };
//
//     })();
