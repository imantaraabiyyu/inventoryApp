import {
  Button,
  TextField,
  CircularProgress,
  Card,
  Box,
  IconButton
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import GetAppIcon from "@material-ui/icons/GetApp";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { findAll as findItems } from "../../../actions/items";
import { findAll as findUnits } from "../../../actions/units";
import { findById, save, deleteById } from "../../../actions/stocks";
import styles from "../../styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from "sweetalert2";

class StockPage extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      form: {
        id: match.params.id,
        item: null,
        qty: "",
        unit: null
      },
      itemOptions: [],
      unitOptions: [],
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
    const {
      itemsData,
      unitsData,
      data,
      error,
      saveError,
      history,
      saveSuccess
    } = this.props;

    if (prevProps.itemsData !== itemsData) {
      this.setState({
        itemOptions: itemsData.list
      });
    }
    if (prevProps.unitsData !== unitsData) {
      this.setState({
        unitOptions: unitsData.list
      });
    }
    if (prevProps.data !== data) {
      this.setState({ form: data });
    } else if (prevProps.error !== error) {
      this.setState({ error: error });
    } else if (prevProps.saveError !== saveError) {
      this.setState({ error: saveError });
    }

    if (saveSuccess) {
      history.push("/stocks");
    }
  }

  onChange = (event) => {
    const { name, value } = event.target;
    const { form } = this.state;

    this.setState({ form: { ...form, [name]: value } });
  };

  onItemChange = (event, value) => {
    const { form } = this.state;
    this.setState({ form: { ...form, item: value } });
  };

  onUnitChange = (event, value) => {
    const { form } = this.state;
    this.setState({ form: { ...form, unit: value } });
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

  onItemOpen = () => {
    this.props.findItems();
  };

  onUnitOpen = () => {
    this.props.findUnits();
  };

  onItemTextChange = (event) => {
    const { value } = event.target;

    if (value) {
      this.props.findItems({ search: { name: value } });
    }
  };

  onUnitTextChange = (event) => {
    const { value } = event.target;

    if (value) {
      this.props.findUnits({ search: { name: value } });
    }
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { item, unit, qty } = this.state.form;

    if (item !== null && unit !== null && qty !== "") {
      this.props.save(this.state.form);
    } else {
      Swal.fire("Oops...", "Please fill all the data!", "error");
    }
  };

  render() {
    const {
      classes,
      loading,
      saveError,
      itemsLoading,
      unitsLoading
    } = this.props;
    const { form, error, itemOptions, unitOptions } = this.state;
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
                    label="ID"
                    value={form.id}
                    fullWidth
                    inputProps={{ readOnly: true }}
                  />
                </div>
              )}
              <Autocomplete
                style={{ width: 300 }}
                options={itemOptions}
                autoHighlight
                value={form.item}
                onChange={this.onItemChange}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                loading={itemsLoading}
                onOpen={this.onItemOpen}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Item"
                    variant="outlined"
                    onChange={this.onItemTextChange}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "please input keywords"
                    }}
                  />
                )}
              />

              <div className={classes.formField}>
                <TextField
                  id="qty"
                  name="qty"
                  label="Quantity"
                  value={form.qty}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 5);
                  }}
                  InputProps={{ inputProps: { min: 0, max: 10000 } }}
                  fullWidth
                  error={errorData.qty}
                  helperText={errorData.qty ? errorData.qty[0] : null}
                  onChange={this.onChange}
                  type="number"
                />
              </div>

              <Autocomplete
                style={{ width: 300 }}
                options={unitOptions}
                autoHighlight
                value={form.unit}
                onChange={this.onUnitChange}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                loading={unitsLoading}
                onOpen={this.onUnitOpen}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Unit"
                    variant="outlined"
                    onChange={this.onUnitTextChange}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "please input keywords"
                    }}
                  />
                )}
              />
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
        <Snackbar
          open={this.state.error}
          autoHideDuration={3000}
          onClose={() => this.setState({ error: false })}
        >
          <Alert
            onClose={() => this.setState({ error: false })}
            elevation={6}
            variant="filled"
            severity="error"
          >
            {error?.message}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

StockPage.propTypes = {
  classes: PropTypes.any,
  data: PropTypes.any,
  error: PropTypes.any,
  findById: PropTypes.any,
  findItems: PropTypes.any,
  findUnits: PropTypes.any,
  history: PropTypes.any,
  itemsData: PropTypes.any,
  itemsLoading: PropTypes.any,
  loading: PropTypes.any,
  match: PropTypes.any,
  save: PropTypes.any,
  saveData: PropTypes.any,
  saveError: PropTypes.any,
  saveSuccess: PropTypes.any,
  unitsData: PropTypes.any,
  unitsLoading: PropTypes.any,
  deleteById: PropTypes.func
};

const mapStateToProps = (state) => ({
  saveSuccess: state.Stock.saveSuccess,
  saveData: state.Stock.data,
  saveError: state.Stock.error,
  data: state.Stock.data,
  loading: state.Stock.loading,
  error: state.Stock.error,
  itemsData: state.Items.data,
  itemsLoading: state.Items.loading,
  itemsError: state.Items.error,
  unitsData: state.Units.data,
  unitsLoading: state.Units.loading,
  unitsError: state.Units.error,
  deleteData: state.Item.data
});

const mapDispatchToProps = {
  findItems,
  findUnits,
  save,
  findById,
  deleteById
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(StockPage)
);
