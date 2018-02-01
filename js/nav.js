(function() {
  'use strict';

  const nav = document.getElementsByTagName('nav')[0];
  const btns = nav.getElementsByTagName('a');
  const ACTIVE_CLASS = 'active';
  const PANEL_CLASS = 'nav-panel';
  const dropdown = document.getElementById('dropdown');
  let currentPanel = null;

  const removeActiveClasses = buttons => {
    Array.from(buttons).forEach(el => {
      el.classList.remove(ACTIVE_CLASS);
    });
  }


  const getHeight = function (el) {
    var el_style = window.getComputedStyle(el),
      el_display = el_style.display,
      el_position = el_style.position,
      el_visibility = el_style.visibility,
      el_max_height = el_style.maxHeight.replace('px', '').replace('%', ''),

      wanted_height = 0;


    // if its not hidden we just return normal height
    if (el_display !== 'none' && el_max_height !== '0') {
      return el.offsetHeight;
    }

    // the element is hidden so:
    // making the el block so we can meassure its height but still be hidden
    el.style.position = 'absolute';
    el.style.visibility = 'hidden';
    el.style.display = 'block';

    wanted_height = el.offsetHeight;

    // reverting to the original values
    el.style.display = el_display;
    el.style.position = el_position;
    el.style.visibility = el_visibility;

    return wanted_height;
  };

  const toggleSlide = function (el) {
    var el_max_height = 0;

    if (el.getAttribute('data-max-height')) {
      // we've already used this before, so everything is setup
      if (el.style.maxHeight.replace('px', '').replace('%', '') === '0') {
        el.style.maxHeight = el.getAttribute('data-max-height');
      } else {
        el.style.maxHeight = '0';
      }
    } else {
      el_max_height = getHeight(el) + 'px';
      el.style['transition'] = 'max-height 0.5s ease-in-out';
      el.style.overflowY = 'hidden';
      el.style.maxHeight = '0';
      el.setAttribute('data-max-height', el_max_height);
      el.style.display = 'block';

      // we use setTimeout to modify maxHeight later than display (to we have the transition effect)
      setTimeout(function () {
        el.style.maxHeight = el_max_height;
      }, 10);
    }
  }

  const setActivePanel = panelId => {
    const panels = document.getElementsByClassName(PANEL_CLASS);
    Array.from(panels).forEach(el => {
      el.style.display = 'none';
    });

    const activePanel = document.getElementById(panelId);
    activePanel.style.display = 'block';
  }

  const showDropDown = (element, duration, finalHeight) => {
    var s = element.style;
    s.height = '0px';
    // s.display = 'block';

    var y = 0;
    var framerate = 10;
    var one_second = 1000;
    var interval = one_second * duration / framerate;
    var totalframes = one_second * duration / interval;
    var heightincrement = finalHeight / totalframes;
    var tween = function () {
      console.log('i got called');
      y += heightincrement;
      s.height = y + 'px';
      if (y < finalHeight) {
        setTimeout(tween, interval);
      }
    }
    tween();
  }

  const hideDropDown = () => {

  }

  const addNavHandlers = buttons => {
    Array.from(buttons).forEach(btn => {
      btn.addEventListener('click', e => {
        removeActiveClasses(btns);
        const el = e.target;
        const selectedPanelName = el.getAttribute('data-related-panel');

        if (selectedPanelName === currentPanel) {
          // Hide dropdown
          // hideDropDown();
        } else {
          // Show dropdown
          

          // showDropDown(dropdown);
          // toggleSlide(document.getElementById(currentPanel));
          
          setActivePanel(selectedPanelName);
          toggleSlide(dropdown);

          currentPanel = selectedPanelName;
        }

        el.classList.add(ACTIVE_CLASS);
      });
    });
  }

  addNavHandlers(btns);






})();
