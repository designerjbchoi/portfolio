document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('portfolio-grid');

    portfolioData.forEach(item => {
        // 1. 개별 포트폴리오 아이템 컨테이너 생성
        const gridItem = document.createElement('div');
        gridItem.className = 'portfolio-item';

        // 2. 이미지 또는 회색 블럭(플레이스홀더) 생성
        const imageBlock = document.createElement('div');
        imageBlock.className = 'image-block';

        // 모든 이미지를 동일한 크기의 박스로 통일하기 위해 인라인 스타일 비율 설정 제거
        // 기본 크기는 style.css의 .image-block 클래스에서 aspect-ratio 속성으로 제어됩니다.

        // 나중에 data.js에 실제 이미지 경로가 추가되면 배경 이미지로 적용
        if (item.image) {
            imageBlock.style.backgroundImage = `url(${item.image})`;
            imageBlock.style.backgroundColor = 'transparent'; // 회색 배경 제거
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
