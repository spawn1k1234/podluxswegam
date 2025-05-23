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
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.play();
      const onEnd = () => setIsLoading(false);
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
          src="/video/podluxsweglog.mp4" // путь к видео в папке public
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
