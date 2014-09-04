window.addEventListener('DOMContentLoaded', function() {

  var tabs = document.getElementById('listenToMe');
  var tabListenerOutput = document.getElementById('tabListenerOutput');

  tabs.addEventListener('select', onTabSelected, false);

  function onTabSelected(data) {
    tabListenerOutput.innerHTML = 'Current tab: <em>' + data.detail.tab.textContent + '</em> (' + data.detail.index + ')';
  }

});
