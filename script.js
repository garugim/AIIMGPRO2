document.addEventListener('DOMContentLoaded', () => {
const glowCursor = document.getElementById('glow-cursor');

    // 마우스 이동 이벤트 리스너
    document.addEventListener('mousemove', (e) => {
        // 커서 위치 업데이트
        // requestAnimationFrame을 사용하여 부드러운 움직임을 만듭니다.
        requestAnimationFrame(() => {
            glowCursor.style.left = `${e.clientX}px`;
            glowCursor.style.top = `${e.clientY}px`;
        });
    });


    // -------------------------------------
    // 2. 이미지 섹션 카드 슬라이더 구현
    // -------------------------------------
    const cards = document.querySelectorAll('.image-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentCardIndex = 0;

    function updateCardDisplay() {
        cards.forEach((card, index) => {
            // 현재 활성화된 카드만 'active' 클래스를 가짐
            if (index === currentCardIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        // 이전 카드로 이동 (순환)
        currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
        updateCardDisplay();
    });

    nextBtn.addEventListener('click', () => {
        // 다음 카드로 이동 (순환)
        currentCardIndex = (currentCardIndex + 1) % cards.length;
        updateCardDisplay();
    });

    // 초기 카드 설정
    updateCardDisplay();


    // -------------------------------------
    // 3. 컨택 폼 제출 이벤트 (실제 서버 연결 필요)
    // -------------------------------------
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 여기에 실제 메일 발송 로직 (예: Fetch API를 이용한 백엔드 서버 호출) 구현 필요
        // 현재는 콘솔 메시지로 대체
        console.log("폼 제출 감지!");
        const email = document.getElementById('email').value;
        const inquiry = document.getElementById('inquiry').value;
        
        // 예시 메시지
        alert(`Inquiry Sent: \nEmail: ${email}\nContent: ${inquiry.substring(0, 30)}...`);
        contactForm.reset();
    });

});