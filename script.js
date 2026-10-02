  /* ====== DADOS DE CONTATO — trocar aqui e vale para o site inteiro ====== */
  const WHATSAPP = "5564996531135";              // DDI + DDD + número, só dígitos
  const MENSAGEM = "Oi, Doane! Vim pelo site e gostaria de agendar um horário.";
  document.querySelectorAll('[data-whats]').forEach(a => {
    a.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(MENSAGEM);
    a.target = "_blank"; a.rel = "noopener";
  });

  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('menu');
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded','false');
  }));
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });

  // carrossel de serviços
  (function(){
    const track = document.getElementById('servicosTrack');
    const prev = document.querySelector('.carousel__btn--prev');
    const next = document.querySelector('.carousel__btn--next');
    if(!track) return;
    const step = () => track.querySelector('.service').getBoundingClientRect().width + 20;
    const sync = () => {
      prev.disabled = track.scrollLeft < 8;
      next.disabled = track.scrollLeft > track.scrollWidth - track.clientWidth - 8;
    };
    prev.addEventListener('click', () => track.scrollBy({left:-step()}));
    next.addEventListener('click', () => track.scrollBy({left:step()}));
    track.addEventListener('scroll', sync, {passive:true});
    window.addEventListener('resize', sync);
    sync();
  })();


  // fotos da seção 2 entram pelas laterais conforme a rolagem
  (function(){
    const alvos = document.querySelectorAll('.collage');
    if(!alvos.length) return;
    if(!('IntersectionObserver' in window)){
      alvos.forEach(el => el.classList.add('is-in'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        // entra na tela: fotos vêm das laterais. sai da tela: voltam, para repetir na rolagem
        e.target.classList.toggle('is-in', e.isIntersecting);
      });
    }, {threshold:.2, rootMargin:'0px 0px -6% 0px'});
    alvos.forEach(el => obs.observe(el));
  })();




  // comparativo antes/depois da hero (arrastar ou clicar)
  (function(){
    const fig = document.getElementById('compare');
    if(!fig) return;
    const box = fig.querySelector('.compare__box');
    const clip = fig.querySelector('.compare__clip');
    const img = clip.querySelector('.compare__img');
    const handle = fig.querySelector('.compare__handle');
    let pct = 50, arrastando = false;

    const aplicar = (v) => {
      pct = Math.min(Math.max(v, 4), 96);
      const largura = box.getBoundingClientRect().width;
      clip.style.setProperty('--x', pct + '%');
      handle.style.setProperty('--x', pct + '%');
      img.style.setProperty('--w', largura + 'px');   // mantém o recorte alinhado
      handle.setAttribute('aria-valuenow', Math.round(pct));
    };
    const daPosicao = (e) => {
      const r = box.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      aplicar((x / r.width) * 100);
    };

    box.addEventListener('pointerdown', (e) => { arrastando = true; box.setPointerCapture(e.pointerId); daPosicao(e); });
    box.addEventListener('pointermove', (e) => { if(arrastando) daPosicao(e); });
    box.addEventListener('pointerup', () => { arrastando = false; });
    box.addEventListener('pointercancel', () => { arrastando = false; });
    handle.addEventListener('keydown', (e) => {
      if(e.key === 'ArrowLeft'){ aplicar(pct - 4); e.preventDefault(); }
      if(e.key === 'ArrowRight'){ aplicar(pct + 4); e.preventDefault(); }
    });
    window.addEventListener('resize', () => aplicar(pct));
    aplicar(50);
  })();

