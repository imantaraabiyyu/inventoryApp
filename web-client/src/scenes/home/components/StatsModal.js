import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import {
  withStyles,
  CircularProgress,
  Grid,
  Box,
  Typography,
  Button
} from "@material-ui/core";
import { transactionSummary } from "../../../actions/home";
import styles from "../../styles.js";
import { Bar } from "react-chartjs-2";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

class StatsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataStats: null,
      error: null,
      modalOpen: false,
      selectedDate: new Date()
    };
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
    const year = this.state.selectedDate.getFullYear();
    const month = this.state.selectedDate.getMonth() + 1;
    const date = this.state.selectedDate.getDate();
    this.props.transactionSummary(year, month, date);
  }

  componentDidUpdate(prevProps, prevState) {
    const { dataStats, error } = this.props;
    const { selectedDate } = this.state;
    if (prevProps.dataStats !== dataStats) {
      this.setState({ dataStats: dataStats });
    } else if (error && prevProps.error !== error) {
      this.setState({ error: error });
    }

    if (prevState.selectedDate !== selectedDate) {
      this.reload();
    }
  }
  onOpen = () => {
    this.setState({ modalOpen: true });
  };
  onClose = () => {
    this.setState({ modalOpen: false });
  };

  handleDateChange = (event) => {
    this.setState({ selectedDate: event });
  };
  render() {
    const { classes, loadingStats } = this.props;
    const { modalOpen, selectedDate, dataStats } = this.state;

    const transactionBarChart = {
      datasets: [
        {
          label: "Purchase",
          backgroundColor: "rgb(233, 30, 99)",
          borderColor: "rgba(75,192,192,1)",
          data: [
            dataStats?.summary !== null ? dataStats?.summary[0]?.amount : []
          ]
        },
        {
          label: "Selling",
          backgroundColor: "rgb(74, 195, 128)",
          borderColor: "rgba(75,192,192,1)",
          data: [
            dataStats?.summary !== null && dataStats?.summary[1]?.type === 1
              ? dataStats?.summary[1]?.amount
              : []
          ]
        },
        {
          label: "Payday",
          backgroundColor: "rgb(74, 195, 189)",
          borderColor: "rgba(75,192,192,1)",
          data: [
            dataStats?.summary !== null ? dataStats?.summary[2]?.amount : []
          ]
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
      <div>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={this.onOpen}
        >
          Monthly Summary
        </Button>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={modalOpen}
          onClose={this.onClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Slide direction="down" in={modalOpen} mountOnEnter unmountOnExit>
            <div className={classes.paper}>
              {loadingStats ? (
                <CircularProgress className={classes.progressButton} />
              ) : (
                <div>
                  <Bar data={transactionBarChart} options={options} />
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography>From: {dataStats?.from}</Typography>
                      <Typography>To: {dataStats?.to}</Typography>
                    </Box>
                    <Box>
                      <Fragment>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            autoOk
                            format="MM/dd/yyyy"
                            label="Select Date"
                            value={selectedDate}
                            onChange={this.handleDateChange}
                          />
                        </MuiPickersUtilsProvider>
                      </Fragment>
                    </Box>
                  </Grid>
                </div>
              )}
            </div>
          </Slide>
        </Modal>
      </div>
    );
  }
}

StatsModal.propTypes = {
  classes: PropTypes.shape({
    modal: PropTypes.any,
    paper: PropTypes.any,
    progressButton: PropTypes.any
  }),
  dataStats: PropTypes.any,
  error: PropTypes.any,
  loadingStats: PropTypes.any,
  transactionSummary: PropTypes.any
};

const mapStateToProps = (state) => ({
  dataStats: state.Stats.dataStats,
  error: state.Stats.error,
  loadingStats: state.Stats.loadingStats
});

const mapDispatchToProps = {
  transactionSummary
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(StatsModal)
);
