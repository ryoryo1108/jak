// 認証なしで即表示
document.getElementById('app').style.display = "block";

// 曲一覧（曲名と秒数）
const songs = [
  { title: "deforest", seconds: 240 },
  { title: "solidgold", seconds: 210 },
  { title: "Captain Dandruff", seconds: 270 },
  { title: "M.B.D.F.", seconds: 180 },
  { title: "松風", seconds: 300 },
  { title: 'Dancing "the" jewelry', seconds: 210 },
  { title: "cowchicken-fu", seconds: 300 },
  { title: "curious case", seconds: 300 },
  { title: "papas", seconds: 180 },
  { title: "goo go", seconds: 300 },
  { title: "mechanical sun", seconds: 210 }
];

// 分数表示用
function formatTime(totalSec) {
  const minutes = totalSec / 60;
  return `${minutes.toFixed(1)}分`;
}

const table = document.getElementById('songTable');
const setlistEl = document.getElementById('setlist');
const totalTimeEl = document.getElementById('totalTime');

function renderTable() {
  table.innerHTML = `
    <tr><th>選択</th><th>順番</th><th>曲名</th><th>時間</th></tr>
  `;

  songs.forEach((song, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="checkbox" data-idx="${idx}"></td>
      <td><input type="number" min="1" data-order="${idx}"></td>
      <td>${song.title}</td>
      <td>${formatTime(song.seconds)}</td>
    `;
    table.appendChild(row);
  });

  table.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', renderSetlist);
  });
}

function renderSetlist() {
  const selected = [];

  table.querySelectorAll('tr').forEach((row, i) => {
    if (i === 0) return;

    const checkbox = row.querySelector('input[type="checkbox"]');
    const orderInput = row.querySelector('input[type="number"]');
    const idx = parseInt(checkbox.dataset.idx);

    if (checkbox.checked) {
      const order = parseInt(orderInput.value);
      if (!isNaN(order)) {
        selected.push({ order, song: songs[idx] });
        row.classList.add('selected');
      } else {
        row.classList.remove('selected');
      }
    } else {
      row.classList.remove('selected');
    }
  });

  selected.sort((a, b) => a.order - b.order);

  setlistEl.innerHTML = '';
  let total = 0;
  selected.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.order}. ${item.song.title} (${formatTime(item.song.seconds)})`;
    setlistEl.appendChild(li);
    total += item.song.seconds;
  });

  totalTimeEl.textContent = formatTime(total);
}

renderTable();
