import React from 'react';
import './Course.css';
// import { Row, Container } from 'react-bootstrap';
import Rating from 'react-rating';
import axios from '../boot/axios';
import debounce from 'lodash/debounce';
import InfiniteScroll from 'react-infinite-scroll-component';
import Menu from '../helpers/Menu'


class Course extends React.Component {
  constructor(props){
    super(props)

    // State
    this.state = {
      // variable to save the search writed in the input
      search_term: '',
      // Array to save the courses obtained from the responses
      courses:[],
      // Variable to save the next url
      next: 'courses/?limit=&offset=',
      // Flag to control the infinite scrolling
      hasMore: true,
      // loading: false
    }

    // Bind the function to the class scope
    this.handleSearch = this.handleSearch.bind(this);

  }

  /**
   * Method to get the courses
   * @param index index of the infinite scroll
   * @param done function to tell the scroll that the data is loaded
   */
  getCourses() {
    let path = this.state.next
    // Get the courses
    axios.get(path)
      .then(response => {
        // If there's no more data, stop the infinite scroll and put the flag in true 
        // to tell other functions that the scroll is stopped
        if(response.data.next == null && this.state.courses.length > 0){
          this.setState({
            hasMore: false
          })
        }else{
          // If there's data, add the courses to the courses array
          this.setState({
            courses: [...this.state.courses, ...response.data.courses],
            loading: false,
            next: response.data.next
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount(){
    // Add a debounche to the searchcourses function
    this.searchCourses = debounce(this.searchCourses, 500)
    this.getCourses();
  }

  // Function to handle the search input
  handleSearch(e){
    this.setState({
      search_term: e.target.value
    })
    this.searchCourses()
  }

  // Function to search courses with the search_term input
  searchCourses(){
     // If there´s something writted in the search_term put the next url to load the courses with the filter
     if (this.state.search_term !== '') {
      this.setState({
        next: `courses/?search=${this.state.search_term}`,
        // Clear courses array
        courses: [],
        // Reset the infinite loader
        hasMore: true
      })
      this.getCourses()
    }else{
       // If there´s nothing in the search_term, load the first page of courses
      this.setState({
        next: 'courses/?limit=&offset=',
        // Clear courses array
        courses: [],
        // Reset the infinite loader
        hasMore: true
      })
      this.getCourses()
    }
  }

  // Function to render the courses
  showCourses() {
      return this.state.courses.map(course =>
      <div key={course.id} className="col-4 p-3">
        <div className="card p-3">
          <div className="absolute-top grayBox">
          </div>
          
          <div className="d-flex row flex-nowrap align-items-center">
            <div className="col">
              <img src={course.image} className="ml-3 card-img-top course-img" alt={`${course.name}`} />
            </div>
            <div className="col-auto align-self-start align-top ">
              { course.credits > 1 ? 
                <span className="card-badge badge badge-pill badge-secondary">{course.credits} CREDITS</span>
                :
                <span className="card-badge badge badge-pill badge-secondary">{course.credits} CREDIT</span>
              }
            </div>
          </div>

          <div className="card-body">
            <h5 className="card-title">{course.name}</h5>
            <p className="card-text text-grey">{course.provider}</p>
          </div>
          <div className="d-flex ml-4 justify-content-between">
            <div className="mt-2">
              {
                course.price > 0 ?
              <h5 className="text-blue font-weight-bold">${course.price}</h5>
              :
              <h5 className="text-blue font-weight-bold">FREE</h5>
              }
            </div>
            <Rating
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={course.rate}
              readonly
            /> 
          </div>
        </div>
      </div>
    )
  }

  render() {
    return <div className="Course">
      <Menu></Menu>
      <div className="container">
        <div className="row p-3">
          <div className="col-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="iconSearch"><i className="fas fa-search"></i></span>
              </div>
              <input type="text" className="form-control mr-3" placeholder="Search courses" aria-label="Search" aria-describedby="iconSearch" value={this.state.search_term} onChange={this.handleSearch}/>
            </div>
          </div>
        </div>
        <div>
          <InfiniteScroll
            dataLength={this.state.courses.length}
            next={this.getCourses.bind(this)}
            scrollThreshold="200px"
            hasMore={this.state.hasMore}
            className="row justify-content-center mt-5"
            loader={<h4>Loading ...</h4>}
            >
          {this.showCourses()}
          </InfiniteScroll>
        </div>
      </div>
    </div>;
  }
}

export default Course;
