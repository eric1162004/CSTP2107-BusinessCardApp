import { Icon } from "semantic-ui-react";
import styles from "@/styles/sharedcard.module.scss";

const SharedCard = (props) => {
  const deleteFromCollection = () => {
    // console.log(props.id)
    const sendObject = {
      useremail: props.useremail,
      deletecard: props.email,
    };
    const sendObjectStr = JSON.stringify(sendObject);
    fetch("https://morning-sierra-77737.herokuapp.com/api/usercards", {
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
        // console.log(data)
      })
      .catch((err) => {
        console.error(err);
      });
    window.location.reload();
  };
  return (
    <>
      <div className={`${styles.imgWrap}`}>
        <img className={`img-fluid`} src={props.feedimg} alt="..." />
        <Icon
          className={styles.close}
          onClick={deleteFromCollection}
          name="trash alternate"
        />
      </div>
    </>
  );
};

export default SharedCard;
