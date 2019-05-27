import React from 'react';
import { Form, Col, ListGroup } from 'react-bootstrap';
// import axios from 'axios';
import SVG from 'react-inlinesvg';
import Arrow from '../img/arrow.svg';
import '../style.scss';

class Course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: '',
      name: localStorage.getItem('courseName'),
    };
  }

  searchCourse = () => {
    const { history } = this.props;
    const { course } = this.state;

    const regex = new RegExp('([0-9]+)|([a-zA-Z]+)', 'g');
    const splittedArray = course.match(regex);

    const courseName = splittedArray[0];
    const courseNum = splittedArray[1];

    console.log(`${courseName} ${parseInt(courseNum, 10)}`);

    localStorage.setItem('courseName', `${courseName.toUpperCase()} ${courseNum}`);

    history.push(`/course/${courseName + courseNum}`);
  };

  updateFilter = (e) => {
    console.log(this.inputQuestion);
  }

  render() {
    const { course, name } = this.state;
    return (
      <div id="courseMain">
        <div className="rFlex">
          <Form>
            <Form.Label>See evaluations for</Form.Label>
            <Form.Control id="searchbar_long" type="text" placeholder="Enter course" value={course} onChange={c => this.setState({ course: c.target.value })} />
          </Form>
          <button id="courseArrow" type="submit" onClick={this.searchCourse}><SVG src={Arrow} /></button>
        </div>
        <h1 id="courseName"> {name} </h1>
        <Form id="left">
          <Form.Row>
            <Form.Group as={Col} controlId="term">
              <Form.Label>Term</Form.Label>
              <Form.Control as="select">
                <option>All</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="professor">
              <Form.Label>Professor</Form.Label>
              <Form.Control as="select">
                <option>All</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="question">
              <Form.Label>Question</Form.Label>
              <Form.Control as="select"
                onChange={this.updateFilter}
                inputRef={(question) => { this.inputQuestion = question; }}
              >
                <option value="0">All</option>
                <option value="1">...</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Form>
        <div className="rFlex">
          <div id="left">
            <ListGroup id="reviews">
              <ListGroup.Item>
                16S / Farid / Experience
                <p id="comment"> this is the review </p>
              </ListGroup.Item>
              <ListGroup.Item>
                16S / Farid / Experience
                <p id="comment"> this is the review </p>
              </ListGroup.Item>
              <ListGroup.Item>
                16S / Farid / Experience
                <p id="comment"> this is the review </p>
              </ListGroup.Item>
              <ListGroup.Item>
                16S / Farid / Experience
                <p id="comment"> this is the review </p>
              </ListGroup.Item>
              <ListGroup.Item>
                16S / Farid / Experience
                <p id="comment"> this is the review </p>
              </ListGroup.Item>
              <ListGroup.Item>
                16S / Farid / Experience
                <p id="comment"> this is the review </p>
              </ListGroup.Item>
              <ListGroup.Item>
                16S / Farid / Experience
                <p id="comment"> this is the review </p>
              </ListGroup.Item>
              <ListGroup.Item>
                16S / Farid / Experience
                <p id="comment"> this is the review </p>
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div id="sidebar">
            <Form>
              <Form.Group>
                <Form.Label>Keyword</Form.Label>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Workload"
                    name="sidebar"
                    id="workloadRadio"
                  />
                  <Form.Check
                    type="radio"
                    label="Difficulty"
                    name="sidebar"
                    id="difficultyRadio"
                  />
                  <Form.Check
                    type="radio"
                    label="Evaluation"
                    name="sidebar"
                    id="evaluationRadio"
                  />
                  <Form.Check
                    type="radio"
                    label="Homework"
                    name="sidebar"
                    id="homeworkRadio"
                  />
                  <Form.Check
                    type="radio"
                    label="Class Structure"
                    name="sidebar"
                    id="structureRadio"
                  />
                  <Form.Check
                    type="radio"
                    label="Experience"
                    name="sidebar"
                    id="experienceRadio"
                  />
                  <Form.Check
                    type="radio"
                    label="Feedback"
                    name="sidebar"
                    id="feedbackRadio"
                  />
                </Col>
              </Form.Group>
              <Form.Group>
                <Form.Label>Sentiment</Form.Label>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Positive"
                    name="sidebar"
                    id="positiveRadio"
                  />
                  <Form.Check
                    type="radio"
                    label="Negative"
                    name="sidebar"
                    id="negativeRadio"
                  />
                </Col>
              </Form.Group>
              <Form.Group>
                <Form.Label>Frequency of</Form.Label>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Evaluation"
                    name="sidebar"
                    id="evaluationFrequencyRadio"
                  />
                  <Form.Check
                    type="radio"
                    label="Homework"
                    name="sidebar"
                    id="homeworkFrequencyRadio"
                  />
                </Col>
              </Form.Group>
              <Form.Group>
                <Form.Label>Amount of</Form.Label>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Class Structure"
                    name="sidebar"
                    id="structureAmountRadio"
                  />
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Course;
