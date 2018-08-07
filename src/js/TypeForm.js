import React from "react";
import { ReactTypeformEmbed } from "../components";

const TypeForm = () => {
  return (
    <div className="ExampleWidget">
      <ReactTypeformEmbed
        popup={false}
        url={"https://zaynjarvis.typeform.com/to/msw805"}
        hideHeaders={true}
        hideFooters={true}
      />
    </div>
  );
};

export default TypeForm;
