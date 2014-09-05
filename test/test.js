var expect = chai.expect;
var should = chai.should();

describe('mortar-tabs', function() {
  var el;

  beforeEach(function(done) {
    el = document.createElement('mortar-tabs');
    done();
  });
  
  it('element should be registered and created', function() {
    expect(el).to.not.equal(null);
  });

  it('element does not have children when created from scratch', function() {
    expect(el.childElementCount).to.equal(0);
  });

  it('should have a select method', function() {
    expect(el.select).to.not.equal(undefined);
    expect(typeof el.select).to.equal('function');
  });

  it('selects the first tab when attached to the tree if no tab has the select attribute', function() {
    
    var _el = el;

    for(var i = 0; i < 3; i++) {
      var tab = document.createElement('mortar-tab');
      tab.innerHTML = 'tab ' + i;
      _el.appendChild(tab);
    }

    expect(_el.querySelector('mortar-tab[selected]')).to.equal(null);

    document.body.appendChild(_el);

    // Let the DOM do its thing or the test fails
    // TODO: is this the right approach with Mocha/Chai?
    setTimeout(function() {
      
      expect(_el.querySelector('mortar-tab[selected]')).to.not.equal(null);

      document.body.removeChild(_el);

    }, 10);

  });

  it('selects the tab with `selected` attribute when attached to the tree', function() {
    
    var _el = el;

    for(var i = 0; i < 3; i++) {
      var tab = document.createElement('mortar-tab');
      tab.innerHTML = 'tab ' + i;
      _el.appendChild(tab);

      if(i === 1) {
        tab.setAttribute('selected', '');
      }

    }

    _el.addEventListener('select', function(ev) {
      expect(ev.detail.index).to.equal(1);
    });

    document.body.appendChild(_el);

    // Let the DOM do its thing or the test fails
    // TODO: is this the right approach with Mocha/Chai?
    setTimeout(function() {
      
      expect(_el.querySelector('mortar-tab[selected]')).to.not.equal(null);

      document.body.removeChild(_el);

    }, 10);

  });

  it('dispatches an event (with data) when the select method is called', function() {
    
    var _el = el;

    for(var i = 0; i < 3; i++) {
      var tab = document.createElement('mortar-tab');
      tab.innerHTML = 'tab ' + i;
      _el.appendChild(tab);
    }

    _el.addEventListener('select', function(ev) {
      expect(ev.detail).to.not.equal(undefined);
      expect(ev.detail.index).to.equal(1);
      expect(ev.detail.tab.innerHTML).to.equal('tab 1');
    });

    _el.select(1);

  });


});

