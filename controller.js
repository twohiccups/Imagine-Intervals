var useIntervalNames = true;

function createIntervalButtons() {

    //    $('#active-intervals').append('<button>h</button>')   
}


$(window).on('load', () => {

    setIntervalButtonNames();

    $('#app-info').on('click', () => {
        $('#app-info').hide();
        $('#outer').removeClass('outer-init')
        $('#outer').addClass('outer')
        $('#middle').addClass('middle')
        $('#inner').addClass('inner')
    })


    $('#magnitude').text(getDirectionButtonText());

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
            playTogether(currentNote);
        };
    })
//
//    $('.interval-button').on('click', (e) => {
//        alert($('.interval-button').index($(this)))
//    })
    
    $('.interval-button').on('click', function() {
        $(this).toggleClass('interval-off');
        
        const enabled =  ratiosMap[$(this).index() + 1].enabled
        ratiosMap[$(this).index() + 1].enabled = !enabled;  
    })
    $("#interval-names").on('click', () => {
        useIntervalNames = !useIntervalNames;
        setIntervalButtonNames();
        $('#interval-name').text(getIntervalText());
        if (useIntervalNames) {
            $("interval-names").text("Switch To Names")
        } else {
            $("interval-names").text("Switch To Numbers")
        }
    });

    $('#magnitude').on('click', () => {
        changeMagnitude()
        $('#magnitude').text(getDirectionButtonText())
    })

})

function setIntervalButtonNames() {
    for(i = 0; i < 11; i++) {
        if (useIntervalNames) {
            $('.interval-button').eq(i).text(ratiosMap[i + 1].name)
        } else {
            $('.interval-button').eq(i).text(ratiosMap[i + 1].number)
        }
    }
}


function getIntervalText() {
    var intervalName = useIntervalNames ? currentInterval.name : currentInterval.number;
    var intervalText = Direction[currentDirection].description + ' ' + intervalName;
    return intervalText;
}

function handleIntervalNameUI() {
    $('#interval-name').removeClass('press-space');
}


function getDirectionButtonText() {
    return 'Direction: ' + Direction[magnitudeChoice].description;
}


function handleSpaceUI() {
    const intervalText = useIntervalNames ? currentInterval.name : currentInterval.number;
    $('#interval-name').text(getIntervalText());
};
