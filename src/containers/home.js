import React from 'react';
// import axios from 'axios';
import { Form } from 'react-bootstrap';
import SVG from 'react-inlinesvg';
import Arrow from '../img/arrow.svg';
import '../style.scss';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: '',
      error: '',
    };
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

  render() {
    const { course, error } = this.state;

    return (
      <div id="landing">
        <h1 id="site_name"> Course Evaluation Explorer </h1>
        <div id="search">
          <h4 id="landing_text"> I want to see evaluations for </h4>
          <div>
            <Form.Control id="searchbar" type="text" placeholder="Enter course" value={course} onChange={c => this.setState({ course: c.target.value })} isInvalid={!!error} />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </div>
          <button id="searchArrow" type="submit" onClick={this.searchCourse}><SVG src={Arrow} /></button>
        </div>
      </div>
    );
  }
}

export default Home;
