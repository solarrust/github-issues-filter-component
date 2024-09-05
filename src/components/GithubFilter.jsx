import { FaAngleDown } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  useDismiss,
  useInteractions } from "@floating-ui/react";

const GithubFilter = ({name, header, placeholder, items, renderItem, filterFn}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-center",
    middleware: [offset({ mainAxis: 5, crossAxis: 10 }), flip(), shift()],
  });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const [filterQuery, setFilterQuery] = useState("");
  const filteredItems = items.filter((item) => filterFn(item, filterQuery));

  return <div>
    <button
      className="flex items-center gap-1"
      onClick={() => setIsOpen(!isOpen)}
      ref={refs.setReference}
      {...getReferenceProps()}
    >
      {name}
      <span>
        <FaAngleDown />
      </span>
    </button>

    {isOpen ?
      (<div
        ref={refs.setFloating}
        style={floatingStyles}
        {...getReferenceProps()}
        className="bg-white border border-gray-200 shadow-md text-xs w-64 flex flex-col rounded-lg"
      >
        <div className="m-2 pl-1 font-semibold flex items-center">
          {header}
          <button onClick={() => setIsOpen(false)} className="ml-auto px-1">
            <span className="sr-only">Close button</span>
            <MdClose className="w-4 h-4" />
          </button>
        </div>
        <hr />
        <form className="m-2">
            <label>
              <span className="sr-only">{placeholder}</span>
            </label>
            <input
              type="text"
              placeholder={placeholder}
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
        </form>
        <hr />
        <ul className="overflow-auto h-64 flex flex-col">
          {filteredItems.map((item) => (
            <li
              key={item.id}
              className="border-b border-gray-200 font-semibold p-2 pl-6 hover:bg-gray-100"
            >
              <a
                href="#"
              >
                {renderItem(item)}
              </a>
            </li>
          ))}
        </ul>
      </div>)
      :
      null
    }
  </div>;
};

export default GithubFilter;
