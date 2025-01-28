let piano = document.getElementById('piano');
let pedalButton = document.getElementById('pedal');
let showPianoButton = document.getElementById('show-piano');
let playingTechniqueSelect = document.getElementById('playing-technique');
let intervalStartButton = document.getElementById('interval-start-button');
let intervalPlayButton = document.getElementById('interval-play-button');
let intervalNextButton = document.getElementById('interval-next-button');
let intervalGuessButtonsDiv = document.getElementById('interval-guess-buttons');
let interval1Button = document.getElementById('interval-1');
let interval2Button = document.getElementById('interval-2');
let interval3Button = document.getElementById('interval-3');
let interval4Button = document.getElementById('interval-4');
let interval5Button = document.getElementById('interval-5');
let interval6Button = document.getElementById('interval-6');
let interval7Button = document.getElementById('interval-7');
let interval8Button = document.getElementById('interval-8');
let interval9Button = document.getElementById('interval-9');
let interval10Button = document.getElementById('interval-10');
let interval11Button = document.getElementById('interval-11');
let interval12Button = document.getElementById('interval-12');
let interval13Button = document.getElementById('interval-13');
let interval14Button = document.getElementById('interval-14');


let mouseDown = false;
let pedalTurnedOn = false;
let showPianoTurnedOn = false;
let rootNoteRange = 20;
let noteDelay = 750; // in milliseconds
let interval1TurnedOn = false;
let interval2TurnedOn = false;
let interval3TurnedOn = false;
let interval4TurnedOn = false;
let interval5TurnedOn = false;
let interval6TurnedOn = false;
let interval7TurnedOn = false;
let interval8TurnedOn = false;
let interval9TurnedOn = false;
let interval10TurnedOn = false;
let interval11TurnedOn = false;
let interval12TurnedOn = false;
let interval13TurnedOn = false;
let interval14TurnedOn = false;

let selectedRootNote;
let selectedSecondNote;
let selectedInterval = -1; 
let selectedRandomPlayingTechnique = false; // ascneding/descending. only if selected to random playing technique


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

