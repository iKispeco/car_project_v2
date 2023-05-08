import carStore from "../Common/CarStore";
import { observer } from "mobx-react";

const Pagination = observer(() => {
  const {
    page,
    pages,
    changePage,
    changePage1,
    changePage2,
    changePage3,
    changePage4,
  } = carStore;

  let middlePagination;

  if (pages <= 5) {
    middlePagination = [...Array(pages)].map((_, index) => (
      <button
        key={index + 1}
        onClick={() => changePage()}
        disabled={page === index + 1}
      >
        {" "}
        {index + 1}
      </button>
    ));
  } else {
    const startValue = Math.floor(page - 1);

    middlePagination = (
      <>
        {[...Array(5)].map((_, index) => (
          <button
            key={startValue + index + 1}
            disabled={page === startValue + index + 1}
            onClick={() => changePage(index)}
          >
            {startValue + index + 1}
          </button>
        ))}

        <button>...</button>
        <button onClick={() => changePage(pages)}>{pages}</button>
      </>
    );

    if (page > 5) {
      if (pages - page >= 5) {
        middlePagination = (
          <>
            <button onClick={() => changePage3()}>1</button>
            <button>...</button>
            <button onClick={() => changePage2()}>{startValue}</button>
            {[...Array(5)].map((_, index) => (
              <button
                key={startValue + index + 1}
                disabled={page === startValue + index + 1}
                onClick={() => changePage1(index)}
              >
                {startValue + index + 1}
              </button>
            ))}

            <button>...</button>
            <button onClick={() => changePage2()}>{pages}</button>
          </>
        );
      } else {
        let amountLeft = pages - page + 5;
        middlePagination = (
          <>
            <button onClick={() => changePage3()}>1</button>
            <button>...</button>
            <button onClick={() => changePage4()}>{startValue}</button>
            {[...Array(amountLeft)].map((_, index) => (
              <button
                key={startValue + index + 1}
                style={
                  pages < startValue + index + 1 ? { display: "none" } : null
                }
                disabled={page === startValue + index + 1}
                onClick={() => changePage1(index)}
              >
                {startValue + index + 1}
              </button>
            ))}
          </>
        );
      }
    }
  }

  return (
    pages > 1 && (
      <div>
        <button onClick={() => changePage(-1)} disabled={page === 1}>
          &#171;
        </button>
        {middlePagination}
        <button onClick={() => changePage(1)} disabled={page === pages}>
          &#187;
        </button>
      </div>
    )
  );
});

export default Pagination;
