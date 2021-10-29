import DropDown from "./OptionTypes/Dropdown";
import MCQ from "./OptionTypes/MCQ";
import Rating from "./OptionTypes/Rating";
import Slider from "./OptionTypes/Slider";
const Options = ({ type, next, setSelected, selected, Options }) => {
  return (
    <>
      {type === "0" && (
        <div>
          <MCQ select={setSelected} selected={selected} onClick={next} Options={Options} />
        </div>
      )}
      {type === "1" && (
        <div>
          <DropDown select={setSelected} selected={selected} onClick={next} Options={Options} />
        </div>
      )}
      {type === "2" && (
        <div>
          <Slider select={setSelected} selected={selected} onClick={next} />
        </div>
      )}
      {type === "3" && (
        <div>
          <Rating select={setSelected} selected={selected} onClick={next} />
        </div>
      )}
    </>
  );
};
export default Options;
