import { Button } from "@mui/material";
import React from "react";

export const Pagination = ({ currentPage, onPageChange, totalPages }) => {
  const handleCheck = (page) => {
    onPageChange(page);
  };

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          className={currentPage === i ? "primary" : "default"}
          onClick={() => handleCheck(i)}
          disabled={currentPage === i}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {renderPages()}
    </div>
  );
};
