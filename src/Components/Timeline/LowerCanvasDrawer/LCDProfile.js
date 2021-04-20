import React from "react";

import "./LCDProfile.css";

const LCDProfile = (props) => {
  const profileColor = props.group.color;
  const expandCanvasItemHandler = (event) => {
    props.expandCanvasItem(props.group);
  };

  return (
    <div className="canvasItem profile">
      <div
        className="canvasItemTitle"
        style={{ backgroundColor: profileColor.toString() }}
      >
        <h4>
          Profile
          <img
            alt="female"
            src={require("../../../Assets/femaleIcon.svg").default}
          />
        </h4>
      </div>
      <div className="canvasItemDetail">
        <div className="topEdge">
          <span className="arrow" onClick={expandCanvasItemHandler}>
            <span className="arrowBorder">
              <span className="arrowInner"></span>
            </span>
            <span className="arrowConnector"></span>
          </span>
        </div>
        <div className="detail">
          <div style={{ flex: "0.66 1 0%" }}>
            <div
              style={{
                borderBottom: "2px solid blue",
                marginBottom: "5px",
                fontSize: "18px",
              }}
            >
              <span style={{ display: "inline-block", width: "110px" }}>
                Name
              </span>
              <span>{props.group.title}</span>
            </div>
            <table>
              <tbody>
                <tr>
                  <td style={{ paddingBottom: "10px" }}>Brithdate</td>
                  <td
                    style={{
                      borderLeft: "2px solid #859fcc",
                      paddingLeft: "15px",
                    }}
                  >
                    {props.group.date}
                  </td>
                  <td
                    style={{
                      borderLeft: "2px solid #859fcc",
                      paddingLeft: "10px",
                    }}
                  >
                    22
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingBottom: "10px" }}>Location</td>
                  <td
                    style={{
                      borderLeft: "2px solid #859fcc",
                      paddingLeft: "15px",
                    }}
                    colSpan="2"
                  >
                    Pakistan/Italy/USA/india
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingBottom: "10px" }}>Career:</td>
                  <td
                    style={{
                      borderLeft: "2px solid #859fcc",
                      paddingLeft: "15px",
                    }}
                    colSpan="2"
                  >
                    Nurse
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingBottom: "10px" }}>Qualification:</td>
                  <td
                    style={{
                      borderLeft: "2px solid #859fcc",
                      paddingLeft: "15px",
                    }}
                    colSpan="2"
                  >
                    Degree
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingBottom: "10px" }}>Network:</td>
                  <td
                    style={{
                      borderLeft: "2px solid #859fcc",
                      paddingLeft: "15px",
                    }}
                    colSpan="2"
                  >
                    The Brits School
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingBottom: "10px" }}>Relations:</td>
                  <td
                    style={{
                      borderLeft: "2px solid #859fcc",
                      paddingLeft: "15px",
                    }}
                    colSpan="2"
                  >
                    RSJ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ flex: "0.34 1 0%", padding: "25px 0 0 10px" }}>
            <img
              alt="Profile"
              style={{ width: "100%", borderRadius: "7px" }}
              src={props.group.imageURL}
            />
          </div>
        </div>
        <div className="bottomEdge"></div>
      </div>
    </div>
  );
};

export default LCDProfile;
