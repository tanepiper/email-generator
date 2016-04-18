import React, { Component } from 'react';
import { Navbar, Grid, Row, Col, Panel, Input} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import CopyToClipboard from 'react-copy-to-clipboard';

function splitFile(data) {
  return data.split('@article').filter(f => f).map(entry => {
    console.log(entry)
    return entry.split('\n');
  });
}

function getContentForKey(record, key) {
  const re = /= "(.+[^,|"])"/gi;
  let rows = record.filter(r => r.indexOf(key) !== -1);
  return rows.map(row => {
    const textResults = re.exec(row);
    let text = '';
    if (textResults[1]) {
      text = textResults[1]
      .replace(/“/g, '"')
      .replace(/”/g, '"')
      .trim();
    }
    return text;
  });
}

function generateHTML(record) {
  const htmlOutput = `
    <div>
      <h2>${getContentForKey(record, 'title')[0]}</h2>
    </div>
    `;
    return htmlOutput;
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
      reader.readAsText(file);
    });
  }



  renderPanels() {
    return this.state.records.map((record, index) => {

      const innerHtml = generateHTML(record);
      return (
        <Panel key={index} header={getContentForKey(record, 'title')[0]}>
          <Input type="textarea" defaultValue={innerHtml} />
          <CopyToClipboard text={innerHtml}><button>Copy to clipboard</button></CopyToClipboard>
        </Panel>
      );
    });
  }

  render() {
    return (
      <Grid>
        <Navbar staticTop inverse>
          <Navbar.Header>
            <Navbar.Brand>
              .bib To Email Conveter
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
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
