const mysql=require("mysql");
const express=require("express");
var app=express();
const bodyparser=require("body-parser");
app.use(bodyparser.json())
var conn=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"blog"
	}
);
conn.connect((err)=>
{
	if (!err) {
		console.log("db connected");
	}
	else
	{
		console.log("there were error "+JSON.stringify(err));
	}
});
app.listen(8902,()=>{
	console.log("server is running on port no: 8902");
});




/*api for create user
formate for json data:  
		{"email":"pihu@gmail.com","pwd":"piyudii","bio":"I am Learning","gender":"FeMale","age":21,"fnm":"pihu","lnm":"Trivedi"}
*/
		app.post('/create_user',(req,res)=>{
		req.on('data', function (data) {

			var data2=JSON.parse(data);

				conn.query("INSERT INTO users(id, email, password,bio,gender,age,first_name,last_name,created_at,updated_at) VALUES (NULL,?,?,?,?,?,?,?,CURRENT_TIMESTAMP(),NULL)",
					[data2["email"],data2["pwd"],data2["bio"],data2["gender"],data2["age"],data2["fnm"],data2["lnm"]],(err,row,field)=>
				{
					if(!err)
						res.send(row);
					else
						res.send(err);
				});
		   });
		});







//api for create_blog_posts
//	json formate:{"title":"t2","description":"my second post","likes":5,"images_url":"img/myimg2.jpg","u_id":1}
	app.post('/create_blog_posts',(req,res)=>{
	req.on('data', function (data) {

		var data2=JSON.parse(data);

			conn.query("INSERT INTO `blog`.`posts` (`id`, `title`, `description`, `likes`, `images_url`, `u_id`, `created_at`, `updated_at`) VALUES (NULL, ?, ?,?,?,?,CURRENT_TIMESTAMP(),NULL)",
				[data2["title"],data2["description"],data2["likes"],data2["images_url"],data2["u_id"]],(err,row,field)=>
			{
				if(!err)
					res.send(row);
				else
					res.send(err);
			});
	   });
	});







//api for create_comment
//json formate: {"commented_by":"pihu","post_id":"1","comment":"congratulation"}
		app.post('/create_comment',(req,res)=>{
		req.on('data', function (data) {

			var data2=JSON.parse(data);

				conn.query("INSERT INTO `blog`.`comments` (`id`, `commented_by`, `post_id`, `comment`, `created_at`, `updated_at`) VALUES (NULL,?,?,?,CURRENT_TIMESTAMP(),NULL)",
					[data2["commented_by"],data2["post_id"],data2["comment"]],(err,row,field)=>
				{
					if(!err)
						res.send(row);
					else
						res.send(err);
				});
		   });
		});




//update user api

app.put('/update_user/:id',(req,res)=>{
req.on('data', function (data) {
	var data2=JSON.parse(data);

	conn.query("UPDATE `users` SET `email`=?,`password`=?,`bio`=?,`gender`=?,`age`=?,`first_name`=?,`last_name`=?,`updated_at`=CURRENT_TIMESTAMP() WHERE id=?",
		[data2["email"],data2["pwd"],data2["bio"],data2["gender"],data2["age"],data2["fnm"],data2["lnm"],req.params.id],(err,row,field)=>
	{
		if(!err)
			res.send(row);
		else
			res.send(err);
	});
});
});



//update post api
app.put('/update_post/:id',(req,res)=>{
req.on('data', function (data) {
	var data2=JSON.parse(data);

	conn.query("UPDATE `posts` SET `title`=?,`description`=?,`likes`=?,`images_url`=?,`u_id`=?,`updated_at`=CURRENT_TIMESTAMP() WHERE id=?",
		[data2["title"],data2["description"],data2["likes"],data2["images_url"],data2["u_id"],req.params.id],(err,row,field)=>
	{
		if(!err)
			res.send(row);
		else
			res.send(err);
	});
});
});





//delete post api
app.delete('/delete_post/:id',(req,res)=>{
conn.query("DELETE FROM `posts` WHERE `id`=?",[req.params.id],(err,row,field)=>
	{
		if(!err)
			res.send(row);
		else
			res.send(err);
	});
});




//api for showing blog post
app.get('/get_post',(req,res)=>
{
	conn.query("select * from posts",(err, row , field)=>
	{
		if(!err)
		res.send(row);
		else
		res.send(err);
	});
});





//api for user_profile
app.get('/get_profile_api/:id',(req,res)=>
{
	conn.query("SELECT first_name,last_name ,email,gender, age,count(posts.id) as no_posts ,count(comments.id) as no_comments FROM `users`,posts,comments where users.id=? and users.id=posts.u_id and comments.id=posts.id",[req.params.id],(err, row , field)=>
	{
		if(!err)
		res.send(row);
		else
		res.send(err);
	});
});







//api for add_like
		app.get('/api_like/:id',(req,res)=>
		{
			var count=0;
			conn.query("select likes from posts where id=?",[req.params.id],(err, row , field)=>
			{
				if(!err)
				{
					var i1=req.params.id;
					count=row[0]["likes"];
					count++;
					conn.query("update posts set likes=? where id=?",[count,i1],(err,row,field)=>{
						if(!err)
						{
							res.send(row);
						}
						else{
							res.send(err);
						}

					});
			}
				else
				{
				res.send(err);
			}
			});
		})


