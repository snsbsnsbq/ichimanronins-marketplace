import { useState, useEffect } from 'react';
import dialogsamurai from '../imgs/dialogsamurai.png';
import dialogwindow from '../imgs/dialogwindow.png';

function About({ scrollY, offset }) {
   const text = ['The legion of 10.000 pixelated', 'unique ronins on the ethereum', 'blockchain waiting to be minted.', 'Join us.']
   const [textValue, setTextValue] = useState(['', '', '', '']);
   const [scrollPosition, setScrollPosition] = useState(false)
   const [visibleDialogsamurai, setVisibleDialogsamurai] = useState(false)
   const [visibleDialogwindow, setVisibleDialogwindow] = useState(false)
   const [visibleBackground, setVisibleBackground] = useState(false)

   useEffect(() => {
      //   console.log(scrollY, offset(document.querySelector('.about')).top - (window.innerHeight - offset(document.querySelector('.about')).top / 2))
      if (scrollY > offset(document.querySelector('.about')).top - (window.innerHeight - offset(document.querySelector('.about')).top / 2)) {
         if (!visibleBackground) {
            setVisibleBackground(true)
            setTimeout(() => {
               setVisibleDialogsamurai(true)
            }, 300)
            setTimeout(() => {
               setVisibleDialogwindow(true)
            }, 600)
            setTimeout(() => {
               setScrollPosition(true)
            }, 900)
         }
      }
   }, [scrollY])

   useEffect(() => {
      if (scrollPosition) {
         if (textValue[0].length < text[0].length) {
            setTimeout(() => {
               const newTextValue = [...textValue]
               newTextValue[0] = textValue[0] + text[0][textValue[0].length]
               setTextValue(newTextValue)
            }, 100)
         }
         else if (textValue[1].length < text[1].length) {
            setTimeout(() => {
               const newTextValue = [...textValue]
               newTextValue[1] = textValue[1] + text[1][textValue[1].length]
               setTextValue(newTextValue)
            }, 100)
         }
         else if (textValue[2].length < text[2].length) {
            setTimeout(() => {
               const newTextValue = [...textValue]
               newTextValue[2] = textValue[2] + text[2][textValue[2].length]
               setTextValue(newTextValue)
            }, 100)
         }

         else if (textValue[3].length < text[3].length) {
            setTimeout(() => {
               const newTextValue = [...textValue]
               newTextValue[3] = textValue[3] + text[3][textValue[3].length]
               setTextValue(newTextValue)
            }, 100)
         }
      }
   }, [text, scrollPosition])

   return (
      <div className="about" style={visibleBackground ? { opacity: 1 } : { opacity: 0 }}>
         <img src={dialogsamurai} alt="" className="dialog-samurai" style={visibleDialogsamurai ? { opacity: 1 } : { opacity: 0 }} />
         <img src={dialogwindow} alt="" className="dialog-window" style={visibleDialogwindow ? { opacity: 1 } : { opacity: 0 }} />
         <div className="about__info-container" >
            <p className="about__info i1">{textValue[0]}</p>
            <p className="about__info i2">{textValue[1]}</p>
            <p className="about__info i3">{textValue[2]}</p>
            <p className="about__info i4">{textValue[3]}</p>
         </div>
      </div>
   );
}

export default About;
