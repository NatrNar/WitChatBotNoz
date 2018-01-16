'use strict';

const WIT_TOKEN = process.env.WIT_TOKEN || 'VEIUF3XX55IXNVHAAGN5DGXKYDTMKYIU';
if (!WIT_TOKEN) {
    throw new Error('Missing WIT_TOKEN. Go to https://wit.ai/docs/quickstart to get one.')
}


var FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || 'EAAZAxxBp9uswBAGrczcdhvKP4jc3mxzQ0bypOzhVbkgl81I5jZAKvBORv0Sm8e6AkSODBB1c0RLMyDgnZBtW9ovPzeZAlP1yjFiBDuARwFPL9J7zl9SC23HuRKdT3TTQfNq7Vxo91djQMluN1QsgGZBuQ1EelxA52iBQZBtOoGGYDjMU2seGrs';
if (!FB_PAGE_TOKEN) {
    throw new Error('Missing FB_PAGE_TOKEN. Go to https://developers.facebook.com/docs/pages/access-tokens to get one.')
}

var FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'WitChatBotNoz';

module.exports = {
    WIT_TOKEN: WIT_TOKEN,
    FB_PAGE_TOKEN: FB_PAGE_TOKEN,
    FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
};
