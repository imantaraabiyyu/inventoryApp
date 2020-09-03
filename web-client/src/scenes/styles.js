const styles = (theme) => ({
  root: {
    display: "flex"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: 600,
    minHeight: 300
  },
  gridListContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px"
  },
  gridList: {
    width: 800,
    height: 450
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  link: {
    textDecoration: "none"
  },
  table: {
    display: "table",
    tableLayout: "fixed",
    width: "100%"
  },
  form: {
    padding: 30
  },
  progressButton: {
    margin: "50%"
  },
  card: {
    borderRadius: 15,
    backgroundColor: "rgba(234, 162, 72, 0.7)",
    color: theme.palette.primary.contrastText,
    boxShadow: "none"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  formField: {
    padding: theme.spacing(2)
  },
  buttonContainerRight: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    boxShadow: "none"
  },
  buttonReload: {
    marginRight: "10px"
  },
  buttonBack: {
    backgroundColor: "#e8ce32"
  },
  formAction: {
    marginTop: 30,
    display: "flex",
    justifyContent: "space-between"
  },
  amountText: {
    color: "#000000a1"
  },
  numberInput: {
    minWidth: 300
  },
  barChart: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
  }
});

export default styles;
