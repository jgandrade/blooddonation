import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../api/axios";
import Swal from "sweetalert2";

function Signup() {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      address: "",
      age: "",
      bloodtype: "",
      mobile: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .max(25, "Must be 25 characters or less")
        .min(6, "Must be 6 characters or more")
        .trim("Input cannot include leading and trailing spaces")
        .required("Required")
        .strict(true),
      username: Yup.string()
        .max(25, "Must be 25 characters or less")
        .min(6, "Must be 6 characters or more")
        .lowercase("Input must all be lowercase")
        .trim("Input cannot include leading and trailing spaces")
        .required("Required")
        .strict(true),
      address: Yup.string()
        .max(50, "Must be 50 characters or less")
        .trim("Input cannot include leading and trailing spaces")
        .required("Required"),
      age: Yup.number()
        .min(18, "You must be 18 and above")
        .required("Required")
        .strict(true),
      bloodtype: Yup.string().required("Required").strict(true),
      mobile: Yup.string().required("Required").strict(true),
      password: Yup.string().required("Required").strict(true),
    }),
    onSubmit: async function (values, { resetForm }) {
      let res = await axios.post("/user/register", values);
      if (res.data.response) {
        Swal.fire({
          icon: "success",
          title: "Successfully Registered",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Cannot be registered",
          text: "Looks like there is a duplicate username/fullname found in the database. Try again!",
        });
      }
      resetForm({});
    },
  });

  console.log(formik.values);
  return (
    <div className="mt-5 mb-5 container-fluid col-8">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Please enter your fullname"
          />
          {formik.touched.username && formik.errors.username ? (
            <p className="text-danger" style={{ fontSize: "0.8em" }}>
              {formik.errors.username}
            </p>
          ) : (
            <></>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formFullname">
          <Form.Label>Fullname</Form.Label>
          <Form.Control
            name="fullname"
            type="text"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Please enter your fullname"
          />
          {formik.touched.fullname && formik.errors.fullname ? (
            <p className="text-danger" style={{ fontSize: "0.8em" }}>
              {formik.errors.fullname}
            </p>
          ) : (
            <></>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            name="age"
            type="number"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Please enter your age"
          />
          {formik.touched.age && formik.errors.age ? (
            <p className="text-danger" style={{ fontSize: "0.8em" }}>
              {formik.errors.age}
            </p>
          ) : (
            <></>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            type="text"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Please enter your address"
          />
          {formik.touched.address && formik.errors.address ? (
            <p className="text-danger" style={{ fontSize: "0.8em" }}>
              {formik.errors.address}
            </p>
          ) : (
            <></>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBloodTypes">
          <Form.Label>Blood Types</Form.Label>
          <Form.Select
            name="bloodtype"
            value={formik.values.bloodtype}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option> Select Blood Type</option>
            <option value="A-">A-</option>
            <option value="A+">A+</option>
            <option value="AB-">AB-</option>
            <option value="AB+">AB+</option>
            <option value="B-">B-</option>
            <option value="B+">B+</option>
            <option value="O-">O-</option>
            <option value="O+">O+</option>
          </Form.Select>
          {formik.touched.bloodtype && formik.errors.bloodtype ? (
            <p className="text-danger" style={{ fontSize: "0.8em" }}>
              {formik.errors.bloodtype}
            </p>
          ) : (
            <></>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMobileNumber">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            name="mobile"
            type="text"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Please enter your mobile number"
          />
          {formik.touched.mobile && formik.errors.mobile ? (
            <p className="text-danger" style={{ fontSize: "0.8em" }}>
              {formik.errors.mobile}
            </p>
          ) : (
            <></>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Your password"
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-danger" style={{ fontSize: "0.8em" }}>
              {formik.errors.password}
            </p>
          ) : (
            <></>
          )}
        </Form.Group>
        <div className="d-flex gap-3 align-items-center justify-content-center">
          <Button type="submit" variant="dark">
            Sign up
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Signup;
