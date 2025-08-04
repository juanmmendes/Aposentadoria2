// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SLIDER DE DEPOIMENTOS =====
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active de todos os cards e dots
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Adiciona active ao card e dot atual
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % testimonialCards.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        showSlide(prev);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Event listeners para os botões
    if (nextBtn) nextBtn.addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        stopSlideShow();
        prevSlide();
        startSlideShow();
    });

    // Event listeners para os dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlideShow();
            showSlide(index);
            startSlideShow();
        });
    });

    // Inicia o slideshow automático
    startSlideShow();

    // Para o slideshow quando o mouse está sobre o slider
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopSlideShow);
        slider.addEventListener('mouseleave', startSlideShow);
    }

    // ===== MÁSCARA PARA TELEFONE =====
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value.replace(/(\d{0,2})/, '($1');
                } else if (value.length <= 6) {
                    value = value.replace(/(\d{2})(\d{0,4})/, '($1) $2');
                } else if (value.length <= 10) {
                    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
            }
            
            e.target.value = value;
        });
    }

    // ===== VALIDAÇÃO E ENVIO DO FORMULÁRIO =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coleta os dados do formulário
            const formData = new FormData(contactForm);
            const dados = {
                nome: formData.get('nome'),
                email: formData.get('email'),
                telefone: formData.get('telefone'),
                idade: formData.get('idade'),
                tempo_contribuicao: formData.get('tempo_contribuicao'),
                situacao: formData.get('situacao')
            };

            // Validação básica
            if (!dados.nome || !dados.email || !dados.telefone || !dados.idade || !dados.tempo_contribuicao) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(dados.email)) {
                alert('Por favor, insira um email válido.');
                return;
            }

            // Simula envio do formulário
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            // Simula delay de envio
            setTimeout(() => {
                alert('Obrigado! Suas informações foram enviadas com sucesso. Em breve entraremos em contato.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Redireciona para WhatsApp com dados pré-preenchidos
                const mensagem = `Olá! Preenchi o formulário no site com os seguintes dados:
Nome: ${dados.nome}
Email: ${dados.email}
Telefone: ${dados.telefone}
Idade: ${dados.idade}
Tempo de contribuição: ${dados.tempo_contribuicao}
Situação: ${dados.situacao || 'Não informado'}

Gostaria de mais informações sobre aposentadoria.`;
                
                const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`;
                window.open(whatsappUrl, '_blank');
            }, 2000);
        });
    }

    // ===== ANIMAÇÕES DE SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplica animação aos elementos
    const animatedElements = document.querySelectorAll('.pain-point-card, .rule-card, .benefit-item, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== SCROLL SUAVE PARA ÂNCORAS =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header-fixed').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== BOTÕES EXPANSÍVEIS DAS REGRAS =====
    const expandButtons = document.querySelectorAll('.btn-expand');
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.rule-card');
            const isExpanded = card.classList.contains('expanded');
            
            // Remove expanded de todos os cards
            document.querySelectorAll('.rule-card').forEach(c => c.classList.remove('expanded'));
            
            if (!isExpanded) {
                card.classList.add('expanded');
                this.textContent = 'Mostrar Menos';
                
                // Adiciona conteúdo expandido se não existir
                let expandedContent = card.querySelector('.expanded-content');
                if (!expandedContent) {
                    expandedContent = document.createElement('div');
                    expandedContent.className = 'expanded-content';
                    
                    const ruleTitle = card.querySelector('h3').textContent;
                    let content = '';
                    
                    switch(ruleTitle) {
                        case 'Regra dos Pontos':
                            content = `
                                <h4>Detalhes da Regra dos Pontos:</h4>
                                <ul>
                                    <li>A pontuação aumenta 1 ponto por ano até atingir 105 pontos (homens) e 100 pontos (mulheres)</li>
                                    <li>Não há idade mínima, apenas a soma idade + tempo de contribuição</li>
                                    <li>Valor da aposentadoria: 60% + 2% por ano que exceder 20 anos de contribuição (homens) ou 15 anos (mulheres)</li>
                                    <li>É uma das regras mais vantajosas para quem começou a contribuir cedo</li>
                                </ul>
                            `;
                            break;
                        case 'Regra da Idade Progressiva':
                            content = `
                                <h4>Detalhes da Idade Progressiva:</h4>
                                <ul>
                                    <li>A idade mínima aumenta 6 meses por ano até atingir 65 anos (homens) e 62 anos (mulheres)</li>
                                    <li>Em 2025: 63 anos (homens) e 58 anos (mulheres)</li>
                                    <li>Valor da aposentadoria: 60% + 2% por ano que exceder 20 anos de contribuição (homens) ou 15 anos (mulheres)</li>
                                    <li>Boa opção para quem quer se aposentar com idade específica</li>
                                </ul>
                            `;
                            break;
                        case 'Regra do Pedágio 50%':
                            content = `
                                <h4>Detalhes do Pedágio 50%:</h4>
                                <ul>
                                    <li>Apenas para quem estava a menos de 2 anos da aposentadoria em 13/11/2019</li>
                                    <li>Deve cumprir 50% a mais do tempo que faltava na data da reforma</li>
                                    <li>Não há idade mínima</li>
                                    <li>Valor integral da aposentadoria (100% da média)</li>
                                    <li>Regra mais vantajosa em termos de valor do benefício</li>
                                </ul>
                            `;
                            break;
                        case 'Regra do Pedágio 100%':
                            content = `
                                <h4>Detalhes do Pedágio 100%:</h4>
                                <ul>
                                    <li>Idade mínima: 60 anos (homens) e 57 anos (mulheres)</li>
                                    <li>Deve cumprir 100% do tempo que faltava para se aposentar em 13/11/2019</li>
                                    <li>Valor integral da aposentadoria (100% da média)</li>
                                    <li>Boa opção para quem quer garantir o valor integral</li>
                                    <li>Permite aposentadoria antes da regra geral</li>
                                </ul>
                            `;
                            break;
                    }
                    
                    expandedContent.innerHTML = content;
                    card.appendChild(expandedContent);
                }
                
                expandedContent.style.display = 'block';
            } else {
                this.textContent = 'Saiba Mais';
                const expandedContent = card.querySelector('.expanded-content');
                if (expandedContent) {
                    expandedContent.style.display = 'none';
                }
            }
        });
    });

    // ===== EFEITO PARALLAX NO HERO =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            const speed = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${speed}px)`;
        }
    });

    // ===== CONTADOR ANIMADO (se houver números) =====
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // ===== VALIDAÇÃO EM TEMPO REAL =====
    const inputs = document.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#e74c3c';
                this.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
            } else {
                this.style.borderColor = '#1EB980';
                this.style.boxShadow = '0 0 0 3px rgba(30, 185, 128, 0.1)';
            }
        });

        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(231, 76, 60)' && this.value.trim() !== '') {
                this.style.borderColor = '#1EB980';
                this.style.boxShadow = '0 0 0 3px rgba(30, 185, 128, 0.1)';
            }
        });
    });

    // ===== LOADING STATES PARA BOTÕES =====
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (!button.href || button.href.includes('#')) return;
        
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-submit')) return;
            
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 1000);
        });
    });

    // ===== OTIMIZAÇÃO DE PERFORMANCE =====
    // Lazy loading para imagens
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ===== ANALYTICS E TRACKING =====
    // Tracking de cliques nos CTAs
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-whatsapp-header, .whatsapp-float a');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aqui você pode adicionar código de tracking (Google Analytics, Facebook Pixel, etc.)
            console.log('CTA clicado:', this.textContent.trim());
        });
    });

    // Tracking de scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            // Tracking de profundidade de scroll
            if (maxScroll % 25 === 0) {
                console.log(`Scroll depth: ${maxScroll}%`);
            }
        }
    });

    console.log('Landing page carregada com sucesso! 🚀');
});

// ===== CSS ADICIONAL PARA ANIMAÇÕES =====
const additionalStyles = `
    .rule-card.expanded {
        transform: scale(1.02);
        box-shadow: 0 15px 40px rgba(26, 75, 132, 0.2);
    }
    
    .expanded-content {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #E0E7F0;
        display: none;
        animation: fadeInDown 0.3s ease-out;
    }
    
    .expanded-content h4 {
        color: #1A4B84;
        font-size: 1.1rem;
        margin-bottom: 15px;
        font-weight: 600;
    }
    
    .expanded-content ul {
        list-style: none;
        padding: 0;
    }
    
    .expanded-content li {
        padding: 8px 0;
        padding-left: 20px;
        position: relative;
        color: #666;
        line-height: 1.5;
    }
    
    .expanded-content li::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #1EB980;
        font-weight: bold;
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;

// Adiciona os estilos adicionais
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

