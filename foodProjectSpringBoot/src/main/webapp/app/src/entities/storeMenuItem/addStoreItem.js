import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../Navbar";
import "../../shared/layout/AddStoreItem.css";

const StoreMenuPage = () => {
  const [userData, setUserData] = useState([null]);
  const [foodDetails, setFoodDetails] = useState({
    foodId: null,
    foodName: "",
    foodPrice: "",
    foodType: "",
    storeId: "",
  });
  const location = useLocation();
  const itemId = new URLSearchParams(location.search).get("itemId");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageToShow, setImageToShow] = useState(null);
  const [action, setAction] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const actionParam = searchParams.get("action");
    if (actionParam === "add" || actionParam === "edit") {
      setAction(actionParam);
    } else {
      setAction("add");
    }
  }, [location.search]);

  useEffect(() => {
    if (action === "add") {
      setTitle("Add Food Item");
    } else if (action === "edit") {
      setTitle("Edit Food Item");
    } else {
      setTitle("Error Item Page");
    }
  }, [action]);

  useEffect(() => {
    // Retrieve user data from localStorage when component mounts
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData({ ...parsedUserData });
    }
  }, []);

  useEffect(() => {
    const getMenuItem = async () => {
      try {
        const response = await fetch(
          "https://152.42.249.86:8443/api/get_food_by_itemId",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: itemId,
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          console.log("Food item fetched Successfully!");
          setFoodDetails({
            foodId: data.itemId,
            foodName: data.itemName,
            foodPrice: data.itemPrice,
            foodType: data.itemType,
            storeId: userData.storeId,
          });
        } else {
          console.error("Failed to fetch food item");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    if (userData && userData.storeId) {
      // Check if userData and storeId exist
      setFoodDetails((prevFoodDetails) => ({
        ...prevFoodDetails,
        storeId: userData.storeId,
      }));

      if (itemId !== null) {
        getMenuItem();
      }
    }
  }, [userData, itemId]);

  useEffect(() => {
    if (foodDetails.foodName !== "") {
      fetchImage();
    }
    // eslint-disable-next-line
  }, [foodDetails]);

  const onChangeHandler = (e) => {
    const { value, id } = e.target;
    setFoodDetails((prevState) => ({
      ...prevState,
      [id]: value, // Use square brackets for dynamic property name
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToShow(reader.result);
        setSelectedImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const addMenuItem = async () => {
    try {
      const response = await fetch(
        "https://152.42.249.86:8443/api/add_food_by_store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(foodDetails),
        }
      );
      if (response.ok) {
        console.log("Food item added Successfully!");
        handleUpload();
      } else {
        console.error("Failed to add food item");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const updateMenuItem = async () => {
    try {
      const response = await fetch(
        "https://152.42.249.86:8443/api/update_food_by_itemId",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(foodDetails),
        }
      );
      if (response.ok) {
        console.log("Food item updated Successfully!");

        if (imageToShow !== selectedImage) {
          console.log(imageToShow);
          console.log(selectedImage);
          handleUpload();
        }
      } else {
        console.error("Failed to update food item");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("fileName", foodDetails.foodName);
    console.log("testWEEREWREWR" + formData);

    try {
      await fetch("https://152.42.249.86:8443/api/upload", {
        method: "POST",
        body: formData,
      });
      // Handle response as needed
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fetchImage = async () => {
    try {
      console.log(foodDetails.foodName);
      const formData = {
        imageName: foodDetails.foodName,
      };
      const response = await fetch("https://152.42.249.86:8443/api/get_image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }); // Replace with your API endpoint
      const data = await response.blob();
      const urlToShow = URL.createObjectURL(data);
      setImageToShow(urlToShow);
      setSelectedImage(urlToShow);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const saveFoodItem = () => {
    if (selectedImage) {
      if (
        window.confirm(
          itemId
            ? "Are you sure you want to update?"
            : "Are you sure you want to save?"
        )
      ) {
        itemId ? updateMenuItem() : addMenuItem();
      } else {
        return;
      }
    } else {
      console.log("Please upload a jpg image");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h1>{title}</h1>

        <label className="form-label" htmlFor="foodName">
          Food Name:
        </label>
        <input
          className="form-input"
          onChange={onChangeHandler}
          value={foodDetails.foodName}
          type="text"
          id="foodName"
        />

        <label className="form-label" htmlFor="foodPrice">
          Food Price:
        </label>
        <input
          className="form-input"
          onChange={onChangeHandler}
          value={foodDetails.foodPrice}
          type="number"
          id="foodPrice"
        />

        <label className="form-label" htmlFor="foodType">
          Food Type:
        </label>
        <input
          className="form-input"
          onChange={onChangeHandler}
          value={foodDetails.foodType}
          type="text"
          id="foodType"
        />

        <button className="form-button" onClick={saveFoodItem}>
          {itemId ? "Update" : "Save"}
        </button>

        <label htmlFor="fileInput" className="custom-file-input-button">
          Choose File
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={handleImageChange}
          accept="image/*"
        />

        {selectedImage && (
          <div>
            <img
              src={imageToShow}
              alt="Selected"
              style={{ maxWidth: "200px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreMenuPage;
