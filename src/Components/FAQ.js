import { useState, useEffect } from "react";

function FAQ({ scrollY, offset }) {

  const text = 'FAQ'
  const [textValue, setTextValue] = useState('');
  const [scrollPosition, setScrollPosition] = useState(false)
  const [visible, setVisible] = useState(false)
  const [FAQAnswers, setFAQAnswers] = useState({ supply: false, price: false, mint: false, rarity: false })

  useEffect(() => {
    if (scrollY > offset(document.querySelector('.faq')).top - (window.innerHeight - offset(document.querySelector('.faq')).top / 6)) {
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
      document.querySelectorAll('.faq__items__item').forEach((i) => {
        setTimeout(() => {
          i.style.opacity = 1;
        }, int);
        int += 300;
      })
    }
  }, [visible])

  return (
    <div className="faq" id="faq">
      <h2 className="faq__title">{textValue}</h2>
      <div className="faq__items">
        <div className="faq__items__item item" style={{ opacity: 0 }} onClick={() => setFAQAnswers({ ...FAQAnswers, supply: !FAQAnswers.supply })}>
          <h3 className="item__title">What is the total supply?</h3>
        <p className="item__text" style={FAQAnswers.supply ? { opacity: 1 }: { opacity: 0 }}>A total of 10.000 unique ronins but we will be holding back 200 nfts for giveaways
          and 6 for our team.</p>
      </div>
      <div className="faq__items__item item" style={{ opacity: 0 }} onClick={() => setFAQAnswers({ ...FAQAnswers, price: !FAQAnswers.price })} >
        <h3 className="item__title">Mint price? </h3>
        <p className="item__text" style={FAQAnswers.price ? { opacity: 1 }: { opacity: 0 }}>0.07eth</p>
      </div>
      <div className="faq__items__item item" style={{ opacity: 0 }} onClick={() => setFAQAnswers({ ...FAQAnswers, mint: !FAQAnswers.mint })}>
        <h3 className="item__title">How many nfts can I mint per wallet?</h3>
        <p className="item__text" style={FAQAnswers.mint ? { opacity: 1 }: { opacity: 0 }}>You can mint a maximum of 5 nfts per wallet.</p>
      </div>
      <div className="faq__items__item item" style={{ opacity: 0 }} onClick={() => setFAQAnswers({ ...FAQAnswers, rarity: !FAQAnswers.rarity })}>
        <h3 className="item__title">Rarity?</h3>
        <p className="item__text" style={FAQAnswers.rarity ?  { opacity: 1 }: { opacity: 0 }}>Ronins consists of 5 properties of varying rarities, from common to ultra rare.</p>
      </div>
    </div>
    </div >
  );
}

export default FAQ;
