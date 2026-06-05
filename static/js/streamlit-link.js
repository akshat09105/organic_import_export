(function() {
  function sendStreamlitMessage(type, payload) {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        isStreamlitMessage: true,
        type: type,
        ...payload
      }, "*");
    }
  }

  // Inform Streamlit that the component is ready
  sendStreamlitMessage("streamlit:componentReady", { apiVersion: 1 });

  // Periodically compute and send the document height to resize the Streamlit iframe
  function updateHeight() {
    var height = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    sendStreamlitMessage("streamlit:setFrameHeight", { height: height });
  }

  window.addEventListener('load', updateHeight);
  window.addEventListener('resize', updateHeight);
  
  // Continuous check to handle dynamic DOM elements, loaded images, or transitions
  setInterval(updateHeight, 500);
})();
