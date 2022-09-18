import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";
import Chip from "@mui/material/Chip";
import TerminalIcon from "@mui/icons-material/Terminal";
import ForkService from "../../services/forkService";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import BookIcon from "@mui/icons-material/Book";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";

export const GistCard = ({ data }: any) => {
  const [forks, setForkData] = useState([] as any);
  const [language, setLanguage] = useState([] as any);
  const [forkSection, showForkSection] = useState(false);

  const getForks = (id: any) => {
    ForkService.getForks(id)
      .then((res) => {
        setForkData(res);
        showForkSection(true);
        console.log("res", res);
      })
      .catch((err) => {
        showForkSection(false);
      });
  };

  useEffect(() => {
    let stateArr = [];
    for (let file in data.files) {
      if (stateArr.at(language) === undefined)
        stateArr.push(data.files[file].language);
    }
    setLanguage(stateArr);
  }, []);

  return (
    <>
      <Grid xs={12} md={12} lg={6}>
        <Card variant="outlined" className="definite-height">
          <CardContent>
            {Array.isArray(language) && language.length > 0
              ? language.map((language, index) => {
                  return (
                    <Chip
                      key={index}
                      variant="outlined"
                      avatar={<TerminalIcon />}
                      label={language}
                      className="chip"
                    />
                  );
                })
              : null}
            <Stack direction="row" spacing={1} alignItems="center">
              <BookIcon />
              <Typography
                color="#0266D6"
                variant="h5"
                fontWeight="600"
                component="div"
              >
                {data.description}
              </Typography>
            </Stack>

            <Typography
              color="Grey"
              variant="body1"
              fontWeight="600"
              component="div"
              mt="20px"
            >
              FILES:
            </Typography>
            <List>
              {Object.values(data.files).map((file: any, index) => {
                return (
                  <React.Fragment key={index}>
                    <ListItemButton
                      component="a"
                      href={file.raw_url}
                      key={index}
                    >
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon />
                      </ListItemIcon>
                      <ListItemText primary={file.filename} />
                    </ListItemButton>
                  </React.Fragment>
                );
              })}
            </List>

            {forkSection ? (
              <Typography
                color="Grey"
                variant="body1"
                fontWeight="600"
                component="div"
                mt="20px"
              >
                FORKS:
              </Typography>
            ) : null}
            <List className="mb-20">
              {forkSection ? (
                forks.forks && forks.forks.length !== 0 ? (
                  forks.forks
                    .map((fork: any, i: any) => (
                      <ListItemButton
                        target="_blank"
                        key={i}
                        component="a"
                        href={`https://gist.github.com/${fork.id}`}
                      >
                        <ListItemIcon>
                          <Avatar alt="Remy Sharp" src={fork.user.avatar_url} />
                        </ListItemIcon>
                        <ListItemText primary={fork?.user?.login} />
                      </ListItemButton>
                    ))
                    .slice(-3)
                ) : (
                  <p>NO FORKS</p>
                )
              ) : null}
            </List>

            {forkSection === false ? (
              <CardActions className="absolute-btn">
                <Button size="small" onClick={() => getForks(data.id)}>
                  SHOW FORKS
                </Button>
              </CardActions>
            ) : null}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
