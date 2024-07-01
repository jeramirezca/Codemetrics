import Image from "next/image";

export default function About() {
  
    return (
      <div className="flex flex-col items-center content-center">
        <h1>About codemetrics</h1>
        <div className="flex w-5/6 flex-col items-center content-center self-center">
        <p className="text-center">
        Codemetrics is an app that automatically analyzes source code written in Python to collect statistics, such as the number and size of classes and functions, global variables, comments, conditional statements, and loops, will calculate variable and function name length averages. Additionally, you will identify external and local dependencies and, where possible, provide an analysis of the complexity of the functions. All these statistics can be used to detect bad smells in the code, evaluate its quality or help meet coding standards when integrated with other tools.
        </p>
        
        <Image width={320} height={320} src={"/favicon.png"} alt={"codemetrics logo"} className="my-10"/>
        </div>
        
      </div>
    );
  }