(function() {

  var proto = Object.create(HTMLElement.prototype);

  // Called when an instance is created (via document.createElement,
  // or via just plain HTML code as in <mortar-tabs></mortar-tabs>)
  proto.createdCallback = function() {
    this.attachedTo = undefined;
    this.addEventListener('click', this.onClick);

  };


  // Called when the instance is inserted in the browser's DOM tree,
  // i.e. when it is appended to a parentNode
  proto.attachedCallback = function() {

    var childrenTabs = this.querySelectorAll('mortar-tab');
    var selectedChild = this.querySelector('*[selected]');

	// We want the tabs to be in a 'sane' state. So if we have tab children,
	// we will make sure at least one is `selected`
    if(childrenTabs.length > 0 ) {

      if(!selectedChild) {

        // If no tab has the `selected` attribute, then just show the first
        this.show(0);

      } else {

        // Alternatively, find the first selected child and trigger `show` on it
        for(var i = 0; i < childrenTabs.length; i++) {
          var child = childrenTabs[i];
          if(child === selectedChild) {
            this.show(i);
          }
        }

      }

    }

  };

  function deselectNode(el) {
    el.removeAttribute('selected');
  }

  function selectNode(el) {
    el.setAttribute('selected', 'selected');
  }

  // Public methods ~~~

  // Selects the tab at position `index`
  proto.show = function(index) {

    var children = this.getChildrenNodes();
    children.forEach(deselectNode);
    selectNode(children[index]);

    /*if(this.attachedTo) {
      this.attachedTo.show(index);
    }*/
	// TODO dispatch 'show' event

  };

  // This method links these tabs to another element that has multiple children and a 'show' method - so when clicking on the tabs we'll call the show method on that element we're linked to
  proto.attachTo = function(el) {
    /*if(el.show !== undefined && typeof el.show === 'function') {
      this.attachedTo = el;
    }*/
	// TODO make el listen for 'show' event instead
  };

  //

  proto.getChildrenNodes = function() {
    var children = this.childNodes;
    var actualChildren = [];

    for(var i = 0; i < children.length; i++) {
      var child = children[i];

      // Discard whitespace sort of nodes
      if(child.tagName === undefined) {
        continue;
      }

      actualChildren.push(child);

    }

    return actualChildren;

  };

  proto.onClick = function(ev) {

    var target = ev.target;

    var children = this.getChildrenNodes();
    var child;

    for(var i = 0; i < children.length; i++) {

      child = children[i];

      if(child == target) {
        this.show(i);
        return;
      }

    }

  };


  var component = {};

  component.prototype = proto;

  component.register = function(name) {
    document.registerElement(name, {
      prototype: proto
    });
  };

  if(typeof define === 'function' && define.amd) {
    define(function() { return component; });
  } else if(typeof module !== 'undefined' && module.exports) {
    module.exports = component;
  } else {
    component.register('mortar-tabs'); // automatic registration
  }

}).call(this);
