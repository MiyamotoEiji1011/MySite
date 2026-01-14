
import CodeButton from "../../ui/CodeButton";
import './FrontText.css';
import '../../ui/CodeButton/index.css';

type FrontTextProps = {
  text: string; // "\n" を含めてOK
  buttonLabel: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  className?: string;
  fixedWidth1440?: boolean;
};

export default function FrontText({
  text,
  buttonLabel,
  buttonHref,
  onButtonClick,
  className = "",
  fixedWidth1440 = false,
}: FrontTextProps) {
  const lines = text.split('\n');

  return (
    <section className={`frontText ${className}`.trim()}>
      <div className={`frontText__frame ${fixedWidth1440 ? "is-fixed" : ""}`}>
        <div className="frontText__editor">
          {/* エディタヘッダー */}
          <div className="frontText__editorHeader">
            <div className="frontText__editorDots">
              <span className="frontText__dot frontText__dot--red"></span>
              <span className="frontText__dot frontText__dot--yellow"></span>
              <span className="frontText__dot frontText__dot--green"></span>
            </div>
            <div className="frontText__editorTitle">index.js</div>
            <div className="frontText__editorSpacer"></div>
          </div>

          {/* エディタコンテンツ */}
          <div className="frontText__editorContent">
            <div className="frontText__lineNumbers">
              {lines.map((_, index) => (
                <div key={index} className="frontText__lineNumber">{index + 1}</div>
              ))}
            </div>
            <div className="frontText__codeArea">
              {lines.map((line, index) => (
                <div key={index} className="frontText__codeLine">
                  {index === 0 && <span className="frontText__keyword">const</span>}
                  {index === 0 && <span className="frontText__variable"> greeting</span>}
                  {index === 0 && <span className="frontText__operator"> = </span>}
                  {index === 0 && <span className="frontText__string">"{line}"</span>}
                  {index === 0 && <span className="frontText__punctuation">;</span>}

                  {index === 1 && <span className="frontText__keyword">const</span>}
                  {index === 1 && <span className="frontText__variable"> name</span>}
                  {index === 1 && <span className="frontText__operator"> = </span>}
                  {index === 1 && <span className="frontText__string">"{line}"</span>}
                  {index === 1 && <span className="frontText__punctuation">;</span>}

                  {index === 2 && <span className="frontText__keyword">const</span>}
                  {index === 2 && <span className="frontText__variable"> skills</span>}
                  {index === 2 && <span className="frontText__operator"> = </span>}
                  {index === 2 && <span className="frontText__string">"{line}"</span>}
                  {index === 2 && <span className="frontText__punctuation">;</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="frontText__btnWrap">
          <CodeButton label={buttonLabel} href={buttonHref} onClick={onButtonClick} />
        </div>
      </div>
    </section>
  );
}
