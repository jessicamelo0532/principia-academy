const WHATSAPP_NUMERO = '5591999999999';

const CURSOS = {
    reforco: 'Reforço Escolar',
    enem: 'Intensivo Pré-Vestibular',
    mentoria: 'Mentoria Individual'
};

const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const menuLinks = document.querySelectorAll('.nav-links a');

function atualizarNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}

function fecharMenu() {
    navbar.classList.remove('menu-aberto');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('sem-rolagem');
}

function alternarMenu() {
    const aberto = navbar.classList.toggle('menu-aberto');
    menuToggle.setAttribute('aria-expanded', String(aberto));
    menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('sem-rolagem', aberto);
}

window.addEventListener('scroll', atualizarNavbar, { passive: true });
menuToggle.addEventListener('click', alternarMenu);
menuLinks.forEach((link) => link.addEventListener('click', fecharMenu));

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') fecharMenu();
});

window.matchMedia('(min-width: 961px)').addEventListener('change', (consulta) => {
    if (consulta.matches) fecharMenu();
});

const form = document.getElementById('form-contato');
const statusForm = form.querySelector('.form-status');
const selectInteresse = document.getElementById('interesse');

document.querySelectorAll('[data-curso]').forEach((botao) => {
    botao.addEventListener('click', () => {
        selectInteresse.value = botao.dataset.curso;
    });
});

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (!form.checkValidity()) {
        const primeiroInvalido = form.querySelector(':invalid');
        statusForm.textContent = 'Preencha nome, e-mail válido e o curso de interesse.';
        primeiroInvalido.focus();
        return;
    }

    const dados = new FormData(form);
    const linhas = [
        `Olá! Meu nome é ${dados.get('nome').trim()}.`,
        `Tenho interesse em: ${CURSOS[dados.get('interesse')]}.`,
        `E-mail: ${dados.get('email').trim()}`
    ];

    const telefone = dados.get('telefone').trim();
    if (telefone) linhas.push(`Telefone: ${telefone}`);

    const mensagem = dados.get('mensagem').trim();
    if (mensagem) linhas.push('', mensagem);

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(linhas.join('\n'))}`;
    window.open(url, '_blank', 'noopener');

    statusForm.textContent = 'Abrimos o WhatsApp com sua mensagem. É só tocar em enviar!';
    form.reset();
});

document.getElementById('ano').textContent = new Date().getFullYear();
atualizarNavbar();

if (window.lucide) window.lucide.createIcons();
