import { BlocklyWorkspace } from "react-blockly";
import { defaultToolbox } from "./toolboxCategories";
import './Blockly.css'

type BlocklyProps = {
  theme : string
}

export default function Blockly({ theme } : BlocklyProps) {
  const initialXml =
    '<xml xmlns="https://developers.google.com/blockly/xml"><block type="simplebot" id="gjqjdO;x_.b0m5tTGg-L" x="10" y="10"><value name="botToken"><block type="text" id="A9eL4vg_5TLZhi]HQ3~5"><field name="TEXT">token you get from telegram "@botfather"</field></block></value><statement name="simpleActions"><block type="responceontext" id="ph9h5:`d%[NTM@1nGq2n"><value name="onText"><block type="regexInput" id="C,vEP$oMM6CXFqmfPBI}"><field name="regex">privet</field></block></value><value name="responceText"><block type="text" id="}d5nk?}L)RGHFp_l%?^T"><field name="TEXT">hello</field></block></value></block></statement></block></xml>';

  return (
    <>
      <BlocklyWorkspace
        className={theme}
        toolboxConfiguration={defaultToolbox} // this must be a JSON toolbox definition
        initialXml={initialXml}
        workspaceConfiguration={{
          grid: {
            spacing: 20,
            length: 3,
            colour: "#ccc",
            snap: true
          }
        }}
      />
    </>
  );
}
