import React, { Component } from 'react';
import { Grid, Row, Col, Panel, Input} from 'react-bootstrap';
import Dropzone from 'react-dropzone';

function splitFile(data) {
  return data.split('}').map(entry => {
    return entry.split('\n');
  });
}

function getContentForKey(record, key) {
  const re = /= "(.+[^,|"])"/gi;
  let rows = record.filter(r => r.indexOf(key) !== -1);
  return rows.map(row => {
    const text = re.exec(row);
    return text[1] || '';
  });
}

export default class App extends Component {

  state = {
    records: []
  }

  constructor(props) {
    super(props);
  }

  onDrop(files) {

    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target.readyState == FileReader.DONE) {
        const records = splitFile(event.target.result);
        this.setState({ records: records });
      }
    };

    files.forEach(file => {
      reader.readAsBinaryString(file);
    });
  }

  renderPanels() {
    return this.state.records.map(record => {
      console.log(getContentForKey(record, 'title')[0]);
      return (
        <Panel>
          <h2>{getContentForKey(record, 'title')[0]}</h2>
        </Panel>
      );
    });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={6} xsOffset={3}>
            <Dropzone ref="dropzone" onDrop={this.onDrop.bind(this)}>
              <div>Drop the file you want to convert here</div>
            </Dropzone>
          </Col>
        </Row>
        <Row>
          {this.renderPanels()}
        </Row>
      </Grid>
    );
  }
}
