import React, { Component } from 'react';
import store from '../../store';
import './Category.css';

export default class Category extends Component {
  shouldComponentUpdate() {

  }
  
  render() {
    let category = null;
    let subCategoryList = [];
    let mainCategory = this.props.category;
    
    let onClickCategoryExtend = (e) => {
      if (e.target.innerText === "▼") {
        e.target.innerText = "▲";
        mainCategory.categoryArr.forEach(element => {
          document.getElementById('Category-sub-' + element.categoryCode).style.display = 'flex';
    
        });
      } else if (e.target.innerText === "▲") {
        e.target.innerText = "▼";
        mainCategory.categoryArr.forEach(element => {
          document.getElementById('Category-sub-' + element.categoryCode).style.display = 'none';
        });
      }
    }

    let onClickCategoryContent = (e) => {
      store.dispatch({ type: 'EXTEND_MAIN', onExtendMain: false });
      store.dispatch({ type: 'SELECTED_CATEGORY', categorySelected: e.target.getAttribute('value') });
    }

    if (mainCategory !== undefined) {
      category =
        <div className="Category">
          <div className="Category-main" onClick={onClickCategoryExtend}>
            <button id={"Category-main-button" + mainCategory.categoryCode} className="Category-button" >▼</button>
            <div className="Category-content" onClick={onClickCategoryContent} value={mainCategory.categoryCode}>{mainCategory.categoryName}</div>
          </div>
          {mainCategory.categoryArr.forEach(element => {
            subCategoryList.push(<div key={element.categoryCode} id={"Category-sub-" + element.categoryCode} className="Category-sub">
              <div className="Category-content" onClick={onClickCategoryContent} value={element.categoryCode}>{element.categoryName}</div>
            </div>)
          })}
          {subCategoryList}
        </div>
    }

    return (
      <li className="Nav-category-item">
        {category}
      </li>
    )
  }
}