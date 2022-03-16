import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import Header from "./Components/Header";
import Player from "./Components/Player";
import sam from './imgs/sam.gif'
import ronin from './imgs/9.jpg'
import connectbtn from './imgs/connect-btn.svg'
import mint from './imgs/mint.png'
import About from "./Components/About";
import NftGallery from "./Components/NftGallery";
import Roadmap from "./Components/Roadmap";
import FAQ from "./Components/FAQ";
import Team from "./Components/Team";
import Footer from "./Components/Footer";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

function App() {
  //player status
  const [played, setPlayed] = useState(false)

  const [scrollY, setScrollY] = useState(0);

  function logit() {
    setScrollY(window.pageYOffset);
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logit);
    };
  });

  function offset(el) {
    let rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }


  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <>
      <Header scrollY={scrollY} />
      <main>
        <div className="main-wrapper mw">
          <Player played={played} setPlayed={setPlayed} />
          <div className="mw__wrapper" style={played ? { display: 'none' } : { display: 'block' }} >
            {/* Mint */}
            {/* <div>
              <div style={{ padding: 24 }}>
                <div>
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: 50,
                      fontWeight: "bold",
                      color: "black",
                    }}>
                    {data.totalSupply} / {CONFIG.MAX_SUPPLY}
                  </div>
                  <div style={{ textAlign: "center", color: "black", }}>
                    <a target={"_blank"} href={CONFIG.SCAN_LINK}>
                      {truncate(CONFIG.CONTRACT_ADDRESS, 30)}
                    </a>
                  </div>
                  <div />
                  {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
                    <>
                      <div style={{ textAlign: "center", color: "black" }}>
                        The sale has ended.
                      </div>
                      <div style={{ textAlign: "center", color: "black" }}>
                        You can still find {CONFIG.NFT_NAME} on
                      </div>
                      <div target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                        {CONFIG.MARKETPLACE}
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ textAlign: "center", color: "black" }} >
                        1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
                        {CONFIG.NETWORK.SYMBOL}.
                      </div>
                      <div />
                      <div style={{ textAlign: "center", color: "black" }}>
                        Excluding gas fees.
                      </div>
                      <div />
                      <a href="https://opensea.io/collection/mlbl-eyes">View at opensea</a>
                      {blockchain.account === "" ||
                        blockchain.smartContract === null ? (
                        <div ai={"center"} jc={"center"}>
                          <div style={{ textAlign: "center", color: "black" }}>
                            Connect to the {CONFIG.NETWORK.NAME} network
                          </div>
                          <div />
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(connect());
                              getData();
                            }}
                          >
                            CONNECT
                          </button>
                          {blockchain.errorMsg !== "" ? (
                            <>
                              <div />
                              <div
                                style={{
                                  textAlign: "center",
                                  color: "black",
                                }}
                              >
                                {blockchain.errorMsg}
                              </div>
                            </>
                          ) : null}
                        </div>
                      ) : (
                        <>
                          <div
                            style={{
                              textAlign: "center",
                              color: "black",
                            }}
                          >
                            {feedback}
                          </div>
                          <div />
                          <div ai={"center"} jc={"center"} fd={"row"}>
                            <div
                              style={{ lineHeight: 0.4 }}
                              disabled={claimingNft ? 1 : 0}
                              onClick={(e) => {
                                e.preventDefault();
                                decrementMintAmount();
                              }}
                            >
                              -
                            </div>
                            <div />
                            <div
                              style={{
                                textAlign: "center",
                                color: "black",
                              }}
                            >
                              {mintAmount}
                            </div>
                            <div />
                            <div
                              disabled={claimingNft ? 1 : 0}
                              onClick={(e) => {
                                e.preventDefault();
                                incrementMintAmount();
                              }}
                            >
                              +
                            </div>
                          </div>
                          <div />
                          <div ai={"center"} jc={"center"} fd={"row"}>
                            <div style={{ color: 'black' }}
                              disabled={claimingNft ? 1 : 0}
                              onClick={(e) => {
                                e.preventDefault();
                                claimNFTs();
                                getData();
                              }}
                            >
                              {claimingNft ? "BUSY" : "BUY"}
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                  <div />
                </div>
                <div />

              </div>
              <div />
              <div jc={"center"} ai={"center"} style={{ width: "70%" }}>
                <div
                  style={{
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  Please make sure you are connected to the right network (
                  {CONFIG.NETWORK.NAME} Mainnet) and the correct address. Please note:
                  Once you make the purchase, you cannot undo this action.
                </div>
                <div />
                <div
                  style={{
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  We have set the gas limit to {CONFIG.GAS_LIMIT} for the contract to
                  successfully mint your NFT. We recommend that you don't lower the
                  gas limit.
                </div>
              </div>
            </div> */}

            <div style={{
              position: "absolute",
              top: "15%",
              left: "30%",
              width: "20rem",
              height: "70%",
              background: "rgba(255, 255, 255,.4)",
              borderRadius: "15px"
            }}>
              <div><img style={{
                position: "absolute",
                top: "10%",
                left: "35%",
                width: "30%",
                height: "auto",
                opacity: 1
              }} src={ronin} /></div>
              <div className="connectBtn" style={{

              }}><img style={{
                position: "absolute",
                top: "70%",
                left: "30%",
                width: "40%",
                height: "auto",
                cursor: "pointer"
              }} src={connectbtn} /></div>
            </div> 
            
          </div>
          <div style={{ position: "absolute", bottom: "0.1%", right: "2%", color: "#f2f2ea", fontSize: "1.5em", fontFamily: 'PixBob'}}>launching soon. . .</div>
          <div className="mw__wrapper-play" style={played ? { display: 'block' } : { display: 'none' }}></div>
          <div className="mw__timer-container">
            <p id="timer"></p>
          </div>
        </div>
        <About scrollY={scrollY} offset={offset} />
        <NftGallery scrollY={scrollY} offset={offset} />
        <Roadmap scrollY={scrollY} offset={offset} />
        <FAQ scrollY={scrollY} offset={offset} />
        <Team scrollY={scrollY} offset={offset} />
      </main>
      <Footer />
    </>
  );
}

export default App;
