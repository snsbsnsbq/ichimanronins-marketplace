import React, { useState, useEffect, useRef } from 'react'
import playIcon from '../imgs/play-solid.svg'
import pauseIcon from '../imgs/pause-solid.svg'
import backward from '../imgs/backward-solid.svg'
import forward from '../imgs/forward-solid.svg'


// 'NKOHA - Death Curse',
// 'NKOHA - Eternal Friend',
// 'NKOHA - 8IKS',
// 'NKOHA - At Peace',
// 'NKOHA - Atmosphere Spring',
// 'NKOHA - BAT',
// 'NKOHA - Chine Product',
// 'NKOHA - DANZO',
// 'NKOHA - Dark East',
// 'NKOHA - Dilun',
// 'NKOHA - DRUMS',
// 'NKOHA - Drunk',
// 'NKOHA - Feature',
// 'NKOHA - Flag',
// 'NKOHA - Girayas Death',
// 'NKOHA - How It All Began',
// 'NKOHA - ICHIGO',
// 'NKOHA - IGA',
// 'NKOHA - Imortality',
// 'NKOHA - Inlun',
// 'NKOHA - Issho Ni',
// 'NKOHA - Jiraiya',
// 'NKOHA - Kung-Fu',
// 'NKOHA - Lavender',
// 'NKOHA - LONELINESS',
// 'NKOHA - Long',
// 'NKOHA - Love as a Cure',
// 'NKOHA - Memories',
// 'NKOHA - Mizu No Sekai',
// 'NKOHA - My Soul',
// 'NKOHA - Peaceful Warrior',
// 'NKOHA - Samurai',
// 'NKOHA - Shen',
// 'NKOHA - Shoko Tendo',
// 'NKOHA - Street Type Samurai',
// 'NKOHA - The Last Magic',
// 'NKOHA - The Last of his Line',
// 'NKOHA - Tianlong',
// 'NKOHA - Very Strange Things',
// 'NKOHA - Way Back Home',
// 'NKOHA - Yamaguchi-Gumi'

