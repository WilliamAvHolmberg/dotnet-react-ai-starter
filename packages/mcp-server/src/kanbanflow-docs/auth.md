Authentication
To use the API you first need to create a token. The token must be sent on all API requests.

Using query parameter
The simplest method to pass the token is by sending it as a query parameter. This is practical when testing the API, but for regular usage use the Basic Authentication below. The reason is that query parameters are more likely to be stored in request logs.

Request format
curl https://kanbanflow.com/api/v1/<RESOURCE>?apiToken=<SECRET_TOKEN>
Example
curl https://kanbanflow.com/api/v1/board?apiToken=55d24f7baedb75b03d1f168aee6466a7
Using Basic Authentication
The prefered way to pass the token is by using the Authorization header. It takes a bit more effort since you need to base64 encode the credentials.

Request format
curl -H "Authorization: Basic <BASE64_CREDENTIALS>" https://kanbanflow.com/api/v1/<RESOURCE>
The BASE64_CREDENTIALS is taken by combining "apiToken:" with the token and then encode it like this:

encodeToBase64( "apiToken:" + "<SECRET_TOKEN>" )
Example
encodeToBase64( "apiToken:55d24f7baedb75b03d1f168aee6466a7" )
Exactly how the encodeToBase64() function call looks like depends on your technical platform. It should give a result similar to this:

YXBpVG9rZW46NTVkMjRmN2JhZWRiNzViMDNkMWYxNjhhZWU2NDY2YTc=
Full example
curl -H "Authorization: Basic YXBpVG9rZW46NTVkMjRmN2JhZWRiNzViMDNkMWYxNjhhZWU2NDY2YTc=" https://kanbanflow.com/api/v1/board