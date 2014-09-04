window.addEventListener('DOMContentLoaded', function() {

  var tabs = document.getElementById('listenToMe');
  var tabListenerOutput = document.getElementById('tabListenerOutput');

  tabs.addEventListener('show', onTabShown, false);

  function onTabShown(data) {
    tabListenerOutput.innerHTML = 'Current tab: <em>' + data.detail.tab.textContent + '</em> (' + data.detail.index + ')';
  }

});
