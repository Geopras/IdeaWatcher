ideaWatcher.model.ExchangeObject = ideaWatcher.model.ExchangeObject || {

        IdeaList: {
            RequestData: {
                category: 'NONE',
                fromRank: 1,
                isRenderNewIdeaList: true,
                listType: 'HOT',
                toRank: 10,
                userId: ""
            },
            ResponseData: {
                category: 'NONE',
                ideas: [],
                isRenderNewIdeaList: true,
                listType: 'HOT'
            }
        },
        SwitchView: {
            viewId: '',
            viewUrl: '',
            additionalData: {}
        }
    };