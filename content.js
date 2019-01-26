function replaceImages() {
  var images = document.getElementsByTagName("img");

  for (var i = 0; i < images.length; i++) {
    var imageWidth = images[i].clientWidth;
    var imageHeight = images[i].clientHeight;

    if (!imageWidth) imageWidth =  images[i].width;
    if (!imageHeight) imageHeight =  images[i].height;

    if(images[i].src.includes("placekitten")) continue;

    if(imageWidth > 0 && imageHeight > 0) {
      images[i].setAttribute("src", "https://placekitten.com/" + imageWidth + "/" + imageHeight);
      images[i].setAttribute("srcset", "https://placekitten.com/" + imageWidth + "/" + imageHeight);
    }
  }
}

function replaceBackgroundImages() {
  var elements = document.getElementsByTagName("*");
  for (var i = 0; i < elements.length; i++) {
    var style = getComputedStyle(elements[i]);
    if(style.backgroundImage != "none" && !style.backgroundImage.includes("placekitten")) {
      var elementWidth = style.width.replace('px', '');
      if (elementWidth == 'auto') elementWidth = elements[i].offsetWidth;
      elementWidth = Math.floor(elementWidth);

      var elementHeight = style.height.replace('px', '');
      if (elementHeight == 'auto') elementHeight = elements[i].offsetHeight;
      elementHeight = Math.floor(elementHeight);

      elements[i].style.backgroundImage = "url('https://placekitten.com/" + elementWidth + "/" + elementHeight + "')";
    }
  }
}

chrome.storage.local.get(["catify_disabled"], function(storage) {
  if(!storage.catify_disabled) {
    setInterval(replaceImages, 500);
    setInterval(replaceBackgroundImages, 5000);
    replaceImages();
    replaceBackgroundImages();
  }
});
