'use strict';

const WIT_TOKEN = process.env.WIT_TOKEN || 'VEIUF3XX55IXNVHAAGN5DGXKYDTMKYIU';
if (!WIT_TOKEN) {
    throw new Error('Missing WIT_TOKEN. Go to https://wit.ai/docs/quickstart to get one.')
}


const FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || 'EAAZAxxBp9uswBADehYw2EkZA7cgfFFJk8yIqCOxvZCLAgM4hI5B9uLMSbrl0xW1rgFPhYXW8PdpKhkXiWfU5a0LIRPZCbeUgBdjyjpTDer1iTZAA5vOygQZAaF9ZAAuB3gh5FtybVjokVHYeoszzYAOhz0zA9AbFbkdZBIpI8JZAGJBRx1TedTMHy';
if (!FB_PAGE_TOKEN) {
    throw new Error('Missing FB_PAGE_TOKEN. Go to https://developers.facebook.com/docs/pages/access-tokens to get one.')
}

const FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'just_do_it';

const SKYPE_APP_ID = '61ea8c41-1345-48e2-b1bd-0863379d4941';
const SKYPE_APP_PASSWORD = 'rndmzvFLUGBX9}%dM9178(=';

module.exports = {
    WIT_TOKEN: WIT_TOKEN,
    FB_PAGE_TOKEN: FB_PAGE_TOKEN,
    FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
    SKYPE_APP_ID:SKYPE_APP_ID,
    SKYPE_APP_PASSWORD:SKYPE_APP_PASSWORD

};
