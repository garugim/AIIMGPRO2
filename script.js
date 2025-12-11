document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------
    // 1. 배경 패닝 (Parallax) 효과 구현
    // -------------------------------------
    const background = document.getElementById('background-container');
    const bgWidth = background.offsetWidth;
    const bgHeight = background.offsetHeight;

    document.addEventListener('mousemove', (e) => {
        // 마우스 위치 (x, y)를 0 ~ 1 사이의 값으로 정규화
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        // 배경을 움직일 최대 거리 설정 (예: 25% 중앙에서 움직임)
        const maxMoveX = bgWidth * 0.25; 
        const maxMoveY = bgHeight * 0.25;

        // 배경 위치 계산: 마우스가 좌측 상단일 때 배경이 우측 하단으로 이동
        // 초기 transform: translate(-25%, -25%)를 기준으로 움직임
        const xTranslate = -25 + (mouseX * 50); // -25% 에서 +25% (총 50%)
        const yTranslate = -25 + (mouseY * 50); // -25% 에서 +25%

        background.style.transform = `translate(${xTranslate}%, ${yTranslate}%)`;
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