# Blog_API_Assignment

## Create API for User
<pre>
path = localhost:8902/create_user </pre>
<pre>data ={"email":"pihu@gmail.com","pwd":"abc123","bio":"I am Learning","gender":"FeMale","age":21,"fnm":"pihu","lnm":"Trivedi"}</pre>

## Create API for POST
<pre>path=localhost:8902/create_blog_posts </pre>
<pre>data = {"title":"t2","description":"my second post","likes":5,"images_url":"img/myimg2.jpg","u_id":1}</pre>

## Create API for Comment
<pre>path=localhost:8902/create_comment </pre>
<pre>data = {"commented_by":"pihu","post_id":"1","comment":"congratulation"}</pre>

## Update API for User
<pre>path=localhost:8902/update_user/:id </pre>
<pre>data={"email":"pihu@gmail.com","pwd":"abc123","bio":"I am Learning","gender":"FeMale","age":21,"fnm":"pihu","lnm":"Trivedi"}</pre>


## Update API for Post
<pre>path = localhost:8902/update_post/:id </pre>
<pre>data ={"title":"t2","description":"my second post","likes":5,"images_url":"img/myimg2.jpg","u_id":1}</pre>

## Delete API for Post
<pre>path=localhost:8902/delete_post/:id </pre>

## Profile API 
<pre>path=localhost:8902/get_profile_api/:id </pre>

## API for showing blog Post
<pre>path= localhost:8902/get_post</pre>

## API for submitting likes and comments
<pre>path= localhost:8902/add_like/:id</pre>
