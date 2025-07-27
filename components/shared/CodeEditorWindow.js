
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import ReactCodeMirror from "@uiw/react-codemirror";

const CodeEditorWindow = ({ onChange, language, code, theme, fontSize, forProblemsPage=true, isInterview=false }) => {

  const handleEditorChange = (value) => {
    if (isInterview) onChange(value);
    else onChange('code', value);
  };

  return (
    <div className={`flex flex-col !w-full justify-start items-end overlay rounded-md overflow-hidden shadow-4xl bg-dark-1 ${forProblemsPage? 'flex-grow' : 'h-[500px]'} max-md:h-[500px]`}>
        <ReactCodeMirror
          value={code}
          onChange={handleEditorChange}
          extensions={[language==='python3'? python() : language==='cpp'? cpp() : language==='java'? java() : javascript()]}
          theme={vscodeDark}
          style={{ fontSize: fontSize, minHeight: '300px', maxHeight: '60vh' }}
          height="100%"
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            highlightSelectionMatches: false,
            searchKeymap: true,
          }}
        />
    </div>
  );
};
export default CodeEditorWindow;
