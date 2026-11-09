const input = document.querySelector('#filter');
const catalog = document.querySelector('#catalog');
const result = document.querySelector('#result');

async function loadDirectory() {
  const response = await fetch('/data/services.json');
  if (!response.ok) throw new Error('Catalog unavailable');
  const services = await response.json();
  function render() {
    const query = input.value.trim().toLowerCase();
    const filtered = services.filter(service => [service.name, service.category, service.owner].some(text => text.toLowerCase().includes(query)));
    catalog.replaceChildren(...filtered.map(service => {
      const card = document.createElement('article');
      const heading = document.createElement('h2');
      const detail = document.createElement('p');
      card.className = 'card';
      heading.textContent = service.name;
      detail.textContent = service.owner + ' · ' + service.status;
      card.append(heading, detail);
      return card;
    }));
    result.textContent = filtered.length + '개 서비스';
  }
  input.addEventListener('input', render);
  render();
}

loadDirectory().catch(() => { result.textContent = '서비스 카탈로그를 불러오지 못했습니다.'; });
