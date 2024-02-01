import Image from "next/image";
import * as xlsx from "xlsx";
import { FileRejection, useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";

import UploadIcon from "../../public/assets/UploadIcon.svg";
import ExcelIcon from "../../public/assets/Excel.svg";
import CSVTable from "../CsvTable";
import toast from "react-hot-toast";

export default function Analytics() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [csvData, setCsvData] = useState<Record<string, string>[] | null>(null);

  function parseFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const result: any = event.target?.result;
          const workbook = xlsx.read(result, { type: "binary" });
          const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
          const sheet = workbook.Sheets[sheetName];
          const records = xlsx.utils.sheet_to_json(sheet);
          resolve(records);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (event) => {
        reject(
          (event.target as FileReader).error?.message ||
            "Error reading the file."
        );
      };

      // Read the file as binary data
      reader.readAsBinaryString(file);
    });
  }

  const handleSubmit = async () => {
    if (file) {
      setIsLoading(true);
      const csvData = await parseFile(file);
      setTimeout(() => {
        setCsvData(csvData);
        setIsLoading(false);
        setFile(null);
      }, 1000);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    setFile(null);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFile(file);
      } else if (fileRejections[0].errors[0].code == "file-invalid-type") {
        console.log("File type not supported");
        toast.error("File type not supported");
      }
    },
    []
  );

  const onError = useCallback((error: Error) => {
    if (error) {
      console.log(error, "error");
      toast.error(error.message);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onError,
    // This is to only accept csv and excel sheets. In production if needed we can customize this accordingly
    accept: {
      "text/csv": [
        ".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values",
      ],
      "application/vnd.ms-excel": [
        ".xlsx, .xls, .xlsb, .xlsm, application/vnd.ms-excel, application/msexcel, application/x-msexcel, application/x-ms-excel, application/x-excel, application/xls, application/x-xls, application/x-dos_ms_excel",
      ],
    },
    maxFiles: 1,
  });

  return (
    <div className="mt-5 sm:mt-[20px] md:mt-[50px] lg:mt-[65px]">
      <div className="flex flex-col items-center">
        <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[50%] h-[310px] md:h-[367px] bg-[#FFFFFF] rounded-lg p-4 shadow-sm md:shadow-none">
          <div
            className="w-full h-[calc(100%-61px)] md:h-[calc(100%-77px)] relative rounded-lg outline-dashed outline-[#EBEBEB] flex flex-col justify-center items-center gap-5 cursor-pointer"
            {...getRootProps()}
          >
            <Image src={ExcelIcon} alt="Excel" width={30} height={28} />
            <div className="mx-4 text-center">
              {file ? (
                <div className="text-center">
                  <span className="text-[#999CA0]">{file.name}</span>
                  <div
                    className="text-[#D33030] mt-4"
                    onClick={handleRemoveFile}
                  >
                    Remove
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-[#999CA0]">
                    Drop your excel sheet here or
                  </span>
                  <span className="text-[#605BFF]">&nbsp;Browse</span>
                </div>
              )}
            </div>
            <input
              accept=".csv"
              className="absolute top-0 left-0 w-full h-full opacity-0"
              {...getInputProps()}
            />
          </div>
          <div
            className={`h-10 md:h-14 mt-[21px] bg-[#605BFF] rounded-lg w-full ${
              csvData && !file ? `opacity-40` : `cursor-pointer`
            }`}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <svg
                  aria-hidden="true"
                  className="w-7 h-7 text-white animate-spin fill-[#605BFF]"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2 h-full select-none">
                <Image src={UploadIcon} alt="Upload" width={24} height={24} />
                <div className="text-sm font-semibold text-white">Upload</div>
              </div>
            )}
          </div>
        </div>
        {csvData ? (
          <div className="w-full mt-[40px] pl-[20px] pr-[10px]">
            <div className="font-semibold text-2xl mb-7 md:mb-10">Uploads</div>
            <div className="overflow-x-scroll w-full scrollbar-hide">
              <CSVTable data={csvData} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
