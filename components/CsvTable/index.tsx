import { useState } from "react";

import Dropdown from "./Dropdown";
import TagContainer from "./TagContainer";
import { convertToExternalLink } from "@/utils/helpers";

export interface TagsList {
  [key: number]: Set<String>;
}

interface CSVTableProps {
  data: Record<string, string>[];
}

export default function CSVTable({ data }: CSVTableProps) {
  const [selectedTags, setSelectedTags] = useState<TagsList>({});

  if (!data || data.length === 0) {
    return null;
  }

  const headers = Object.keys(data[0]);
  const isSelectedKeysPresent = Object.keys(selectedTags).length > 0;

  return (
    <table className="table-auto rounded-lg w-full bg-[#F5F5F5]">
      <thead>
        <tr className="text-left">
          {headers.map((header, index) => {
            return (
              <th key={header} className="px-4 pt-3 pb-2 capitalize">
                {index == 3 ? "Add Tags" : header}
              </th>
            );
          })}
          {isSelectedKeysPresent ? (
            <th className="px-4 pt-3 pb-2">Selected Tags</th>
          ) : null}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-[14px] text-left border-[#F5F5F5] rounded-full"
          >
            {headers.map((header, index) => {
              if (header === "select tags") {
                const tags = row[header].split(", ");
                return (
                  <td key={header} className="px-4 py-2 bg-white">
                    <Dropdown
                      tags={tags}
                      rowIndex={rowIndex}
                      selectedTags={selectedTags}
                      setSelectedTags={setSelectedTags}
                    />
                  </td>
                );
              }
              return (
                <td key={header} className="px-4 py-2 bg-white">
                  {index === 1 ? (
                    <a
                      className="text-[#5B93FF] underline"
                      href={convertToExternalLink(row[header])}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {row[header]}
                    </a>
                  ) : (
                    row[header]
                  )}
                </td>
              );
              // }
            })}
            {isSelectedKeysPresent ? (
              <td className="px-4 py-2 bg-white">
                <TagContainer
                  rowIndex={rowIndex}
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                />
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
