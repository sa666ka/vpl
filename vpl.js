var src = {
    "file": ["find_obstacles(walls, robots, dt) obstacles"],
    "blocks": {
      0: [0,1,2,3,19,20,21,24,25,28,29,30,31,33,39], //main block
      1: [4,5,6,10,11,13,14],
      2: [7,8],
      3: [9],
      4: [12],
      5: [15,16,17,18],
      6: [22],
      7: [23],
      8: [26],
      9: [27],
      10: [32],
      11: [34],
      12: [35],
      13: [36],
      14: [37],
      15: [38]
    },
    "acts": {
      0: {"block": 0, "act": "=",  "args": ["list", "[]int{1,2,3,4}"]},
      1: {"block": 0, "act": "#",  "args": ["Комметрарий"]},
      2: {"block": 0, "act": "var",  "args": ["x", "map[int]rune{1:'a',2:'b',3:'c'}"]},
      4: {"block": 1, "act": "#",  "args": ["поиск столкновения со стеной"]},
      5: {"block": 1, "act": "=",  "args": ["cross", "cross_line_circle(p1, p2, pos, size)"]},
      7: {"block": 2, "act": "=",  "args":   ["self._fail", "True"]}, 
      8: {"block": 2, "act": "return",  "args":  ["None"]},
      9: {"block": 3, "act": "break",  "args":   [""]},
      6: {"block": 1, "act": "if",  "blocks": [2,3], "cases": {2: "cross is not None", 3: "else"}},
      10: {"block": 1, "act": "#",  "args":  ["наблюдаемый фрагмент стены"]},
      12: {"block": 4, "act": "continue", "args": ["Tag"]},
      11: {"block": 1, "act": "if", "blocks": [4], "cases": {4: "cross is None"}},
      13: {"block": 1, "act": "#",  "args":  ["двигаться вдоль стены"]},
      15: {"block": 5, "act": "var",  "args": ["alfa", "int = 60"]},
      16: {"block": 5, "act": "=",  "args": ["a0", "get_angle(course, cross[0] - pos)"]},
      17: {"block": 5, "act": "=",  "args": ["a1", "get_angle(course, cross[1] - pos)"]},
      18: {"block": 5, "act": "=",  "args": ["dist0", "norm(cross[0] - finish)"]},
      14: {"block": 1, "act": "if", "blocks": [5], "cases": {5: "rule3"}},
      3: {"block": 0, "act": "for", "tag": ["Tag"], "blocks": [1], "cases": {1: "wall in walls"}},
      19: {"block": 0, "act": "play",  "args": ["foo(obstacle)[0]._x"]},
      20: {"block": 0, "act": "var",  "args":  ["x", "int"]},
      22: {"block": 6, "act":"=", "args": ["x", "0"]},
      23: {"block": 7, "act":"=", "args": ["x", "0"]},
      21: {"block": 0, "act": "case", "tag": ["Tag2"], "exp": ["x = foo(); x"], 
           "blocks": [6,7], "cases": {6: "-1", 7: "1"}},
      24: {"block": 0, "act": "var",  "args":  ["y", 'interface{}("_")']},
      26: {"block": 8, "act":"=", "args": ["y", "0"]},
      27: {"block": 9, "act":"=", "args": ["y", "'Hello!'"]},
      25: {"block": 0, "act": "case", "tag": ["Tag3"], "exp": ["y"],
           "blocks": [8,9], "cases": {8: "float", 9: "string"}},
      28: {"block": 0, "act": "const",  "args":  ["x", "int(5)"]},
      29: {"block": 0, "act": "defer",  "args":  ["finaly('In the End')"]},
      30: {"block": 0, "act": "go",  "args":  ["run()"]},
      32: {"block": 10, "act": "#",  "args": ["пустой цикл"]},
      31: {"block": 0, "act": "for", "blocks": [10], "cases": {10: "i = 0; i < 10; i++"}},
      34: {"block": 11, "act": "print", "args": ['"received ", i1, " from c1"']},
      35: {"block": 12, "act": "print", "args": ['"sent ", i2, " to c1"']},
      37: {"block": 14, "act": "print", "args": ['"received ", i3, " from c3"']},
      38: {"block": 15, "act": "print", "args": ['"c3 is closed"']},
      36: {"block": 13, "act": "if", "blocks": [14,15], "cases": {14: "ok", 15: "else"}},
      33: {"block": 0, "act": "select", "tag": ["Tag4"], 
           "blocks": [11,12,13], "cases": {11: "i1 <- c1", 12: "i2 -> c2", 13: "i3, ok <= c3"}},
      39: {"block": 0, "act": "print",  "args":  ['"Hello!"']},
    }
};

