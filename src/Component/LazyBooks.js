import React, { Suspense } from "react";

const ManageOrders = React.lazy(() => import("./Manage.js"));

const LazyBooks = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
        <ManageOrders />
      </Suspense>
    </div>
  );
};

export default LazyBooks;
