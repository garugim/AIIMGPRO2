document.addEventListener('DOMContentLoaded', () => {
    
    // ======================================
    // 1. 잔상 커서 효과 구현 및 동적 크기 조절
    // ======================================
    const glowCursor = document.getElementById('glow-cursor');

    // ⭐ [추가] 속도 계산을 위한 변수 ⭐
    let lastX = 0;
    let lastY = 0;
    let targetWidth = 20; // 기본 크기
    let targetHeight = 20;

    document.addEventListener('mousemove', (e) => {
        // ⭐ [수정] 마우스 위치 및 속도 계산 로직 추가 ⭐
        
        // 현재 속도 계산
        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        lastX = e.clientX;
        lastY = e.clientY;

        // 속도에 따라 목표 크기 설정 (최소 20px, 최대 40px)
        const maxSpeed = 50; 
        const scale = Math.min(1, speed / maxSpeed); // 0과 1 사이의 스케일 값
        
        // 커서가 늘어나는 듯한 느낌 (가로/세로 비율 유지하며 최대 40px까지 확장)
        // 상호작용 요소에 닿았을 때의 크기(35px)와 충돌하지 않도록 조정
        let baseSize = 20;
        let maxSize = 40;

        if (glowCursor.classList.contains('cursor-pointer')) {
            baseSize = 35; // 버튼 위에 있을 때의 기본 크기
            maxSize = 45; // 버튼 위에서 더 빠르게 움직일 때의 최대 크기
        }

        targetWidth = baseSize + scale * (maxSize - baseSize); 
        targetHeight = baseSize + scale * (maxSize - baseSize); 
        
        requestAnimationFrame(() => {
            // 커서 위치 업데이트
            if (glowCursor) { // 요소가 존재하는지 확인
                glowCursor.style.left = `${e.clientX}px`;
                glowCursor.style.top = `${e.clientY}px`;
            }
        });
    });
    
    // ⭐ [추가] 커서 크기를 부드럽게 업데이트하는 루프 (잔상 효과) ⭐
    function updateCursorSize() {
        if (glowCursor) {
            // 현재 크기와 목표 크기 사이를 20%씩 보간 (easing 효과)
            const currentWidth = parseFloat(glowCursor.style.width) || 20;
            const currentHeight = parseFloat(glowCursor.style.height) || 20;

            const newWidth = currentWidth + (targetWidth - currentWidth) * 0.2;
            const newHeight = currentHeight + (targetHeight - currentHeight) * 0.2;
            
            glowCursor.style.width = `${newWidth}px`;
            glowCursor.style.height = `${newHeight}px`;
        }

        // 다음 프레임에 다시 실행
        requestAnimationFrame(updateCursorSize);
    }

    // 루프 시작
    updateCursorSize();
    
    // ======================================
    // 1.5. 마우스 반응형 커서 로직 (기존 코드 유지)
    // ======================================
    const interactiveElements = document.querySelectorAll(
        'a, button, .image-card, .video-box, input, textarea' 
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (glowCursor) {
                // 클래스 추가 시, targetWidth/Height가 35px 이상에서 시작되도록 조정
                glowCursor.classList.add('cursor-pointer'); 
                targetWidth = 35; 
                targetHeight = 35;
            }
        });

        element.addEventListener('mouseleave', () => {
            if (glowCursor) {
                // 클래스 제거 시, targetWidth/Height가 20px부터 시작되도록 조정
                glowCursor.classList.remove('cursor-pointer');
                targetWidth = 20;
                targetHeight = 20;
            }
        });
    });

    // ======================================
    // 2. 모달 기능 변수 선언 (기존 코드 유지)
    // ======================================
    // 이미지 모달 변수
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.querySelector('.close-btn');
    const imageCards = document.querySelectorAll('.image-card');

    // [추가된 부분] 비디오 모달 변수
    const videoModal = document.getElementById('video-modal');
    const videoPlayerContainer = document.getElementById('video-player-container');
    const videoCloseBtn = document.querySelector('.video-close');
    const modalVideoTitle = document.getElementById('modal-video-title');
    const videoBoxes = document.querySelectorAll('#video-section .video-box'); // 섹션 내 비디오 박스만 선택

    // -------------------------------------
    // 2A. 이미지 세부 정보 모달 기능 구현 
    // -------------------------------------
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
                
                // 줄 바꿈 적용을 위한 innerHTML 사용
                modalDesc.innerHTML = desc; 
                
                modal.style.display = "block";
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) modal.style.display = "none";
        });
    }

    // -------------------------------------
    // 2B. [추가된 부분] 비디오 모달 기능 구현
    // -------------------------------------
    
    // 비디오 모달을 닫는 함수 (재생 중지 포함)
    function closeVideoModal() {
        if (videoModal) {
            videoModal.style.display = 'none';
            if (videoPlayerContainer) {
                videoPlayerContainer.innerHTML = ''; // 콘텐츠 비우기
            }
        }
    }
    
    videoBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const videoFile = box.getAttribute('data-video-file');
            const dataTitle = box.getAttribute('data-title');
            const thumbnailFile = box.getAttribute('data-thumbnail'); 

            if (videoModal && videoPlayerContainer && videoFile) {
                
                const videoHTML = `<video width="100%" height="100%" controls autoplay poster="${thumbnailFile}">
                                       <source src="${videoFile}" type="video/${videoFile.endsWith('.webm') ? 'webm' : 'mp4'}">
                                       브라우저가 비디오 태그를 지원하지 않습니다.
                                   </video>`;
                
                videoPlayerContainer.innerHTML = videoHTML;
                modalVideoTitle.textContent = dataTitle; 
                videoModal.style.display = 'block';
            }
        });
    });

    // 비디오 닫기 버튼 클릭 시
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