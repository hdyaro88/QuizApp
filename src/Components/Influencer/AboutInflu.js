import { Avatar, makeStyles, Paper } from "@material-ui/core";
import { TitleText18, TitleText16L, TitleText16D } from "../HelperFiles/Custom";
const useStyle = makeStyles((theme) => ({
  root: {
    borderRadius: "0",
    width: "50%",
    height: "100%",
    backgroundColor: "#FFE6DB",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  Avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: "1rem auto",
  },
}));
const AboutInfu = ({data}) => {
  const classes = useStyle();
  return (
    <Paper className={classes.root} elevation={0}>
      <TitleText18 style={{ fontWeight: "500", textAlign: "center" }}>What We Know About You ...</TitleText18>
      <Avatar className={classes.Avatar} />
      <TitleText16L style={{ fontWeight: "400", textAlign: "center" }}>{data?.username}</TitleText16L>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ margin: "1rem" }}>
          <TitleText16L>Followers</TitleText16L>
          <TitleText16D align="center">48</TitleText16D>
        </div>
        <div style={{ margin: "1rem" }}>
          <TitleText16L>Followers</TitleText16L>
          <TitleText16D align="center">48</TitleText16D>
        </div>
        <div style={{ margin: "1rem" }}>
          <TitleText16L>Followers</TitleText16L>
          <TitleText16D align="center">48</TitleText16D>
        </div>
      </div>
    </Paper>
  );
};
export default AboutInfu;
