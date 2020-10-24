


PadSceneLauncher = new PadMode();


PadSceneLauncher.init = function() {
    if (displayHelpText) {
        if (PRODUCT_ID == MPK225_PID) {
            host.showPopupNotification("Pads: Scene Launch 1 - 32");            
        }
        else {
            host.showPopupNotification("Pads: Scene Launch 1 - 64");
        }
    }
    PadNotes.setShouldConsumeEvents(false);
    PadNotes.setKeyTranslationTable(PadMIDITable.OFF);
    lightAllPads(padColors['Red'],"Off");
}


function sceneLaunchObs() {
    return function(slots,name) {
    }
}


PadSceneLauncher.handleMIDI = function(data1,data2) {
    pressed = data2 > 0;
    if (pressed == true) {
        sceneLaunchTrackBank.launchScene(data1 - 36);
    }
}
