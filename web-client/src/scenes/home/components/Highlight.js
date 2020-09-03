import { CircularProgress, withStyles, Typography } from "@material-ui/core";
import {
  Accessibility,
  AccountBalance,
  DateRange,
  Details,
  Filter9Plus,
  MonetizationOn
} from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { transactionCurrentSummary } from "../../../actions/home";
import styles from "../../../assets/jss/material-dashboard-react/views/dashboardStyle";
import Card from "../../../components/Card/Card";
import CardFooter from "../../../components/Card/CardFooter";
import CardHeader from "../../../components/Card/CardHeader";
import CardIcon from "../../../components/Card/CardIcon";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import StatsModal from "./StatsModal";
class Highlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCurrentStats: null,
      error: null,
      modalOpen: false,
      selectedDate: new Date(new Date().getFullYear(), 11, 31)
    };
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
    this.props.transactionCurrentSummary();
  }

  componentDidUpdate(prevProps, prevState) {
    const { dataCurrentStats, error } = this.props;
    const { selectedDate } = this.state;

    if (prevProps.dataCurrentStats !== dataCurrentStats) {
      this.setState({ dataCurrentStats: dataCurrentStats });
    } else if (error && prevProps.error !== error) {
      this.setState({ error: error });
    }

    if (prevState.selectedDate !== selectedDate) {
      this.reload();
    }
  }

  handleDateChange = (event) => {
    this.setState({ selectedDate: event });
  };

  onModalOpen = () => {
    this.setState({ modalOpen: true });
    console.log(this.state.modalOpen);
  };
  render() {
    const { classes, loading } = this.props;
    const { dataCurrentStats } = this.state;

    const dataHighlight = [
      {
        icon: AccountBalance,
        color: "danger",
        name: "Purchase",
        amount: dataCurrentStats?.summary[0].amount,
        total: dataCurrentStats?.summary[0].count
      },
      {
        icon: MonetizationOn,
        color: "success",
        name: "Selling",
        amount: dataCurrentStats?.summary[1].amount,
        total: dataCurrentStats?.summary[1].count
      },
      {
        icon: Accessibility,
        color: "info",
        name: "Payday",
        amount: dataCurrentStats?.summary[2].amount,
        total: dataCurrentStats?.summary[2].count
      }
    ];
    return (
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <Details />
              </CardIcon>
              <p className={classes.cardCategory}>
                Current Transaction Summary
              </p>
              <Typography>Other Summary Option</Typography>
              <StatsModal />
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                from: {dataCurrentStats?.from} - to: {dataCurrentStats?.to}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        {dataHighlight.map((data, index) => (
          <GridItem xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardHeader color={data.color} stats icon>
                <CardIcon color={data.color}>
                  <data.icon />
                </CardIcon>
                {loading ? (
                  <CircularProgress className={classes.progressButton} />
                ) : (
                  <div>
                    <p className={classes.cardCategory}>{data.name}</p>
                    <h3 className={classes.cardTitle}>
                      <NumberFormat
                        value={data.amount}
                        displayType={"text"}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        prefix={"Rp."}
                        renderText={(value) => <div>{value}</div>}
                      />
                    </h3>
                  </div>
                )}
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Filter9Plus />
                  Total: {data.total}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </GridContainer>
    );
  }
}

Highlight.propTypes = {
  classes: PropTypes.any,
  dataCurrentStats: PropTypes.any,
  error: PropTypes.any,
  loading: PropTypes.any,
  transactionCurrentSummary: PropTypes.any
};

const mapStateToProps = (state) => ({
  dataCurrentStats: state.Stats.dataCurrentStats,
  error: state.Stats.error || state.Stats.error,
  loading: state.Stats.loading || state.Stats.loading
});

const mapDispatchToProps = {
  transactionCurrentSummary
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(Highlight)
);
