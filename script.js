/* ================================
   Valentine's Day Invitation
   Interactive JavaScript
   ================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const pages = {
        question: document.getElementById('page-question'),
        yes: document.getElementById('page-yes'),
        date: document.getElementById('page-date'),
        food: document.getElementById('page-food'),
        activity: document.getElementById('page-activity'),
        final: document.getElementById('page-final')
    };

    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const btnNextDate = document.getElementById('btn-next-date');
    const btnNextFood = document.getElementById('btn-next-food');
    const btnNextActivity = document.getElementById('btn-next-activity');
    const btnFinish = document.getElementById('btn-finish');

    const heartsBg = document.getElementById('hearts-bg');

    // Store selections
    const selections = {
        time: null,
        food: null,
        activity: null
    };

    // Create floating hearts
    createFloatingHearts();

    // =====================
    // Runaway No Button
    // =====================
    let noButtonMoveCount = 0;

    function moveNoButton(e) {
        noButtonMoveCount++;
        
        const btn = btnNo;
        const card = btn.closest('.card');
        const cardRect = card.getBoundingClientRect();
        
        // Calculate available space within card
        const btnWidth = btn.offsetWidth;
        const btnHeight = btn.offsetHeight;
        const padding = 20;
        
        // Get random position within the card bounds
        const maxX = cardRect.width - btnWidth - padding * 2;
        const maxY = cardRect.height - btnHeight - padding * 2;
        
        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY + 50; // Offset from top
        
        // Make sure button stays within reasonable bounds
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(100, Math.min(newY, maxY));
        
        // Apply movement
        btn.style.position = 'absolute';
        btn.style.left = newX + 'px';
        btn.style.top = newY + 'px';
        btn.style.zIndex = '100';
        
        // Change text after a few attempts
        const messages = [
            "No? 🥺",
            "Are you sure?",
            "Think again! 💕",
            "Please? 🥹",
            "Come on! 💖",
            "I'll be sad 😢",
            "Just say yes!",
            "Pretty please?",
            "🙏🙏🙏"
        ];
        
        if (noButtonMoveCount <= messages.length) {
            btn.textContent = messages[noButtonMoveCount - 1];
        } else {
            btn.textContent = messages[messages.length - 1];
        }
        
        // Make the Yes button more prominent
        btnYes.style.transform = `scale(${1 + noButtonMoveCount * 0.05})`;
    }

    // Desktop: mouseover
    btnNo.addEventListener('mouseover', moveNoButton);
    
    // Mobile: touchstart
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton(e);
    });

    // =====================
    // Navigation
    // =====================
    function showPage(pageName) {
        Object.values(pages).forEach(page => {
            page.classList.remove('active');
        });
        pages[pageName].classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Yes button - go to celebration page
    btnYes.addEventListener('click', () => {
        showPage('yes');
    });

    // Next to date selection
    btnNextDate.addEventListener('click', () => {
        showPage('date');
    });

    // Next to food selection
    btnNextFood.addEventListener('click', () => {
        if (selections.time) {
            showPage('food');
        }
    });

    // Next to activity selection
    btnNextActivity.addEventListener('click', () => {
        if (selections.food) {
            showPage('activity');
        }
    });

    // Finish - show final page
    btnFinish.addEventListener('click', () => {
        if (selections.activity) {
            updateSummary();
            showPage('final');
            createConfetti();
        }
    });

    // =====================
    // Radio Button Handlers
    // =====================
    
    // Time selection
    document.querySelectorAll('input[name="time"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selections.time = e.target.value;
            btnNextFood.disabled = false;
        });
    });

    // Food selection
    document.querySelectorAll('input[name="food"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selections.food = e.target.value;
            btnNextActivity.disabled = false;
        });
    });

    // Activity selection
    document.querySelectorAll('input[name="activity"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selections.activity = e.target.value;
            btnFinish.disabled = false;
        });
    });

    // =====================
    // Summary Update
    // =====================
    function updateSummary() {
        const timeLabels = {
            '2pm': '2:00 PM',
            '3pm': '3:00 PM',
            '4pm': '4:00 PM',
            'custom': 'Surprise Time! ✨'
        };

        const foodLabels = {
            'tacos': 'Tacos 🌮',
            'pizza': 'Pizza 🍕',
            'burger': 'Burger 🍔',
            'pasta': 'Pasta 🍝',
            'poke': 'Poke Bowl 🥗'
        };

        const activityLabels = {
            'movie': 'Movie 🎬',
            'bowling': 'Bowling 🎳',
            'museum': 'Museum 🏛️',
            'minigolf': 'Mini Golf ⛳',
            'stargazing': 'Stargazing 🌟'
        };

        document.getElementById('summary-date').textContent = 
            `February 14th at ${timeLabels[selections.time]}`;
        document.getElementById('summary-food').textContent = 
            foodLabels[selections.food];
        document.getElementById('summary-activity').textContent = 
            activityLabels[selections.activity];
    }

    // =====================
    // Floating Hearts
    // =====================
    function createFloatingHearts() {
        const hearts = ['💕', '💖', '💗', '💓', '❤️', '💘', '💝'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createHeart(hearts);
            }, i * 500);
        }

        // Continuously add hearts
        setInterval(() => {
            createHeart(hearts);
        }, 2000);
    }

    function createHeart(hearts) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (15 + Math.random() * 20) + 'px';
        heart.style.animationDuration = (8 + Math.random() * 7) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        heartsBg.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }

    // =====================
    // Confetti Effect
    // =====================
    function createConfetti() {
        const confettiContainer = document.getElementById('confetti');
        const colors = ['#ff6b9d', '#ffd700', '#ff1744', '#e91e63', '#9c27b0', '#ffffff'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti-piece';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = (5 + Math.random() * 10) + 'px';
                confetti.style.height = (5 + Math.random() * 10) + 'px';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                
                confettiContainer.appendChild(confetti);
                
                // Remove after animation
                setTimeout(() => {
                    confetti.remove();
                }, 3500);
            }, i * 50);
        }
    }
});
