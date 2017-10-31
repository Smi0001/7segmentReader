describe('Converter Controller', function () {
    beforeEach(angular.mock.module('converterApp'));

    var scope, $scope, $rootScope,
     msg = 'Please select a file of 7 segment respresentation.';
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
    
    converterController = $controller('converterController', {
      $scope: scope
    });

  }));

    it('should call auth service login function', function() {
        expect(converterController).toBeDefined();
                
        expect(scope.message).toEqual(msg);
    });
});




/*
//1.
describe('File service', function () {
    var myserv, httpBackend;
    //2.
    beforeEach(function () {
        //3. load the module.
        module('converterApp');
 
        // 4. get your service, also get $httpBackend
        // $httpBackend will be a mock.
        inject(function ($httpBackend, _fileService_) {
            myserv = _fileService_;
            httpBackend = $httpBackend;
        });
    });
 
    // 5. make sure no expectations were missed in your tests.
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest() ;
    });
 
    var fileServiceUrl = 'http://localhost:3000/upload',
    file = `
 _  _  _        _     _  _ 
|_ | || |  ||_| _|  ||_ |_ 
|_||_||_|  |  | _|  | _| _|
`;

    //file = '\n _  _  _        _     _  _ \n|_ | || |  ||_| _|  ||_ |_ \n|_||_||_|  |  | _|  | _| _|\n'

    var RESPONSE_SUCCESS = {
    "status": 200,
    "data": "C:\\7segmentReader/output.txt"
    };

    var RESPONSE_ERROR = {
    'status': 500
    };

    //6.
    it('test file service success', function () {
        var returnData = RESPONSE_SUCCESS;
 
        //7. expectPOST to make sure this is called once.
        var params = {'sampleFile':file};
        var req_url = fileServiceUrl;
        httpBackend
        .expect('POST', req_url, params)
        .respond(200, RESPONSE_SUCCESS);

        //8. make the call.
        var returnedPromise = myserv.uploadFileToUrl(file);
 
        //9. set up a handler for the response, that will put the result
        // into a variable in this scope for you to test.
        var result;
        returnedPromise.then(function (response) {
            result = response;
        });
 
        //10. flush the backend to "execute" the request to do the expectedGET assertion.
        expect(httpBackend.flush).not.toThrow();
        //11. check the result. 
        expect(result.status).toBe(200);
        // expect(result.data).toBe("C:\\7segmentReader/output.txt");
        // expect(result).toEqual(returnData);
    });

    it('should give error message when using expired session Id', function () {
        var returnData = RESPONSE_ERROR;
 
        //7. expectGET to make sure this is called once.
        var params = {'videoId': videoId, file:file};
        var req_url = fileServiceUrl + '?sessionId='+expiredSessionId;
        httpBackend
        .when('POST', req_url, params)
        .respond(401, RESPONSE_ERROR);


        //8. make the call.
        var returnedPromise = myserv.rateVideo(file, videoId, expiredSessionId);
 
        //9. set up a handler for the response, that will put the result
        // into a variable in this scope for you to test.
        var result;
        returnedPromise.then(function (response) {
            result = response.data;
        }).catch(function(res) {
            result = res.data;
        });
 
        //10. flush the backend to "execute" the request to do the expectedGET assertion.
        expect(httpBackend.flush).not.toThrow();
        //11. check the result. 
        expect(result.status).toBe('error');
        expect(result).toEqual(returnData);
    });
//Testing single video service
    it('test file service error incorrect video id', function () {
         var returnData = RESPONSE_ERROR;
 
        //7. expectGET to make sure this is called once.
        var params = {'videoId': 2, file:file};
        var req_url = fileServiceUrl + '?sessionId='+sessionId;
        httpBackend
        .when('POST', req_url, params)
        .respond(401, RESPONSE_ERROR);


        //8. make the call.
        //var data = {'rate': 5, 'id': 2};
        var returnedPromise = myserv.rateVideo(file, 2, sessionId);
 
        //9. set up a handler for the response, that will put the result
        // into a variable in this scope for you to test.
        var result;
        returnedPromise.then(function (response) {
            result = response.data;
        }).catch(function(res) {
            result = res.data;
        });
 
        //10. flush the backend to "execute" the request to do the expectedGET assertion.
        expect(httpBackend.flush).not.toThrow();
        //11. check the result. 
        expect(result.status).toBe('error');
        expect(result).toEqual(returnData);
    });

});
*/