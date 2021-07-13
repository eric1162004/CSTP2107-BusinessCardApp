import { useState } from "react";
import { useRouter } from "next/router";

import { Icon } from "semantic-ui-react";
import styles from "../styles/sharedcard.module.scss";

const UserCard = ({ fab_clicked }) => {
  const router = useRouter();
  const [myCustomCard, setmyCustomCard] = useState(false);
  const [myCustomCardUrl, setmyCustomCardUrl] = useState("");
  const [shareCardNum, setshareCardNum] = useState(false);
  const [email, setEmail] = useState("");

  if (typeof window !== "undefined") {
    if (sessionStorage.getItem("email") === null) {
      router.push("/custom-card");
    }
    const sendObject = {
      get_personal_card: JSON.parse(sessionStorage.getItem("email")),
    };
    const sendObjectStr = JSON.stringify(sendObject);

    fetch("http://localhost:3000/api/usercards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: sendObjectStr,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.length === 0) {
          router.push("/custom-card");
        } else {
          setmyCustomCard(true);
          setmyCustomCardUrl(data[0].img);
          setEmail(data[0].email);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const SharedCard = () => {
    setshareCardNum(!shareCardNum);

    /* Copy email to clipboard */
    var copyText = document.getElementById("sharedEmail");
    if(copyText){
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
    }
  };

  const handleEdit = () => {
    router.push("/custom-card");
  };

  return (
    <>
      {/* Display loader or User-card  */}
      {(!myCustomCard && (
        <div className="d-flex justify-content-center">
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
      )) || (
        <>
          {/* This is the user card */}
          <img
            src={`${myCustomCardUrl}`}
            className={`${styles.imgShadow} figure-img img-fluid rounded`}
            alt="..."
          />

          <div className={`d-flex justify-content-around my-4`}>
            <button className={`${styles.button} col-3`} onClick={handleEdit}>
              <Icon name="edit" />
              Edit
            </button>
          </div>

          {/* Display share email message */}
          {shareCardNum && (
            <div className="border border-success rounded p-3 bd-highlight text-center">
              <p className="m-0">
                <b>Copied email to clipboard:</b>
              </p>
              <p>
                <input type="text" value={email} id="sharedEmail" style={{border:"none", width:"200px"}}/>
              </p>
            </div>
          )}

          {/* share and edit container */}
          <div className={`d-flex justify-content-around my-4`}>
            <button className={`${styles.button} col-3`} onClick={SharedCard}>
              <Icon name="share alternate" />
              Share
            </button>
            <button className={`${styles.button} col-3`} onClick={fab_clicked}>
              <Icon name="add" />
              Contact
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default UserCard;
