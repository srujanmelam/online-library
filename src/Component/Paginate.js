import { useState } from "react";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination"

const Paginate = ({ items, Component }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 5;
  const pagesVisited = (pageNumber-1) * itemsPerPage;
  const displayItems = items.slice(pagesVisited, pagesVisited + itemsPerPage);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const changePage = (event,val) => {
    setPageNumber(val);
  };

  return (
    <div>
      {displayItems.map((item, i) => (
        <Grid item key={item.id} xs={12} md={6} lg={4}>
          <Component book={item} key={i}/>
        </Grid>
      ))}
      <Pagination color="primary" variant="outlined" shape="rounded" count={pageCount} page={pageNumber} onChange={changePage} />
    </div>
  );
};

export default Paginate;
