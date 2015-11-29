var mainApp = angular.module("mainApp", ['ngRoute', 'ngDialog']);

mainApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/login', {
            url: '/login',
            templateUrl: '/html/login.html',
            controller: 'facebookLoginController'
        })
        .when('/index', {
            url: '/index',
            templateUrl: 'index.html',
            controller: 'mainController'
        })
        .when('/home', {
            url: '/home',
            templateUrl: '/html/home.html',
            controller: 'homeController'
        })
        .otherwise({
            redirectTo: '/login'
        });

        $locationProvider.html5Mode(true);
});
/*
mainApp.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: '/html/login.html',
            controller: 'facebookLoginController'
        })
        .when('/index', {
            templateUrl: 'index.html',
            controller: 'mainController'
        })
        .otherwise({
            redirectTo: '/login'
        });

        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });

      }]
);
*/
/*

eclassApp.config(['$routeProvider','$locationProvider',
    function ($routeProvider, $locationProvider){
        $routeProvider.
            when('/',{
                templateUrl: '/html/student-list.html',
                controller: 'StudentsListCtrl',
            }).
            when('/students/:studentId',{
                templateUrl: '/html/student-details.html',
                controller: 'StudentDetailsCtrl',

            }).otherwise({
                redirectTo: '/students'
            });
            $locationProvider.htmlMode(true);
    }]
);
*/

mainApp.controller('mainController', ['$scope', function($scope) 
{



}]);




//login page serve

Parse.initialize("bApG86aXpX3SmPNPqTVdK0I0RanLQtRI0VhtkQko", "3HRXp5Sq9uB4COWJw6KoAglmJdZjwfHEhTFMZSgB");

window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({
        appId      : '1648410668762441', 
        status     : true, 
        cookie     : true, 
        xfbml      : true
    });
};

(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));


//var myApp = angular.module('Courier',['ngRoute']);

mainApp.controller('facebookLoginController'/*, ['$scope'*/, function($scope, ngDialog) 
{

    var arrayOfLoginPromoTexts =  ["Social Lending Platform", "Lease or Lend Items with Your Neighbors", "Help and Get to Know Your Community!"];
    var currentIndexOfArrayOfLoginPromoTexts = 0;

    function changeLoginPromoText()
    {

      if(currentIndexOfArrayOfLoginPromoTexts == 2)
      {

        currentIndexOfArrayOfLoginPromoTexts = 0;

      }
      else
      {

        currentIndexOfArrayOfLoginPromoTexts++;

      }

      console.log("index " + currentIndexOfArrayOfLoginPromoTexts);

      $('#loginText').fadeOut("slow", function() {

        $('#loginText').text(arrayOfLoginPromoTexts[currentIndexOfArrayOfLoginPromoTexts]).fadeIn("slow");  

      });

    }

    setInterval(function() {
       changeLoginPromoText();
    }, 2500);


    $scope.loginWithFacebookButtonClicked = function() 
    {

      console.log("event called");
      Parse.FacebookUtils.logIn(null, {
          success: function(user) {
              if (!user.existed()) 
              {

                  alert("User signed up and logged in through Facebook!");
                if (!Parse.FacebookUtils.isLinked(user)) 
                {

                  Parse.FacebookUtils.link(user, null, {
                    success: function(user) {
                      alert("page redirect");
                        FB.api('/me', function(me) {
                            console.log("me " + me);
                            user.set("displayName", me.name);
                            user.set("email", me.email);

                            console.log("/me response", me);
                            FB.api("/me/picture?width=180&height=180",  function(response) {

                              console.log("fb picture" + response.data.url);
                              user.set("profileImageURL", response.data.url);
                              user.save();
                              window.location = '/#/home';

                            });
       
                        });
                      //window.location = '/#/home';
                      //window.location.reload(); 

                    },
                    error: function(user, error) {
                      alert("User cancelled the Facebook login or did not fully authorize.");
                    }
                  });

                }

              }
              else 
              {

                  alert("User logged in through Facebook!");

                  FB.api('/me', function(me) {
                      console.log("me " + me);
                      user.set("displayName", me.name);
                      user.set("email", me.email);

                      console.log("/me response", me);
                      FB.api("/me/picture?width=180&height=180",  function(response) {

                        console.log("fb picture" + response.data.url);
                        user.set("profileImageURL", response.data.url);
                        user.save();
                        window.location = '/#/home';

                      });
 
                  });

                  //window.location = '/#/home';
                  //window.location.reload(); 

              }
          },
          error: function(user, error) {
              alert("User cancelled the Facebook login or did not fully authorize.");
          }
      });     


    }


}/*]*/);






