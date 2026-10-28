/**
 * ELEVATE PROPERTIES — Architectural Application Logic
 * Interactive features:
 * 1. Hero Horizon Switcher
 * 2. Web Audio Ambient Twilight Synthesizer
 * 3. Animated Number Counters
 * 4. Filterable Project Gallery
 * 5. Architectural Detail Modal Drawer
 * 6. Materiality Archive Specimen Explorer ("The Live Thing")
 * 7. Consultation Dispatch Form
 * 8. Mobile Navigation Drawer
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. DATA REPOSITORIES
  // =========================================================================

  const projectsData = {
    'horizon': {
      title: 'THE HORIZON HOUSE',
      category: 'Coastal Estate · 2025',
      location: 'Costa Brava, Spain',
      img4k: 'images/project-horizon.jpg',
      imgRef: 'images/ref-project-1.jpg',
      narrative: 'Perched cantilevered 40 meters above the Mediterranean coastline, The Horizon House dissolves the distinction between indoor comfort and elemental nature. Cast-in-place board-formed concrete walls frame panoramic twilight views, while thermal double-glazed pivot glass walls open to an infinity lap pool.',
      type: 'Private Coastal Estate',
      area: '820 m² / 8,820 sq ft',
      materials: 'Board-formed Concrete, Roman Travertine, Low-Iron Glass',
      year: '2025'
    },
    'stone-light': {
      title: 'STONE / LIGHT',
      category: 'Lakeside Villa · 2024',
      location: 'Como, Italy',
      img4k: 'images/project-stone-light.jpg',
      imgRef: 'images/ref-project-2.jpg',
      narrative: 'Nestled into terraced olive groves overlooking Lake Como, Stone / Light explores the tension between monumental dry-stacked alpine limestone and razor-thin bronze window frames. A pristine reflecting pool mirrors the dramatic surrounding peaks and shifting twilight sky.',
      type: 'Lakeside Residence & Guest Pavilion',
      area: '640 m² / 6,880 sq ft',
      materials: 'Rough-Hewn Lombardy Limestone, Bronze Patina, Fluted Glass',
      year: '2024'
    },
    'ridge-retreat': {
      title: 'THE RIDGE RETREAT',
      category: 'Pacific Sanctuary · 2026',
      location: 'Big Sur, California',
      img4k: 'images/project-ridge.jpg',
      imgRef: 'images/ref-project-3.jpg',
      narrative: 'Sited on a narrow ocean ridge amidst coastal redwoods, this minimalist glass and blackened steel pavilion captures the legendary Pacific fog rolling over Big Sur. Built entirely off-grid with ground-source geothermal heating and monolithic thermal mass.',
      type: 'Off-Grid Coastal Sanctuary',
      area: '910 m² / 9,795 sq ft',
      materials: 'Blackened Steel I-Beams, Western Red Cedar, Honed Basalt',
      year: '2026'
    }
  };

  const materialsData = {
    'travertine': {
      name: 'TRAVERTINE NAVONA',
      img: 'images/material-travertine.jpg',
      desc: 'Extracted from historical quarries in Tivoli, this travertine exhibits delicate linear porosity and warm bone hues. Honed without synthetic filler to retain tactile coolness under direct sun.',
      thermal: 'High (840 J/kg·K)',
      acoustic: '0.32 NRC (Unfilled Micro-cavities)',
      aging: 'Noble Honey Patina',
      project: 'Stone / Light & Salon V'
    },
    'concrete': {
      name: 'BOARD-FORMED CONCRETE',
      img: 'images/material-concrete.jpg',
      desc: 'Formed using rough-sawn Douglas fir boards with pronounced wood grain. The concrete absorbs the resin and knots of the timber during curing, producing a monolithic structural skin.',
      thermal: 'Monumental (1,000 J/kg·K)',
      acoustic: 'Acoustically Reflective / Bass Trap',
      aging: 'Velvety Mineral Bloom',
      project: 'The Horizon House (Spine)'
    },
    'stone': {
      name: 'ROUGH-HEWN LIMESTONE',
      img: 'images/material-stone.jpg',
      desc: 'Hand-split limestone blocks sourced within 15 kilometers of the project site. Laid with concealed lime mortar to establish seamless geological continuity with mountain bedrock.',
      thermal: 'High (920 J/kg·K)',
      acoustic: 'Diffusive Sound Scattering',
      aging: 'Weathered Grey Mineralization',
      project: 'Stone / Light (Como Villa)'
    },
    'timber': {
      name: 'YAKISUGI CHARRED CEDAR',
      img: 'images/material-timber.jpg',
      desc: 'Superficial heat treatment producing a dense carbonized outer crust. Naturally resistant to marine rot, insect predation, and wildfires without chemical sealants.',
      thermal: 'Moderate Insulator (1,400 J/kg·K)',
      acoustic: 'Mild Sound Absorption',
      aging: 'Subtle Silver Carbon Sheen',
      project: 'The Ridge Retreat (Soffits)'
    }
  };

  const heroSlides = [
    {
      img: 'images/hero-cliffside.jpg',
      title: 'BUILT TO ENDURE.',
      sub: 'Elevate Properties is an architectural studio designing site-responsive private residences across the Mediterranean and coastal California.',
      nextPreview: 'images/project-ridge.jpg'
    },
    {
      img: 'images/project-stone-light.jpg',
      title: 'STONE / LIGHT.',
      sub: 'Monumental limestone pavilions harmonized with ancient alpine olive groves in Como, Italy.',
      nextPreview: 'images/project-horizon.jpg'
    },
    {
      img: 'images/project-ridge.jpg',
      title: 'RIDGE SANCTUARY.',
      sub: 'Minimalist steel and glass floating above misty Pacific redwoods in Big Sur, California.',
      nextPreview: 'images/hero-cliffside.jpg'
    }
  ];

  let currentHeroIndex = 0;

  // =========================================================================
  // 2. HERO PROJECT SWITCHER
  // =========================================================================
  const heroMainImg = document.getElementById('hero-main-img');
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtext = document.querySelector('.hero-subtext');
  const heroPeek = document.getElementById('hero-peek');
  const heroPeekImg = document.getElementById('hero-peek-img');

  function switchHeroSlide(index) {
    currentHeroIndex = (index !== undefined) ? index : (currentHeroIndex + 1) % heroSlides.length;
    const slide = heroSlides[currentHeroIndex];

    if (!heroMainImg) return;
    heroMainImg.style.opacity = '0';
    heroMainImg.style.transform = 'scale(1.02)';

    setTimeout(() => {
      heroMainImg.src = slide.img;
      if (heroTitle) heroTitle.textContent = slide.title;
      if (heroSubtext) heroSubtext.textContent = slide.sub;
      if (heroPeekImg) heroPeekImg.src = slide.nextPreview;

      heroMainImg.style.opacity = '1';
      heroMainImg.style.transform = 'scale(1)';
    }, 280);
  }

  if (heroPeek) {
    heroPeek.addEventListener('click', () => switchHeroSlide());
    heroPeek.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        switchHeroSlide();
      }
    });
  }

  // =========================================================================
  // 3. WEB AUDIO AMBIENT TWILIGHT SYNTHESIZER
  // =========================================================================
  const ambientBtn = document.getElementById('ambient-btn');
  let audioCtx = null;
  let isAudioPlaying = false;
  let noiseNode = null;
  let filterNode = null;
  let lfoNode = null;
  let masterGain = null;

  function initAmbientAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      // Synthesize pink noise for natural sea surf & coastal wind
      const bufferSize = audioCtx.sampleRate * 2;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
        b6 = white * 0.115926;
      }

      noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      noiseNode.loop = true;

      filterNode = audioCtx.createBiquadFilter();
      filterNode.type = 'lowpass';
      filterNode.frequency.setValueAtTime(320, audioCtx.currentTime);

      lfoNode = audioCtx.createOscillator();
      lfoNode.type = 'sine';
      lfoNode.frequency.setValueAtTime(0.12, audioCtx.currentTime); // 8-second wave swell cycle

      const lfoGain = audioCtx.createGain();
      lfoGain.gain.setValueAtTime(140, audioCtx.currentTime);
      lfoNode.connect(lfoGain);
      lfoGain.connect(filterNode.frequency);

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);

      noiseNode.connect(filterNode);
      filterNode.connect(masterGain);
      masterGain.connect(audioCtx.destination);

      noiseNode.start();
      lfoNode.start();
    } catch (e) {
      console.warn('Web Audio Ambient Synthesizer unavailable:', e);
    }
  }

  if (ambientBtn) {
    ambientBtn.addEventListener('click', () => {
      if (!audioCtx) initAmbientAudio();

      if (audioCtx) {
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }

        const label = ambientBtn.querySelector('.audio-label');
        if (!isAudioPlaying) {
          masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
          masterGain.gain.exponentialRampToValueAtTime(0.24, audioCtx.currentTime + 1.8);
          isAudioPlaying = true;
          ambientBtn.classList.add('playing');
          if (label) label.textContent = 'Muted (Off)';
        } else {
          masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
          masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
          isAudioPlaying = false;
          ambientBtn.classList.remove('playing');
          if (label) label.textContent = 'Atmosphere';
        }
      }
    });
  }

  // =========================================================================
  // 4. ANIMATED NUMBERS COUNTER
  // =========================================================================
  const statNumbers = document.querySelectorAll('.stat-value, .stat-number');
  let statsCounted = false;

  function countUp(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1500;
    const start = performance.now();

    function update(time) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
          statsCounted = true;
          statNumbers.forEach(num => countUp(num));
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  // =========================================================================
  // 5. PROJECT FILTERING
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-tab, .filter-btn');
  const projectCards = document.querySelectorAll('.project-feature-card, .project-diptych-card, .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = card.classList.contains('project-feature-card') ? 'grid' : 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 240);
        }
      });
    });
  });

  // =========================================================================
  // 6. PROJECT DETAIL MODAL DRAWER
  // =========================================================================
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-proj-img');
  const modalTitle = document.getElementById('modal-proj-title');
  const modalLoc = document.getElementById('modal-proj-loc');
  const modalDesc = document.getElementById('modal-proj-desc');
  const modalSpecType = document.getElementById('modal-spec-type');
  const modalSpecArea = document.getElementById('modal-spec-area');
  const modalSpecMaterials = document.getElementById('modal-spec-materials');
  const modalSpecYear = document.getElementById('modal-spec-year');

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !projectModal) return;

    if (modalImg) modalImg.src = data.img4k;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalLoc) modalLoc.textContent = data.location;
    if (modalDesc) modalDesc.textContent = data.narrative;
    if (modalSpecType) modalSpecType.textContent = data.type;
    if (modalSpecArea) modalSpecArea.textContent = data.area;
    if (modalSpecMaterials) modalSpecMaterials.textContent = data.materials;
    if (modalSpecYear) modalSpecYear.textContent = data.year;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const pId = card.getAttribute('data-project-id');
      if (pId) openProjectModal(pId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // =========================================================================
  // 7. MATERIALITY ARCHIVE EXPLORER
  // =========================================================================
  const materialTabs = document.querySelectorAll('.material-tab-item');
  const specimenImg = document.getElementById('specimen-img');
  const specimenName = document.getElementById('specimen-name');
  const specimenDesc = document.getElementById('specimen-desc');
  const specThermal = document.getElementById('spec-thermal');
  const specAcoustic = document.getElementById('spec-acoustic');
  const specAging = document.getElementById('spec-aging');
  const specProject = document.getElementById('spec-project');

  materialTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      materialTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const matKey = tab.getAttribute('data-material');
      const mat = materialsData[matKey];
      if (!mat || !specimenImg) return;

      specimenImg.style.opacity = '0';
      specimenImg.style.transform = 'scale(1.02)';

      setTimeout(() => {
        specimenImg.src = mat.img;
        if (specimenName) specimenName.textContent = mat.name;
        if (specimenDesc) specimenDesc.textContent = mat.desc;
        if (specThermal) specThermal.textContent = mat.thermal;
        if (specAcoustic) specAcoustic.textContent = mat.acoustic;
        if (specAging) specAging.textContent = mat.aging;
        if (specProject) specProject.textContent = mat.project;

        specimenImg.style.opacity = '1';
        specimenImg.style.transform = 'scale(1)';
      }, 200);
    });
  });

  // =========================================================================
  // 8. INQUIRY / CONSULTATION MODAL
  // =========================================================================
  const inquiryModal = document.getElementById('inquiry-modal');
  const inquiryCloseBtn = document.getElementById('inquiry-close-btn');
  const openInquiryBtns = document.querySelectorAll('.open-inquiry-modal');
  const inquiryForm = document.getElementById('inquiry-form');
  const formSuccessMsg = document.getElementById('form-success-msg');
  const inquirySubmitBtn = document.getElementById('inquiry-submit-btn');

  function openInquiryModal() {
    closeProjectModal();
    if (inquiryModal) {
      inquiryModal.classList.add('open');
      inquiryModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeInquiryModal() {
    if (inquiryModal) {
      inquiryModal.classList.remove('open');
      inquiryModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  openInquiryBtns.forEach(btn => btn.addEventListener('click', openInquiryModal));
  if (inquiryCloseBtn) inquiryCloseBtn.addEventListener('click', closeInquiryModal);
  if (inquiryModal) {
    inquiryModal.addEventListener('click', (e) => {
      if (e.target === inquiryModal) closeInquiryModal();
    });
  }

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (inquirySubmitBtn) {
        inquirySubmitBtn.disabled = true;
        inquirySubmitBtn.textContent = 'Transmitting dispatch...';
      }

      setTimeout(() => {
        if (inquirySubmitBtn) inquirySubmitBtn.style.display = 'none';
        if (formSuccessMsg) formSuccessMsg.style.display = 'block';
      }, 800);
    });
  }

  // =========================================================================
  // 9. MOBILE NAVIGATION DRAWER
  // =========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    if (drawerClose) {
      drawerClose.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    }

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // =========================================================================
  // 10. ENTRANCE & MOTION OBSERVER
  // =========================================================================
  const revealTargets = document.querySelectorAll(
    'section, .project-feature-card, .project-diptych-card, .journal-card, .principle-col, .stat-item, .material-tab-item'
  );

  revealTargets.forEach(el => el.classList.add('reveal-on-scroll'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealTargets.forEach(el => revealObserver.observe(el));

  const heroSection = document.getElementById('hero');
  if (heroSection) heroSection.classList.add('is-visible');

  // Asset comparator hook for master assets
  const toggleAssetBtn = document.getElementById('toggle-asset-mode');

  // Global ESC key listener to dismiss open modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeInquiryModal();
      if (mobileDrawer) mobileDrawer.classList.remove('open');
    }
  });

  console.log('ELEVATE PROPERTIES architectural engine initialized.');
});
