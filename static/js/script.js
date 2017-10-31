
var converterApp = angular.module('converterApp', [])
.controller('converterController', ['$rootScope','$scope',
 	function($rootScope, $scope) {
 		$scope.message = 'Please select a file of 7 segment respresentation.';
 	}
]);

/*	directive	*/
converterApp.directive('convertDiv', function() {
	return {
		scope: {message: '@'},
		controller: ['$scope', 'fileService', function($scope, fileService) {
			$scope.convert = function() {
				$('#j-convert-div button').removeClass('enabled').attr('disabled',true);
				var file = $('#j-uploaded-file')[0].files[0];
				$('#j-download-file').hide();
				$('#j-loader').show();
				fileService.uploadFileToUrl( file, '/upload')
				.then(function(res) {
					if (res) {
						$('#j-download-file').show();
						$('#j-loader').hide();
						console.log('download file from-->', res);
					}
				});
			};
			$scope.download = function() {
				fileService.getFile();
			};
		}],
		templateUrl: function() {
			return 'static/html/convert-div.html';
		}
	};
});

/*	service  */
converterApp.service('fileService',  ['$http', '$q', function($http, $q) {
		this.uploadFileToUrl = function(file, uploadUrl){
		    var fd = new FormData();
		    fd.append('file', file);
		    var deferred = $q.defer();
		    $http.post(uploadUrl, fd, {
		        transformRequest: angular.identity,
		        headers: {'Content-Type': undefined}
		    })
		    .then(function(res){
		    	if (res.status == 200)
		    	deferred.resolve(res.data);
		    })
		    .catch(function(err){
		    	console('Error in file uploading!', err);
		    	deferred.reject(err);
		    });
		    return deferred.promise;
		};
		this.getFile = function() {
			var config = {
		        method: 'GET',
		        url: '/download',
		    	responseType: 'blob'
		    };
		    $http(config)
		    .then(function(res){
		    	if (res.status == 200) {
		    		headers = res.headers();
			     	var filename = headers["content-disposition"].split('=')[1];
					filename = filename.substring(1,filename.length-1);
					var contentType = headers['content-type'];
			        var linkElement = document.createElement('a');
			        try {
			            var blob = new Blob([res.data], { type: contentType });
			            var url = window.URL.createObjectURL(blob);
			            linkElement.setAttribute('href', url);
			            linkElement.setAttribute("download", filename);
			            var clickEvent = new MouseEvent("click", {
			                "view": window,
			                "bubbles": true,
			                "cancelable": false
			            });	
			            linkElement.dispatchEvent(clickEvent);
			        } catch (ex) {
			            console.log(ex);
			        }
					// console.log('downloading from ', linkElement);
		    	}
		    })
		    .catch(function(err){
		    	console('Error in file downloading!', err);
		    });
		};
	}
]);


function fileSelected(_this) {
	var fileFilter = /^(text\/plain)$/i;
	var browsedfile = _this.files[0];
    if (!fileFilter.test(browsedfile.type)) {
		_this.classList.add('error-border');
		$('#j-convert-div button').removeClass('enabled').attr('disabled',true);
	} else {
		_this.classList.remove('error-border');
		$('#j-convert-div button').addClass('enabled').removeAttr('disabled');
	}
}
