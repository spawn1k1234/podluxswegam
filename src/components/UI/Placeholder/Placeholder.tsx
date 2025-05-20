// import classes from './Placeholder.module.css';

// interface IPlaceholderProps {
//   text: string;
//   size?: string;
// }

// const Placeholder: React.FC<IPlaceholderProps> = ({ text, size = '36px' }) => {
//   return (
//     <h3 className={classes.heading} style={{ fontSize: size }}>
//       {text}
//     </h3>
//   );
// };

// export default Placeholder;
import classes from "./Placeholder.module.css";
import ShowcaseFooter from "../../layouts/showcaseLayouts/ShowcaseFooter/ShowcaseFooter";

interface IPlaceholderProps {
  text: string;
  size?: string;
}

const Placeholder: React.FC<IPlaceholderProps> = ({ text, size = "36px" }) => {
  return (
    <div>
      <h3 className={classes.heading} style={{ fontSize: size }}>
        {text}
      </h3>
      <ShowcaseFooter />
    </div>
  );
};

export default Placeholder;
