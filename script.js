document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('portfolio-grid');
    const inProject = location.pathname.includes('/projects_html/');
    const pageBase = inProject ? '' : 'projects_html/';
    const imageBase = inProject ? '../image/thumbnail/' : 'image/thumbnail/';

    portfolioData.forEach(item => {
        const link = document.createElement('a');
        link.className = 'portfolio-item';
        link.href = pageBase + item.title.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '.html';
        if (item.shift) link.style.transform = `translateX(${item.shift})`;

        const image = document.createElement('div');
        image.className = 'image-block';
        image.style.backgroundImage = `url('${imageBase}${item.image}')`;
        image.style.backgroundSize = item.size || `${Math.min(100, Math.sqrt(0.56 * item.ratio) * 100)}% auto`;
        if (item.scale) image.style.transform = `scale(${item.scale})`;

        const title = document.createElement('p');
        title.className = 'item-title';
        title.innerHTML = `<span class="item-name">${item.title}</span><span class="item-type">${item.type}</span>`;

        link.append(image, title);
        grid.append(link);
    });

    const rewindVideos = document.querySelectorAll('.yt-rewind');
    if (rewindVideos.length) {
        window.onYouTubeIframeAPIReady = () => rewindVideos.forEach(box => {
            const videoId = box.dataset.video;
            const player = new YT.Player(box, {
                host: 'https://www.youtube-nocookie.com',
                videoId,
                playerVars: { rel: 0, playsinline: 1 },
                events: {
                    onStateChange: event => {
                        if (event.data === YT.PlayerState.ENDED) player.cueVideoById(videoId);
                    }
                }
            });
            player.getIframe().className = 'video-iframe cg-embed';
        });
        const api = document.createElement('script');
        api.src = 'https://www.youtube.com/iframe_api';
        document.head.append(api);
    }

    const vimeoVideos = document.querySelectorAll('iframe.vimeo-rewind');
    if (vimeoVideos.length) {
        const api = document.createElement('script');
        api.src = 'https://player.vimeo.com/api/player.js';
        api.onload = () => vimeoVideos.forEach(frame => {
            const player = new Vimeo.Player(frame);
            player.on('ended', () => player.unload());
        });
        document.head.append(api);
    }
});
