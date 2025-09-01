import { ApiResponse } from "../../utils/ApiResponse.js";

const enterCarDetail = async (req, res) => {
  try {
    const {
      carName,
      ownerName,
      price,
      year,
      engineSize,
      milage,
      driverType,
      cylinders,
      seats,
      fuleType,
      doors,
      color,
      description,
      cityMPG,
      hoghwayMPG,
      address,
      addressLink,
    } = req.body;

    if (
      !carName ||
      !ownerName ||
      !price ||
      !year ||
      !engineSize ||
      !milage ||
      !driverType ||
      !cylinders ||
      !seats ||
      !fuleType ||
      !doors ||
      !color ||
      !description ||
      !cityMPG ||
      !hoghwayMPG ||
      !address ||
      !addressLink
    ) {
      return res.status(400).send(new ApiResponse(400, null, "Fields are empty"));
    }

    //clodinary
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      const uploadToCloudinary = (fileBuffer, uniqueName) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "car_images",
              public_id: uniqueName,
              resource_type: "auto",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url); // only return secure_url
            }
          );
          stream.end(fileBuffer);
        });
      };

      // upload all files
      imageUrls = await Promise.all(
        req.files.map((file) => {
          const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
          return uploadToCloudinary(file.buffer, uniqueName);
        })
      );
    }

    const result = await Car.create({
      carName,
      ownerName,
      price,
      year,
      engineSize,
      milage,
      driverType,
      cylinders,
      seats,
      fuleType,
      doors,
      color,
      description,
      cityMPG,
      hoghwayMPG,
      address,
      addressLink,
      carImages: imageUrls, 
    });

        res.status(201).send(new ApiResponse(201, result, "Detail added successfully"));

  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Something went wrong"));
  }
};
export default enterCarDetail;
