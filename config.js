'use strict';

const WIT_TOKEN = process.env.WIT_TOKEN || 'VEIUF3XX55IXNVHAAGN5DGXKYDTMKYIU';
if (!WIT_TOKEN) {
    throw new Error('Missing WIT_TOKEN. Go to https://wit.ai/docs/quickstart to get one.')
}


var FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || 'EAAC937ZBWi4EBALMOnCBOEcZAzQKVUarGcEJSTIMzouMSVmU9SqLUMIIfyyiIMVfxp4b1cwaYXoSMftepYPYkfVkWgfpqSPS1C2308vZBuTSLjTWO7CTgezQSvrteqFosvxQ8G4ZC1JfKiZC2VEWxKcSgSlaoLa5hMuETdZAe7qJFW7mdVVBGvj0KwoRWDHKMZD';
if (!FB_PAGE_TOKEN) {
    throw new Error('Missing FB_PAGE_TOKEN. Go to https://developers.facebook.com/docs/pages/access-tokens to get one.')
}

var FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'WitChatBotNoz';

module.exports = {
    WIT_TOKEN: WIT_TOKEN,
    FB_PAGE_TOKEN: FB_PAGE_TOKEN,
    FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
};