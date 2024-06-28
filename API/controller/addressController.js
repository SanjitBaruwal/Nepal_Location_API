import Nepal from "../data.js";

export const getAllProvinces = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Provinces fetched successfully",
      data: Nepal,
    });
  } catch (error) {
    console.error("Error fetching provinces:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getallDistricts = async (req, res) => {
  const { province } = req.params;

  try {
    const selectedProvince = Nepal.find((prov) => prov.province === province);

    if (!selectedProvince) {
      return res.status(404).json({ error: "Province not found" });
    }

    const districts = selectedProvince.districts.map((dist) => dist.name);

    res.status(200).json({
      success: true,
      message: "Districts fetched successfully",
      districts,
    });
  } catch (error) {
    console.error("Error fetching districts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMunicipality = async (req, res) => {
  const { province, district } = req.params;

  try {
    const selectedProvince = Nepal.find((prov) => prov.province === province);

    if (!selectedProvince) {
      return res.status(404).json({ error: "Province not found" });
    }

    const selectedDistrict = selectedProvince.districts.find(
      (dist) => dist.name === district
    );

    if (!selectedDistrict) {
      return res.status(404).json({ error: "District not found" });
    }

    const municipalities = selectedDistrict.municipalities.map(
      (mun) => mun.name
    );

    res.status(200).json({
      success: true,
      message: "Municipalities fetched successfully",
      municipalities,
    });
  } catch (error) {
    console.error("Error fetching municipality:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
