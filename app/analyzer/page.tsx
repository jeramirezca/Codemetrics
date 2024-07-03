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

  const [isLoadingCodeDescription, setIsLoadingCodeDescription] =
    useState(false);

  const [codeSmell, setCodeSmell] = useState("");
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
  const [codeClasses, setCodeClasses] = useState<ClassDetail[]>([]);
  const [codeComplexities, setCodeComplexities] = useState<ComplexityDetail[]>(
    []
  );
  const [codeDependencies, setCodeDependecies] = useState<DependencyDetail[]>(
    []
  );

  const doughnutLinesChartData = {
    labels: ["Code lines", "Commentars", "Blank Lines"],
    datasets: [
      {
        label: "Lines in your code",
        data: [numberCodeLines, numberComments, (numberLines - numberCodeLines- numberComments)],
        backgroundColor: ["#64CFF6", "#006d9c", "#b26fff"],
        hoverOffset: 4,
      },
    ],
  };

  const barLoopsChartData = {
    labels: ["If statements", "For loops", "While loops"],
    datasets: [
      {
        label: "Code statements",
        data: [numberIfStatements, numberForLoops, numberWhileLoops],
        backgroundColor: ["#64CFF6", "#64A1F5", "#6473F5"],
        hoverOffset: 4,
      },
    ],
  };

  const functionsChartData = {
    labels: codeFunctions.map((func) => func.name),
    datasets: [
      {
        label: "Lines",
        data: codeFunctions.map((func) => func.size),
        backgroundColor: ["#64CFF6", "#64A1F5", "#6473F5"],
        hoverOffset: 4,
      },
    ],
  };

  const classesChartData = {
    labels: codeClasses.map((clas) => clas.name),
    datasets: [
      {
        label: "Lines",
        data: codeClasses.map((clas) => clas.size),
        backgroundColor: ["#64CFF6", "#64A1F5", "#6473F5"],
        hoverOffset: 4,
      },
    ],
  };

  const dependenciesChartData = {
    labels: codeDependencies.map((dep) => dep.name),
    datasets: [
      {
        label: "Times used",
        data: codeDependencies.map((dep) => dep.times_used),
        backgroundColor: ["#64CFF6", "#64A1F5", "#6473F5"],
        hoverOffset: 4,
      },
    ],
  };

  const [bigOClasses, setBigOClasses] = useState<string[]>([]);
  const [bigOClassesNumber, setBigOClassesNumber] = useState<any[]>([]);
  const [cyclomaticClasses, setCyclomaticClasses] = useState<number[]>([]);
  const [cyclomaticClassesNumber, setCyclomaticClassesNumber] = useState<any[]>(
    []
  );

  const bigOComplexityChartData = {
    labels: bigOClasses,
    datasets: [
      {
        label: "number of functions",
        data: bigOClassesNumber,
        backgroundColor: ["#64CFF6", "#64A1F5", "#6473F5"],
        hoverOffset: 4,
      },
    ],
  };

  const cyclomaticComplexityChartData = {
    labels: cyclomaticClasses,
    datasets: [
      {
        label: "number of functions",
        data: cyclomaticClassesNumber,
        backgroundColor: ["#64CFF6", "#64A1F5", "#6473F5"],
        hoverOffset: 4,
      },
    ],
  };

  const groupByComplexities = (data: ComplexityDetail[]) => {
    const bigOComplexityMap: { [key: string]: string[] } = {};
    const cyclomaticComplexityMap: { [key: number]: string[] } = {};

    data.forEach((item) => {
      const { big_o_complexity, cyclomatic_complexity, name } = item;

      if (!bigOComplexityMap[big_o_complexity]) {
        bigOComplexityMap[big_o_complexity] = [];
      }
      bigOComplexityMap[big_o_complexity].push(name);

      if (!cyclomaticComplexityMap[cyclomatic_complexity]) {
        cyclomaticComplexityMap[cyclomatic_complexity] = [];
      }
      cyclomaticComplexityMap[cyclomatic_complexity].push(name);
    });

    const bigOClasses = Object.keys(bigOComplexityMap);
    const cyclomaticClasses = Object.keys(cyclomaticComplexityMap).map(Number);

    console.log(cyclomaticClasses);

    setBigOClasses(bigOClasses);
    setBigOClassesNumber(
      bigOClasses.map((key) => bigOComplexityMap[key].length)
    );

    setCyclomaticClasses(cyclomaticClasses);
    setCyclomaticClassesNumber(
      cyclomaticClasses.map((key) => cyclomaticComplexityMap[key].length)
    );
  };

  const fetchAnalysis = async () => {
    try {
      setIsAnalyzing(true);
      if (codeSelectedFile) {
        const responseFetch = await fetch(
          "https://codemetricsbackend.onrender.com/api/v1/codemetrics/analyze",
          {
            method: "POST",
            body: codeSelectedFile,
          }
        );
        const response = await responseFetch.json();
        //const response: any = answer;

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
        groupByComplexities(response.function_complexities);
        setIsAnalyzed(true);
        toast.success("Code analyzed successfully");
        fetchGemini();
        fetchFinalAnalysis(JSON.stringify(response));
      } else {
        toast.error("Please select a .py file to analyze");
      }
    } catch (error) {
      toast.error("There was an error");
    }
    setIsAnalyzing(false);
  };

  const fetchGemini = async () => {
    setIsLoadingCodeDescription(true);
    try {
      const responseFetchGemini = await fetch(
        "https://codemetricsbackend.onrender.com/api/v1/codemetrics/codeDescription",
        {
          method: "POST",
          body: codeSelectedFile,
        }
      );
      const responseGemini = await responseFetchGemini.json();

      setCodeDescription(
        responseGemini.descriptionByGemini
          .replace(
            /\*\*(.*?)\*\*/g,
            "<strong style='color:#d7b3ff;'>$1</strong>"
          )
          .replace(/^- (.*?)(?=\n|$)/gm, "<li>$1</li>")
          .replace(/\*(.*?)\*/g, "<li>$1</li>").replace(/^- (.*?)(?=\n|$)/gm, "<li>$1</li>")
          .replace(
            /^\* (.*?)(?=\n|$)/gm,
            "<li>$1</li>"
          )
      );
    } catch {
      toast.error("There was an error analyzing the code with Gemini");
    }

    setIsLoadingCodeDescription(false);
  };

  const fetchFinalAnalysis = async (response: string) => {
    try {
      const responseFetchSmell = await fetch(
        "https://codemetricsbackend.onrender.com/api/v1/codemetrics/smellCodeAnalysis",
        {
          method: "POST",
          body: response,
        }
      );
      const responseSmell = await responseFetchSmell.json();
      setCodeSmell(
        responseSmell.smell_code_analysis
          .replace(
            /\*\*(.*?)\*\*/g,
            "<strong style='color:#d7b3ff;''>$1</strong>"
          )
          .replace(
            /\#\#(.*?)\#\#/g,
            "<strong style='color:#d7b3ff;''>$1</strong>"
          )
          .replace(/^- (.*?)(?=\n|$)/gm, "<li>$1</li>")
          .replace(
            /^\* (.*?)(?=\n|$)/gm,
            "<li>$1</li>"
          ).replace("Code Smells", "")
      );
    } catch {
      toast.error("There was an error analyzing the code Smell");
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        {isAnalyzed ? (
          <svg
            onClick={() => setIsAnalyzed(false)}
            className="w-9 text-indigo-300 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        ) : (
          <div></div>
        )}

        <h1> Analyzer</h1>
        <div></div>
      </div>

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
            <div className="sectionBack">
              <p
                className="text-xl"
                dangerouslySetInnerHTML={{ __html: codeDescription }}
              ></p>
            </div>
          )}
          <h2>General analysis: </h2>
          <div className="flex text-center">
            <div className="flex flex-col w-2/4 mr-3 w-full">
              <div className="flex justify-stretch w-full justify-items-stretch align-center">
                <div className="subSectionData mr-3  w-2/4">
                  <p className="nameData">Number of lines:</p>
                  <p className="numberData">{numberLines}</p>
                </div>
                <div className="subSectionData ml-3 w-2/4">
                  <p className="nameData">Number of commentars:</p>
                  <p className="numberData">{numberComments}</p>
                </div>
              </div>
              <div className="flex justify-stretch w-full justify-items-stretch align-center mt-6">
                <div className="subSectionData mr-3 w-2/4">
                  <p className="nameData">Number of code lines:</p>
                  <p className="numberData">{numberCodeLines}</p>
                </div>
                <div className="subSectionData ml-3 w-2/4">
                  <p className="nameData">Number comments per line:</p>
                  <p className="numberData">{numberCommentsPerLine}</p>
                </div>
              </div>
              <div className="flex flex-col text-center size-stat align-center justify-center align-items-center my-5">
                <h4>Lines in your code</h4>
                <DataChart type={"doughnut"} data={doughnutLinesChartData} />
              </div>
            </div>
            <div className="flex flex-col w-2/4 ml-3 w-full">
              <div className="flex">
                <div className="subSectionData mr-3 flex-child-expand">
                  <p className="nameData">Number of for loops:</p>
                  <p className="numberData">{numberForLoops}</p>
                </div>
                <div className="subSectionData mr-3 ml-3 flex-child-expand">
                  <p className="nameData">Number of if conditions:</p>
                  <p className="numberData">{numberIfStatements}</p>
                </div>
                <div className="subSectionData ml-3 flex-child-expand">
                  <p className="nameData">Number of while loops:</p>
                  <p className="numberData">{numberWhileLoops}</p>
                </div>
              </div>

              <div className="flex flex-col text-center size-stat align-center justify-center my-5">
                <h4>Comparison use of if, while and for</h4>
                <DataChart type={"bar"} data={barLoopsChartData} />
              </div>
            </div>
          </div>

          <div className="sectionData">
            <div className="subSectionData">
              <p className="nameData">Number of global variables:</p>
              <p className="numberData">{numberGlobalVariables}</p>
            </div>
          </div>

          <h2>Functions analysis</h2>
          <p className="text-xl">
            your code has {numberFunctions} functions that are described next:
          </p>
          <div className="functionsSection">
            {codeFunctions.map((codeFunction, index) => (
              <div className="functionSubsection" key={index}>
                <div className="functionName">{codeFunction.name}</div>
                <div className="functionData">
                  Start line:<p>{codeFunction.start_line}</p>
                </div>
                <div className="functionData">
                  End line:<p>{codeFunction.end_line}</p>
                </div>
                <div className="functionData">
                  Total lines:<p>{codeFunction.size}</p>
                </div>
                <div className="functionData">
                  Total lines without comments:
                  <p>{codeFunction.size_without_comments}</p>
                </div>
                <div className="functionData">
                  Total code lines:
                  <p>{codeFunction.size_without_comments_or_empty_lines}</p>
                </div>
              </div>
            ))}
          </div>
          {codeFunctions.length != 0 ?
          <div className=" flex flex-col text-center">
            <h4>Number of lines per function comparison</h4>
            <DataChart type={"bar"} data={functionsChartData} />
          </div>:<></>
        }
          
          <h2>Complexity analysis: </h2>
          <p>
            In the following table you can find a general analysis of your
            functions complexity in the Big O notation and cliclomatic one:
          </p>
          <div className="sectionBack mt-4">

          <DataTable data={codeComplexities} /></div>

            {codeComplexities.length != 0 ?
            <div className="flex">
            <div className="w-2/4 flex flex-col text-center">
              <h4>BigO complexities</h4>
              <DataChart type={"bar"} data={bigOComplexityChartData} />
            </div>
            <div className="w-2/4 flex flex-col text-center">
              <h4>Cyclomatic complexities</h4>
              <DataChart type={"bar"} data={cyclomaticComplexityChartData} />
            </div>
          </div>:<>
          </>
          }
          

          <h2>Classes analysis</h2>
          <p className="text-xl">
            your code has {numberClasses} classes that are described next:
          </p>
          <div className="functionsSection">
            {codeClasses.map((codeClass, index) => (
              <div className="functionSubsection" key={index}>
                <div className="functionName">{codeClass.name}</div>
                <div className="functionData">
                  Start line:<p>{codeClass.start_line}</p>
                </div>
                <div className="functionData">
                  End line:<p>{codeClass.end_line}</p>
                </div>
                <div className="functionData">
                  Total lines:<p>{codeClass.size}</p>
                </div>
                <div className="functionData">
                  Total lines without comments:
                  <p>{codeClass.size_without_comments}</p>
                </div>
                <div className="functionData">
                  Total code lines:
                  <p>{codeClass.size_without_comments_or_empty_lines}</p>
                </div>
                <div className="functionData">
                  Functions:<p>{codeClass.functions.join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
          {codeClasses.length != 0 ?
          <div className=" flex flex-col text-center">
            <h4>Number of lines per class comparison</h4>
            <DataChart type={"bar"} data={classesChartData} />
          </div>
          :
            <></>
          }
          
          <h2>Dependencies analysis: </h2>

          <div className="functionsSection">
            {codeDependencies.map((dependency, index) => (
              <div className="functionSubsection" key={index}>
                <div className="functionName">{dependency.name}</div>
                <div className="functionData">
                  Times used:<p>{dependency.times_used}</p>
                </div>
                <div className="functionData">
                  Used in lines:<p>{dependency.lines_used}</p>
                </div>
                <div className="functionData">
                  Used in functions:<p>{dependency.used_in_functions}</p>
                </div>
              </div>
            ))}
          </div>
          {codeDependencies.length != 0 ?
          <div className=" flex flex-col text-center">
            <h4>Dependencies times of use comparison</h4>
            <DataChart type={"bar"} data={dependenciesChartData} />
          </div>
          : <></>}
          
          <h2>Code smells analysis: </h2>
          <div className="sectionBack">
          <p dangerouslySetInnerHTML={{ __html: codeSmell }} />
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
