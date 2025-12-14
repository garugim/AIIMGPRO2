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
    // 2. 이미지 세부 정보 모달 기능 구현을 위한 변수 (유지)
    // ======================================
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.querySelector('.close-btn');
    const imageCards = document.querySelectorAll('.image-card');

    // [추가] 비디오 모달 관련 변수 선언
    const videoModal = document.getElementById('video-modal');
    const videoPlayerContainer = document.getElementById('video-player-container');
    const videoCloseBtn = document.querySelector('.video-close');
    const modalVideoTitle = document.getElementById('modal-video-title');
    const videoBoxes = document.querySelectorAll('.video-box');

    imageCards.forEach(card => {
        card.addEventListener('click', () => {
            // 활성화된 카드는 무시
            if (!card.classList.contains('active')) {
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

    // [추가] 비디오 모달 닫기 함수
    function closeVideoModal() {
        if (videoModal) {
            videoModal.style.display = 'none';
            // 비디오 재생 중지: iframe 내용을 비웁니다.
            if (videoPlayerContainer) {
                videoPlayerContainer.innerHTML = ''; 
            }
        }
    }

    // [추가] 비디오 박스 클릭 이벤트
    videoBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const videoUrl = box.getAttribute('data-video-url');
            const dataTitle = box.getAttribute('data-title');

            if (videoModal && videoPlayerContainer && videoUrl) {
                // iframe 태그 생성 및 URL 삽입 (autoplay=1 추가)
                const iframeHTML = `<iframe src="${videoUrl}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                
                videoPlayerContainer.innerHTML = iframeHTML;
                modalVideoTitle.textContent = dataTitle; 
                videoModal.style.display = 'block';
            }
        });
    });

    // [추가] 비디오 닫기 버튼 클릭 시
    if (videoCloseBtn) {
        videoCloseBtn.addEventListener('click', closeVideoModal);
    }
    
    // [수정] 모달 창 바깥 클릭 시 닫기 (이미지 및 비디오 모달 통합)
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
        if (e.target === videoModal) {
            closeVideoModal();
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