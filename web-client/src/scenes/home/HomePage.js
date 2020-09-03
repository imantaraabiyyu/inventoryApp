import React, { Component } from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import BarChart from "./components/BarChart";
import Highlight from "./components/Highlight";
import StockTable from "./components/StockTable";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Highlight />
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <BarChart />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <StockTable />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
