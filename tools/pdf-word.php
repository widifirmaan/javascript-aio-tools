<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>PDF2DOCX - DUFL</title>
  <meta name="description" content="">
  <meta name="keywords" content="">
  <link href="../assets/img/favicon.png" rel="icon">
  <link href="../assets/img/apple-touch-icon.png" rel="apple-touch-icon">
  <link href="https://fonts.googleapis.com" rel="preconnect">
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
  <link href="../assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="../assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="../assets/vendor/aos/aos.css" rel="stylesheet">
  <link href="../assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="../assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">
  <link href="../assets/css/main.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <style>
    #file-input {
      display: none;
    }
    .file-input-label {
      cursor: pointer;
      transition: transform 0.2s ease-in-out;
    }
    .file-input-label:hover {
      transform: translateY(-2px);
    }
  </style>
</head>
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['pdfFile'])) {
  $target_dir = "/home/tools/htdocs/tools.dufl.web.id/pdftemp/"; // Directory to store uploaded PDFs
  $target_file = $target_dir . basename($_FILES["pdfFile"]["name"]);
  $outputDir = $target_dir . basename($_FILES["name"]). ".docx";
  $uploadOk = 1;
  $fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

  // Check if file is a PDF
  if($fileType != "pdf") {
      echo "Sorry, only PDF files are allowed.";
      $uploadOk = 0;
  }

  // Check file size (optional, adjust as needed)
  if ($_FILES["pdfFile"]["size"] > 50000000) { // 50MB limit
      echo "Sorry, your file is too large.";
      $uploadOk = 0;
  }

  // Check if $uploadOk is set to 0 by an error
  if ($uploadOk == 0) {
      echo "Sorry, your file was not uploaded.";
  // If everything is ok, try to upload file
  } else {
    if (move_uploaded_file($_FILES["pdfFile"]["tmp_name"], $target_file)) {
      // echo "The file ". htmlspecialchars( basename( $_FILES["pdfFile"]["name"])). " has been uploaded.";
      $commandHigh = 'libreoffice --headless --infilter="writer_pdf_import" --convert-to docx --outdir '.escapeshellarg($target_dir).' '.escapeshellarg($target_file);
      $commandFast = 'cd ../pdftemp && abiword --to=docx '.escapeshellarg($target_file);
      if (isset($_POST['method']) == 1){
        $command = $commandHigh;
      }else{
        $command = $commandFast;
      }
      shell_exec($command);
      echo $command;
      $fileName = basename($_FILES["pdfFile"]["name"]);
      $path_parts = pathinfo($fileName);
      $filename_without_extension = $path_parts['filename'];
      $tempDocxPath = $target_dir.$filename_without_extension. '.docx';
        if (file_exists($tempDocxPath)) {
          header('Content-Description: File Transfer');
          header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
          header('Content-Disposition: attachment; filename="' . basename($tempDocxPath) . '"');
          header('Content-Transfer-Encoding: binary');
          header('Expires: 0');
          header('Cache-Control: must-revalidate');
          header('Pragma: public');
          header('Content-Length: ' . filesize($tempDocxPath));

          // Clear output buffer
          ob_clean();
          flush();

          // Read the file and output its contents
          readfile($tempDocxPath);
          unlink($target_file);
          unlink($tempDocxPath);
          echo "<script>alert('Convertion Success!');</script>";
          exit;
        } else {
          unlink($target_file);
          unlink($tempDocxPath);
          $message = "Conversion failed. Please check if LibreOffice is correctly installed on the server.";
          $isError = true;
        }
    } else {
      // unlink($target_file);
      // unlink($tempDocxPath);
      echo "Sorry, there was an error uploading your file.";
    }
  }
}
?>
<body class="service-details-page">
  <main class="main">
    <div class="page-title dark-background">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0"><a href="https://tools.dufl.web.id"><i class="bi bi-arrow-left-short"></i> Free Stuff by DUFL</a></h1>
        <nav class="breadcrumbs">
          <ol>
            <li><a href="https://www.dufl.web.id">Premium Stuff</a></li>
            <li><a href="https://tools.dufl.web.id">Free Stuff</a></li>
          </ol>
        </nav>
      </div>
    </div>
    <section id="service-details" class="service-details section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row gy-4">
          <div class="col-lg-10">
            <div class="content">
              <h3>Pdf to Word Converter</h3>
              <p>
               Looking for a reliable way to convert your PDFs to editable Word documents? Our app makes it easy and fast.
              </p>
              <div class="container mx-auto">
                <?php if (isset($message)): ?>
                    <div class="p-4 mb-4 rounded-lg <?php echo $isError ? 'bg-red-500/20 text-red-300 border border-red-400' : 'bg-green-500/20 text-green-300 border border-green-400'; ?>">
                        <?php echo htmlspecialchars($message); ?>
                    </div>
                <?php endif; ?>

                <form action="" method="POST" enctype="multipart/form-data" class="">
                  <div>
                    <label for="method" class="">Method:</label>
                    <select class="form-select form-control" name="method" id="method">
                      <option value="1" selected>Quality</option>
                      <option value="2">Fast</option>
                    </select>
                  </div>
                  <div>
                    <label for="pdfFile" class="">Select a PDF file:</label>
                    <input type="file" name="pdfFile" id="pdfFile" accept="application/pdf" class="w-full form-control">
                  </div>
                  <div class="pt-2">
                    <button type="submit" 
                      class="w-full btn btn-primary">
                      Convert to Word
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="col-lg-2">
            <div class="service-info">
              <h4>Service Information</h4>
              <div class="info-item">
                <i class="bi bi-person-check"></i>
                <h5>Project By</h5>
                <p>Widi Firmansyah</p>
              </div>
              <div class="info-item">
                <div class="service-details-slider swiper init-swiper">
                  <script type="application/json" class="swiper-config">
                    {
                      "loop": true,
                      "speed": 600,
                      "autoplay": {
                        "delay": 5000
                      },
                      "slidesPerView": 1,
                      "pagination": {
                        "el": ".swiper-pagination",
                        "type": "bullets",
                        "clickable": true
                      }
                    }
                  </script>
                  <div class="swiper-wrapper align-items-center">
                    <div class="swiper-slide">
                      <!-- <img src="../assets/img/services/img-comp.png" alt="" class="img-fluid" loading="lazy"> -->
                    </div>
                  </div>
                  <div class="swiper-pagination"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  </main>

  <footer id="footer" class="footer position-relative">

    <div class="container">
      <div class="copyright text-center ">
        <a href="https://tools.dufl.web.id"><p>© <span>Copyright</span><strong class="px-1 sitename">DUFL</strong><span>All Rights Reserved</span></p></a>
      </div>
      <div class="credits">
        Designed by <a href="https://widifirmaan.web.id/">Widi Firmans</a>
      </div>
    </div>

  </footer>

  <!-- Scroll Top -->
  <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Preloader -->
  <div id="preloader"></div>

  <!-- Vendor JS Files -->
  <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="../assets/vendor/aos/aos.js"></script>
  <script src="../assets/vendor/typed.js/typed.umd.js"></script>
  <script src="../assets/vendor/purecounter/purecounter_vanilla.js"></script>
  <script src="../assets/vendor/waypoints/noframework.waypoints.js"></script>
  <script src="../assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="../assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
  <script src="../assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="../assets/vendor/swiper/swiper-bundle.min.js"></script>

  <!-- Main JS File -->
  <script src="../assets/js/services.js"></script>

</body>

</html>