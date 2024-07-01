"use client";

import Button from "@/components/Button";
import DataChart from "@/components/DataChart";
import FileUpload from "@/components/FileUpload/fileUpload";
import { doughnutChartData } from "@/components/mockData";
import { DataTable } from "@/components/table";
import { ClipLoader, SyncLoader } from "react-spinners";
import { useState } from "react";
import answer from "./answer.json";
import { toast } from "react-toastify";

interface FunctionDetail {
  size_without_comments: number;
  size: number;
  name: string;
  start_line: number;
  size_without_comments_or_empty_lines: number;
  end_line: number;
}

interface ClassDetail {
  size_without_comments: number;
  size: number;
  functions: string[];
  name: string;
  start_line: number;
  size_without_comments_or_empty_lines: number;
  end_line: number;
}

interface DependencyDetail {
  name: String;
  times_used: number;
  used_in_functions: [];
  lines_used: [];
}

export interface ComplexityDetail {
  name: string;
  big_o_complexity: string;
  cyclomatic_complexity: number;
}

export default function Analyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [codeSelectedFile, setCodeSelectedFile] = useState<string | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);


  const [isLoadingCodeDescription, setIsLoadingCodeDescription] =useState(false);
  const [codeDescription, setCodeDescription] = useState("");
  const [codeAnalysis, setCodeAnalysis] = useState("");
  const [numberGlobalVariables, setNumberGlobalVariables] = useState(0);
  const [numberForLoops, setNumberForLoops] = useState(0);
  const [numberWhileLoops, setNumberWhileLoops] = useState(0);
  const [numberIfStatements, setNumberIfStatements] = useState(0);

  const [numberClasses, setNumberClasses] = useState(0);
  const [numberFunctions, setNumberFunctions] = useState(0);

  const [numberLines, setNumberLines] = useState(0);
  const [numberCodeLines, setNumberCodeLines] = useState(0);
  const [numberComments, setNumberComments] = useState(0);
  const [numberCommentsPerLine, setNumberCommentsPerLine] = useState(0);

  const [codeFunctions, setCodeFunctions] = useState<FunctionDetail[]>([]);
  const [codeClasses, setCodeClasses] = useState([]);
  const [codeComplexities, setCodeComplexities] = useState<ComplexityDetail[]>(
    []
  );
  const [codeDependencies, setCodeDependecies] = useState<DependencyDetail[]>(
    []
  );

  const sleep = (ms:any) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchAnalysis = async () => {
    try {
      setIsAnalyzing(true);
      await sleep(2000);
      if (codeSelectedFile) {
        // const responseFetch = await fetch(
        //   "https://codemetricsbackend.onrender.com/api/v1/codemetrics/analyze",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ codeSelectedFile }),
        //   }
        // );
        // const response = await responseFetch.json();
        const response: any = answer;

        setCodeDescription(
          response.descriptionByGemini.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
          )
        );
        setCodeAnalysis(response);
        setNumberGlobalVariables(response.number_of_global_variables); //
        setCodeFunctions(response.functions);
        setNumberCommentsPerLine(response.number_of_comments_per_line);
        setNumberClasses(response.number_of_classes);
        setCodeClasses(response.classes);
        setNumberLines(response.number_of_lines);
        setCodeComplexities(response.function_complexities);
        setNumberCodeLines(response.number_of_code_lines);
        setNumberFunctions(response.number_of_functions);
        setCodeDependecies(response.dependencies);
        setNumberForLoops(response.number_of_for_loops);
        setNumberWhileLoops(response.number_of_while_loops);
        setNumberIfStatements(response.number_of_if_statements);
        setNumberComments(response.number_of_comments);
        setIsAnalyzed(true);
        toast.success("Code analyzed successfully");
        setIsAnalyzed(true);
        
        fetchGemini();
      } else {
        toast.error("Please select a .py file to analyze");
      }
    } catch (error) {
      toast.error("There was an error");
    }
    
    setIsAnalyzing(false);
  };
  
  const fetchGemini = async () => {
    await sleep(2000);
    setIsLoadingCodeDescription(true);
    setCodeDescription("response");
    setIsLoadingCodeDescription(false);
    fetchFinalAnalysis();
  }

  const fetchFinalAnalysis = async () => {
    setCodeDescription("response");
  }

  return (
    <div>
      <h1> Analyzer</h1>
      {isAnalyzed ? (
        <div>
          <p className="text-center">We have finished your analysis!</p>
          <h2>Code description: </h2>
          {isLoadingCodeDescription ? (
            <SyncLoader
              color={"rgb(165 180 252)"}
              loading={isLoadingCodeDescription}
              // cssOverride={override}
              // size={150}
              // aria-label="Loading S"
              data-testid="loader"
            />
          ) : (
            // Asumiendo que tienes un estado llamado codeDescription que almacena tu HTML
            <div dangerouslySetInnerHTML={{ __html: codeDescription }}></div>
          )}
          <h2>General analysis: </h2>
          <div className="sectionData">
          <div className="subSectionData">
              <p className="nameData">Number of global variables:</p>
              <p className="numberData">{numberGlobalVariables}</p>
            </div>
            <div className="subSectionData">
              <p className="nameData">Number of lines:</p>
              <p className="numberData">16</p>
            </div>
            <div className="subSectionData">
              <p className="nameData">Number of commentars:</p>
              <p className="numberData">16</p>
            </div>
            <div className="subSectionData">
              <p className="nameData">Number of for loops:</p>
              <p className="numberData">16</p>
            </div>
            <div className="subSectionData">
              <p className="nameData">Number of if conditions:</p>
              <p className="numberData">16</p>
            </div>
            <div className="subSectionData">
              <p className="nameData">Number of while loops:</p>
              <p className="numberData">16</p>
            </div>
          </div>
          <div className="size-stat">
            <DataChart type={"doughnut"} data={doughnutChartData} />
          </div>
          <h3>Functions analysis</h3>
          <p>your code has {numberFunctions} functions that are described next:</p>
          <div className="functionsSection">
            {codeFunctions.map((codeFunction, index) => (
              <div className="functionSubsection" key={index}>
                <div className="functionName">{codeFunction.name}</div>
                <div className="functionData">
                  Beginning line:<p>{codeFunction.start_line}</p>
                </div>
                <div className="functionData">
                  Finish line:<p>{codeFunction.end_line}</p>
                </div>
                <div className="functionData">
                  Total lines:<p>{codeFunction.size}</p>
                </div>
                <div className="functionData">
                  Total code lines (no comments):
                  <p>{codeFunction.size_without_comments_or_empty_lines}</p>
                </div>
              </div>
            ))}
          </div>

          <h2>Complexity analysis: </h2>

          <DataTable />

          <h2>Dependencies analysis: </h2>

          <div className="functionsSection">
            {codeDependencies.map((dependency, index) => (
              <div className="functionSubsection" key={index}>
                <div className="functionName">{dependency.name}</div>
                <div className="functionData">
                  Times used:<p>{dependency.times_used}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center content-center text-center">
          <p>
            Welcome to our tool to analyze your code, to begin you can upload
            your code in python in the next button:
          </p>

          <FileUpload
            isAnalyzed={isAnalyzed}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            fetchAnalysis={fetchAnalysis}
            isAnalyzing={isAnalyzing}
            setCodeSelectedFile={setCodeSelectedFile}
          />
        </div>
      )}
    </div>
  );
}
