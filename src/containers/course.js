import React from 'react';
import {
  Form, Col, ListGroup, Spinner,
} from 'react-bootstrap';
import axios from 'axios';
import SVG from 'react-inlinesvg';
import Arrow from '../img/arrow.svg';
import '../style.scss';

import { professorTerms, courseProfessors } from '../constants/dictionary';

const QUESTION_MAP = {
  0: 'Methods of Evaluation',
  1: 'Class Structure',
  2: 'Academic Experience',
};
class Course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courseNum: '',
      course: '',
      error: '',
      name: '',
      term: '',
      professor: '',
      question: '',
      sidebar: {},
      reviews: [],
      keywords: [],
      loading: false,
      keywordSelected: false,
    };
  }

  componentDidMount(props) {
    const regex = new RegExp('([0-9]+)|([a-zA-Z]+)', 'g');
    const splittedArray = this.props.match.params.courseId.match(regex);
    console.log('remounting');
    this.setState({ name: `${splittedArray[0].toUpperCase()} ${this.zeroFill(parseInt(splittedArray[1], 10))}`, courseNum: parseInt(splittedArray[1], 10) }, this.fetchReviews);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.courseId !== this.props.match.params.courseId) {
      const regex = new RegExp('([0-9]+)|([a-zA-Z]+)', 'g');
      const splittedArray = nextProps.match.params.courseId.match(regex);
      this.setState({ courseNum: parseInt(splittedArray[1], 10), name: `${splittedArray[0].toUpperCase()} ${this.zeroFill(parseInt(splittedArray[1], 10))}` }, this.fetchReviews);
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

    if (courseName !== 'COSC' || !possibleCourseNum.includes(courseNum)) {
      this.setState({ error: 'Please enter a valid course' });
    } else {
      this.clearSidebar();
      this.setState({
        error: '',
        courseNum,
        course: '',
        term: '',
        professor: '',
        question: '',
        sidebar: {},
        reviews: [],
        keywords: [],
        loading: false,
        keywordSelected: false,
      }, history.push(`/course/${courseName}${this.zeroFill(courseNum)}`));
    }
  };

  zeroFill = (number) => {
    const width = 3 - number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }

    return `${number}`; // always return a string
  }

  fetchReviews = () => {
    const { keywordSelected, keywords } = this.state;
    console.log(`testing course number: ${this.state.courseNum}`);
    this.setState({ loading: true });
    axios.post('http://localhost:9090/api/reviews', {
      filters: {
        courseNum: this.state.courseNum,
        name: this.state.name,
        term: this.state.term,
        professor: this.state.professor,
        question: this.state.question,
        sidebar: this.state.sidebar,
      },
    })
      .then((response) => {
        this.setState({ reviews: response.data.results, keywords: keywordSelected ? keywords : response.data.keywords || [], loading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateFilter = (e) => {
    if (e.target.name === 'sidebar') {
      if (e.target.id === 'keyword') {
        this.setState({ keywordSelected: true });
      }
      this.setState({ sidebar: { [e.target.id]: e.target.value } }, this.fetchReviews);
    } else {
      this.clearSidebar();
      this.setState({ [e.target.name]: e.target.value, sidebar: {} }, this.fetchReviews);
    }
  }

  getSentimentClass = (review) => {
    return `review-${review.enriched_text.sentiment.document.label}`;
  }

  // TODO: update this to match the data
  loadReviews = () => {
    const { reviews } = this.state;
    return reviews.map((review) => {
      return (
        <ListGroup.Item className={this.getSentimentClass(review)}>
          {`${review.term} / ${review.professor} / ${QUESTION_MAP[review.questionNum]}`}
          <p id="comment"> {review.text} </p>
        </ListGroup.Item>
      );
    });
  }

  loadProfessors = () => {
    const { name, term, professor } = this.state;
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

  loadKeywords = () => {
    const { keywords } = this.state;

    return keywords.map((word) => {
      return (
        <Form.Check
          type="radio"
          label={`${word.key} (${word.matching_results})`}
          name="sidebar"
          id="keyword"
          value={word.key}
        />
      );
    });
  }

  loadSpinner = (styling, color, divStyle) => {
    return (
      <div className={divStyle}>
        <Spinner animation="border" role="status" variant={color} id={styling}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  clearSidebar = () => {
    this.myFormRef.reset();
  }

  render() {
    const {
      course, name, professor, term, question, error, loading, keywordSelected,
    } = this.state;
    const numPositiveReviews = this.state.reviews.filter((review) => {
      return review.enriched_text.sentiment.document.label === 'positive';
    }).length;
    const numNegativeReviews = this.state.reviews.filter((review) => {
      return review.enriched_text.sentiment.document.label === 'negative';
    }).length;
    const numNeutralReviews = this.state.reviews.filter((review) => {
      return review.enriched_text.sentiment.document.label === 'neutral';
    }).length;
    const numReviews = this.state.reviews.length;

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
            {
              loading ? this.loadSpinner('loader', 'light', 'center') : (
                <ListGroup id="reviews">
                  <ListGroup.Item>
                    <div className="rFlex center">
                      <div className="cFlex">
                        <span> TOTAL </span>
                        <span> {numReviews} </span>
                      </div>
                      <div className="cFlex positive-text">
                        <span> POSITIVE </span>
                        <span> {numPositiveReviews} </span>
                      </div>
                      <div className="cFlex">
                        <span> NEUTRAL </span>
                        <span> {numNeutralReviews} </span>
                      </div>
                      <div className="cFlex negative-text">
                        <span> NEGATIVE </span>
                        <span> {numNegativeReviews} </span>
                      </div>
                    </div>

                  </ListGroup.Item>
                  {this.loadReviews()}
                </ListGroup>
              )
            }
          </div>
          <div id="sidebar">
            <Form ref={(el) => { this.myFormRef = el; }}>
              <Form.Group onChange={this.updateFilter}>
                <Form.Label>Keywords</Form.Label>
                <Col>
                  {loading && !keywordSelected ? this.loadSpinner('miniSpinner', 'secondary', '') : this.loadKeywords()}
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
                <Form.Label>Relevance</Form.Label>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Workload"
                    name="sidebar"
                    id="entity"
                    value="Workload"
                  />
                  <Form.Check
                    type="radio"
                    label="Difficulty"
                    name="sidebar"
                    id="entity"
                    value="Difficulty"
                  />
                  <Form.Check
                    type="radio"
                    label="Evaluation"
                    name="sidebar"
                    id="entity"
                    value="Evaluation"
                  />
                  <Form.Check
                    type="radio"
                    label="Professor"
                    name="sidebar"
                    id="entity"
                    value="Professor"
                  />
                  <Form.Check
                    type="radio"
                    label="Class Structure"
                    name="sidebar"
                    id="entity"
                    value="Structure"
                  />
                  <Form.Check
                    type="radio"
                    label="Experience"
                    name="sidebar"
                    id="entity"
                    value="Experience"
                  />
                  <Form.Check
                    type="radio"
                    label="Feedback"
                    name="sidebar"
                    id="entity"
                    value="Feedback"
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
