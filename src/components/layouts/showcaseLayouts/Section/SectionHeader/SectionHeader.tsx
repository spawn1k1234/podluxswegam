// import React from "react";
// import classes from "./SectionHeader.module.css";
// import ShowcaseFooter from "../../ShowcaseFooter/ShowcaseFooter"; // <-- Исправленный путь

// interface ISectionHeaderProps {
//   title: string;
//   description?: string;
// }

// const SectionHeader: React.FC<ISectionHeaderProps> = ({
//   title,
//   description,
// }) => {
//   return (
//     <>
//       <div className={classes["section-header"]}>
//         <h1 className={classes["section-header-title"]}>{title}</h1>
//         {description && (
//           <p className={classes["section-header-description"]}>{description}</p>
//         )}
//       </div>
//       <ShowcaseFooter />
//     </>
//   );
// };

// export default SectionHeader;
import React from "react";
import classes from "./SectionHeader.module.css";
import ShowcaseFooter from "../../ShowcaseFooter/ShowcaseFooter";

interface ISectionHeaderProps {
  title: string;
  description?: string;
}

const SectionHeader: React.FC<ISectionHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <>
      <div className={classes["section-header"]}>
        {/* Используем key для перерисовки компонента при изменении title */}
        <h1 key={title} className={classes["section-header-title"]}>
          {title.split("").map((char, index) => (
            <span
              key={index}
              className={classes["letter"]}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        {description && (
          <p
            key={description}
            className={classes["section-header-description"]}
          >
            {description}
          </p>
        )}
      </div>
      <ShowcaseFooter />
    </>
  );
};

export default SectionHeader;
