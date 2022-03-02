import styled from "styled-components";

const StyledPagination = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 16px;
`;

const PageButton = styled.button`
  background-color: #fffaaa;
  padding: 4px;
  margin: 4px;
  cursor: pointer;
`;

const Pagination = (props) => {
  const { page, setOffset, limit } = props;
  return (
    <StyledPagination>
      {Array.from({ length: page }, (_, k) => (
        <PageButton
          key={k}
          onClick={() => {
            setOffset(k * limit);
          }}
        >
          {k + 1}
        </PageButton>
      ))}
    </StyledPagination>
  );
};

export default Pagination;
