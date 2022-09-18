import React from "react";
import { GistCard } from "../cards/gistCard";
import Grid from "@mui/system/Unstable_Grid";
import Container from "@mui/material/Container";

export const GistResult = ({ data }: any) => {
  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={8} mt="40px">
          {data.map((x: any, i: number) => {
            return (
              <React.Fragment key={i}>
                <GistCard data={x} />
              </React.Fragment>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};
