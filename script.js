const walletAddress = document.getElementById('wallet-address');
const ecosystemValue = document.getElementById('ecosystem-value');
const ecosystemChange = document.getElementById('ecosystem-change');
const protocolCount = document.getElementById('protocol-count');
const userCount = document.getElementById('user-count');
const topModule = document.getElementById('top-module');
const topModuleScore = document.getElementById('top-module-score');
const moduleGrid = document.getElementById('module-grid');
const treasuryList = document.getElementById('treasury-list');
const watchlist = document.getElementById('watchlist');
const activityList = document.getElementById('activity-list');
const insights = document.getElementById('insights');
const refreshDashboard = document.getElementById('refresh-dashboard');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

let state = createState();

function random(min, max, decimals = 2) {
  return Number((Math.random() * (max - min) + min).toFixed(decimals));
}

function formatUSD(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function createState() {
  const modules = [
    { name: 'Treasury', value: random(1200000, 4200000), users: random(4200, 12800, 0), score: random(72, 96), desc: 'Quản lý ngân quỹ và phân bổ tài sản' },
    { name: 'Governance', value: random(240000, 920000), users: random(1800, 7600, 0), score: random(65, 91), desc: 'Theo dõi proposal và bỏ phiếu' },
    { name: 'Launchpad', value: random(380000, 1600000), users: random(2600, 9200, 0), score: random(68, 94), desc: 'Theo dõi đợt mở bán và phân bổ' },
    { name: 'Analytics', value: random(520000, 2100000), users: random(3100, 10400, 0), score: random(70, 97), desc: 'Phân tích on-chain và hành vi hệ' },
  ];

  const treasury = [
    { asset: 'USDT', value: random(420000, 1200000) },
    { asset: 'ETH', value: random(280000, 860000) },
    { asset: 'ARB', value: random(120000, 360000) },
  ];

  const watch = [
    { name: 'Governance', score: random(66, 92) },
    { name: 'Launchpad', score: random(70, 95) },
    { name: 'Analytics', score: random(72, 97) },
  ];

  const activities = [
    { type: 'governance', title: 'Proposal #28 mở rộng treasury', value: '68% tán thành', time: '12 phút trước' },
    { type: 'launchpad', title: 'Orbit Layer public round', value: formatUSD(random(120000, 420000)), time: '25 phút trước' },
    { type: 'community', title: 'NFT reward campaign', value: '4.2k người tham gia', time: '41 phút trước' },
    { type: 'governance', title: 'Proposal #29 nâng giới hạn staking', value: '54% tán thành', time: '1 giờ trước' },
  ];

  return {
    wallet: `0x${crypto.randomUUID().replace(/-/g, '').slice(0, 4)}d2${crypto.randomUUID().replace(/-/g, '').slice(0, 6)}71cf`,
    change: random(-4, 10),
    modules,
    treasury,
    watch,
    activities,
  };
}

function renderOverview() {
  walletAddress.textContent = `${state.wallet.slice(0, 6)}...${state.wallet.slice(-4)}`;
  const total = state.modules.reduce((sum, item) => sum + item.value, 0);
  const users = state.modules.reduce((sum, item) => sum + item.users, 0);
  ecosystemValue.textContent = formatUSD(total);
  ecosystemChange.textContent = `${state.change >= 0 ? '+' : ''}${state.change.toFixed(2)}% trong 24 giờ`;
  ecosystemChange.className = state.change >= 0 ? 'positive' : 'negative';
  protocolCount.textContent = String(state.modules.length);
  userCount.textContent = Number(users).toLocaleString('en-US');
  const top = [...state.modules].sort((a, b) => b.score - a.score)[0];
  topModule.textContent = top.name;
  topModuleScore.textContent = `Điểm ưu tiên ${top.score.toFixed(0)}/100`;
}

function renderModules() {
  moduleGrid.innerHTML = '';
  state.modules.forEach((module) => {
    const card = document.createElement('article');
    card.className = 'module-card';
    card.innerHTML = `
      <strong>${module.name}</strong>
      <p>${module.desc}</p>
      <p>Giá trị vận hành: ${formatUSD(module.value)}</p>
      <p>Người dùng: ${Number(module.users).toLocaleString('en-US')}</p>
      <strong>${module.score.toFixed(0)}/100</strong>
    `;
    moduleGrid.appendChild(card);
  });
}

function renderTreasury() {
  treasuryList.innerHTML = '';
  const total = state.treasury.reduce((sum, item) => sum + item.value, 0);
  state.treasury.forEach((item) => {
    const percent = (item.value / total) * 100;
    const row = document.createElement('div');
    row.className = 'treasury-row';
    row.innerHTML = `
      <strong>${item.asset}</strong>
      <small>${formatUSD(item.value)} · ${percent.toFixed(1)}%</small>
      <div class="progress"><div class="progress-fill" style="width:${percent.toFixed(1)}%"></div></div>
    `;
    treasuryList.appendChild(row);
  });
}

function renderWatchlist() {
  watchlist.innerHTML = '';
  state.watch.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'watch-item';
    li.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <span>Mức ưu tiên trong hệ</span>
      </div>
      <strong>${item.score.toFixed(0)}/100</strong>
    `;
    watchlist.appendChild(li);
  });
}

function renderActivities() {
  activityList.innerHTML = '';
  state.activities.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'activity-item';
    li.innerHTML = `
      <div>
        <strong>${item.title}</strong>
        <span>${item.time}</span>
        <div class="badge ${item.type}">${item.type}</div>
      </div>
      <div>
        <strong>${item.value}</strong>
        <span>Hoạt động mô phỏng</span>
      </div>
    `;
    activityList.appendChild(li);
  });
}

function renderInsights() {
  insights.innerHTML = '';
  const top = [...state.modules].sort((a, b) => b.score - a.score)[0];
  const total = state.modules.reduce((sum, item) => sum + item.value, 0);
  const messages = [
    `Giá trị toàn hệ đang ở mức khoảng ${formatUSD(total)} với nhiều module vận hành song song.`,
    `${top.name} hiện là module nổi bật nhất trong hệ với điểm ưu tiên ${top.score.toFixed(0)}/100.`,
    'Repo này phù hợp để làm dự án mặt tiền mạnh nhất vì nhìn như một nền tảng Web3 tổng hợp chứ không chỉ là dashboard đơn lẻ.',
  ];

  messages.forEach((message) => {
    const div = document.createElement('div');
    div.className = 'insight-item';
    div.innerHTML = `<p>${message}</p>`;
    insights.appendChild(div);
  });
}

function renderApp() {
  renderOverview();
  renderModules();
  renderTreasury();
  renderWatchlist();
  renderActivities();
  renderInsights();
}

refreshDashboard.addEventListener('click', () => {
  state = createState();
  renderApp();
});

searchButton.addEventListener('click', () => {
  const value = searchInput.value.trim();
  if (!value) return;
  state.watch.unshift({ name: value, score: random(60, 95) });
  state.watch = state.watch.slice(0, 5);
  searchInput.value = '';
  renderWatchlist();
});

renderApp();
