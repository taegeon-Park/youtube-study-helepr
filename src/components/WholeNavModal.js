import React, { Component } from 'react';
import store from '../store';
import { BsArrowsAngleContract } from 'react-icons/bs';
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

    let _categoryArr = this.props.categoryArr;
    let _categoryParent = [];

    if (_categoryArr !== undefined) {
      _categoryArr.forEach(main => {
        let subCategoryList = [];
        main.categoryArr.forEach(sub => {
          subCategoryList.push(<div key={sub.categoryName} className="whole-category-sub">{sub.categoryName}</div>)
        });
        _categoryParent.push(
          <div key={main.categoryName} className="whole-category-parent">
            <div key={main.categoryName} className="whole-category-main">{main.categoryName}</div>
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