import axios from "axios";

// ✅ Model
class SubCategory {
  constructor(id, image, text, serviceId, description, type) {
    this.id = id;
    this.image = image;
    this.text = text;
    this.serviceId = serviceId;
    this.description = description;
    this.type = type;
  }

  static fromJson(json) {
    return new SubCategory(
      json.id || 0,
      json.Image || "",
      json.Text || "",
      json.Serviceid || "",
      json.Description || "",
      json.Type || ""
    );
  }
}

// ✅ API Fetch Function
const GetSubCategory = async (Id, Type) => {
  const formData = new URLSearchParams();
  formData.append("token", "SWNCMPMSREMXAMCKALVAALI");
  formData.append("id", Id);
  formData.append("type", Type);

  try {
    const response = await axios.post(
      "https://weprettify.com/APIs/APIs.asmx/OffersService",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // ✅ API returns XML sometimes? If yes, convert it to JSON first.
    // Assuming response.data is already JSON array
    let rawData = response.data;

    // If it's a string JSON, parse it
    if (typeof rawData === "string") {
      rawData = JSON.parse(rawData);
    }

    // ✅ Convert raw API response into list of SubCategory objects
    const subCategoryList = rawData.map((item) => SubCategory.fromJson(item));

    return subCategoryList;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

export { GetSubCategory, SubCategory };
    