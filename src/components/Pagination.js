import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {ChevronRight,ChevronLeft} from 'react-feather';

export default class Pagination extends Component {
  state={
    pageStartNumber:1,
  }

  paginateUp = () => {
    this.setState(prev=>({
      pageStartNumber:prev.pageStartNumber +10
    }))
  }

  paginateDown = () => {
    this.setState(prev=>({
      pageStartNumber:prev.pageStartNumber -10
    }))
  }

  render(){
    const {pageStartNumber} = this.state;
    const {clickPage, totalCount,contentPerPage,currentPage} = this.props;
    const maxPage = Math.ceil(totalCount/contentPerPage);
    const startNumber = pageStartNumber;
    const endNumber = maxPage<startNumber+10 ? maxPage : startNumber+9;
    return(
      <ul className="pagination">
        {
          (()=>{
            let pagination =[];
            for(let i = startNumber; i< endNumber +1 ; i++){
              const className = i===currentPage ? "active" : "";
              pagination.push(
                <li key={i} className={className} onClick={()=>clickPage(i)}><a href="#">{i}</a></li>
              )
            }
            if(maxPage>startNumber+9) {
              pagination.push(
                <li  onClick={this.paginateUp}><a><ChevronRight className="chevron" /></a></li>
              )
            }
            if(startNumber!==1) {
              pagination = [
                <li onClick={this.paginateDown}><a><ChevronLeft className="chevron" /></a></li>,
                ...pagination
              ]
            }
            return pagination
          })()
        }
      </ul>
    )
  }
}
