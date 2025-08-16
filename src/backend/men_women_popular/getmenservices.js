import axios from "axios";

class GetMenServicesModel {
  constructor(id, Image, Text, Serviceid, Description, Type) {
    this.id = id;
    this.Image = Image;
    this.Text = Text;
    this.Serviceid = Serviceid;
    this.Description = Description;
    this.Type = Type;
  }

  static fromJson(json) {
    return new GetMenServicesModel(
      json.id || 0,
      json.Image || "",
      json.Text || "",
      json.Serviceid || "",
      json.Description || "",
      json.Type || ""
    );
  }
}

const GetMenServices = async () => {
  const formData = new URLSearchParams();
  formData.append("token", "SWNCMPMSREMXAMCKALVAALI");

  try {
    const response = await axios.post(
      "https://weprettify.com/APIs/APIs.asmx/GetMenServices",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    let data = response.data;
    if (!data) {
      console.error("Response data is null or undefined");
      return [];
    }

    // Log a warning if the array is empty
    if (data.length === 0) {
      console.warn("GetWomenServices returned an empty array");
    }

    if (data.length === 0) {
      console.warn("GetMenServices returned an empty array");
    }

    return data
      .map((item) => {
        if (typeof item === "object" && item !== null) {
          return GetMenServicesModel.fromJson(item);
        }
        return null;
      })
      .filter(Boolean);
  } catch (error) {
    console.error("Error fetching GetMenServices:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return [];
  }
};

export default GetMenServices;
