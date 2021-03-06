import { useState, useEffect } from "react";
import { Modal, makeStyles } from "@material-ui/core";
import { Icon } from "semantic-ui-react";

import UserCard from "./../../components/UserCard";
import SharedCard from "./../../components/SharedCard";
import SearchCard from "./../../components/SearchCard";
import AddCard from "./../../components/AddCard";
import styles from "@/styles/sharedcard.module.scss";

const MainPage = () => {
  const [filteredArray, setfilteredArray] = useState([]);

  const [array_of_cards, set_array_of_cards] = useState([]);
  const [arrayReceived, setarrayReceived] = useState(false);

  const [portfolio, setportfolio] = useState([]);
  const [portfolioset, setPortfolioset] = useState(false);

  const [searchClicked, setsearchClicked] = useState(false);
  const [addclicked, setaddclicked] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const modalClasses = useStyles();

  const [displayMyCard, setDisplayMyCard] = useState("none");

  useEffect(() => {
    if (!arrayReceived) {
      if (typeof window !== "undefined") {
        const sendObject = {
          get_cards_from_users_array: JSON.parse(
            sessionStorage.getItem("email")
          ),
        };
        const sendObjectStr = JSON.stringify(sendObject);
        fetch("http://localhost:3000/api/usercards", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: sendObjectStr,
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data[0].other_cards)
            set_array_of_cards(data[0].other_cards);
            setarrayReceived(true);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }, []);

  useEffect(() => {
    if (arrayReceived && !portfolioset) {
      if (typeof window !== "undefined") {
        array_of_cards.forEach((element) => {
          const sendObject = {
            render_cards: element,
          };
          const sendObjectStr = JSON.stringify(sendObject);
          fetch("http://localhost:3000/api/usercards", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: sendObjectStr,
          })
            .then((res) => res.json())
            .then((data) => {
              setPortfolioset(true);
              setportfolio((prevelem) => {
                return [...prevelem, data[0]];
              });
            })
            .catch((err) => {
              console.error(err);
            });
        });
      }
    }
  }, [arrayReceived]);

  const newCardHandler = (data) => {
    setsearchClicked(true);
    setfilteredArray(data);
  };

  const Handle_fab_clicked = (data) => {
    setOpenModal(true);
    setaddclicked(data);
  };

  const showAddBlockHandler = () => {
    setaddclicked(false);
    window.location.reload();
  };

  const handleMyCardDisplay = () => {
    displayMyCard == "none" ? setDisplayMyCard("") : setDisplayMyCard("none");
  };

  return (
    <>
      {/* This is the hidden user card section*/}
      <div
        className={`${styles.userCardDiv} col-12 col-md-5 p-4 pb-0 text-center justify-content-center`}
        style={{ display: `${displayMyCard}` }}
      >
        <div className={`${styles.userCardInsideDiv}`}>
          <div
            className={`${styles.userCardCloseButton}`}
            onClick={handleMyCardDisplay}
          >
            <div>
              <Icon name="close" />
              close
            </div>
          </div>

          <UserCard fab_clicked={Handle_fab_clicked} />

          {/* This is the hidden add contact modal */}
          {addclicked && (
            <Modal
              open={openModal}
              onClose={() => {
                setOpenModal(false);
              }}
              className={modalClasses.modal}
            >
              {
                <div className={modalClasses.paper}>
                  <AddCard hideAddBlock={showAddBlockHandler} />
                </div>
              }
            </Modal>
          )}
        </div>
      </div>

      <div className={`${styles.container} justify-content-center`}>
        {/* This is other people's cards section */}

        {/* My Card & Contact Row*/}
        <div className={`d-flex justify-content-center my-2`}>
          <button
            className={`${styles.button} mx-4`}
            onClick={handleMyCardDisplay}
          >
            <Icon name="user" />
            My Card
          </button>

          <button
            className={`${styles.button} mx-4`}
            onClick={Handle_fab_clicked}
          >
            <Icon name="add" />
            Contact
          </button>
        </div>

        <SearchCard addnewcard={newCardHandler} portfolio={portfolio} />

        {/* This is the card deck */}
        <div className={`${styles.imgDiv}`}>
          {portfolio === [] && <div>empty</div>}

          {searchClicked &&
            filteredArray !== [] &&
            filteredArray.map((card) => (
              <SharedCard
                key={card._id}
                feedimg={card.img}
                id={card._id}
                useremail={JSON.parse(sessionStorage.getItem("email"))}
                email={card.email}
              />
            ))}

          {!searchClicked &&
            portfolio !== [] &&
            portfolio.map((card) => (
              <SharedCard
                key={card._id}
                feedimg={card.img}
                id={card._id}
                useremail={JSON.parse(sessionStorage.getItem("email"))}
                email={card.email}
              />
            ))}
        </div>

        {/* Loaders */}
        {!arrayReceived && (
          <div className="text-center">
            <div className="spinner-grow text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary mx-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: "1%",
    padding: theme.spacing(5, 5),
  },
}));

export default MainPage;
