var app = angular.module("myapp", []);

app.config([
  "$compileProvider",
  function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(
      /^\s*(https?|ftp|mailto|chrome-extension|whatsapp):/
    );
    // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
  },
]);

app.controller("mycontro", ($scope, $http) => {
  $scope.getlistofclasses = () => {
    $http.get("/getallclasslist").then(
      (response) => {
        $scope.classinfolist = response.data;
        console.log(response.data);
        console.log("got list of all Classes");
      },
      (error) => {
        console.log("Something Went Wrong");
      }
    );
  };

  $scope.createclass = () => {
    $http({
      method: "POST",
      url: "/dashboard",
      data: $.param({ classname: $scope.classname }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    }).then(
      (response) => {
        console.log(response.data.classcode);
        $scope.classcode = response.data.classcode;
        $scope.getlistofclasses();
        //console.log(response);
      },
      (error) => {
        console.log("Something Went Wrong" + error);
      }
    );
  };

  $scope.giveattendance = () => {
    $http({
      method: "POST",
      url: `/presentsir/${$scope.uncode}`,
      data: $.param({ regno: $scope.regno }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    }).then(
      (response) => {
        console.log(response.data);
        if (response.data.error == "notintime") {
          alert("time Is Over 👎 for this Attendance");
        } else {
          alert("Your Attendance Is Submitted Successfully");
        }
      },
      (err) => {
        console.log(err);
        if (err.data.error == false) {
          alert("Already Done ! 👍");
        } else if (err.data.error == true) {
          alert("Invalid Class Code ..Please Enter Correct Class Code ❌❌❌");
        }
        //alert("time Is Over 👎 for this Attendance");
      }
    );
  };

  $scope.copyfunc = () => {
    var copyText = document.getElementById("code");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  };
});
