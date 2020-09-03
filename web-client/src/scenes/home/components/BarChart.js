import { withStyles, Box, Grid, CircularProgress } from "@material-ui/core";
import AccessTime from "@material-ui/icons/AccessTime";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { transactionChartSummary } from "../../../actions/home";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import CardHeader from "../../../components/Card/CardHeader";
import styles from "../../styles.js";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataChart: [],
      error: null,
      selectedDate: new Date()
    };
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
    const year = this.state.selectedDate.getFullYear();
    this.props.transactionChartSummary(year);
  }

  componentDidUpdate(prevProps, prevState) {
    const { dataChart, error } = this.props;
    const { selectedDate } = this.state;
    if (prevProps.dataChart !== dataChart) {
      this.setState({ dataChart: dataChart });
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

  render() {
    const { dataChart, selectedDate } = this.state;
    const { classes, loading } = this.props;
    const transactionBarChart = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      datasets: [
        {
          label: "Purchase",
          backgroundColor: "rgb(233, 30, 99)",
          borderColor: "rgba(75,192,192,1)",
          data: dataChart[0] || []
        },
        {
          label: "Selling",
          backgroundColor: "rgb(74, 195, 128)",
          borderColor: "rgba(75,192,192,1)",
          data: dataChart[1] || []
        },
        {
          label: "Payday",
          backgroundColor: "rgb(74, 195, 189)",
          borderColor: "rgba(75,192,192,1)",
          data: dataChart[2] || []
        }
      ]
    };
    var options = {
      tooltips: {
        callbacks: {
          label: function (tooltipItem) {
            return (
              "Rp." +
              Number(tooltipItem.yLabel)
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            );
          }
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                if (parseInt(value) >= 1000) {
                  return (
                    "Rp." +
                    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  );
                } else {
                  return "Rp." + value;
                }
              }
            }
          }
        ]
      }
    };
    return (
      <Card chart>
        {loading ? (
          <CircularProgress className={classes.progressButton} />
        ) : (
          <CardHeader className={classes.barChart}>
            <Bar data={transactionBarChart} options={options} />
          </CardHeader>
        )}
        <CardBody>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Box>
              <h4 className={classes.cardTitle}>Annual Transaction Summary</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </Box>

            <Box>
              <Fragment>
                <div className="picker">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      autoOk
                      views={["year"]}
                      label="Year only"
                      value={selectedDate}
                      onChange={this.handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </Fragment>
            </Box>
          </Grid>
        </CardBody>
        <CardFooter chart>
          <div className={classes.stats}>
            <AccessTime /> campaign sent 2 days ago
          </div>
        </CardFooter>
      </Card>
    );
  }
}

BarChart.propTypes = {
  classes: PropTypes.any,
  dataChart: PropTypes.any,
  error: PropTypes.any,
  loading: PropTypes.any,
  transactionChartSummary: PropTypes.any
};

const mapStateToProps = (state) => ({
  dataChart: state.Chart.dataChart,
  error: state.Chart.error,
  loading: state.Chart.loading
});

const mapDispatchToProps = {
  transactionChartSummary
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(BarChart)
);
