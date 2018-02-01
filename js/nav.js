(function() {
  'use strict';

  const ACTIVE_CLASS = 'active';
  const PANEL_CLASS = 'nav-panel';

  const nav = document.getElementsByTagName('nav')[0];
  const btns = nav.getElementsByTagName('a');
  const dropdown = document.getElementById('dropdown');

  let currentPanel = null;

  const removeActiveClasses = buttons => {
    Array.from(buttons).forEach(el => {
      el.classList.remove(ACTIVE_CLASS);
    });
  };

  const getHeight = el => {
    const elStyle = window.getComputedStyle(el);
    const elDisplay = elStyle.display;
    const elPosition = elStyle.position;
    const elVisibility = elStyle.visibility;
    const elMaxHeight = elStyle.maxHeight.replace('px', '').replace('%', '');
    let wantedHeight = 0;

    // if its not hidden we just return normal height
    if (elDisplay !== 'none' && elMaxHeight !== '0') {
      return el.offsetHeight;
    }

    // the element is hidden so:
    // making the el block so we can meassure its height but still be hidden
    el.style.position = 'absolute';
    el.style.visibility = 'hidden';
    el.style.display = 'block';

    wantedHeight = el.offsetHeight;

    // reverting to the original values
    el.style.display = elDisplay;
    el.style.position = elPosition;
    el.style.visibility = elVisibility;

    return wantedHeight;
  };

  const toggleSlide = el => {
    let elMaxHeight = 0;

    if (el.getAttribute('data-max-height')) {
      if (el.style.maxHeight.replace('px', '').replace('%', '') === '0') {
        el.style.maxHeight = el.getAttribute('data-max-height');
      } else {
        el.style.maxHeight = '0';
      }
    } else {
      elMaxHeight = getHeight(el) + 'px';
      el.style['transition'] = 'max-height 0.5s ease-in-out';
      el.style.overflowY = 'hidden';
      el.style.maxHeight = '0';
      el.setAttribute('data-max-height', elMaxHeight);
      el.style.display = 'block';

      // we use setTimeout to modify maxHeight later than display (to we have the transition effect)
      setTimeout(function () {
        el.style.maxHeight = elMaxHeight;
      }, 10);
    }
  };

  const setActivePanel = panelId => {
    const panels = document.getElementsByClassName(PANEL_CLASS);
    Array.from(panels).forEach(el => {
      el.style.display = 'none';
    });

    const activePanel = document.getElementById(panelId);
    activePanel.style.display = 'block';
  };

  const addNavHandlers = buttons => {
    Array.from(buttons).forEach(btn => {
      btn.addEventListener('click', e => {
        removeActiveClasses(btns);
        const el = e.target;
        const selectedPanelName = el.getAttribute('data-related-panel');

        if (selectedPanelName === currentPanel) {
          toggleSlide(dropdown);
        } else {
          setActivePanel(selectedPanelName);

          if (dropdown.style.display !== 'block') {
            toggleSlide(dropdown);
          }
          
          currentPanel = selectedPanelName;
        }

        el.classList.add(ACTIVE_CLASS);
      });
    });
  };

  addNavHandlers(btns);
})();
