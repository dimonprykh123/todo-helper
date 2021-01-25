import React, { Component } from "react";
import Pagination from "react-js-pagination";
import {connect} from "react-redux"
import {setTodos} from "../redux/actions/todosActions";
import {setSkip,setPage} from "../redux/actions/listActions";


class Pag extends Component {


    handlePageChange =(pageNumber)=> {
        const skip = (pageNumber - 1) * 5
        this.props.setTodos([])
        this.props.setSkip(skip)
        this.props.setPage(pageNumber)

    }

    render() {
        return (
            <div>
                <Pagination
                    activePage={this.props.activePage}
                    itemsCountPerPage={5}
                    totalItemsCount={this.props.todosCount}
                    pageRangeDisplayed={10}
                    onChange={this.handlePageChange.bind(this)}
                />
            </div>
        );
    }
}
const mapDispatchToProps ={
    setSkip,setPage,setTodos
}
export default connect(null,mapDispatchToProps)(Pag)