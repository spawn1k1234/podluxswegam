// import React, { useEffect, useState } from "react";
// import classes from "./ProfilePage.module.css";
// import ShowcaseFooter from "../../../layouts/showcaseLayouts/ShowcaseFooter/ShowcaseFooter";

// type User = {
//   id: number;
//   username?: string;
// };

// const PrivatePage = () => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const tg = window.Telegram?.WebApp;
//     if (tg && tg.initDataUnsafe?.user) {
//       setUser(tg.initDataUnsafe.user);
//     }
//   }, []);

//   return (
//     <div className={classes.container}>
//       <h1 className={classes.title}>Rick Owens Vibes</h1>

//       {user ? (
//         <div className={classes.profileCard}>
//           <img
//             src={`https://t.me/i/userpic/320/${user.username}.jpg`}
//             alt="avatar"
//             onError={(e) => (e.currentTarget.style.display = "none")}
//             className={classes.avatar}
//           />

//           <div className={classes.info}>
//             <p className={classes.nickname}>@{user.username || "noname"}</p>
//             <p className={classes.id}>ID: {user.id}</p>
//           </div>
//         </div>
//       ) : (
//         <p className={classes.loading}>Загрузка профиля...</p>
//       )}

//       <ShowcaseFooter />
//     </div>
//   );
// };

// export default PrivatePage;
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./ProfilePage.module.css";
import ShowcaseFooter from "../../../layouts/showcaseLayouts/ShowcaseFooter/ShowcaseFooter";

type User = {
  id: number;
  username?: string;
  first_name?: string;
};

const PrivatePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isCollabOpen, setIsCollabOpen] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg && tg.initDataUnsafe?.user) {
      setUser(tg.initDataUnsafe.user);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const collabVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      marginBottom: 0,
    },
    visible: {
      height: "auto",
      opacity: 1,
      marginBottom: "1rem",
      transition: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      marginBottom: 0,
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
  };

  const arrowVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  };

  return (
    <motion.div
      className={classes.container}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 className={classes.title} variants={itemVariants}>
        {user?.first_name ? `${user.first_name}` : ""}
      </motion.h1>

      {user ? (
        <motion.div className={classes.profileCard} variants={itemVariants}>
          <motion.div
            className={classes.avatarContainer}
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={`https://t.me/i/userpic/320/${user.username}.jpg`}
              alt="avatar"
              onError={(e) => (e.currentTarget.style.display = "none")}
              className={classes.avatar}
            />
            <div className={classes.avatarOverlay} />
          </motion.div>

          <motion.div className={classes.info}>
            <motion.p
              className={classes.nickname}
              whileHover={{ letterSpacing: "3px" }}
            >
              @{user.username || "ANONYMOUS"}
            </motion.p>
            <p className={classes.id}>ID: {user.id}</p>
          </motion.div>

          <motion.div className={classes.actions}>
            <motion.button
              className={classes.collabButton}
              onClick={() => setIsCollabOpen(!isCollabOpen)}
              whileHover={{
                scale: 1.02,
                backgroundColor: "#111",
              }}
              whileTap={{ scale: 0.98 }}
            >
              COLLABORATION
              <motion.span
                className={classes.arrow}
                variants={arrowVariants}
                animate={isCollabOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              >
                ▲
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {isCollabOpen && (
                <motion.div
                  className={classes.collabContent}
                  variants={collabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <p className={classes.collabText}>
                    FOR BUSINESS COLLABORATION AND WHOLESALE INQUIRIES, PLEASE
                    CONTACT OUR MANAGER @podluxswegam
                  </p>
                  <p className={classes.collabText}>
                    WE OFFER DROPSHIPPING AND WHOLESALE OPPORTUNITIES FOR SELECT
                    STORES.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.a
              href="https://t.me/podluxswegam"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.socialButton}
              whileHover={{
                scale: 1.02,
                backgroundColor: "#111",
              }}
              whileTap={{ scale: 0.98 }}
            >
              TELEGRAM CHANNEL
            </motion.a>

            <motion.a
              href="https://instagram.com/podluxswegam"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.socialButton}
              whileHover={{
                scale: 1.02,
                backgroundColor: "#111",
              }}
              whileTap={{ scale: 0.98 }}
            >
              INSTAGRAM
            </motion.a>

            <motion.a
              href="https://tiktok.com/@podluxswegam"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.socialButton}
              whileHover={{
                scale: 1.02,
                backgroundColor: "#111",
              }}
              whileTap={{ scale: 0.98 }}
            >
              TIKTOK
            </motion.a>
          </motion.div>

          <motion.div className={classes.footer} variants={itemVariants}>
            <p>PODLUXSWEGAM</p>
            <p>© {new Date().getFullYear()} ALL RIGHTS RESERVED</p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.p
          className={classes.loading}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          LOADING PROFILE...
        </motion.p>
      )}
      <ShowcaseFooter />
    </motion.div>
  );
};

