const synth = new Tone.Synth().toMaster();
const synth2 = new Tone.Synth().toMaster();


const ratiosMap = [
    {name: "P1", enabled: false, ratio: 1},
    {name: "m2", enabled: true, ratio: 16 / 15},
    {name: "M2", enabled: true, ratio: 9 / 8},
    {name: "m3", enabled: true, ratio: 6 / 5},
    {name: "M3", enabled: true, ratio: 5 / 4},
    {name: "P4", enabled: true, ratio: 4 / 3},
    {name: "A4", enabled: true, ratio: 45 / 32},
    {name: "P5", enabled: true, ratio: 3 / 2},
    {name: "m6", enabled: true, ratio: 8 / 5},
    {name: "M6", enabled: true, ratio:  5 / 3},
    {name: "m7", enabled: true, ratio:  16 / 9},
    {name: "M7", enabled: true, ratio:  15 / 8}
]


const base = 100;
const swing = 300;
var currentNote;
var currentInterval;


const Magnitude = Object.freeze({
    'down': 'down',
    'up': 'up',
    'both': 'both'
});

var magnitudeChoice = Magnitude.both;
var currentDirection;
const Direction = Object.freeze({
            'up': {
                value: 'up',
                description: '⬆︎'
            },
            down: {
                value: 'down',
                description: '⬇︎'
            },
            both: {
                value: 'both',
                description: '⬆︎⬇︎'
            }
});


function changeMagnitude() {
    if (magnitudeChoice == Magnitude.down) {
        magnitudeChoice = Magnitude.up;
    } else if (magnitudeChoice == Magnitude.up) {
        magnitudeChoice = Magnitude.both;
    } else if (magnitudeChoice == Magnitude.both) {
        magnitudeChoice = Magnitude.down;
    }
}
        
    
function getRandomNote() {
    return base + Math.random() * swing;
}

function getCurrentDirection() {
    switch(magnitudeChoice) {
        case Magnitude.down:
            return Magnitude.down;
        case Magnitude.up: 
            return Magnitude.up;    
        case Magnitude.both:
            return (Math.random() > 0.5) ? 
                Magnitude.up : Magnitude.down;
    } 
}

function getIntervalNote() {
    var ratio = currentInterval.ratio;
    if (currentDirection == Magnitude.down) {
        ratio = 1 / currentInterval.ratio;
    }
    return currentNote * ratio; 
}

function getAvailableIntervals() {
    let availableIntervals = []
    for (i = 0; i < ratiosMap.length; i++) {
        ratio = ratiosMap[i];
        if(ratio.enabled) {
            availableIntervals.push(ratio);
        }
    }
    return availableIntervals;
}


function getRandomInterval() {
    var availableIntervals = getAvailableIntervals();
    var interval = availableIntervals[Math.floor(Math.random() * availableIntervals.length)]; 
    return interval;
}


function playNote(note) {
    releaseSynths();
    synth.triggerAttackRelease(note, "3s");
}

function playAnswer(note) {
    playNote(getIntervalNote());
}

function playTogether(note) {
    releaseSynths();
    playNote(note);
    synth2.triggerAttackRelease(getIntervalNote(note), "3s");

}

function releaseSynths() {
    synth.triggerRelease();
    synth2.triggerRelease();
}


function handleGenerateAndPlay() {
    currentDirection = getCurrentDirection();
    currentNote = getRandomNote();
    currentInterval = getRandomInterval();
    playNote(currentNote);
    handleSpaceUI();
}

$(document).on('keypress', (e) => {
    if (e.code == 'Space') {
        e.preventDefault()
        handleGenerateAndPlay();
    }
    if (e.code == 'KeyZ') {
        playNote(currentNote);
    }
    if (e.code == 'KeyX') {
        playAnswer(currentNote);
    }
    if (e.code == 'KeyC') {
        playTogether(currentNote);
    }
    
})