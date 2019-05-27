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

  render() {
    const { course } = this.state;

    return (
      <div id="landing">
        <h1 id="site_name"> Course Evaluation Explorer </h1>
        <div id="search">
          <h4 id="landing_text"> I want to see evaluations for </h4>
          <Form.Control id="searchbar" type="text" placeholder="Enter course" value={course} onChange={c => this.setState({ course: c.target.value })} />
          <button id="searchArrow" type="submit" onClick={this.searchCourse}><SVG src={Arrow} /></button>
        </div>
      </div>
    );
  }
}

export default Home;
