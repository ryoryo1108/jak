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
    <tr><th>選択</th><th>曲名</th><th>時間</th></tr>
  `;

  songs.forEach((song, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="checkbox" data-idx="${idx}"></td>
      <td>${song.title}</td>
      <td>${formatTime(song.seconds)}</td>
    `;
    table.appendChild(row);
  });

  // チェックボックスが変更されたときにリストを再描画
  table.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', renderSetlist);
  });
}

function renderSetlist() {
  setlistEl.innerHTML = '';
  let total = 0;

  table.querySelectorAll('tr').forEach((row, i) => {
    if (i === 0) return; // ヘッダー行

    const checkbox = row.querySelector('input[type="checkbox"]');
    const idx = parseInt(checkbox.dataset.idx);

    if (checkbox.checked) {
      const song = songs[idx];
      const li = document.createElement('li');
      li.textContent = `${song.title} (${formatTime(song.seconds)})`;
      li.dataset.idx = idx; // 識別用に格納
      setlistEl.appendChild(li);
      total += song.seconds;
      row.classList.add('selected');
    } else {
      row.classList.remove('selected');
    }
  });

  totalTimeEl.textContent = formatTime(total);
}

// 並べ替え機能を有効化（スマホ対応）
Sortable.create(setlistEl, {
  animation: 150,
  ghostClass: 'ghost'
});

renderTable();
