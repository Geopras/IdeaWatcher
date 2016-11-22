ideaWatcher.model.ExchangeObject = ideaWatcher.model.ExchangeObject || {

        IdeaList: {
            RequestData: {
                category: 'NONE',
                fromRank: 1,
                isRenderNewIdeaList: true,
                listType: 'HOT',
                toRank: 10
            },
            ResponseData: {
                category: 'NONE',
                ideas: [],
                isReachedEnd: false,
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