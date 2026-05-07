document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('portfolio-grid');

    portfolioData.forEach(item => {
        // 1. 개별 포트폴리오 아이템 컨테이너 생성 (링크로 만들기 위해 <a> 태그 사용)
        const gridItem = document.createElement('a');
        gridItem.className = 'portfolio-item';
        gridItem.style.textDecoration = 'none'; // 기본 밑줄 제거
        gridItem.style.color = 'inherit'; // 기본 색상 상속

        // 현재 페이지가 projects 폴더 내부에 있는지 확인
        const isProjectPage = window.location.pathname.includes('/projects/');
        const basePath = isProjectPage ? '' : 'projects/';

        // 제목을 기반으로 HTML 파일 이름 생성 (예: 'Snow Joc' -> 'snow_joc.html')
        const fileName = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '.html';
        gridItem.href = basePath + fileName;

        // 2. 이미지 또는 회색 블럭(플레이스홀더) 생성
        const imageBlock = document.createElement('div');
        imageBlock.className = 'image-block';

        // 모든 이미지를 동일한 크기의 박스로 통일하기 위해 인라인 스타일 비율 설정 제거
        // 기본 크기는 style.css의 .image-block 클래스에서 aspect-ratio 속성으로 제어됩니다.

        // 나중에 data.js에 실제 이미지 경로가 추가되면 배경 이미지로 적용
        if (item.image) {
            const imageBasePath = isProjectPage ? '../' : '';
            imageBlock.style.backgroundImage = `url('${imageBasePath}${item.image}')`;
            imageBlock.style.backgroundColor = 'transparent'; // 회색 배경 제거

            // 이미지가 짤리지 않고 총면적이 비슷해 보이도록 비율에 따라 크기 동적 조절
            const [w, h] = (item.ratio || '4/3').split('/').map(Number);
            const r = w / h;
            // 16:9 이미지가 박스 가로를 100% 채울 때의 면적(약 0.56)을 기준으로 삼음
            const bgWidthPercent = Math.sqrt(0.56 * r) * 100;
            imageBlock.style.backgroundSize = `${Math.min(100, bgWidthPercent)}% auto`;

            // Healthfirst, Safey, Snow Joe 썸네일의 세로 높이를 완벽하게 동일하게 맞추기 위한 예외 처리
            if (item.title === 'Healthfirst' || item.title === 'Safey' || item.title === 'Snow Joe') {
                // 세 이미지 모두 컨테이너 세로 높이의 약 74.82% (가로 폭의 56.11%)를 차지하도록 고정하여 높이 통일
                imageBlock.style.backgroundSize = 'auto 74.82%';
            }

            // Safey 양옆의 실제 이미지 간격이 동일해지도록 Safey를 우측으로 미세 조정 (시각적 마진 보정)
            // Snow Joe의 가로폭이 Healthfirst보다 미세하게 좁아 발생하는 여백 불균형을 해결합니다.
            if (item.title === 'Safey') {
                gridItem.style.transform = 'translateX(1.075%)';
            }

            // 썸네일 특별 확대 적용 (짤림 방지를 위해 transform: scale 사용)
            if (item.title === 'SitEat') {
                imageBlock.style.transform = 'scale(1.15)'; // 기존 15% 유지
            }
            if (item.title === 'National Mustard Museum') {
                imageBlock.style.transform = 'scale(1.20175)'; // 기존 1.265에서 5% 축소 (1.265 * 0.95)
            }
            if (item.title === 'Icons for PES') {
                imageBlock.style.transform = 'scale(1.1)'; // 10% 확대 적용
            }
            if (item.title === 'UBRI Connect by Ripple') {
                imageBlock.style.transform = 'scale(1.05)'; // 5% 확대 적용
            }
            if (item.title === 'Raging Bull') {
                imageBlock.style.transform = 'scale(1.069425)'; // 기존 1.1025에서 3% 축소 (1.1025 * 0.97)
            }
            if (item.title === 'Otl Aicher') {
                imageBlock.style.transform = 'scale(0.95)'; // 5% 축소 적용
            }
            if (item.title === 'Gates of Eden') {
                imageBlock.style.transform = 'scale(1.5838875)'; // 기존 1.66725에서 5% 축소 (1.66725 * 0.95)
            }
            if (item.title === 'Destiny') {
                imageBlock.style.transform = 'scale(1.2)'; // 20% 확대 적용
            }
        }

        // 3. 제목 생성
        const title = document.createElement('p');
        title.className = 'item-title';
        title.textContent = item.title;

        // 컨테이너에 조립
        gridItem.appendChild(imageBlock);
        gridItem.appendChild(title);

        // 최종 완성된 아이템을 그리드 컨테이너에 추가
        gridContainer.appendChild(gridItem);
    });
});
