module.exports = {
  development: {
    port: '6800',
    secret: 'fusionsecret',
    url: 'http://localhost:6800',
    siteAddress: 'http://localhost:3000',
    crmAddress: 'https://crm.demo.fusion-team.com',
    hashType: 'md5',
    hashKey: 'fusion',
    accessTokenName: 'access-token',
    refreshTokenName: 'refresh-token',
    conversationId: 'CD1F1A96U',
    slackToken1: 'xoxb-230105561331-445293275559-14ztpU0wq99z72NwLIsV1aMw',
    slackToken: 'xoxb-230105561331-437100489616-TrlHZ7rWrQrydHKPVAu2kWCL',
    codeReviewChannelId: 'CK7E16PME',
    codeReviewTeamChannelId: 'CD1F1A96U',
    CRMChannelId: 'CK8TV6THB',
    learningChannelId: 'CD1F1A96U',
    generalId: 'CD1F1A96U',
    slackBotIconPath: '/public/static/debug_slack.png',
    slackbot_username: 'Fusion Dev Bot',
    calendarSiteUrl: 'https://buh.ru/calendar/',
    expiresAccessIn: 30,
    expiresRefreshIn: 604800,
    linkpreviewUrl: 'http://api.linkpreview.net/',
    linkpreviewApiKey: '5bb7c97b7412712423e210ece56bfeb607e01ee9210fb',
    vapidPrivateKey: 'JIye0LEW3aVA8IupQ9q_jfiGs_YPVsL5UeUkmJVtJOE',
    vapidpublicKey: 'BOBddvE-HDYnuCFpCwVVLPZnlnV-YkhpFMPpBgtIXfavHYBuqWRpPvbgnFic7-PNtv1-P6VOxitPFJFeo9E8BdQ',
    vapidPublicKey: 'BOBddvE-HDYnuCFpCwVVLPZnlnV-YkhpFMPpBgtIXfavHYBuqWRpPvbgnFic7-PNtv1-P6VOxitPFJFeo9E8BdQ',
    vapidMail: 'dev@fusion-team.com',
    slackMessages: {
      newAnnouncement: [],
    },
    dbConfig: {
      username: 'fusion',
      password: 'fusion',
      dbName: 'fusion_site',
      host: '127.0.0.1',
      dialect: 'postgres',
      logging: true,
    },
    enableRequestLogging: true,
    serviceEmail: 'fusion.team.llc@gmail.com',
    servicePassword: '_q1w2e3r4t5_',
  },
};