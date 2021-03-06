import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
//import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import PieChart from "./makePieChart";
import IssueDataService from "../../../services/IssueService";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function MainMenu(){
 // eslint-disable-next-line react-hooks/rules-of-hooks
 const classes = useStyles();
 const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
 const handleclick=()=> {
   console.log("is clickd");
 }


  let datas=[];
  let name=[];

  const retrieveIssues = () => {
    IssueDataService.getAll()
      .then(response => {
        // setListIssue(response.data);
        // console.log(response.data);
        response.data.forEach(ele => {
          if (name.indexOf(ele.nameProject) === -1){
            name.push(ele.nameProject);
            datas.push(1);
          }else{
            var i = name.indexOf(ele.nameProject);
            datas[i] = datas[i]+ 1;
          }
        });

      }).catch(e => {
        console.log(e);
      });
  }; 
  
  useEffect(() => {
    retrieveIssues();
  }, []);
return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Chart */}
         <Grid item xs={12} md={4} lg={4}>
           <Paper className={fixedHeightPaper}  onClick={handleclick}>
           Project:You track 
           <PieChart
           
             datas = {datas}
             name = {name}
           />
           </Paper>
           </Grid>
         {/* Recent Deposits */}
         <Grid item xs={12} md={4} lg={3}>
           <Paper className={fixedHeightPaper}>Issues per Project</Paper>
           </Grid>
          {/* Recent Orders */}
         <Grid item xs={12} md={4} lg={3}>
           <Paper className={fixedHeightPaper}>Board Production </Paper>
           </Grid>
         <Grid item xs={12} md={4} lg={5}>
           <Paper className={fixedHeightPaper}>Assignee</Paper>
           </Grid>
         <Grid item xs={12} md={8} lg={5}>
           <Paper className={fixedHeightPaper}>Due Date Calender</Paper>
           </Grid>
      </Grid>
      
    </Container>
  
);
 

}