//Home Section

mainApp.controller('homeController', function($scope, ngDialog)  
{

  var currentUser = Parse.User.current();
  if (currentUser) 
  {
      console.log("current user " + currentUser.get("profileImageURL"));

      $("#profile-image").attr("src", currentUser.get("profileImageURL"));
      $("#profile-name").html(currentUser.get("displayName"));

  } else {
      // show the signup or login page
  }

  $(document).ready(function() {
      $('.input-group input[required], .input-group textarea[required], .input-group select[required]').on('keyup change', function() {
      var $form = $(this).closest('form'),
              $group = $(this).closest('.input-group'),
        $addon = $group.find('.input-group-addon'),
        $icon = $addon.find('span'),
        state = false;
              
        if (!$group.data('validate')) {
        state = $(this).val() ? true : false;
      }else if ($group.data('validate') == "email") {
        state = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val())
      }else if($group.data('validate') == 'phone') {
        state = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test($(this).val())
      }else if ($group.data('validate') == "length") {
        state = $(this).val().length >= $group.data('length') ? true : false;
      }else if ($group.data('validate') == "number") {
        state = !isNaN(parseFloat($(this).val())) && isFinite($(this).val());
      }

      if (state) {
          $addon.removeClass('danger');
          $addon.addClass('success');
          $icon.attr('class', 'glyphicon glyphicon-ok');
      }else{
          $addon.removeClass('success');
          $addon.addClass('danger');
          $icon.attr('class', 'glyphicon glyphicon-remove');
      }
          
          if ($form.find('.input-group-addon.danger').length == 0) {
              $form.find('[type="submit"]').prop('disabled', false);
          }else{
              $form.find('[type="submit"]').prop('disabled', true);
          }
    });
      
      $('.input-group input[required], .input-group textarea[required], .input-group select[required]').trigger('change');
      
      
  });

  $scope.couriers = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.'}
  ];

  $scope.findACourierButtonPressed = function(shippingForm)
  {


    var geocoder = new google.maps.Geocoder();

   if (navigator.geolocation) 
   {

      navigator.geolocation.getCurrentPosition(function (p) 
      {
      
        var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
        console.log("current location" + LatLng);
        console.log("geocoder" + geocoder);
          //var address = document.getElementById("address").value;
        //var address = "new york";
        //var address = "1600 Amphitheatre Parkway, Mountain View, CA"
        var address = shippingForm.address + ' , ' + shippingForm.city + ' ' + shippingForm.country;
        console.log("address" + address);
        geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK)
        {
                // do something with the geocoded result
                //
                console.log("destination cooridnates" + results[0].geometry.location.lat() + results[0].geometry.location.lng());
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();

            }
        });
          //alert("yooyo");
          //ngDialog.open({ template: 'templateId' });
        ngDialog.open({ template: '/html/listOfCouriers.html',
        controller: 'homeController' 
        });

      });

    } 
    else 
    {

      alert('Geo Location feature is not supported in this browser.');

    }


}


});






myApp.controller('mainController', ['$scope', function($scope) 
{



}]);


//
/*
mainApp.controller('StudentController', function($scope) {
    $scope.students = [
        {name: 'Mark Waugh', city:'New York'},
        {name: 'Steve Jonathan', city:'London'},
        {name: 'John Marcus', city:'Paris'}
    ];
 
    $scope.message = "Click on the hyper link to view the students list.";
*/
//});