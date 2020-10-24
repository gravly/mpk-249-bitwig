# mpk-249-bitwig
Some botched together improvements to the original Akai controller script for MPK-249 in bitwig.

The main impulse to create this was to have a clip launcher where the pads match the arranger view layout
where the slots for one track run horizontally (rather than vertically), so I don't need to keep bending my brain sideways
on the fly.  Switch between S4 and S5 to access 8 slots.  At the moment the script is limited to Tracks 1-4 on Bank A and
5-8 on Bank B.  Despit some time spent on the problem I have not been able to get tracks 9-16 working via Banks C and D.

New Instructions

2 additional modes added for clip launch, and scene mode changes keys:

- S1 Instrument Mode
- S2 Clip Launch Mode Tracks 1-4
- S3 Clip Launch Mode Tracks 5-8
- S4 Clip Launch Horizontal Slots 1-4 (only works on Banks A and B - tracks 1-8).
- S5 Clip Launch Horizontal Slots 5-8 (only works on Banks A and B - tracks 1-8).
- S6 Scene Mode

Additional Clip control functionality:

- Shift (DAW Enter key in the centre of cursor keys beside mod wheel) and click clip in any clip mode to stop that clip/track.
- UpShift (DAW Up arrow) and click clip in any clip mode to DELETE that clip

Areas for improvement:
- get rid of hacks and redundant commented out sections
- in Clip Launch Horizontal Mode get tracks 9-16 working from Bank C and D.  I spent about an hour on this but couldn't crack it.
- move some of my bitwig customisations into the script - eg. metronome on/off, metronome volume
- get some better colours on the pads
- improve the DAW navigation which I find very hit and miss
- get more logic into the Control Bank assignments
- look at new scripting API conventions for bitwig
- more I'm sure...
