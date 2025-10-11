<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>Image Backgroud Removal - DUFL</title>
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
              <h3>Image Backgroud Removal</h3>
              <p>
               A Simple, Fast and efficient solution for image Backgroud removal Tools
              </p>
              <div class="container mx-auto">
                <form action="" method="post" enctype="multipart/form-data">
                  <div class="form-group">
                    <label for="imageFile">Choose an Image:</label>
                    <input type="file" name="imageFile" id="imageFile" required>
                  </div>
                  <button type="submit" name="submit">Remove Background</button>
                </form>
              </div>
              <?php
                if (isset($_POST['submit']) && isset($_FILES['imageFile'])) {
                    $uploadDir = 'uploads/';
                    $outputDir = 'output/';

                    // Create directories if they don't exist
                    if (!is_dir($uploadDir)) {
                        mkdir($uploadDir);
                    }
                    if (!is_dir($outputDir)) {
                        mkdir($outputDir);
                    }

                    $fileName = basename($_FILES['imageFile']['name']);
                    $uploadedFile = $uploadDir . $fileName;

                    if (move_uploaded_file($_FILES['imageFile']['tmp_name'], $uploadedFile)) {
                        try {
                            // Check if Imagick extension is available
                            if (!class_exists('Imagick')) {
                                throw new Exception("The Imagick extension is not installed or enabled.");
                            }

                            $outputFileName = 'transparent_' . pathinfo($fileName, PATHINFO_FILENAME) . '.png';
                            $outputFile = $outputDir . $outputFileName;
                            $command = 'rembg i '.escapeshellarg($uploadedFile).' '.escapeshellarg($outputFile);
                            echo $command;
                            shell_exec($command);

                            echo '<div class="success">Background removed successfully!</div>';
                            echo '<div class="result">';
                            echo '<h2>Result:</h2>';
                            echo '<img src="' . htmlspecialchars($outputFile) . '" alt="Image with transparent background">';
                            echo '</div>';

                            // Clean up the temporary uploaded file
                            // unlink($uploadedFile);

                        } catch (ImagickException $e) {
                            echo '<div class="error">ImageMagick Error: ' . $e->getMessage() . '</div>';
                            // Clean up the temporary uploaded file on error
                            if (file_exists($uploadedFile)) {
                                // unlink($uploadedFile);
                            }
                        } catch (Exception $e) {
                            echo '<div class="error">Error: ' . $e->getMessage() . '</div>';
                        }
                    } else {
                        echo '<div class="error">Failed to upload image.</div>';
                    }
                }
                ?>
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