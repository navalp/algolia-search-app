/**
 * Created by hp on 7/27/2015.
 */
'use strict'

angular.module('SearchApp').controller('SearchController',
    ['$scope', '$http', 'Pagination',
        function ($scope, $http, Pagination) {
            $scope.name = '';
            $scope.users = [];
            $scope.page = 0;
            $scope.pagination = Pagination.getNew(20);

            $scope.search = function search(isReset) {
                $http.get('http://localhost:3000/api/search?name=' + $scope.name + '&page=' + $scope.pagination.page).success(function (data) {
                    if (isReset) {
                        $scope.page = 0;
                        $scope.pagination.toPageId(0);
                    }
                    $scope.users = data.hits;
                    $scope.total = data.nbHits;
                    $scope.pagination.numPages = Math.ceil(data.nbHits / $scope.pagination.perPage);
                }).error(function (err) {
                    console.log(err);
                });
            }

            $scope.search(true);

            $scope.previous = function () {
                $scope.pagination.prevPage();
                this.search(false);
            }
            $scope.next = function () {
                $scope.pagination.nextPage();
                this.search(false);
            }
            $scope.current = function (n) {
                $scope.pagination.toPageId(n);
                this.search(false);
            }
        }]);
