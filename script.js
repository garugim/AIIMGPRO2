document.addEventListener('DOMContentLoaded', () => {
    
    // -------------------------------------
    // 1. 배경 패닝 (Parallax) 효과 코드 제거 완료
    // -------------------------------------
    
    // -------------------------------------
    // 2. 잔상이 남는 빛 커서 효과 구현
    // -------------------------------------
    const glowCursor = document.getElementById('glow-cursor');

    // 마우스 이동 이벤트 리스너
    document.addEventListener('mousemove', (e) => {
        // requestAnimationFrame을 사용하여 부드러운 움직임을 만듭니다.
        requestAnimationFrame(() => {
            // 커서의 위치를 마우스 위치로 업데이트합니다.
            // CSS의 transform: translate(-50%, -50%) 덕분에 정중앙에 위치합니다.
            glowCursor.style.left = `${e.clientX}px`;
            glowCursor.style.top = `${e.clientY}px`;
        });
    });

    // -------------------------------------
    // 3. 이미지 섹션 카드 슬라이더 구현 (기존 코드 유지)
    // -------------------------------------
    const cards = document.querySelectorAll('.image-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentCardIndex = 0;

    function updateCardDisplay() {
        cards.forEach((card, index) => {
            if (index === currentCardIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
        updateCardDisplay();
    });

    nextBtn.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex + 1) % cards.length;
        updateCardDisplay();
    });

    updateCardDisplay();


    // -------------------------------------
    // 4. 컨택 폼 제출 이벤트 (기존 코드 유지)
    // -------------------------------------
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        console.log("폼 제출 감지!");
        const email = document.getElementById('email').value;
        const inquiry = document.getElementById('inquiry').value;
        
        alert(`Inquiry Sent: \nEmail: ${email}\nContent: ${inquiry.substring(0, 30)}...`);
        contactForm.reset();
    });

});