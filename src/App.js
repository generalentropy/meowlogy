import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useEffect, useState } from "react";

const favoris = [
  {
    id: crypto.randomUUID(),
    fact: "Cats can drink sea water in order to survive.",
  },

  {
    id: crypto.randomUUID(),
    fact: "Contrary to popular belief, the cat is a social animal. A pet cat will respond and answer to speech , and seems to enjoy human companionship.",
  },

  {
    id: crypto.randomUUID(),
    fact: "Mother cats teach their kittens to use the litter box.",
  },

  {
    id: crypto.randomUUID(),
    fact: "The catnip plant contains an oil called hepetalactone which does for cats what marijuana does to some people. Not all cats react to it those that do appear to enter a trancelike state. A positive reaction takes the form of the cat sniffing the catnip, then licking, biting, chewing it, rub & rolling on it repeatedly, purring, meowing & even leaping in the air.",
  },
];

function App() {
  const [data, setData] = useState(null);
  const [img, setImg] = useState("https://cataas.com/cat?type=square");
  const [lang, setLang] = useState("eng");
  const [fav, setFav] = useState(favoris);

  const handleSetFav = function () {
    const updateFavoris = fav;
    const exist = fav.some((objet) => objet.fact === data);

    if (!exist) {
      const newFav = [
        ...updateFavoris,
        { id: crypto.randomUUID(), fact: data },
      ];
      setFav(newFav);
      localStorage.setItem("favorites", JSON.stringify(newFav));
    }
  };

  const handleSetLang = function (e) {
    const clickedLang = e.target.dataset.locale;
    setLang(clickedLang);
    fetchData(clickedLang);
  };

  const getImg = async function () {
    const img = await fetch("https://cataas.com/cat?type=square&json=true");

    const res = await img.json();

    const currImg = `https://cataas.com/cat/${res._id}?type=square`;

    setImg(currImg);
  };

  const fetchData = async (lang) => {
    console.log(`langue input ${lang}`);
    try {
      const response = await fetch(
        `https://meowfacts.herokuapp.com/?lang=${lang}`
      );
      const result = await response.json();
      setData(result.data[0]);
      console.log(response);
      getImg();
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  useEffect(() => {
    const savedFavs = localStorage.getItem("favorites");
    if (savedFavs) {
      setFav(JSON.parse(savedFavs));
    }
    fetchData(lang);
  }, []);

  return (
    <>
      <Panel fav={fav} setFav={setFav} />
      <div className="app">
        <Header onSetLang={handleSetLang} currLang={lang} />
        <div className="container">
          <Fact img={img} data={data} fav={fav} />
          <div className="buttons-wrapper">
            <Button onClick={() => fetchData(lang)} color={"red"}>
              New fact
            </Button>
            <Button onClick={handleSetFav} color={"yellow"}>
              Save
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

function Fact({ img, data, fav }) {
  const isFaved = fav.some((objet) => objet.fact === data);

  console.log(isFaved);

  return (
    <div className="fact-wrapper">
      <div className="picture">
        <img src={img} alt="cat"></img>
      </div>
      <div className="fact">{data}</div>

      <div className={`fav-button ${isFaved ? "visible" : ""}`}>
        <img className="icon" src="star.svg" alt="icone star"></img>
      </div>
    </div>
  );
}

function Button({ onClick, children, color }) {
  return (
    <div onClick={() => onClick()} className={`button ${color}`}>
      {children}
    </div>
  );
}

function Header({ onSetLang, currLang }) {
  return (
    <div className="header">
      <div className="logo">
        <h1>😼meowlogy</h1>
      </div>

      <Lang onSetLang={onSetLang} currLang={currLang}></Lang>
    </div>
  );
}

function Lang({ onSetLang, currLang }) {
  return (
    <div className="lang">
      <Flag
        currLang={currLang}
        data={"fra"}
        lang={"fi fi-fr"}
        onSetLang={onSetLang}
      />{" "}
      /
      <Flag
        currLang={currLang}
        data={"eng"}
        lang={"fi fi-gb"}
        onSetLang={onSetLang}
      />{" "}
      /
      <Flag
        currLang={currLang}
        data={"esp"}
        lang={"fi fi-es"}
        onSetLang={onSetLang}
      />{" "}
      /
      <Flag
        currLang={currLang}
        data={"ger"}
        lang={"fi fi-de"}
        onSetLang={onSetLang}
      />{" "}
      /
      <Flag
        currLang={currLang}
        data={"por"}
        lang={"fi fi-pt"}
        onSetLang={onSetLang}
      />
    </div>
  );
}

function Flag({ onSetLang, lang, data, currLang }) {
  return (
    <span
      data-locale={data}
      onClick={(e) => onSetLang(e)}
      className={`${lang} ${currLang === data ? "fi-active" : ""}`}
    ></span>
  );
}

function Footer() {
  return (
    <div className="footer">
      meowlogy by{" "}
      <a href="https://visualartisan.fr/" alt="visualartisan.fr">
        visualArtisan
      </a>
    </div>
  );
}

function Panel({ fav, setFav }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="open-panel">
        <svg
          width="48"
          height="64"
          viewBox="0 0 768 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            d="M704 1024L384 800L64 1024q-27 0-45.5-19T0 960V128q0-53 37.5-90.5T128 0h512q53 0 90.5 37.5T768 128v832q0 26-18.5 45t-45.5 19zM461 332l-77-172l-77 172l-179 24l132 129l-34 187l158-92l158 92l-34-187l132-129z"
          />
        </svg>
      </div>

      <div className={`panel ${isOpen ? "panel-active" : ""}`}>
        <div onClick={() => setIsOpen(false)} className="close-panel">
          <svg
            width="512"
            height="512"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01zm181.008-630.016c-12.496-12.496-32.752-12.496-45.248 0L512 466.752l-135.76-135.76c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248L466.736 512l-135.76 135.76c-12.496 12.48-12.496 32.769 0 45.249c12.496 12.496 32.752 12.496 45.264 0L512 557.249l135.76 135.76c12.496 12.496 32.752 12.496 45.248 0c12.496-12.48 12.496-32.769 0-45.249L557.248 512l135.76-135.76c12.512-12.512 12.512-32.768 0-45.248z"
            />
          </svg>
        </div>
        {fav.map((f) => (
          <Favori
            fav={fav}
            setFav={setFav}
            content={f.fact}
            key={f.id}
            id={f.id}
          />
        ))}
      </div>
    </>
  );
}

function Favori({ content, id, setFav, fav }) {
  const handleDelete = function (e) {
    const updFav = fav.filter((el) => el.id !== e.target.dataset.id);
    setFav(updFav);
    localStorage.setItem("favorites", JSON.stringify(updFav));
  };

  return (
    <div className="fav-wrapper">
      <div className="favori" data-id={id}>
        <p>{content}</p>
      </div>
      <div data-id={id} onClick={(e) => handleDelete(e)} className="delete-fav">
        delete
      </div>
    </div>
  );
}

export default App;
