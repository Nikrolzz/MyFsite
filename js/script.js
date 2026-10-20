document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Подсветка за курсором (Светящийся след)
    const glow = document.getElementById('cursorGlow');
    
    // Отслеживаем движение мыши только на ПК устройствах
    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    }

    // 2. Адаптивное бургер-меню
    const burger = document.getElementById('burgerMenu');
    const nav = document.getElementById('navLinks');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Открытие/закрытие меню
        nav.classList.toggle('nav-active');
        
        // Анимация иконки бургера
        burger.classList.toggle('toggle');
    });

    // Закрытие мобильного меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });

    // 3. Подсветка активного пункта меню при скролле (Intersection Observer)
    const sections = document.querySelectorAll('section');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        threshold: 0.3 // Секция считается активной, когда видно 30% ее площади
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // 4. Обработка формы и сохранение заявки (в LocalStorage как у вас в ТЗ)
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input, textarea');
        const formData = {
            name: inputs[0].value,
            email: inputs[1].value,
            message: inputs[2].value,
            date: new Date().toLocaleString()
        };

        // Сохраняем в массив заявок локального хранилища
        let requests = JSON.parse(localStorage.getItem('cg_requests')) || [];
        requests.push(formData);
        localStorage.setItem('cg_requests', JSON.stringify(requests));

        // Имитация успешной отправки
        alert(`Спасибо, ${formData.name}! Ваша заявка сохранена в базу.`);
        form.reset();
    });
});
