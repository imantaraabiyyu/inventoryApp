import {
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
  IconButton,
  Box
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import GetAppIcon from "@material-ui/icons/GetApp";
import PropTypes from "prop-types";
import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { findById, save, deleteById } from "../../../actions/transactions";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "../../styles.js";

class TransactionPage extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      form: {
        id: match.params.id,
        type: "",
        amount: "",
        description: ""
      },
      userInput: {
        value: ""
      },
      error: false
    };
  }

  componentDidMount() {
    const { form } = this.state;
    if (form.id) {
      this.props.findById(form.id);
    }
  }

  componentDidUpdate(prevProps) {
    const { saveError, data, error, history, saveSuccess } = this.props;

    if (prevProps.data !== data) {
      this.setState({ form: data });
    } else if (prevProps.saveError !== saveError) {
      this.setState({ error: true });
    } else if (prevProps.error !== error) {
      this.setState({ error: error });
    }
    if (saveSuccess) {
      history.push("/transactions");
    }
  }

  onChange = (event) => {
    const { name, value } = event.target;
    const { form } = this.state;

    this.setState({ form: { ...form, [name]: value } });
  };

  inputChangedHandler = (values) => {
    this.setState({
      userInput: values
    });
  };

  onDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it"
    }).then((result) => {
      if (result.value) {
        this.props.deleteById(this.state.form.id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your data is safe :)", "error");
      }
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    const { type, amount, description } = this.state.form;

    if (type !== "" && amount !== "" && description !== "") {
      this.props.save({
        ...this.state.form,
        amount: +this.state.userInput.value.replace(/\D/g, "")
      });
    } else {
      Swal.fire("Oops...", "Please fill all the data!", "error");
    }
  };

  render() {
    const { classes, loading, saveError } = this.props;
    const { form, error } = this.state;
    const errorData = saveError?.data || {};

    return (
      <div error={error}>
        {!loading ? (
          <Card className={classes.card}>
            {form.id ? (
              <Box display="flex" flexDirection="row-reverse">
                <IconButton className={classes.icon} onClick={this.onDelete}>
                  <DeleteIcon color={"secondary"} />
                </IconButton>
              </Box>
            ) : (
              ""
            )}
            <form
              noValidate
              className={classes.form}
              autoComplete="off"
              onSubmit={this.onSubmit}
            >
              {form.id && (
                <div className={classes.formField}>
                  <TextField
                    id="id"
                    name="id"
                    label="Id"
                    value={form.id}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </div>
              )}

              <div className={classes.formField}>
                <InputLabel id="Type">Type</InputLabel>
                <Select
                  style={{ minWidth: 200 }}
                  labelId="Type"
                  id="Type"
                  value={form.type}
                  onChange={this.onChange}
                  name="type"
                >
                  <MenuItem value={0}>Purchase</MenuItem>
                  <MenuItem value={1}>Selling</MenuItem>
                  <MenuItem value={2}>Payday</MenuItem>
                </Select>
              </div>

              <div className={classes.formField}>
                <Typography
                  variant="h6"
                  component="h6"
                  className={classes.amountText}
                >
                  Amount
                </Typography>
                <NumberFormat
                  name="amount"
                  inputmode="numeric"
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"Rp."}
                  fullWidth
                  className={classes.numberInput}
                  onChange={this.onChange}
                  onValueChange={this.inputChangedHandler}
                  value={form.amount}
                />
              </div>

              <div className={classes.formField}>
                <TextField
                  id="description"
                  multiline
                  rowsMax="4"
                  name="description"
                  label="Description"
                  error={errorData.name}
                  value={form.description}
                  helperText={errorData.name ? errorData.name[0] : null}
                  onChange={this.onChange}
                  fullWidth
                />
              </div>
              <div className={classes.formAction}>
                <Button
                  className={classes.buttonBack}
                  variant="contained"
                  onClick={this.onBack}
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
                <Button
                  className={classes.formButton}
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={<GetAppIcon />}
                  disable={loading}
                >
                  Save
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          <CircularProgress className={classes.progressButton} />
        )}
      </div>
    );
  }
}

TransactionPage.propTypes = {
  classes: PropTypes.any,
  data: PropTypes.any,
  error: PropTypes.any,
  findById: PropTypes.any,
  history: PropTypes.any,
  loading: PropTypes.any,
  match: PropTypes.any,
  save: PropTypes.any,
  saveData: PropTypes.any,
  saveSuccess: PropTypes.any,
  saveError: PropTypes.any,
  deleteById: PropTypes.func
};

const mapStateToProps = (state) => ({
  saveSuccess: state.Transaction.saveSuccess,
  saveData: state.Transaction.data,
  saveError: state.Transaction.error,
  data: state.Transaction.data,
  loading: state.Transaction.loading,
  error: state.Transaction.error,
  deleteData: state.Item.data
});

const mapDispatchToProps = {
  save,
  findById,
  deleteById
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(TransactionPage)
);
