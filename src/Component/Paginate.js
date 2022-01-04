import { useState } from "react";
import { Grid, Box } from "@material-ui/core";
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
      <Box 
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px 10px 10px 10px",
            marginLeft: "285px",
            marginRight: "50px",
          }}
        >
          <Grid container spacing={5} alignItems="center">
            {displayItems.map((item, i) => (
              <Grid item key={i} key={item.id} xs={10} md={9} lg={9}>
                <Component book={item} key={i}/>
              </Grid>        
            ))}
          </Grid>
        </Box>
      <div style={{ marginTop: 30}}></div>
      <Box
        sx={{
          marginLeft: "650px",
        }}
      >
        <Pagination 
          color="primary" 
          variant="outlined" 
          shape="rounded" 
          count={pageCount} 
          page={pageNumber} 
          onChange={changePage} 
        />
      </Box>
      <div style={{ marginBottom: 50}}></div>
    </div>
  );
};

export default Paginate;
