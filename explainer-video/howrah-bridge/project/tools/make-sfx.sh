#!/usr/bin/env bash
# Synthesizes all sound effects + a soft ambient music pad with ffmpeg (no downloads, no licensing issues).
set -euo pipefail
cd "$(dirname "$0")/../public"
mkdir -p sfx
A="-ar 48000 -ac 2 -y -loglevel error"
ffmpeg -f lavfi -i "anoisesrc=color=pink:d=0.9:a=0.6" -af "highpass=f=250,lowpass=f=3200,afade=t=in:d=0.35:curve=exp,afade=t=out:st=0.4:d=0.5,volume=0.8" $A sfx/whoosh.wav
ffmpeg -f lavfi -i "anoisesrc=color=pink:d=0.6:a=0.4" -af "lowpass=f=1400,afade=t=in:d=0.2,afade=t=out:st=0.25:d=0.35" $A sfx/swoosh-soft.wav
ffmpeg -f lavfi -i "aevalsrc='0.7*sin(2*PI*(760-1500*t)*t)*exp(-28*t)':d=0.18:s=48000" $A sfx/pop.wav
ffmpeg -f lavfi -i "aevalsrc='0.8*(random(0)*2-1)*exp(-260*t)':d=0.05:s=48000" -af "highpass=f=1500" $A sfx/click.wav
ffmpeg -f lavfi -i "aevalsrc='0.5*sin(2*PI*1900*t)*exp(-70*t)':d=0.07:s=48000" $A sfx/tick.wav
ffmpeg -f lavfi -i "aevalsrc='0.95*sin(2*PI*(95-70*t)*t)*exp(-8*t)':d=0.6:s=48000" -af "lowpass=f=400" $A sfx/thud.wav
ffmpeg -f lavfi -i "anoisesrc=color=brown:d=2.6:a=0.9" -af "lowpass=f=160,afade=t=in:d=0.3,afade=t=out:st=1.4:d=1.2,volume=2.2" $A sfx/rumble.wav
ffmpeg -f lavfi -i "aevalsrc='0.35*sin(2*PI*1318*t)*exp(-4*t)+0.18*sin(2*PI*1975*t)*exp(-6*t)':d=1.2:s=48000" $A sfx/ding.wav
ffmpeg -f lavfi -i "aevalsrc='0.5*(random(0)*2-1)*exp(-400*t)':d=0.03:s=48000" -af "highpass=f=2500" $A sfx/type.wav
# metallic clank (inharmonic partials, fast decay) for panels and the meeting moment
ffmpeg -f lavfi -i "aevalsrc='0.45*sin(2*PI*523*t)*exp(-9*t)+0.35*sin(2*PI*1187*t)*exp(-12*t)+0.25*sin(2*PI*1913*t)*exp(-16*t)+0.2*sin(2*PI*2771*t)*exp(-22*t)+0.5*(random(0)*2-1)*exp(-90*t)':d=1.2:s=48000" -af "aecho=0.6:0.4:40|90:0.3|0.2,lowpass=f=6000" $A sfx/clank.wav
# rivet hammer tap
ffmpeg -f lavfi -i "aevalsrc='0.7*sin(2*PI*880*t)*exp(-35*t)+0.5*(random(0)*2-1)*exp(-120*t)':d=0.25:s=48000" -af "lowpass=f=5000" $A sfx/hammer.wav
# muffled distant air-raid siren (slow rise and fall, heavily low-passed)
ffmpeg -f lavfi -i "aevalsrc='0.35*sin(2*PI*(430+170*sin(2*PI*0.18*t))*t)*(0.5-0.5*cos(2*PI*t/6))':d=6:s=48000" -af "lowpass=f=900,aecho=0.8:0.8:300:0.4,volume=0.8" $A sfx/siren.wav
# 32 s seamless ambient pad: Am - F - C - G, each chord swells in and out over 8 s.
E="if(lt(mod(t,32),8),sin(2*PI*220*t)+sin(2*PI*261.63*t)+sin(2*PI*329.63*t)+0.6*sin(2*PI*110*t),\
if(lt(mod(t,32),16),sin(2*PI*174.61*t)+sin(2*PI*220*t)+sin(2*PI*261.63*t)+0.6*sin(2*PI*87.31*t),\
if(lt(mod(t,32),24),sin(2*PI*196*t)+sin(2*PI*261.63*t)+sin(2*PI*329.63*t)+0.6*sin(2*PI*130.81*t),\
sin(2*PI*196*t)+sin(2*PI*246.94*t)+sin(2*PI*293.66*t)+0.6*sin(2*PI*98*t))))"
ffmpeg -f lavfi -i "aevalsrc='0.07*(0.5-0.5*cos(2*PI*mod(t,8)/8))*(${E})*(0.85+0.15*sin(2*PI*0.25*t))':d=32:s=48000" \
  -af "lowpass=f=1600,aecho=0.8:0.7:120|260:0.35|0.25,loudnorm=I=-16:TP=-2:LRA=11" -ar 48000 -ac 2 -b:a 192k -y -loglevel error music.mp3
echo "SFX + music written to public/"
