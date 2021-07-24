import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import SearchBar from "material-ui-search-bar";
import { grommet, Box, Grid, Grommet } from "grommet";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const App = () => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  const getProductData = async () => {
    try {
      const data = await axios.get("https://city-mobil.ru/api/cars");

      const cars = data.data.cars;
      console.log(cars);

      const carsFiltered = [];

      for (let i = 0; i < Object.keys(cars).length; i++) {
        carsFiltered[i] = {};

        carsFiltered[i].markAndModel = `${cars[i].mark} ${cars[i].model}`;
        carsFiltered[i].tariffs = cars[i].tariffs;

        // carsFiltered[i].push({
        //   markAndModel: `${cars.mark} ${cars.model}`,
        //   tariffs: cars.tariffs,
        // });

        console.log(1);
      }

      // carsFiltered.markAndModel = `${cars.mark} ${cars.model}`;
      // carsFiltered.tariffs = cars.tariffs;

      console.log(carsFiltered);

      setProduct(carsFiltered);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  function handleClick(a) {
    console.log(a);
  }

  return (
    <Grommet theme={grommet} full>
      <Grid fill rows={["auto", "flex", "auto"]}>
        <Box tag="header" background="brand" pad="small">
          Header
        </Box>
        <Box direction="row" justify="left">
          <Box width="224px" margin-right="40px" background="light-2">
            sidebar
          </Box>
          <Box overflow="auto" width="100%">
            <Paper>
              <SearchBar
                width="60%"
                className="searchbar"
                onChange={(e) => {
                  console.log(e);
                  setSearch(e);
                }}
              />
              <TableContainer className="tableContainer" height="80%">
                <Table className="table" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Марка и Модель</TableCell>
                      <TableCell align="right">Эконом</TableCell>
                      <TableCell align="right">Комфорт</TableCell>
                      <TableCell align="right">Комфорт +</TableCell>
                      <TableCell align="right">Минивен</TableCell>
                      <TableCell align="right">Бизнес</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {product
                      .filter((item) => {
                        if (search == "") {
                          return item;
                        } else if (
                          item.markAndModel
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return item;
                        }
                      })
                      .map((item) => {
                        console.log(item);

                        const econom = item.tariffs.Эконом
                          ? item.tariffs.Эконом.year
                          : "-";
                        const comfort = item.tariffs.Комфорт
                          ? item.tariffs.Комфорт.year
                          : "-";
                        const comfortPlus = item.tariffs["Комфорт+"]
                          ? item.tariffs["Комфорт+"].year
                          : "-";
                        const miniwan = item.tariffs.Минивен
                          ? item.tariffs.Минивен.year
                          : "-";
                        const business = item.tariffs.Бизнес
                          ? item.tariffs.Бизнес.year
                          : "-";

                        // console.log(item.tariffs.Эконом);
                        // console.log(item.tariffs.Комфорт);
                        // console.log(item.tariffs["Комфорт+"]);
                        // console.log(item.tariffs.Минивен);
                        // console.log(item.tariffs.Бизнес);

                        return (
                          <TableRow
                            key={item.id}
                            onClick={() => handleClick(item)}
                          >
                            <TableCell component="th" scope="row">
                              {item.markAndModel}
                            </TableCell>
                            <TableCell align="right">{econom}</TableCell>
                            <TableCell align="right">{comfort}</TableCell>
                            <TableCell align="right">{comfortPlus}</TableCell>
                            <TableCell align="right">{miniwan}</TableCell>
                            <TableCell align="right">{business}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <Box pad="small" background="dark-1">
              footer
            </Box>
          </Box>
        </Box>
        <Box tag="footer" pad="small" background="dark-1">
          footer
        </Box>
      </Grid>
    </Grommet>
  );
};

export default App;
