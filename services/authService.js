const API_BASE_URL = "https://tentts.com/gateway/api/v1";

// Register function
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

// Login function
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

    return await response.json();
  } catch (err) {
    throw err;
  }
};
