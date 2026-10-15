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
});
