((function () {

    'use strict';

    function customContextMenu(common) {

      var directive = {
        restrict: 'A',
        link: link,
        scope: {
          actions: '='
        }
      };
      
      return directive;

      function link(scope, element, attrs) {

        //////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////
        //
        // H E L P E R    F U N C T I O N S
        //
        //////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////

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


        createContextMenu()

        var contextMenuClassName = "context-menu";
        var contextMenuItemClassName = "context-menu__item";
        var contextMenuLinkClassName = "context-menu__link";
        var contextMenuActive = "context-menu--active";

        var taskItemClassName = "task";
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

        var clickedElementAttr;

        /**
         * Initialise our application's code.
         */
        function init() {
          contextListener();
          clickListener();
          keyupListener();
          resizeListener();
        }

        /**
         * Listens for contextmenu events.
         */
        function contextListener() {
          document.addEventListener( "contextmenu", function(e) {
            taskItemInContext = clickInsideElement( e, taskItemClassName );

            if ( taskItemInContext ) {
              //function from right-clicked row
              clickedElementAttr = e.path[1].attributes;
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
            clickedElementAttr = undefined;
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

          menuWidth = menu.offsetWidth + 4;
          menuHeight = menu.offsetHeight + 4;

          windowWidth = window.innerWidth;
          windowHeight = window.innerHeight;

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
        }

        /**
         * Here is where the magic happens, run fn from the context menu. In
         * scope.actions we have all the posible functions to use in our menu
         * Here, we get the 'data-action' attr of the clicked option, and search
         * for the corresponding function to exec. [Future: handler error not found]
         */
        function menuItemListener( link ) {
          var opt = link.getAttribute("dataAction");

          if (clickedElementAttr[opt] != undefined) {
            var param = JSON.parse(clickedElementAttr[opt].value);
            scope.actions[opt](param);
          } else {
            scope.actions[opt]();
          }

          toggleMenuOff();
        }


        /**
         * Here we create the context menu
         */
        function createContextMenu() {
            var $contextMenu = angular.element('<nav id="context-menu" class="context-menu">                                                  <ul class="context-menu__items">                                                    <!-- <li class="context-menu__item">                                                      <span href="#" class="context-menu__link" dataAction="view"><i class="fa fa-eye"></i>View Action</span>                                                    </li>                                                    <li class="context-menu__item">                                                      <span href="#" class="context-menu__link" dataAction="edit"><i class="fa fa-edit"></i>Edit Action</span>                                                    </li> -->                                                    <li class="context-menu__item">                                                       <span class="context-menu__link" dataAction="deleteAction"><i class="fa fa-times"></i>Delete Action</span>                                                     </li>                                                  </ul>                                                </nav>');

            $(document).find('body').append($contextMenu);
         }


        /**
         * Run all together.
         */
        init();

      }

    }    

    angular.module('hiraApp.widgets')
        .directive('customContextMenu', customContextMenu);    

})());