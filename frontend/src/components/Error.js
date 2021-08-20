import React from "react";

const Error = ({ Title, Content }) => {
  return (
    <div>
      <div class="ui warning message transition visible">
        <div></div>
        <div class="header">{Title}</div>
        {Content}
      </div>
    </div>
  );
};

export default Error;
