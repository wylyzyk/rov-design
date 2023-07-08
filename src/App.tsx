import React, {useState} from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Button, LegacyButtonType, SizeType} from "./components/Button/button";
import { Menu } from "./components/Menu/menu";
import { MenuItem } from "./components/Menu/menuItem";
import { SubMenu } from "./components/Menu/subMenu";
import { Icon } from "./components/Icon/icon";
import { Transition } from "./components/Transition/transition";
import styled from "./App.module.scss"

console.log(styled["app-wrapper"], styled["container"])
console.log(typeof styled)

library.add(fas);

function App() {
  const [show, setShow] = useState(false)

  return (
    <div className="App">
      <header className="App-header">

        <Icon icon={"coffee"} />

        <Menu mode={"horizontal"} defaultIndex={"0"} defaultOpenSubMenus={["2"]} onSelect={(index) => console.log(index)}>
          <MenuItem>link 1</MenuItem>
          <MenuItem disabled>link 2</MenuItem>
            <SubMenu title="dropdown">
                <MenuItem>drop 1</MenuItem>
                <MenuItem>drop 2</MenuItem>
            </SubMenu>
          <MenuItem>link 3</MenuItem>
        </Menu>


        <Button size={"large"} onClick={() => {setShow(!show)}}> Toggle </Button>
        <Transition in={show} timeout={300} animation={"zoom-in-left"}>
          <div>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
          </div>
        </Transition>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
