module.exports = {

    re: [
        /^https?:\/\/itunes\.apple\.com(?:\/)?(\w+)?\/(album|music\-video|app)(?:\/[^\/]+)?\/id(\d+)/i
    ],

    mixins: [
        "canonical",
        "og-title",
        "og-site",
        "og-description",       
        "og-image",
        "favicon",

        // Skip some urls with robots noindex.
        "noindex-meta"
    ],

    getLink: function(urlMatch) {

        var embedSrc;
        var rel = [CONFIG.R.html5];

        var country = urlMatch[1] ? urlMatch[1] : 'us';

        switch (urlMatch[2]) {
            case 'album':
                embedSrc = 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewAlbumSocialPreview?cc=' + country +'&id=' + urlMatch[3];
                rel.push(CONFIG.R.reader);
                break;
            case 'music-video':
                embedSrc = 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewMusicVideoSocialPreview?cc=' + country +'&id=' + urlMatch[3];
                rel.push(CONFIG.R.player);
                break;
            case 'app':
                embedSrc = 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftwareSocialPreview?cc=' + country +'&id=' + urlMatch[3];
                rel.push(CONFIG.R.reader);
                break;
        }

        return {
            href: embedSrc,
            type: CONFIG.T.text_html,
            rel: rel,
            "orientation": rel.indexOf(CONFIG.R.player) > -1 ? 'landscape' : 'portrait',
            "min-width": 320
        };
    },

    tests: [
        'https://itunes.apple.com/us/album/12-12-12-concert-for-sandy/id585701590?v0=WWW-NAUS-ITSTOP100-ALBUMS&ign-mpt=uo%3D4',
        'https://itunes.apple.com/us/music-video/gangnam-style/id564322420?v0=WWW-NAUS-ITSTOP100-MUSICVIDEOS&ign-mpt=uo%3D4',
        'https://itunes.apple.com/us/app/google-maps/id585027354?mt=8',
        'https://itunes.apple.com/us/album/id944094900?i&ls=1',
        "https://itunes.apple.com/app/2048/id840919914",
        {
            skipMixins: 'noindex-meta'
        }
    ]
};