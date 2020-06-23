import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from '@material-ui/core/Container';
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

const CreateCategory = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        
        <Container maxWidth="sm">
        <h1>Create Category</h1>
      <TextField
        id="outlined-full-width"
        label="Label"
        style={{ margin: 10 }}
        placeholder="Placeholder"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      </Container>
    </div>
  );
};

export default CreateCategory;
