const careerNodes = [
  {
    id: 'aris',
    company: 'Aris Global',
    title: 'Software Engineer',
    period: '2013 – 2015',
    bullets: [
      'Delivered full-stack features across Java/Spring backend, JSF/PrimeFaces UI, and Oracle/MySQL data layers for large-scale life sciences enterprise applications.',
      'Designed RESTful APIs and optimised complex SQL queries, contributing to CI/CD pipelines in an Agile environment.'
    ]
  },
  {
    id: 'cisco',
    company: 'Cisco Systems',
    title: 'Senior Software Engineer',
    period: '2015 – 2018',
    bullets: [
      'Developed and optimised Radio Resource Management algorithms — channel selection, power control, load balancing — deployed across 100+ enterprise wireless network sites globally.',
      'Designed a staged firmware rollout mechanism for near-zero-downtime upgrades; eliminated 80% of upgrade-related outages.',
      'Applied performance engineering under real-time OS constraints on resource-limited hardware.'
    ]
  },
  {
    id: 'fair',
    company: 'Fair Consulting',
    title: 'Senior Software Engineer',
    period: '2018 – 2019',
    bullets: [
      'Led migration from legacy OMS to FluentCommerce for 4+ enterprise clients, owning the full project lifecycle and translating custom business logic into the new platform, on time and within scope.',
      'Integrated FluentCommerce with client ERP and fulfilment systems using Java, Maven, AWS, and Oracle DB, delivering resilient, scalable interfaces aligned with each client\'s workflows.'
    ]
  },
  {
    id: 'kayo',
    company: 'Kayo Sports',
    title: 'Senior Software Engineer',
    period: '2019 – 2021',
    bullets: [
      'Designed and delivered product-and-offer catalogue services used by 1M+ subscribers; modelled flexible pricing structures in PostgreSQL supporting 100+ distinct offer configurations.',
      'Led Kubernetes migration for 20+ services from EC2, enabling auto-scaling, faster rollbacks, and the elasticity to absorb live sports traffic spikes without manual capacity planning.',
      'Built a custom offer configuration system enabling the product team to self-serve promotional and pricing configurations the existing billing platform could not support.'
    ]
  },
  {
    id: 'binge',
    company: 'Binge',
    title: 'Technical Lead',
    period: '2021 – 2022',
    bullets: [
      'Architected a Kafka-driven subscription management system handling 7M+ events/day, ensuring end-to-end subscription confirmation within 30 seconds at production scale.',
      'Designed and built an in-house Identity Provider (IDP) separating authorisation from authentication via a token-exchange flow, reducing Auth0 cost by 30% and load by 50–60%.',
      'Orchestrated complex multi-step user onboarding journeys using AWS Step Functions and Netflix Conductor, achieving 90%+ successful completion rate.',
      'Drove test coverage from ~30% to 70% across the service estate through structured code review and design sign-off.'
    ]
  },
  {
    id: 'hubbl',
    company: 'Hubbl',
    title: 'Principal Engineer',
    period: '2022 – Present',
    tag: 'CURRENT',
    bullets: [
      'Architected and built the authentication platform for Hubbl from the ground up — OAuth2, JWT, API-key — handling 5,000 req/sec peak and 1,500 sustained across all platform services.',
      'Led and mentored 15+ engineers across 4 squads, owning architectural decisions, code quality, and delivery timelines.',
      'Built the New Relic observability suite from scratch, integrated with Slack to deliver incident notifications within 5 minutes of detection.',
      'Partnered with external pen-test teams on annual security assessments; zero critical findings carried over between cycles.',
      'Acted as primary production escalation point; led response for 10+ P1 events, all resolved within SLA with zero customer-facing data loss.'
    ]
  }
];

function renderTimeline() {
  const track = document.getElementById('tl-track');
  const detail = document.getElementById('tl-detail');

  // Build nodes
  careerNodes.forEach((node, i) => {
    const above = i % 2 === 0;  // alternate labels above/below line

    const item = document.createElement('div');
    item.className = 'tl-item';
    item.setAttribute('data-id', node.id);
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `${node.company}, ${node.title}, ${node.period}`);

    item.innerHTML = `
      <div class="tl-label tl-label-${above ? 'above' : 'below'}">
        <span class="tl-company">${node.company}</span>
        <span class="tl-period">${node.period}</span>
      </div>
      <div class="tl-dot-wrap">
        <div class="tl-dot"></div>
      </div>
      <div class="tl-label tl-label-${above ? 'below' : 'above'} tl-label-title">
        <span class="tl-title">${node.title}</span>
        ${node.tag ? `<span class="tl-tag">${node.tag}</span>` : ''}
      </div>
    `;

    item.addEventListener('click', () => selectNode(node.id));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectNode(node.id); }
    });

    track.appendChild(item);
  });

  // Auto-select most recent
  selectNode('hubbl');
}

function selectNode(id) {
  const node = careerNodes.find(n => n.id === id);
  if (!node) return;

  // Update active dot
  document.querySelectorAll('.tl-item').forEach(el => {
    el.classList.toggle('tl-item-active', el.getAttribute('data-id') === id);
  });

  // Render detail panel
  const detail = document.getElementById('tl-detail');
  detail.innerHTML = `
    <div class="tl-detail-inner">
      <div class="tl-detail-head">
        <div>
          <div class="tl-detail-company">${node.company}</div>
          <div class="tl-detail-role">
            <span class="tl-detail-title">${node.title}</span>
            <span class="tl-detail-period">${node.period}</span>
            ${node.tag ? `<span class="tl-tag">${node.tag}</span>` : ''}
          </div>
        </div>
      </div>
      <ul class="tl-bullets">
        ${node.bullets.map(b => `<li>${b}</li>`).join('')}
      </ul>
    </div>
  `;

  // Smooth scroll detail into view on mobile
  if (window.innerWidth < 700) {
    detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

document.addEventListener('DOMContentLoaded', renderTimeline);
