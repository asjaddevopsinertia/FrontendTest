import React, { useState } from "react";
import UserServices from "../../services/userServices";
import TextField from "@mui/material/TextField";
import { GistResult } from "./gistResult";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

const InputArea = () => {
  const [username, setUserName] = useState("");
  const [gistData, setGistData] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const searchGists = () => {
    setLoading(true);
    if (username) {
      UserServices.getDataByUsername(username)
        .then((res) => {
          if (res.length === 0) {
            setError(true);
            setErrorMsg("No data Found");
            setLoading(false);
          }
          else{
          setError(false);
          setLoading(false);
          setGistData(res);
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
        });
    } else {
      setLoading(false);
      setError(true);
      setErrorMsg("Username is required");
    }
  };

  return (
    <>
      <div className="pt-[64px]">
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            textAlign: "center",
            margin: "0 auto",
          }}
        >
          <Typography variant="h4" gutterBottom mt="25px">
            SEARCH FOR GISTS
          </Typography>

          <Stack direction="row" spacing={0}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Search"
              onChange={(e) => setUserName(e.target.value)}
              required
              className="textField"
            />
            <LoadingButton
              loading={loading ? true : false}
              loadingPosition="start"
              startIcon={<SearchIcon />}
              variant="contained"
              onClick={() => searchGists()}
            >
              Search
            </LoadingButton>
          </Stack>

          {error ? <Alert severity="error">{errorMsg}</Alert> : null}
        </Box>
      </div>

      {gistData.length !== 0 ? <GistResult data={gistData} /> : null}
    </>
  );
};

export default InputArea;