// Note utility functions:
function getNoteFromName(noteName) {
  return notes.find(function (note) { return note.name == noteName;});
}
function getNoteFromNumber(noteNumber) {
  return notes[noteNumber];
}
function getNoteNumber(note) {
  return notes.indexOf(note);
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// how many notes from middle C (4) (one side, not including self) to consider when picking note
function getRandomNote(noteRangeFromMidC) {
  return notes[notes.indexOf(getNoteFromName('C4')) + getRandomInt(-noteRangeFromMidC, noteRangeFromMidC)];
}

function getAvailableIntervals() {
  let availableIntervals = [];
  if (interval1TurnedOn) {
    availableIntervals.push(1);
  }
  if (interval2TurnedOn) {
    availableIntervals.push(2);
  }
  if (interval3TurnedOn) {
    availableIntervals.push(3);
  }
  if (interval4TurnedOn) {
    availableIntervals.push(4);
  }
  if (interval5TurnedOn) {
    availableIntervals.push(5);
  }
  if (interval6TurnedOn) {
    availableIntervals.push(6);
  }
  if (interval7TurnedOn) {
    availableIntervals.push(7);
  }
  if (interval8TurnedOn) {
    availableIntervals.push(8);
  }
  if (interval9TurnedOn) {
    availableIntervals.push(9);
  }
  if (interval10TurnedOn) {
    availableIntervals.push(10);
  }
  if (interval11TurnedOn) {
    availableIntervals.push(11);
  }
  if (interval12TurnedOn) {
    availableIntervals.push(12);
  }
  if (interval13TurnedOn) {
    availableIntervals.push(13);
  }
  if (interval14TurnedOn) {
    availableIntervals.push(14);
  }
  return availableIntervals;
} 
function getRandomInterval() {
  const availableIntervals = getAvailableIntervals();
  if (availableIntervals.length > 0)
  {
    return availableIntervals[Math.floor(Math.random() * availableIntervals.length)];
  }
}

function getIntervalNameFromNumber(interval) {
  return ({
    1: 'Minor 2nd',
    2: 'Major 2nd',
    3: 'Minor 3rd',
    4: 'Major 3rd',
    5: 'Perfect 4th',
    6: 'Tritone',
    7: 'Perfect 5th',
    8: 'Minor 6th',
    9: 'Major 6th',
    10: 'Minor 7th',
    11: 'Major 7th',
    12: 'Octave',
    13: 'Minor 8th',
    14: 'Major 8th',
  })[interval] ?? 'None';
}


// Pedal button
pedalButton.addEventListener('click', () => {
  pedalTurnedOn = !pedalTurnedOn;
  if (pedalTurnedOn) {
    pedalButton.classList.add('on');
  }
  else {
    pedalButton.classList.remove('on');
    stopAllNotes();
  }
});

// Show piano button
showPianoButton.addEventListener('click', () => {
  showPianoTurnedOn = !showPianoTurnedOn;
  if (showPianoTurnedOn) {
    showPianoButton.classList.add('on');
  }
  else {
    showPianoButton.classList.remove('on');
  }
});

function stopAllNotes() {
  notes.forEach( note => {
    note.audio.pause()
    note.div.classList.remove('active');
  });
}

// Interval main buttons

// Interval next button
intervalNextButton.addEventListener('click', () => {
  // If no interval has been selected yet OR can generate new one, do it
  if (selectedInterval == -1 && getAvailableIntervals().length > 0) {
    selectAndPlayInterval();
  }
});

function selectAndPlayInterval() {
  // Clear existing buttons if there are any
  while (intervalGuessButtonsDiv.lastElementChild) {
    intervalGuessButtonsDiv.removeChild(intervalGuessButtonsDiv.lastElementChild);
  }
  // Make new ones
  getAvailableIntervals().forEach(interval => {
    let intervalGuessButton = document.createElement('button');
    intervalGuessButton.id = 'interval-button-' + interval;
    intervalGuessButton.classList.add('interval-guess-button');
    intervalGuessButton.textContent = getIntervalNameFromNumber(interval);
    intervalGuessButton.addEventListener('click', () => {
      onGuessButtonClicked(intervalGuessButton, interval);
    });
    intervalGuessButtonsDiv.appendChild(intervalGuessButton);
  });
  // Stop all playing sounds if there are any
  stopAllNotes();

  // Select interval and notes
  selectedRootNote = getRandomNote(rootNoteRange);
  selectedInterval = getRandomInterval();
  // Second note is randomly either above or below the root note with the selected interval
  selectedSecondNote = getNoteFromNumber(getNoteNumber(selectedRootNote) + selectedInterval); 
  if (Math.random() < 0.5) {
    selectedSecondNote = getNoteFromNumber(getNoteNumber(selectedRootNote) - selectedInterval); 
  }

  // Select ascneding/descending playing order/technique (will only be used if random is selected)
  selectedRandomPlayingTechnique = false;
  if (Math.random() < 0.5) {
    selectedRandomPlayingTechnique = true;
  }
  

  playSelectedInterval();

  intervalNextButton.style.display = "none";
  intervalPlayButton.style.display = "inline-block";
}

// Start button
intervalStartButton.addEventListener('click', () => {
  if (getAvailableIntervals().length > 0) {
    intervalStartButton.style.display = "none";
    selectAndPlayInterval();
  }
});

// Play button
intervalPlayButton.addEventListener('click', () => {
  if (getAvailableIntervals().length > 0) {
    playSelectedInterval();
  }
});

async function playSelectedInterval() {
  let lowerNote = getNoteNumber(selectedSecondNote) > getNoteNumber(selectedRootNote) ? selectedRootNote : selectedSecondNote;
  let higherNote = getNoteNumber(selectedSecondNote) > getNoteNumber(selectedRootNote) ? selectedSecondNote : selectedRootNote;
  switch (playingTechniqueSelect.options[playingTechniqueSelect.selectedIndex].value) {
    case 'ascending':
      playNote(lowerNote);
      await new Promise(r => setTimeout(r, noteDelay));
      playNote(higherNote);
      break;
    case 'descending':
      playNote(higherNote);
      await new Promise(r => setTimeout(r, noteDelay));
      playNote(lowerNote);
      break;
    case 'random':
      if (selectedRandomPlayingTechnique) {
        playNote(lowerNote);
        await new Promise(r => setTimeout(r, noteDelay));
        playNote(higherNote);
      }
      else {
        playNote(higherNote);
        await new Promise(r => setTimeout(r, noteDelay));
        playNote(lowerNote);
      }
      break;
    case 'harmonic':
      playNote(lowerNote);
      playNote(higherNote);
      break;
  }
}

// Interval guessed button clicked
function onGuessButtonClicked(intervalGuessButton, guessedInterval) {
  if (guessedInterval == selectedInterval) {
    intervalGuessButton.classList.add('correct');
    // Disable all buttons
    for (let guessButton of document.getElementsByClassName('interval-guess-button')) {
      guessButton.disabled = true;
    }
    intervalNextButton.style.display = "inline-block";
    selectedInterval = -1; // Reset
    selectedRootNote;
    selectedSecondNote;
  }
  else {
    intervalGuessButton.classList.add('incorrect');
    intervalGuessButton.disabled = true;
  }
}

// Interval settings buttons
interval1Button.addEventListener('click', () => {
  console.log('hi');
  interval1TurnedOn = !interval1TurnedOn;
  if (interval1TurnedOn) {
    interval1Button.classList.add('on');
  }
  else {
    interval1Button.classList.remove('on');
  }
});
interval2Button.addEventListener('click', () => {
  interval2TurnedOn = !interval2TurnedOn;
  if (interval2TurnedOn) {
    interval2Button.classList.add('on');
  }
  else {
    interval2Button.classList.remove('on');
  }
});
interval3Button.addEventListener('click', () => {
  interval3TurnedOn = !interval3TurnedOn;
  if (interval3TurnedOn) {
    interval3Button.classList.add('on');
  }
  else {
    interval3Button.classList.remove('on');
  }
});
interval4Button.addEventListener('click', () => {
  interval4TurnedOn = !interval4TurnedOn;
  if (interval4TurnedOn) {
    interval4Button.classList.add('on');
  }
  else {
    interval4Button.classList.remove('on');
  }
});
interval5Button.addEventListener('click', () => {
  interval5TurnedOn = !interval5TurnedOn;
  if (interval5TurnedOn) {
    interval5Button.classList.add('on');
  }
  else {
    interval5Button.classList.remove('on');
  }
});
interval6Button.addEventListener('click', () => {
  interval6TurnedOn = !interval6TurnedOn;
  if (interval6TurnedOn) {
    interval6Button.classList.add('on');
  }
  else {
    interval6Button.classList.remove('on');
  }
});
interval7Button.addEventListener('click', () => {
  interval7TurnedOn = !interval7TurnedOn;
  if (interval7TurnedOn) {
    interval7Button.classList.add('on');
  }
  else {
    interval7Button.classList.remove('on');
  }
});
interval8Button.addEventListener('click', () => {
  interval8TurnedOn = !interval8TurnedOn;
  if (interval8TurnedOn) {
    interval8Button.classList.add('on');
  }
  else {
    interval8Button.classList.remove('on');
  }
});
interval9Button.addEventListener('click', () => {
  interval9TurnedOn = !interval9TurnedOn;
  if (interval9TurnedOn) {
    interval9Button.classList.add('on');
  }
  else {
    interval9Button.classList.remove('on');
  }
});
interval10Button.addEventListener('click', () => {
  interval10TurnedOn = !interval10TurnedOn;
  if (interval10TurnedOn) {
    interval10Button.classList.add('on');
  }
  else {
    interval10Button.classList.remove('on');
  }
});
interval11Button.addEventListener('click', () => {
  interval11TurnedOn = !interval11TurnedOn;
  if (interval11TurnedOn) {
    interval11Button.classList.add('on');
  }
  else {
    interval11Button.classList.remove('on');
  }
});
interval12Button.addEventListener('click', () => {
  interval12TurnedOn = !interval12TurnedOn;
  if (interval12TurnedOn) {
    interval12Button.classList.add('on');
  }
  else {
    interval12Button.classList.remove('on');
  }
});
interval13Button.addEventListener('click', () => {
  interval13TurnedOn = !interval13TurnedOn;
  if (interval13TurnedOn) {
    interval13Button.classList.add('on');
  }
  else {
    interval13Button.classList.remove('on');
  }
});
interval14Button.addEventListener('click', () => {
  interval14TurnedOn = !interval14TurnedOn;
  if (interval14TurnedOn) {
    interval14Button.classList.add('on');
  }
  else {
    interval14Button.classList.remove('on');
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
  if (showPianoTurnedOn) {
    note.div.classList.add('active');
  }

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
