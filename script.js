class BootupAnimation {
    constructor() {
        this.bootupText = document.getElementById('bootup-text');
        this.bootupContainer = document.getElementById('bootup-container');
        this.mainContent = document.getElementById('main-content');
        this.currentIndex = 0;
        this.currentLine = 0;
        this.isTyping = false;
        
        this.bootupSequence = [
            "Initializing system...",
            "Loading SSL Certificate...",
            "Checking dependencies...",
            "Starting web server...",
            "Connecting to database...",
            "Loading user interface...",
            "Initializing...",
            "Welcome gng",
            "",
            "System ready. Opening Milderous.exe...",
            "",
            "> Starting portfolio application...",
            "> Checking for updates...",
            "> Loading projects...",
            "> Loading skills...",
            "> Loading tv off.mp3...",
            "> Website loaded successfully!",
            "",
            "idc if this looks corny, eat this veiny ahh dihh",
            "",
            "Closing Terminal..."
        ];
        
        this.init();
    }
    
    init() {
        this.startTyping();
        this.addKeyboardListener();
        this.startElevatorMusic();
    }
    
    startTyping() {
        if (this.currentLine < this.bootupSequence.length) {
            this.typeLine(this.bootupSequence[this.currentLine]);
        }
    }
    
    typeLine(line) {
        this.isTyping = true;
        let index = 0;
        
        const typeChar = () => {
            if (index < line.length) {
                this.bootupText.textContent += line[index];
                index++;
                setTimeout(typeChar, Math.random() * 50 + 20); 
            } else {
                this.isTyping = false;
                this.bootupText.textContent += '\n';
                this.currentLine++;
                setTimeout(() => {
                    if (this.currentLine < this.bootupSequence.length) {
                        this.startTyping();
                    } else {
                        this.waitForInput();
                    }
                }, 200);
            }
        };
        
        typeChar();
    }
    
    waitForInput() {
        const cursor = document.querySelector('.cursor');
        cursor.style.display = 'inline';

        setTimeout(() => {
            this.completeBootup();
        }, 3000);
    }
    
    addKeyboardListener() {
        document.addEventListener('keydown', (e) => {
            if (!this.isTyping && this.currentLine >= this.bootupSequence.length) {
                this.completeBootup();
            }
        });

        this.bootupContainer.addEventListener('click', () => {
            const elevatorMusic = document.getElementById('elevator-music');
            if (elevatorMusic && elevatorMusic.paused) {
                elevatorMusic.play().then(() => {
                    this.bootupContainer.style.cursor = 'default';
                    this.bootupContainer.classList.add('audio-enabled');
                }).catch(e => {
                    console.log('Audio play failed:', e);
                });
            }
        });
    }
    
    completeBootup() {
        const elevatorMusic = document.getElementById('elevator-music');
        if (elevatorMusic) {
            elevatorMusic.pause();
            elevatorMusic.currentTime = 0;
        }
        
        this.bootupContainer.classList.add('fade-out');
        
        setTimeout(() => {
            this.mainContent.classList.remove('hidden');
            this.bootupContainer.style.display = 'none';
            this.initMainContent();
            this.startMusicAfterBootup();
            startHeroCodeTyping();
        }, 500);
    }

    startElevatorMusic() {
        const elevatorMusic = document.getElementById('elevator-music');
        if (elevatorMusic) {
            elevatorMusic.volume = 0.3;
            const playPromise = elevatorMusic.play();
            if (playPromise !== undefined) {
                            playPromise.catch(e => {
                console.log('Elevator music autoplay blocked:', e);
            });
            }
        }
    }



    startMusicAfterBootup() {

        setTimeout(() => {
            const musicBtn = document.getElementById('music-toggle');
            if (musicBtn) {
                musicBtn.click();
            }
        }, 1000);
    }
}

class PortfolioApp {
    constructor() {
        this.init();
    }
    
    init() {
        this.initNavigation();
        this.initScrollAnimations();
        this.initSkillBars();
        this.initMobileMenu();
        this.initMusicPlayer();
        this.initFriendsCarousel();
    }
    
    initNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; 
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        });
    }
    
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        const sections = document.querySelectorAll('section');
        const cards = document.querySelectorAll('.project-card, .skill-category');
        
        sections.forEach(section => observer.observe(section));
        cards.forEach(card => observer.observe(card));
    }
    
    initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    progressBar.style.width = '0%';
                    
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 200);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => skillObserver.observe(bar));
    }
    

    
    initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    initMusicPlayer() {
        const musicBtn = document.getElementById('music-toggle');
        const audio = document.getElementById('background-music');
        
        if (musicBtn && audio) {
            let isPlaying = false;
            
            musicBtn.addEventListener('click', () => {
                if (isPlaying) {
                    audio.pause();
                    musicBtn.innerHTML = '<i class="fas fa-play"></i>';
                    musicBtn.classList.remove('playing');
                    isPlaying = false;
                } else {
                    audio.play().catch(e => {
                        console.log('Audio play failed:', e);
                        this.showNotification('Click the music button to start playing!', 'info');
                    });
                    musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    musicBtn.classList.add('playing');
                    isPlaying = true;
                }
            });

            audio.addEventListener('ended', () => {
                if (audio.loop) return;
                musicBtn.innerHTML = '<i class="fas fa-play"></i>';
                musicBtn.classList.remove('playing');
                isPlaying = false;
            });

            audio.addEventListener('error', () => {
                console.log('Audio error:', audio.error);
                this.showNotification('Audio file not found. Please check the audio source.', 'error');
            });
        }
    }

    initFriendsCarousel() {
        const track = document.getElementById('friends-track');
        const cards = document.querySelectorAll('.friend-card');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.getElementById('prev-friend');
        const nextBtn = document.getElementById('next-friend');
        
        if (!track || cards.length === 0) return;
        
        let currentIndex = 0;
        const totalCards = cards.length;
        
        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            cards.forEach((card, index) => {
                card.classList.toggle('active', index === currentIndex);
            });
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === totalCards - 1;
        }
        
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalCards - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            } else if (e.key === 'ArrowRight' && currentIndex < totalCards - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        let autoPlayInterval;
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalCards;
                updateCarousel();
            }, 5000); 
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        startAutoPlay();
        
        track.addEventListener('mouseenter', stopAutoPlay);
        track.addEventListener('mouseleave', startAutoPlay);

        updateCarousel();
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--primary-color)' : 'var(--secondary-color)'};
            color: var(--dark-bg);
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new BootupAnimation();
    
    setTimeout(() => {
        new PortfolioApp();
    }, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    const codeElement = document.querySelector('.code-content code');
    if (codeElement) {
        const originalText = codeElement.textContent;
        codeElement.textContent = '';
        
        let charIndex = 0;
        const typeCode = () => {
            if (charIndex < originalText.length) {
                codeElement.textContent += originalText[charIndex];
                charIndex++;
                setTimeout(typeCode, 50);
            }
        };

        const codeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeCode();
                    codeObserver.unobserve(entry.target);
                }
            });
        });
        
        codeObserver.observe(codeElement);
    }
    


    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

function startHeroCodeTyping() {
    const codeElement = document.querySelector('.code-content code');
    if (codeElement) {
        const originalText = codeElement.textContent;
        codeElement.textContent = '';
        let charIndex = 0;
        const typeCode = () => {
            if (charIndex < originalText.length) {
                codeElement.textContent += originalText[charIndex];
                charIndex++;
                setTimeout(typeCode, 50);
            }
        };
        typeCode();
    }
}

function startVHSNoise() {
    const canvas = document.getElementById('vhs-noise');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let lastFrame = 0;
    const fps = 30;
    const frameDuration = 1000 / fps;

    function drawNoise() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const lineCount = Math.floor(Math.random() * 8) + 6; 
        for (let i = 0; i < lineCount; i++) {
            const y = Math.random() * canvas.height;
            const lineLength = Math.random() * (canvas.width * 0.5) + 40;
            let x;

            const sideChance = Math.random();
            if (sideChance < 0.4) {

                x = Math.random() * (canvas.width * 0.25);
            } else if (sideChance < 0.8) {

                x = canvas.width - (Math.random() * (canvas.width * 0.25) + lineLength);
            } else {

                x = Math.random() * (canvas.width - lineLength);
            }
            const thickness = Math.random() * 2 + 1;

            const opacities = [0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85];
            const opacity = opacities[Math.floor(Math.random() * opacities.length)];
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = '#fff';
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + lineLength, y);
            ctx.lineWidth = thickness;
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = Math.random() * 6;
            ctx.stroke();
            ctx.restore();
        }
    }

    function animate(now) {
        if (!lastFrame || now - lastFrame >= frameDuration) {
            drawNoise();
            lastFrame = now;
        }
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}
document.addEventListener('DOMContentLoaded', () => {
    startVHSNoise();
});

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style); 
