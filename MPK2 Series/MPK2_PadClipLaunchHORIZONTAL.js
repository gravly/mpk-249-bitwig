var PadClipLauncherH = new PadMode();


//var ClipBanks = {
//    Bank_A:0x01,
//    Bank_B:0x02
//};


PadClipLauncherH.init = function() {
    if (displayHelpText) {
        if (activeClipBank == ClipBanks.Bank_A) {
            host.showPopupNotification("Pads: Horizontal Clip Launch: Slots 1 - 4");	//was Clip Launch 1-4 
        }
        else {
            host.showPopupNotification("Pads: Horizontal Clip Launch: Slots 5 - 8");	//was Clip Launch 5-8
        }
    }

    PadNotes.setShouldConsumeEvents(false);
    PadNotes.setKeyTranslationTable(PadMIDITable.OFF);

    for(var x = 0; x < 8; x++) {			//TRACK.  change from 8 tracks to 16 once work out problem here
        for (var y = 0; y < 8; y++) {			//SLOT.  8 slots (was 16 on old script)
            PadClipLauncherH.updateClipLED(x,y);
        }
    }
}

PadClipLauncherH.handleMIDI = function (data1,data2) {  //changed for horizontal clip launch
    pressed = data2 > 0;
    var clipAdd = 0;  //clipAdd substitued for trackADD through this function
    activeClipBank == ClipBanks.Bank_A ? clipAdd = 0 : clipAdd = 4;

    if(pressed == true) {
        var stopclip = 0
        var delclip = 0
        if(shifted == true) {
            stopclip = 1
            }
        if(shifted2 == true) {
            delclip = 1
            }

        var track = 0        
        pressed = data2 > 0;
   
   if (data1 < (16+36)) {
        var track = Math.abs (Math.floor((data1 - 36) / 4) - 3);
    }
    
   else if (data1 < (32+36)) {
        var track = Math.abs (Math.floor((data1 - 36 - 16) / 4) -3) + 4;
   }

//   else if (data1 < (48+36)) {
//        track = Math.abs (Math.floor((data1 - 36 - 32) / 4) -3) + 8;
//   }
//
//   else if (data1 < (64+36)) {
//        track = Math.abs (Math.floor((data1 - 36 - 48) / 4) -3) + 16;
//   }

        var clip = PadClipLauncherH.getClipForMidiNote(data1) + clipAdd;
        if(stopclip == 1) {
        trackBank.getTrack(track).getClipLauncherSlots().stop();            
            }
        else if(delclip == 1) {
        trackBank.getTrack(track).getClipLauncherSlots().deleteClip(clip);
            }
        else {
        trackBank.getTrack(track).getClipLauncherSlots().launch(clip);
            }
    }
}


PadClipLauncherH.clipContentObs = function (track,slot, hasContent) {
    PadMode.prototype.clipContentObs(track,slot,hasContent);
    this.updateClipLED(track,slot);
}

PadClipLauncherH.clipRecordObs = function (track,slot,isRecording) {
    PadMode.prototype.clipRecordObs(track,slot,isRecording);
    this.updateClipLED(track,slot);
}

PadClipLauncherH.clipPlayingObs = function(track,slot,isPlaying) {
    PadMode.prototype.clipPlayingObs(track,slot,isPlaying);
    this.updateClipLED(track,slot);
}

PadClipLauncherH.getPadFromTrackSlot = function (track,slot, bank) {  //changed for Horizontal 
    
    var Pad;
    var newslot;

 //   if (bank == ClipBanks.Bank_B) { slot = slot - 4; }  //reversed track and slot in this formula

    if ( track < 4) {                 //reversed track and slot in this formula
        newslot = Math.abs(track -3); //reversed track and slot in this formula
        Pad = slot + (newslot * 4);   //reversed track and slot in this formula
    }

    else if ( track < 8) {		    //reversed track and slot in this formula
        newslot = Math.abs(track -7) + 4;   //reversed track and slot in this formula
        Pad = slot + (newslot * 4);         //reversed track and slot in this formula
    }

//    else if ( track < 12) { //etc...
//        newslot = Math.abs(track - 11) + 8;
//        Pad = slot + (newslot * 4);
//    }
//
//    else  {
//        newslot = Math.abs(track - 15) + 12;
//        Pad = slot + (newslot * 4);
//    }
    return Pad;

}

PadClipLauncherH.updateClipLED = function(track, slot) {
    
    if ( slot < 4 && activeClipBank == ClipBanks.Bank_A)  {
        Pad = this.getPadFromTrackSlot(track,slot,activeClipBank);
        var clipData = clipSlots[track][slot];
        if(clipData.recording == true) {
            lightPad (padColors['Red'],Pad,"Off");
        }

        else if(clipData.playing == true) {
            lightPad (padColors['Green'],Pad,"Off");
        }

        else {
            lightPad (clipData.color,Pad,"Off");
        }
    }

    else if ( slot > 3 && activeClipBank == ClipBanks.Bank_B)  {
        Pad = this.getPadFromTrackSlot(track,slot,activeClipBank);
       var clipData = clipSlots[track][slot];
        if(clipData.recording == true) {
           lightPad (padColors['Red'],Pad,"Off");
        }
        
        else if(clipData.playing == true) {
            lightPad (padColors['Green'],Pad,"Off");
        }
        
        else {
            lightPad (clipData.color,Pad,"Off");
        }
    }

}

PadClipLauncherH.getClipForMidiNote = function (note) { //Modified for Horizontal
    note = note - 36;

return  note % 4;
    
//   if (note < 16) {
//       return  Math.abs (Math.floor(note / 4) - 3);
//    }
//    
//   else if (note < 32) {
//       note = note - 16;
//       return  Math.abs (Math.floor(note / 4) -3) + 4;
//   }

//   else if (note < 48) {
//       note = note - 32;
//       return  Math.abs (Math.floor(note / 4) -3) + 8;
//   }
//   else if (note < 64) {
//       note = note - 48;
//       return  Math.abs (Math.floor(note / 4) -3) + 12;
//   }
}





