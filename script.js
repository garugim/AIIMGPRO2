document.addEventListener('DOMContentLoaded', () => {
    
    // ======================================
    // 1. 잔상 커서 효과 구현 (유지)
    // ======================================
    const glowCursor = document.getElementById('glow-cursor');

    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            // 커서 위치 업데이트
            if (glowCursor) { // 요소가 존재하는지 확인
                glowCursor.style.left = `${e.clientX}px`;
                glowCursor.style.top = `${e.clientY}px`;
            }
        });
    });

    // ======================================
    // 2. 이미지 세부 정보 모달 기능 구현 (유지)
    // ======================================
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.querySelector('.close-btn');
    const imageCards = document.querySelectorAll('.image-card');

    imageCards.forEach(card => {
        card.addEventListener('click', () => {
            // 요소가 모두 존재하는지 확인하는 방어 코드 추가
            if (!card.classList.contains('active')) {
            // 활성화되지 않은 카드는 무시
            return; 
        }
            if (modal && modalImage) { 
                const imgSrc = card.querySelector('img').src;
                const title = card.getAttribute('data-title');
                const desc = card.getAttribute('data-desc');

                modalImage.src = imgSrc;
                modalTitle.textContent = title;
                modalDesc.textContent = desc;
                modal.style.display = "block";
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) modal.style.display = "none";
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });


    // ======================================
    // 3. 이미지 섹션 카드 슬라이더 구현 (유지)
    // ======================================
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

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
            updateCardDisplay();
        });

        nextBtn.addEventListener('click', () => {
            currentCardIndex = (currentCardIndex + 1) % cards.length;
            updateCardDisplay();
        });
    }

    if (cards.length > 0) {
        updateCardDisplay();
    }


    // ======================================
    // 4. 컨택 폼 제출 이벤트 (유지)
    // ======================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            console.log("폼 제출 감지!");
            const email = document.getElementById('email').value;
            const inquiry = document.getElementById('inquiry').value;
            
            alert(`Inquiry Sent: \nEmail: ${email}\nContent: ${inquiry.substring(0, 30)}...`);
            contactForm.reset();
        });
    }


    // ======================================
    // 5. 상단 Nav 스무스 스크롤 구현 (유지)
    // ======================================
    document.querySelectorAll('#top-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});