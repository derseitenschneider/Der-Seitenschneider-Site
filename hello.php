<?php 



if(isset($_POST['name']))
{
$name= $_POST["name"];
$email = $_POST["email"];
$honeypot = $_POST["comments_or_notesA44"];
$message = nl2br( $_POST["message"]);

$to ="info@derseitenschneider.ch";
$subject = "Der Seitenschneider: Neue Nachricht von ";
$headers = "From: webmaster@derseitenschneider.ch\r\n";
$headers .="Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$mailtext = "<html>
<head>
<style>
  
  * {
      margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

body {
  font-family: sans-serif;
  color: #333; 
}
  
  article {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }

h1 {
font-size: 32px;
font-weight: 600;
  letter-spacing: -1px;
  margin-top: 24px;
  margin-bottom: 24px;
}

h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
}
  
  h3 {
    font-weight: 400;
    margin-bottom: 24px;
  }

p {
  font-size: 18px;
line-height: 1.5;
}
  
  span {
    color: #000;
    font-weight: 800;
  }
  
  div {
    width: 100%;
    background: #fafafa;
    padding: 48px 24px;
    border-radius: 5px;
  }

</style>

<title>Neue Nachricht von Der Seitenschneider Site</title>

</head>
<body>
  <article><h1>Der Seitenschneider - Neue Nachricht</h1>
<h2>Hi Brian</h2>
    <h3>...du hast eine neue Nachricht von <span>$name</span> erhalten:</h3>

<div><p>$message</p></div></article




</body>

</html>";

if ( !empty($honeypot)) 
 {
  return; }
  else 

  {mail($to, $subject . $name, $mailtext, $headers);
    
}
}


?>