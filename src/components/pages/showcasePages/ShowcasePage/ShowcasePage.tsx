// import { Outlet } from "react-router-dom";
// import ShowcaseFooter from "../../../layouts/showcaseLayouts/ShowcaseFooter/ShowcaseFooter";
// import ShowcaseHeader from "../../../layouts/showcaseLayouts/ShowcaseHeader/ShowcaseHeader";
// import ShowcaseMain from "../../../layouts/showcaseLayouts/ShowcaseMain/ShowcaseMain";
// import classes from "./ShowcasePage.module.css";

// const ShowcasePage: React.FC = () => {
//   return (
//     <div className={classes.showcase}>
//       <ShowcaseHeader />
//       <ShowcaseMain>
//         <>
//           <Outlet />
//         </>
//       </ShowcaseMain>
//       <div>
//         <ShowcaseFooter />
//       </div>
//     </div>
//   );
// };

// export default ShowcasePage;
import { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import ShowcaseFooter from "../../../layouts/showcaseLayouts/ShowcaseFooter/ShowcaseFooter";
import ShowcaseHeader from "../../../layouts/showcaseLayouts/ShowcaseHeader/ShowcaseHeader";
import ShowcaseMain from "../../../layouts/showcaseLayouts/ShowcaseMain/ShowcaseMain";
import classes from "./ShowcasePage.module.css";

const ShowcasePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Проверяем, показывалось ли видео ранее
    const videoShown = localStorage.getItem("videoShown");

    // Если видео уже было показано, не показываем его снова
    if (videoShown) {
      setIsLoading(false);
      return;
    }

    // Если видео еще не было показано, ставим флаг в localStorage
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.play();
      const onEnd = () => {
        setIsLoading(false);
        localStorage.setItem("videoShown", "true"); // Сохраняем флаг, что видео было показано
      };
      videoEl.addEventListener("ended", onEnd);
      return () => videoEl.removeEventListener("ended", onEnd);
    } else {
      // fallback in case video can't be loaded
      const timeout = setTimeout(() => setIsLoading(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, []);

  if (isLoading) {
    return (
      <div className={classes.videoWrapper}>
        <video
          ref={videoRef}
          className={classes.video}
          src="/video/podluxsweglog.mp4"
          autoPlay
          muted
          playsInline
        />
      </div>
    );
  }

  return (
    <div className={classes.showcase}>
      <ShowcaseHeader />
      <ShowcaseMain>
        <Outlet />
      </ShowcaseMain>
      <div>
        <ShowcaseFooter />
      </div>
    </div>
  );
};

export default ShowcasePage;
