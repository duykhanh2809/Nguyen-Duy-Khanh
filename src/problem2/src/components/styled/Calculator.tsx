import { Box, styled } from "@mui/material";

export const CalculatorContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  alignItems: "center",
  border: "1px solid black",
  borderRadius: "40px",
  padding: "36px 30px",
  backgroundColor: "white",
}));
