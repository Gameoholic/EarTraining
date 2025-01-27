let piano = document.getElementById('piano');
let pedalButton = document.getElementById('pedal');

let mouseDown = false;
let pedalTurnedOn = false;


// Init all notes
const noteNames = [
  'A0', 'Bb1', 'B0', 
  'C1', 'Db1', 'D1', 'Eb1', 'E1', 'F1', 'Gb1', 'G1', 'Ab1', 'A1', 'Bb1', 'B1',
  'C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2', 'Bb2', 'B2',
  'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3',
  'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4',
  'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5',
  'C6', 'Db6', 'D6', 'Eb6', 'E6', 'F6', 'Gb6', 'G6', 'Ab6', 'A6', 'Bb6', 'B6',
  'C7', 'Db7', 'D7', 'Eb7', 'E7', 'F7', 'Gb7', 'G7', 'Ab7', 'A7', 'Bb7', 'B7',
  'C8'
];

let notes = [];

noteNames.forEach(noteName => {
  let noteAudio = document.createElement('audio');
  noteAudio.id = 'audio' + noteName;
  noteAudio.src = 'assets/notes/' + noteName + '.mp3';
  noteAudio.type = 'audio/mpeg';
  document.body.appendChild(noteAudio);

  let noteDiv = document.createElement('div');
  noteDiv.classList.add('key');
  if (noteName[1] == 'b') {
    noteDiv.classList.add('black');
  }
  else {
    noteDiv.classList.add('white');
  }
  piano.appendChild(noteDiv);

  const note = {
    name: noteName,
    div: noteDiv,
    audio: noteAudio
  };
  notes.push(note);

  noteDiv.addEventListener('mousedown', () => playNote(note));
  noteDiv.addEventListener('mouseenter', () => playNoteIfMouseDown(note));
  noteDiv.addEventListener('mouseup', () => stopNote(note));
  noteDiv.addEventListener('mouseleave', () => stopNote(note));
});

function getNoteFromName(noteName) {
  return notes.find(function (note) { return note.name == noteName;});
}

// Pedal button
pedalButton.addEventListener('click', () => {
  pedalTurnedOn = !pedalTurnedOn;
  if (pedalTurnedOn) {
    pedalButton.classList.add('on');
  }
  else {
    pedalButton.classList.remove('on');
    notes.forEach(note => note.audio.pause());
  }
});

// General mouse down/up events
document.addEventListener('mousedown', function(event) {
  mouseDown = true;
});
document.addEventListener('mouseup', function(event) {
  mouseDown = false;
});


// Play notes
function playNote(note) {
  note.audio.currentTime = 0;
  note.audio.play();
  note.div.classList.add('active');

  note.audio.addEventListener('ended', () => { // stop note when audio ended. useful when note not triggered by click
    stopNote(note);
  });
}
function playNoteIfMouseDown(note) { // Plays the note when mouse is "sliding" to other notes (holding)
  if (mouseDown) {
    playNote(note);
  }
}
function stopNote(note) {
  if (!pedalTurnedOn)
  {
    note.audio.pause(); // pedal effect
  }
  note.div.classList.remove('active');
}
