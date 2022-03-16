import { useState, useEffect } from "react";

function Roadmap({ scrollY, offset }) {

  const text = 'Roadmap'
  const [textValue, setTextValue] = useState('');
  const [scrollPosition, setScrollPosition] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (scrollY > offset(document.querySelector('.roadmap')).top - (window.innerHeight - offset(document.querySelector('.roadmap')).top / 6)) {
      setScrollPosition(true)
    }
  }, [scrollY])

  useEffect(() => {
    if (scrollPosition) {
      if (textValue.length < text.length) {
        setTimeout(() => {
          setTextValue(textValue + text[textValue.length])
        }, 300)
      }
      else if (textValue.length === text.length && visible !== true) {
        setTimeout(() => {
          setVisible(true)
        }, 1000)
      }
    }
  }, [scrollPosition, textValue])

  useEffect(() => {
    if (visible) {
      let int = 300
      document.querySelectorAll('.steps__step').forEach((i) => {
        setTimeout(() => {
          i.style.opacity = 1;
        }, int);
        int += 300;
      })
    }
  }, [visible])

  return (
    <div className="roadmap" id="roadmap">
      <div className="roadmap__container">
        <h2 className="roadmap__title">{textValue}</h2>
        <div className="roadmap__steps steps">
          <div className="steps__step" style={{ opacity: 0 }}>
            <p className="step1__percent">25% SOLD</p>
            <p className="steps__text">NFT giveaway</p>
          </div>
          <div className="steps__step" style={{ opacity: 0 }}>
            <p className="step2__percent">50% SOLD</p>
            <p className="steps__text">creating token for our ecosystem</p>
          </div>
          <div className="steps__step" style={{ opacity: 0 }}>
            <p className="step4__percent">100% SOLD</p>
            <p className="steps__text">metaverse avatar marketplace</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
