loadAPI(1);

/* Script Initilization */

load("MPK2_common.js");
load("MPK2_PadInstrument.js");
load("MPK2_PadClipLaunch.js");
load("MPK2_PadSceneLaunch.js");


host.defineController("Akai", "MPK261", "1.0.8", "27400730-da60-11e3-9c1a-0800200c9a66");
host.defineMidiPorts(2, 2);

if (host.platformIsWindows()) {
    host.addDeviceNameBasedDiscoveryPair(["MPK261","MIDIIN4 (MPK261)"], ["MPK261","MIDIOUT4 (MPK261)"]);
}

else if (host.platformIsMac())  {
    host.addDeviceNameBasedDiscoveryPair(["MPK261 Port A","MPK261 Remote"], ["MPK261 Port A","MPK261 Remote"]);
}
else {
    host.addDeviceNameBasedDiscoveryPair(["MPK261 MIDI 1","MPK261 MIDI 4"], ["MPK261 MIDI 1","MPK261 MIDI 4"]);
}

/* MPK261 MIDI Product ID */
const PRODUCT_ID = 0x25;
function init()
{

	InitNoteInputs("MPK261")
    initClipArray();


    setActivePadMode(PadInstrument);
    
	transport = host.createTransportSection();
	application = host.createApplicationSection();
    trackBank = host.createMainTrackBank(8, 2, 16);
    sceneLaunchTrackBank = host.createTrackBank(1,0,64);


	cursorTrack = host.createCursorTrack(2, 0);
	cursorDevice = host.createCursorDevice();

    primaryDevice = cursorTrack.getPrimaryDevice();
    primaryDevice.addNameObserver(11, "", cursorTrackInstrumentNameObs());

    cursorTrack.addColorObserver(cursorTrackColorObs());
    cursorTrack.addPitchNamesObserver(cursorTrackpitchObs());
    
    
    trackBank.getClipLauncherScenes().addNameObserver(sceneLaunchObs());

	for (var p = 0; p < 8; p++)
	{
		var macro = primaryDevice.getMacro(p).getAmount();
		var parameter = cursorDevice.getParameter(p);
		var track = trackBank.getTrack(p);
        
        track.getArm().addValueObserver(armObsFunction(p));
        track.getMute().addValueObserver(muteObsFunction(p));
        track.getSolo().addValueObserver(soloObsFunction(p));
        
        macro.setIndication(true);
		parameter.setIndication(true);
		parameter.setLabel("P" + (p + 1));
		track.getVolume().setIndication(true);
		track.getPan().setIndication(true);
		track.getSend(0).setIndication(true);
		track.getSend(1).setIndication(true);
        
        var clipLauncherSlots = track.getClipLauncherSlots();
        clipLauncherSlots.addIsPlayingObserver(clipPlayingObs(p));
        clipLauncherSlots.addHasContentObserver(clipContentObs(p));
        clipLauncherSlots.addIsRecordingObserver(clipRecordObs(p));
        clipLauncherSlots.setIndication(true);
    }
    println("Akai Profressional MPK261 Bitwig Controller Script");
}
