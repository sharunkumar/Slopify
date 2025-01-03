function activateGravity() {
    $(".gravitybutton").jGravity({
        target: this,
        ignoreClass: 'security-overlay, header',
        weight: "heavy",
        depth: 2,
        drag: true
    });
    alert("Click stuff!!!!");
    $('div, span, img, ol, ul, li, a, blockquote, button, input, embed, h1, h2, h3, h4, h5, h6, label, object, option, p, pre, span, table, em').on('click', function(event) {
          $(this).jGravity({
              target: this,
              ignoreClass: 'security-overlay, header',
              weight: "heavy",
              depth: 2,
              drag: true
          });
      });
  }