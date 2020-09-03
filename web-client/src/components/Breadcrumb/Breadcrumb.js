import routes from "../../configs/routes";
import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles(styles);

export default function CustomBreadcrumbs() {
  const breadcrumbs = useBreadcrumbs(routes);
  const classes = useStyles();

  return (
    <Card className={classes.breadcrumbCard}>
      <CardContent>
        <Breadcrumbs
          className={classes.mybreadcrumb}
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs.map(({ match, breadcrumb }) => (
            <span key={match.url}>
              <NavLink className={classes.linkBreadcrumb} to={match.url}>
                {breadcrumb}
              </NavLink>
            </span>
          ))}
        </Breadcrumbs>
      </CardContent>
    </Card>
  );
}
