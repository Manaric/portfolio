<?php
// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['phone']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];
	
// Create the email and send the message
$to = 'yamileliassoto@gmail.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Mensaje enviado de tu portafolio";
$email_body = "¡Haz recibido un nuevo correo electrónico de tu portafolio!.\n\n"."Aquí están los detalles del interesado:\n\nNombre: $name\n\nCorreo: $email_address\n\nTeléfono: $phone\n\nMensaje:\n$message\n\n ¡Contáctalo!\n";
$headers = "From: noreply@videoinabox.net\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);
return true;			
?>