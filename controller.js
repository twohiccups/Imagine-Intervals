function createIntervalButtons() {
    
    $('#active-intervals').append('<button>h</button>')   
}


$(window).on('load', () => {
    
    createIntervalButtons()

    
    $('#magnitude').text(getDirectionText());

    $('#repeat-note').on('click', () => {
        if (currentNote) {
            playNote(currentNote);
        };
    })
    $('#play-answer').on('click', () => {
        if (currentNote) {
            playAnswer(currentNote)   
        };
    })
    $('#play-together').on('click', () => {
        if (currentNote) {
            playTogether(currentNote)   
        };
    })
        
    
    $('#magnitude').on('click', () => {
        changeMagnitude()
        $('#magnitude').text(getDirectionText())
    })
    
})



function getDirectionText() {
    return 'Direction: ' + Direction[magnitudeChoice].description;
}


function handleSpaceUI() {
    $('#interval-name').text(Direction[currentDirection].description + ' ' + currentInterval.name);
};