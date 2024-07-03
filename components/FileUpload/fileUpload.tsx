import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "../Button";
import { toast } from "react-toastify";
import SyncLoader from "react-spinners/SyncLoader";

const FileUpload = ({
  isAnalyzed,
  selectedFile,
  setSelectedFile,
  fetchAnalysis,
  isAnalyzing,
  setCodeSelectedFile,
}: {
  isAnalyzed: boolean;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  fetchAnalysis: () => void;
  isAnalyzing: boolean;
  setCodeSelectedFile: (code: string | null) => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");

  const handleFileChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCodeSelectedFile(e.target?.result as string);
        };
        reader.onerror = (e) => {
          toast.error('Error reading file');
        };
        reader.readAsText(file);
      }
    }
  };

  const onChooseFile = () => {
    inputRef.current?.click?.();
  };

  const clearFileInput = () => {
    if (inputRef.current != null) {
      inputRef.current.value = "";
    }
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus("select");
  };

  return (
    <div className="my-10 flex flex-col content-center justify-center justify-items-center items-center">
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept=".py"
      />

      {/* Button to trigger the file input dialog */}
      {!selectedFile && (
        <Button onClick={onChooseFile} haveIcon={true} classAdd=" file-btn">
          <svg
            className="mr-2 text-white fill-current self-center mb-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z" />
          </svg>
          Upload File
        </Button>
      )}

      {selectedFile && (
        <>
          <div className="file-card">
            <svg
              className="w-8 text-indigo-800 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
            </svg>

            <div className="file-info">
              <div style={{ flex: 1 }}>
                <h6>{selectedFile?.name}</h6>

                <div className="progress-bg">
                  <div className="progress" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {uploadStatus === "select" ? (
                <svg
                  className="w-6 text-indigo-800 fill-current"
                  onClick={clearFileInput}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              ) : (
                <div className="check-circle">
                  {uploadStatus === "uploading" ? (
                    `${progress}%`
                  ) : uploadStatus === "done" ? (
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "20px" }}
                    >
                      check
                    </span>
                  ) : null}
                </div>
              )}
            </div>
          </div>
          {isAnalyzing? 
          
          <SyncLoader
          className="mt-6"
              color={"rgb(165 180 252)"}
              loading={isAnalyzing}
              // cssOverride={override}
              // size={150}
              // aria-label="Loading S"
              data-testid="loader"
            />: <Button onClick={fetchAnalysis} classAdd=" mt-6">
            Analyze
          </Button>}
          
        </>
      )}
    </div>
  );
};

export default FileUpload;
