const gender = ["male", "female", "other"];

export const genderOptions = gender.map((item) => ({
  label: item,
  value: item,
}));

const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const bloodGroupOptions = bloodGroup.map((item) => ({
  label: item,
  value: item,
}));