function Player({ played, setPlayed }) {
   const audioRef = useRef()
   const progressRef = useRef()
   const [songProgress, setSongProgress] = useState(0)
   const [songIndex, setSongIndex] = useState(0)
   //const [played, setPlayed] = useState(false)
   useEffect(async () => {
      audioRef.current.src = playlist[songIndex].src.default
      played && audioRef.current.play()
   }, [songIndex])

   useEffect(() => {
      if (played) {
         const t = setInterval(() => {
            if (audioRef.current.ended) {
               clearInterval(t);
               nextTrack()
            } else {
               setSongProgress(Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100));
            }
         }, 500);
         return () => clearInterval(t)
      }
   }, [played, songIndex])

   const playlist = [
      { src: require('../mp3/1.mp3'), songName: 'NKOHA - Eternal' },
      { src: require('../mp3/2.mp3'), songName: 'NKOHA - Anguish of Heartache' },
      { src: require('../mp3/3.mp3'), songName: 'NKOHA - Death Curse' },
      { src: require('../mp3/3.mp3'), songName: 'NKOHA - Eternal Friend' },
      { src: require('../mp3/4.mp3'), songName: 'NKOHA - 8IKS' },
      { src: require('../mp3/5.mp3'), songName: 'NKOHA - At Peace' },
      { src: require('../mp3/6.mp3'), songName: 'NKOHA - Atmosphere Spring' },
      { src: require('../mp3/7.mp3'), songName: 'NKOHA - BAT' },
      { src: require('../mp3/8.mp3'), songName: 'NKOHA - Chine Product' },
      { src: require('../mp3/9.mp3'), songName: 'NKOHA - DANZO' },
      { src: require('../mp3/10.mp3'), songName: 'NKOHA - Dark East' },
      { src: require('../mp3/11.mp3'), songName: 'NKOHA - Dilun' },
      { src: require('../mp3/12.mp3'), songName: 'NKOHA - DRUMS' },
      { src: require('../mp3/13.mp3'), songName: 'NKOHA - Drunk' },
      { src: require('../mp3/14.mp3'), songName: 'NKOHA - Feature' },
      { src: require('../mp3/15.mp3'), songName: 'NKOHA - Flag' },
      { src: require('../mp3/16.mp3'), songName: 'NKOHA - Girayas Death' },
      { src: require('../mp3/17.mp3'), songName: 'NKOHA - How It All Began' },
      { src: require('../mp3/18.mp3'), songName: 'NKOHA - ICHIGO' },
      { src: require('../mp3/19.mp3'), songName: 'NKOHA - IGA' },
      { src: require('../mp3/20.mp3'), songName: 'NKOHA - Imortality' },
      { src: require('../mp3/21.mp3'), songName: 'NKOHA - Inlun' },
      { src: require('../mp3/22.mp3'), songName: 'NKOHA - Issho Ni' },
      { src: require('../mp3/23.mp3'), songName: 'NKOHA - Jiraiya' },
      { src: require('../mp3/24.mp3'), songName: 'NKOHA - Kung-Fu' },
      { src: require('../mp3/25.mp3'), songName: 'NKOHA - Lavender' },
      { src: require('../mp3/26.mp3'), songName: 'NKOHA - LONELINESS' },
      { src: require('../mp3/27.mp3'), songName: 'NKOHA - Long' },
      { src: require('../mp3/28.mp3'), songName: 'NKOHA - Love as a Cure' },
      { src: require('../mp3/29.mp3'), songName: 'NKOHA - Memories' },
      { src: require('../mp3/30.mp3'), songName: 'NKOHA - Mizu No Sekai' },
      { src: require('../mp3/31.mp3'), songName: 'NKOHA - My Soul' },
      { src: require('../mp3/32.mp3'), songName: 'NKOHA - Peaceful Warrior' },
      { src: require('../mp3/33.mp3'), songName: 'NKOHA - Samurai' },
      { src: require('../mp3/34.mp3'), songName: 'NKOHA - Shen' },
      { src: require('../mp3/35.mp3'), songName: 'NKOHA - Shoko Tendo' },
      { src: require('../mp3/36.mp3'), songName: 'NKOHA - Street Type Samurai' },
      { src: require('../mp3/37.mp3'), songName: 'NKOHA - The Last Magic' },
      { src: require('../mp3/38.mp3'), songName: 'NKOHA - The Last of his Line' },
      { src: require('../mp3/39.mp3'), songName: 'NKOHA - Tianlong' },
      { src: require('../mp3/40.mp3'), songName: 'NKOHA - Very Strange Things' },
      { src: require('../mp3/41.mp3'), songName: 'NKOHA - Way Back Home' },
      { src: require('../mp3/42.mp3'), songName: 'NKOHA - Yamaguchi-Gumi' }
   ]

   const play = () => {
      audioRef.current.play()
      audioRef.current.volume = 1
      setPlayed(true)
   }

   const pause = () => {
      audioRef.current.pause()
      setPlayed(false)
   }

   const nextTrack = () => {
      setSongIndex((songIndex + 1) % playlist.length)
   }

   const prevTrack = () => {
      setSongIndex((songIndex || playlist.length) - 1)
   }

   function setProgress(e) {
      const width = progressRef.current.clientWidth
      const clickX = Math.floor(e.pageX - e.currentTarget.getBoundingClientRect().x);
      const duration = audioRef.current.duration;
      audioRef.current.currentTime = (clickX / width) * duration;
      setSongProgress(Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100));
   }

   return (
      <div className="player">
         <div className="song">{playlist[songIndex].songName}</div>
         <div ref={progressRef} className="progress__container" onClick={(e) => setProgress(e)}>
            <div className="progress" style={{ width: `${songProgress}%` }} ></div>
         </div>
         <div className="buttons">
            <img src={backward} className="fas fa-backward" onClick={prevTrack}></img>
            <div className="buttons__play-pause">
               {/* <i className="fas fa-play"></i> */}
               {played ? <img src={pauseIcon} onClick={pause} /> : <img src={playIcon} onClick={play} />}
            </div>
            <img src={forward} className="fas fa-forward" onClick={nextTrack}></img>
         </div>
         <audio ref={audioRef} className="audio"></audio>
      </div>
   );
}

export default Player;
