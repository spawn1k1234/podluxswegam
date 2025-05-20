import React, { useEffect, useState } from "react";
import classes from "./ProfilePage.module.css";
import ShowcaseFooter from "../../../layouts/showcaseLayouts/ShowcaseFooter/ShowcaseFooter";

const PrivatePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg && tg.initDataUnsafe?.user) {
      setUser(tg.initDataUnsafe.user);
    }
  }, []);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Rick Owens Vibes</h1>

      {user ? (
        <div className={classes.profileCard}>
          <img
            src={`https://t.me/i/userpic/320/${user.username}.jpg`}
            alt="avatar"
            onError={(e) => (e.target.style.display = "none")}
            className={classes.avatar}
          />

          <div className={classes.info}>
            <p className={classes.nickname}>@{user.username || "noname"}</p>
            <p className={classes.id}>ID: {user.id}</p>
          </div>
        </div>
      ) : (
        <p className={classes.loading}>Загрузка профиля...</p>
      )}

      <ShowcaseFooter />
    </div>
  );
};

export default PrivatePage;
