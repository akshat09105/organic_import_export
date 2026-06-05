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

  // Compute and send the document height to resize the Streamlit iframe wrapper
  function updateHeight() {
    // Detect if the page is designed to fit a single screen (like auth.html)
    var bodyStyle = window.getComputedStyle(document.body);
    var docStyle = window.getComputedStyle(document.documentElement);
    var isFixedScreen = bodyStyle.overflow === 'hidden' || 
                        bodyStyle.overflowY === 'hidden' ||
                        docStyle.overflow === 'hidden' ||
                        docStyle.overflowY === 'hidden' ||
                        window.location.pathname.indexOf('auth.html') !== -1;
                        
    var height;
    if (isFixedScreen && window.parent && window.parent !== window) {
      height = window.parent.innerHeight || document.documentElement.clientHeight || 800;
    } else {
      height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
    }
    sendStreamlitMessage("streamlit:setFrameHeight", { height: height });
  }

  window.addEventListener('load', updateHeight);
  window.addEventListener('resize', updateHeight);
  setInterval(updateHeight, 500);

  // Cross-frame scrolling support (same-origin check)
  try {
    if (window.parent && window.parent !== window) {
      // Listen to parent scroll to toggle sticky navbar
      window.parent.addEventListener('scroll', function() {
        var scrollY = window.parent.pageYOffset || window.parent.scrollY || 0;
        var nb = document.getElementById('navbar');
        if (nb) {
          nb.classList.toggle('scrolled', scrollY > 60);
        }
      });

      // Global scroll function to scroll the parent page
      window.smoothScrollToElement = function(elementId) {
        var target = document.getElementById(elementId);
        if (target) {
          var parentScrollY = window.parent.pageYOffset || window.parent.scrollY || 0;
          var rect = target.getBoundingClientRect();
          var absoluteY = rect.top + parentScrollY;
          
          window.parent.scrollTo({
            top: absoluteY,
            behavior: 'smooth'
          });
        }
      };

      // Intercept anchor clicks
      document.addEventListener('click', function(e) {
        var anchor = e.target.closest('a');
        if (anchor) {
          var href = anchor.getAttribute('href');
          if (href && href.startsWith('#')) {
            var elementId = href.substring(1);
            if (elementId) {
              e.preventDefault();
              window.smoothScrollToElement(elementId);
            }
          }
        }
      });
    }
  } catch (err) {
    console.warn("Could not access parent window for scrolling integration:", err);
  }
})();
