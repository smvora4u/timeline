import React from 'react';
import { Container, Row, Col, Image, Media } from 'react-bootstrap';
import './Item.css';
import { Card, CardHeader, Typography, CardContent, Grid } from "@material-ui/core";

export default function ItemTemplate({ item }) {
  const { group, content, start, end } = item
  const { description, end_date, end_time, id, name, start_date, start_time, title } = JSON.parse(content)
  const [height, setHeight] = React.useState(14)

  const processTitle = (text) => {
    if (!text) {
      return ''
    }
    if (text.length <= 26) {
      return text
    }

    let text_array = []
    var i = 0

    console.log("Text Length: ", text.length)

    for (i; i < text.length; i += 26) {
      let temp_text = ''
      if ((i + 26) < text.length) {
        temp_text = text.substring(i, i + 26).trim()
      } else {
        temp_text = text.substring(i, text.length).trim()
      }
      text_array.push(temp_text)
    }

    return text_array.map(text => (
      <>
        <span>{text}</span>
        <br />
      </>
    ))

    // console.log("Text Array: ", text_array)
    // let new_text = text.substr(0, 26).trim()
    // new_text += '...'
    // return new_text
  }

  const processDescription = (text) => {
    if (!text) {
      return ''
    }
    if (text.length <= 45) {
      return text
    }

    let text_array = []
    var i = 0

    // console.log("Text Length: ", text.length)

    for (i; i < text.length; i += 45) {
      let temp_text = ''
      if ((i + 45) < text.length) {
        temp_text = text.substring(i, i + 45).trim()
      } else {
        temp_text = text.substring(i, text.length).trim()
      }
      text_array.push(temp_text)
    }

    return text_array.map(text => (
      <div>
        <span className="ItemDescription">{text}</span>
      </div>
    ))
    // let new_text = text.substr(0, 45).trim()
    // new_text += '...'
    // return new_text
  }
  // id="ItemContainer" style={{ minHeight: height + 'vh' }}
  return (
    <div id="ItemContainer" style={{ minHeight: height + 'vh' }}>
      <Container fluid>
        <Row>
          <Media>
            <Image
              width={64}
              height={64}
              className="mr-3"
              src={require('../../../Assets/person.png')}
              roundedCircle
              alt="Generic placeholder"
            />
            <Media.Body>
              <Row>
                <Col className="ItemDate">{start.toDateString()}</Col>
                <Col />
                <Col className="ItemPersonName">{name}</Col>
              </Row>
              <Row>
                <Col md={{ span: 4, offset: 0 }} className="ItemName">
                  {processTitle(title)}
                </Col>
              </Row>
              <Row>
                <Col>
                  {processDescription(description)}
                </Col>
                <Col></Col>
                <Col></Col>
              </Row>
            </Media.Body>
          </Media>

        </Row>
      </Container>
    </div>
  )
}

{/* <Grid container>
        <Grid container justify='center'>
          <Grid item>
            <img
              style={{ maxHeight: 70, maxWidth: 70 }}
              className="mr-3"
              src={require('../../../Assets/person.png')}
              alt="Generic placeholder"
            />
          </Grid>

          <Grid item>
            <Grid container lg xs sm md>
              <Grid item lg>
                <span className="ItemDate">{start.toDateString()}</span>
              </Grid>
              <Grid item>
                <span className="ItemPersonName">{name} </span>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <span className="ItemName">{title} </span>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item>
                <p >{description } </p>
              </Grid>
            </Grid>

          </Grid>

        </Grid>
      </Grid> */}
