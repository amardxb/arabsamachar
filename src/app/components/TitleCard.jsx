import React from "react";

export default function TitleCard({ className, title }) {
  return (
   
      <h3 role="heading" className={className}>
        {title}
      </h3>
     
  );
}
