import { useState, useEffect, useRef } from 'react';
import * as Tone from '../../node_modules/tone';

import BD from '../assets/sounds/BD.mp3'
import SD from '../assets/sounds/SD.mp3'
import ride from '../assets/sounds/ride.mp3'
import HH from '../assets/sounds/HH.mp3'

export default function useSounds(){
const mySampler = useRef(null);

const [isBdPlayed, isBdPlayedChange]  = useState(false);
const [isSdPlayed, isSdPlayedChange]  = useState(false);
const [isRidePlayed, isRidePlayedChange]  = useState(false);
const [isHhPlayed, isHhPlayedChange]  = useState(false);

  useEffect(()=> {
    const sampler = new Tone.Sampler({
      C4: BD,
      "D#4": SD,
      "F#4": ride,
      A4: HH
    }).toDestination();

    Tone.loaded().then(() => {
      mySampler.current = sampler;
    })
  }, []);

  function soundPlay(note) {
    mySampler.current.triggerAttackRelease([note], 4);
  };

  function handleKeyDown({ key }) {
    switch(key) {
      case "a":
        isBdPlayedChange(true);
        window.setTimeout(() => isBdPlayedChange(false), 300);
        soundPlay("C4");   
        break;
      case "z":
        isSdPlayedChange(true);
        window.setTimeout(() => isSdPlayedChange(false), 300);
        soundPlay("D#4");
        break;
      case "e":
        isRidePlayedChange(true);
        window.setTimeout(() => isRidePlayedChange(false), 300);
        soundPlay("F#4");
        break;
      case "r":
        isHhPlayedChange(true);
        window.setTimeout(() => isHhPlayedChange(false), 300);
        soundPlay("A4");
        break;
      default:
        break;
    }
  };

  useEffect(()=>{
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleSampleChange(note, file){
    let fileURL = URL.createObjectURL(file);
    let buffer = new Tone.Buffer(fileURL);
    mySampler.current.add(note, buffer, ()=>alert("Sample successfully changed"));

  };

  const buttonsList = [
    {
      soundPlay: ()=> soundPlay("C4"),
      isPlayed: isBdPlayed,
      id:"Bd",
      handleSampleChange : (e) => handleSampleChange("C4", e.target.files[0]),
    },
    {
      soundPlay: ()=> soundPlay("D#4"),
      isPlayed: isSdPlayed,
      id:"Sd",
      handleSampleChange : (e) => handleSampleChange("D#4", e.target.files[0]),
    },
    {
      soundPlay: ()=> soundPlay("F#4"),
      isPlayed: isRidePlayed,
      id:"ride",
      handleSampleChange : (e) => handleSampleChange("F#4", e.target.files[0]),
    },
    {
      soundPlay: ()=> soundPlay("A4"),
      isPlayed: isHhPlayed,
      id:"Hh",
      handleSampleChange : (e) => handleSampleChange("A4", e.target.files[0]),
    },
  ]

  return { buttonsList };
};