document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const popoverMenu = document.getElementById('popoverMenu');
  const menuClose = document.querySelector('.menu-close');

  // Toggle menu on hamburger click
  menuBtn.addEventListener('click', () => {
    popoverMenu.classList.toggle('active');
  });

  // Close menu on X click
  menuClose.addEventListener('click', () => {
    popoverMenu.classList.remove('active');
  });
});


function initMap() {
  const map = new google.maps.Map(document.getElementById("googleMap"), {
    zoom: 15, 
    center: { lat: 0, lng: 0 }, 
  });

  const geocoder = new google.maps.Geocoder();
  const address = "Oppdalslinna 242, 2740 Roa";

  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK" && results[0]) {
      const location = results[0].geometry.location;

      
      map.setCenter(location);

      
      new google.maps.Marker({
        map: map,
        position: location,
        title: "Roa Address",
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}