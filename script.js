// ============================================
// CAREER TOPOLOGY DATA
// ============================================
const careerNodes = [
  {
    id: 'aris',
    label: 'Aris Global',
    sub: 'Jul 2013–Apr 2015',
    monogram: 'AG',
    x: 130, y: 150,
    title: 'Software Engineer',
    company: 'Aris Global — Enterprise Life Sciences Applications',
    period: 'July 2013 – April 2015',
    bullets: [
      'Delivered full-stack features across Java/Spring backend, JSF/PrimeFaces UI, and Oracle/MySQL data layers.',
      'Designed RESTful APIs and optimised complex SQL queries within an Agile CI/CD environment.'
    ]
  },
  {
    id: 'cisco',
    label: 'Cisco Systems',
    sub: 'Apr 2015–Sep 2018',
    monogram: 'CS',
    x: 350, y: 340,
    title: 'Senior Software Engineer',
    company: 'Cisco Systems — Wireless LAN Controllers (RRM)',
    period: 'April 2015 – September 2018',
    bullets: [
      'Developed and optimised Radio Resource Management algorithms — channel selection, power control, load balancing — deployed on enterprise-scale wireless networks across 100+ sites globally.',
      'Designed a staged firmware rollout mechanism for near-zero-downtime upgrades; eliminated 80% of upgrade-related outages.',
      'Applied performance engineering under real-time OS constraints on resource-limited hardware — directly applicable to low-latency backend optimisation.'
    ]
  },
  {
    id: 'fair',
    label: 'Fair Consulting',
    sub: 'Nov 2018–Oct 2019',
    monogram: 'FC',
    x: 570, y: 150,
    title: 'Senior Software Engineer',
    company: 'Fair Consulting Group — FluentCommerce OMS',
    period: 'November 2018 – October 2019',
    bullets: [
      'Led migration from legacy OMS to FluentCommerce for 4+ enterprise clients, owning the full project lifecycle and translating custom business logic into the new platform, on time and within scope.',
      'Integrated FluentCommerce with client ERP and fulfilment systems using Java, Maven, AWS, and Oracle DB, delivering resilient, scalable interfaces aligned with each client\u2019s workflows.'
    ]
  },
  {
    id: 'kayo',
    label: 'Kayo Sports',
    sub: '2019–2021 · Foxtel',
    monogram: 'K',
    x: 800, y: 340,
    title: 'Senior Software Engineer',
    company: 'Foxtel — Kayo Sports',
    period: '2019 – 2021',
    bullets: [
      'Designed and delivered product-and-offer catalogue services used by 1M+ subscribers; modelled flexible pricing structures in PostgreSQL supporting 100+ distinct offer configurations.',
      'Led Kubernetes migration for 20+ services from EC2, enabling auto-scaling, faster rollbacks, and improved deployment consistency — giving the platform elasticity to absorb live sports traffic spikes without manual capacity planning.',
      'Built a custom offer configuration system to address the billing platform\u2019s limitations around multi-use vouchers and complex offer conditions, enabling the product team to self-serve configurations the existing system couldn\u2019t support.'
    ]
  },
  {
    id: 'binge',
    label: 'Binge',
    sub: '2021–2022 · Foxtel',
    monogram: 'B',
    x: 1020, y: 150,
    title: 'Technical Lead',
    company: 'Foxtel — Binge',
    period: '2021 – 2022',
    bullets: [
      'Architected a Kafka-driven subscription management system handling 7M+ events/day across user and billing domains, ensuring end-to-end subscription confirmation — from user click to confirmation — within 30 seconds at production scale.',
      'Designed and built an in-house Identity Provider (IDP) to separate authorisation from authentication, exchanging Auth0 tokens for entitlement-bearing tokens, reducing Auth0 cost by 30% and load by 50–60%.',
      'Orchestrated complex multi-step user onboarding journeys using AWS Step Functions and Netflix Conductor, achieving more than 90% successful completion rate at scale.'
    ]
  },
  {
    id: 'hubbl',
    label: 'Hubbl',
    sub: '2022–Present · Foxtel',
    monogram: 'H',
    x: 1250, y: 340,
    title: 'Principal Engineer',
    company: 'Foxtel — Hubbl',
    period: '2022 – Present',
    bullets: [
      'Architected and built the authentication platform for Hubbl from the ground up — OAuth2, JWT, API-key — designed for horizontal scalability to handle 5,000 req/sec peak, 1,500 sustained.',
      'Led and mentored 15+ engineers across 4 squads, owning architectural decisions, code quality, and delivery timelines.',
      'Built the New Relic observability suite from scratch, integrated with Slack to deliver incident notifications within 5 minutes of detection.',
      'Acted as primary production escalation point; led incident response for 10+ P1 events, all resolved within SLA with zero customer-facing data loss.'
    ]
  }
];

