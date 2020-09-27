import React, { useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

type Props = {
  className: string;
};
const MenuButton: React.FC<Props> = (props) => {
  const [isOpen, setOpen] = useState(false);
  const { className } = props;
 
  const handleClick = () => {
    setOpen(prevState => !prevState);
  };

  const iconClassNames = classNames({'open': isOpen});

  return (
    <Button 
      className={className}
      onClick={handleClick}
    >
      <MenuIcon 
        className={iconClassNames}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </MenuIcon>
    </Button>
  );
}

const Button = styled.button`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const MenuIcon = styled.div`
  width: 18px;
  height: 12px;
  position: relative;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: #999999;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
  }

  & span:nth-child(1) {
    top: 0px;
  }

  & span:nth-child(2),
  & span:nth-child(3) {
    top: 5px;
  }

  & span:nth-child(4) {
    top: 10px;
  }

  &.open span:nth-child(1) {
    top: 5px;
    width: 0%;
    left: 50%;
  }

  &.open span:nth-child(2) {
    transform: rotate(45deg);
  }

  &.open span:nth-child(3) {
    transform: rotate(-45deg);
  }

  &.open span:nth-child(4) {
    top: 5px;
    width: 0%;
    left: 50%;
  }
`;

export default MenuButton;