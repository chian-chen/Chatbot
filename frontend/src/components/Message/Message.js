import React from 'react'
import styled from 'styled-components'

const Element = ({ red, className }) => {
  return (
    <div className={className}>
      <div className="element__img" />
      <div className="element__info">
        <div className="element__title" skyblue>
          Test Styled Components
        </div>
        <div className="element__description">
          The components is from the example in: https://ithelp.ithome.com.tw/articles/10215800.
        </div>
      </div>
    </div>
  )
}

const Message = styled(Element)`
  display: block;
  margin: auto;
  width: 80%;
  height: 300px;
  box-shadow: 0 0 5px 2px #ccc;
  background-color: rgba(231, 231, 231, 0.8);;
  height: auto;
  border-radius: 25px;

  .element__img {
    // display: inline-block;
    width: 300px;
    height: 100%;
    // background-image: url('./test.jpg');
  }
  .element__info {
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 300px);
    height: 100%;
    text-align: left;
  .element__title {
      padding: 20px 0 0 20px;
      font-size: 48px;
      color: ${props => (props.red ? 'red' : 'black')};
    }
    .element__description {
      padding: 20px;
      font-size: 30px;
      font-style: italic;
      color: #888888;
    }
  }
`

export default Message