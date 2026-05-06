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

            // 특정 프로젝트(SitEat, National Mustard Museum) 15% 확대 적용 
            // transform: scale()을 사용하면 지정 영역 바깥으로 커지면서 이미지가 잘리지 않음
            if (item.title === 'SitEat' || item.title === 'National Mustard Museum') {
                imageBlock.style.transform = 'scale(1.15)';
            }
        }

        // 3. 제목 생성
        const title = document.createElement('p');
        title.className = 'item-title';
        title.textContent = item.title;

        // 컨테이너에 조립
        gridItem.appendChild(imageBlock);
        gridItem.appendChild(title);

        // 4. 빨간색 뱃지 (예: PDF 아이콘)가 필요한 항목이면 추가
        if (item.hasBadge) {
            const badge = document.createElement('div');
            badge.className = 'badge';

            // PDF 아이콘을 단순화한 빨간색 원형 SVG 삽입
            badge.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="1.5">
                    <circle cx="12" cy="12" r="11" />
                    <!-- 내부 P와 물결 모양 등 심볼 추가 -->
                    <path d="M10 8 L10 16 M10 8 C13 8 14 10 12 12 L10 12" stroke-linejoin="round"/>
                </svg>
            `;
            gridItem.appendChild(badge);
        }

        // 최종 완성된 아이템을 그리드 컨테이너에 추가
        gridContainer.appendChild(gridItem);
    });
});
