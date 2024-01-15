import { FaCaretDown, FaCaretUp } from "react-icons/fa";

function SortButton({ isAscending, sort }) {
    return (
        <button className="sort-button" onClick={() => sort()}>
        {isAscending ? <FaCaretUp color="black" /> : <FaCaretDown color="black" />}
        </button>
    );
}

export default SortButton;