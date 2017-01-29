<?php
  // Data URL to image.
  
  // exit immediately if the data url was not passed.
  if (!isset($_REQUEST['data_url'])) {
    exit();
  }

  // Get the data url.
  $img = $_REQUEST['data_url'];

  // Clean up the data url string a bit.
  $img = str_replace('data:image/png;base64,', '', $img);
  $img = str_replace(' ', '+', $img);
  
  // Decode the image.
  $decodedImage = base64_decode($img);
  
  // Generate a random filename.
  $filename = md5(time()).'.png';
  
  // Save the file to the server and generate a response.
  if (file_put_contents($_SERVER['DOCUMENT_ROOT'] . '/uploads/' . $filename, $decodedImage)) {
    $imageURL = 'http://' . $_SERVER['HTTP_HOST'] . '/uploads/' . $filename;
    $response = array(
      'status_code' => 200,
      'data' => array(
        'image_url' => $imageURL
      )   
    );  
  } else {
    $response = array(
      'status_code' => 500 
    );  
  }
  
  // Return JSON response.
  header("Content-Type: application/json");
  echo json_encode($response);
?>  