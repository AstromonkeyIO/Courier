
var currentUser = Parse.User.current();
if (currentUser) 
{
    console.log("current user " + currentUser.get("profileImageURL"));

    $("#profile-image").attr("src", currentUser.get("profileImageURL"));

} else {
    // show the signup or login page
}

mainApp.controller('shippingInputController', ['$scope', function($scope) 
{




}]);
