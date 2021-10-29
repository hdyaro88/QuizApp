import { Avatar, Fade, makeStyles, Paper } from "@material-ui/core";
import { useEffect } from "react";
import invite from "../Assets/Invite.png";
import { TitleText16D, TitleText16L } from "../HelperFiles/Custom";
import { data } from "../SampleData";
const useStyle = makeStyles((theme) => ({
  brand: {
    borderRadius: "10px",
    backgroundColor: "#FFE6DB",
    height: "200px",
    width: "350px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "relative",
  },
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    margin: "auto",
  },
  influencer: {
    borderRadius: "10px",
    backgroundColor: "#FFE6DB",
    height: "200px",
    width: "350px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "relative",
  },
}));
const Invite = ({ inviteAccepted, setInviteAccepted }) => {
  const classes = useStyle();
  useEffect(() => {
      const timeout = setTimeout(() => {
        setInviteAccepted(true);
      }, 1000)
      return () => clearTimeout(timeout)
  })
  return (
    <Fade in={!inviteAccepted} unmountOnExit mountOnEnter>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{ height: "45%", maxHeight: "300px", position: "relative", display: "flex", alignItems: "flex-end" }}
        >
          <Paper className={classes.brand} elevation={0}>
            <div style={{ position: "absolute", top: "-30%" }}>
              <Avatar className={classes.avatar} />
              <TitleText16L style={{ fontWeight: "400", textAlign: "center" }}>{data?.brand?.username}</TitleText16L>
            </div>

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
        </div>
        <div style={{ margin: "2rem 0" }}>
          <img src={invite} />
        </div>
        <div style={{ height: "45%", maxHeight: "300px", position: "relative", display: "flex", alignItems: "center" }}>
          <Paper className={classes.influencer} elevation={0}>
            <div style={{ position: "absolute", top: "-30%" }}>
              <Avatar className={classes.avatar} />
              <TitleText16L style={{ fontWeight: "400", textAlign: "center" }}>{data?.brand?.username}</TitleText16L>
            </div>

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
        </div>
      </div>
    </Fade>
  );
};
export default Invite;
