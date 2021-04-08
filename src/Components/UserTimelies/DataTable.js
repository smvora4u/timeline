import React from "react";
import { MuiThemeProvider, createMuiTheme, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import TableIcons from "./TableIcons";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { toast } from "react-toastify";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "rgb(71,72,110)",
    },
  },
});
export default function DataTable({ setSelectedRows }) {
  const currentUser = firebase.auth().currentUser;
  const [isFetching, setFetching] = React.useState(true);
  const [columns, setColumns] = React.useState([
    {
      title: "Image",
      field: "imageURL",
      render: (rowData) => {
        return <img style={{ height: 50 }} src={rowData["imageURL"]} />;
      },
    },
    { title: "Timeline", field: "username", type: "text" },
    { title: "Date", field: "date", type: "date" },
    { title: "Time", field: "time", type: "time" },
  ]);
  //timeline_id
  //user_id
  const [rowData, setRowData] = React.useState([]);

  React.useEffect(() => {
    const reference = "Users/" + currentUser.uid + "/Timelines";
    firebase
      .database()
      .ref(reference)
      .on("value", function (snapshot) {
        if (snapshot.val()) {
          const data = [];
          Object.keys(snapshot.val()).forEach((e) => {
            data.push(snapshot.val()[e]);
          });
          setRowData(data);
        } else {
          setRowData([]);
        }
        setFetching(false);
      });
    return () => {
      firebase.database().ref(reference).off("value");
    };
  }, [currentUser.uid]);
  const UpdateData = async (newData) => {
    const user_data_edit_ref =
      "Users/" + currentUser.uid + "/Timelines/" + newData["timeline_id"];
    try {
      firebase
        .database()
        .ref(user_data_edit_ref)
        .update(newData)
        .then(() => {
          toast.success("Updated Successfully");
        });
    } catch (e) {
      toast.error("Failed updating.");
    }
  };
  const DeleteData = async (deleteData) => {
    console.log(deleteData);
    const user_data_delete_ref =
      "Users/" + currentUser.uid + "/Timelines/" + deleteData["timeline_id"];
    const data_delete_ref =
      "Timelines/" + currentUser.uid + "/" + deleteData["timeline_id"];

    try {
      await firebase.database().ref(user_data_delete_ref).remove();
      await firebase
        .database()
        .ref(data_delete_ref)
        .remove()
        .then(() => {
          toast.success("Successfully Deleted !");
        });
    } catch (e) {
      toast.error("Delete Failed !");
    }
  };
  const SelectedData = (rows) => {
    setSelectedRows(rows);
  };
  return (
    <MuiThemeProvider theme={theme}>
      <MaterialTable
        title="My Timelines"
        localization={{
          pagination: {
            labelRowsPerPage: 20,
          },
        }}
        options={{
          pageSize: 20,
          // columnsButton: true,
          filtering: true,
          // exportButton: true,
          selection: true,
        }}
        isLoading={isFetching}
        columns={columns}
        data={rowData}
        icons={TableIcons}
        onSelectionChange={(rows) => SelectedData(rows)}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              UpdateData(newData).then(() => {
                resolve();
              });
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              DeleteData(oldData).then(() => {
                resolve();
              });
            }),
        }}
      />
    </MuiThemeProvider>
  );
}
