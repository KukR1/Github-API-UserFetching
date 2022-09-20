import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from '@mui/material';
import './global.css';
import axios from 'axios';
import React, { useState, ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContextData, useUserContext } from './components/useContext';

export type HistoryData = {
  input: string;
  date: string;
};

type Props = {
  children?: ReactNode;
};

export const Overview = ({ children }: Props) => {
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const values = {} as HistoryData;

  const { history, setHistory } = useContextData();
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      axios
        .get(`https://api.github.com/users/${user}/repos`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log('error', error);
          setLoading(true);
        });
    } else {
      return;
    }
  }, [user]);

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(false);
    axios
      .get(`https://api.github.com/users/${inputText}/repos`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log('Response Error: ', error.response.data);
          setLoading(true);
        }
      });
    const clonedValues = { ...values };
    clonedValues.input = inputText;
    clonedValues.date = new Date().toLocaleString();
    setHistory([...history, clonedValues]);
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  return (
    <>
      <Link className="links" to="/history">
        History
      </Link>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}
      >
        <Typography variant="h5" color="success">
          GitHub API
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          padding: '0 0 2rem 0',
        }}
      >
        <TextField
          onChange={inputHandler}
          variant="outlined"
          label="Search for a user"
        />
        <Button
          sx={{ width: 'auto', height: '2rem' }}
          variant="contained"
          disabled={!inputText}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
      {!loading
        ? data
            .filter((user, index) => index < 1)
            .map((filteredItem) => {
              return (
                <React.Fragment key={filteredItem}>
                  <CardMedia
                    src={filteredItem.owner.avatar_url}
                    sx={{
                      height: 200,
                      width: 300,
                      maxHeight: { xs: 'fit-content', md: 'fit-content' },
                      maxWidth: { xs: 'fit-content', md: 'fit-content' },
                      margin: '0 auto',
                      boxShadow:
                        'rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px;',
                    }}
                    component="img"
                  ></CardMedia>
                </React.Fragment>
              );
            })
        : null}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          alignContent: 'center',
          padding: '2rem 0',
          gap: '0.5rem',
        }}
      >
        {!loading ? (
          data.map((user, index) => {
            return (
              <React.Fragment key={index}>
                <Card
                  sx={{
                    minWidth: 275,
                    width: '50vw',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 17 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {user.name}
                    </Typography>
                    <Typography variant="h5" component="div"></Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {user?.description}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {user?.language}
                    </Typography>
                    <CardActions sx={{ padding: 0 }}>
                      <Button
                        sx={{ fontWeight: 'bold' }}
                        target="_blank"
                        variant="contained"
                        color="primary"
                        href={user.html_url}
                        size="small"
                      >
                        Go to repo
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </React.Fragment>
            );
          })
        ) : (
          <Typography variant="h5" color="error">
            No user found
          </Typography>
        )}
      </Box>
    </>
  );
};
