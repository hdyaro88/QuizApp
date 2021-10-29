import { createMuiTheme } from "@material-ui/core";

export const theme= createMuiTheme({
    palette:{
      primary:{
        main:"#1976d2",
      } ,
    } ,
    typography : {
      fontFamily: [
        'Lato',
        'SF Pro Display',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        // 'Arial',
        // 'sans-serif',
        // '"Apple Color Emoji"',
        // '"Segoe UI Emoji"',
        // '"Segoe UI Symbol"',
      ].join(','),
    },
    overrides : {
      MuiButton : {
        root : {
          textTransform : "initial",
        }
      } ,
      MuiDivider : {
        root : {
          height : "0.10rem"
        }
      },
      MuiPaper : {
        root : {
          backgroundColor : "#FFFFFF",
        } ,
      },
    } ,
    props : {
      MuiButton : {
        disableRipple : true
      }
    }
  
  });