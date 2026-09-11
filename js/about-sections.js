/* About page: lightweight industry tabs and scroll-led process progression. */
(function () {
  const industryData = {
    pharma: {
      name: 'Pharmaceuticals',
      icon: 'ai-pill',
      description: 'High-performance packaging where protection, consistency and compliance matter most.',
      formats: [['ai-pouch', 'Pouches'], ['ai-sachet', 'Sachets'], ['ai-roll', 'Rollstock'], ['ai-label', 'Labels']],
      benefits: ['Consistent print and production control', 'Structures engineered around the application', 'Quality checks across each production stage']
    },
    food: {
      name: 'Food & Beverage',
      icon: 'ai-food',
      description: 'Flexible packaging designed to protect freshness while giving products a strong shelf presence.',
      formats: [['ai-pouch', 'Pouches'], ['ai-sachet', 'Sachets'], ['ai-roll', 'Rollstock'], ['ai-label', 'Labels']],
      benefits: ['Application-led barrier structures', 'Vivid and repeatable print quality', 'Formats for varied filling requirements']
    },
    cosmetics: {
      name: 'Cosmetics & Toiletries',
      icon: 'ai-cosmetics',
      description: 'Presentation-led packaging with the functional performance required for personal-care products.',
      formats: [['ai-pouch', 'Pouches'], ['ai-sachet', 'Sachets'], ['ai-roll', 'Rollstock'], ['ai-label', 'Labels']],
      benefits: ['Premium print and finish options', 'Structures matched to the product', 'Flexible sizes and formats']
    },
    textiles: {
      name: 'Textiles',
      icon: 'ai-shirt',
      description: 'Clear, printed and flexible formats built around textile presentation, handling and storage.',
      formats: [['ai-pouch', 'Pouches'], ['ai-roll', 'Film'], ['ai-label', 'Labels']],
      benefits: ['Durable materials for handling', 'Clear and printed presentation options', 'Custom dimensions and print']
    },
    chemical: {
      name: 'Chemical',
      icon: 'ai-flask',
      description: 'Purpose-engineered flexible structures for demanding product and handling requirements.',
      formats: [['ai-pouch', 'Pouches'], ['ai-sachet', 'Sachets'], ['ai-roll', 'Rollstock'], ['ai-label', 'Labels']],
      benefits: ['Structures selected by application', 'Controlled conversion and inspection', 'Clear identification through print']
    },
    electrical: {
      name: 'Electrical',
      icon: 'ai-plug',
      description: 'Protective packaging solutions for electrical components, accessories and related products.',
      formats: [['ai-pouch', 'Pouches'], ['ai-roll', 'Film'], ['ai-label', 'Labels']],
      benefits: ['Flexible formats for varied components', 'Strong and consistent construction', 'Custom printing and identification']
    },
    engineering: {
      name: 'Engineering',
      icon: 'ai-gear',
      description: 'Robust packaging formats designed around industrial products and real handling conditions.',
      formats: [['ai-pouch', 'Pouches'], ['ai-roll', 'Film'], ['ai-label', 'Labels']],
      benefits: ['Application-specific materials', 'Formats for varied dimensions', 'Reliable production consistency']
    },
    cable: {
      name: 'Cable Industry',
      icon: 'ai-cable',
      description: 'Flexible film, labels and packaging formats for cable products and accessories.',
      formats: [['ai-roll', 'Film'], ['ai-pouch', 'Pouches'], ['ai-label', 'Labels']],
      benefits: ['Strong packaging for handling', 'Custom printed identification', 'Flexible supply formats']
    }
  };

  const buttons = Array.from(document.querySelectorAll('.industry-option'));
  const panel = document.getElementById('industry-panel');
  if (buttons.length && panel) {
    const name = document.getElementById('industry-panel-name');
    const description = document.getElementById('industry-panel-description');
    const iconUse = document.querySelector('#industry-panel-icon use');
    const formats = document.getElementById('industry-panel-formats');
    const benefits = document.getElementById('industry-panel-benefits');

    const renderIndustry = (key, focusPanel) => {
      const item = industryData[key];
      if (!item) return;
      buttons.forEach((button) => {
        const active = button.dataset.industry === key;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-selected', String(active));
      });
      name.textContent = item.name;
      description.textContent = item.description;
      iconUse.setAttribute('href', '#' + item.icon);
      formats.replaceChildren(...item.formats.map(([icon, label]) => {
        const entry = document.createElement('span');
        entry.innerHTML = '<svg aria-hidden="true"><use href="#' + icon + '"></use></svg>';
        entry.append(document.createTextNode(label));
        return entry;
      }));
      benefits.replaceChildren(...item.benefits.map((benefit) => {
        const entry = document.createElement('li');
        entry.textContent = benefit;
        return entry;
      }));
      if (focusPanel) panel.focus({ preventScroll: true });
    };

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => renderIndustry(button.dataset.industry));
      button.addEventListener('pointerenter', () => {
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          renderIndustry(button.dataset.industry);
        }
      });
      button.addEventListener('keydown', (event) => {
        if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(event.key)) return;
        event.preventDefault();
        const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
        const next = buttons[(index + direction + buttons.length) % buttons.length];
        next.focus();
        renderIndustry(next.dataset.industry);
      });
    });
    renderIndustry('pharma');
  }

  const journey = document.querySelector('.process-journey');
  const steps = Array.from(document.querySelectorAll('[data-process-step]'));
  if (!journey || !steps.length) return;

  if (!('IntersectionObserver' in window)) {
    journey.style.setProperty('--process-progress', '1');
    steps.forEach((step) => step.classList.add('is-active'));
    return;
  }

  const activeSteps = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const stepIndex = Number(entry.target.dataset.processStep);
      if (entry.isIntersecting) activeSteps.add(stepIndex);
    });
    const furthest = activeSteps.size ? Math.max(...activeSteps) : 0;
    journey.style.setProperty('--process-progress', String(Math.max(0, (furthest - 1) / (steps.length - 1))));
    steps.forEach((step) => {
      step.classList.toggle('is-active', Number(step.dataset.processStep) <= furthest);
    });
  }, { threshold: 0.45, rootMargin: '0px 0px -12% 0px' });

  steps.forEach((step) => observer.observe(step));
})();
