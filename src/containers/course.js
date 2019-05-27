import React from 'react';
import { Form, Col, ListGroup } from 'react-bootstrap';
// import axios from 'axios';
import SVG from 'react-inlinesvg';
import Arrow from '../img/arrow.svg';
import '../style.scss';

import { professorTerms, courseProfessors } from '../constants/dictionary';

class Course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: '',
      error: '',
      name: '',
      term: '',
      professor: '',
      question: '',
      sidebar: {},
      reviews: [],
    };
  }

  componentDidMount(props) {
    const regex = new RegExp('([0-9]+)|([a-zA-Z]+)', 'g');
    const splittedArray = this.props.match.params.courseId.match(regex);
    this.setState({ name: `${splittedArray[0].toUpperCase()} ${this.zeroFill(parseInt(splittedArray[1], 10))}` });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.courseId !== this.props.match.params.courseId) {
      const regex = new RegExp('([0-9]+)|([a-zA-Z]+)', 'g');
      const splittedArray = nextProps.match.params.courseId.match(regex);
      this.setState({ name: `${splittedArray[0].toUpperCase()} ${this.zeroFill(parseInt(splittedArray[1], 10))}` });
    }
  }

  searchCourse = () => {
    const { history } = this.props;
    const { course } = this.state;

    const regex = new RegExp('([0-9]+)|([a-zA-Z]+)', 'g');
    const splittedArray = course.match(regex);

    const possibleCourseNum = [1, 10, 30, 31];

    const courseName = splittedArray[0].toUpperCase();
    const courseNum = parseInt(splittedArray[1], 10);

    console.log(courseNum);

    if (courseName !== 'COSC' || !possibleCourseNum.includes(courseNum)) {
      this.setState({ error: 'Please enter a valid course' });
    } else {
      this.setState({ course: '', error: '' });
      history.push(`/course/${courseName}${this.zeroFill(courseNum)}`);
    }
  };

  zeroFill = (number) => {
    const width = 3 - number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return `${number}`; // always return a string
  }

  updateFilter = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    if (e.target.name === 'sidebar') {
      this.updateSidebar(e);
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
    // TODO: do axios call with all the filters from the state and then update reviews in state
  }

  updateSidebar = (e) => {
    this.setState({ sidebar: { [e.target.id]: e.target.value } });
    console.log(this.state);
  }

  // TODO: update this to match the data
  loadReviews = () => {
    const { reviews } = this.state;

    return reviews.map((review) => {
      return (
        <ListGroup.Item>
          {`${review.term} / ${review.professor} / ${review.question}`}
          <p id="comment"> {review.text} </p>
        </ListGroup.Item>
      );
    });
  }

  loadProfessors = () => {
    const { name, term, professor } = this.state;
    console.log(professor);
    if (term === '') {
      return courseProfessors(name).map((prof) => {
        return (<option value={prof}>{prof}</option>);
      });
    } else {
      return (<option value={professor}>{professor}</option>);
    }
  }

  loadTerms = () => {
    const { name, professor } = this.state;
    if (professor === '') {
      return professorTerms(name, 'all').map((term) => {
        return (<option value={term}>{term}</option>);
      });
    } else {
      return professorTerms(name, professor).map((term) => {
        return (<option value={term}>{term}</option>);
      });
    }
  }

  render() {
    const {
      course, name, professor, term, question, error,
    } = this.state;
    return (
      <div id="courseMain">
        <div className="rFlex">
          <Form>
            <Form.Label>See evaluations for</Form.Label>
            <div>
              <Form.Control id="searchbar_long" type="text" placeholder="Enter course" value={course} onChange={c => this.setState({ course: c.target.value })} isInvalid={!!error} />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </div>
          </Form>
          <button id="courseArrow" type="submit" onClick={this.searchCourse}><SVG src={Arrow} /></button>
        </div>
        <h1 id="courseName"> {name} </h1>
        <Form id="left">
          <Form.Row>
            <Form.Group as={Col} controlId="professor">
              <Form.Label>Professor</Form.Label>
              <Form.Control as="select" name="professor" onChange={this.updateFilter} value={professor}>
                <option value="">All</option>
                {this.loadProfessors()}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="term">
              <Form.Label>Term</Form.Label>
              <Form.Control as="select" name="term" onChange={this.updateFilter} value={term}>
                {<option value="">All</option>}
                {this.loadTerms()}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="question" value={question}>
              <Form.Label>Question</Form.Label>
              <Form.Control as="select"
                onChange={this.updateFilter}
                name="question"
              >
                <option value={null}>All</option>
                <option value="0">Methods of Evaluation</option>
                <option value="1">Class Structure</option>
                <option value="2">Academic Experience</option>
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
              {this.loadReviews()}
            </ListGroup>
          </div>
          <div id="sidebar">
            <Form>
              <Form.Group onChange={this.updateFilter}>
                <Form.Label>Keyword</Form.Label>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Workload"
                    name="sidebar"
                    id="entity"
                    value="workload"
                  />
                  <Form.Check
                    type="radio"
                    label="Difficulty"
                    name="sidebar"
                    id="entity"
                    value="difficulty"
                  />
                  <Form.Check
                    type="radio"
                    label="Evaluation"
                    name="sidebar"
                    id="entity"
                    value="evaluation"
                  />
                  <Form.Check
                    type="radio"
                    label="Homework"
                    name="sidebar"
                    id="entity"
                    value="homework"
                  />
                  <Form.Check
                    type="radio"
                    label="Class Structure"
                    name="sidebar"
                    id="entity"
                    value="structure"
                  />
                  <Form.Check
                    type="radio"
                    label="Experience"
                    name="sidebar"
                    id="entity"
                    value="experience"
                  />
                  <Form.Check
                    type="radio"
                    label="Feedback"
                    name="sidebar"
                    id="entity"
                    value="feedback"
                  />
                </Col>
              </Form.Group>
              <Form.Group onChange={this.updateFilter}>
                <Form.Label>Sentiment</Form.Label>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Positive"
                    name="sidebar"
                    id="sentiment"
                    value="positive"
                  />
                  <Form.Check
                    type="radio"
                    label="Negative"
                    name="sidebar"
                    id="sentiment"
                    value="negative"
                  />
                </Col>
              </Form.Group>
              <Form.Group onChange={this.updateFilter}>
                <Form.Label>Frequency of</Form.Label>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Evaluation"
                    name="sidebar"
                    id="frequency"
                    value="evaluation"
                  />
                  <Form.Check
                    type="radio"
                    label="Homework"
                    name="sidebar"
                    id="frequency"
                    value="homework"
                  />
                </Col>
              </Form.Group>
              <Form.Group onChange={this.updateFilter}>
                <Form.Label>Amount of</Form.Label>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Class Structure"
                    name="sidebar"
                    id="amount"
                    value="structure"
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