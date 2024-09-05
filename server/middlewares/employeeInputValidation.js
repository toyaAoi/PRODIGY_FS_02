import validator from "validator";

const validateFields = [
  "firstName",
  "lastName",
  "department",
  "email",
  "phone",
  "dateHired",
  "salary",
  "address",
  "role",
];

export default (req, res, next) => {
  const missingFields = validateFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (!validator.isMobilePhone(req.body.phone)) {
    return res
      .status(400)
      .json({ error: "Phone number must be 10 digits long" });
  }

  if (!validator.isDate(req.body.dateHired)) {
    return res.status(400).json({ error: "Invalid date" });
  }

  if (typeof req.body.salary !== "number" || req.body.salary < 0) {
    return res.status(400).json({ error: "Invalid salary" });
  }

  next();
};