export default PrivatePage;
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import classes from "./ProfilePage.module.css";
// import ShowcaseFooter from "../../../layouts/showcaseLayouts/ShowcaseFooter/ShowcaseFooter";

// type User = {
//   id: number;
//   username?: string;
//   first_name?: string;
// };

// const PrivatePage = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const tg = window.Telegram?.WebApp;
//     if (tg && tg.initDataUnsafe?.user) {
//       setUser(tg.initDataUnsafe.user);
//     }
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <motion.div
//       className={classes.container}
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       <motion.h1 className={classes.title} variants={itemVariants}>
//         {user?.first_name ? `${user.first_name}'S SPACE` : "PRIVATE SPACE"}
//       </motion.h1>

//       {user ? (
//         <motion.div className={classes.profileCard} variants={itemVariants}>
//           <motion.div
//             className={classes.avatarContainer}
//             whileHover={{ scale: 1.03 }}
//           >
//             <img
//               src={`https://t.me/i/userpic/320/${user.username}.jpg`}
//               alt="avatar"
//               onError={(e) => (e.currentTarget.style.display = "none")}
//               className={classes.avatar}
//             />
//             <div className={classes.avatarOverlay} />
//           </motion.div>

//           <motion.div className={classes.info}>
//             <motion.p
//               className={classes.nickname}
//               whileHover={{ letterSpacing: "3px" }}
//             >
//               @{user.username || "ANONYMOUS"}
//             </motion.p>
//             <p className={classes.id}>ID: {user.id}</p>
//           </motion.div>

//           <motion.div className={classes.actions}>
//             <motion.a
//               href="https://t.me/podluxswegam"
//               target="_blank"
//               rel="noopener noreferrer"
//               className={classes.socialButton}
//               whileHover={{
//                 scale: 1.05,
//                 backgroundColor: "#000",
//                 borderColor: "#fff",
//               }}
//               whileTap={{ scale: 0.95 }}
//             >
//               TELEGRAM CHANNEL
//             </motion.a>

//             <motion.a
//               href="https://instagram.com/podluxswegam"
//               target="_blank"
//               rel="noopener noreferrer"
//               className={classes.socialButton}
//               whileHover={{
//                 scale: 1.05,
//                 backgroundColor: "#000",
//                 borderColor: "#fff",
//               }}
//               whileTap={{ scale: 0.95 }}
//             >
//               INSTAGRAM
//             </motion.a>

//             <motion.button
//               className={classes.contactButton}
//               whileHover={{
//                 scale: 1.05,
//                 backgroundColor: "#fff",
//                 color: "#000",
//               }}
//               whileTap={{ scale: 0.95 }}
//             >
//               CONTACT MANAGER
//             </motion.button>
//           </motion.div>

//           <motion.button
//             className={classes.menuButton}
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             whileHover={{ backgroundColor: "#111" }}
//           >
//             {isMenuOpen ? "▲ CLOSE" : "▼ MENU"}
//           </motion.button>

//           <AnimatePresence>
//             {isMenuOpen && (
//               <motion.div
//                 className={classes.menu}
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <a href="#" className={classes.menuItem}>
//                   ORDER HISTORY
//                 </a>
//                 <a href="#" className={classes.menuItem}>
//                   FAVORITES
//                 </a>
//                 <a href="#" className={classes.menuItem}>
//                   SETTINGS
//                 </a>
//                 <a href="#" className={classes.menuItem}>
//                   LOGOUT
//                 </a>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       ) : (
//         <motion.p
//           className={classes.loading}
//           animate={{ opacity: [0.5, 1, 0.5] }}
//           transition={{ repeat: Infinity, duration: 1.5 }}
//         >
//           LOADING PROFILE...
//         </motion.p>
//       )}

//       <motion.div className={classes.footer} variants={itemVariants}>
//         <p>PODLUXSWEGAM</p>
//         <p>© {new Date().getFullYear()} ALL RIGHTS RESERVED</p>
//       </motion.div>
//       <ShowcaseFooter />
//     </motion.div>
//   );
// };

// export default PrivatePage;
