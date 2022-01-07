import React, { Suspense } from "react";

const YourStatus = React.lazy(() =>  import("./Status.js"));

const LazyOrders = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
        <YourStatus />
      </Suspense>
    </div>
  );
};

export default LazyOrders;
