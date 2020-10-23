import styled from 'styled-components';

export const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid var(--border);
    border-radius: 6px;
`;

export const Languages = styled.div`
  margin-top: var(--verticalPadding);

  > h2 {
    font-size: 16px;
    font-weight: normal;
  }
  > div {
    margin-top: 8px;

    display: grid;
    grid-gap: 16px;

    grid-template-columns: 1fr;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr 1fr;
      grid-auto-rows: minmax(min-content, max-content);
    }
  }
`;

export const Botside = styled.div`
  > ul {
    display: flex;
    align-items: center;

    > li {
      display: flex;
      align-items: center;
      margin-right: 10px;

      > span {
        align-items: center;
        margin-left: 5px;
        font-size: 12px;
        color: var(--gray);
      }
    }
  }

  .language {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    flex-shrink: 0;

    &.other {
      background: var(--other-language);
    }
    &.javascript {
      background: var(--javascript);
    }
  }
`;