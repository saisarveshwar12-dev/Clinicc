document.addEventListener('DOMContentLoaded', () => {
    // Top Navbar Stickiness
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if(navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-q');
        question.addEventListener('click', () => {
            // Close others
            faqItems.forEach(other => {
                if(other !== item) {
                    other.classList.remove('active');
                    other.querySelector('.faq-q').querySelector('i').classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            });
            // Toggle current
            item.classList.toggle('active');
            const icon = question.querySelector('i');
            if(item.classList.contains('active')) {
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
        });
    });

    // Testimonial Slider
    const testiCards = document.querySelectorAll('.testi-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        testiCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testiCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    setInterval(() => {
        currentSlide = (currentSlide + 1) % testiCards.length;
        showSlide(currentSlide);
    }, 5000);

    // Form Submission Mock
    const appointmentForm = document.getElementById('appointmentForm');
    const formMsg = document.getElementById('formMsg');
    
    if(appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = appointmentForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Booking...';
            
            setTimeout(() => {
                btn.innerText = originalText;
                formMsg.style.display = 'block';
                formMsg.innerText = '✅ Appointment request sent successfully! We will contact you shortly.';
                appointmentForm.reset();
                
                setTimeout(() => {
                    formMsg.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    // Scroll Reveal Animation (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal, .reveal-right');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Chatbot functionality
    const chatToggle = document.getElementById('chatToggle');
    const chatbotUI = document.getElementById('chatbotUI');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');
    const chatBody = document.getElementById('chatBody');

    chatToggle.addEventListener('click', () => {
        chatbotUI.classList.toggle('open');
    });

    closeChat.addEventListener('click', () => {
        chatbotUI.classList.remove('open');
    });

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('msg', sender);
        msgDiv.innerText = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function handleChat() {
        const text = chatInput.value.trim();
        if(text === '') return;
        
        addMessage(text, 'user');
        chatInput.value = '';

        // Simple Bot Responses
        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let response = "I'm a virtual assistant. Please contact us at +1 (555) 123-4567 for detailed inquiries.";
            
            if(lowerText.includes('book') || lowerText.includes('appointment')) {
                response = "You can book an appointment using the form on our website or by calling us directly.";
            } else if(lowerText.includes('price') || lowerText.includes('cost')) {
                response = "Prices vary depending on the treatment. Please schedule a consultation for an accurate estimate.";
            } else if(lowerText.includes('hello') || lowerText.includes('hi')) {
                response = "Hello! How can I assist you with your dental needs today?";
            }
            
            addMessage(response, 'bot');
        }, 1000);
    }

    sendChat.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') handleChat();
    });

    // Initial Trigger for scroll elements in view on load
    setTimeout(() => {
        reveals.forEach(r => {
            const windowHeight = window.innerHeight;
            const elementTop = r.getBoundingClientRect().top;
            if(elementTop < windowHeight) {
                r.classList.add('active');
            }
        });
    }, 100);
});
