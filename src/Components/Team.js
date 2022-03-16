import { useEffect, useState } from 'react';
import layer1 from '../imgs/layer1.png'
import layer2 from '../imgs/layer2.png'
import layer3 from '../imgs/layer3.png'
import layer4 from '../imgs/layer4.png'
import layer5 from '../imgs/layer5.png'
import layer6 from '../imgs/layer6.png'

function Team({ scrollY, offset }) {

  const text = 'TEAM'
  const [textValue, setTextValue] = useState('');
  const [scrollPosition, setScrollPosition] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (scrollY > offset(document.querySelector('.team')).top - (window.innerHeight - offset(document.querySelector('.team')).top / 10)) {
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
      let itemsArray = [...document.querySelectorAll('.team__img'), ...document.querySelectorAll('.team_item')]
      itemsArray.forEach((i) => {
        setTimeout(() => {
          i.style.opacity = 1;
        }, int);
        int += 300;
      })
    }
  }, [visible])

  return (
    <div className="team" id="team">
      <h2 className="team__title">{textValue}</h2>
      <div className="team__imgs">
        <div className="team__imgs__img">
          <img src={layer1} alt="" className="team__img" style={{ opacity: "0" }} />
          <div className='team_item' style={{ opacity: "0" }}>
            <p className="team__nickname">Sunjiroo</p>
            <p className="team__role">Founder/<br />Pixel artist</p></div>
        </div>
        <div className="team__imgs__img">
          <img src={layer2} alt="" className="team__img" style={{ opacity: "0" }} />
          <div className='team_item' style={{ opacity: "0" }}>
            <p className="team__nickname">0MFG</p>
            <p className="team__role">Developer</p>
          </div>
        </div>
        <div className="team__imgs__img">
          <img src={layer3} alt="" className="team__img" style={{ opacity: "0" }} />
          <div className='team_item' style={{ opacity: "0" }}>
            <p className="team__nickname">SNSB</p>
            <p className="team__role">Developer</p>
          </div>
        </div>
        <div className="team__imgs__img">
          <img src={layer4} alt="" className="team__img" style={{ opacity: "0" }} />
          <div className='team_item' style={{ opacity: "0" }}>
            <p className="team__nickname">Yuki</p>
            <p className="team__role">Community <br />Manager</p>
          </div>
        </div>
        <div className="team__imgs__img">
          <img src={layer5} alt="" className="team__img" style={{ opacity: "0" }} />
          <div className='team_item' style={{ opacity: "0" }}>
            <p className="team__nickname">Verhzhanna</p>
            <p className="team__role">Community <br />Manager</p>
          </div>
        </div>
        <div className="team__imgs__img">
          <img src={layer6} alt="" className="team__img" style={{ opacity: "0" }} />
          <div className='team_item' style={{ opacity: "0" }}>
            <p className="team__nickname">NKOHA</p>
            <p className="team__role">Artist</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
