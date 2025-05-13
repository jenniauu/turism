document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('main');
    let fontSize = 1; // Tamanho inicial da fonte em rem
    const increaseButton = document.getElementById('increase-font');
    const decreaseButton = document.getElementById('decrease-font');

    // Atualiza o tamanho da fonte e notifica screen readers
    function updateFontSize(size) {
        fontSize = size;
        mainContent.style.fontSize = fontSize + 'rem';
        // Atualiza os atributos ARIA
        increaseButton.setAttribute('aria-label', `Aumentar fonte para ${size + 0.1}rem`);
        decreaseButton.setAttribute('aria-label', `Reduzir fonte para ${size - 0.1}rem`);
    }

    // Botão de aumentar fonte
    increaseButton.addEventListener('click', () => {
        const newSize = Math.min(2, fontSize + 0.1); // Limite máximo de 2rem
        updateFontSize(newSize);
    });

    // Botão de reduzir fonte
    decreaseButton.addEventListener('click', () => {
        const newSize = Math.max(1, fontSize - 0.1); // Limite mínimo de 1rem
        updateFontSize(newSize);
    });

    // Funcionalidade com teclado
    function handleKeyboard(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (event.target === increaseButton) {
                const newSize = Math.min(2, fontSize + 0.1);
                updateFontSize(newSize);
            } else if (event.target === decreaseButton) {
                const newSize = Math.max(1, fontSize - 0.1);
                updateFontSize(newSize);
            }
        }
    }

    // Adicionar event listeners para teclado
    increaseButton.addEventListener('keydown', handleKeyboard);
    decreaseButton.addEventListener('keydown', handleKeyboard);

    // Melhorar acessibilidade com ARIA
    increaseButton.setAttribute('role', 'button');
    increaseButton.setAttribute('aria-label', 'Aumentar fonte para 1.1rem');
    decreaseButton.setAttribute('role', 'button');
    decreaseButton.setAttribute('aria-label', 'Reduzir fonte para 0.9rem');
    const header = document.querySelector('header');
    const fontControls = document.querySelector('.font-controls');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Correção dos links de navegação
    document.getElementById('sobre-link').addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector('h2');
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });

    document.getElementById('dicas-link').addEventListener('click', (e) => {
        e.preventDefault();
        const aside = document.querySelector('aside');
        const headerHeight = header.offsetHeight;
        const asidePosition = aside.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: asidePosition,
            behavior: 'smooth'
        });
        
        // Efeito de piscar
        aside.style.animation = 'none';
        void aside.offsetWidth;
        aside.style.animation = 'piscar 0.5s 2';
    });

    // Link de Destinos já funciona com âncora, mas podemos melhorar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if(this.getAttribute('id') !== 'dicas-link' && 
               this.getAttribute('id') !== 'sobre-link') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                if(target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});