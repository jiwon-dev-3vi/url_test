const form = document.querySelector('#filters');
const feedback = document.querySelector('#feedback');
const table = document.querySelector('#tickets');

async function loadTickets() {
  const response = await fetch('/api/tickets?' + new URLSearchParams(new FormData(form)));
  if (!response.ok) throw new Error('Tickets unavailable');
  const data = await response.json();
  table.replaceChildren(...data.items.map(ticket => {
    const row = document.createElement('tr');
    for (const value of [ticket.id, ticket.title, ticket.serviceId, ticket.status, ticket.priority]) {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.append(cell);
    }
    return row;
  }));
  feedback.textContent = data.items.length + '건';
}

function refresh() {
  loadTickets().catch(() => { feedback.textContent = '지원 요청을 불러오지 못했습니다.'; });
}
form.addEventListener('submit', event => { event.preventDefault(); refresh(); });
refresh();
