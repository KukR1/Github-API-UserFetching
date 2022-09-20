import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import './global.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContextData, useUserContext } from './components/useContext';

const History = () => {
  const history = useContextData();
  const { setUser } = useUserContext();
  let navigate = useNavigate();
  const values = Object.values(history.history);

  const handleCellClick = (event: React.MouseEvent<HTMLElement>) => {
    setUser((event.target as Element).innerHTML);
    navigate('/');
  };

  return (
    <>
      <Link className="links" to="/">
        Overview
      </Link>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}
      >
        <Typography variant="h5" color="success">
          Search History
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {values.length > 0 ? (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 'fit-content' }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead sx={{ backgroundColor: '#55baf7' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: '600', color: '#FFFF' }}>
                    History
                  </TableCell>
                  <TableCell sx={{ fontWeight: '600' }} align="right">
                    User Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: '600' }} align="right">
                    Date searched
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {values
                  .sort(function (a, b) {
                    return b.date.localeCompare(a.date);
                  })
                  .map((row) => (
                    <TableRow
                      key={row.date}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        backgroundColor: '#cdcccc',
                      }}
                    >
                      <TableCell
                        sx={{
                          cursor: 'pointer',
                          color: '#0b85cf',
                          fontWeight: '600',
                        }}
                        onClick={handleCellClick}
                        component="th"
                        scope="row"
                      >
                        {row.input}
                      </TableCell>
                      <TableCell align="right">{row.input}</TableCell>
                      <TableCell align="right">
                        {row.date.split(',')[1]} {/* displaying only time  */}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography sx={{ paddingTop: '10vw' }} variant="h5" color="error">
            No data yet :/
          </Typography>
        )}
      </Box>
    </>
  );
};

export default History;