function save(obj, data) {
  if(obj.textContent.indexOf('\n') < 0) {
    obj.style.textAlign = "center";
  } else {
    obj.style.textAlign = "left";
  }
  var i = obj.getAttribute('data-id');
  data[i] = obj.textContent;
}

function openBlock(parentBlock, parentTag, classBlock) {
   var div_block = document.createElement('div');
    div_block.classList.add("block");
    div_block.classList.add(classBlock);
    parentTag.appendChild(div_block);
    for (var id of parentBlock){
      var div_statement = document.createElement('div');
        div_block.appendChild(div_statement);
        appendCode(div_statement, id);
    }
}

function openSource() {
  var div_file = document.querySelector('#file');
  div_file.innerHTML = ""; //clear
  var div_name = document.createElement('div');
  div_name.classList.add("name");
  div_name.setAttribute('contenteditable', "plaintext-only");
  div_name.textContent = src.file[0];
  div_name.setAttribute('data-id', 0);
  div_name.oninput = function(){save(this, src.file);};
  div_file.appendChild(div_name);
  var div_source = document.createElement('div');
  div_source.classList.add("source");
  div_file.appendChild(div_source);
  var num = 1;
  for (var id of src.blocks[0]){
    var div_line = document.createElement('div');
    div_line.classList.add("line");
    var div_num = document.createElement('div');
    div_num.classList.add("num");
    div_num.textContent = num++;
    div_line.appendChild(div_num);
    div_source.appendChild(div_line);
    appendCode(div_line, id);
  }
}

function appendImg(id, parentTag, actClass, actImg) {
  var div_item = document.createElement('div');
  div_item.classList.add("item");
  var img_act = document.createElement('img');
  img_act.classList.add("act");
  img_act.classList.add(actClass);
  img_act.setAttribute('data-id', id);
  img_act.setAttribute('src', actImg);
  div_item.appendChild(img_act);
  parentTag.appendChild(div_item);
}

function appendAct(id, parentTag, actClass, actImg, actArgs) {
  appendImg(id, parentTag, actClass, actImg);
  var args = src.acts[id].args;
  for (var i = 0; i < args.length; i++) {
    var div_item = document.createElement('div');
    div_item.classList.add("item");
    var div_exp = document.createElement('div');
    div_exp.classList.add("exp");
    var argClass = actArgs[i];
    if (argClass) {
      div_exp.classList.add(argClass);
    }
    div_exp.setAttribute('contenteditable', "plaintext-only");
    div_exp.textContent = args[i];
    div_exp.setAttribute('data-id', i);
    div_exp.data = {"args": args, "i": i};
    div_exp.oninput = function(){save(this, args);};
    div_item.appendChild(div_exp);
    parentTag.appendChild(div_item);
  }
}

function appendBlock(id, parentTag, actClass, actImg, actArgs) {
  var act = src.acts[id];
  if (act.tag) {
    var div_tag = document.createElement('div');
    div_tag.classList.add("statememt-tag");
    div_tag.setAttribute('data-id', id);
    parentTag.appendChild(div_tag);
    appendImg(id, div_tag, "act-tag", "https://raw.githubusercontent.com/sa666ka/vpl/master/tag.png");
    var div_item = document.createElement('div');
    div_item.classList.add("item");
    var div_exp = document.createElement('div');
    div_exp.classList.add("exp");
    div_exp.classList.add("exp-tag");
    div_exp.setAttribute('contenteditable', "plaintext-only");
    div_exp.textContent = act.tag[0];
    div_exp.setAttribute('data-id', 0);
    div_exp.oninput = function(){save(this, act.tag);};
    div_item.appendChild(div_exp);
    div_tag.appendChild(div_item);
  }
  if (act.exp) {
    var div_switch = document.createElement('div');
    div_switch.classList.add("statememt-switch");
    div_switch.setAttribute('data-id', id);
    parentTag.appendChild(div_switch);
    appendImg(id, div_switch, "act-switch", "https://raw.githubusercontent.com/sa666ka/vpl/master/switch.png");
    var div_item = document.createElement('div');
    div_item.classList.add("item");
    var div_exp = document.createElement('div');
    div_exp.classList.add("exp");
    div_exp.classList.add("exp-switch");
    div_exp.setAttribute('contenteditable', "plaintext-only");
    div_exp.textContent = act.exp[0];
    div_exp.setAttribute('data-id', 0);
    div_exp.oninput = function(){save(this, act.exp);};
    div_item.appendChild(div_exp);
    div_switch.appendChild(div_item);
  }
  var expClass = actArgs[0];
  var blckClass = actArgs[1];
  var condClass = actArgs[2];
  var div_block = document.createElement('div');
  div_block.classList.add("statememt-block");
  div_block.setAttribute('data-id', id);
  parentTag.appendChild(div_block);
  appendImg(id, div_block, actClass, actImg);
  var div_cond = div_block;
  if (condClass) {
    div_cond = document.createElement('div');
    div_cond.classList.add("item");
    div_cond.classList.add(condClass);
    div_block.appendChild(div_cond);
  }
  for (var i of act.blocks) {
    var div_item = document.createElement('div');
    div_item.classList.add("item");
    var div_exp = document.createElement('div');
    div_exp.classList.add("exp");
    if (expClass) {
      div_exp.classList.add(expClass);
    }
    div_exp.setAttribute('contenteditable', "plaintext-only");
    div_exp.textContent = act.cases[i];
    div_exp.setAttribute('data-id', i);
    div_exp.oninput = function(){save(this, act.cases);};
    div_item.appendChild(div_exp);
    div_cond.appendChild(div_item);
    openBlock(src.blocks[i], div_item, blckClass);
  }
}

