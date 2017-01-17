var app = angular.module('myApp', []);

app.controller('AppCntrl', function ($scope, $http) {
    console.log("Hello everybody I'm AppCntrl")

    var refresh=function(){
        $http.get('/arealist').then(function (response) {
        console.log("I got the data I requested");
        $scope.arealist = response.data
    });
    }

    $scope.addArea = function(){
        console.log($scope.area);
        $http.post('/arealist',$scope.area).then(function(response){
            console.log(response);
        refresh();
        $scope.area=null
        })
    }

    $scope.remove = function(id){
        console.log(id);
        $http.delete('/arealist/'+id).then(function(response){
            refresh();
        })
    }

    $scope.edit = function(id){
        console.log(id);
        $http.get('/arealist/'+id).then(function(response){
            $scope.area = response.data
        })
    }

    $scope.update = function(){
        console.log($scope.area._id);
        $http.put('/arealist/'+$scope.area._id,$scope.area).then(function(response){
            refresh();
            $scope.area=null
        })
    }

    refresh();

})