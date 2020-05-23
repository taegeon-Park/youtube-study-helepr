import React, { Component } from 'react';
import store from '../store';
import { BsArrowsAngleContract, BsFillPlusCircleFill, BsFillXCircleFill} from 'react-icons/bs';
import './WholeNavModal.css';

export default class WholeNavModal extends Component {
  mount = false;
  constructor(props) {
    super(props);

    store.subscribe(() => {
      if (this.mount) {
        this.setState(store.getState());
      }
    }).bind(this);
  };

  componentDidMount() {
    this.mount = true;
    const WholeNavModal = document.getElementById("WholeNavModelId");
    for (let i = 0; i < WholeNavModal.childElementCount; i++)
      WholeNavModal.children.item(i).style.opacity = "0";
    WholeNavModal.style.display = "flex";

    setTimeout(() => {
      let pixel = 0;
      let clear = setInterval(() => {
        if (pixel === 400) {
          setInterval(() => {
            for (let i = 0; i < WholeNavModal.childElementCount; i++)
              WholeNavModal.children.item(i).style.opacity = "100";
          }, 200);
          clearInterval(clear);
        }
        pixel += 50;
        WholeNavModal.style.width = `${pixel}px`;
        WholeNavModal.style.height = `${pixel}px`;

      }, 30);
    }, 20);
  }

  render() {
    let mouseOut = false;

    let onClickNavCategoryTab = e => {
      store.dispatch({ type: 'EXTEND_NAV', onExtendNavMod: false });
    }

    let onClickCategoryContent = (e) => {
      store.dispatch({ type: 'EXTEND_MAIN', onExtendMain: false });
      store.dispatch({ type: 'SELECTED_CATEGORY', categorySelected: e.target.getAttribute('value') });
      onClickNavCategoryTab();
    }

    let _onMouseOut = (e) => {
      mouseOut = true;
    }

    let _onMouseOver = (e) => {
      mouseOut = false;
    }

    let _onClickOuter = (e) => {
      if(mouseOut)
        onClickNavCategoryTab();
    }

    let _onClickPlusSubcategory = (e) => {
      let index = Number.parseInt(e.target.value);
      debugger;
      let _subcCategoryArr = _categoryArr[index].categoryArr.concat([{categoryName:"1", categoryCode:3}]);
      let newCategoryArr = _categoryArr.map((item)=>item);
      newCategoryArr[index].categoryArr = _subcCategoryArr;
      this.setState({categoryArr: newCategoryArr});
    }

    let _categoryArr = this.props.categoryArr;
    let _categoryParent = [];
    let index = 0;

    if (_categoryArr !== undefined) {
      _categoryArr.forEach(main => {
        let subCategoryList = [];
        main.categoryArr.forEach(sub => {
          subCategoryList.push(<div key={sub.categoryName} className="whole-category-sub wholeCategory"> 
            <span value={sub.categoryCode} onClick={onClickCategoryContent}>{sub.categoryName}</span>
            <button className="whole-category-sub-button wholeNavButton">-</button>
            </div>)
        });
        _categoryParent.push(
          <div key={main.categoryName} className="whole-category-parent">
            <div key={main.categoryName} className="whole-category-main wholeCategory">
              <span value={main.categoryCode} onClick={onClickCategoryContent}>{main.categoryName}</span>
                <button className="plusCategory whole-category-main-button wholeNavButton"  value={index++} onClick={_onClickPlusSubcategory}>+</button>
                <button className="minusCategory whole-category-main-button wholeNavButton">-</button>
            </div>
            {subCategoryList}
          </div>
        )
      });
    }


    return (
      <div id="WholeNavModelId" className="WholeNavModal" onMouseOut={_onMouseOut} onMouseEnter={_onMouseOver}>
        <div className="WholeNavModal-content">
          <button className="WholeNavModal-exit-button"
            onClick={onClickNavCategoryTab}><BsArrowsAngleContract /></button>
          {_categoryParent}
        </div>
        <div className="WholeNavModeOuter" onClick={_onClickOuter} />
      </div>
    )
  }
}