const connections = [
  ['aris', 'cisco'],
  ['cisco', 'fair'],
  ['fair', 'kayo'],
  ['kayo', 'binge'],
  ['binge', 'hubbl']
];

// ============================================
// RENDER SVG
// ============================================
function renderTopology() {
  const linesGroup = document.getElementById('conn-lines');
  const nodesGroup = document.getElementById('nodes');
  const byId = Object.fromEntries(careerNodes.map(n => [n.id, n]));

  connections.forEach(([fromId, toId]) => {
    const from = byId[fromId];
    const to = byId[toId];
    const midX = (from.x + to.x) / 2;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
    path.setAttribute('d', d);
    path.setAttribute('class', 'conn-line');
    path.setAttribute('id', `line-${fromId}-${toId}`);
    linesGroup.appendChild(path);
  });

  careerNodes.forEach((node, i) => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'topo-node');
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', `${node.title} at ${node.company.split('—')[0].trim()}`);
    g.setAttribute('data-id', node.id);

    // Outer ring (decorative, expands on hover/active)
    const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ring.setAttribute('cx', node.x);
    ring.setAttribute('cy', node.y);
    ring.setAttribute('r', 34);
    ring.setAttribute('class', 'topo-node-ring');
    g.appendChild(ring);

    // Main badge circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', node.x);
    circle.setAttribute('cy', node.y);
    circle.setAttribute('r', 28);
    circle.setAttribute('class', 'topo-node-circle');
    g.appendChild(circle);

    // Monogram inside the badge
    const mono = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    mono.setAttribute('x', node.x);
    mono.setAttribute('y', node.y + 1);
    mono.setAttribute('text-anchor', 'middle');
    mono.setAttribute('dominant-baseline', 'central');
    mono.setAttribute('class', 'topo-node-monogram');
    mono.textContent = node.monogram;
    g.appendChild(mono);

    // Company label — sits below the badge, never overlaps it
    const labelY = node.y > 240 ? node.y + 56 : node.y - 46;
    const subY = node.y > 240 ? node.y + 74 : node.y - 30;

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', node.x);
    label.setAttribute('y', labelY);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('class', 'topo-node-label');
    label.textContent = node.label;
    g.appendChild(label);

    const sub = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    sub.setAttribute('x', node.x);
    sub.setAttribute('y', subY);
    sub.setAttribute('text-anchor', 'middle');
    sub.setAttribute('class', 'topo-node-sub');
    sub.textContent = node.sub;
    g.appendChild(sub);

    g.addEventListener('click', () => selectNode(node.id));
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectNode(node.id);
      }
    });

    nodesGroup.appendChild(g);
  });
}

function selectNode(id) {
  const node = careerNodes.find(n => n.id === id);
  if (!node) return;

  document.querySelectorAll('.topo-node').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-id') === id);
  });
  document.querySelectorAll('.conn-line').forEach(el => el.classList.remove('conn-line-active'));
  connections.forEach(([fromId, toId]) => {
    if (fromId === id || toId === id) {
      const line = document.getElementById(`line-${fromId}-${toId}`);
      if (line) line.classList.add('conn-line-active');
    }
  });

  const detail = document.getElementById('node-detail');
  detail.innerHTML = `
    <div class="nd-role-line">
      <span class="nd-title">${node.title}</span>
      <span class="nd-period">${node.period}</span>
    </div>
    <div class="nd-company">${node.company}</div>
    <ul class="nd-bullets">
      ${node.bullets.map(b => `<li>${b}</li>`).join('')}
    </ul>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderTopology();
  // Auto-select the most recent role on load
  selectNode('hubbl');
});
