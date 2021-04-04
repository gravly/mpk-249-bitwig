***************Use preset 6 Bitwig*******************

New Instructions

Use Control Bank A setting to select S1-S6

I hand-edited the drumpad mapping on the controller so that Bank A, Pad 1 is C2, Pad 2 is C#2 and ascending to Pad 16 D#3.  Bank B is Pad 1 E3 to Pad 16 G4.  Bank C is Pad 1 G#4 to B5.  Bank D is Pad C6 to D#7.  This means by default the drum pads are active for drum machine presents when bitwig and the controller start up.  To do this you need to first press the 'Edit' button on the MPK controller.  Press the relevant drum pad.  Press twice on the down arrow bellow the jog dial and use the jog dial to select the right note.  Press the jog dial in to confirm your selection and then move onto the next drum pad.  A much better solution would be to somehow make Bank D the intial selected group on the controller).

Created S4 and S5 to enable a WYSIWG clip launch

S1 Instrument Mode
S2 Clip Launch Mode Tracks 1-4
S3 Clip Launch Mode Tracks 5-8
S4 Clip Launch Horizontal Slots 1-4 (only works on Banks A and B - tracks 1-8).
S5 Clip Launch Horizontal Slots 5-8 (only works on Banks A and B - tracks 1-8).
S6 Scene Mode
NON-MODES
S7 Popup notifications toggle
S8 Clip launcher overdub toggle

CLIP LAUNCHING
Use control bank B to record enable tracks and control bank C to Mute them.
Use control bank A and select S4 or S5 to use the WYSIWIG Clip launcher.
Once a track is Record enabled, use S8 to toggle between auditioning and overdubbing on a clip.

Shift (DAW Enter key in the centre of cursor keys beside mod wheel) and click clip in any clip mode to stop that clip/track.
UpShift (DAW Up arrow) and click clip in any clip mode to DELETE that clip

In summary
PLAY    click
RECORD  click if empty slot with track armed
OVERDUB ensure track is armed and toggle clip launcher overdub from S8
STOP	Shift click
DELETE	Up-shift click


REPROGRAMMING DRUM PADS (reiterating the instructions at the top)

Bank A- Pad 1 is C2 = midi 36
Bank B, C, D just keep ascending from there.

GLITCHES
Pad coloration is not working on the drumpads.  The drumKeys array is not filled according to whether drumpads have instruments in them or not.  I couldn't crack this problem (find out where to download those values), despite half a day spent.  In the end I set all drumpad lights to on.

TERMINOLOGY

'Bank' in MPK2_PadClipLaunch.js refers to whether tracks 1-4 or 5-8 are selected?

At the moment it does up to 8 tracks and up to 16 slots.
Could make it up to 16 tracks (Bank A, B, C, D) and up to 8 slots.

Tracks are numbered 0, 1, 2, 3 (Bank A)
		    4, 5, 6, 7 (Bank B)

EXISTING
Say slot is 3(4) and track is 2(3)
newslot is then 0, Pad is then 2+0 = 2

Say slot is 2(3) and track is 1(2)
newslot is then 1, Pad is then 1+(1*4) = 5


WE WANT

newslot = Math.abs(track -3)
Pad = slot + (newslot * 4)

Say slot is 3(4) and track is 2(3)
newslot is then 1, Pad is then 3+(1*4) = 7

Say slot is 2(3) and track is 1(2)
newslot is then 2, Pad is then 2+(2*4) = 10

if track <8 then -7 from track.
If track is 6(7) and slot is 1(2)
newslot is then 1, Pad is then 5
