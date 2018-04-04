This project is front-end of customer-backend project in my github account.
I used nginx 1.13.11 to run this front-end project with back-end serves at localhost:8080
Everything is http, no ssl.
I assume you run both projects on the same server.
To avoid CORS issue, add the lines bellow to your nginx.conf file:

location /back-end/ {
	proxy_pass http://localhost:8080/;
	proxy_redirect off;
}
