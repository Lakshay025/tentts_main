const API_BASE_URL = "https://tentts.com/gateway/api/v1";

// 🔐 Helper to get Authorization headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
  };
};

// 👤 Register function
export const registerUser = async ({ name, email, password, mobileNumber }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        mobileNumber,
        username: name,
        groupUser: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
};

// 🔐 Login function
export const loginUser = async ({ username, password }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        username,
        password,
        deviceType: "true",
        deviceToken: "true",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const data = await response.json();

    // ✅ Save token to localStorage
    localStorage.setItem("token", data.responseBody.accessToken);

    return data;
  } catch (err) {
    throw err;
  }
};

// 📧 Send Forgot Password Email (OTP)
export const sendForgotPasswordEmail = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to send forgot password email");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
};

// 🔑 Reset Password
export const resetPassword = async ({ email, otp, newPassword }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        email,
        otp,
        newPassword,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to reset password");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
};