function appendCode(div_code, id){
  var div_statement = document.createElement('div');
  div_statement.classList.add("statement");
  div_statement.setAttribute('data-id', id);
  div_code.appendChild(div_statement);
  switch(src.acts[id].act) {
    case '=':
      appendAct(id, div_statement, "act-equal", "https://raw.githubusercontent.com/sa666ka/vpl/master/equal.png", ["exp-equal", "exp-play"]);
      break;
    case '#':
      appendAct(id, div_statement, "act-comment", "https://raw.githubusercontent.com/sa666ka/vpl/master/comment.png", ["exp-comment"]);
      break;
    case 'play':
      appendAct(id, div_statement, "act-play", "https://raw.githubusercontent.com/sa666ka/vpl/master/play.png", ["exp-play"]);
      break;
    case 'defer':
      appendAct(id, div_statement, "act-defer", "https://raw.githubusercontent.com/sa666ka/vpl/master/defer.png", ["exp-play"]);
      break;
    case 'go':
      appendAct(id, div_statement, "act-go", "https://raw.githubusercontent.com/sa666ka/vpl/master/go.png", ["exp-play"]);
      break;
    case 'print':
      appendAct(id, div_statement, "act-print", "https://raw.githubusercontent.com/sa666ka/vpl/master/print.png", ["exp-print"]);
      break;
    case 'var':
      appendAct(id, div_statement, "act-var", "https://raw.githubusercontent.com/sa666ka/vpl/master/var.png", ["exp-var", "exp-type"]);
      break;
    case 'const':
      appendAct(id, div_statement, "act-const", "https://raw.githubusercontent.com/sa666ka/vpl/master/const.png", ["exp-var", "exp-type"]);
      break;
    case 'continue':
      appendAct(id, div_statement, "act-continue", "https://raw.githubusercontent.com/sa666ka/vpl/master/continue.png", ["exp-tag"]);
      break;
    case 'break':
      appendAct(id, div_statement, "act-break", "https://raw.githubusercontent.com/sa666ka/vpl/master/break.png", ["exp-tag"]);
      break;
    case 'return':
      appendAct(id, div_statement, "act-return", "https://raw.githubusercontent.com/sa666ka/vpl/master/return.png", ["exp-return"]);
      break;
    case 'if':
      appendBlock(id, div_statement, "act-if", "https://raw.githubusercontent.com/sa666ka/vpl/master/if.png", ["exp-if", "block-if", "item-cond"]);
      break;
    case 'for':
      appendBlock(id, div_statement, "act-for", "https://raw.githubusercontent.com/sa666ka/vpl/master/for.png", ["exp-for", "block-for"]);
      break;
    case 'select':
      appendBlock(id, div_statement, "act-select", "https://raw.githubusercontent.com/sa666ka/vpl/master/select.png", ["exp-select", "block-select", "item-cond"]);
      break;
    case 'case':
      appendBlock(id, div_statement, "act-case", "https://raw.githubusercontent.com/sa666ka/vpl/master/case.png", ["exp-case", "block-case", "item-cond"]);
      break;
    }
}

