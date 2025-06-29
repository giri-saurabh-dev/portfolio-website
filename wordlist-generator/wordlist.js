let generatedList = [];

function generateCombos() {
  const rawWords = document.getElementById('words').value.trim();
  const numberStr = document.getElementById('numbers').value.trim();
  const symbolStr = document.getElementById('symbols').value.trim();
  const count = Math.max(100, parseInt(document.getElementById('count').value));

  const words = rawWords.split(',').map(w => w.trim()).filter(w => w);
  const numbers = numberStr ? numberStr.split('') : [];
  const symbols = symbolStr ? symbolStr.split('') : [];

  if (words.length < 1) {
    alert("Please enter at least one word.");
    return;
  }

  generatedList = [];

  const allPieces = [...words, ...numbers, ...symbols];

  while (generatedList.length < count) {
    let pieces = [...allPieces];
    shuffleArray(pieces);

    // Join between 2 and all items
    const len = getRandomInt(2, pieces.length);
    const combo = pieces.slice(0, len).join('');
    
    if (!generatedList.includes(combo)) {
      generatedList.push(combo);
    }
  }

  document.getElementById('output').textContent = generatedList.join('\n');
}

function downloadWordlist() {
  if (generatedList.length === 0) {
    alert("Generate the wordlist first!");
    return;
  }

  const blob = new Blob([generatedList.join('\n')], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'combo_wordlist.txt';
  link.click();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
