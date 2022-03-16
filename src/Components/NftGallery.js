import { useState, useEffect } from 'react';
import gif_1 from '../imgs/1.gif'
import gif_2 from '../imgs/2.gif'
import gif_3 from '../imgs/3.gif'
import gif_4 from '../imgs/4.gif'
import gif_5 from '../imgs/5.gif'
import gif_6 from '../imgs/6.gif'
import gif_7 from '../imgs/7.gif'
import gif_8 from '../imgs/8.gif'

function NftGallery({ scrollY, offset }) {

  const text = 'About Ichiman Ronins'
  const [textValue, setTextValue] = useState('');
  const [visible, setVisible] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(false)


  useEffect(() => {
    if (scrollY > offset(document.querySelector('.nft-gallery')).top - (window.innerHeight - offset(document.querySelector('.nft-gallery')).top / 4)) {
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
  }, [textValue, scrollPosition])


  useEffect(() => {
    if (visible) {
      let int = 300
      document.querySelectorAll('.nft').forEach((i) => {
        setTimeout(() => {
          i.style.opacity = 1;
        }, int);
        int += 300;
      })
    }
  }, [visible])

  return (
    <div className="nft-gallery" id="about">
      <div className="nft-gallery__info">
        <h2 className="nft-gallery__title">{textValue}</h2>
        <p className="nft-gallery__text" style={visible ? { opacity: 1 } : { opacity: 0 }}>
          Buying one of the Ronins, you're not just buying
          a picture. You can use it as an avatar for
          identification. Everyone will know that you are one
          of the legion. This will be especially useful when we
          launch our metaverse avatar marketplace.
          <br /><br />Everyone who owns ronin will be exempt from the
          commission. For the rest it will be 5-10%.
        </p>
      </div>
      <div className="nft-gallery__imgs">
        <div>
          <img src={gif_1} alt="" className="nft" id="nft1" style={{ opacity: 0 }} />
          <img src={gif_2} alt="" className="nft" id="nft2" style={{ opacity: 0 }} />
          <img src={gif_3} alt="" className="nft" id="nft3" style={{ opacity: 0 }} />
          <img src={gif_4} alt="" className="nft" id="nft4" style={{ opacity: 0 }} />
          <img src={gif_5} alt="" className="nft" id="nft5" style={{ opacity: 0 }} />
          <img src={gif_6} alt="" className="nft" id="nft6" style={{ opacity: 0 }} />
          <img src={gif_7} alt="" className="nft" id="nft7" style={{ opacity: 0 }} />
          <img src={gif_8} alt="" className="nft" id="nft8" style={{ opacity: 0 }} />
        </div>
      </div>
    </div>
  );
}

export default NftGallery;
