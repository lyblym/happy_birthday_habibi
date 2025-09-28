function showSidebar() {
    const sidebar = document.querySelector(".sidebar")
    sidebar.style.display = `flex`
}

function hideSidebar() {
    const sidebar = document.querySelector(".sidebar")
    sidebar.style.display = `none`
}



function createConfetti() {
            const colors = ['#ff6b35', '#ff4757', '#ffeb3b', '#ffc107', '#e056fd', '#686de0'];
            
            for(let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'falling-confetti';
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.animationDelay = Math.random() * 3 + 's';
                    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                    
                    document.body.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 5000);
                }, i * 100);
            }
        }

        function restartAnimation() {
            // Сбрасываем все элементы
            const elements = document.querySelectorAll('.cake-layer, .cream, .candle, .flame, .message, .love');
            elements.forEach(el => {
                el.classList.add('reset-animation');
            });
            
            // Удаляем конфетти
            const confetti = document.querySelectorAll('.falling-confetti');
            confetti.forEach(c => c.remove());
            
            setTimeout(() => {
                elements.forEach(el => {
                    el.classList.remove('reset-animation');
                });
            }, 100);
        }

        // Запускаем конфетти после завершения анимации
        setTimeout(() => {
            createConfetti();
        }, 6000);

        // Добавляем звуковые эффекты при клике
        document.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                createConfetti();
            }
        });




        console.clear();

/* SETUP */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);
camera.position.z = 500;

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* CONTROLS */
const controlsWebGL = new THREE.OrbitControls(camera, renderer.domElement);

/* PARTICLES */
// Create a global gsap timeline that contains all tweens
const tl = gsap.timeline({
  repeat: -1,
  yoyo: true
});

const path = document.querySelector("path");
const length = path.getTotalLength();
const vertices = [];
for (let i = 0; i < length; i += 0.1) {
  const point = path.getPointAtLength(i);
  const vector = new THREE.Vector3(point.x, -point.y, 0);
  vector.x += (Math.random() - 0.5) * 30;
  vector.y += (Math.random() - 0.5) * 30;
  vector.z += (Math.random() - 0.5) * 70;
  vertices.push(vector);
  // Create a tween for that vector
  tl.from(vector, {
      x: 600 / 2, // Center X of the heart
      y: -552 / 2, // Center Y of the heart
      z: 0, // Center of the scene
      ease: "power2.inOut",
      duration: "random(2, 5)" // Random duration
    },
    i * 0.002 // Delay calculated from the distance along the path
  );
}
const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
const material = new THREE.PointsMaterial( { color: 0xee5282, blending: THREE.AdditiveBlending, size: 3 } );
const particles = new THREE.Points(geometry, material);
// Offset the particles in the scene based on the viewbox values
particles.position.x -= 600 / 2;
particles.position.y += 552 / 2;
scene.add(particles);

gsap.fromTo(scene.rotation, {
  y: -0.2
}, {
  y: 0.2,
  repeat: -1,
  yoyo: true,
  ease: 'power2.inOut',
  duration: 3
});

/* RENDERING */
function render() {
  requestAnimationFrame(render);
  // Update the geometry from the animated vertices
  geometry.setFromPoints(vertices);
  renderer.render(scene, camera);
}

/* EVENTS */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize, false);

requestAnimationFrame(render);




function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
            
            const colors = ['#ff69b4', '#ff1493', '#ff6347', '#ffc0cb', '#ff4500'];
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 5000);
        }

        // Создание звездочек
        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.animationDelay = Math.random() * 2 + 's';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 3000);
        }

        // Создание плавающего текста
        function createFloatingText() {
            const texts = ['Love', 'Люблю', '💕', '😘', '🥰', '❤️', 'Kiss', 'Hug'];
            const text = document.createElement('div');
            text.className = 'floating-text';
            text.textContent = texts[Math.floor(Math.random() * texts.length)];
            text.style.left = Math.random() * 80 + 10 + 'vw';
            text.style.top = Math.random() * 80 + 10 + 'vh';
            text.style.animationDelay = Math.random() * 3 + 's';
            
            document.body.appendChild(text);
            
            setTimeout(() => {
                if (text.parentNode) {
                    text.parentNode.removeChild(text);
                }
            }, 6000);
        }

        // Взрыв сердечек при нажатии кнопки
        function createBurst() {
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    createHeart();
                }, i * 100);
            }
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    createSparkle();
                }, i * 150);
            }
        }

        // Автоматическое создание элементов
        setInterval(createHeart, 800);
        setInterval(createSparkle, 2000);
        setInterval(createFloatingText, 1500);

        // Интерактивность при движении мыши
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.9) {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.style.left = e.clientX + 'px';
                heart.style.top = e.clientY + 'px';
                heart.style.fontSize = '10px';
                heart.style.position = 'fixed';
                heart.style.pointerEvents = 'none';
                heart.style.animation = 'fadeOut 1s ease-out forwards';
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 1000);
            }
        });

        // Дополнительная анимация исчезновения
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                0% { opacity: 1; transform: scale(1) translateY(0); }
                100% { opacity: 0; transform: scale(0) translateY(-30px); }
            }
        `;
        document.head.appendChild(style);