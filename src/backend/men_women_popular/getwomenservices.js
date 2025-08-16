import axios from "axios";

class GetWomenServicesModel {
  constructor(id, Image, Text, Serviceid, Description, Type) {
    this.id = id;
    this.Image = Image;
    this.Text = Text;
    this.Serviceid = Serviceid;
    this.Description = Description;
    this.Type = Type;
  }

  static fromJson(json) {
    return new GetWomenServicesModel(
      json.id || 0,
      json.Image || "",
      json.Text || "",
      json.Serviceid || "",
      json.Description || "",
      json.Type || ""
    );
  }
}

const GetWomenServices = async () => {
  const formData = new URLSearchParams();
  formData.append("token", "SWNCMPMSREMXAMCKALVAALI");

  try {
    const response = await axios.post(
      "https://weprettify.com/APIs/APIs.asmx/GetWomenServices",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Check if response.data is valid
    const data = response.data;
    if (!data) {
      console.error("Response data is null or undefined");
      return [];
    }

    // Log a warning if the array is empty
    if (data.length === 0) {
      console.warn("GetWomenServices returned an empty array");
    }

    // Map the response to GetWomenServicesModel instances, ensuring valid items
    return data
      .map((item) => {
        if (typeof item === "object" && item !== null) {
          return GetWomenServicesModel.fromJson(item);
        }
        return null;
      })
      .filter(Boolean); // Remove any null/undefined mappings
  } catch (error) {
    console.error("Error fetching GetWomenServices:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return []; // Return empty array on error for consistency
  }
};

export default GetWomenServices;
