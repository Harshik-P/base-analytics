import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import ArrowDown from "../../../public/assets/ArrowDown.svg";
import { TagsList } from "..";

interface DropdownProps {
  tags: String[];
  rowIndex: number;
  selectedTags: TagsList;
  setSelectedTags: React.Dispatch<React.SetStateAction<TagsList>>;
}

export default function Dropdown({
  tags,
  rowIndex,
  selectedTags,
  setSelectedTags,
}: DropdownProps) {
  const [open, setOpen] = useState<Boolean>(false);

  const menuRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectTag = (tag: String) => {
    const tempSelectedTags = { ...selectedTags };
    const currentTags = tempSelectedTags[rowIndex];
    if (currentTags && currentTags.size) {
      currentTags.add(tag);
      tempSelectedTags[rowIndex] = currentTags;
    } else {
      const newTag: Set<String> = new Set();
      newTag.add(tag);
      tempSelectedTags[rowIndex] = newTag;
    }
    setSelectedTags(tempSelectedTags);
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        ref={menuRef}
        type="button"
        className="inline-flex w-[120px] gap-2 items-center justify-center px-4 pt-0.5 pb-1 text-sm border border-[#F2F2F2] rounded-lg focus:outline-none bg-white"
        onClick={toggleDropdown}
      >
        Select Tags
        <Image src={ArrowDown} alt="ArrowDown" className="pt-0.5" />
      </button>

      {open ? (
        <div
          ref={dropdownRef}
          className="absolute z-10 min-w-[120px] max-h-[170px] overflow-y-scroll scrollbar-hide px-1.5 py-1.5 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg"
        >
          {tags.map((tag, index) => (
            <div
              key={index}
              className="block cursor-pointer px-2.5 py-2 text-sm hover:bg-[#F5F5F5] rounded-lg"
              onClick={() => handleSelectTag(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
