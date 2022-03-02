import ReactJson from "react-json-view";
import styled from "styled-components";

const DumpButton = styled.button`
  background-color: #31de99;
  text-transform: uppercase;
  font-weight: bold;
  color: black;
  padding: 4px;
  margin: 4px;
  cursor: pointer;
`;

const StyledDump = styled.div`
  font-size: 12px;
`;

const Dump = (props) => {
  const { dumpData, setDumpVisible, dumpVisible } = props;

  return (
    <>
      <DumpButton
        onClick={() => {
          setDumpVisible((visible) => !visible);
        }}
      >
        {dumpVisible ? "Hide dump" : "Show dump"}
      </DumpButton>
      {dumpVisible ? (
        <StyledDump>
          <ReactJson src={dumpData} collapsed={true} />
        </StyledDump>
      ) : null}
    </>
  );
};

export default Dump;