/**
   * Function to check if we clicked inside an element with a particular class
   * name.
   * 
   * @param {Object} e The event
   * @param {String} className The class name to check against
   * @return {Boolean}
   */
  function clickInsideElement( e, className ) {
    var el = e.srcElement || e.target;
    
    if ( el.classList.contains(className) ) {
      return el;
    } else {
      while ( el = el.parentNode ) {
        if ( el.classList && el.classList.contains(className) ) {
          return el;
        }
      }
    }

    return false;
  }

  /**
   * Get's exact position of event.
   * 
   * @param {Object} e The event passed in
   * @return {Object} Returns the x and y position
   */
  function getPosition(e) {
    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;
    
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //
  // C O R E    F U N C T I O N S
  //
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * Variables.
   */
  var contextMenuClassName = "context-menu";
  var contextMenuItemClassName = "context-menu__item";
  var contextMenuLinkClassName = "context-menu__link";
  var contextMenuActive = "context-menu--active";

  var taskItemClassName = "act";
  var taskItemInContext;

  var clickCoords;
  var clickCoordsX;
  var clickCoordsY;

  var menu = document.querySelector("#context-menu");
  var menuItems = menu.querySelectorAll(".context-menu__item");
  var menuState = 0;
  var menuWidth;
  var menuHeight;
  var menuPosition;
  var menuPositionX;
  var menuPositionY;

  var windowWidth;
  var windowHeight;

  /**
   * Initialise our application's code.
   */
  function init() {
    contextListener();
    clickListener();
    keyupListener();
    //resizeListener();
  }

  /**
   * Listens for contextmenu events.
   */
  function contextListener() {
    document.addEventListener( "contextmenu", function(e) {
      taskItemInContext = clickInsideElement( e, taskItemClassName );

      if ( taskItemInContext ) {
        e.preventDefault();
        toggleMenuOn();
        positionMenu(e);
      } else {
        taskItemInContext = null;
        toggleMenuOff();
      }
    });
  }

  /**
   * Listens for click events.
   */
  function clickListener() {
    document.addEventListener( "click", function(e) {
      var clickeElIsLink = clickInsideElement( e, contextMenuLinkClassName );

      if ( clickeElIsLink ) {
        e.preventDefault();
        menuItemListener( clickeElIsLink );
      } else {
        var button = e.which || e.button;
        if ( button === 1 ) {
          toggleMenuOff();
        }
      }
    });
  }

  /**
   * Listens for keyup events.
   */
  function keyupListener() {
    window.onkeyup = function(e) {
      if ( e.keyCode === 27 ) {
        toggleMenuOff();
      }
    }
  }

  /**
   * Window resize event listener
   */
  function resizeListener() {
    window.onresize = function(e) {
      toggleMenuOff();
    };
  }

  /**
   * Turns the custom context menu on.
   */
  function toggleMenuOn() {
    if ( menuState !== 1 ) {
      menuState = 1;
      menu.classList.add( contextMenuActive );
    }
  }

  /**
   * Turns the custom context menu off.
   */
  function toggleMenuOff() {
    if ( menuState !== 0 ) {
      menuState = 0;
      menu.classList.remove( contextMenuActive );
    }
  }

  /**
   * Positions the menu properly.
   * 
   * @param {Object} e The event
   */
  function positionMenu(e) {
    clickCoords = getPosition(e);
    clickCoordsX = clickCoords.x;
    clickCoordsY = clickCoords.y;
/*
    menuWidth = menu.offsetWidth + 4;
    menuHeight = menu.offsetHeight + 4;

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    console.log(windowWidth);
    console.log(windowHeight);
    
    if ( (windowWidth - clickCoordsX) < menuWidth ) {
      menu.style.left = windowWidth - menuWidth + "px";
    } else {
      menu.style.left = clickCoordsX + "px";
    }

    if ( (windowHeight - clickCoordsY) < menuHeight ) {
      menu.style.top = windowHeight - menuHeight + "px";
    } else {
      menu.style.top = clickCoordsY + "px";
    }
    */
    menu.style.left = clickCoordsX + "px";
    menu.style.top = clickCoordsY + "px";
  }

  /**
   * Dummy action function that logs an action when a menu item link is clicked
   * 
   * @param {HTMLElement} link The link that was clicked
   */
  function menuItemListener( link ) {
    var id = parseInt(taskItemInContext.getAttribute("data-id"));
    var action = link.getAttribute("data-action");
    console.log( "Task ID - " + id + ", Task action - " + action);
    switch (action) {
      case "Delete":
        if (taskItemInContext.classList.contains('act-tag')) {
          delete src.acts[id].tag;
          var elem = document.querySelector('[data-id="'+id+'"].statememt-tag');
          elem.parentNode.removeChild(elem);
        } else {
          var blocks = src.acts[id].blocks;
          if (blocks) {
            // удаляем все вложенные блоки из списка
            for (var i of blocks) {
              delete src.blocks[i];
            }
          }
          // удаляем из родительского блока
          var i = src.acts[id].block;
          src.blocks[i].splice(src.blocks[i].indexOf(id),1);
          //удаляем самого
          delete src.acts[id];
          var elem = document.querySelector('[data-id="'+id+'"].statement');
          elem.parentNode.removeChild(elem);
        }
        break;
    }
    toggleMenuOff();
  }

  /**
   * Run the app.
   */
  init();
