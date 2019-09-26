import React from "react";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";

const Page404 = () => (
  <div className="text-center mt-7">
    <h1 className="display-1 font-weight-bold">403</h1>
    <p className="h1">Forbidden.</p>
    <p className="h2 font-weight-normal mt-3 mb-5">
      You are not authorized to access this page.
    </p>
    <Link to="/">
      <Button color="primary" size="lg">
        Return to website
      </Button>
    </Link>
  </div>
);

export default Page404;
