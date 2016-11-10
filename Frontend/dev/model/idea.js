ideaWatcher.model.Idea = {
    name: '',
    description: '',
    category: '',
    creator: ideaWatcher.model.User,
    publishDate: new Date(),
    language: '',
    hotRank: 0,
    trendingRank: 0,
    freshRank: 0,
    likeUsers: [],
    numberLikes: 0,
    followers: [],
    numberFollowers: 0,
    comments: [],
    numberComments: 0
};