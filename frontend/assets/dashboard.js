const summary = document.querySelector('#summary');
const incidents = document.querySelector('#incidents');
const destination = summary || incidents;

async function renderDashboard() {
  const response = await fetch(summary ? '/api/summary' : '/api/incidents');
  if (!response.ok) throw new Error('Dashboard unavailable');
  const data = await response.json();
  const rows = summary
    ? [['전체 서비스', data.totalServices], ['정상 서비스', data.operational], ['진행 중인 장애', data.activeIncidents], ['열린 지원 요청', data.openTickets]]
    : data.items.map(item => [item.title, item.status + ' · ' + item.summary]);
  destination.replaceChildren(...rows.map(([label, value]) => {
    const card = document.createElement('article');
    const title = document.createElement('h2');
    const detail = document.createElement('p');
    card.className = 'card';
    title.textContent = label;
    detail.textContent = value;
    card.append(title, detail);
    return card;
  }));
}

renderDashboard().catch(() => { destination.textContent = '운영 데이터를 불러오지 못했습니다.'; });
