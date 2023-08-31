import React,{useRef} from "react";
import { Button } from "react-bootstrap";
import "./Paginate.css";
import { Form } from "react-bootstrap";

const Paginate = (props) => {
    const sizeRef=useRef(2);
    const statusRef=useRef('All')
    function firstPage() {
        props.onChangePage(1,sizeRef.current.value,statusRef.current.value)
    }
    function lastPage() {
        props.onChangePage(props.data.lastPage,sizeRef.current.value,statusRef.current.value)
    }
    function nextPage() {
        props.onChangePage(props.data.nextPage,sizeRef.current.value,statusRef.current.value)
    }
    function previousPage() {
        props.onChangePage(props.data.previousPage,sizeRef.current.value,statusRef.current.value)
    }
    function changeSort(){
        props.onChangeSort(props.data.currentPage,sizeRef.current.value,statusRef.current.value)
    }
  return (
    <div className="paginate">
      {props.data.previousPage&&props.data.previousPage > 1 && (
        <Button type="button" variant="light" onClick={firstPage}>
          <i class="fa-solid fa-angles-left"></i>     
        </Button>
      )}
      {props.data.currentPage&&props.data.currentPage !== 1 && (
        <Button type="button" variant="light" onClick={previousPage}>
          <i class="fa-solid fa-chevron-left"/>
        </Button>
      )}
      <Button id='currentPage' variant="dark" >{props.data.currentPage||1}</Button>
      {props.data.nextPage <= props.data.lastPage && props.data.lastPage!==0&&(
        <Button type="button" variant="light" onClick={nextPage}>
          <i class="fa-solid fa-chevron-right"></i>
        </Button>
      )}
      {props.data.nextPage < props.data.lastPage && (
        <Button type="button" variant="light" onClick={lastPage}>
          <i class="fa-solid fa-angles-right"></i>
        </Button>
      )}
      <Form.Select defaultValue={localStorage.getItem('size')||2} className='selection' id='pageSize' onChange={changeSort} ref={sizeRef}>
          <option value='2'>2</option>
          <option value='5'>5</option>
          <option value='10'>10</option>
     </Form.Select>
     <Form.Select defaultValue={localStorage.getItem('sort')||'All'} className='selection' id='status' onChange={changeSort} ref={statusRef}>
          <option value='All'>All</option>
          <option value='Pending'>Pending</option>
          <option value='Completed'>Completed</option>
     </Form.Select>
    </div>
  );
};

export default Paginate;