/* particles-config.js */

particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80, // 입자 총 개수
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#00ffff" // 입자 색상: 네온 청록색
        },
        "shape": {
            "type": "circle", // 입자 형태: 원
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": { "enable": false, }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": { "enable": false, }
        },
        "line_linked": {
            "enable": true,
            "distance": 150, // 입자 간 선 연결 거리
            "color": "#ff00ff", // 선 색상: 네온 마젠타색
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1, // 움직이는 속도 (1은 느린 속도)
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse" // 마우스 오버 시 입자가 밀려나는 효과
            },
            "onclick": {
                "enable": true,
                "mode": "push" // 클릭하면 입자가 추가되는 효과
            },
            "resize": true
        },
        "modes": {
            "repulse": {
                "distance": 100,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            }
        }
    },
    "retina_detect": true
});