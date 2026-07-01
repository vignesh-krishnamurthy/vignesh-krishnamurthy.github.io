// ============================================
// CAREER DATA — most recent first
// ============================================
const careerNodes = [
  {
    id: 'hubbl',
    company: 'Hubbl · Foxtel',
    title: 'Principal Engineer',
    period: '2022 – Present',
    scope: 5,   // 1-5 drives card width
    tag: 'CURRENT',
    bullets: [
      'Architected and built the authentication platform for Hubbl from the ground up — OAuth2, JWT, API-key — designed for horizontal scalability to handle 5,000 req/sec peak, 1,500 sustained.',
      'Led and mentored 15+ engineers across 4 squads, owning architectural decisions, code quality, and delivery timelines.',
      'Built the New Relic observability suite from scratch, integrated with Slack to deliver incident notifications within 5 minutes of detection.',
      'Partnered with external pen-test teams on annual security assessments, co-ordinating remediation of all critical findings with zero carry-over between cycles.',
      'Acted as primary production escalation point; led incident response for 10+ P1 events, all resolved within SLA with zero customer-facing data loss.'
    ]
  },
  {
    id: 'binge',
    company: 'Binge · Foxtel',
    title: 'Technical Lead',
    period: '2021 – 2022',
    scope: 4,
    tag: null,
    bullets: [
      'Architected a Kafka-driven subscription management system handling 7M+ events/day across user and billing domains, ensuring end-to-end subscription confirmation within 30 seconds at production scale.',
      'Designed and built an in-house Identity Provider (IDP) to separate authorisation from authentication, exchanging Auth0 tokens for entitlement-bearing tokens, reducing Auth0 cost by 30% and load by 50–60%.',
      'Orchestrated complex multi-step user onboarding journeys using AWS Step Functions and Netflix Conductor, achieving more than 90% successful completion rate at scale.',
      'Drove test coverage from ~30% to 70% across the service estate through structured code review and design sign-off.'
    ]
  },
  {
    id: 'kayo',
    company: 'Kayo Sports · Foxtel',
    title: 'Senior Software Engineer',
    period: '2019 – 2021',
    scope: 3,
    tag: null,
    bullets: [
      'Designed and delivered product-and-offer catalogue services used by 1M+ subscribers; modelled flexible pricing structures in PostgreSQL supporting 100+ distinct offer configurations.',
      'Led Kubernetes migration for 20+ services from EC2, enabling auto-scaling, faster rollbacks, and the elasticity to absorb live sports traffic spikes without manual capacity planning.',
      'Built a custom offer configuration system to address billing platform limitations around multi-use vouchers and complex offer conditions, enabling the product team to self-serve without engineering involvement.'
    ]
  },
  {
    id: 'fair',
    company: 'Fair Consulting Group',
    title: 'Senior Software Engineer',
    period: 'Nov 2018 – Oct 2019',
    scope: 2,
    tag: null,
    bullets: [
      'Led migration from legacy OMS to FluentCommerce for 4+ enterprise clients, owning the full project lifecycle and translating custom business logic into the new platform, on time and within scope.',
      'Integrated FluentCommerce with client ERP and fulfilment systems using Java, Maven, AWS, and Oracle DB, delivering resilient, scalable interfaces aligned with each client\'s workflows.'
    ]
  },
  {
    id: 'cisco',
    company: 'Cisco Systems',
    title: 'Senior Software Engineer',
    period: 'Apr 2015 – Sep 2018',
    scope: 2,
    tag: null,
    bullets: [
      'Developed and optimised Radio Resource Management algorithms — channel selection, power control, load balancing — deployed on enterprise-scale wireless networks across 100+ sites globally.',
      'Designed a staged firmware rollout mechanism for near-zero-downtime upgrades; eliminated 80% of upgrade-related outages.',
      'Applied performance engineering under real-time OS constraints on resource-limited hardware.'
    ]
  },
  {
    id: 'aris',
    company: 'Aris Global',
    title: 'Software Engineer',
    period: 'Jul 2013 – Apr 2015',
    scope: 1,
    tag: null,
    bullets: [
      'Delivered full-stack features across Java/Spring backend, JSF/PrimeFaces UI, and Oracle/MySQL data layers for large-scale life sciences enterprise applications.',
      'Designed RESTful APIs and optimised complex SQL queries, contributing to CI/CD pipelines in an Agile environment.'
    ]
  }
];

// ============================================
// RENDER LADDER
// ============================================
function renderLadder() {
  const ladder = document.getElementById('career-ladder');

  careerNodes.forEach((node, i) => {
    // Width of card scales with scope (1=40%, 5=100%)
    const cardWidthPct = 36 + (node.scope - 1) * 16; // 36%, 52%, 68%, 84%, 100%

    const row = document.createElement('div');
    row.className = 'ladder-row' + (i === 0 ? ' ladder-row-active' : '');
    row.setAttribute('data-id', node.id);

    row.innerHTML = `
      <div class="ladder-rail">
        <div class="ladder-node ${i === 0 ? 'ladder-node-active' : ''}"></div>
        ${i < careerNodes.length - 1 ? '<div class="ladder-connector"></div>' : ''}
      </div>
      <div class="ladder-card" style="width: ${cardWidthPct}%">
        <div class="ladder-card-head">
          <div class="ladder-card-meta">
            <span class="ladder-company">${node.company}</span>
            ${node.tag ? `<span class="ladder-tag">${node.tag}</span>` : ''}
          </div>
          <div class="ladder-card-sub">
            <span class="ladder-title">${node.title}</span>
            <span class="ladder-period">${node.period}</span>
          </div>
        </div>
        <div class="ladder-card-detail">
          <ul class="ladder-bullets">
            ${node.bullets.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    row.addEventListener('click', () => toggleRow(node.id));
    ladder.appendChild(row);
  });
}

function toggleRow(id) {
  document.querySelectorAll('.ladder-row').forEach(row => {
    const isTarget = row.getAttribute('data-id') === id;
    const wasActive = row.classList.contains('ladder-row-active');

    if (isTarget) {
      row.classList.toggle('ladder-row-active');
      row.querySelector('.ladder-node').classList.toggle('ladder-node-active', !wasActive);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderLadder();
});
