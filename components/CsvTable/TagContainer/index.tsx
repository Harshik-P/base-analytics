import Image from "next/image";

import { TagsList } from "../index";
import CloseIcon from "../../../public/assets/Close.svg";

interface TagContainerProps {
  rowIndex: number;
  selectedTags: TagsList;
  setSelectedTags: React.Dispatch<React.SetStateAction<TagsList>>;
}

export default function TagContainer({
  rowIndex,
  selectedTags,
  setSelectedTags,
}: TagContainerProps) {
  const handleRemoveTag = (tagIndex: number) => {
    const tempSelectedTags = { ...selectedTags };
    const prevTags = tempSelectedTags[rowIndex];
    const newTag = Array.from(selectedTags[rowIndex]);
    prevTags.delete(newTag[tagIndex]);
    tempSelectedTags[rowIndex] = prevTags;
    setSelectedTags(tempSelectedTags);
  };

  return (
    <div className="flex gap-2">
      {selectedTags[rowIndex]
        ? Array.from(selectedTags[rowIndex]).map((tag, tagIndex) => (
            <div
              key={tagIndex}
              className="bg-[#605BFF] min-w-max rounded cursor-pointer text-white p-1 text-[10px] font-semibold inline-flex gap-1"
            >
              <span>{tag}</span>
              <Image
                onClick={() => handleRemoveTag(tagIndex)}
                src={CloseIcon}
                alt="close-icon"
              />
            </div>
          ))
        : null}
    </div>
  );
}
