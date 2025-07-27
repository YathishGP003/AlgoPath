"use client";
import React, { useEffect, useState } from "react";
import LanguagesDropdown from "../shared/LanguagesDropdown";
import ThemeDropdown from "../shared/ThemeDropdown";
import CodeEditorWindow from "../shared/CodeEditorWindow";
import OutputWindow from "../shared/OutputWindow";
import CustomInput from "../shared/CustomInput";
import Split from "react-split";
import { languagesData, mockComments } from "@/constants";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";

import axios from "axios";
import Loader from "../shared/Loader";
import { useParams } from "next/navigation";
import FontSizeDropdown from "../shared/FontSizeDropdown";

const Playground = ({ problems, isForSubmission = true, setSubmitted }) => {
  
  const params = useParams();
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [isCodeRunning, setIsCodeRunning] = useState(false);
  const [isCodeSubmitting, setIsCodeSubmitting] = useState(false);
  const [theme, setTheme] = useState({ value: "dark", label: "Dark" });
  const [language, setLanguage] = useState(languagesData[3]);
  const [code, setCode] = useState(mockComments[language.value]);
  const [fontSize, setFontSize] = useState({ value: '14', label: '14px' });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [clickedProblemId, setClickedProblemId] = useState(null);

  useEffect(() => {
    if (problems) {
        problems.forEach((problem, index) => {
            if (problem.id === params.id) {
              setClickedProblemId(problem.id);
              // Handle both testCases and testCase structures
              const testInput = problem.testCases ? problem.testCases[0].input[0] : (problem.testCase ? problem.testCase.input[0] : '');
              setCustomInput(testInput);
        }
        })
    }

}, [problems]);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    function exitHandler(e) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozfullscreenchange", exitHandler);
      document.addEventListener("MSFullscreenChange", exitHandler);
    }
  }, [isFullScreen]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = async (input, forSubmisssion=false) => {
    if (!forSubmisssion) setIsCodeRunning(true);
    // Try JDoodle API first, fallback to mock if it fails
    let options = {
      method: "POST",
      url: "https://jdoodle2.p.rapidapi.com/v1",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
        "X-RapidAPI-Host": "jdoodle2.p.rapidapi.com",
      },
      data: {
        language: language.value,
        code: code,
        input: input,
      },
    };

    try {
      const response = await axios(options);
      
      // Check if JDoodle returned an error
      if (response.data.error) {
        throw new Error('JDoodle API error: ' + response.data.output);
      }
      
      if (!forSubmisssion) {
        setOutputDetails(response.data);
        setIsCodeRunning(false);
      }
      return response.data.output;
    } catch (error) {
      console.log('JDoodle API failed, trying mock execution:', error.message);
      
      // Fallback to mock execution
      try {
        const mockOptions = {
          method: "POST",
          url: `${window.location.origin}/api/mock-execute`,
          headers: {
            "content-type": "application/json",
          },
          data: {
            language: language.value,
            code: code,
            input: input,
          },
        };
        
        const mockResponse = await axios(mockOptions);
        if (!forSubmisssion) {
          setOutputDetails(mockResponse.data);
          setIsCodeRunning(false);
        }
        return mockResponse.data.output;
      } catch (mockError) {
        if (!forSubmisssion) setIsCodeRunning(false);
        console.error("Both JDoodle and mock execution failed:", mockError);
        return { error: true, output: "Code execution failed" };
      }
    }
  };

  const handleSubmit = async () => {
    setIsCodeSubmitting(true); 
    const res = await fetch("/api/submitCode", {
      method: "POST",
      body: JSON.stringify({ code, problem: clickedProblemId, language: language.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.isAccepted == "accepted") {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setOutputDetails({ output: "Accepted", submitted: true, accepted: true });
      setIsCodeSubmitting(false); 
    } else {
      setOutputDetails({ output: data.output, submitted: true, accepted: false });
      setIsCodeSubmitting(false);
    }
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex px-4 gap-2 justify-between max-md:mt-12 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          <LanguagesDropdown onSelectChange={(lang) => {setLanguage(lang);setCode(mockComments[lang.value])}} />
          <ThemeDropdown handleThemeChange={(th) => setTheme(th)} />
          <FontSizeDropdown onSelectChange={(f) => setFontSize(f)} />
        </div>
        <div className="flex gap-2 items-center">

          <button onClick={handleFullScreen} className="hover:bg-light-3 hover:border-light-4 rounded-lg p-1">
            <div className="h-6 w-6 font-bold text-2xl text-dark-4">
              {!isFullScreen ? (
                <AiOutlineFullscreen />
              ) : (
                <AiOutlineFullscreenExit />
              )}
            </div>
          </button>
        </div>
      </div>

      <Split
        className="!w-full flex-grow flex flex-col items-start px-4 pt-4 max-md:hidden"
        direction="vertical"
        minSize={100}
      >
        <CodeEditorWindow
          code={code}
          onChange={onChange}
          language={language.value}
          theme={theme.value}
          fontSize={fontSize.value}
        />

        <div className="!w-full flex flex-col" style={{ minHeight: '200px' }}>
          <div className="flex justify-end items-center gap-3">
            <button
              onClick={() => handleCompile(customInput)}
              disabled={!code}
              className={`px-4 py-2 bg-dark-4 text-light-1 mt-2 rounded-lg text-sm`}
            >
              {isCodeRunning ? <Loader /> : "Run"}
            </button>
            {isForSubmission && (
              <button
                onClick={handleSubmit}
                disabled={!code}
                className={`px-4 py-2 bg-green-600 text-light-1 mt-2 rounded-lg text-sm`}
              >
                {isCodeSubmitting ? <Loader /> : "Submit"}
              </button>
            )}
          </div>

          <div className="flex gap-5">
            <div className="!w-full flex flex-col">
              <h1 className="font-bold text-lg">Custom Input</h1>
              <CustomInput
                customInput={customInput}
                setCustomInput={setCustomInput}
              />
            </div>
            <OutputWindow outputDetails={outputDetails} />
          </div>
        </div>
      </Split>

      <div
        className="!w-full flex-grow flex flex-col items-start px-4 pt-4 md:hidden max-md:w-[500px]"
      >
        <CodeEditorWindow
          code={code}
          onChange={onChange}
          language={language.value}
          theme={theme.value}
          fontSize={fontSize.value}
        />

        <div className="!w-full flex flex-col" style={{ minHeight: '200px' }}>
          <div className="flex justify-end items-center gap-3">
            <button
              onClick={() => handleCompile(customInput)}
              disabled={!code}
              className={`px-4 py-2 bg-dark-4 text-light-1 mt-2 rounded-lg text-sm`}
            >
              {isCodeRunning ? <Loader /> : "Run"}
            </button>
            {isForSubmission && (
              <button
                onClick={handleSubmit}
                disabled={!code}
                className={`px-4 py-2 bg-green-600 text-light-1 mt-2 rounded-lg text-sm`}
              >
                {isCodeSubmitting ? <Loader /> : "Submit"}
              </button>
            )}
          </div>

          <div className="flex gap-5 max-xs:flex-col">
            <div className="!w-full flex flex-col">
              <h1 className="font-bold text-lg">Custom Input</h1>
              <CustomInput
                customInput={customInput}
                setCustomInput={setCustomInput}
              />
            </div>
            <OutputWindow outputDetails={outputDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
